/* =====================================================================
 * News（首页左栏）
 * 按时间倒序排列；默认显示前 initiallyShown 条，其余折叠在 “Show more” 里。
 * html 字段支持链接、加粗等 HTML。
 * 2025 年以后的几条只写到年份，可以补成具体日期，如 '2026.05.01'。
 * ===================================================================== */
window.SITE = window.SITE || {};

SITE.news = {
  initiallyShown: 5,
  items: [
    { date: '2026', html: 'Our paper <a href="https://arxiv.org/abs/2609.13395">Task-Aware Federated Fine-Tuning for MoE-based LLMs</a> is accepted to <b>ICDM 2026</b>.' },
    { date: '2026', html: 'Recognized as an <b>ICML 2026 Golden Reviewer</b>.' },
    { date: '2026', html: 'Our paper <a href="https://arxiv.org/abs/2605.21308">Deformba</a> is accepted to <b>ICML 2026</b>.' },
    { date: '2025', html: '<a href="https://doi.org/10.1145/3769102.3770614">LM-Meter</a> is named a <b>Best Paper Award Finalist</b> at ACM/IEEE SEC 2025.' },
    { date: '2025', html: '<a href="https://doi.org/10.1145/3769102.3770614">LM-Meter</a> and <a href="https://doi.org/10.1145/3769102.3774633">TinyBEV</a> are accepted to <b>ACM/IEEE SEC 2025</b>.' },
    { date: '2025', html: 'Our paper <a href="https://arxiv.org/abs/2503.13858">MamBEV</a> is accepted to <b>ICLR 2025</b>.' },
    { date: '2024.04.25', html: 'Our preprint <a href="https://arxiv.org/abs/2404.16970">CarbonCP</a> is released on arXiv.' },
    { date: '2024.04.15', html: 'Passed my research qualification and became a <b>Ph.D. candidate</b>.' },
    { date: '2023.11.09', html: 'Received the student travel grant for <b>ACM/IEEE SEC 2023</b>.' },
    { date: '2023.10.16', html: 'One <a href="https://doi.org/10.1145/3583740.3628422">poster paper</a> is accepted to <b>ACM/IEEE SEC 2023</b>.' },
    { date: '2023.01.16', html: 'One <a href="https://doi.org/10.1109/MVT.2023.3263330">paper</a> is accepted to <b>IEEE Vehicular Technology Magazine</b>.' },
    { date: '2023.01', html: 'Started my Ph.D. at Georgia State University, advised by Dr. Haoxin Wang.' },
  ],
};
