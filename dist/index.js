/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/task.js":
/*!*****************************!*\
  !*** ./src/modules/task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Task)
/* harmony export */ });
class Task {
  constructor(title, description=null, priority, dueDate='No due date') {
    this.title = title
    this.description = description
    this.priority = priority
    this.dueDate = dueDate
    this.completed = false
  }

  setTitle(title) {
    this.title = title
  }

  getTitle() {
    return this.title
  }

  setDescription(description) {
    this.description = description
  }

  getDescription() {
    return this.description
  }

  setPriority(priorityLevel) {
    this.priority = priorityLevel
  }

  getPriority() {
    return this.priority
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate
  }

  getDueDate() {
    return this.dueDate
  }

  setCompletion(state) {
    this.completed = state
  }

  isCompleted() {
    return this.completed
  }

  getDateFormatted() {
    const year = this.dueDate.split('-')[0]
    const month = this.dueDate.split('-')[1]
    const day = this.dueDate.split('-')[2]
    return `${day}/${month}/${year}`
  }
}

/***/ }),

/***/ "./src/modules/user-interface.js":
/*!***************************************!*\
  !*** ./src/modules/user-interface.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ temporaryUI)
/* harmony export */ });

function temporaryUI () {
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
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_user_interface__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/user-interface */ "./src/modules/user-interface.js");
/* harmony import */ var _modules_task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/task */ "./src/modules/task.js");



document.addEventListener('DOMContentLoaded', _modules_user_interface__WEBPACK_IMPORTED_MODULE_0__["default"])

const someTask = new _modules_task__WEBPACK_IMPORTED_MODULE_1__["default"]('some title', 'yada yada', 'Low')
console.log(someTask)

