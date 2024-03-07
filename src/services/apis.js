const BASE_URL = process.env.REACT_APP_BASE_URL

//these are the list of all the backend apis

export const UPLOAD_PROFILE_PIC_API = BASE_URL + "/upload";
export const SENDOTP_API = BASE_URL + "/sendotp"
export const SIGNUP_API = BASE_URL + "/signup"
export const LOGIN_API = BASE_URL + "/login"
export const RESETPASSTOKEN_API = BASE_URL + "/reset-password-token"
export const RESETPASSWORD_API = BASE_URL + "/reset-password"
export const GET_POSTS = BASE_URL + "/get-posts"