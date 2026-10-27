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
