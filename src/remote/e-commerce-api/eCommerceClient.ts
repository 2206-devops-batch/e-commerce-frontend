import axios from 'axios'

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://a541fc074149e4506816882a4c7ef8e6-623895046.us-east-1.elb.amazonaws.com:3000/',
  headers: {
    crossDomain: true,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Origin': 'http://a541fc074149e4506816882a4c7ef8e6-623895046.us-east-1.elb.amazonaws.com:3000/',
  },
})

export interface eCommerceApiResponse {
  status: number
  payload: any
}

export default eCommerceClient
