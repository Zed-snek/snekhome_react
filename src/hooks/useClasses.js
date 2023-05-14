export function useClasses(className, addClass){

    const classes = [className]
    if (addClass) {
        classes.push(addClass)
    }

    return classes
}