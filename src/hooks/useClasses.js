export function useClasses(mainClass, addClass){

    const classes = [mainClass]
    if (addClass) {
        classes.push(addClass)
    }

    return classes
}