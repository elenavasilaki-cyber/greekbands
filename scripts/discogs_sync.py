"""Read Discogs artist records for bands that have a Discogs link and fill in official links and city.

Runs in GitHub Actions (.github/workflows/discogs-sync.yml), where api.discogs.com can be reached.
Run from the repo root:  python3 scripts/discogs_sync.py [max_bands]

Rules (same as the daily scan):
- A record is used only if its profile text names Greece (Greece / Greek / Hellenic / Athens /
  Thessaloniki, in English or Greek) or the record lists the band's own Metal Archives page.
- Links fill only empty fields; nothing existing is overwritten or removed.
- A city is set only when the profile names a city that is in data/cities.json and the band has none.
Optional: a DISCOGS_TOKEN environment variable (a Discogs personal access token) raises the rate limit.
"""
import datetime, json, os, re, subprocess, sys, time, urllib.error, urllib.parse, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "data", "bands.json")
CITIES = os.path.join(ROOT, "data", "cities.json")
UA = "wtbuzzGreekBandFinder/1.0 +https://wtbuzz.net"
SKIP = ("myspace.com", "twitter.com", "x.com", "soundcloud.com", "wikipedia.org", "bigcartel.com",
        "reverbnation.com", "vk.com", "plus.google", "last.fm", "bandsintown", "yolasite", "vimeo.com",
        "shop", "linktr.ee", "music.apple", "spirit-of-metal", "itunes", "progarchives", "discogs.com",
        "tiktok.com", "threads.net", "deezer.com", "amazon.", "google.com", "blogspot.", "wix.com/")
GREEK = re.compile(r"\b(greece|greek|hellenic|hellas|athens|thessaloniki|salonica)\b|ελλ[αάη]δ|ελλην|αθήν|αθην|θεσσαλονίκ",
                   re.I)
# Greek spellings / alternative names that map to a city in cities.json
ALIASES = {"Athina": "Athens", "Αθήνα": "Athens", "Αθηνα": "Athens", "Salonica": "Thessaloniki",
           "Θεσσαλονίκη": "Thessaloniki", "Patra": "Patras", "Πάτρα": "Patras", "Iraklion": "Heraklion",
           "Iraklio": "Heraklion", "Ηράκλειο": "Heraklion", "Larisa": "Larissa", "Λάρισα": "Larissa",
           "Βόλος": "Volos", "Βόλο": "Volos", "Ιωάννινα": "Ioannina", "Giannena": "Ioannina", "Χανιά": "Chania",
           "Kerkyra": "Corfu", "Κέρκυρα": "Corfu", "Καλαμάτα": "Kalamata", "Καβάλα": "Kavala", "Σέρρες": "Serres",
           "Ξάνθη": "Xanthi", "Κομοτηνή": "Komotini", "Αλεξανδρούπολη": "Alexandroupoli", "Τρίκαλα": "Trikala",
           "Λαμία": "Lamia", "Χαλκίδα": "Chalkida", "Κοζάνη": "Kozani", "Βέροια": "Veria", "Veroia": "Veria",
           "Κατερίνη": "Katerini", "Πειραιάς": "Piraeus", "Peiraias": "Piraeus", "Ρόδος": "Rhodes",
           "Agrinion": "Agrinio", "Αγρίνιο": "Agrinio", "Τρίπολη": "Tripoli", "Tripolis": "Tripoli",
           "Ρέθυμνο": "Rethymno", "Rethymnon": "Rethymno", "Δράμα": "Drama", "Kalamaria": "Kalamaria"}
# Place names that also exist outside Greece or are common words: only accepted next to "Greece"/"Greek"
AMBIGUOUS = {"Corinth", "Argos", "Thebes", "Rhodes", "Naxos", "Samos", "Kos", "Drama", "Tripoli", "Sparti",
             "Megara", "Salamina", "Arta", "Edessa", "Kiato"}


def get(url, token):
    req = urllib.request.Request(url, headers={"User-Agent": UA, **({"Authorization": f"Discogs token={token}"} if token else {})})
    for attempt in range(4):
        try:
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
            if e.code == 429:
                time.sleep(65); continue
            raise
        except urllib.error.URLError:
            time.sleep(10)
    return None


