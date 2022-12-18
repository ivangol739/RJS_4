export default class Validator {
  constructor() {
    this.cards = [
      { start: "4", type: "visa" },
      { start: "51", type: "mastercard" },
      { start: "52", type: "mastercard" },
      { start: "53", type: "mastercard" },
      { start: "54", type: "mastercard" },
      { start: "55", type: "mastercard" },
      { start: "222100", type: "mastercard" },
      { start: "272099", type: "mastercard" },
      { start: "34", type: "american" },
      { start: "37", type: "american" },
      { start: "2", type: "mir" },
      { start: "6011", type: "discover" },
      { start: "622126", type: "discover" },
      { start: "622925", type: "discover" },
      { start: "644", type: "discover" },
      { start: "645", type: "discover" },
      { start: "646", type: "discover" },
      { start: "647", type: "discover" },
      { start: "648", type: "discover" },
      { start: "649", type: "discover" },
      { start: "65", type: "discover" },
    ];
  }

  paySystem(value) {
    let result = null;
    this.cards.forEach((item) => {
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
