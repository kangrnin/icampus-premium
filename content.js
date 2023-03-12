function sleep (ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

async function getWhenExists (selector) {
  while (!$(selector).length) {
    await sleep(100)
  }
  return $(selector)[0]
}

$(async () => {
  // intro skip
  const video = await getWhenExists('video.vc-vplay-video1')
  $(video).on('loadedmetadata', async e => {
    if (e.target.src.includes('/settings/viewer/uniplayer/intro')) {
      await sleep(100)
      e.target.currentTime = e.target.duration
    }
  })

  // inject icampus premium features script
  const featuresScript = document.createElement('script')
  featuresScript.src = chrome.runtime.getURL('premium-features.js')
  const scriptRoot = document.head || document.documentElement
  scriptRoot.appendChild(featuresScript)

  // video only
  const menuBar = await getWhenExists('div.vc-pctrl-buttons-bar')
  const videoOnlyAnchor = $(`<a target="_blank" href="${location.href}"></a>`)
  const videoOnlyButton = $('<button title="동영상만 보기"></button>')
  videoOnlyButton.css({
    'margin': '0',
    'padding': '0',
    'border': '0',
    'width': '30px',
    'height': '27px',
    'background': `url(${chrome.runtime.getURL('images/rectangle.svg')})`,
    'float': 'right',
    'cursor': 'pointer',
  })
  $(videoOnlyAnchor).append(videoOnlyButton)
  $(menuBar).prepend(videoOnlyAnchor)
})
