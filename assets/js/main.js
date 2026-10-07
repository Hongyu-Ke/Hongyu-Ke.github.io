/* =====================================================================
 * 页面渲染与交互
 * 读取 data/*.js 中的 window.SITE，把内容渲染进页面里带 id 的占位元素：
 *   #site-nav、#site-footer                               所有页面
 *   #profile-card、#news-card、#about-card、
 *   #experience-card、#selected-publications              首页
 *   #topic-filter、#research-summary、#publication-list   Research 页
 *   #showcase                                             Services & Awards 页
 * 页面上没有某个占位元素时，对应部分会被跳过——所以可以在页面之间自由增删、
 * 移动这些区块（记得同时引入对应的 data 文件）。
 * ===================================================================== */
(function () {
  'use strict';

  const SITE = window.SITE || {};
  const config = SITE.config || {};
  const currentPage = document.body.dataset.page || '';

  /* ---------- 工具函数 ---------- */

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 去掉 HTML 标签，得到纯文本（用于 alt、aria-label 等属性）
  function stripTags(html) {
    return new DOMParser().parseFromString(String(html || ''), 'text/html').body.textContent || '';
  }

  // 站外链接在新标签页打开
  function targetAttrs(url) {
    return /^(https?:)?\/\//i.test(url || '') ? ' target="_blank" rel="noopener"' : '';
  }

  function hasMount(id) {
    return document.getElementById(id) !== null;
  }

  function mount(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }

  function topicLabel(slug) {
    const topic = (SITE.topics || []).find((t) => t.slug === slug);
    return topic ? topic.label : slug;
  }

  function topicHref(slug) {
    return 'research.html' + (slug ? '?topic=' + encodeURIComponent(slug) : '');
  }

  /* ---------- 导航栏 & 页脚 ---------- */

  function renderNav() {
    if (!hasMount('site-nav')) return;
    const t = config.terminal || {};
    const items = (config.nav || []).map((item) => `
          <li class="nav-item${item.page === currentPage ? ' active' : ''}">
            <a class="nav-link" href="${item.href}">${item.label}</a>
          </li>`).join('');

    mount('site-nav', `
      <div class="container content-width-container">
        <span class="nav-link terminal-text">${t.user || ''}<span class="terminal-host">${t.host || ''}</span><span class="terminal-punct">:</span><span class="terminal-path">~</span><span class="terminal-punct">$</span><span class="terminal-message">${t.message || ''}</span><span class="terminal-cursor"></span></span>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-map"></i> Menu
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">${items}
          </ul>
        </div>
      </div>`);
  }

  function renderFooter() {
    const footer = document.getElementById('site-footer');
    if (!footer) return;
    const container = footer.dataset.container || 'container wide-page-container';
    const updated = config.lastUpdated ? `<div class="text-muted"><i>Last updated: ${config.lastUpdated}</i></div>` : '';

    footer.innerHTML = `
      <div class="${container}">
        <div class="row my-3">
          <div class="col-12 col-lg-9 ml-auto">
            <div class="row align-items-end">
              <div class="col-12 col-md">${updated}</div>
              <div class="col-12 col-md-auto ml-md-auto">
                <div class="text-muted text-md-right footer-credits">${config.footerCredits || ''}</div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ---------- 首页：个人卡片 / News / About / 教育与经历 ---------- */

  function renderProfile() {
    const p = SITE.profile;
    if (!p || !hasMount('profile-card')) return;

    const logo = p.affiliationLogo ? ` <img class="inline-badge" src="${p.affiliationLogo}" alt="">` : '';
    const lines = [p.position, p.affiliation ? p.affiliation + logo : ''].filter(Boolean).join('<br>');
    const avatar = p.avatar ? `
          <div class="avatar-container mb-2">
            <img class="avatar-img img-thumbnail rounded-circle" src="${p.avatar}" alt="${escapeHtml(stripTags(p.name))}">
          </div>` : '';
    const email = p.email ? `
          <div class="small">
            <a class="email-text follow_href" href="mailto:${p.email}">${escapeHtml(p.email.replace('@', '(at)'))}</a>
          </div>` : '';
    const links = (p.links || []).map((link) => `
            <a class="px-1 no-break follow_href" href="${link.url}"${targetAttrs(link.url)} title="${escapeHtml(link.title)}" aria-label="${escapeHtml(link.title)}"><i class="${link.icon}"></i></a>`).join('');

    mount('profile-card', `
      <div class="card border-0 shadow-sm bg-white custom-radius">
        <div class="card-body px-4 pt-4 pb-3 text-center">${avatar}
          <div class="h4">${p.name}</div>
          ${lines ? `<div class="small">${lines}</div>` : ''}${email}
          ${links ? `<div class="h4 pt-2">${links}
          </div>` : ''}
        </div>
      </div>`);
  }

  function renderNews() {
    const news = SITE.news;
    if (!news || !(news.items || []).length || !hasMount('news-card')) return;

    const shown = news.initiallyShown || 5;
    const items = news.items.map((item, i) => `
            <div class="py-2${i > 0 ? ' border-top' : ''}${i >= shown ? ' d-none news-item-extra' : ''}">
              <div class="news-item-date text-muted mb-1">${item.date}</div>
              <div class="news-item-title">${item.html}</div>
            </div>`).join('');
    const toggle = news.items.length > shown ? `
          <div class="px-3 pb-3 text-center">
            <button class="news-toggle-button" type="button" id="news-toggle" aria-expanded="false">Show more</button>
          </div>` : '';

    mount('news-card', `
      <div class="card border-0 shadow-sm bg-white custom-radius mt-3">
        <div class="card-body p-0">
          <h6 class="p-3 mb-0 border-bottom"><i class="fas fa-rss"></i> News</h6>
          <div class="px-3 pb-1">${items}
          </div>${toggle}
        </div>
      </div>`);
  }

  function renderAbout() {
    const about = SITE.about;
    if (!about || !hasMount('about-card')) return;
    const icon = about.icon ? `<img class="about-icon" src="${about.icon}" alt="">` : '';

    mount('about-card', `
      <div class="card border-0 shadow-sm bg-white custom-radius mt-3 mt-xl-0">
        <div class="card-body p-4">
          <div class="h3 d-flex align-items-center px-3 pt-3 mb-2">${about.title || 'About Me'}${icon}</div>
          <div class="text-profile-bio p-3">${about.html || ''}</div>
        </div>
      </div>`);
  }

  function experienceColumn(title, entries) {
    if (!(entries || []).length) return '';
    const items = entries.map((e) => {
      const logos = (e.logos || []).map((src) => `<img class="experience-inline-logo" src="${src}" alt="">`).join('');
      return `
                <li class="mb-1">
                  <div class="d-flex align-items-center">
                    <div class="experience-item-title">${e.name}</div>
                    ${logos ? `<div class="ml-2 d-flex align-items-center experience-logos">${logos}</div>` : ''}
                  </div>
                  <div class="small d-flex experience-item-details">
                    <div>${e.details || ''}</div>
                    <div class="mt-auto ml-auto pl-2 no-break"><em>${e.period || ''}</em></div>
                  </div>
                </li>`;
    }).join('');

    return `
          <div class="col-lg-6 experience-column">
            <div class="mx-2 my-1">
              <h6 class="experience-section-title">${title}</h6>
              <ul class="list-unstyled mb-1">${items}
              </ul>
            </div>
          </div>`;
  }

  function renderExperience() {
    if (!hasMount('experience-card')) return;
    const columns = experienceColumn('Education', SITE.education) + experienceColumn('Experience', SITE.experience);
    if (!columns) return;

    mount('experience-card', `
      <div class="card border-0 shadow-sm bg-white custom-radius mt-3">
        <div class="card-body p-4">
          <div class="row">${columns}
          </div>
        </div>
      </div>`);
  }

  /* ---------- 论文 ---------- */

  function normalizeName(name) {
    return String(name).replace(/[*†‡#]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
  }

  const ownerNames = [].concat(config.highlightName || (SITE.profile && SITE.profile.name) || []).map(normalizeName);

  function renderAuthors(authors) {
    let hasEqualContribution = false;
    const parts = (authors || []).map((author) => {
      const a = typeof author === 'string' ? { name: author } : author;
      const name = escapeHtml(a.name);
      if (a.name.indexOf('*') !== -1) hasEqualContribution = true;
      if (ownerNames.indexOf(normalizeName(a.name)) !== -1) return `<strong class="pub-author-me">${name}</strong>`;
      if (a.url) return `<a class="text-body" href="${a.url}"${targetAttrs(a.url)}>${name}</a>`;
      return `<span class="text-body">${name}</span>`;
    });
    if (!parts.length) return '';
    return parts.join('; ') + '.' + (hasEqualContribution ? ' <mark>(* <i>equal contribution</i>)</mark>' : '');
  }

  // 没有封面时，根据标题生成一张固定的彩色气泡图（思路来自模板的 bubble_visual_hash.js）
  function bubbleCover(title) {
    let seed = 2166136261;
    for (let i = 0; i < title.length; i++) {
      seed ^= title.charCodeAt(i);
      seed = Math.imul(seed, 16777619);
    }
    const random = () => {
      seed = (seed + 0x6D2B79F5) | 0;
      let t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const palette = ['#40A578', '#78B9B5', '#6096B4', '#98A8F8', '#FFAAAA', '#B5C99A', '#748E63', '#F2C57C'];
    const bubbles = [];
    for (let i = 0; i < 8; i++) {
      bubbles.push({ x: random() * 300, y: random() * 200, r: 12 + random() * 88, color: palette[Math.floor(random() * palette.length)] });
    }
    bubbles.sort((a, b) => b.r - a.r);
    const circles = bubbles.map((b) => `<circle cx="${b.x.toFixed(1)}" cy="${b.y.toFixed(1)}" r="${b.r.toFixed(1)}" fill="${b.color}" fill-opacity="0.75"/>`).join('');
    return `<svg class="publication-cover bubble-cover rounded-sm" viewBox="0 0 300 200" role="img" aria-label="${escapeHtml(title)}"><rect width="300" height="200" fill="#f7faf7"/>${circles}</svg>`;
  }

  function renderCover(pub) {
    const alt = escapeHtml(stripTags(pub.title));
    if (pub.video) {
      const poster = pub.cover ? ` poster="${pub.cover}"` : '';
      return `<video class="publication-cover publication-cover-video rounded-sm" data-src="${pub.video}"${poster} muted loop playsinline autoplay preload="none" aria-label="${alt}"></video>`;
    }
    if (pub.cover) {
      return `<img class="publication-cover rounded-sm" src="${pub.cover}" alt="${alt}" loading="lazy">`;
    }
    return bubbleCover(stripTags(pub.title));
  }

  // highlightSelected：Research 页给 selected 的论文加高亮底色，首页不加
  function renderPublication(pub, highlightSelected) {
    const classes = ['pub-entry'];
    if (highlightSelected && pub.selected) classes.push('selected-publication');
    if (pub.badge) classes.push('has-badge');

    const title = pub.url ? `<a class="item_link" href="${pub.url}"${targetAttrs(pub.url)}>${pub.title}</a>` : pub.title;
    const authors = renderAuthors(pub.authors);
    const note = pub.note ? `<span class="pub-note">${pub.note}</span>` : '';
    const links = (pub.links || []).map((l) => `<a class="item_link" href="${l.url}"${targetAttrs(l.url)}>[${l.label}]</a>`).join(' ');
    const topics = (pub.topics || []).map((slug) =>
      `<a class="publication-topic-link js-topic-link" href="${topicHref(slug)}" data-topic="${slug}"># ${topicLabel(slug)}</a>`).join('');
    // 图片封面在手机上作为整行的淡背景，由 initLazyMedia() 在滚动到附近时再加载
    const coverData = pub.cover && !pub.video ? ` data-cover="${pub.cover}"` : '';

    return `
            <div class="${classes.join(' ')}" data-publication-entry data-topics="${(pub.topics || []).join('|')}"${coverData}>
              <div class="pub-cover-col${pub.video ? ' has-video' : ''}">${renderCover(pub)}</div>
              <div class="pub-body-col">
                <h5 class="pub-title mt-0 mb-0 font-weight-normal">${title}</h5>
                ${authors ? `<p class="mt-0 mb-0 small">${authors}</p>` : ''}
                <p class="mt-0 mb-0 small"><i><b>${pub.venue || ''}</b></i> ${pub.year || ''}${note}</p>
                ${pub.description ? `<p class="mt-0 mb-0 small text-muted">${pub.description}</p>` : ''}
                ${links ? `<p class="small mb-0 text-muted">${links}</p>` : ''}
                ${topics ? `<div class="publication-topic-list">${topics}</div>` : ''}
              </div>
              ${pub.badge ? `<div class="pub-badge">${pub.badge}</div>` : ''}
            </div>`;
  }

  function renderSelectedPublications() {
    if (!hasMount('selected-publications')) return;
    const pubs = (SITE.publications || []).filter((p) => p.selected);
    if (!pubs.length) return;

    mount('selected-publications', `
      <div class="my-3 p-0 bg-white shadow-sm custom-radius pub-card">
        <h5 class="border-bottom p-3 mb-0">
          Selected Publications
          <a href="research.html" class="pub-link">(view all <i class="fas fa-angle-double-right"></i>)</a>
        </h5>${pubs.map((p) => renderPublication(p, false)).join('')}
        <h6 class="d-block p-3 mt-0 text-right">
          <a href="research.html" class="pub-link">All research <i class="fas fa-angle-double-right"></i></a>
        </h6>
      </div>`);
  }

  /* ---------- Research 页 ---------- */

  function renderTopicFilter() {
    if (!hasMount('topic-filter')) return;
    const chips = [`<a class="research-summary-topic js-filter-link" href="research.html" data-filter="">All</a>`]
      .concat((SITE.topics || []).map((t) =>
        `<a class="research-summary-topic js-filter-link" href="${topicHref(t.slug)}" data-filter="${t.slug}"># ${t.label}</a>`));
    mount('topic-filter', chips.join('\n'));
  }

  function renderResearchSummary() {
    const research = SITE.research;
    if (!research || !research.summary || !hasMount('research-summary')) return;

    mount('research-summary', `
      <div class="card border-0 shadow-sm bg-white custom-radius">
        <div class="card-body p-4">
          <h5 class="research-summary-title mb-3">${research.title || 'My Research'}</h5>
          <div class="research-summary-paragraph">${research.summary}</div>
        </div>
      </div>`);
  }

  function renderPublicationList() {
    if (!hasMount('publication-list')) return;
    const groups = new Map();
    (SITE.publications || []).forEach((pub) => {
      const year = pub.year || 'Others';
      if (!groups.has(year)) groups.set(year, []);
      groups.get(year).push(pub);
    });
    const years = Array.from(groups.keys()).sort((a, b) => (Number(b) || 0) - (Number(a) || 0));

    mount('publication-list', years.map((year) => `
      <section class="publication-year-group" data-year-group>
        <h2 class="pt-4 mt-3" id="year-${year}">${year}</h2>
        <div class="card border-0 shadow-sm bg-white custom-radius pub-card">${groups.get(year).map((p) => renderPublication(p, true)).join('')}
        </div>
      </section>`).join(''));
  }

  /* ---------- Services & Awards 页 ---------- */

  function renderShowcase() {
    const sections = SITE.showcase || [];
    if (!sections.length || !hasMount('showcase')) return;

    mount('showcase', sections.map((section, i) => {
      const groups = section.groups || [];
      const body = groups.map((group, j) => `
              ${group.title ? `<h4>${group.title}</h4>` : ''}
              <ul class="${j === groups.length - 1 ? 'mb-0' : 'mb-4'}">
                ${(group.items || []).map((item) => `<li>${item}</li>`).join('\n                ')}
              </ul>`).join('');
      return `
      <div class="row mt-4${i === sections.length - 1 ? ' mb-4' : ''}">
        <div class="col-12">
          <div class="card border-0 shadow-sm bg-white">
            <div class="card-body p-4 p-md-5">
              <h2 class="mb-4">${section.title}</h2>${body}
            </div>
          </div>
        </div>
      </div>`;
    }).join(''));
  }

  /* ---------- 交互 ---------- */

  function initNewsToggle() {
    const button = document.getElementById('news-toggle');
    if (!button) return;
    let expanded = false;
    button.addEventListener('click', () => {
      expanded = !expanded;
      document.querySelectorAll('.news-item-extra').forEach((item) => item.classList.toggle('d-none', !expanded));
      button.textContent = expanded ? 'Show less' : 'Show more';
      button.setAttribute('aria-expanded', String(expanded));
    });
  }

  // 手机端的封面背景图、以及封面视频，都等滚动到附近时才加载；视频离开视口时暂停
  function initLazyMedia() {
    const entries = document.querySelectorAll('.pub-entry[data-cover]');
    const videos = document.querySelectorAll('video[data-src]');

    const showBackground = (entry) => {
      const url = new URL(entry.dataset.cover, document.baseURI).href;
      entry.style.setProperty('--pub-cover-bg', `url("${url}")`);
    };
    const playVideo = (video) => {
      if (!video.getAttribute('src')) video.src = video.dataset.src;
      video.muted = true;
      const playing = video.play();
      if (playing && playing.catch) playing.catch(() => {});
    };

    if (!('IntersectionObserver' in window)) {
      entries.forEach(showBackground);
      videos.forEach(playVideo);
      return;
    }

    const backgroundObserver = new IntersectionObserver((records) => {
      records.forEach((record) => {
        if (!record.isIntersecting) return;
        showBackground(record.target);
        backgroundObserver.unobserve(record.target);
      });
    }, { rootMargin: '300px 0px' });
    entries.forEach((entry) => backgroundObserver.observe(entry));

    const videoObserver = new IntersectionObserver((records) => {
      records.forEach((record) => {
        if (record.isIntersecting) playVideo(record.target);
        else record.target.pause();
      });
    }, { rootMargin: '200px 0px' });
    videos.forEach((video) => videoObserver.observe(video));
  }

  // Research 页按研究方向筛选；URL 形如 research.html?topic=robotics，可直接分享
  function initTopicFilter() {
    if (!document.querySelector('[data-publication-filter-root]')) return;
    const knownTopics = new Set((SITE.topics || []).map((t) => t.slug));

    function applyFilter(slug) {
      let anyVisible = false;
      document.querySelectorAll('[data-publication-entry]').forEach((entry) => {
        const matches = !slug || entry.dataset.topics.split('|').indexOf(slug) !== -1;
        entry.hidden = !matches;
        if (matches) anyVisible = true;
      });

      document.querySelectorAll('[data-year-group]').forEach((group) => {
        const entries = Array.from(group.querySelectorAll('[data-publication-entry]'));
        const visible = entries.filter((entry) => !entry.hidden);
        group.hidden = visible.length === 0;
        entries.forEach((entry) => entry.classList.toggle('is-last-visible', entry === visible[visible.length - 1]));
      });

      document.querySelectorAll('.js-filter-link').forEach((link) => link.classList.toggle('is-active', link.dataset.filter === slug));
      document.querySelectorAll('.js-topic-link').forEach((link) => link.classList.toggle('is-active', !!slug && link.dataset.topic === slug));

      const emptyState = document.getElementById('publication-filter-empty-state');
      if (emptyState) emptyState.hidden = anyVisible;
    }

    function applyFilterFromUrl() {
      const slug = new URLSearchParams(window.location.search).get('topic') || '';
      applyFilter(knownTopics.has(slug) ? slug : '');
    }

    document.addEventListener('click', (event) => {
      const link = event.target.closest('.js-filter-link, .js-topic-link');
      if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const slug = link.classList.contains('js-filter-link') ? link.dataset.filter : link.dataset.topic;
      applyFilter(slug);
      try {
        window.history.replaceState(null, '', slug ? '?topic=' + encodeURIComponent(slug) : window.location.pathname);
      } catch (e) {
        // 以 file:// 打开时部分浏览器不允许修改地址栏，忽略即可
      }
    });

    window.addEventListener('popstate', applyFilterFromUrl);
    applyFilterFromUrl();
  }

  // config.math 为 true 时按需加载 KaTeX，渲染 $...$ / $$...$$ 公式
  function loadMath() {
    if (!config.math) return;
    const base = 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/';
    const loadScript = (src) => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });

    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = base + 'katex.min.css';
    document.head.appendChild(css);

    loadScript(base + 'katex.min.js')
      .then(() => loadScript(base + 'contrib/auto-render.min.js'))
      .then(() => window.renderMathInElement(document.body, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
        ],
        throwOnError: false,
      }))
      .catch(() => {});
  }

  /* ---------- 启动 ---------- */

  renderNav();
  renderFooter();
  renderProfile();
  renderNews();
  renderAbout();
  renderExperience();
  renderSelectedPublications();
  renderTopicFilter();
  renderResearchSummary();
  renderPublicationList();
  renderShowcase();

  initNewsToggle();
  initLazyMedia();
  initTopicFilter();
  loadMath();
})();
