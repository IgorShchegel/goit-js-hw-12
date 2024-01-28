import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const searchForm = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.button-more');
const loader = document.querySelector('.loader');
const hiddenClass = 'is-hidden';

let searchQuery = '';
let page = 1;
let maxPage = 0;
const pageSize = 40;

hideLoader();

searchForm.addEventListener('submit', async event => {
  event.preventDefault();
  searchQuery = searchInput.value;
  gallery.innerHTML = '';
  page = 1;
  showLoader();

  try {
    const { hits, totalHits } = await fetchImages(searchQuery);
    maxPage = Math.ceil(totalHits / pageSize);
    displayImages(hits);

    if (hits.length > 0 && hits.length !== totalHits) {
      showButton();
      loadMoreBtn.addEventListener('click', handleLoadMore);
    } else {
      hideButton();
    }
  } catch (error) {
    showMessage(error);
  } finally {
    hideLoader();
  }
});

async function fetchImages(query) {
  const key = '41984486-af85e40ac9c664bf86aaf37aa';

  const url = `https://pixabay.com/api/?`;

  try {
    const response = await axios.get(url, {
      params: {
        key: key,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: 40,
        safesearch: true,
      },
    });
    if (response.data.hits.length === 0) {
      searchForm.reset();
      hideButton();
      throw new Error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    } else {
      return response.data;
    }
  } catch (error) {
    throw new Error(error);
  }
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function displayImages(images) {
  gallery.insertAdjacentHTML('beforeend', createMarkup(images));
  lightbox.refresh();
  searchForm.reset();
  getCardHeight();
}

function createMarkup(image) {
  return image
    .map(
      image =>
        `<li class="card">
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

async function handleLoadMore() {
  page += 1;
  disableButton();
  showLoader();
  try {
    const { hits } = await fetchImages(searchQuery);

    displayImages(hits);
  } catch (error) {
    showMessage(error);
  } finally {
    enableButton();
    hideLoader();
    smoothScrollToNextGroup();
    if (page === maxPage) {
      iziToast.info({
        title: '',
        message:
          'We are sorry, but you have reached the end of search results.',
        position: 'topRight',
      });

      hideButton();
      loadMoreBtn.removeEventListener('click', handleLoadMore);
    }
  }
}

function showMessage(message) {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function hideButton() {
  loadMoreBtn.classList.add(hiddenClass);
}

function showButton() {
  loadMoreBtn.classList.remove(hiddenClass);
}

function enableButton() {
  loadMoreBtn.disabled = false;
}

function disableButton() {
  loadMoreBtn.disabled = true;
}

function getCardHeight() {
  const imageCard = document.querySelector('.card');
  return imageCard.getBoundingClientRect().height;
}

function smoothScrollToNextGroup() {
  const cardHeight = getCardHeight();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
