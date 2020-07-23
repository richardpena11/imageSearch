import '../style/style.sass';

import { elements } from './views/dom';
import * as searchView from './views/searchView'
import * as resultsView from './views/resultsView'
import Search from './models/Search'
import Results from './models/Results'

const setupEventListener = () => {
    document.querySelector(elements.searchboxBtn).addEventListener('click', searchInitial)

    document.querySelector(elements.searchboxInput).addEventListener('keypress', keyEvent)

    document.querySelector(elements.nextPage).addEventListener('click', changePage)
    
    document.querySelector(elements.previousPage).addEventListener('click', changePage)
    
    document.querySelector(elements.itemPerPage).addEventListener('change', changePerPage)
}

let newSearch;
let newResults;

const keyEvent = e => {
    if(e.key === 'Enter'){
        searchInitial()
    }
}

const searchInitial = () => {
    // 1- Get query from search box
    const query = searchView.getQuery();

    search(query, 1, document.querySelector(elements.itemPerPage).value);
}

const search = async (query, page, perPage) => {

    // 2- Fetch data from Flicker API
    newSearch = new Search(query, page, perPage);
    const data = await newSearch.fetchData();

    // 3- Display results in UI
    if(data.stat === 'ok'){
        const photos = data.photos;
        newResults = new Results(photos.page, photos.pages, photos.perpage, photos.total, photos.photo);

        resultsView.displayResults(newResults);
    } else {
        resultsView.displayError(data);
    };
}

const changePage = e => {
    const id = `#${e.target.id}`;
    let page; 
    if(id === elements.nextPage){
        page = newSearch.nextPage()
    } else if (id === elements.previousPage){
        page = newSearch.previousPage()
    }

    if(page > 0){
        search(newSearch.query, page)
    }
    
    console.log(newSearch);
}

const changePerPage = () => {
    const perPage = document.querySelector(elements.itemPerPage).value;
    if(newSearch){
        search(newSearch.query, newSearch.page, perPage)
    }
}

const init = () => {
    setupEventListener()
}

init()