import axios from 'axios';
import {
  offersURL,
  offerByIdURL,
  myOffersURL
} from '../../api/offers';
import {
  showLoader,
  hideLoader,
  showErrorModal,
} from '../actions/appStatusActions';

export const offerPost = (offerTitle, description, priceByid, provider, task, locationLat, locationLong) => async (dispatch) => {
  dispatch(showLoader());
  if (offerTitle && description && priceByid && provider && task && locationLat && locationLong) {
    try {
      const response = await axios.post(
        offersURL(),
        {
          offerTitle,
          description,
          priceByid,
          provider,
          task,
          locationLat,
          locationLong
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const loadMyOffers = (id) => async (dispatch) => {
  dispatch(showLoader());
  if (id) {
    try {
      const myOffersData = await axios.get(myOffersURL(id));
      dispatch({
        type: "FETCH_MY_OFFERS",
        payload: {
          myOffers: myOffersData.data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

