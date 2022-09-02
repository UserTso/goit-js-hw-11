import {refs} from './index'
export function createMarkupItem(items) {
    const createMarkup = items.map(
        ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
            
 <a class = "link" href = "${largeImageURL}"> <img src="${webformatURL}" alt="${tags}" loading="lazy" width=370 height=280/>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      <span>${likes}</span>
      
    </p>
    <p class="info-item">
      <b>Views</b>
      <span>${views}</span>
      
    </p>
    <p class="info-item">
      <b>Comments</b>
      <span>${comments}</span>
      
    </p>
    <p class="info-item">
      <b>Downloads</b>
      <span>${downloads}</span>
      
    </p>
  </div>
  </a>
</div>`
  });
    refs.gallerybox.insertAdjacentHTML('beforeend', createMarkup.join(''));

}