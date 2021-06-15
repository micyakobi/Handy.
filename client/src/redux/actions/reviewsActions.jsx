import axios from 'axios';
import {
  reviewsURL,
  reviewByIdURL
} from '../../api/reviews';
import {
  showLoader,
  hideLoader,
  showErrorModal,
} from '../actions/appStatusActions';

export const reviewPost = (reviewTitle, reviewContent, rating, provider, client) => async (dispatch) => {
  dispatch(showLoader());
  if (reviewTitle && reviewContent && rating && provider && client) {
    try {
      const response = await axios.post(
        reviewsURL(),
        {
          reviewTitle,
          reviewContent,
          rating,
          provider,
          client
        }
      );
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
}
