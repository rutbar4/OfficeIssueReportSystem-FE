import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const login = (username: string, password: string) => {
    return axios.post(API_URL + "signin", { username, password })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        });
}
export default {
    login
}