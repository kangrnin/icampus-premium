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

  // speed input slider
  const speedSetBox = await getWhenExists('div.vc-pctrl-playback-rate-setbox')
  speedSetBox.innerHTML = ''
  speedSetBox.style.cssText = `
    width: 200px;
    height: 22px;
    border: 0px;
    background: transparent;
    position: absolute;
    top: 12px;
    padding-right: 64px;
  `

  const speedButton = await getWhenExists('div.vc-pctrl-playback-rate-toggle-btn')
  const speedInput = document.createElement('input')
  speedInput.type = 'range'
  speedInput.value = '1.0'
  speedInput.min = '0.1'
  speedInput.max = '2.0'
  speedInput.step = '0.1'
  speedButton.onclick = (e) => {
    speedInput.value = speedButton.innerHTML.slice(2)
  }
  speedInput.oninput = (e) => {
    const speed = e.target.value
    speedButton.innerHTML = `x ${speed}`
    video.playbackRate = speed
  }

  speedSetBox.appendChild(speedInput)
})
