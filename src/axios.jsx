import axios from "axios";
const API=axios.create({
    baseURL:"http://localhost:8080"
});
API.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  // export const getImage = (name) => {
  //   return API.get(`/pro-model/fileSystem/${name}`);
  // };

  export const saleReport=()=>{
    return API.get("/sale-detail/get/sale/report");
  }

  export const getCustomer=()=>{
    return API.get('/customer/find/all');
  }
export default API