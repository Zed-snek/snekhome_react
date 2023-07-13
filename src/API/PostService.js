import {getRequest, postBodyRequestWithAuth} from "./requestFunctions";

export default class PostService {

    static async newPost(images, text, groupname, isAnonymous) {
        let formData = new FormData()
        formData.append("groupname", groupname)
        formData.append("text", text)
        formData.append("isAnonymous", isAnonymous)
        if (images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                formData.append("images", images[i])
            }
        }
        return await postBodyRequestWithAuth("/post", formData)
    }

    static async getPostPage(id) {
        return await getRequest("/post/" + id)
    }

}


