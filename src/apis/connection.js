import axios from 'axios'

export default axios.create({
    baseURL: 'https://polloverflow-server.grouppoint.online/',
})