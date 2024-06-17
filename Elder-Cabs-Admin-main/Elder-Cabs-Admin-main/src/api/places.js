import instance from './config'

const placeApi = {
    create: (data) => instance.post(`/place`, data),
    delete: (placeId) => instance.delete(`/place/${placeId}`),
    readAll: () => instance.get(`/place`),
}

export default placeApi;