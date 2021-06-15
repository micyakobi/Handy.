export const showLoader = () => (dispatch) => {
    dispatch({
      type: "SHOW_LOADER",
    });
  }
  
  export const hideLoader = () => (dispatch) => {
    dispatch({
      type: "HIDE_LOADER",
    });
  }
  
  export const showErrorModal = (errorMessage) => (dispatch) => {
    dispatch({
      type: "SHOW_ERROR_MODAL",
      payload: {
        errorMessage: errorMessage,
      }
    });
  }
  
  export const hideErrorModal = () => (dispatch) => {
    dispatch({
      type: "HIDE_ERROR_MODAL",
    });
  }