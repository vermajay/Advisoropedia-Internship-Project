import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../redux/slices/authSlice"
import { setUser } from "../../redux/slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { LOGIN_API, RESETPASSTOKEN_API, RESETPASSWORD_API, SENDOTP_API, SIGNUP_API } from "../apis"

export function sendOtp(email, navigate){

    return async(dispatch) => {
        const toastId = toast.loading("Sending OTP...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", SENDOTP_API, {email} );
            console.log("SENDOTP API RESPONSE............", response)

            console.log(response.data.success)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP Sent Successfully")

            navigate("/verify-email")
        }
        catch(error){
            console.log("SENDOTP API ERROR............", error)
            toast.error(error?.response?.data?.message)
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function signUp(
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    image,
    otp,
    navigate
){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", SIGNUP_API, {
                username,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                image,
                otp
            })

            console.log("SIGNUP API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Signup Successful")

            navigate("/login")
        }
        catch(error){
            console.log("SIGNUP API ERROR............", error)
            toast.error(error?.response?.data?.message)
            navigate("/signup")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate){

    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password
            })

            console.log("LOGIN API RESPONSE............", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            console.log("JWT Token -> ", response?.data?.token)

            //set the token after login
            dispatch(setToken(response.data.token))

            dispatch(setUser(response.data.user))
            
            //set token and user in local storage
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))

            navigate("/posts")
        }
        catch(error){
            console.log("LOGIN API ERROR............", error)
            toast.error(error?.response?.data?.message)
            navigate("/")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}

export function getPasswordResetToken(email, setEmailSent){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", RESETPASSTOKEN_API, {email})

            console.log("RESET PASSWORD TOKEN API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Reset Email Sent")

            setEmailSent(true)
        }
        catch(error){
            console.log("RESET PASSWORD TOKEN API ERROR............", error)
            toast.error(error?.response?.data?.message)
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function resetPassword(token, password, confirmPassword, setEmailSent){
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))

        try{
            const response = await apiConnector("POST", RESETPASSWORD_API, {
                token, password, confirmPassword
            })

            console.log("RESET PASSWORD API RESPONSE............", response)

            if (!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("Password has been reset successfully")

            setEmailSent(true)
        }
        catch(error){
            console.log("RESET PASSWORD API ERROR............", error)
            toast.error(error?.response?.data?.message)
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}