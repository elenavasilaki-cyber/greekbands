"""Rebuild the published outputs from data/bands.json.

Writes:
  data/finder.json      compact data the WordPress finder page loads
  data/Bands_Master.csv same columns as the Bands_Master sheet of the import template
Run from the repo root:  python3 scripts/build.py
"""
import csv, json, os, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
LINK_KEYS = ["ma", "yt", "sp", "fb", "ig", "bc", "web", "dc"]

def confidence(b):
    if b.get("dc_links_read") and b.get("ma"): return "high"
    if b.get("dc_links_read") or b.get("ma"): return "medium"
    return "low"

def review_status(b):
    return "provisional" if (b.get("ma") or b.get("dc_links_read")) else "needs_review"

WORDS = {"black","death","thrash","heavy","power","doom","speed","gothic","progressive","symphonic","melodic",
         "atmospheric","brutal","technical","epic","pagan","folk","viking","avant-garde","sludge","stoner",
         "industrial","experimental","groove","neo","modern","dark","ambient","electro","cyber","funeral"}
PAIR = {"thrash","death","black","heavy","speed","doom","power"}

def norm_genre(g):
    g = (g or "").strip()
    if not g: return ""
    low = g.lower()
    if re.search(r"metal|rock|core|grind|synth|crust|drone|hardcore|ambient|crossover|grunge|hero|classical|death'n'roll|hard fm", low):
        return g
    parts = low.split()
    if all(p in WORDS for p in parts):
        if len(parts) == 2 and parts[0] in PAIR and parts[1] in PAIR:
            return f"{parts[0].capitalize()}/{parts[1]} metal"
        return g[0].upper() + g[1:].lower() + " metal"
    return g

def main():
    db = json.load(open(os.path.join(DATA, "bands.json"), encoding="utf-8"))
    bands = sorted(db["bands"], key=lambda b: b["name"].lower())

    fields = ["id", "name", "native", "genre", "family", "scene", "city", "src"] + LINK_KEYS
    rows = []
    for b in bands:
        src = [s for s in ["Metal Archives" if b.get("ma") else "", "Discogs" if b.get("dc") else ""] if s]
        if not src:
            src = [s for s in (b.get("sources") or "").split("; ") if s][:2]
        b = dict(b, src=" · ".join(src))
        row = [b.get(f) or "" for f in fields]
        while len(row) > 8 and row[-1] == "":
            row.pop()
        rows.append(row)
    finder = {"updated": db.get("updated", ""), "count": len(rows),
              "with_links": sum(1 for b in bands if any(b.get(k) for k in LINK_KEYS)),
              "fields": fields, "rows": rows}
    with open(os.path.join(DATA, "finder.json"), "w", encoding="utf-8") as f:
        json.dump(finder, f, ensure_ascii=False, separators=(",", ":"))

    hdr = ["canonical_band_name","name_native_script","aliases","country","city_or_region","formation_year",
           "end_year","status","primary_genre","subgenres","language","description","member_names",
           "discography_summary","musicbrainz_artist_id","musicbrainz_url","metal_archives_url",
           "official_website","bandcamp_url","spotify_url","other_source_urls","source_names","source_notes",
           "confidence","review_status","last_verified_date"]
    with open(os.path.join(DATA, "Bands_Master.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f); w.writerow(hdr)
        for b in bands:
            others = "; ".join(u for u in [b.get("fb"), b.get("yt"), b.get("ig"), b.get("dc"), b.get("som")] if u)
            w.writerow([b["name"], b.get("native",""), "", "Greece", b.get("city",""), "", "", "",
                        "Rock" if b.get("scene") == "rock" else "Metal", norm_genre(b.get("genre")), "", "", "", "",
                        "", "", b.get("ma",""), b.get("web",""), b.get("bc",""), b.get("sp",""), others,
                        b.get("sources",""), b.get("notes",""), confidence(b), review_status(b),
                        b.get("checked","") if (b.get("ma") or b.get("dc_links_read")) else ""])
    print(f"built finder.json ({len(rows)} bands, {finder['with_links']} with links) and Bands_Master.csv")

if __name__ == "__main__":
    main()
