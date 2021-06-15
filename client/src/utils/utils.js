import axios from "axios";
import {
  showLoader,
  hideLoader,
  showErrorModal,
} from '../redux/actions/appStatusActions';

export const sendGetRequestById = (url, setState) => async (dispatch) => {
  dispatch(showLoader());
  try {
    const resp = await axios.get(url);
    setState(resp.data);
  } catch (err) {
    console.error(err);
  }
  dispatch(hideLoader());
};
