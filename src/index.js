import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


import ApiService from './api-service';
import {createMarkupItem} from './createMarkup'


export const refs = {
    form: document.querySelector('.search-form'),
    gallerybox: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
}

const instance = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });

const apiServiceElement = new ApiService();

refs.form.addEventListener('submit', onInputFormSearch);
refs.loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);
console.log(refs);


async function onInputFormSearch(event) {
    event.preventDefault();
     apiServiceElement.query = event.currentTarget.elements.searchQuery.value;
    apiServiceElement.resetPage();
    clearMarkup();

    try {
        const fetchResult = await apiServiceElement.fetchArticles() 
        
        if (fetchResult.data.totalHits === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
         return;
        }
        createMarkupItem(fetchResult.data.hits);
  if(apiServiceElement.page>=Math.ceil(fetchResult.data.totalHits
/apiServiceElement.per_page)) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
  } else {
      refs.loadMoreBtn.classList.remove('is-hidden'); 
    }

        instance.refresh();
        
    } catch (error) {
        console.log(error)
    }
}

function clearMarkup() {
    refs.gallerybox.innerHTML = '';
}

async function onClickLoadMoreBtn(event) {
 apiServiceElement.incrementPage()
    try {
   
    const fetchResult = await apiServiceElement.fetchArticles()
        createMarkupItem(fetchResult.data.hits);
        instance.refresh();
        
        if(apiServiceElement.page>=Math.ceil(fetchResult.data.totalHits
/apiServiceElement.per_page)) {
        refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    };
    
} catch (error) {

    // if (fetchResult.data.hits < apiServiceElement.per_page*apiServiceElement.page)
    
}

}
