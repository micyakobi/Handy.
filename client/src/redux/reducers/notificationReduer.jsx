const initState = {
  mytNotification: []
}

const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_MY_NOTIFICATION":
      return {
        mytNotification: action.payload.mytNotification,
      };
    default:
      return state;
  }
}

export default notificationReducer;