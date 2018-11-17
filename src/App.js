import React, { Component } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
function validateCardNumber(number) {
  let regex = new RegExp("^[0-9]{16}$");
  if (detectCardType1(number) == "AMEX") {
    regex = new RegExp("^[0-9]{15}$");
  }
  if (!regex.test(number)) return false;

  return luhnCheck(number);
}

function luhnCheck(val) {
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
  return sum % 10 == 0;
}

function detectCardType(number) {
  const cc = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/
  };
  if (cc.electron.test(number)) {
    return "ELECTRON";
  } else if (cc.maestro.test(number)) {
    return "MAESTRO";
  } else if (cc.unionpay.test(number)) {
    return "UNIONPAY";
  } else if (cc.visa.test(number)) {
    return "VISA";
  } else if (cc.mastercard.test(number)) {
    return "MASTERCARD";
  } else if (cc.amex.test(number)) {
    return "AMEX";
  } else {
    return undefined;
  }
}

function detectCardType1(number) {
  const cc = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/
  };
  for (var key in cc) {
    if (cc[key].test(number)) {
      return key;
    }
  }
}
class App extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Field>
            <label>First Name</label>
            <input placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Last Name</label>
            <input placeholder="Last Name" />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default App;
