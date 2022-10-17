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
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQyxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNvbGxhcHNlQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2xsYXBzZS1idG4nKVxyXG5cclxuY29sbGFwc2VCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5wYXJlbnRFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50JylcclxuXHJcbiAgICBpZiAoY29udGVudC5zdHlsZS5tYXhIZWlnaHQpIHtcclxuICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGxcclxuICAgICAgY29udGVudC5zdHlsZS5tYXJnaW5Cb3R0b20gPSBudWxsXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY29udGVudC5jaGlsZE5vZGVzLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgIGNvbnRlbnQuc3R5bGUubWFyZ2luQm90dG9tID0gJzRweCdcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn0pIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9