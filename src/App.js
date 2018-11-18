import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Card,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

import "./App.css";

class App extends Component {
  state = {
    card: "",
    cvv: "",
    name: "",
    number: "",
    date: "",
    name_err: false,
    number_err: false,
    date_err: false,
    cvv_err: false
  };

  componentDidMount() {}

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  validateCardNumber = number => {
    this.setState({ card: this.detectCardType(number) });
    let regex = new RegExp("^[0-9]{16}$");
    if (this.detectCardType(number) === "amex") {
      regex = new RegExp("^[0-9]{15}$");
    }

    if (!regex.test(number)) return false;

    return this.luhnCheck(number);
  };

  luhnCheck = val => {
    let sum = 0;
    for (let i = 0; i < val.length; i++) {
      let intVal = parseInt(val.substr(i, 1));
      if (i % 2 === 0) {
        intVal *= 2;
        if (intVal > 9) {
          intVal = 1 + (intVal % 10);
        }
      }
      sum += intVal;
    }
    return sum % 10 === 0;
  };

  detectCardType = number => {
    const cc = {
      electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
      maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
      unionpay: /^(62|88)\d+$/,
      visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
      mastercard: /^5[1-5][0-9]{14}$/,
      amex: /^3[47][0-9]{13}$/
    };
    if (cc.electron.test(number)) {
      return "electron";
    } else if (cc.maestro.test(number)) {
      return "maestro";
    } else if (cc.unionpay.test(number)) {
      return "unionpay";
    } else if (cc.visa.test(number)) {
      return "visa";
    } else if (cc.mastercard.test(number)) {
      return "mastercard";
    } else if (cc.amex.test(number)) {
      return "amex";
    } else {
      return "";
    }
  };

  checkname = () => {
    this.setState({ name_err: this.state.name.length <= 0 });
  };

  checknumber = () => {
    this.setState({ number_err: !this.validateCardNumber(this.state.number) });
  };

  checkdate = () => {
    this.setState({ date_err: this.state.date.length !== 4 });
  };

  checkcvv = () => {
    this.setState({ cvv_err: this.state.cvv.length <= 2 });
  };

  checkstatus = () => {
    console.log(this.state.name_err === false);
  };

  isCVV = evt => {
    if (this.state.cvv.length > 2) {
      evt.preventDefault();
    }

    if (
      (evt.which !== 8 && evt.which !== 0 && evt.which < 48) ||
      (evt.which > 57 && this.state.cvv.length <= 2)
    ) {
      evt.preventDefault();
    }
  };

  isDate = evt => {
    if (this.state.date.length > 3) {
      evt.preventDefault();
    }

    if (
      (evt.which !== 8 && evt.which !== 0 && evt.which < 48) ||
      (evt.which > 57 && this.state.cvv.length <= 2)
    ) {
      evt.preventDefault();
    }
  };

  isNumber = evt => {
    if (
      (evt.which !== 8 && evt.which !== 0 && evt.which < 48) ||
      evt.which > 57
    ) {
      evt.preventDefault();
    }
  };

  Submit = () => {
    console.log("Submit");
  };

  render() {
    let { card, name_err, number_err, date_err, cvv_err } = this.state;
    const isEnabled = name_err || number_err || date_err || cvv_err;
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
                  icon="user"
                  name="name"
                  iconPosition="left"
                  placeholder="Name on Card"
                  error={name_err}
                  onBlur={this.checkname}
                  onChange={this.handleChange}
                />
                <Form.Input
                  fluid
                  icon="credit card"
                  name="number"
                  iconPosition="left"
                  placeholder="Card Number"
                  onChange={this.handleChange}
                  error={number_err}
                  onBlur={this.checknumber}
                  onKeyPress={this.isNumber}
                  type="number"
                />
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={8} mobile={8} tablet={8}>
                      <Form.Input
                        fluid
                        icon="calendar alternate"
                        name="date"
                        iconPosition="left"
                        placeholder="Expiry date"
                        error={date_err}
                        onChange={this.handleChange}
                        onKeyPress={this.isDate}
                        onBlur={this.checkdate}
                        type="number"
                      />
                    </Grid.Column>
                    <Grid.Column computer={8} mobile={8} tablet={8}>
                      <Form.Input
                        fluid
                        icon="key"
                        name="cvv"
                        iconPosition="left"
                        placeholder="CVV"
                        error={cvv_err}
                        onChange={this.handleChange}
                        onKeyPress={this.isCVV}
                        onBlur={this.checkcvv}
                        type="number"
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
                <Grid>
                  <Grid.Row>
                    <Grid.Column computer={4} mobile={4} tablet={4}>
                      {card ? <Card image={`assets/${card}.png`} /> : ""}
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={6} tablet={6}>
                      <Button color="red" size="medium">
                        Cancel
                      </Button>
                    </Grid.Column>
                    <Grid.Column computer={6} mobile={6} tablet={6}>
                      <Button
                        color="green"
                        size="medium"
                        disabled={isEnabled}
                        onClick={this.Submit}
                      >
                        Submit
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
