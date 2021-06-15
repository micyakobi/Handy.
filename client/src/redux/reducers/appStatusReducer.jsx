const initState = {
  showLoader: false,
  errorModal: {
    showErrorModal: false,
    errorMessage: '',
  },
}

const appStatusReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return {
        ...state,
        showLoader: true,
      }
    case "HIDE_LOADER":
      return {
        ...state,
        showLoader: false,
      }
    case "SHOW_ERROR_MODAL":
      return {
        ...state,
        errorModal: {
          showErrorModal: true,
          errorMessage: action.payload.errorMessage,
        }
      }
    case "HIDE_ERROR_MODAL":
      return {
        ...state,
        errorModal: {
          showErrorModal: false,
          errorMessage: '',
        }
      }
    default:
      return state;
  }
}

export default appStatusReducer;