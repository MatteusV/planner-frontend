import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://planner-backend-glxj.onrender.com',
})
