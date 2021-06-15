const base_url = "https://handy.cs.colman.ac.il:2222/categories";

export const categoriesURL = () => `${base_url}/`;

export const searchedCategoriesURL = (name) => `${base_url}/getcCategoriesByParams/${name}`;

// get - Get tasks by id
// delete - Delete tasks by id
// patch - Update tasks by id
export const categorieByIdURL = (id) => `${base_url}/${id}`;
