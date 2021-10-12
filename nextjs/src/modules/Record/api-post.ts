import { api } from '../../services/api-service';
const postApi = {

  createPost(data) {
    return api.post('/post', data)
  },

  getPost(params?: Record<string, string>) {
    return api.get('/post', params)
  }
}



export default postApi