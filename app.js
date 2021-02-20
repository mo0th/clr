;(() => {
  const FORMATS = [
    {
      name: 'css',
      before: '',
      after: '',
      placeholder: '<color>',
      toCSS: str => str,
    },
    {
      name: 'hex',
      before: '#',
      after: '',
      placeholder: 'ff00ff',
      toCSS: str => (str[0] === '#' ? str : '#' + str),
    },
    {
      name: 'rgb',
      before: '(',
      after: ')',
      placeholder: '256, 0, 256',
      toCSS: str => (str.startsWith('rgb') ? str : `rgb(${str})`),
    },
    {
      name: 'hsl',
      before: '(',
      after: ')',
      placeholder: '300, 100, 50',
      toCSS: str => (str.startsWith('hsl') ? str : `rgb(${str})`),
    },
  ]

  const controlled = document.querySelector('.clr-controlled')
  const btn = document.getElementById('btn-format')
  const before = document.getElementById('format-before')
  const input = document.getElementById('input')
  const after = document.getElementById('format-after')

  let format = FORMATS[0]

  function renderControls() {
    const hash = window.location.hash
    const selectedFormat = hash ? hash.substr(1) : 'css'
    let idx = FORMATS.findIndex(f => f.name === selectedFormat)
    if (idx === -1) idx = 0

    format = FORMATS[idx]
    const nextFormatName = FORMATS[(idx + 1) % FORMATS.length].name

    btn.innerText = format.name
    btn.setAttribute('href', '#' + nextFormatName)
    before.innerText = format.before
    after.innerText = format.after
    input.placeholder = format.placeholder
    input.value = ''
  }

  renderControls()
  window.addEventListener('hashchange', renderControls)
  input.addEventListener('input', () => {
    if (input.value)
      controlled.style.backgroundColor = format.toCSS(input.value)
  })

  // Random initial bg
  controlled.style.backgroundColor = `hsl(${Math.random() * 255}, 50%, 50%)`
})()
