const collapseBtns = document.querySelectorAll('.collapse-btn')

collapseBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const content = this.parentElement.querySelector('.content')

    if (content.style.maxHeight) {
      content.style.maxHeight = null
      this.classList.remove("active")
    } else {
      if (content.childNodes.length !== 0) {
        content.style.maxHeight = content.scrollHeight + "px"
        this.classList.add("active")
      }
    }
  })
})