const initState = {
    myOffers: []
}

const offersReducer = (state = initState, action) => {
    switch (action.type) {

            case "FETCH_MY_OFFERS":

                return {
                    ...state,
                    myOffers: action.payload.myOffers,
                };

        default:
            return state;
    }
}

export default offersReducer;