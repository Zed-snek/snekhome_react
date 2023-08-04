import {
    deleteRequestWithAuth,
    getRequest,
    postBodyRequestWithAuth,
    postParamsRequestWithAuth, putRequestWithAuth
} from "./requestFunctions";

export default class PostService {

    static async newPost(images, text, groupname, isAnonymous) {
        let formData = new FormData()
        formData.append("groupname", groupname)
        formData.append("text", text)
        formData.append("isAnonymous", isAnonymous)
        for (let i = 0; i < images.length; i++) {
            formData.append("images", images[i])
        }
        return await postBodyRequestWithAuth("/post", formData)
    }

    static async updatePost(oldImageNames, newImages, text, id) {
        let formData = new FormData()
        formData.append("text", text)
        for (let i = 0; i < newImages.length; i++) {
            formData.append("newImages", newImages[i])
        }
        for (let i = 0; i < oldImageNames.length; i++) {
            formData.append("oldImages", oldImageNames[i].name)
        }
        return await putRequestWithAuth("/post/" + id, formData)
    }

    static async getPostPage(id) {
        return await getRequest("/post/" + id)
    }

    static async changePostRating(id, newStatus) { //status = UPVOTE/DOWNVOTE/NULL
        return await postParamsRequestWithAuth(`/post/${id}/rate/${newStatus}`)
    }

    static async deletePost(id) {
        return await deleteRequestWithAuth(`/post/${id}`)
    }



    static async changeCommentaryRating(id, newStatus) {
        return await postParamsRequestWithAuth(`/commentary/${id}/rate/${newStatus}`)
    }

    static async newComment(idPost, comment) {
        return await postBodyRequestWithAuth(`/post/${idPost}/commentary`, comment)
    }

    static async getCommentsByPostId(idPost) {
        return await getRequest(`/post/${idPost}/commentaries`)
    }

    static async updateComment(id, newText) {
        return await putRequestWithAuth(`/commentary/${id}`, {text: newText})
    }

    static async deleteComment(id) {
        return await deleteRequestWithAuth(`/commentary/${id}`)
    }

}


