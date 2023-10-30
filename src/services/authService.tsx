import axios from "axios";

const login_URL = "http://localhost:8080/api/auth/login";

const signIn = (email: string, password: string) => {
    return axios.post(login_URL, { email, password },
        )
        .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        });
}
export default {
    signIn
}