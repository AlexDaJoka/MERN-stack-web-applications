import axios from "axios";

export const getAllPostsLoader = async ({request, params}) => {
const res = await axios.get({
    baseURL: "http://localhost:8000/post",
    withCredentials: true,
  });
return res.data;
}