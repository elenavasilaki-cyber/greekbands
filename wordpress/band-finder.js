/* Greek Rock & Metal Band Finder - wtbuzz.net
   Loaded by a WordPress Custom HTML block:
   <div id="gbf"></div>
   <script src="https://cdn.jsdelivr.net/gh/elenavasilaki-cyber/greekbands@main/wordpress/band-finder.js"></script>
*/
(function(){
  function start(){
    var root = document.getElementById("gbf");
    if (!root || root.getAttribute("data-ready")) return;
    root.setAttribute("data-ready", "1");
    var st = document.createElement("style");
    st.textContent = "#gbf{color-scheme:dark;--bg:#000000;--panel:#121212;--panel-2:#1a1716;--line:rgba(255,255,255,0.09);\n  --ink:#eee9e2;--ink-soft:#a39d94;--ink-faint:#6e6862;--ember:#c9391f;--ember-glow:#e85f2f;--gold:#c99a4a;\n  --link:#e01414;--link-hover:#ff3b30;\n  background:var(--bg);color:var(--ink);font-family:'Jost',-apple-system,'Segoe UI',sans-serif;-webkit-font-smoothing:antialiased;\n  line-height:1.45;padding:1.8rem 16px 2.5rem;box-sizing:border-box}\n#gbf *{box-sizing:border-box}\n#gbf a{color:var(--link);text-decoration:none}\n#gbf a:hover{color:var(--link-hover)}\n#gbf .gbf-wrap{max-width:1100px;margin:0 auto}\n#gbf .gbf-title{font-family:'Oswald','Arial Narrow',sans-serif!important;font-weight:700!important;letter-spacing:0.02em;color:var(--ink)!important;\n  font-size:clamp(1.4rem,4.5vw,2rem)!important;margin:0 0 0.4rem!important;text-transform:uppercase;text-align:center;line-height:1.2;text-wrap:balance}\n#gbf .gbf-title .amp{color:var(--ember-glow)}\n#gbf .gbf-sub{color:var(--ink-soft);font-size:0.92rem;max-width:60ch;margin:0 auto;line-height:1.5;text-align:center}\n#gbf .gbf-search{display:flex;gap:0.6rem;flex-wrap:wrap;margin:1.2rem 0 1rem}\n#gbf .gbf-search input,#gbf .gbf-search select{background:var(--panel)!important;color:var(--ink)!important;border:1px solid var(--line)!important;\n  border-radius:6px!important;padding:0.7rem 0.9rem!important;font-size:0.95rem!important;font-family:inherit!important;outline:none;box-shadow:none!important;height:auto!important;margin:0!important}\n#gbf .gbf-search input{flex:1 1 260px;min-width:0}\n#gbf .gbf-search select{flex:0 1 auto;cursor:pointer;width:auto!important}\n#gbf .gbf-search input:focus,#gbf .gbf-search select:focus{border-color:var(--ember)!important}\n#gbf .gbf-label{font-family:'Oswald',sans-serif;text-transform:uppercase;letter-spacing:0.08em;font-size:0.68rem;color:var(--gold);margin:0.2rem 0 0.4rem}\n#gbf .gbf-pills{display:flex!important;flex-wrap:wrap!important;gap:0.45rem!important;margin-bottom:0.7rem}\n#gbf button.gbf-pill{display:inline-flex!important;align-items:center!important;width:auto!important;max-width:none!important;min-width:0!important;\n  min-height:0!important;height:auto!important;flex:0 0 auto!important;float:none!important;margin:0!important;padding:0.4rem 0.85rem!important;\n  line-height:1.2!important;box-shadow:none!important;font-size:0.78rem!important;font-weight:400!important;text-align:center!important;\n  font-family:'Oswald',sans-serif!important;letter-spacing:0.03em!important;text-transform:uppercase!important;cursor:pointer;\n  background:var(--panel)!important;color:var(--ink-soft)!important;border:1px solid var(--line)!important;border-radius:999px!important;\n  transition:background .15s ease,border-color .15s ease,color .15s ease}\n#gbf button.gbf-pill:hover{border-color:rgba(201,57,31,0.6)!important;color:var(--ink)!important}\n#gbf button.gbf-pill.on{background:var(--ember)!important;border-color:var(--ember)!important;color:#fff!important}\n#gbf .gbf-pill small{opacity:.6;margin-left:0.3rem;font-size:inherit;font-variant-numeric:tabular-nums}\n#gbf .gbf-count{color:var(--ink-soft);font-size:0.82rem;margin:0.4rem 0 0.8rem}\n#gbf .gbf-count b{color:var(--ink);font-weight:500}\n#gbf .gbf-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0.9rem;align-items:start}\n@media (max-width:680px){#gbf .gbf-grid{grid-template-columns:1fr}}\n#gbf .gbf-card{background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:1rem 1.1rem;min-width:0;transition:border-color .15s ease}\n#gbf .gbf-card:hover{border-color:rgba(201,57,31,0.6)}\n#gbf .gbf-name{font-family:'Oswald',sans-serif!important;font-size:1.05rem!important;font-weight:600!important;color:var(--ink)!important;margin:0!important;\n  line-height:1.3!important;word-break:break-word;text-transform:none;letter-spacing:0.01em}\n#gbf .gbf-native{color:var(--ink-faint);font-family:'Jost',sans-serif;font-size:0.85rem;margin-left:6px;font-weight:400}\n#gbf .gbf-meta{display:flex;flex-wrap:wrap;gap:0.35rem 0.6rem;margin:0.45rem 0 0;font-size:0.84rem;color:var(--ink-soft);align-items:center}\n#gbf .gbf-meta .gbf-genre{font-size:0.68rem;letter-spacing:0.04em;text-transform:uppercase;background:rgba(201,57,31,0.14);color:var(--ember-glow);\n  border:1px solid rgba(201,57,31,0.3);padding:0.15rem 0.5rem;border-radius:999px}\n#gbf .gbf-links{display:flex;flex-wrap:wrap;gap:0.35rem 0.9rem;margin-top:0.7rem;padding-top:0.55rem;border-top:1px solid var(--line)}\n#gbf .gbf-links a{color:var(--link);font-size:0.8rem;border-bottom:1px solid transparent;white-space:nowrap}\n#gbf .gbf-links a:after{content:\" \\2197\"}\n#gbf .gbf-links a:hover{color:var(--link-hover);border-bottom-color:var(--link-hover)}\n#gbf .gbf-nolinks{color:var(--ink-faint);font-size:0.8rem;margin-top:0.7rem;padding-top:0.55rem;border-top:1px solid var(--line)}\n#gbf .gbf-src{color:var(--ink-faint);font-size:0.72rem;margin-top:0.45rem}\n#gbf button.gbf-more{display:block!important;margin:1.6rem auto 0!important;width:auto!important;background:transparent!important;color:var(--ember-glow)!important;\n  border:1px solid var(--ember)!important;border-radius:999px!important;padding:0.55rem 1.4rem!important;font-size:0.82rem!important;font-weight:500!important;\n  font-family:'Oswald',sans-serif!important;letter-spacing:0.06em!important;text-transform:uppercase!important;cursor:pointer;box-shadow:none!important;height:auto!important}\n#gbf button.gbf-more:hover{background:var(--ember)!important;color:#fff!important}\n#gbf .gbf-more[hidden]{display:none!important}\n#gbf .gbf-msg{text-align:center;color:var(--ink-soft);padding:2.5rem 1rem;font-size:0.9rem}\n#gbf .gbf-foot{color:var(--ink-soft);font-size:0.76rem;text-align:center;margin:2rem auto 0;padding-top:2rem;border-top:1px solid var(--line);line-height:1.6;max-width:none}\n#gbf .gbf-foot a{color:var(--link)}\n#gbf .gbf-mapbox{position:relative;margin:0.4rem 0 0.6rem}\n#gbf .gbf-map{border:1px solid var(--line);border-radius:8px;background:#070707;overflow:hidden}\n#gbf .gbf-svg{display:block;width:100%;height:auto;max-height:520px}\n#gbf .gbf-maphint{color:var(--ink-faint);font-size:0.72rem;margin:6px 2px 0;text-align:left!important}\n#gbf .gbf-country{fill:#0f0e0d;stroke:#1f1c1a;stroke-width:0.6}\n#gbf .gbf-country.gr{fill:#1d1a18;stroke:#3a332e;stroke-width:0.8}\n#gbf .gbf-grid-line{stroke:rgba(255,255,255,0.04);stroke-width:1;fill:none}\n#gbf .gbf-sea{fill:#2a2522;font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:0.3em;text-transform:uppercase}\n#gbf .gbf-mpin{cursor:pointer}\n#gbf .gbf-mpin .halo{fill:rgba(201,57,31,0.18);stroke:rgba(232,95,47,0.5);stroke-width:1}\n#gbf .gbf-mpin .core{fill:var(--ember);stroke:#fff;stroke-width:1.5}\n#gbf .gbf-mpin .count{fill:#fff;font-family:'Oswald',sans-serif;font-weight:600;font-size:12px;text-anchor:middle;dominant-baseline:central;pointer-events:none}\n#gbf .gbf-mpin .city{fill:var(--ink);font-family:'Oswald',sans-serif;font-size:13px;letter-spacing:0.06em;text-transform:uppercase;paint-order:stroke;stroke:#000;stroke-width:3px;pointer-events:none}\n#gbf .gbf-mpin.on .core{fill:var(--gold)}\n#gbf .gbf-mpin:focus{outline:none}\n#gbf .gbf-mpin:focus-visible .core{stroke:var(--gold);stroke-width:3}\n#gbf .gbf-label,#gbf .gbf-count,#gbf .gbf-card,#gbf .gbf-card *{text-align:left!important}\n#gbf .gbf-card h3,#gbf .gbf-name{text-align:left!important;justify-content:flex-start!important}\n@media (prefers-reduced-motion:reduce){#gbf *{transition:none!important}}";
    if (!document.querySelector('link[href*="family=Oswald"]')) {
      var fl = document.createElement("link");
      fl.rel = "stylesheet";
      fl.href = "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Jost:wght@300;400;500&display=swap";
      document.head.appendChild(fl);
    }
    document.head.appendChild(st);
    root.innerHTML = "<div class=\"gbf-wrap\">\n  <h2 class=\"gbf-title\">Greek Rock <span class=\"amp\">&amp;</span> Metal Band Finder</h2>\n  <p class=\"gbf-sub\">Every Greek rock and metal band we know of, with genre, city and official links. Updated daily.</p>\n\n  <div class=\"gbf-search\">\n    <input type=\"search\" id=\"gbf-q\" placeholder=\"Search band, genre or city...\" aria-label=\"Search bands\">\n    <select id=\"gbf-sort\" aria-label=\"Sort\">\n      <option value=\"links\">Most links first</option>\n      <option value=\"az\">A&ndash;Z</option>\n      <option value=\"za\">Z&ndash;A</option>\n    </select>\n  </div>\n  <div class=\"gbf-label\">Scene</div>\n  <div class=\"gbf-pills\" id=\"gbf-scene\"></div>\n  <div class=\"gbf-label\" id=\"gbf-family-label\">Genre</div>\n  <div class=\"gbf-pills\" id=\"gbf-family\"></div>\n  <div class=\"gbf-label\">Show only</div>\n  <div class=\"gbf-pills\" id=\"gbf-extra\"></div>\n\n  <div class=\"gbf-mapbox\"><div class=\"gbf-map\" id=\"gbf-map\"></div><p class=\"gbf-maphint\" id=\"gbf-maphint\"></p></div>\n  <div class=\"gbf-count\" id=\"gbf-count\">Loading bands&hellip;</div>\n  <div class=\"gbf-grid\" id=\"gbf-grid\"></div>\n  <button type=\"button\" class=\"gbf-more\" id=\"gbf-more\" hidden>Show more bands</button>\n\n  <p class=\"gbf-foot\" id=\"gbf-foot\">Links are added only when Metal Archives or Discogs confirms them; Spotify only when an album matches the band\u2019s discography, YouTube only for the band\u2019s channel or an official video. Map geometry: Natural Earth via Datamaps.\n    Spotted a mistake or missing band? Write to <a href=\"mailto:info@wtbuzz.net\">info@wtbuzz.net</a>.</p>\n</div>";
    run();
  }
  function run(){
  var SOURCES = [
    "https://raw.githubusercontent.com/elenavasilaki-cyber/greekbands/main/data/finder.json",
    "https://cdn.jsdelivr.net/gh/elenavasilaki-cyber/greekbands@main/data/finder.json"
  ];
  var LINKS = [["yt","YouTube"],["sp","Spotify"],["bc","Bandcamp"],["web","Website"],
               ["fb","Facebook"],["ig","Instagram"],["ma","Metal Archives"],["dc","Discogs"]];
  var PAGE = 40;

  var root = document.getElementById("gbf");
  var $ = function(id){ return document.getElementById(id); };
  var bands = [], shown = PAGE;
  var state = { q:"", scene:"", family:"", linked:false, media:false, city:false, place:"", sort:"links" };
  var CITIES = {}, map = null, layer = null;

  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]; }); }
  function safeUrl(u){ return /^https:\/\//i.test(u || "") ? u : ""; }
  function fold(s){ return String(s || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

  function load(i){
    if (i >= SOURCES.length) return Promise.reject(new Error("no source"));
    return fetch(SOURCES[i], {cache:"no-cache"}).then(function(r){
      if (!r.ok) throw new Error(r.status);
      return r.json();
    }).catch(function(){ return load(i + 1); });
  }

  function pill(container, label, count, active, onClick){
    var b = document.createElement("button");
    b.type = "button";
    b.className = "gbf-pill" + (active ? " on" : "");
    b.innerHTML = esc(label) + (count != null ? "<small>" + count + "</small>" : "");
    b.addEventListener("click", onClick);
    container.appendChild(b);
  }

  function countBy(list, key){
    var m = {};
    list.forEach(function(b){ if (b[key]) m[b[key]] = (m[b[key]] || 0) + 1; });
    return m;
  }

  function drawPills(){
    var sc = $("gbf-scene"); sc.innerHTML = "";
    var scenes = countBy(bands, "scene");
    pill(sc, "All bands", bands.length, !state.scene, function(){ state.scene = ""; state.family = ""; refresh(); });
    [["metal","Metal"],["rock","Rock"]].forEach(function(s){
      if (scenes[s[0]]) pill(sc, s[1], scenes[s[0]], state.scene === s[0],
        function(){ state.scene = s[0]; state.family = ""; refresh(); });
    });

    var fam = $("gbf-family"); fam.innerHTML = "";
    var pool = bands.filter(function(b){ return !state.scene || b.scene === state.scene; });
    var fams = countBy(pool, "family");
    var names = Object.keys(fams).sort(function(a,b){ return fams[b] - fams[a]; });
    $("gbf-family-label").style.display = names.length > 1 ? "" : "none";
    if (names.length > 1) {
      pill(fam, "All genres", null, !state.family, function(){ state.family = ""; refresh(); });
      names.forEach(function(f){
        pill(fam, f, fams[f], state.family === f,
          function(){ state.family = (state.family === f ? "" : f); refresh(); });
      });
    }

    var ex = $("gbf-extra"); ex.innerHTML = "";
    pill(ex, "Has links", null, state.linked, function(){ state.linked = !state.linked; refresh(); });
    pill(ex, "Has YouTube / Spotify", null, state.media, function(){ state.media = !state.media; refresh(); });
    pill(ex, "City known", null, state.city, function(){ state.city = !state.city; refresh(); });
    if (state.place) pill(ex, "\uD83D\uDCCD " + state.place + "  \u2715", null, true, function(){ state.place = ""; refresh(); });
  }

  function filtered(noPlace){
    var q = fold(state.q.trim());
    var out = bands.filter(function(b){
      if (state.scene && b.scene !== state.scene) return false;
      if (state.family && b.family !== state.family) return false;
      if (state.linked && !b._n) return false;
      if (state.media && !(b.yt || b.sp)) return false;
      if (state.city && !b.city) return false;
      if (!noPlace && state.place && b.city !== state.place) return false;
      if (q && b._s.indexOf(q) === -1) return false;
      return true;
    });
    out.sort(function(a,b){
      if (state.sort === "links" && a._n !== b._n) return b._n - a._n;
      var c = a._k.localeCompare(b._k);
      return state.sort === "za" ? -c : c;
    });
    return out;
  }

  function card(b){
    var links = LINKS.filter(function(l){ return safeUrl(b[l[0]]); }).map(function(l){
      return '<a href="' + esc(b[l[0]]) + '" target="_blank" rel="noopener">' + l[1] + '</a>';
    }).join("");
    var meta = [];
    if (b.genre) meta.push('<span class="gbf-genre">' + esc(b.genre) + '</span>');
    if (b.city) meta.push('<span>\uD83D\uDCCD ' + esc(b.city) + '</span>');
    else meta.push('<span>Greece</span>');
    return '<div class="gbf-card">' +
      '<h3 class="gbf-name">' + esc(b.name) +
        (b.native ? '<span class="gbf-native">' + esc(b.native) + '</span>' : '') + '</h3>' +
      '<div class="gbf-meta">' + meta.join("") + '</div>' +
      (links ? '<div class="gbf-links">' + links + '</div>'
             : '<div class="gbf-nolinks">No confirmed links yet</div>') +
      (b.src ? '<div class="gbf-src">Source: ' + esc(b.src) + '</div>' : '') +
    '</div>';
  }

  function draw(){
    var list = filtered();
    $("gbf-count").innerHTML = "<b>" + list.length.toLocaleString("en") + "</b> " +
      (list.length === 1 ? "band" : "bands") +
      (list.length < bands.length ? " of " + bands.length.toLocaleString("en") : "");
    $("gbf-grid").innerHTML = list.length
      ? list.slice(0, shown).map(card).join("")
      : '<div class="gbf-msg" style="grid-column:1/-1">No bands match. Try another search or filter.</div>';
    drawMap();
    var more = $("gbf-more");
    more.hidden = list.length <= shown;
    more.textContent = "Show more bands (" + (list.length - shown).toLocaleString("en") + " left)";
  }

  // ---- Map: inline SVG of Greece (same drawing as the Venue Finder, no map service or key needed) ----
  var NS = "http://www.w3.org/2000/svg", MB = { lonMin:19.0, lonMax:29.2, latMin:34.6, latMax:42.2 }, MW = 800;
  function mercY(lat){ return Math.log(Math.tan(Math.PI/4 + lat*Math.PI/360)); }
  var MK = MW / (MB.lonMax - MB.lonMin);
  var MH = Math.round((mercY(MB.latMax) - mercY(MB.latMin)) * 180/Math.PI * MK);
  function proj(lon, lat){ return [(lon - MB.lonMin) * MK, (mercY(MB.latMax) - mercY(lat)) * 180/Math.PI * MK]; }
  function svgEl(tag, attrs, parent){ var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
  var gPins = null;

  function loadTopo(){
    if (window.Datamap && Datamap.prototype && Datamap.prototype.worldTopo) return Promise.resolve();
    return new Promise(function(ok, fail){
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/datamaps/0.5.9/datamaps.world.hires.min.js";
      s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
  }

  function initMap(){
    var box = $("gbf-map");
    box.innerHTML = "";
    var svg = svgEl("svg", { viewBox:"0 0 " + MW + " " + MH, role:"img", "aria-label":"Map of Greece with the number of bands per city", "class":"gbf-svg" }, box);
    var gBase = svgEl("g", {}, svg);
    gPins = svgEl("g", {}, svg);
    var lon, lat, xy;
    for (lon = 20; lon <= 29; lon++){ xy = proj(lon, 38); svgEl("line", { x1:xy[0], x2:xy[0], y1:0, y2:MH, "class":"gbf-grid-line" }, gBase); }
    for (lat = 35; lat <= 42; lat++){ xy = proj(24, lat); svgEl("line", { x1:0, x2:MW, y1:xy[1], y2:xy[1], "class":"gbf-grid-line" }, gBase); }
    try {
      var topo = window.Datamap && Datamap.prototype && Datamap.prototype.worldTopo;
      if (topo && topo.objects) {
        var obj = topo.objects.world || topo.objects[Object.keys(topo.objects)[0]], tf = topo.transform;
        var arcs = topo.arcs.map(function(arc){ var x = 0, y = 0; return arc.map(function(p){
          if (tf){ x += p[0]; y += p[1]; return [x * tf.scale[0] + tf.translate[0], y * tf.scale[1] + tf.translate[1]]; } return p; }); });
        var ring = function(idxs){ var pts = []; idxs.forEach(function(i){
          var a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
          a.forEach(function(p, k){ if (k > 0 || pts.length === 0) pts.push(p); }); }); return pts; };
        var near = ["GRC","ALB","MKD","BGR","TUR","CYP","SRB","MNE","ITA","KOS","-99"];
        obj.geometries.forEach(function(g){
          if (near.indexOf(g.id) < 0 && !(g.properties && /Greece|Albania|Macedonia|Bulgaria|Turkey|Cyprus/.test(g.properties.name || ""))) return;
          var polys = g.type === "Polygon" ? [g.arcs] : g.type === "MultiPolygon" ? g.arcs : [];
          var d = "";
          polys.forEach(function(poly){ poly.forEach(function(r){
            var pts = ring(r);
            if (!pts.some(function(p){ return p[0] > MB.lonMin - 3 && p[0] < MB.lonMax + 3 && p[1] > MB.latMin - 3 && p[1] < MB.latMax + 3; })) return;
            d += "M" + pts.map(function(p){ return proj(p[0], p[1]).map(function(v){ return v.toFixed(1); }).join(","); }).join("L") + "Z";
          }); });
          if (d) svgEl("path", { d:d, "class":"gbf-country" + (g.id === "GRC" ? " gr" : "") }, gBase);
        });
      }
    } catch (err) { /* grid-only fallback */ }
    [["Ionian Sea", 19.4, 37.3], ["Aegean Sea", 25.0, 38.9], ["Sea of Crete", 24.2, 35.95]].forEach(function(s){
      var p = proj(s[1], s[2]); var t = svgEl("text", { x:p[0], y:p[1], "class":"gbf-sea" }, gBase); t.textContent = s[0];
    });
    map = true;
    drawMap();
  }

  function drawMap(){
    var list = filtered(true), per = {}, total = 0;
    list.forEach(function(b){ if (b.city && CITIES[b.city]) { per[b.city] = (per[b.city] || 0) + 1; total++; } });
    var hint = $("gbf-maphint");
    if (hint) hint.textContent = total
      ? total.toLocaleString("en") + " of " + list.length.toLocaleString("en") +
        " bands have a confirmed city. Number = bands in that city. Click a city to list its bands."
      : "None of these bands has a confirmed city yet.";
    if (!map || !gPins) return;
    while (gPins.firstChild) gPins.removeChild(gPins.firstChild);
    Object.keys(per).sort(function(a, b){ return per[a] - per[b]; }).forEach(function(c){
      var n = per[c], xy = proj(CITIES[c][1], CITIES[c][0]), r = 9 + Math.sqrt(n) * 3.2;
      var g = svgEl("g", { "class":"gbf-mpin" + (state.place === c ? " on" : ""), tabindex:0, role:"button", "aria-label":c + ": " + n + (n === 1 ? " band" : " bands") }, gPins);
      svgEl("title", {}, g).textContent = c + " · " + n + (n === 1 ? " band" : " bands");
      svgEl("circle", { cx:xy[0], cy:xy[1], r:r + 6, "class":"halo" }, g);
      svgEl("circle", { cx:xy[0], cy:xy[1], r:r, "class":"core" }, g);
      svgEl("text", { x:xy[0], y:xy[1], "class":"count" }, g).textContent = n;
      if (n >= 3 || state.place === c) {
        var left = c === "Patras" || c === "Ioannina" || c === "Corfu";
        svgEl("text", { x:left ? xy[0] - r - 9 : xy[0] + r + 9, y:xy[1] + 4, "class":"city", "text-anchor":left ? "end" : "start" }, g).textContent = c;
      }
      var act = function(){ state.place = (state.place === c ? "" : c); refresh();
        var k = $("gbf-count"); if (k && k.scrollIntoView) k.scrollIntoView({behavior:"smooth", block:"start"}); };
      g.addEventListener("click", act);
      g.addEventListener("keydown", function(e){ if (e.key === "Enter" || e.key === " ") { e.preventDefault(); act(); } });
    });
  }

  function refresh(){ shown = PAGE; drawPills(); draw(); }

  load(0).then(function(data){
    var f = data.fields || [];
    CITIES = data.cities || {};
    bands = (data.rows || []).map(function(r){
      var b = {};
      f.forEach(function(k, i){ b[k] = r[i] || ""; });
      b._n = LINKS.filter(function(l){ return safeUrl(b[l[0]]); }).length;
      b._k = fold(b.name).replace(/^the\s+/, "");
      b._s = fold([b.name, b.native, b.genre, b.family, b.city].join(" "));
      return b;
    });
    if (data.updated) {
      $("gbf-foot").insertAdjacentHTML("afterbegin",
        "Last updated " + esc(data.updated) + " \u00B7 " + bands.length.toLocaleString("en") + " bands. ");
    }
    var t;
    $("gbf-q").addEventListener("input", function(e){
      clearTimeout(t);
      t = setTimeout(function(){ state.q = e.target.value; shown = PAGE; draw(); }, 150);
    });
    $("gbf-sort").addEventListener("change", function(e){ state.sort = e.target.value; shown = PAGE; draw(); });
    $("gbf-more").addEventListener("click", function(){ shown += PAGE; draw(); });
    refresh();
    loadTopo().then(initMap, initMap);
  }).catch(function(){
    $("gbf-count").textContent = "";
    $("gbf-grid").innerHTML = '<div class="gbf-msg" style="grid-column:1/-1">The band list could not load right now. Please refresh the page in a minute.</div>';
  });
}
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
