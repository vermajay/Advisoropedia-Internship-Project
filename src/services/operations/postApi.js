import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { GET_POSTS } from "../apis"

export async function getPosts(token, page, limit){
    let result = []
    const toastId = toast.loading("Fetching blogs...")

    const url = GET_POSTS + `?page=${page}&limit=${limit}`

    try {
        const response = await apiConnector("GET", url, null, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("GET_POSTS API RESPONSE............", response)
        if (!response?.data?.success) {
          throw new Error("Could Not Fetch BLOGS")
        }
        result = response?.data?.results

    } catch (error) {
        console.log("GET_POSTS API ERROR............", error)
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId)
    toast.success("Blogs fetched successfully")
    return result
}