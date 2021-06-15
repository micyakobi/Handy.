const initState = {
  isLogged: false,
  user: {},
  allUsers: [],
  userDetails: [],
  tasksByCategory: [],
  findDistance: [],
  userCategories: [],
}

const usersReducer = (state = initState, action) => {
  switch (action.type) {

    case "SIGN_IN":
      return {
        isLogged: true,
        user: action.payload.user,
        userCategories: action.payload.userCategories,
      };
    case "ERROR_SIGN_IN":
      return {
        isLogged: false,
        user: {},
      };
    case "SIGN_OUT":
      return {
        isLogged: false,
        user: {},
      };
    case "FETCH_USERS":
      return {
        ...state,
        allUsers: action.payload.allUsers,
      };
    case "FETCH_USER":
      return {
        ...state,
        userDetails: action.payload.userDetails,
      };
    case "ADD_PROVIDER_FAV":
      return {
        ...state,
        user: {
          ...state.user,
          favorites: action.payload.favorites,
        }
      };
    case "DELETE_PROVIDER_FAV":
      return {
        ...state,
        user: {
          ...state.user,
          favorites: action.payload.favorites,
        }
      };
    case "FETCH_CAT_TASKS":
      return {
        ...state,
        tasksByCategory: action.payload.tasksByCategory,
      };
    case "EDIT_PROFILE":
      return {
        ...state,
        user: action.payload.user,
      };
    case "EDIT_CATEGORIES":
      console.log(action.payload.userCategories);
      return {
        ...state,
        userCategories: action.payload.userCategories,
      };
    case "FETCH_DISTANCE":
      return {
        ...state,
        findDistance: action.payload.findDistance,
      };
    default:
      return state;
  }
}

export default usersReducer;