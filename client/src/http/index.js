import axios from 'axios'

const $host = axios.create({
    baseURL: 'http://localhost:2020/'
})

export {$host}