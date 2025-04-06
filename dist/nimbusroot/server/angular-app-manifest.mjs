
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/nimbusroot_deployed/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "preload": [
      "chunk-XU3HEDQT.js"
    ],
    "route": "/nimbusroot_deployed"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-FMA4L3BJ.js"
    ],
    "route": "/nimbusroot_deployed/sobre_nosotros"
  },
  {
    "renderMode": 2,
    "preload": [
      "chunk-XU3HEDQT.js"
    ],
    "route": "/nimbusroot_deployed/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 7203, hash: 'c7ae917f8fe827e7ffe459134fc5bb82c11155594c95d9de94649355b9f0a012', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 2182, hash: 'ac3eea10704998cc2dfc8ee34c53786fa44804e8a73acbd354c4c0afe77a68e3', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 21055, hash: '9cfbc5cfcb5db17db42a8af3418cda2f1a809160e0fe210285844b7a31b8a343', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'sobre_nosotros/index.html': {size: 19125, hash: '1a72d18c373d8dd62c9004240597838106c3a62a85ab64d3064031d34f23287a', text: () => import('./assets-chunks/sobre_nosotros_index_html.mjs').then(m => m.default)},
    'styles-WVQCRLWV.css': {size: 18764, hash: 'bKwYVnMUS7A', text: () => import('./assets-chunks/styles-WVQCRLWV_css.mjs').then(m => m.default)}
  },
};
