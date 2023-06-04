import axios from "axios";

export const APIURL = "https://api.openai.com/v1/chat/completions"

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

// 로그인이 안되어있는 경우에 사용하는 API(토큰이 없는경우 요청)
export const API = axios.create({
    baseURL: `${APIURL}`,
    headers: {
        'Authorization': `Bearer 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`,
        'Content-Type': 'application/json',
      },
});


// 로그인이 되어있는 경우 사용하는 API(토큰이 있는경우 요청)

export const LogAPI = axios.create({
    baseURL: `http://${APIURL}:8080`,
    headers:{
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem('token') === null ? sessionStorage.getItem("token") : localStorage.getItem('token')}`
        //`${localStorage.getItem('token') === null ? sessionStorage.getItem("token") : localStorage.getItem('token')}`
    },
});