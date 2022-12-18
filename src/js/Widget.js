import Validator from "./Validator";

export default class Widget {
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
    submit.addEventListener("click", (e) => this.onSubmit(e));
    input.addEventListener("input", (e) => this.onInput(e));
  }

  clearForm() {
    this.showRes.classList.remove("invalid", "valid");
    this.showRes.textContent = "";
    this.cardList.forEach((item) => {
      item.classList.remove("cdisabled");
    });
  }

  onInput(e) {
    e.preventDefault();
    this.clearForm();
    const inputEl = this.parentEl.querySelector(Widget.inputSelector);
    const validatorValue = this.validator.paySystem(inputEl.value);
    if (validatorValue !== null) {
      this.cardList.forEach((item) => {
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
