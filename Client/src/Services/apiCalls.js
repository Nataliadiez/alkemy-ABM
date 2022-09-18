import Axios from 'axios'

const setConfig = () =>{
    return {
        headers: {
          'x-access-token': localStorage.getItem("token")
        }
    }
}


const post = async(url, data) => {
    const config = setConfig()
    const res = await Axios.post(url, data, config)
    return res;
}

const get = async(url) => {
    const config = setConfig()
    const res = await Axios.get(url, config)
    return res;
}

const deleteResource = async(url) => {
    const config = setConfig()
    const res = await Axios.delete(url, config)
    return res;
}

const patch = async(url, data) => {
    const config = setConfig()
    const res = await Axios.patch(url, data, config)
    return res;
}

export {
    post,
    get,
    patch,
    deleteResource,
}