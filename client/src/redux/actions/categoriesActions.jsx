import axios from 'axios';
import {
  categoriesURL,
} from '../../api/categories';
import {
  showLoader,
  hideLoader,
  showErrorModal,
} from '../actions/appStatusActions';

export const loadAllCategories = () => async (dispatch) => {
  dispatch(showLoader());
  try {
    const response = await axios.get(categoriesURL());
    const allCategoriesData = [...response.data].reverse();
    dispatch({
      type: "FETCH_CATEGORIES",
      payload: {
        allCategories: allCategoriesData,
      },
    });
  } catch (err) {
    console.log(err);
  }
  dispatch(hideLoader());
};
