#!/usr/bin/env python3
"""Merge a daily venue scan into venues/venues.json.

Usage: python3 scripts/venues_apply.py venues_results.json

venues_results.json (every key optional):
{
  "new_venues": [
    {"name": "...", "city": "Kavala", "address": "Street 12, Area", "type": "club|hall|openair",
     "note": "One sentence: what kind of rock/metal shows it hosts.",
     "url": "", "phone": "", "email": "",
     "source": "rocking.gr agenda", "source_url": "https://... (page that lists a rock/metal gig there)"}
  ],
  "new_cities": {"Kavala": {"lat": 40.9369, "lng": 24.4129, "region": "Macedonia", "lbl": "r"}},
  "updates": [
    {"id": "eightball-club-thessaloniki", "address": "...", "url": "...", "phone": "...", "email": "...",
     "source_url": "https://... (page that confirms the new detail)"}
  ],
  "closed": [{"id": "...", "source_url": "https://... (news/post saying it closed)", "reason": "..."}],
  "checked": ["id", "id"]
}

Rules enforced here: a new venue needs a city with coordinates, a valid type, a note and a source_url;
names already in the list (same city, ignoring accents, Greek/Latin spelling and words like Club/Live)
are skipped; updates only fill EMPTY fields unless "replace": true; nothing is ever deleted
(closed venues get status "closed" and the page hides them).
"""
import json, re, sys, unicodedata, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "venues" / "venues.json"
PAGE = ROOT / "wordpress" / "venue-finder.html"
LOG = ROOT / "CHANGELOG.md"
TYPES = {"club", "hall", "openair"}
REGIONS = ["Attica", "Macedonia", "Thrace", "Thessaly", "Epirus", "Central Greece", "Ionian Islands",
           "Peloponnese & West", "Aegean Islands", "Crete"]
FIELDS = ["address", "type", "note", "url", "phone", "email"]

GR = dict(zip("αβγδεζηθικλμνξοπρστυφχψωάέήίόύώϊϋΐΰς",
              ["a","v","g","d","e","z","i","th","i","k","l","m","n","x","o","p","r","s","t","y","f","ch","ps","o",
               "a","e","i","i","o","y","o","i","y","i","y","s"]))
STOP = {"club", "live", "stage", "venue", "music", "the", "bar", "cafe", "kafe", "polychoros", "athens"}


def key(name):
    s = name.lower()
    s = re.sub(r"\(.*?\)", " ", s)
    s = "".join(GR.get(c, c) for c in s)
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    words = [w for w in re.split(r"[^a-z0-9]+", s) if w and w not in STOP]
    return "".join(words)


def slug(text):
    s = "".join(GR.get(c, c) for c in text.lower())
    s = re.sub(r"\(.*?\)", " ", s)
    s = unicodedata.normalize("NFD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-")


def is_url(u):
    return isinstance(u, str) and re.match(r"^https?://[^\s]+$", u or "") is not None


