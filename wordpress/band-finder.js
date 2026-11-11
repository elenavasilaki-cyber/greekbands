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
    st.textContent = "#gbf{--bg:#000;--card:#0d0d0d;--line:#262626;--text:#f2f2f2;--muted:#9a9a9a;--red:#e3121b;--orange:#ff7a00;\n  background:var(--bg);color:var(--text);font-family:inherit;line-height:1.45;padding:32px 16px 48px;box-sizing:border-box}\n#gbf *{box-sizing:border-box}\n#gbf a{color:var(--red);text-decoration:none}\n#gbf a:hover{text-decoration:underline}\n#gbf .gbf-title{text-align:center;text-transform:uppercase;letter-spacing:.06em;font-size:clamp(24px,4.5vw,40px);\n  font-weight:800;margin:0 0 6px;color:#fff;line-height:1.15}\n#gbf .gbf-title .amp{color:var(--orange)}\n#gbf .gbf-sub{text-align:center;color:var(--muted);margin:0 auto 24px;max-width:720px;font-size:15px}\n#gbf .gbf-wrap{max-width:1100px;margin:0 auto}\n#gbf .gbf-search{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px}\n#gbf .gbf-search input,#gbf .gbf-search select{background:#111;color:var(--text);border:1px solid var(--line);\n  border-radius:999px;padding:11px 18px;font-size:15px;font-family:inherit;outline:none}\n#gbf .gbf-search input{flex:1 1 260px;min-width:0}\n#gbf .gbf-search input:focus,#gbf .gbf-search select:focus{border-color:var(--red)}\n#gbf .gbf-search select{flex:0 1 auto;cursor:pointer}\n#gbf .gbf-pills{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}\n#gbf .gbf-pill{background:#111;color:#ddd;border:1px solid var(--line);border-radius:999px;padding:7px 14px;\n  font-size:13px;cursor:pointer;font-family:inherit;line-height:1.2;transition:background .15s,border-color .15s}\n#gbf .gbf-pill:hover{border-color:var(--red)}\n#gbf .gbf-pill.on{background:var(--red);border-color:var(--red);color:#fff}\n#gbf .gbf-pill small{opacity:.7;margin-left:4px}\n#gbf .gbf-count{color:var(--muted);font-size:14px;margin:16px 0 14px}\n#gbf .gbf-count b{color:#fff}\n#gbf .gbf-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}\n@media (max-width:720px){#gbf .gbf-grid{grid-template-columns:1fr}}\n#gbf .gbf-card{background:var(--card);border:1px solid var(--line);border-left:3px solid var(--red);border-radius:10px;\n  padding:16px 18px;min-width:0}\n#gbf .gbf-name{font-size:19px;font-weight:700;color:#fff;margin:0;word-break:break-word}\n#gbf .gbf-native{color:var(--muted);font-size:14px;margin-left:6px;font-weight:400}\n#gbf .gbf-meta{display:flex;flex-wrap:wrap;gap:6px 14px;margin:6px 0 0;font-size:14px;color:#cfcfcf}\n#gbf .gbf-meta .gbf-genre{color:var(--orange)}\n#gbf .gbf-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}\n#gbf .gbf-links a{border:1px solid #3a0a0c;background:#1a0607;color:#ff4d55;border-radius:999px;padding:4px 11px;\n  font-size:12.5px;white-space:nowrap}\n#gbf .gbf-links a:hover{background:var(--red);color:#fff;text-decoration:none}\n#gbf .gbf-nolinks{color:#6d6d6d;font-size:13px;margin-top:12px}\n#gbf .gbf-src{color:#6d6d6d;font-size:12px;margin-top:10px}\n#gbf .gbf-more{display:block;margin:24px auto 0;background:var(--red);color:#fff;border:0;border-radius:999px;\n  padding:12px 28px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}\n#gbf .gbf-more:hover{filter:brightness(1.12)}\n#gbf .gbf-msg{text-align:center;color:var(--muted);padding:40px 0}\n#gbf .gbf-foot{color:#777;font-size:13px;text-align:center;margin-top:32px}\n#gbf .gbf-more[hidden]{display:none}\n#gbf .gbf-mapbox{margin:6px 0 4px}\n#gbf .gbf-map{height:380px;border:1px solid var(--line);border-radius:10px;background:#0a0a0a;overflow:hidden}\n@media (max-width:720px){#gbf .gbf-map{height:300px}}\n#gbf .gbf-maphint{color:var(--muted);font-size:12.5px;margin:6px 2px 0}\n#gbf .gbf-map .leaflet-container,#gbf .gbf-map.leaflet-container{background:#0a0a0a;font-family:inherit}\n#gbf .gbf-pin{background:var(--red);color:#fff;border:2px solid #fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;box-shadow:0 0 0 4px rgba(227,18,27,.25)}\n#gbf .gbf-pin.on{background:var(--orange);box-shadow:0 0 0 5px rgba(255,122,0,.35)}\n#gbf .leaflet-tooltip{background:#111;color:#fff;border:1px solid #333}\n#gbf .leaflet-control-attribution{background:rgba(0,0,0,.6)!important;color:#888!important}\n#gbf .leaflet-control-attribution a{color:#bbb!important}";
    document.head.appendChild(st);
    root.innerHTML = "<div class=\"gbf-wrap\">\n  <h2 class=\"gbf-title\">Greek Rock <span class=\"amp\">&amp;</span> Metal Band Finder</h2>\n  <p class=\"gbf-sub\">Every Greek rock and metal band we know of, with genre, city and official links. Updated daily.</p>\n\n  <div class=\"gbf-search\">\n    <input type=\"search\" id=\"gbf-q\" placeholder=\"Search band, genre or city...\" aria-label=\"Search bands\">\n    <select id=\"gbf-sort\" aria-label=\"Sort\">\n      <option value=\"links\">Most links first</option>\n      <option value=\"az\">A&ndash;Z</option>\n      <option value=\"za\">Z&ndash;A</option>\n    </select>\n  </div>\n  <div class=\"gbf-pills\" id=\"gbf-scene\"></div>\n  <div class=\"gbf-pills\" id=\"gbf-family\"></div>\n  <div class=\"gbf-pills\" id=\"gbf-extra\"></div>\n\n  <div class=\"gbf-mapbox\"><div class=\"gbf-map\" id=\"gbf-map\"></div><p class=\"gbf-maphint\" id=\"gbf-maphint\"></p></div>\n  <div class=\"gbf-count\" id=\"gbf-count\">Loading bands&hellip;</div>\n  <div class=\"gbf-grid\" id=\"gbf-grid\"></div>\n  <button type=\"button\" class=\"gbf-more\" id=\"gbf-more\" hidden>Show more bands</button>\n\n  <p class=\"gbf-foot\" id=\"gbf-foot\">Links are added only when Metal Archives or Discogs confirms them; Spotify only when an album matches the band\u2019s discography, YouTube only for the band\u2019s channel or an official video. Map tiles &copy; OpenStreetMap contributors &copy; CARTO.\n    Spotted a mistake or missing band? Write to <a href=\"mailto:info@wtbuzz.net\">info@wtbuzz.net</a>.</p>\n</div>";
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

  function loadLeaflet(){
    if (window.L) return Promise.resolve();
    return new Promise(function(ok, fail){
      var css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
      document.head.appendChild(css);
      var s = document.createElement("script");
      s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
      s.onload = ok; s.onerror = fail;
      document.head.appendChild(s);
    });
  }

  function initMap(){
    map = L.map("gbf-map", {scrollWheelZoom:false, zoomSnap:0.5}).setView([38.6, 23.6], 6);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      maxZoom: 18, subdomains: "abcd",
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    }).addTo(map);
    layer = L.layerGroup().addTo(map);
    drawMap();
  }

  function drawMap(){
    var list = filtered(true), per = {}, total = 0;
    list.forEach(function(b){ if (b.city && CITIES[b.city]) { per[b.city] = (per[b.city] || 0) + 1; total++; } });
    var hint = $("gbf-maphint");
    if (hint) hint.textContent = total
      ? total.toLocaleString("en") + " of " + list.length.toLocaleString("en") +
        " bands have a confirmed city and appear on the map. Click a city to list its bands."
      : "None of these bands has a confirmed city yet.";
    if (!map) return;
    layer.clearLayers();
    Object.keys(per).forEach(function(c){
      var n = per[c], size = Math.round(Math.min(56, 22 + Math.sqrt(n) * 4));
      var icon = L.divIcon({className:"", iconSize:[size, size],
        html:'<div class="gbf-pin' + (state.place === c ? ' on' : '') + '" style="width:' + size + 'px;height:' + size + 'px">' + n + '</div>'});
      L.marker(CITIES[c], {icon:icon, title:c}).addTo(layer)
        .bindTooltip(esc(c) + " \u00B7 " + n + (n === 1 ? " band" : " bands"))
        .on("click", function(){ state.place = (state.place === c ? "" : c); refresh();
          var g = $("gbf-count"); if (g && g.scrollIntoView) g.scrollIntoView({behavior:"smooth", block:"start"}); });
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
    loadLeaflet().then(initMap).catch(function(){ var m = $("gbf-map"); if (m) m.style.display = "none"; });
  }).catch(function(){
    $("gbf-count").textContent = "";
    $("gbf-grid").innerHTML = '<div class="gbf-msg" style="grid-column:1/-1">The band list could not load right now. Please refresh the page in a minute.</div>';
  });
}
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
