"""Apply one day's scan results to data/bands.json, then rebuild the outputs.

Run from the repo root:  python3 scripts/apply.py results.json

results.json format (every list may be empty):
{
  "date": "YYYY-MM-DD",
  "checked": [                      # every band you looked up today, found or not
    {"id": "abyssus",
     "ma": "https://www.metal-archives.com/bands/Abyssus/3540346146",   # "" if none confirmed
     "dc": "https://www.discogs.com/artist/3617954",                     # "" if none confirmed
     "dc_links_read": true,          # true only if you read the Discogs record and it names Greece
     "links": {"web": "", "fb": "", "yt": "", "ig": "", "bc": "", "sp": ""},  # only from that record
     "note": "short reason, e.g. 'name shared by 3 bands, skipped'"}
  ],
  "new_bands": [{"name": "Band", "genre": "Black Metal", "som": "https://www.spirit-of-metal.com/en/band/Band"}],
  "remove": [{"id": "abyssus", "field": "fb", "reason": "link now points to another band"}]
}
Fields that are empty in results never erase existing data; only "remove" erases.
"""
import json, os, re, sys, unicodedata, subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "data", "bands.json")
LINK_FIELDS = ["web", "fb", "yt", "ig", "bc", "sp"]
ALLOWED_HOSTS = {"ma": "metal-archives.com", "dc": "discogs.com", "fb": "facebook.com", "yt": "youtube.com",
                 "ig": "instagram.com", "bc": "bandcamp.com", "sp": "open.spotify.com"}

def norm(n):
    n = re.sub(r"\s*\((GRC|GRE)[^)]*\)", "", n)
    n = unicodedata.normalize("NFKD", n).encode("ascii", "ignore").decode()
    n = re.sub(r"^the ", "", n.lower())
    return re.sub(r"[^a-z0-9]", "", n)

def family(g):
    s = (g or "").lower()
    if re.search(r"\brock\b|glam|grunge|southern|hard fm", s) and "stoner" not in s: return "Rock"
    if "stoner" in s or "psychedelic" in s or "sludge" in s: return "Stoner & Sludge"
    if "black" in s: return "Black"
    if "progressive" in s: return "Progressive"
    if re.search(r"death|grind|deathcore", s) and not s.startswith("thrash") and "metalcore" not in s: return "Death & Grind"
    if re.search(r"thrash|speed metal|crossover|groove", s): return "Thrash & Speed"
    if re.search(r"doom|gothic|dark metal", s): return "Doom & Gothic"
    if re.search(r"power|heavy|neo classical|guitar hero|melodic metal|epic", s): return "Heavy & Power"
    if "symphonic" in s: return "Symphonic"
    if re.search(r"folk|pagan|viking", s): return "Folk & Pagan"
    if re.search(r"core|nu metal|alternative|crust|modern", s): return "Core & Alternative"
    return "Experimental & Ambient"

def clean_url(u, key):
    u = (u or "").strip()
    if not u: return ""
    if not u.startswith("http"): u = "https://" + u
    u = re.sub(r"^http://", "https://", u)
    u = re.sub(r"[?&](fref|utm_[a-z]+|si|igshid)=[^&]*", "", u).rstrip("?&")
    host = ALLOWED_HOSTS.get(key)
    if host and host not in u: return ""
    return u

def add_source(b, name):
    s = [x for x in (b.get("sources") or "").split("; ") if x]
    if name not in s: s.append(name)
    b["sources"] = "; ".join(s)

def add_note(b, note):
    if note and note not in (b.get("notes") or ""):
        b["notes"] = ((b.get("notes") or "") + (". " if b.get("notes") else "") + note)[:900]

def main():
    res = json.load(open(sys.argv[1], encoding="utf-8"))
    date = res["date"]
    db = json.load(open(DB, encoding="utf-8"))
    by_id = {b["id"]: b for b in db["bands"]}
    log = []

    for c in res.get("checked", []):
        b = by_id.get(c["id"])
        if not b: log.append(f"unknown id {c['id']}"); continue
        b["checked"] = date
        ma = clean_url(c.get("ma"), "ma")
        if ma and ma != b.get("ma"):
            b["ma"] = ma; add_source(b, "Metal Archives")
            add_note(b, "Metal Archives URL matched from search-result page title; page not opened")
            log.append(f"+ma {b['name']}")
        dc = clean_url(c.get("dc"), "dc")
        if dc and dc != b.get("dc"):
            b["dc"] = dc; add_source(b, "Discogs"); log.append(f"+dc {b['name']}")
        if c.get("dc_links_read"):
            b["dc_links_read"] = True
            add_note(b, "Official links taken from the band's Discogs artist profile, which names Greece")
            for k in LINK_FIELDS:
                u = clean_url((c.get("links") or {}).get(k), k)
                if u and u != b.get(k):
                    b[k] = u; log.append(f"+{k} {b['name']}")
        add_note(b, c.get("note", ""))

    known = {norm(b["name"]) for b in db["bands"]}
    for nb in res.get("new_bands", []):
        name = re.sub(r"\s*\((GRC|GRE)[^)]*\)", "", nb["name"]).strip()
        k = norm(nb["name"])
        if not k or k in known: continue
        bid = k; i = 2
        while bid in by_id: bid = f"{k}-{i}"; i += 1
        fam = family(nb.get("genre"))
        rec = {"id": bid, "name": name, "native": "", "genre": nb.get("genre", ""), "family": fam,
               "scene": "rock" if fam in ("Rock", "Stoner & Sludge") and "metal" not in (nb.get("genre") or "").lower() else "metal",
               "city": "", "city_verified": False, "ma": "", "web": "", "bc": "", "sp": "", "fb": "", "yt": "",
               "ig": "", "dc": "", "dc_links_read": False, "som": clean_url(nb.get("som"), "") ,
               "sources": "Spirit of Metal", "notes": f"Genre as listed by Spirit of Metal: {nb.get('genre','')}",
               "checked": "", "added": date}
        db["bands"].append(rec); by_id[bid] = rec; known.add(k)
        log.append(f"new band {name}")

    for r in res.get("remove", []):
        b = by_id.get(r["id"])
        if b and r.get("field") in ("ma", "dc") + tuple(LINK_FIELDS) and b.get(r["field"]):
            b[r["field"]] = ""
            if r["field"] == "dc": b["dc_links_read"] = False
            add_note(b, f"{r['field']} removed {date}: {r.get('reason','')}")
            log.append(f"-{r['field']} {b['name']}")

    db["updated"] = date
    with open(DB, "w", encoding="utf-8") as f:
        json.dump(db, f, ensure_ascii=False, indent=1)
    subprocess.run([sys.executable, os.path.join(ROOT, "scripts", "build.py")], check=True)

    summary = (f"- {date}: checked {len(res.get('checked', []))}, new bands "
               f"{sum(1 for l in log if l.startswith('new band'))}, removed "
               f"{sum(1 for l in log if l.startswith('-'))}, added links "
               f"{sum(1 for l in log if l.startswith('+'))}")
    with open(os.path.join(ROOT, "CHANGELOG.md"), "a", encoding="utf-8") as f:
        f.write(summary + "\n")
    print(summary)
    for l in log[:200]: print("  ", l)

if __name__ == "__main__":
    main()
