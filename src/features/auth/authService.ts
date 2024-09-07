import axios from "axios";
import { User } from "./authTypes";

async function checkAuth(credentials: User) {
    const response = await axios.get<User>('http://localhost:5000/checkAuth', {params: credentials});
    return response.data;
}

export {checkAuth}