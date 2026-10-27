# Daily scan — Greek Rock & Metal Band Finder

This repo is the data source for the Band Finder page on wtbuzz.net. The page reads
`data/finder.json` straight from GitHub, so whatever is pushed to `main` is live within minutes.
Run this procedure once a day. Never invent a link: a link goes in only when a source confirms it.

## 0. Set up
```
python3 scripts/plan.py          # writes work.json and prints today's lists
```
`work.json` has five parts: `confirm`, `discogs_read`, `recheck`, `discovery_pages`, and counts.
Collect everything you find into one `results.json` (format at the top of `scripts/apply.py`).
Budget: at most ~170 web searches in total. Discogs API and Spirit of Metal pages are read with
WebFetch, not search.

## 1. Find new bands (`discovery_pages`)
WebFetch each Spirit of Metal Greece index page (stop at the first empty page). Prompt:
"Output ONLY the Greek band list in the main content (not the Famous Bands sidebar), one per line as
Name | Genre." Add every band to `new_bands` with its genre and
`https://www.spirit-of-metal.com/en/band/<Name with spaces as _>`. `apply.py` skips names already known.
Leave out joke porn-grind/gore-grind projects and NSBM / neo-Nazi acts.

## 2. Confirm links (`confirm`)
For each band, one WebSearch: `<Name> band Greece` with `allowed_domains`
`["metal-archives.com","discogs.com"]`. Add the genre if the name is a common word.
- **Metal Archives**: take a `https://www.metal-archives.com/bands/<Name>/<number>` URL only if its
  result title is that band and the other results (album titles, Greek words, other Greek bands)
  make clear it is the Greek band. If the name is shared by several bands (results like
  `"Name" - Encyclopaedia Metallum` with no number, or several numbered pages), leave it empty and
  note "name shared by several bands".
- **Discogs**: take an artist URL `https://www.discogs.com/artist/<id>-...` (keep only
  `https://www.discogs.com/artist/<id>`) only for the same band. Then read the record (step 3).
- Record every band you searched in `checked`, even with nothing found, so it is not repeated.
- Rock bands rarely have a Metal Archives page; Discogs is their main source.

## 3. Read Discogs records (`discogs_read`, plus any new Discogs URLs from step 2)
WebFetch `https://api.discogs.com/artists/<id>` with the prompt: "Output exactly: line 1 = name;
line 2 = GREEK if the profile text mentions Greece/Greek/Athens/Thessaloniki else NOT-STATED; then
every URL in the urls array, one per line, copied character-for-character."
- Only if line 2 says GREEK (or the name/discography leaves no doubt) set `dc_links_read: true` and fill
  `links`: official site → `web`, facebook.com → `fb`, youtube.com → `yt`, instagram.com profile
  (not `/p/` posts) → `ig`, bandcamp.com → `bc`, open.spotify.com/artist → `sp`.
- Ignore MySpace, Twitter/X, SoundCloud, Last.fm, Wikipedia, shops, Linktree, a member's personal account.
- A Metal Archives URL listed in the record counts as confirming `ma`.
- Discogs rate-limits fast requests. After an error, wait 60 s (`sleep 60` in the shell) and retry once;
  if it keeps failing, stop Discogs for today.

## 3b. Spotify and YouTube (about 20 bands a day that have `ma` or Discogs links but no `sp`/`yt`)
- **Spotify**: one WebSearch `<Name> album spotify` with `allowed_domains ["open.spotify.com"]`. Accept only
  if a result "<Album> - Album by <Name>" has an album title that also appears on the band's Metal Archives
  or Discogs discography. WebFetch that album URL with the prompt "Give only: album title | artist name |
  artist Spotify URL (open.spotify.com/artist/...) exactly as linked." and put the artist URL in `links.sp`
  (drop any `/intl-xx/` part). Name shared with another artist and no matching album → leave empty.
- **YouTube**: one WebSearch `<Name> official video YouTube` with `allowed_domains ["youtube.com"]`.
  Prefer the band's own channel (result titled "<Name> - YouTube" or "<Name> Official - YouTube").
  Otherwise take one video whose title is "<Name> - <song> (Official Video / Lyric Video / Audio)" for a
  song or album the band released. Never a fan upload, live bootleg, or a same-named other artist.
- Put what you find in `checked[].links` with a `note` saying which album or video confirmed it.

## 4. Re-check (`recheck`)
- Bands with `dc`: re-read the Discogs record. If a link we stored is no longer listed there, or the
  record no longer points to a Greek band, add it to `remove` with a reason.
- Bands with `ma`: one WebSearch `<Name> band Greece` on metal-archives.com. If the stored URL no longer
  appears and a different numbered URL for the same Greek band does, put the new one in `checked`.
  Never remove an `ma` link only because it did not appear in one search.

## 5. Apply and publish
```
python3 scripts/apply.py results.json
git add data CHANGELOG.md
git commit -m "Daily scan <date>: <summary line printed by apply.py>"
git push origin main
```
Do not commit `work.json` or `results.json`. If `apply.py` errors, fix `results.json` and rerun;
never hand-edit `data/finder.json` (it is rebuilt from `data/bands.json`).

## 6. Report
End with one short message: bands checked, links added, new bands, links removed, bands still unchecked.
