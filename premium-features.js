function initFeatures() {
  const speedSetBox = document.getElementsByClassName('vc-pctrl-playback-rate-setbox')[0]
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

  const speedButton = document.getElementsByClassName('vc-pctrl-playback-rate-toggle-btn')[0]
  const speedInput = document.createElement('input')
  speedInput.type = 'range'
  speedInput.value = '1.0'
  speedInput.min = '0.1'
  speedInput.max = '2.0'
  speedInput.step = '0.1'
  speedInput.oninput = (e) => {
    const speed = e.target.value
    speedButton.innerHTML = `x ${speed}`
    uniPlayer.setPlaybackRate(speed)
    contentPlayer.changePlaybackRate(speed)
  }
  speedButton.onclick = (e) => {
    speedInput.value = speedButton.innerHTML.slice(2)
  }
  speedSetBox.appendChild(speedInput)
}

if (document.readyState !== "loading") {
  initFeatures()
} else {
  document.addEventListener("DOMContentLoaded", initFeatures)
}
