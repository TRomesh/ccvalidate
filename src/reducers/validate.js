import * as constants from "../constants/constants";

const initialState = {
  isValidate: false
};

const validate = (state = initialState, action) => {
  switch (action.type) {
    case constants.VALIDATE_CARD:
      return Object.assign({}, state, { isValidate: true });
    default:
      return state;
  }
};

export default validate;
