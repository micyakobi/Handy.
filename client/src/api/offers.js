const base_url = "https://handy.cs.colman.ac.il:2222/offers";

export const offersURL = () => `${base_url}/`;

export const searchedOffersURL = (name) => `${base_url}/getOffersByParams/${name}`;

export const myOffersURL = (id) => `${base_url}/getOffersByProviderId/${id}`;

// get - Get tasks by id
// delete - Delete tasks by id
// patch - Update tasks by id
export const offerByIdURL = (id) => `${base_url}/${id}`;
