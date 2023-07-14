
export function useSVG(defaultWidth, defaultHeight, defaultColor, newWidth, newHeight,  newColor) {

    const color = newColor ?? defaultColor
    const width = newWidth ?? defaultWidth
    const height = newHeight ?? defaultHeight

    return [width, height, color]
}