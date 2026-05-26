import axios from 'axios'
// latest deployment fix
const API = axios.create({
  baseURL: 'https://breathe-esg-prototype-2pf5.onrender.com/api'
})

export default API