import Validator from "../js/Validator";

test.each([
  ["valid card", "5555555555554444", true],
  ["valid card", "555555555555444", false],
])("it should be %s", (_, input, expected) => {
  expect(Validator.isValid(input)).toBe(expected);
});

test.each([
  ["return card type", "4916455059773953", "visa"],
  ["return card type", "5450185954334994", "mastercard"],
  ["return card type", "6011519832989647", "discover"],
  ["return card type", "2201382000000013", "mir"],
  ["return card type", "344407964080313", "american"],
  ["return card type", "38", null],
])("it should be %s", (_, input, expected) => {
  const validator = new Validator();
  expect(validator.paySystem(input)).toBe(expected);
});
