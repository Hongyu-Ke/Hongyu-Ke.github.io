/* =====================================================================
 * 站点设置 & 个人信息
 * 控制：导航栏、页脚、首页左侧个人卡片、About Me、教育 / 经历。
 * 大部分文字字段都支持 HTML，例如 <a href="...">、<b>、<br/>。
 * ===================================================================== */
window.SITE = window.SITE || {};

SITE.config = {
  // 导航栏左侧的“终端提示符”，显示为 user@host:~$ message
  terminal: {
    user: 'HongyuKe',
    host: '@GSU',
    message: 'Welcome!',
  },

  // 顶部菜单；page 要和对应 HTML 文件 <body data-page="..."> 的值一致，用来高亮当前页
  nav: [
    { label: 'Home', href: 'index.html', page: 'home' },
    { label: 'Research', href: 'research.html', page: 'research' },
    { label: 'Services & Awards', href: 'showcase.html', page: 'showcase' },
  ],

  // 论文作者列表里要高亮（绿色加粗）的名字；有多种写法时写成数组，如 ['Hongyu Ke', 'H. Ke']
  highlightName: 'Hongyu Ke',

  // 页脚
  lastUpdated: 'Oct 2026',
  footerCredits: 'Based on the wonderful <a href="https://github.com/luost26/academic-homepage" target="_blank" rel="noopener"><i class="fas fa-pencil-ruler"></i> academic-homepage</a>, design adapted from <a href="https://yiren-lu.com" target="_blank" rel="noopener">yiren-lu.com</a>.',

  // 设为 true 会加载 KaTeX，论文标题 / 简介里就能写 $...$ 数学公式
  math: false,
};

SITE.profile = {
  name: 'Hongyu Ke',
  avatar: 'assets/images/photo.jpg',             // 头像（正方形最佳）
  position: 'Ph.D. Candidate in Computer Science',
  affiliation: '@ Georgia State University',
  affiliationLogo: 'assets/images/logos/gsu.png', // 不需要就设为 ''
  email: 'hke3@gsu.edu',                         // 页面上显示为 hke3(at)gsu.edu

  // 社交链接；icon 用 Font Awesome 6 的类名：https://fontawesome.com/search?o=r&f=brands
  links: [
    { title: 'Google Scholar', icon: 'fab fa-google-scholar', url: 'https://scholar.google.com/citations?user=XSg1n8YAAAAJ' },
    { title: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/Hongyu-Ke' },
    { title: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/in/hongyu-ke-9057b51b7/' },
    { title: 'ORCID', icon: 'fab fa-orcid', url: 'https://orcid.org/0009-0003-5653-9814' },
  ],
};

SITE.about = {
  title: 'About Me',
  icon: 'assets/images/about-icon.svg', // 标题右边的小图，不需要就设为 ''
  html: `
    <p>I am Hongyu Ke (柯泓宇), a Ph.D. candidate in Computer Science at <a href="https://www.gsu.edu/">Georgia State University</a>,
    where I work in the <a href="https://www.amai-gsu.us/">Advanced Mobility &amp; Augmented Intelligence (AMAI) Lab</a> under the
    supervision of <a href="https://www.amai-gsu.us/group/">Dr. Haoxin Wang</a>. In collaboration with Toyota Motor North America, I develop architectures for autonomous driving,
    spanning multi-view 3D perception, bird's-eye-view (BEV) representation learning, temporal fusion, and efficient
    adaptation of large models. My research interests include <b>autonomous driving foundation models</b>,
    <b>BEV representations</b>, <b>vision-language-action models</b>, and <b>efficient multimodal AI systems</b>.</p>
    <p>Prior to that, I received my M.S. in Computer Science and Engineering from the <a href="https://www.buffalo.edu/">University at Buffalo</a>
    in 2022, and my B.S. in Applied Mathematics &amp; Statistics and B.S. in Mathematics from
    <a href="https://www.stonybrook.edu/">Stony Brook University</a> in 2021.</p>
  `,
};

// 教育经历：logos 可放学校 / 实验室 logo（可多个，如 ['assets/images/logos/gsu.png']）；details 用 <br/> 换行
SITE.education = [
  {
    name: 'Georgia State University',
    logos: ['assets/images/logos/gsu.png'],
    details: 'AMAI Lab, advised by Dr. Haoxin Wang<br/>Ph.D. in Computer Science',
    period: 'Jan. 2023 - present',
  },
  {
    name: 'University at Buffalo',
    logos: ['assets/images/logos/ub.png'],
    details: 'M.S. in Computer Science and Engineering',
    period: 'Jan. 2022 - Dec. 2022',
  },
  {
    name: 'Stony Brook University',
    logos: ['assets/images/logos/sbu.png'],
    details: 'B.S. in Applied Mathematics &amp; Statistics<br/>B.S. in Mathematics',
    period: 'Jan. 2018 - Dec. 2021',
  },
];

// 工作 / 实习经历
SITE.experience = [
  {
    name: 'GSU &amp; Toyota Motor North America',
    logos: ['assets/images/logos/gsu.png'],
    details: 'Department of Computer Science<br/>Research Assistant',
    period: 'Jan. 2023 - present',
  },
];
