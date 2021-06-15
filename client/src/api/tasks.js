const base_url = "https://handy.cs.colman.ac.il:2222/tasks";

export const tasksURL = () => `${base_url}/`;

export const searchedTasksURL = (name) => `${base_url}/getTasksByParams/${name}`;

export const myTasksURL = (id) => `${base_url}/getTasksByClientId/${id}`;

export const approveProviderURL = (taskId, offerId) => `${base_url}/approveProvider/${taskId}/${offerId}`;

export const uploadTaskImageURL = () => `${base_url}/`;

// get - Get tasks by id
// delete - Delete tasks by id
// patch - Update tasks by id
export const taskByIdURL = (id) => `${base_url}/${id}`;
