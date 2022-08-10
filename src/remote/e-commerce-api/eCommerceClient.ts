import axios from 'axios'

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  // baseURL: 'http://ec2-54-83-92-30.compute-1.amazonaws.com',
  baseURL: 'http://af8e437071b9d4a8e94eced60a43d6b6-1814642247.us-east-1.elb.amazonaws.com:5000',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
})

export interface eCommerceApiResponse {
  status: number
  payload: any
}

export default eCommerceClient
