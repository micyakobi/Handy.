const base_url = "https://handy.cs.colman.ac.il:2222/users";

export const usersURL = () => `${base_url}/`;

export const userByuserNameURL = (userName) =>
  `${base_url}/getuserName/${userName}`;

export const getUserById = (id) => `${base_url}/getUserById/${id}`;

export const userByEmailURL = (email) => `${base_url}/getUserByEmail/${email}`;

export const favoriteHandiesByIdURL = (id) =>
  `${base_url}/getFavoritesByClientId/${id}`;

export const getProvidersByCategoryId = (id) =>
  `${base_url}/getProvidersByCategoryId/${id}`;

export const addProviderToClientFavorites = (idclient, idProvider) =>
  `${base_url}/addProviderToClientFavorites/${idclient}/${idProvider}`;

export const deleteProviderFromClientFavoritesURL = (clientId, providerId) =>
  `${base_url}/deleteProviderFromClientFavorites/${clientId}/${providerId}`;

export const searchedProviders = (userName) =>
  `${base_url}/searchUser/${userName}`;

export const tasksByCategoryURL = (id) =>
  `${base_url}/getTasksByProviderIdCategories/${id}`;

export const findDistanceURL = (sourceLat, sourceLong, destLat, destLong) =>
  `${base_url}/findDistance/${sourceLat}/${sourceLong}/${destLat}/${destLong}`;

// get - get user by user id
// delete - delete user by user id
// patch - update user by user id
export const userByUserIdURL = (_id) => `${base_url}/${_id}`;
