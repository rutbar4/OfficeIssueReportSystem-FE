import axios from "axios";

const login_URL = "http://localhost:8080/login";

const signIn = (email: string, password: string) => {
    return axios.post(login_URL, { email, password },
        )
        .then((response) => {
            console.log(response);
                localStorage.setItem("user", JSON.stringify(response.data));
            return response.data;
        });
}
export default {
    signIn
}