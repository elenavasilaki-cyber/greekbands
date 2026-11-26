# Greek Rock & Metal Band Finder — data

Data behind the Greek Rock & Metal Band Finder on [wtbuzz.net](https://wtbuzz.net).

- `data/bands.json` — master list (one record per band, with sources and notes)
- `data/finder.json` — compact copy the finder page loads (rebuilt by `scripts/build.py`)
- `data/Bands_Master.csv` — same data in the columns of the Bands_Master import template
- `DAILY_SCAN.md` — the procedure the daily scan follows
- `CHANGELOG.md` — one line per daily scan

Links are added only when Metal Archives or a Discogs artist profile confirms them; Spotify only when an
album title matches the band's discography, YouTube only for the band's channel or an official video.
Not yet human-verified; please report mistakes to info@wtbuzz.net.

Sources: Spirit of Metal (Greece band index), Wikipedia (de) list of Greek metal bands,
Encyclopaedia Metallum, Discogs.

The daily scan runs every morning (about 04:30 Athens time) and follows `DAILY_SCAN.md`.

## Venue Finder
- `venues/venues.json` — venues the Greek Rock & Metal Venue Finder page loads (cities with map coordinates + venues)
- `venues/VENUE_SCAN.md` — procedure of the daily venue scan (about 05:40 Athens time)
- `scripts/venues_apply.py` — merges a scan into `venues/venues.json`
- `wordpress/venue-finder.html` — the code to paste into the WordPress Custom HTML block
