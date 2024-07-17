import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://planner-ejpl.onrender.com',
})
