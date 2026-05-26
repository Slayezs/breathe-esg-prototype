import axios from 'axios'

const API = axios.create({
  baseURL: 'https://breathe-esg-prototype-2pf5.onrender.com/api'
})

export default API