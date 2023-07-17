import {useState} from "react";
import FileService from "../API/FileService";

export function useImages(array, setArray, isFromFirst) { //last image in array is newest
    const last = array.length - 1
    const [currentIndex, setCurrentIndex] = useState(isFromFirst ? 0 : last)

    const currentImage = (last === -1 ? '' : array[currentIndex].name)

    function turnRight() {
        if (currentIndex === last)
            setCurrentIndex(0)
        else
            setCurrentIndex(prev => prev + 1)
    }
    function turnLeft() {
        if (currentIndex === 0)
            setCurrentIndex(last)
        else
            setCurrentIndex(prev => prev - 1)
    }

    async function deleteCurrentImageRequest() {
        await FileService.deleteImage(currentImage)
            .then(() => {
                setCurrentIndex(prev => prev - 1)
                setArray(array.filter(f => f.name !== currentImage))
            })
    }
    return [turnLeft, turnRight, currentImage, deleteCurrentImageRequest]
}