const otherTask = new _modules_task__WEBPACK_IMPORTED_MODULE_1__["default"]('other task', 'some desc', 'Normal', '2022-10-03')
console.log(otherTask)
console.log(otherTask.getDateFormatted())
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxJQUFJLEdBQUcsTUFBTSxHQUFHLEtBQUs7QUFDbkM7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN2REE7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isc0JBQXNCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQzlDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05rRDtBQUNqQjtBQUNqQztBQUNBLDhDQUE4QywrREFBVztBQUN6RDtBQUNBLHFCQUFxQixxREFBSTtBQUN6QjtBQUNBO0FBQ0Esc0JBQXNCLHFEQUFJO0FBQzFCO0FBQ0EseUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvbW9kdWxlcy90YXNrLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2R1bGVzL3VzZXItaW50ZXJmYWNlLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBUYXNrIHtcclxuICBjb25zdHJ1Y3Rvcih0aXRsZSwgZGVzY3JpcHRpb249bnVsbCwgcHJpb3JpdHksIGR1ZURhdGU9J05vIGR1ZSBkYXRlJykge1xyXG4gICAgdGhpcy50aXRsZSA9IHRpdGxlXHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb25cclxuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eVxyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxyXG4gICAgdGhpcy5jb21wbGV0ZWQgPSBmYWxzZVxyXG4gIH1cclxuXHJcbiAgc2V0VGl0bGUodGl0bGUpIHtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZVxyXG4gIH1cclxuXHJcbiAgZ2V0VGl0bGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy50aXRsZVxyXG4gIH1cclxuXHJcbiAgc2V0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pIHtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvblxyXG4gIH1cclxuXHJcbiAgZ2V0RGVzY3JpcHRpb24oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvblxyXG4gIH1cclxuXHJcbiAgc2V0UHJpb3JpdHkocHJpb3JpdHlMZXZlbCkge1xyXG4gICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5TGV2ZWxcclxuICB9XHJcblxyXG4gIGdldFByaW9yaXR5KCkge1xyXG4gICAgcmV0dXJuIHRoaXMucHJpb3JpdHlcclxuICB9XHJcblxyXG4gIHNldER1ZURhdGUoZHVlRGF0ZSkge1xyXG4gICAgdGhpcy5kdWVEYXRlID0gZHVlRGF0ZVxyXG4gIH1cclxuXHJcbiAgZ2V0RHVlRGF0ZSgpIHtcclxuICAgIHJldHVybiB0aGlzLmR1ZURhdGVcclxuICB9XHJcblxyXG4gIHNldENvbXBsZXRpb24oc3RhdGUpIHtcclxuICAgIHRoaXMuY29tcGxldGVkID0gc3RhdGVcclxuICB9XHJcblxyXG4gIGlzQ29tcGxldGVkKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuY29tcGxldGVkXHJcbiAgfVxyXG5cclxuICBnZXREYXRlRm9ybWF0dGVkKCkge1xyXG4gICAgY29uc3QgeWVhciA9IHRoaXMuZHVlRGF0ZS5zcGxpdCgnLScpWzBdXHJcbiAgICBjb25zdCBtb250aCA9IHRoaXMuZHVlRGF0ZS5zcGxpdCgnLScpWzFdXHJcbiAgICBjb25zdCBkYXkgPSB0aGlzLmR1ZURhdGUuc3BsaXQoJy0nKVsyXVxyXG4gICAgcmV0dXJuIGAke2RheX0vJHttb250aH0vJHt5ZWFyfWBcclxuICB9XHJcbn0iLCJcclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdGVtcG9yYXJ5VUkgKCkge1xyXG4gIC8vIENvbGxhcHNlXHJcbiAgY29uc3QgY29sbGFwc2VCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNlLWJ0bicpXHJcblxyXG4gIGNvbGxhcHNlQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQnKVxyXG5cclxuICAgICAgaWYgKGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbFxyXG4gICAgICAgIGNvbnRlbnQuc3R5bGUubWFyZ2luQm90dG9tID0gbnVsbFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChjb250ZW50LmNoaWxkTm9kZXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IGNvbnRlbnQuc2Nyb2xsSGVpZ2h0ICsgJ3B4J1xyXG4gICAgICAgICAgY29udGVudC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnNHB4J1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9KVxyXG5cclxuXHJcbiAgLy8gRHJvcGRvd25cclxuICBjb25zdCBkcm9wZG93bkJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZHJvcC1idG4nKVxyXG5cclxuICBkcm9wZG93bkJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICBjb25zdCBkcm9wZG93bkNvbnRlbnQgPSBidG4ucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuZHJvcGRvd24tY29udGVudCcpXHJcbiAgICAgIGRyb3Bkb3duQ29udGVudC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93JylcclxuICAgIH0pXHJcbiAgfSlcclxuXHJcbiAgLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG1lbnUgaWYgdGhlIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXRcclxuICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgaWYgKCFldmVudC50YXJnZXQubWF0Y2hlcygnLmRyb3AtYnRuJykpIHtcclxuICAgICAgY29uc3QgZHJvcGRvd25zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZHJvcGRvd24tY29udGVudCcpXHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZHJvcGRvd25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3Qgb3BlbkRyb3Bkb3duID0gZHJvcGRvd25zW2ldXHJcbiAgICAgICAgaWYgKG9wZW5Ecm9wZG93bi5jbGFzc0xpc3QuY29udGFpbnMoJ3Nob3cnKSkge1xyXG4gICAgICAgICAgb3BlbkRyb3Bkb3duLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHRlbXBvcmFyeVVJIGZyb20gJy4vbW9kdWxlcy91c2VyLWludGVyZmFjZSdcclxuaW1wb3J0IFRhc2sgZnJvbSAnLi9tb2R1bGVzL3Rhc2snXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgdGVtcG9yYXJ5VUkpXHJcblxyXG5jb25zdCBzb21lVGFzayA9IG5ldyBUYXNrKCdzb21lIHRpdGxlJywgJ3lhZGEgeWFkYScsICdMb3cnKVxyXG5jb25zb2xlLmxvZyhzb21lVGFzaylcclxuXHJcbmNvbnN0IG90aGVyVGFzayA9IG5ldyBUYXNrKCdvdGhlciB0YXNrJywgJ3NvbWUgZGVzYycsICdOb3JtYWwnLCAnMjAyMi0xMC0wMycpXHJcbmNvbnNvbGUubG9nKG90aGVyVGFzaylcclxuY29uc29sZS5sb2cob3RoZXJUYXNrLmdldERhdGVGb3JtYXR0ZWQoKSkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=