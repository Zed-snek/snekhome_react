import {deleteRequestWithAuth} from "./requestFunctions";

export default class FileService {

    static async deleteImage(name) {
        return await deleteRequestWithAuth(`/image/${name}/delete`)
    }
}