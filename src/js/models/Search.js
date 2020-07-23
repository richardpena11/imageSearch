export default class Search {
    constructor(query, page = 1, perPage = 25){
        this.query = query
        this.apiKey = 'f60a1fb8473f5d48c0c2ad10a5c2ff09',
        this.safeMode = 1,
        this.perPage = perPage,
        this.sort = 'interestingness-desc',
        this.page = page
    }

    async fetchData(){
        let response = await fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&text=${this.query}&safe_search=${this.safeMode}&per_page=${this.perPage}&sort=${this.sort}&page=${this.page}&format=json&nojsoncallback=1`)
        let data = await response.json()
        return data
    }

    nextPage(){
        return this.page += 1
    }

    previousPage(){
        if(this.page > 1){
            return this.page -= 1
        }
        return false
    }
}