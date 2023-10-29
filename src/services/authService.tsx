import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/login";

const signIn = (username: string, password: string) => {
    return axios.post(API_URL, { username, password },
        )
        .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        });
}
export default {
    signIn
}