def classify(u):
    u = u.strip()
    if not u: return None, None
    if not u.startswith("http"): u = "https://" + u
    u = re.sub(r"^http://", "https://", u)
    u = re.sub(r"[?&](fref|utm_[a-z]+|si|igshid|ref)=[^&]*", "", u).rstrip("?&/")
    h = urllib.parse.urlparse(u).netloc.lower()
    if "facebook.com" in h: return "fb", u
    if "youtube.com" in h or h == "youtu.be": return "yt", u
    if "instagram.com" in h: return (None, None) if "/p/" in u else ("ig", u)
    if "open.spotify.com" in h: return ("sp", u) if "/artist/" in u else (None, None)
    if "bandcamp.com" in h: return "bc", u
    if "metal-archives.com" in h: return "ma", u
    if any(s in h or s in u for s in SKIP): return None, None
    return "web", u


def find_city(text, cities):
    names = {c: c for c in cities}
    names.update({a: c for a, c in ALIASES.items() if c in cities})
    hits = []
    for name, city in names.items():
        for m in re.finditer(r"(?<![\w])" + re.escape(name) + r"(?![\w])", text):
            if city in AMBIGUOUS:
                near = text[max(0, m.start() - 40): m.end() + 40]
                if not re.search(r"greece|greek|hellas|ελλ", near, re.I): continue
            hits.append((m.start(), city))
    return sorted(hits)[0][1] if hits else ""


def note(b, t):
    if t and t not in (b.get("notes") or ""):
        b["notes"] = ((b.get("notes") or "") + (". " if b.get("notes") else "") + t)[:900]


def main():
    limit = int(sys.argv[1]) if len(sys.argv) > 1 else 150
    token = os.environ.get("DISCOGS_TOKEN", "").strip()
    pause = 1.1 if token else 2.6
    db = json.load(open(DB, encoding="utf-8"))
    cities = json.load(open(CITIES, encoding="utf-8"))
    today = datetime.date.today().isoformat()
    todo = [b for b in db["bands"] if re.search(r"/artist/(\d+)", b.get("dc") or "") and not b.get("dc_read_on")]
    todo.sort(key=lambda b: (bool(b.get("dc_links_read")), b["name"].lower()))
    todo = todo[:limit]
    stats = {"read": 0, "greek": 0, "links": 0, "cities": 0, "not_greek": 0}
    for b in todo:
        aid = re.search(r"/artist/(\d+)", b["dc"]).group(1)
        rec = get(f"https://api.discogs.com/artists/{aid}", token)
        time.sleep(pause)
        b["dc_read_on"] = today
        if not rec: continue
        stats["read"] += 1
        profile = rec.get("profile") or ""
        urls = rec.get("urls") or []
        own_ma = b.get("ma") and any(b["ma"].rstrip("/").split("/")[-1] in u for u in urls if "metal-archives" in u)
        if not (GREEK.search(profile) or own_ma):
            stats["not_greek"] += 1
            note(b, "Discogs profile does not name Greece; its links were not used")
            continue
        stats["greek"] += 1
        b["dc_links_read"] = True
        added = []
        for u in urls:
            k, clean = classify(u)
            if k and not b.get(k):
                b[k] = clean; added.append(k)
        if added:
            stats["links"] += len(added)
            note(b, "Official links taken from the band's Discogs artist profile, which names Greece")
        if not b.get("city"):
            c = find_city(profile, cities)
            if c:
                b["city"] = c; b["city_verified"] = True; stats["cities"] += 1
                note(b, "City from Discogs profile")
        if "Discogs" not in (b.get("sources") or ""):
            b["sources"] = "; ".join([s for s in (b.get("sources") or "").split("; ") if s] + ["Discogs"])
    if stats["read"] or todo:
        db["updated"] = today
        json.dump(db, open(DB, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "build.py")], check=True)
        line = (f"- {today}: Discogs sync read {stats['read']} records ({stats['greek']} name Greece), "
                f"added {stats['links']} links and {stats['cities']} cities")
        with open(os.path.join(ROOT, "CHANGELOG.md"), "a", encoding="utf-8") as f:
            f.write(line + "\n")
        print(line)
    left = sum(1 for b in db["bands"] if re.search(r"/artist/(\d+)", b.get("dc") or "") and not b.get("dc_read_on"))
    print(f"Discogs records still to read: {left}")


if __name__ == "__main__":
    main()
