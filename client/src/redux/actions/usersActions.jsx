import axios from "axios";
import {
  usersURL,
  userByEmailURL,
  userByUserIdURL,
  findDistanceURL,
  addProviderToClientFavorites,
  deleteProviderFromClientFavoritesURL,
  tasksByCategoryURL,
} from "../../api/users";
import {
  showLoader,
  hideLoader,
  showErrorModal,
} from '../actions/appStatusActions';

export const signIn = (email, password, history, enqueueSnackbar) => async (dispatch) => {
  dispatch(showLoader());
  if (email && password) {
    try {
      const user = await axios.get(userByEmailURL(email));
      if (user.data.length && password === user.data[0].password) {
        dispatch({
          type: "SIGN_IN",
          payload: {
            isLogged: true,
            user: user.data[0],
            userCategories: user.data[0].categories,
          },
        });
        history.push("/home");
      } else {
        dispatch({
          type: "ERROR_SIGN_IN",
        });
        enqueueSnackbar('Login failed');

      }
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const signUp =
  (
    firstName,
    lastName,
    userName,
    password,
    phone,
    email,
    about,
    isClient,
    isProvider,
    categories,
    history,
    profileImageFile,
    localCategories
  ) =>
    async (dispatch) => {
      if (firstName &&
        lastName &&
        userName &&
        password &&
        phone &&
        email) {
        try {
          let formData = new FormData();
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('userName', userName);
          formData.append('password', password);
          formData.append('phone', phone);
          formData.append('email', email);
          formData.append('about', about);
          formData.append('isClient', isClient);
          formData.append('isProvider', isProvider);
          if (profileImageFile) {
            formData.append('profileImage', profileImageFile, `${firstName}-${lastName}-profile-image.jpg`);
          }

          const response = await axios.post(usersURL(), formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.statusText === "OK") {
            const userId = response.data._id;
            const response2 = await axios.patch(userByUserIdURL(userId), { categories });

            if (response2.statusText === "OK") {
              dispatch({
                type: "SIGN_IN",
                payload: {
                  isLogged: true,
                  user: response.data,
                  userCategories: localCategories,
                },
              });
              history.push("/home");
            } else {
              dispatch({
                type: "ERROR_SIGN_IN",
              });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
    };

export const signOut = () => async (dispatch) => {
  dispatch({
    type: "SIGN_OUT",
    payload: {
      isLogged: false,
      user: {},
    },
  });
};

export const loadUser = (id) => async (dispatch) => {
  if (id) {
    try {
      const response = await axios.patch(userByUserIdURL(id));
      if (response.data != undefined) {
        dispatch({
          type: "EDIT_PROFILE",
          payload: {
            user: response.data,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export const editProfile =
  (
    id,
    firstName,
    lastName,
    userName,
    phone,
    email,
    password,
    about,
    isClient,
    isProvider,
    profileImageFile,
    categories,
    localCategories
  ) =>
    async (dispatch) => {
      dispatch(showLoader());
      if (id && localCategories) {
        try {
          let formData = new FormData();
          if (profileImageFile) {
            formData.append('profileImage', profileImageFile, `${firstName}-${lastName}-profile-image.jpg`);
          }
          formData.append('firstName', firstName);
          formData.append('lastName', lastName);
          formData.append('userName', userName);
          formData.append('phone', phone);
          formData.append('email', email);
          formData.append('password', password);
          formData.append('about', about);
          formData.append('isClient', isClient);
          formData.append('isProvider', isProvider);

          const response = await axios.patch(userByUserIdURL(id), formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.statusText === "OK") {
            const userId = response.data._id;
            const response2 = await axios.patch(userByUserIdURL(userId), { categories });
            if (response2.statusText === "OK") {
              dispatch({
                type: "EDIT_PROFILE",
                payload: {
                  user: response.data,
                },
              });
              dispatch({
                type: "EDIT_CATEGORIES",
                payload: {
                  userCategories: localCategories,
                },
              });
            }
          }
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(hideLoader());
    };

export const editLatLng =
  (id, locationLat, locationLong) => async (dispatch) => {
    if (id && locationLat && locationLong) {
      try {
        const response = await axios.patch(userByUserIdURL(id), {
          locationLat,
          locationLong,
        });
        if (response.data != undefined) {
          dispatch({
            type: "EDIT_PROFILE",
            payload: {
              user: response.data,
            },
          });
        }
      } catch (err) {
          console.log(err);
      }
    }
  };

export const loadAllUsers = () => async (dispatch) => {
  dispatch(showLoader());
  try {
    const response = await axios.get(usersURL());
    const allUsersData = [...response.data].reverse();
    dispatch({
      type: "FETCH_USERS",
      payload: {
        allUsers: allUsersData,
      },
    });
  } catch (err) {
    console.log(err);
  }
  dispatch(hideLoader());
};

export const loadUserDetails = (id) => async (dispatch) => {
  dispatch(showLoader());
  if (id) {
    try {
      const userDetailsData = await axios.get(userByUserIdURL(id));
      dispatch({
        type: "FETCH_USER",
        payload: {
          userDetails: userDetailsData,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const AddProviderFav = (idClient, idProvider) => async (dispatch) => {
  dispatch(showLoader());
  if (idClient && idProvider) {
    try {
      const response = await axios.patch(
        addProviderToClientFavorites(idClient, idProvider),
        {}
      );
      if (response.data != undefined) {
        dispatch({
          type: "ADD_PROVIDER_FAV",
          payload: {
            favorites: response.data.favorites,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const DeleteProviderFav = (clientId, providerId) => async (dispatch) => {
  dispatch(showLoader());
  if (clientId && providerId) {
    try {
      const response = await axios.patch(
        deleteProviderFromClientFavoritesURL(clientId, providerId),
        {}
      );
      if (response.data != undefined) {
        dispatch({
          type: "DELETE_PROVIDER_FAV",
          payload: {
            favorites: response.data.favorites,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const loadTasksByProviderIdCategories = (id) => async (dispatch) => {
  dispatch(showLoader());
  if (id) {
    try {
      const tasksByCategoryData = await axios.get(tasksByCategoryURL(id));
      dispatch({
        type: "FETCH_CAT_TASKS",
        payload: {
          tasksByCategory: tasksByCategoryData.data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const findDistance =
  (sourceLat, sourceLong, destLat, destLong) => async (dispatch) => {
    if (sourceLat && sourceLong && destLat && destLong) {
      try {
        const findDistanceData = await axios.get(
          findDistanceURL(sourceLat, sourceLong, destLat, destLong)
        );
        dispatch({
          type: "FETCH_DISTANCE",
          payload: {
            findDistance: findDistanceData.data,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
