import axios from "axios";

const base_URl = "https://cms-backend-jnsl.onrender.com/api/customer_factor/";

export default axios.create({
  baseURL: base_URl,
});
