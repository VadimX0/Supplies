import axios from 'axios'
import { HOST_URL } from '../utils/consts'

const $host = axios.create({
    baseURL: HOST_URL
})

export {$host}