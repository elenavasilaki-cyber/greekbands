"""Print today's work list for the daily scan and save it to work.json (not committed).

Run from the repo root:  python3 scripts/plan.py [confirm_count] [discogs_count] [recheck_count]
"""
import datetime, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LINK_KEYS = ["ma", "yt", "sp", "fb", "ig", "bc", "web", "dc"]

def main():
    n_confirm = int(sys.argv[1]) if len(sys.argv) > 1 else 110
    n_discogs = int(sys.argv[2]) if len(sys.argv) > 2 else 20
    n_recheck = int(sys.argv[3]) if len(sys.argv) > 3 else 20
    db = json.load(open(os.path.join(ROOT, "data", "bands.json"), encoding="utf-8"))
    bands = sorted(db["bands"], key=lambda b: b["name"].lower())
    today = datetime.date.today()
    cutoff = (today - datetime.timedelta(days=30)).isoformat()

    confirm = [b for b in bands if not b.get("checked")][:n_confirm]
    discogs = [b for b in bands if b.get("dc") and not b.get("dc_links_read")][:n_discogs]
    linked = [b for b in bands if any(b.get(k) for k in LINK_KEYS) and b.get("checked") and b["checked"] <= cutoff]
    recheck = sorted(linked, key=lambda b: b["checked"])[:n_recheck]

    def slim(b, keys):
        return {k: b.get(k, "") for k in keys}
    work = {
        "date": today.isoformat(),
        "confirm": [slim(b, ["id", "name", "genre", "city"]) for b in confirm],
        "discogs_read": [slim(b, ["id", "name", "dc"]) for b in discogs],
        "recheck": [slim(b, ["id", "name", "checked"] + LINK_KEYS) for b in recheck],
        "discovery_pages": [f"https://www.spirit-of-metal.com/en/bands/Greece/{p}" for p in range(1, 21)],
        "known_count": len(bands),
        "still_unchecked": sum(1 for b in bands if not b.get("checked")),
    }
    with open(os.path.join(ROOT, "work.json"), "w", encoding="utf-8") as f:
        json.dump(work, f, ensure_ascii=False, indent=1)
    print(f"date {work['date']}: confirm {len(work['confirm'])}, discogs_read {len(work['discogs_read'])}, "
          f"recheck {len(work['recheck'])}, still unchecked {work['still_unchecked']} of {len(bands)}")
    print("confirm:", "; ".join(b["name"] for b in work["confirm"]))

if __name__ == "__main__":
    main()
