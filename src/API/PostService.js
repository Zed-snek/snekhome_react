import axios from "axios";


export default class PostService {

    static async getPosts(limit = 20, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        })
        return [response.data, response.headers['x-total-count'] ]
    }

    static async getPostById(id) {
        return await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
    }

    static async getCommentsByIdPost(id) {
        return await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    }


}


