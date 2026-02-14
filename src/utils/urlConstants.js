export const LOGO_URL = "https://img.freepik.com/premium-vector/food-logo-with-smile-spoon-fork-delicious-food-design-illustration-tongue-saliva_207371-61.jpg?semt=ais_hybrid&w=740&q=80";

// Restaurant List API
export const RESTAURANT_LIST_API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9046136&lng=77.614948&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

export const REACT_FOODFIRE_APP_BASE_URL =
  process.env.REACT_FOODFIRE_APP_BASE_URL || "https://foodfire.onrender.com/api/";

export const FOODFIRE_MENU_API_URL = `${REACT_FOODFIRE_APP_BASE_URL}menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&submitAction=ENTER&restaurantId=`;

// Cloudinary Image CDN
export const IMAGE_CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/";

// Backward-compatible alias
export const CDN_URL = IMAGE_CDN_URL;

// Placeholder image (fallback)
export const PLACEHOLDER_IMAGE_URL =
  "https://via.placeholder.com/300x200?text=Image+Not+Available";
