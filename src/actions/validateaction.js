import * as constants from "../constants/constants";

/**
 * Send message
 * @param data
 * @returns {{type, payload: *}}
 */
function validate(data) {
  return {
    type: constants.VALIDATE_CARD,
    payload: data
  };
}

/**
 * Request for broadcasting message
 * @param data
 * @returns {func}
 */
export const Validate = data => dispatch => {
  dispatch(validate(data));
};
