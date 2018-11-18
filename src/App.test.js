import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

it("Check luhn algorithm", () => {
  let val = "4916719850148545";
  let sum = 0;
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val.substr(i, 1));
    if (i % 2 == 0) {
      intVal *= 2;
      if (intVal > 9) {
        intVal = 1 + (intVal % 10);
      }
    }
    sum += intVal;
  }
  expect(sum % 10).toBe(0);
});

it("Check creditcard type", () => {
  let number = "5141602002249029";
  let card = "";
  const cc = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/
  };
  if (cc.electron.test(number)) {
    card = "electron";
  } else if (cc.maestro.test(number)) {
    card = "maestro";
  } else if (cc.unionpay.test(number)) {
    card = "unionpay";
  } else if (cc.visa.test(number)) {
    card = "visa";
  } else if (cc.mastercard.test(number)) {
    card = "mastercard";
  } else if (cc.amex.test(number)) {
    card = "amex";
  } else {
    card = "";
  }

  expect(card).toMatch("mastercard");
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
