/* ==========================================================
   A Little Book of Memories — 程式
   內容都在 data/ 資料夾，平常不需要改這個檔案
   ========================================================== */
(function () {
  'use strict';

  var SITE = window.SITE || {};
  var CHARACTERS = window.CHARACTERS || [];
  var CHAPTERS = window.CHAPTERS || [];
  var MESSAGES = window.MESSAGES || [];
  var QUOTES = window.QUOTES || [];

  var $ = function (id) { return document.getElementById(id); };
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var ROT = ['-4deg', '3deg', '-2deg', '4deg', '-3deg', '2deg', '-1deg', '3deg'];

  /* ---------- 照片元件：找不到照片時顯示佔位框 ---------- */
  var allPhotos = [];
  function photo(p, label) {
    var btn = el('button', 'photo');
    btn.type = 'button';
    btn.setAttribute('data-label', label || '照片');
    btn.setAttribute('aria-label', (p.caption || p.title || label || '照片') + '（點擊放大）');
    var img = new Image();
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = p.caption || p.title || '';
    if (!p.file) btn.classList.add('is-missing');
    img.onerror = function () { btn.classList.add('is-missing'); };
    if (p.file) img.src = p.file;
    btn.appendChild(img);
    var index = allPhotos.length;
    allPhotos.push({ file: p.file, caption: p.caption || p.title || '', label: label });
    btn.addEventListener('click', function () { openLightbox(index); });
    return btn;
  }

  /* ==========================================================
     00 封面
     ========================================================== */
  function renderCover() {
    var count = MESSAGES.length;
    $('openingLine').textContent = SITE.openingLine || '';
    $('addressTo').textContent = 'To: ' + (SITE.names || '');
    $('addressTitle').textContent = SITE.title || '';
    $('stamp').textContent = SITE.initials || '';
    $('seal').textContent = SITE.initials || '';
    var pm = SITE.postmark || {};
    var mark = $('postmark');
    mark.appendChild(el('span', '', pm.city || ''));
    mark.appendChild(el('span', '', pm.cityEn || ''));
    mark.appendChild(document.createElement('hr'));
    mark.appendChild(el('span', '', pm.date || ''));
    $('letterTo').textContent = 'To ' + (SITE.names || '') + ' · ' + (SITE.namesEn || '');
    $('letterTitle').textContent = SITE.title || '';
    $('letterBody').textContent = (SITE.letter || '').replace('{count}', count);
  }

  function initCover() {
    var cover = $('cover');
    var opened = false;
    function unlock() {
      document.body.classList.remove('locked');
    }
    function finish() {
      cover.classList.add('is-opening', 'is-opened');
      unlock();
    }
    function open() {
      if (opened) return;
      opened = true;
      if (reduceMotion) { finish(); return; }
      cover.classList.add('is-opening');
      setTimeout(function () { cover.classList.add('is-rising'); }, 650);
      setTimeout(function () { cover.classList.add('is-opened'); unlock(); }, 1700);
    }
    $('openBtn').addEventListener('click', open);
    $('skipBtn').addEventListener('click', function () { opened = true; finish(); });
    // 每次打開或重新整理，都從信封開始
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
  }

  /* ==========================================================
     01 主角介紹
     ========================================================== */
  function charCard(c) {
    var card = el('article', 'char char--' + (c.color || 'red') + ' reveal');
    var head = el('div', 'char__head');
    head.appendChild(el('span', 'char__file', 'CHARACTER FILE No.' + (c.no || '')));
    head.appendChild(el('span', 'hand', c.en || ''));
    card.appendChild(head);

    var body = el('div', 'char__body');
    var ph = el('div', 'char__photo');
    ph.appendChild(photo({ file: c.photo, caption: c.name }, c.name + '的照片'));
    body.appendChild(ph);

    var info = el('div', 'char__info');
    var name = el('h3', 'char__name serif', c.name || '');
    info.appendChild(name);
    if (c.aka) info.appendChild(el('p', 'char__aka', 'aka ' + c.aka));
    var tags = el('ul', 'char__tags');
    var tagBg = c.color === 'blue'
      ? ['var(--navy)', 'var(--yellow)', 'var(--cream)', 'var(--paper)', 'var(--cream)']
      : ['var(--yellow)', 'var(--red)', 'var(--paper)', 'var(--cream)', 'var(--paper)'];
    (c.tags || []).forEach(function (t, i) {
      var li = el('li', '', t);
      var bg = tagBg[i % tagBg.length];
      li.style.background = bg;
      if (bg === 'var(--navy)' || bg === 'var(--red)') li.style.color = 'var(--cream)';
      li.style.setProperty('--r', ROT[(i + 2) % ROT.length]);
      tags.appendChild(li);
    });
    info.appendChild(tags);
    var dl = el('dl', 'char__facts');
    (c.facts || []).forEach(function (f) {
      var row = el('div');
      row.appendChild(el('dt', '', f[0] + '：'));
      row.appendChild(el('dd', '', f[1]));
      dl.appendChild(row);
    });
    info.appendChild(dl);
    body.appendChild(info);
    card.appendChild(body);

    if (c.quote) {
      var bub = el('p', 'bubble', '「' + c.quote + '」');
      if (c.quoteBy) bub.appendChild(el('cite', 'bubble__by', '— ' + c.quoteBy));
      card.appendChild(bub);
    }
    if (c.note) card.appendChild(el('p', 'char__note', c.note));
    return card;
  }

  function renderCharacters() {
    var grid = $('characterGrid');
    CHARACTERS.forEach(function (c, i) {
      grid.appendChild(charCard(c));
      if (i === 0 && CHARACTERS.length > 1) {
        var and = el('p', 'char-and reveal');
        and.appendChild(el('span', '', '&'));
        if (window.CHARACTERS_NOTE) and.appendChild(el('small', '', window.CHARACTERS_NOTE));
        grid.appendChild(and);
      }
    });
  }

  /* ==========================================================
     02 回憶篇章
     ========================================================== */
  function band(ch) {
    var b = el('div', 'band');
    var inner = el('div', 'band__inner reveal');
    inner.appendChild(el('span', 'band__num', ch.number || ''));
    var t = el('div', 'band__titles');
    t.appendChild(el('span', 'band__label', ch.label || ''));
    t.appendChild(el('h2', 'band__title', ch.title || ''));
    inner.appendChild(t);
    if (ch.subtitle) inner.appendChild(el('span', 'band__sub', ch.subtitle));
    b.appendChild(inner);
    return b;
  }

  var layouts = {
    comic: function (ch, n0) {
      var grid = el('div', 'comic');
      ch.photos.forEach(function (p, i) {
        var panel = el('div', 'comic__panel reveal');
        panel.style.transitionDelay = (i % 4) * 80 + 'ms';
        panel.appendChild(photo(p, '照片 ' + (n0 + i)));
        if (p.caption) panel.appendChild(el('span', 'comic__bubble' + (p.bubble === 'bottom' ? ' comic__bubble--bottom' : ''), '「' + p.caption + '」'));
        if (i === 2) panel.appendChild(el('span', 'comic__pop', '!?'));
        // 張數剛好差一張排滿時，最後一格拉寬，不留空格
        var n = ch.photos.length;
        if ((n % 4 === 3 && i === n - 1) || (n % 4 === 2 && i >= n - 2)) panel.classList.add('comic__panel--wide');
        grid.appendChild(panel);
      });
      return grid;
    },
    polaroid: function (ch, n0) {
      var wrap = el('div');
      var row = el('div', 'polaroids');
      ch.photos.forEach(function (p, i) {
        var f = el('figure', 'polaroid reveal');
        f.style.setProperty('--r', ROT[i % ROT.length]);
        f.appendChild(el('span', 'tape'));
        f.appendChild(photo(p, '照片 ' + (n0 + i)));
        f.appendChild(el('figcaption', '', p.caption || ''));
        row.appendChild(f);
      });
      wrap.appendChild(row);
      if (ch.aside) wrap.appendChild(el('p', 'chapter__aside reveal', ch.aside));
      return wrap;
    },
    postcard: function (ch, n0) {
      var wrap = el('div');
      var first = ch.photos[0];
      if (first) {
        var hero = el('div', 'postcard-hero reveal');
        hero.appendChild(photo(first, '照片 ' + n0 + '・主視覺'));
        if (first.caption || first.note) {
          var lab = el('div', 'postcard-hero__label');
          if (first.caption) lab.appendChild(el('p', 'serif', first.caption));
          if (first.note) lab.appendChild(el('p', 'hand', first.note));
          hero.appendChild(lab);
        }
        hero.appendChild(el('span', 'postcard-hero__mark', 'ADVENTURE'));
        wrap.appendChild(hero);
      }
      var rest = ch.photos.slice(1);
      if (rest.length) {
        var row = el('div', 'postcards-wrap');
        var prev = el('button', 'icon-btn postcards-arrow', '‹');
        prev.type = 'button'; prev.setAttribute('aria-label', '往左滑');
        var next = el('button', 'icon-btn postcards-arrow', '›');
        next.type = 'button'; next.setAttribute('aria-label', '往右滑');
        next.style.background = 'var(--red)'; next.style.color = 'var(--cream)';
        var list = el('div', 'postcards');
        rest.forEach(function (p, i) {
          var c = el('figure', 'postcard');
          c.appendChild(photo(p, '照片 ' + (n0 + 1 + i)));
          var cap = [p.caption, p.note].filter(Boolean).join('・');
          c.appendChild(el('figcaption', '', cap));
          list.appendChild(c);
        });
        prev.addEventListener('click', function () { list.scrollBy({ left: -270, behavior: 'smooth' }); });
        next.addEventListener('click', function () { list.scrollBy({ left: 270, behavior: 'smooth' }); });
        row.appendChild(prev); row.appendChild(list); row.appendChild(next);
        wrap.appendChild(row);
      }
      return wrap;
    },
    slow: function (ch, n0) {
      var list = el('div', 'slow');
      ch.photos.forEach(function (p, i) {
        var item = el('div', 'slow__item reveal');
        var ph = el('div', 'slow__photo');
        ph.appendChild(photo(p, '照片 ' + (n0 + i)));
        item.appendChild(ph);
        if (p.note || p.title || p.text) {
          var t = el('div', 'slow__text');
          if (p.note) t.appendChild(el('span', 'slow__note', p.note));
          if (p.title) t.appendChild(el('h3', 'slow__title serif', p.title));
          if (p.text) t.appendChild(el('p', 'slow__body', p.text));
          item.appendChild(t);
        }
        list.appendChild(item);
      });
      return list;
    }
  };

  function renderChapters() {
    var box = $('chapters');
    var n = 1;
    CHAPTERS.forEach(function (ch) {
      var sec = el('section', 'chapter');
      sec.id = ch.id || '';
      sec.appendChild(band(ch));
      var body = el('div', 'chapter__body');
      var fn = layouts[ch.layout] || layouts.polaroid;
      body.appendChild(fn(ch, n));
      n += ch.photos.length;
      sec.appendChild(body);
      box.appendChild(sec);
    });
  }

  /* ==========================================================
     03 留言
     ========================================================== */
  function renderQuotes() {
    var box = $('mosaic');
    var big = QUOTES.filter(function (q) { return q.size === 'big'; })[0];
    var rest = QUOTES.filter(function (q) { return q !== big; });
    var half = Math.ceil(rest.length / 2);
    var ordered = rest.slice(0, half).concat(big ? [big] : [], rest.slice(half));
    var k = 0;
    ordered.forEach(function (q) {
      var cls = q === big ? 'q q--big' : 'q q--' + ((k++ % 7) + 1);
      var b = el('blockquote', cls + ' reveal');
      b.appendChild(document.createTextNode(q.text));
      b.appendChild(el('cite', '', '— ' + q.name));
      box.appendChild(b);
      observe(b);
    });
  }

  var PAGE = 12;
  var shown = 0;
  function charLen(s) { return Array.from(s.replace(/\s/g, '')).length; }
  function preview(s, n) {
    var a = Array.from(s.replace(/\s+/g, ' ').trim());
    return a.length > n ? a.slice(0, n).join('') + '⋯⋯' : a.join('');
  }
  var ENV_SVG = '<svg aria-hidden="true" viewBox="0 0 280 62" preserveAspectRatio="none"><path d="M0 0 L140 56 L280 0" fill="#E9D8B8" stroke="#252525" stroke-width="2.5" vector-effect="non-scaling-stroke"/></svg>';

  function msgPhotos(m) {
    return (m.photos || []).concat(m.photo ? [m.photo] : []);
  }

  function msgCard(m, i) {
    var len = charLen(m.text);
    var b = el('button', 'msg reveal');
    b.type = 'button';
    b.setAttribute('aria-label', '閱讀 ' + m.name + ' 的完整留言');
    if (m.style === 'envelope') len = Math.max(len, 151);
    var realLen = charLen(m.text);
    if (len <= 36) {
      b.classList.add('msg--bubble');
      b.appendChild(el('p', 'msg__text', '「' + m.text.replace(/\s+/g, ' ') + '」'));
      b.appendChild(el('span', 'msg__from', '— ' + m.name));
    } else if (len <= 150) {
      b.classList.add('msg--note');
      b.appendChild(el('span', 'tape'));
      b.appendChild(el('p', 'msg__text', preview(m.text, 54)));
      b.appendChild(el('span', 'msg__from', '— ' + m.name));
      b.appendChild(el('span', 'msg__more', '讀完整留言 →'));
    } else {
      b.classList.add('msg--env');
      b.insertAdjacentHTML('afterbegin', ENV_SVG);
      b.appendChild(el('span', 'msg__from', 'From ' + m.name));
      b.appendChild(el('span', 'msg__len', (realLen > 150 ? '長信・約 ' : '一封信・約 ') + Math.max(10, Math.round(realLen / 10) * 10) + ' 字'));
      b.appendChild(el('span', 'msg__more', '拆開這封 →'));
    }
    if (msgPhotos(m).length) b.appendChild(el('span', 'msg__clip', '附照片'));
    b.addEventListener('click', function () { openModal(i); });
    return b;
  }

  function showMore() {
    var grid = $('msgGrid');
    var end = Math.min(shown + PAGE, MESSAGES.length);
    for (var i = shown; i < end; i++) {
      var card = msgCard(MESSAGES[i], i);
      grid.appendChild(card);
      observe(card);
    }
    shown = end;
    $('moreCount').textContent = '已拆 ' + shown + ' / ' + MESSAGES.length;
    if (shown >= MESSAGES.length) $('moreBtn').parentNode.classList.add('is-done');
  }

  function renderMessages() {
    $('messagesSub').textContent = MESSAGES.length + ' 封寫給你們的信';
    renderQuotes();
    $('moreBtn').addEventListener('click', showMore);
    showMore();
  }

  /* ---------- 完整留言視窗 ---------- */
  var current = 0, lastFocus = null;
  function fillModal() {
    var m = MESSAGES[current];
    $('mdCount').textContent = (current + 1) + ' / ' + MESSAGES.length;
    $('mdTo').textContent = 'To ' + (SITE.names || '');
    $('mdName').textContent = 'From ' + m.name;
    $('mdText').textContent = m.text;
    var box = $('mdPhotos');
    box.innerHTML = '';
    msgPhotos(m).forEach(function (src) {
      var fig = el('figure', 'modal__photo');
      var img = new Image();
      img.src = src;
      img.alt = m.name + ' 附上的照片';
      fig.appendChild(img);
      box.appendChild(fig);
    });
    $('mdTextWrap').scrollTop = 0;
  }
  function openModal(i) {
    current = i; lastFocus = document.activeElement;
    fillModal();
    $('modal').hidden = false;
    document.body.style.overflow = 'hidden';
    $('mdClose').focus();
  }
  function closeModal() {
    $('modal').hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function stepModal(d) {
    current = (current + d + MESSAGES.length) % MESSAGES.length;
    fillModal();
  }

  /* ---------- 照片放大 ---------- */
  var lbIndex = 0;
  function fillLightbox() {
    var p = allPhotos[lbIndex];
    var box = $('lbImg');
    box.innerHTML = '';
    var holder = el('div', 'photo');
    holder.setAttribute('data-label', p.label || '照片');
    var img = new Image();
    img.alt = p.caption || '';
    img.onerror = function () { holder.classList.add('is-missing'); };
    if (p.file) img.src = p.file; else holder.classList.add('is-missing');
    holder.appendChild(img);
    box.appendChild(holder);
    $('lbCap').textContent = p.caption || '';
  }
  function openLightbox(i) {
    lbIndex = i; lastFocus = document.activeElement;
    fillLightbox();
    $('lightbox').hidden = false;
    document.body.style.overflow = 'hidden';
    $('lbClose').focus();
  }
  function closeLightbox() {
    $('lightbox').hidden = true;
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }
  function stepLightbox(d) {
    lbIndex = (lbIndex + d + allPhotos.length) % allPhotos.length;
    fillLightbox();
  }

  function swipe(node, onLeft, onRight) {
    var x0 = null, y0 = null;
    node.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
    node.addEventListener('touchend', function (e) {
      if (x0 == null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) { dx < 0 ? onLeft() : onRight(); }
      x0 = null;
    }, { passive: true });
  }

  function initDialogs() {
    $('mdClose').addEventListener('click', closeModal);
    $('mdPrev').addEventListener('click', function () { stepModal(-1); });
    $('mdNext').addEventListener('click', function () { stepModal(1); });
    $('modal').addEventListener('click', function (e) { if (e.target === this) closeModal(); });
    swipe($('modal'), function () { stepModal(1); }, function () { stepModal(-1); });

    $('lbClose').addEventListener('click', closeLightbox);
    $('lbPrev').addEventListener('click', function () { stepLightbox(-1); });
    $('lbNext').addEventListener('click', function () { stepLightbox(1); });
    $('lightbox').addEventListener('click', function (e) { if (e.target === this) closeLightbox(); });
    swipe($('lightbox'), function () { stepLightbox(1); }, function () { stepLightbox(-1); });

    document.addEventListener('keydown', function (e) {
      var md = !$('modal').hidden, lb = !$('lightbox').hidden;
      if (!md && !lb) return;
      if (e.key === 'Escape') { md ? closeModal() : closeLightbox(); }
      else if (e.key === 'ArrowRight') { md ? stepModal(1) : stepLightbox(1); }
      else if (e.key === 'ArrowLeft') { md ? stepModal(-1) : stepLightbox(-1); }
    });
  }

  /* ==========================================================
     04 結尾
     ========================================================== */
  function renderEnding() {
    var e = SITE.ending || {};
    var fig = $('endingPhoto');
    fig.appendChild(el('span', 'tape'));
    fig.appendChild(photo(e.photo || {}, '最後的大合照'));
    fig.appendChild(el('figcaption', '', (e.photo && e.photo.caption) || ''));
    $('endLead').textContent = e.lead || '';
    $('endBody').textContent = e.body || '';
    $('endNote').textContent = e.note || '';
    $('endFinal').textContent = e.final || '';
    $('endBody').style.transitionDelay = '150ms';
    $('endNote').style.transitionDelay = '300ms';

    var sky = $('stars');
    var seed = 7;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < 46; i++) {
      var s = el('span', i % 9 === 0 ? 'star star--big' : 'star');
      s.style.left = (rnd() * 100) + '%';
      s.style.top = (8 + rnd() * 70) + '%';
      s.style.animationDelay = (rnd() * 4).toFixed(2) + 's';
      sky.appendChild(s);
    }
    $('againBtn').addEventListener('click', function (ev) {
      ev.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ---------- 捲動淡入、回到頂端 ---------- */
  var io = null;
  function observe(node) {
    if (io) io.observe(node); else node.classList.add('in');
  }
  function initReveal() {
    if ('IntersectionObserver' in window && !reduceMotion) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    }
    Array.prototype.forEach.call(document.querySelectorAll('.reveal'), observe);
  }
  function initToTop() {
    var btn = $('toTop');
    window.addEventListener('scroll', function () {
      btn.classList.toggle('show', window.scrollY > window.innerHeight * 1.5);
    }, { passive: true });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }); });
  }

  renderCover();
  renderCharacters();
  renderChapters();
  renderEnding();
  initReveal();
  renderMessages();
  initCover();
  initDialogs();
  initToTop();
})();
