import { elements } from './dom';


export const getQuery = () => {
    return document.querySelector(elements.searchboxInput).value
}