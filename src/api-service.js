import axios from 'axios';
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
        this.per_page = 40;
    }

// axios.get('/users')
//   .then(res => {
//     console.log(res.data);
//   });


    fetchArticles() {
         const options = {
    headers: {
        Authorization: '29649247-5c49f6015ecbe8eb4654e40ef',
    },
};
    const url = `https://pixabay.com/api/?key=29649247-5c49f6015ecbe8eb4654e40ef&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

        return axios.get(url)
            
    };

    incrementPage() {
    this.page += 1;
    };
 
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
};