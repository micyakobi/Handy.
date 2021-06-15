const initState = {
    allTasks: [],
    myTasks: [],
    taskDetails:[]
}

const tasksReducer = (state = initState, action) => {
    switch (action.type) {

        case "FETCH_TASKS":
            return {
                ...state,
                allTasks: action.payload.allTasks,
            };
        case "FETCH_MY_TASKS":
            return {
                ...state,
                myTasks: action.payload.myTasks,
            }
        case "FETCH_TASK":
            return {
                ...state,
                taskDetails: action.payload.taskDetails,
            };

        default:
            return state;
    }
}

export default tasksReducer;