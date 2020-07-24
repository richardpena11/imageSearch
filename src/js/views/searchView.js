import { elements } from './dom';


export const getQuery = () => {
    const value = document.querySelector(elements.searchboxInput).value
    document.querySelector(elements.searchboxInput).value = ''
    return value
}