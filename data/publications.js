/* =====================================================================
 * 论文 & 研究方向
 * 首页显示 selected: true 的论文；Research 页显示全部论文，按 year 自动分组（年份倒序）。
 * ===================================================================== */
window.SITE = window.SITE || {};

// Research 页左栏的 “My Research” 简介；用 <span class="research-summary-highlight">…</span> 做荧光笔效果
SITE.research = {
  title: 'My Research',
  summary: 'My research focuses on <span class="research-summary-highlight">efficient and scalable perception and world representations for autonomous driving</span>. '
    + 'I develop architectures for multi-view 3D perception, bird\'s-eye-view (BEV) representation learning, and temporal fusion, '
    + 'for example bringing linear-complexity state space models to BEV perception (MamBEV) and general visual recognition (Deformba), '
    + 'and designing compact temporal fusion for multi-view 3D perception on edge devices (TinyBEV). '
    + 'I am also interested in making large models efficient to adapt and deploy, from federated fine-tuning of large language models '
    + 'to on-device inference profiling (LM-Meter) and carbon-aware edge intelligence (CarbonCP). '
    + 'Looking ahead, my interests extend to autonomous driving foundation models and vision-language-action models.',
};

// 研究方向标签：Research 页左栏的筛选按钮按这个顺序显示；论文的 topics 字段填这里的 slug
SITE.topics = [
  { slug: 'autonomous-driving', label: 'Autonomous Driving' },
  { slug: 'bev-perception', label: 'BEV Perception' },
  { slug: 'state-space-models', label: 'State Space Models' },
  { slug: 'large-language-models', label: 'Large Language Models' },
  { slug: 'efficient-ai', label: 'Efficient AI' },
  { slug: 'edge-computing', label: 'Edge Computing' },
];

/*
 * 论文字段说明（除 title / venue / year 外都可省略）：
 *   title        标题（支持 HTML）
 *   url          标题链接，一般指向项目主页或论文页
 *   authors      作者列表；写字符串，或 { name, url } 给作者加链接；
 *                名字后加 * 会自动显示 “(* equal contribution)”；与 highlightName 相同的名字会高亮
 *   venue, year  会议 / 期刊名与年份，显示为 “venue year”
 *   badge        封面左上角的小徽章（会议简称）
 *   note         年份后面的补充说明，如 Oral / Spotlight / Best Paper Finalist
 *   description  一两句话的简介
 *   cover        封面图（png / jpg / gif / svg，放在 assets/images/publications/）；不填会根据标题自动生成彩色气泡图；
 *                写成数组（如 ['a.jpg', 'b.jpg']）会自动轮播，各张图尺寸最好一致
 *   coverInterval 轮播时每张图停留的毫秒数，默认 3000
 *   video        封面视频（mp4，放在 assets/videos/）；填了会替代 cover，cover 则作为视频加载前的海报帧
 *   links        链接列表，显示为 [Paper] [Code] ……
 *   topics       研究方向 slug 列表（见上方 SITE.topics）
 *   selected     true = 显示在首页 Selected Publications，并在 Research 页高亮为代表作
 */
