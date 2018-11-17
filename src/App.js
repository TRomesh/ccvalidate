import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";
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
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column computer={6} mobile={2} tablet={5} />
          <Grid.Column computer={4} mobile={12} tablet={6}>
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="dollar"
                  iconPosition="left"
                  placeholder="Payment amount"
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Name on Card"
                />
                <Form.Input
                  fluid
                  icon="credit card"
                  iconPosition="left"
                  placeholder="Card Number"
                />
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={8} mobile={8} tablet={8}>
                      <Form.Input
                        fluid
                        icon="calendar alternate"
                        iconPosition="left"
                        placeholder="Expiry date"
                      />
                    </Grid.Column>
                    <Grid.Column computer={8} mobile={8} tablet={8}>
                      <Form.Input
                        fluid
                        icon="key"
                        iconPosition="left"
                        placeholder="CVV"
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={4} mobile={4} tablet={4} />
                    <Grid.Column computer={6} mobile={6} tablet={6}>
                      <Button color="red" size="medium">
                        Cancel
                      </Button>
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={6} tablet={6}>
                      <Button color="green" size="medium">
                        Signup
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Form>
          </Grid.Column>
          <Grid.Column computer={6} mobile={2} tablet={5} />
        </Grid>
      </div>
    );
  }
}

export default App;
