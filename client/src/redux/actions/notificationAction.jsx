import axios from 'axios'
import {
  notificationURL,
  getNotificationsByUserIduRL,
  deleteNotificationURL
} from '../../api/notification';
import {
  showLoader,
  hideLoader,
  showErrorModal,
} from '../actions/appStatusActions';


export const notificationPost = (content, date, user) => async (dispatch) => {
  if (content && date && user) {
    try {
      const response = await axios.post(
        notificationURL(),
        {
          content,
          date,
          user,
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
};

export const deleteNotification = (id) => async (dispatch) => {
  dispatch(showLoader());
  try {
    const response = await axios.delete(deleteNotificationURL(id));
  } catch (e) {
    console.log(e);
  }
  dispatch(hideLoader());
};



export const loadNotification = (id) => async (dispatch) => {
  if (id) {
    try {
      const response = await axios.get(getNotificationsByUserIduRL(id));
      if (response.statusText === "OK") {
        dispatch({
          type: "FETCH_MY_NOTIFICATION",
          payload: {
            mytNotification: response.data,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};