def main(path):
    data = json.loads(DATA.read_text(encoding="utf-8"))
    res = json.loads(pathlib.Path(path).read_text(encoding="utf-8"))
    today = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=2))).date().isoformat()
    cities, venues = data["cities"], data["venues"]
    by_id = {v["id"]: v for v in venues}
    added, cities_added, updated, closed, skipped = [], [], [], [], []

    for name, c in (res.get("new_cities") or {}).items():
        if name in cities:
            continue
        try:
            lat, lng = float(c["lat"]), float(c["lng"])
        except (KeyError, TypeError, ValueError):
            skipped.append(f"city {name}: no coordinates"); continue
        if not (34.5 < lat < 42.0 and 19.0 < lng < 29.9):
            skipped.append(f"city {name}: coordinates outside Greece"); continue
        region = c.get("region")
        if region not in REGIONS:
            skipped.append(f"city {name}: region must be one of {REGIONS}"); continue
        cities[name] = {"lat": round(lat, 4), "lng": round(lng, 4), "lbl": c.get("lbl", "r") if c.get("lbl") in ("r", "l", "a", "b") else "r", "region": region}
        cities_added.append(name)

    for v in res.get("new_venues") or []:
        name, city = (v.get("name") or "").strip(), (v.get("city") or "").strip()
        why = None
        if not name: why = "no name"
        elif city not in cities: why = f"city '{city}' has no coordinates (add it to new_cities)"
        elif v.get("type") not in TYPES: why = "type must be club, hall or openair"
        elif not (v.get("note") or "").strip(): why = "no note"
        elif not is_url(v.get("source_url")): why = "no source_url"
        else:
            k = key(name)
            for o in venues:
                if o["city"] == city and k and (key(o["name"]) == k or key(o["name"]) in k or k in key(o["name"])):
                    why = f"already listed as {o['name']}"; break
        if why:
            skipped.append(f"{name or '?'}: {why}"); continue
        vid = base = f"{slug(name)}-{slug(city)}"
        n = 2
        while vid in by_id:
            vid = f"{base}-{n}"; n += 1
        rec = {"id": vid, "name": name, "city": city, "address": (v.get("address") or city).strip(),
               "type": v["type"], "note": v["note"].strip(),
               "url": v.get("url", "") if is_url(v.get("url", "")) else "",
               "phone": (v.get("phone") or "").strip(), "email": (v.get("email") or "").strip(),
               "source": (v.get("source") or "Gig listing").strip(), "source_url": v["source_url"],
               "added": today, "checked": today, "status": "open"}
        venues.append(rec); by_id[vid] = rec; added.append(f"{name} ({city})")

    for u in res.get("updates") or []:
        o = by_id.get(u.get("id"))
        if not o:
            skipped.append(f"update {u.get('id')}: unknown id"); continue
        if not is_url(u.get("source_url")):
            skipped.append(f"update {o['name']}: no source_url"); continue
        changed = []
        for f in FIELDS:
            val = u.get(f)
            if val in (None, ""):
                continue
            if f == "url" and not is_url(val):
                continue
            if f == "type" and val not in TYPES:
                continue
            empty = not o.get(f) or (f == "address" and o.get(f) == o["city"])
            if (empty or u.get("replace")) and o.get(f) != val:
                o[f] = val.strip() if isinstance(val, str) else val; changed.append(f)
        if changed:
            o["checked"] = today
            if not o.get("source_url"):
                o["source_url"] = u["source_url"]
            updated.append(f"{o['name']} ({', '.join(changed)})")

    for c in res.get("closed") or []:
        o = by_id.get(c.get("id"))
        if o and is_url(c.get("source_url")) and o.get("status") != "closed":
            o["status"] = "closed"; o["closed_source"] = c["source_url"]; o["checked"] = today
            closed.append(o["name"])

    for vid in res.get("checked") or []:
        if vid in by_id:
            by_id[vid]["checked"] = today

    data["updated"] = today
    DATA.write_text(json.dumps(data, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")

    # keep the paste-ready page's built-in copy current (used only if GitHub can't be reached)
    if PAGE.exists():
        page = PAGE.read_text(encoding="utf-8")
        compact = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
        page = re.sub(r"/\*FALLBACK_START\*/.*?/\*FALLBACK_END\*/",
                      lambda m: "/*FALLBACK_START*/" + compact + "/*FALLBACK_END*/", page, flags=re.S)
        PAGE.write_text(page, encoding="utf-8")

    if added or updated or closed or cities_added:
        line = (f"- {today}: Venue scan: {len(added)} new venues"
                + (f" ({'; '.join(added)})" if added else "")
                + f", {len(updated)} updated, {len(closed)} closed"
                + (f", new cities: {', '.join(cities_added)}" if cities_added else ""))
        with LOG.open("a", encoding="utf-8") as fh:
            fh.write(line + "\n")

    live = sum(1 for v in venues if v.get("status") != "closed")
    print(f"new venues: {len(added)}")
    for a in added: print("  +", a)
    print(f"new cities: {len(cities_added)} {cities_added}")
    print(f"updated: {len(updated)}")
    for a in updated: print("  ~", a)
    print(f"closed: {len(closed)} {closed}")
    print(f"skipped: {len(skipped)}")
    for a in skipped: print("  -", a)
    print(f"venues listed on the page: {live}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
