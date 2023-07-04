import {useState} from "react";
import FileService from "../API/FileService";

export function useImages(array, setArray) { //last image in array is newest
    const last = array.length - 1
    const [currentIndex, setCurrentIndex] = useState(last)
    const currentImage = array[currentIndex]

    function turnRight() {
        if (currentImage === last)
            setCurrentIndex(0)
        else
            setCurrentIndex(prev => prev + 1)
    }
    function turnLeft() {
        if (currentImage === 0)
            setCurrentIndex(last)
        else
            setCurrentIndex(prev => prev - 1)
    }

    async function deleteImageRequest() {
        await FileService.deleteImage(currentImage)
            .then(setArray(() => {
                let newArr = {...array}
                delete newArr[currentIndex]
                return newArr
            }))
    }

    return [turnLeft, turnRight, currentImage, deleteImageRequest]
}