import axios from "axios";
import {
  tasksURL,
  taskByIdURL,
  myTasksURL,
  approveProviderURL,
} from "../../api/tasks";
import {
  showLoader,
  hideLoader,
  showErrorModal,
} from '../actions/appStatusActions';

export const loadAllTasks = () => async (dispatch) => {
  dispatch(showLoader());
  try {
    const response = await axios.get(tasksURL());
    const allTasksData = [...response.data].reverse();
    dispatch({
      type: "FETCH_TASKS",
      payload: {
        allTasks: allTasksData,
      },
    });
  } catch (err) {
    console.log(err);
  }
  dispatch(hideLoader());
};

export const taskPost =
  (
    taskTitle,
    taskDescription,
    taskDesiredPrice,
    categories,
    clientId,
    taskImageFile,
    clientFirstName,
    clientLastName,
    locationLat,
    locationLong
  ) =>
    async (dispatch) => {
      dispatch(showLoader());
      if (taskTitle &&
        taskDescription &&
        taskDesiredPrice &&
        categories &&
        clientId &&
        clientFirstName &&
        clientLastName &&
        locationLat &&
        locationLong) {
        try {
          let formData = new FormData();
          formData.append('taskTitle', taskTitle);
          formData.append('taskDescription', taskDescription);
          formData.append('taskDesiredPrice', taskDesiredPrice);
          formData.append('client', clientId);
          formData.append('locationLat', locationLat);
          formData.append('locationLong', locationLong);
          if (taskImageFile) {
            formData.append('taskImage', taskImageFile, `${clientFirstName}-${clientLastName}-task-image.jpg`);
          }

          const response = await axios.post(tasksURL(), formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.statusText === "OK") {
            const taskId = response.data._id;
            const response2 = await axios.patch(taskByIdURL(taskId), { categories });
          }
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(hideLoader());
    };

export const loadMyTasks = (id) => async (dispatch) => {
  dispatch(showLoader());
  if (id) {
    try {
      const myTasksData = await axios.get(myTasksURL(id));
      dispatch({
        type: "FETCH_MY_TASKS",
        payload: {
          myTasks: myTasksData.data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const loadTaskDetails = (id) => async (dispatch) => {
  dispatch(showLoader());
  if (id) {
    try {
      const taskDetailsData = await axios.get(taskByIdURL(id));
      dispatch({
        type: "FETCH_TASK",
        payload: {
          taskDetails: taskDetailsData,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const approveProvider = (taskId, offerId) => async (dispatch) => {
  if (taskId && offerId) {
    try {
      const response = await axios.patch(approveProviderURL(taskId, offerId));
    } catch (err) {
      console.log(err);
    }
  }
};

export const deleteTask = (taskId) => async (dispatch) => {
  dispatch(showLoader());
  if (taskId) {
    try {
      const response = await axios.delete(taskByIdURL(taskId));
    } catch (err) {
      console.log(err);
    }
  }
  dispatch(hideLoader());
};

export const editMapTime = (id, mapTime) => async (dispatch) => {
  if (id && mapTime) {
    try {
      const response = await axios.patch(taskByIdURL(id), { mapTime });
      if (response.data != undefined) {
        dispatch({
          type: "EDIT_TASK",
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

export const editMapReview = (id, mapReview) => async (dispatch) => {
  if (id && mapReview) {
    try {
      const response = await axios.patch(taskByIdURL(id), { mapReview });
      if (response.data != undefined) {
        dispatch({
          type: "EDIT_TASK",
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

export const editIsReviewed = (id, isReviewed) => async (dispatch) => {
  if (id && isReviewed) {
    try {
      const response = await axios.patch(taskByIdURL(id), { isReviewed });
      if (response.data != undefined) {
        dispatch({
          type: "EDIT_TASK",
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

export const editTask =
  (
    taskTitle,
    taskDescription,
    taskDesiredPrice,
    categories,
    clientId,
    taskImageFile,
    clientFirstName,
    clientLastName,
    id
  ) =>
    async (dispatch) => {
      dispatch(showLoader());
      if (id) {
        try {
          let formData = new FormData();
          formData.append('taskTitle', taskTitle);
          formData.append('taskDescription', taskDescription);
          formData.append('taskDesiredPrice', taskDesiredPrice);
          formData.append('client', clientId);
          if (taskImageFile) {
            formData.append('taskImage', taskImageFile, `${clientFirstName}-${clientLastName}-task-image.jpg`);
          }

          const response = await axios.patch(taskByIdURL(id), formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          if (response.statusText === "OK") {
            const taskId = response.data._id;
            const response2 = await axios.patch(taskByIdURL(id), { categories });
          }
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(hideLoader());
    };
