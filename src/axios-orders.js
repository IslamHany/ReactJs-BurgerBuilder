import axios from 'axios';
const instance = axios.create({
   baseURL: "firebaseUrl" 
});
export default instance;