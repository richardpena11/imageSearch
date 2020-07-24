import { elements } from './dom';

const addCommas = (x) => {
    var chunk = x.toString().split(".");
    chunk[0] = chunk[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return chunk.join(".");
}

const displaySearchInfo = data => {
    const page = addCommas(data.page)
    const pages = addCommas(data.pages)
    const total = addCommas(data.total)

    const markup = `
        <span>Page ${page} of ${pages}. Items per Page: ${data.perPage}. Total: ${total} Photos.</span>
    `

    document.querySelector(elements.searchInfo).innerHTML = markup
}

const displayNavigationBtn = data => {

    document.querySelector(elements.previousPage).style.visibility = "visible";
    document.querySelector(elements.nextPage).style.visibility = "visible";
    document.querySelector(elements.navigation).style.visibility = "visible";

    if(parseInt(data.total) <= data.perPage){
        document.querySelector(elements.navigation).style.visibility = "hidden";
    } 

    if(data.page <= 1){
        document.querySelector(elements.previousPage).style.visibility = "hidden";
    } else if(data.page === data.pages) {
        document.querySelector(elements.nextPage).style.visibility = "hidden";
    }
}
const initialDisplayResults = () =>{
    document.querySelector(elements.resultsContainer).style.display = "flex";
    document.querySelector(elements.results).innerHTML = "";
    document.querySelector(elements.waiting).style.display = "none";
    document.querySelector(elements.error).style.display = "none";
}

export const displayResults = data => {

    initialDisplayResults();

    displaySearchInfo(data);

    displayNavigationBtn(data)

    for (const photo of data.photos){
        const markup = `
            <a class="result" href="https://www.flickr.com/photos/${photo.owner}/${photo.id}" target="_blank">
                <img class="result__img" src="http://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg" alt="${photo.title}">
            </a>
        `
        document.querySelector(elements.results).insertAdjacentHTML("beforeend", markup)
    }
    
    document.querySelector(elements.navigationLabel).textContent = `Page ${data.page}`
}

export const displayError = data => {
    document.querySelector(elements.waiting).style.display = "none";
    document.querySelector(elements.error).style.display = "flex"
    document.querySelector(elements.errorLabel).textContent = data.message
}