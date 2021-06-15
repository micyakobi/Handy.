import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import tasksReducer from './tasksReducer';
import offersReducer from './offersReducer';
import categoriesReducer from './categoriesReducer';
import reviewsReducer from './reviewsReducer';
import appStatusReducer from './appStatusReducer';
import notificationReducer from './notificationReduer';


const rootReducer = combineReducers({
  user: usersReducer,
  reviews: reviewsReducer,
  tasks: tasksReducer,
  offers: offersReducer,
  notification:notificationReducer,
  categories: categoriesReducer,
  appStatus: appStatusReducer,
});

export default rootReducer;