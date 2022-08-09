import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://a771792005a2b4fc3be50a71e9f3c835-1575173433.us-east-1.elb.amazonaws.com:5000/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export interface eCommerceApiResponse {
  status: number;
  payload: any;
}

export default eCommerceClient;
