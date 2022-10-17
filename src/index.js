const collapseBtns = document.querySelectorAll('.collapse-btn')

collapseBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const content = this.parentElement.querySelector('.content')

    if (content.style.maxHeight) {
      this.classList.remove('active')
      content.style.maxHeight = null
      content.style.marginBottom = null
    } else {
      if (content.childNodes.length !== 0) {
        this.classList.add('active')
        content.style.maxHeight = content.scrollHeight + 'px'
        content.style.marginBottom = '4px'
      }
    }
  })
})