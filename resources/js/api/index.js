import axios from "axios";

const baseURL = `http://localhost:8000`;

const Api = axios.create({
    baseURL,
});

export default Api;
