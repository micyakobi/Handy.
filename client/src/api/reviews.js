const base_url = "https://handy.cs.colman.ac.il:2222/reviews";

export const reviewsURL = () => `${base_url}/`;

export const searchedReviewsURL = (name) => `${base_url}/getReviewsByParams/${name}`;

// get - Get review by id
// delete - Delete review by id
// patch - Update review by id
export const reviewByIdURL = (id) => `${base_url}/${id}`;

export const reviewByProviderIdURL = (id) => `${base_url}/getReviewsByProviderId/${id}`;
