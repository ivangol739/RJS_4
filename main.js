/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/Validator.js
class Validator {
  constructor() {
    this.cards = [{
      start: "4",
      type: "visa"
    }, {
      start: "51",
      type: "mastercard"
    }, {
      start: "52",
      type: "mastercard"
    }, {
      start: "53",
      type: "mastercard"
    }, {
      start: "54",
      type: "mastercard"
    }, {
      start: "55",
      type: "mastercard"
    }, {
      start: "222100",
      type: "mastercard"
    }, {
      start: "272099",
      type: "mastercard"
    }, {
      start: "34",
      type: "american"
    }, {
      start: "37",
      type: "american"
    }, {
      start: "2",
      type: "mir"
    }, {
      start: "6011",
      type: "discover"
    }, {
      start: "622126",
      type: "discover"
    }, {
      start: "622925",
      type: "discover"
    }, {
      start: "644",
      type: "discover"
    }, {
      start: "645",
      type: "discover"
    }, {
      start: "646",
      type: "discover"
    }, {
      start: "647",
      type: "discover"
    }, {
      start: "648",
      type: "discover"
    }, {
      start: "649",
      type: "discover"
    }, {
      start: "65",
      type: "discover"
    }];
  }
  paySystem(value) {
    let result = null;
    this.cards.forEach(item => {
      if (value.startsWith(item.start)) {
        result = item.type;
      }
    });
    return result;
  }
  static isValid(value) {
    const internalValue = value.replace(/\D/g, "");
    let nCheck = 0;
    let bEven = false;
    for (let n = internalValue.length - 1; n >= 0; n--) {
      let nDigit = parseInt(value.charAt(n), 10);
      if (bEven && (nDigit *= 2) > 9) {
        nDigit -= 9;
      }
      nCheck += nDigit;
      bEven = !bEven;
    }
    return nCheck % 10 === 0;
  }
}
;// CONCATENATED MODULE: ./src/js/Widget.js

class Widget {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.validator = new Validator();
    this.cardList = null;
    this.showRes = null;
  }
  static get markup() {
    return `
      <div class="card-validator">
        <ul class="cards list">
          <li><span class="card visa" title="Visa">Visa</span></li>
          <li><span class="card mastercard" title="Mastercard">Mastercard</span></li>
          <li><span class="card american" title="American">American</span></li>
          <li><span class="card mir" title="Mir">Mir</span></li>
          <li><span class="card discover" title="Discover">Discover</span></li>
        </ul>
        <form class="form-inline" novalidate="novalidate">
          <div class="form-group">
            <input class="form-control" name="card_number" type="text" placeholder="Enter card number" data-original-title="" title="">
            <a class="btn btn-success">Click to Validate</a>
          </div>
        </form>
        <div class="validation-result_container">
          <span class="validation-result"></span>
        </div>
    </div>
    `;
  }
  static get submitSelector() {
    return ".btn";
  }
  static get inputSelector() {
    return ".form-control";
  }
  bindToDOM() {
    this.parentEl.innerHTML = Widget.markup;
    this.showRes = this.parentEl.querySelector(".validation-result");
    this.cardList = Array.from(this.parentEl.querySelectorAll(".card"));
    const submit = this.parentEl.querySelector(Widget.submitSelector);
    const input = this.parentEl.querySelector(Widget.inputSelector);
    submit.addEventListener("click", e => this.onSubmit(e));
    input.addEventListener("input", e => this.onInput(e));
  }
  clearForm() {
    this.showRes.classList.remove("invalid", "valid");
    this.showRes.textContent = "";
    this.cardList.forEach(item => {
      item.classList.remove("cdisabled");
    });
  }
  onInput(e) {
    e.preventDefault();
    this.clearForm();
    const inputEl = this.parentEl.querySelector(Widget.inputSelector);
    const validatorValue = this.validator.paySystem(inputEl.value);
    if (validatorValue !== null) {
      this.cardList.forEach(item => {
        if (!item.classList.contains(validatorValue)) {
          item.classList.add("cdisabled");
        }
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const v = this.parentEl.querySelector(Widget.inputSelector);
    if (Validator.isValid(v.value)) {
      this.showRes.classList.add("valid");
      this.showRes.textContent = "Valid";
    } else {
      this.showRes.classList.add("invalid");
      this.showRes.textContent = "Invalid";
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

const app_form = new Widget(document.querySelector(".container"));
app_form.bindToDOM();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;