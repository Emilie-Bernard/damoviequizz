export const getRandom = (min, max) => {
    return Math.floor(min + Math.random() * (max - min));
}