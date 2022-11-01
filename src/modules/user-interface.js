import { format } from 'date-fns'
import Storage from './storage'
import Project from './project'
import Task from './task'

// export default function userInterface() {
//   // Collapse
//   const collapseBtns = document.querySelectorAll('.collapse-btn')

//   collapseBtns.forEach(btn => {
//     btn.addEventListener('click', function () {
//       const content = this.parentElement.querySelector('.content')

//       if (content.style.maxHeight) {
//         this.classList.remove('active')
//         content.style.maxHeight = null
//         content.style.marginBottom = null
//       } else {
//         if (content.childNodes.length !== 0) {
//           this.classList.add('active')
//           content.style.maxHeight = content.scrollHeight + 'px'
//           content.style.marginBottom = '4px'
//         }
//       }
//     })
//   })


//   // Dropdown
//   const dropdownBtns = document.querySelectorAll('.drop-btn')

//   dropdownBtns.forEach(btn => {
//     btn.addEventListener('click', () => {
//       const dropdownContent = btn.parentElement.querySelector('.dropdown-content')
//       closeAllDropdownMenus(dropdownContent)
//       dropdownContent.classList.toggle('show')
//     })
//   })

//   // Close the dropdown menu if the user clicks outside of it
//   window.onclick = function (event) {
//     if (!event.target.matches('.drop-btn')) {
//       const dropdowns = document.getElementsByClassName('dropdown-content')
//       for (let i = 0; i < dropdowns.length; i++) {
//         const openDropdown = dropdowns[i]
//         if (openDropdown.classList.contains('show')) {
//           openDropdown.classList.remove('show')
//         }
//       }
//     }
//   }

//   function closeAllDropdownMenus(menuToExclude) {
//     const openDropdownMenus = document.querySelectorAll('.show')
//     openDropdownMenus.forEach(menu => {
//       if (menu !== menuToExclude)
//         menu.classList.remove('show')
//     })
//   }
// }

export default class userInterface {
  static loadHomePage() {

  }

  static createProject(name) {

  }

  // static createTask(name, description, priority, dueDate) {

  // }
}