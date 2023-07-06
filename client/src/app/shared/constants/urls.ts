const BASE_URL = 'http://localhost:8000';

export const FOODS_URL = BASE_URL + '/api/foods';
export const FOODS_TAGS_URL = FOODS_URL + '/tags';
export const FOODS_BY_SEARCH_URL = FOODS_URL + '/search/';
export const FOODS_BY_TAG_URL = FOODS_URL + '/tag/';
export const FOOD_BY_ID_URL = FOODS_URL + '/';
export const CREATE_FOOD_URL = FOODS_URL + '/create';
export const UPDATE_FOOD_URL = FOODS_URL + '/update';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const UPDATE_USER_URL = BASE_URL + '/api/users/updateProfile';
export const UPDATE_USER_PASSWORD_URL = BASE_URL + '/api/users/updatePassword';
export const GET_ALL_USERS_URL = BASE_URL + '/api/users/all';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
export const ORDERS_FOR_CURRENT_USER_URL = ORDERS_URL + '/ordersForCurrentUser';

export const ORDER_PAY_URL = ORDERS_URL + '/pay';
export const ORDER_TRACK_URL = ORDERS_URL + '/track/';
