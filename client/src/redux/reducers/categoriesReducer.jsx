const initState = {
    allCategories: [],
}

const categoriesReducer = (state = initState, action) => {
    switch (action.type) {

        case "FETCH_CATEGORIES":
            return {
                ...state,
                allCategories: action.payload.allCategories,
            };

        default:
            return state;
    }
}

export default categoriesReducer;