SITE.publications = [
  {
    title: 'Deformba: Vision State Space Model with Adaptive State Fusion',
    url: 'https://arxiv.org/abs/2605.21308',
    authors: ['Hongyu Ke', 'Jack Morris', 'Yongkang Liu', 'Satoshi Kitai', 'Kentaro Oguchi', 'Yi Ding', 'Haoxin Wang'],
    venue: 'International Conference on Machine Learning (ICML)',
    year: 2026,
    badge: 'ICML',
    description: 'A vision state space model with Context-Adaptive State Fusion for adaptive spatial modeling and query-to-source fusion, '
      + 'validated on image classification, object detection, instance and semantic segmentation, and BEV 3D detection.',
    // 轮播：论文图 2、图 3、图 6、图 7
    cover: [
      'assets/images/publications/deformba-2.jpg',
      'assets/images/publications/deformba-3.jpg',
      'assets/images/publications/deformba-4.jpg',
      'assets/images/publications/deformba-5.jpg',
    ],
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2605.21308' },
      { label: 'OpenReview', url: 'https://openreview.net/forum?id=4Anq3hEfaO' },
      { label: 'Code', url: 'https://github.com/amai-gsu/Deformba' },
    ],
    topics: ['state-space-models', 'bev-perception'],
    selected: true,
  },
  {
    title: 'Task-Aware Federated Fine-Tuning for MoE-based Large Language Models',
    url: 'https://arxiv.org/abs/2609.13395',
    authors: ['Tingqi Wang', 'Hongyu Ke', 'Haoxin Wang', 'Rafal Angryk', 'Zhipeng Cai'],
    venue: 'IEEE International Conference on Data Mining (ICDM)',
    year: 2026,
    badge: 'ICDM',
    description: 'FedTAR infers each client\'s task preference from MoE routing signals and aggregates updates within and across task clusters, '
      + 'preserving expert specialization in federated fine-tuning of LLMs on heterogeneous data.',
    // 轮播：论文图 1（a、b 并排）、图 2、图 3、图 5（MMLU）
    cover: [
      'assets/images/publications/fedtar-1.jpg',
      'assets/images/publications/fedtar-2.jpg',
      'assets/images/publications/fedtar-3.jpg',
      'assets/images/publications/fedtar-4.jpg',
    ],
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2609.13395' },
    ],
    topics: ['large-language-models', 'efficient-ai'],
    selected: true,
  },
  {
    title: 'MamBEV: Enabling State Space Models to Learn Birds-Eye-View Representations',
    url: 'https://arxiv.org/abs/2503.13858',
    authors: ['Hongyu Ke*', 'Jack Morris*', 'Kentaro Oguchi', 'Xiaofei Cao', 'Yongkang Liu', 'Haoxin Wang', 'Yi Ding'],
    venue: 'International Conference on Learning Representations (ICLR)',
    year: 2025,
    badge: 'ICLR',
    description: 'A BEV perception framework that learns efficient spatio-temporal world representations from multi-camera inputs with state space models, '
      + 'replacing Transformer-style attention with linear Mamba-based modeling for scalable 3D detection.',
    // 轮播：论文图 1、图 2、整体架构图（来自 GitHub 仓库）、图 4、图 5
    cover: [
      'assets/images/publications/mambev-1.jpg',
      'assets/images/publications/mambev-2.jpg',
      'assets/images/publications/mambev-3.jpg',
      'assets/images/publications/mambev-4.jpg',
      'assets/images/publications/mambev-5.jpg',
    ],
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2503.13858' },
      { label: 'OpenReview', url: 'https://openreview.net/forum?id=MvEkN2ejZ1' },
      { label: 'Code', url: 'https://github.com/amai-gsu/MamBEV' },
    ],
    topics: ['autonomous-driving', 'bev-perception', 'state-space-models'],
    selected: true,
  },
  {
    title: 'LM-Meter: Unveiling Runtime Inference Latency for On-Device Language Models',
    url: 'https://doi.org/10.1145/3769102.3770614',
    authors: ['Haoxin Wang', 'Xiaolong Tu', 'Hongyu Ke', 'Huirong Chai', 'Dawei Chen', 'Kyungtae Han'],
    venue: 'ACM/IEEE Symposium on Edge Computing (SEC)',
    year: 2025,
    badge: 'SEC',
    note: 'Best Paper Award Finalist',
    description: 'A real-time on-device LLM latency profiler with phase- and kernel-level tracing, enabling fine-grained bottleneck analysis on mobile hardware.',
    // 轮播：论文图 2(a)、图 4(a)、图 10(a)、图 10(b)
    cover: [
      'assets/images/publications/lm-meter-1.jpg',
      'assets/images/publications/lm-meter-2.jpg',
      'assets/images/publications/lm-meter-3.jpg',
    ],
    links: [
      { label: 'Paper', url: 'https://doi.org/10.1145/3769102.3770614' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2510.06126' },
      { label: 'Code', url: 'https://github.com/amai-gsu/LM-Meter' },
    ],
    topics: ['large-language-models', 'edge-computing'],
    selected: true,
  },
  {
    title: 'TinyBEV: Compact Temporal Fusion for Multi-View 3D Perception',
    url: 'https://doi.org/10.1145/3769102.3774633',
    authors: ['Hongyu Ke', 'Jack Morris', 'Yongkang Liu', 'Satoshi Kitai', 'Kentaro Oguchi', 'Yi Ding', 'Haoxin Wang'],
    venue: 'EdgeCAV Workshop @ ACM/IEEE Symposium on Edge Computing (SEC)',
    year: 2025,
    badge: 'EdgeCAV',
    description: 'An edge-friendly multi-camera BEV framework that replaces cross-attention with state space models and adds lightweight '
      + 'time-conditioned history fusion, so its cost stays nearly flat as the temporal context grows.',
    links: [
      { label: 'Paper', url: 'https://doi.org/10.1145/3769102.3774633' },
    ],
    topics: ['autonomous-driving', 'bev-perception', 'efficient-ai'],
  },
  {
    title: 'CarbonCP: Carbon-Aware DNN Partitioning with Conformal Prediction for Sustainable Edge Intelligence',
    url: 'https://arxiv.org/abs/2404.16970',
    authors: ['Hongyu Ke', 'Wanxin Jin', 'Haoxin Wang'],
    venue: 'arXiv preprint arXiv:2404.16970',
    year: 2024,
    badge: 'arXiv',
    description: 'Uses conformal prediction to make uncertainty-aware DNN partitioning decisions between edge devices and servers, '
      + 'reducing operational carbon emissions under latency and battery constraints.',
    cover: 'assets/images/publications/carboncp.png',
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2404.16970' },
    ],
    topics: ['edge-computing', 'efficient-ai'],
  },
  {
    title: 'Metamobility: Connecting Future Mobility with the Metaverse',
    url: 'https://doi.org/10.1109/MVT.2023.3263330',
    authors: ['Haoxin Wang', 'Ziran Wang', 'Dawei Chen', 'Qiang Liu', 'Hongyu Ke', 'Kyungtae Han'],
    venue: 'IEEE Vehicular Technology Magazine',
    year: 2023,
    badge: 'IEEE VTM',
    description: 'A vision article that introduces metamobility, the metaverse applied to future transportation, and outlines its architecture, '
      + 'example applications such as tactile live maps and metaverse-assisted ADAS, and open challenges.',
    cover: 'assets/images/publications/metamobility.jpg',
    links: [
      { label: 'Paper', url: 'https://doi.org/10.1109/MVT.2023.3263330' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2301.06991' },
    ],
    topics: ['autonomous-driving'],
  },
  {
    title: 'Poster: Real-Time Object Substitution for Mobile Diminished Reality with Edge Computing',
    url: 'https://doi.org/10.1145/3583740.3628422',
    authors: ['Hongyu Ke', 'Haoxin Wang'],
    venue: 'ACM/IEEE Symposium on Edge Computing (SEC), Poster',
    year: 2023,
    badge: 'SEC',
    description: 'An end-to-end edge-assisted pipeline that lets mobile devices erase real objects from the camera view and replace them with virtual ones in real time.',
    cover: 'assets/images/publications/poster-dr.png',
    links: [
      { label: 'Paper', url: 'https://doi.org/10.1145/3583740.3628422' },
      { label: 'arXiv', url: 'https://arxiv.org/abs/2310.14511' },
    ],
    topics: ['edge-computing'],
  },
];
