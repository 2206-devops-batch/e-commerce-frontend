import axios from 'axios'

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  // baseURL: 'http://ec2-54-83-92-30.compute-1.amazonaws.com',
  baseURL: 'http://adebcf51e12fe4acc9f4deac43840e35-1727142081.us-east-1.elb.amazonaws.com:5000',
  headers: {
    'Content-Type': 'application/json',
    // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Origin': '*',
  },
})

export interface eCommerceApiResponse {
  status: number
  payload: any
}

export default eCommerceClient
