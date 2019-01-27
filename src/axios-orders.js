import Axios from "axios";

const instance = Axios.create({
    baseURL:'https://react-burger-builder-33869.firebaseio.com'
})

export default instance;