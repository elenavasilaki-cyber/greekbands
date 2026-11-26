# Daily venue scan — Greek Rock & Metal Venue Finder

The Venue Finder page on wtbuzz.net reads `venues/venues.json` straight from GitHub, so whatever is
pushed to `main` is live within minutes. Run this once a day, unattended. Never invent anything: a venue,
address, phone, email or website goes in only when a page you actually read confirms it.

## What counts as a venue
A place in Greece (mainland or islands) that **hosted at least one rock, metal, punk, hardcore, stoner,
goth or post-rock gig in the last 12 months or has one announced**, confirmed by a gig listing or the
venue's own page. Types: `club` (clubs, bars and cafés with a stage), `hall` (indoor halls, theatres,
cinemas), `openair` (open-air theatres, festival grounds, stadiums). Leave out record shops, rehearsal
studios, places that only play recorded music, and pure pop/laïko/entechno venues.

## 1. Find new venues (budget: about 40 web searches/fetches)
Read the gig listings and collect every venue name with its city:
- https://www.rocking.gr/agenda (and its next pages)
- https://www.cometogether.live, https://www.more.com/gr-el/tickets/music/, https://www.ticketservices.gr
- https://events.musicofourdesire.com/events/Athens (and /Thessaloniki, /Heraklion, /Patras)
- WebSearch: `συναυλία metal <city> 2026`, `rock live <city> club`, `Greece metal tour dates <month> <year>`,
  rotating a few cities a day that have few venues: Kavala, Serres, Drama, Xanthi, Komotini,
  Alexandroupoli, Kozani, Veria, Katerini, Lamia, Chalkida, Agrinio, Pyrgos, Tripoli, Nafplio, Sparti,
  Rethymno, Agios Nikolaos, Rhodes, Mytilene, Syros, Chios, Samos, Kos, Zakynthos, Kefalonia, Preveza, Arta.
For each venue NOT already in `venues/venues.json` (compare names ignoring accents and Greek/Latin
spelling — `scripts/venues_apply.py` also skips duplicates), confirm it with one gig page and, if you can,
the venue's own page or Facebook/Instagram page for the street address, phone, email and website.

## 2. Fill gaps in existing venues (about 10 venues a day)
Pick venues whose `address` is only the city name, or that have no `url`, oldest `checked` first.
Search `<venue name> <city>` and take the street address / website / phone / email only from the venue's
own site or official social page (or a ticketing page that shows the venue's address). Put them in
`updates` with the `source_url`. Record every venue you looked at in `checked`.

## 3. Closed venues
If you see a reliable report that a venue has closed for good (news article or the venue's own post),
add it to `closed` with that `source_url`. Never remove a venue just because you found no gigs.

## 4. Write `venues_results.json` (in the repo root; never commit it)
Format is at the top of `scripts/venues_apply.py`. For a city not yet in `cities`, add it to `new_cities`
with real coordinates (city centre), a region (Attica, Macedonia, Thrace, Thessaly, Epirus, Central Greece,
Ionian Islands, Peloponnese & West, Aegean Islands, Crete) and a label side `lbl` (r, l, a, b — pick one
that won't overlap a nearby city's label). `note` is one plain sentence in English about the kind of
shows it hosts. `source` is the short site name (e.g. "rocking.gr agenda"); `source_url` the exact page.

## 5. Apply and push
```
python3 scripts/venues_apply.py venues_results.json
git add venues wordpress/venue-finder.html CHANGELOG.md
git commit -m "Venue scan <date>: <n> new, <n> updated"   # only if something changed
git pull --rebase origin main && git push origin main
```
Never hand-edit `venues/venues.json` except to fix a mistake the script cannot.
