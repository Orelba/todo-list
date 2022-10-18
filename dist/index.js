/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixzQkFBc0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBjb2xsYXBzZUJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2UtYnRuJylcclxuXHJcbmNvbGxhcHNlQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgY29udGVudCA9IHRoaXMucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudCcpXHJcblxyXG4gICAgaWYgKGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0KSB7XHJcbiAgICAgIHRoaXMuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICAgY29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBudWxsXHJcbiAgICAgIGNvbnRlbnQuc3R5bGUubWFyZ2luQm90dG9tID0gbnVsbFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGNvbnRlbnQuY2hpbGROb2Rlcy5sZW5ndGggIT09IDApIHtcclxuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgY29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBjb250ZW50LnNjcm9sbEhlaWdodCArICdweCdcclxuICAgICAgICBjb250ZW50LnN0eWxlLm1hcmdpbkJvdHRvbSA9ICc0cHgnXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG59KVxyXG5cclxuLyogV2hlbiB0aGUgdXNlciBjbGlja3Mgb24gdGhlIGJ1dHRvbixcclxudG9nZ2xlIGJldHdlZW4gaGlkaW5nIGFuZCBzaG93aW5nIHRoZSBkcm9wZG93biBjb250ZW50ICovXHJcbmNvbnN0IGRyb3Bkb3duQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kcm9wLWJ0bicpXHJcblxyXG5kcm9wZG93bkJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgIGNvbnN0IGRyb3Bkb3duQ29udGVudCA9IGJ0bi5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1jb250ZW50JylcclxuICAgIGRyb3Bkb3duQ29udGVudC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93JylcclxuICB9KVxyXG59KVxyXG5cclxuLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcclxud2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICBpZiAoIWV2ZW50LnRhcmdldC5tYXRjaGVzKCcuZHJvcC1idG4nKSkge1xyXG4gICAgY29uc3QgZHJvcGRvd25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZHJvcGRvd24tY29udGVudCcpXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRyb3Bkb3ducy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBvcGVuRHJvcGRvd24gPSBkcm9wZG93bnNbaV1cclxuICAgICAgaWYgKG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgIG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QucmVtb3ZlKCdzaG93JylcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==