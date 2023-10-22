import axios from "axios";

const headers = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS", 'Access-Control-Allow-Headers':"*" };
export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api/v1/",
    responseType: "json",
    headers: headers,
});
