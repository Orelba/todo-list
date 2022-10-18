// Collapse
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


// Dropdown
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const dropdownBtns = document.querySelectorAll('.drop-btn')

dropdownBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const dropdownContent = btn.parentElement.querySelector('.dropdown-content')
    dropdownContent.classList.toggle('show')
  })
})

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.drop-btn')) {
    const dropdowns = document.getElementsByClassName('dropdown-content')
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i]
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show')
      }
    }
  }
}