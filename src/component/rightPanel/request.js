
import axios from 'axios'
export default function(activeItem){
    const { url, method, dataPath } = activeItem.__config__
    return new Promise((resolve, reject) => {
        axios({url, method}).then(res => {
            let result = dataPath ? res.data[dataPath] : res.data
            resolve(result)
        }).catch(e => {
            reject(e)
        })
    })
}