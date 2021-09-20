$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

class App {

  constructor() {
    this.theme = "dark"
    this.tab_count = 1
    this.deckArray = []
  }

  newTab() {
    this.tab_count++
    document.getElementById("tab-button-container").insertAdjacentHTML('beforeend', `<div id="button-${this.tab_count}" onclick="app.showTab(${this.tab_count})" class="tab-button btn flex-fill ml-2 btn-${app.theme} shadow-none">tab ${this.tab_count}</div>`)
    document.getElementById("tab-container").insertAdjacentHTML('beforeend', `<div id="tab-${this.tab_count}" class="tab d-none"><textarea id="field-${this.tab_count}" class="field bg-${app.theme}-3 outline-none p-2 fs-12 text-white h-100 w-100"></textarea></div>`)
  }

  showTab(number) {
    var tabs = document.getElementsByClassName("tab")
    Array.from(tabs).forEach((el) => {
      if (el.id == "tab-" + number) {
        el.classList.remove("d-none")
      } else {
        el.classList.add("d-none")
      }
    });
    var tabs = document.getElementsByClassName("tab-button")
    Array.from(tabs).forEach((el) => {
      if (el.id == "button-" + number) {
        el.classList.add("active")
      } else {
        el.classList.remove("active")
      }
    });
  }

  fetchSaves(target_element) {
    document.getElementById(target_element).innerHTML = ""
    pywebview.api.getSaves().then(function(response) {
      var current_saves = eval(response.message)
      for (var save of current_saves) {
        document.getElementById(target_element).innerHTML += `<option value="` + save.replace(".json", "") + `">` + save.replace(".json", "") + `</option>`
      }
    })
  }

  fetchSave(name) {
    var tabs = document.getElementsByClassName("tab-button")
    Array.from(tabs).forEach((el) => {
      el.remove()
    });
    var tabs = document.getElementsByClassName("field")
    Array.from(tabs).forEach((el) => {
      el.remove()
    });

    this.tab_count = 0
    pywebview.api.getSave(name).then(function(response) {
      var notes = eval(response.message)
      var tab_count = 0
      for (var part of notes) {
        tab_count++
        document.getElementById("tab-button-container").insertAdjacentHTML('beforeend', `<div id="button-${tab_count}" onclick="app.showTab(${tab_count})" class="tab-button btn flex-fill ml-2 btn-dark shadow-none">tab ${tab_count}</div>`)
        document.getElementById("tab-container").insertAdjacentHTML('beforeend', `<div id="tab-${tab_count}" class="tab d-none"><textarea id="field-${tab_count}" class="field bg-dark-3 outline-none p-2 fs-12 text-white h-100 w-100">${part}</textarea></div>`)
      }
    })
    this.tab_count = document.getElementById("tab-container").childElementCount + 1
  }

  deleteSave(name) {
    pywebview.api.deleteSave(name)
  }

  save(name) {
    var tabs = document.getElementsByClassName("field")
    Array.from(tabs).forEach((el) => {
      this.deckArray.push(el.value)
    });
    pywebview.api.export(name, this.deckArray)
    this.deckArray = [];
    document.getElementById("filename").value = ""
  }

  toggleTheme() {
    if (this.theme=="dark") {
      this.theme = "light"
      var darkElements = document.getElementsByClassName("bg-dark-2")
      Array.from(darkElements).forEach((el) => {
        el.classList.toggle("bg-dark-2")
        el.classList.toggle("bg-light-2")
      });
      var darkElements = document.getElementsByClassName("bg-dark-3")
      Array.from(darkElements).forEach((el) => {
        el.classList.toggle("bg-dark-3")
        el.classList.toggle("bg-light-3")
      });
      var darkElements = document.getElementsByClassName("text-white")
      Array.from(darkElements).forEach((el) => {
        el.classList.toggle("text-white")
        el.classList.toggle("text-dark")
      });
      var darkElements = document.getElementsByClassName("btn-dark")
      Array.from(darkElements).forEach((el) => {
        el.classList.toggle("btn-dark")
        el.classList.toggle("btn-light")
      });
    } else {
      this.theme = "dark"
      var lightElements = document.getElementsByClassName("bg-light-2")
      Array.from(lightElements).forEach((el) => {
        el.classList.toggle("bg-dark-2")
        el.classList.toggle("bg-light-2")
      });
      var lightElements = document.getElementsByClassName("bg-light-3")
      Array.from(lightElements).forEach((el) => {
        el.classList.toggle("bg-dark-3")
        el.classList.toggle("bg-light-3")
      });
      var darkElements = document.getElementsByClassName("text-dark")
      Array.from(darkElements).forEach((el) => {
        el.classList.toggle("text-white")
        el.classList.toggle("text-dark")
      });
      var darkElements = document.getElementsByClassName("btn-light")
      Array.from(darkElements).forEach((el) => {
        el.classList.toggle("btn-dark")
        el.classList.toggle("btn-light")
      });
    }
  }

}

let app = new App()