import axios from "axios";
const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    // headers: {'X-Custom-Header': 'foobar'}
  });

  export default instance;