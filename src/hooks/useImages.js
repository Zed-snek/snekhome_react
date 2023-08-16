import {useState} from "react";
import FileService from "../API/FileService";

export function useImages(array, setArray, isFromFirst) { //last image in array is newest
    const last = array.length - 1
    const isMoreThanOne = array.length > 1
    const [currentIndex, setCurrentIndex] = useState(isFromFirst ? 0 : last)

    const currentImage = (last === -1 ? '' : array[currentIndex].name)

    function plusIndex() {
        if (currentIndex === last)
            setCurrentIndex(0)
        else
            setCurrentIndex(prev => prev + 1)
    }
    function minusIndex() {
        if (currentIndex === 0)
            setCurrentIndex(last)
        else
            setCurrentIndex(prev => prev - 1)
    }

    function turnRight() {
        if (isFromFirst)
            plusIndex()
        else
            minusIndex()
    }
    function turnLeft() {
        if (isFromFirst)
            minusIndex()
        else
            plusIndex()
    }

    async function deleteCurrentImageRequest() {
        await FileService.deleteImage(currentImage)
            .then(() => {
                setCurrentIndex(prev => prev - 1)
                setArray(array.filter(f => f.name !== currentImage))
            })
    }
    return [turnLeft, turnRight, currentImage, currentIndex, isMoreThanOne, deleteCurrentImageRequest]
}