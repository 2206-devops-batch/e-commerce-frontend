import axios from 'axios'

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://54.85.119.61:5000',
  headers: {
    crossDomain: true,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': 'http://54.85.119.61:5000',
  },
})

export interface eCommerceApiResponse {
  status: number
  payload: any
}

export default eCommerceClient
