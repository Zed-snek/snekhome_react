
export function useSVG(defaultWidth, defaultHeight, defaultColor, newWidth, newHeight,  newColor) {

    return [
        newWidth ?? defaultWidth,
        newHeight ?? defaultHeight,
        newColor ?? defaultColor
    ]
}