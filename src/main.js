import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

hideLoader();

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const searchQuery = searchInput.value;
  gallery.innerHTML = '';
  showLoader();

  fetchImages(searchQuery)
    .then(images => {
      displayImages(images);
      hideLoader();
    })
    .catch(error => {
      showMessage(error);
      hideLoader();
    })
    .finally(() => form.reset());
});

function fetchImages(query) {
  return new Promise((resolve, reject) => {
    const key = '41984486-af85e40ac9c664bf86aaf37aa';
    const urlParams = new URLSearchParams({
      key: key,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });

    const url = `https://pixabay.com/api/?${urlParams}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.hits.length === 0) {
          reject(
            'Sorry, there are no images matching your search query. Please try again!'
          );
        } else {
          resolve(data.hits);
        }
      })
      .catch(error => reject(error));
  });
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function displayImages(images) {
  gallery.innerHTML = '';
  gallery.innerHTML = createMarkup(images);
  lightbox.refresh();
}

function createMarkup(image) {
  return image
    .map(
      image =>
        `<li>
         <a class="gallery-link" href="${image.largeImageURL}">
           <img
               class="gallery-image"
               src="${image.webformatURL}"
               alt="${image.tags}"
            />
            <ul class="info">
            <li class="info-items">Likes: ${image.likes}</li>
            <li class="info-items">Views: ${image.views}</li>
            <li class="info-items">Comments: ${image.comments}</li>
            <li class="info-items">Downloads: ${image.downloads}</li>
            </ul>
         </a> 
        </li>   
  `
    )
    .join('');
}

function showMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
