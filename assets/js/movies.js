import { options } from "./apiMovie.js";

const moviesList = document.querySelector('.movies__list');
const searchMovie = document.querySelector('.search-bar__input');
const btnSearch = document.querySelector('.search-bar__icon');
const favoritesCheckbox = document.querySelector('.checkbox__input');
const checkbox = document.querySelector('.checkbox__checkmark');
const checkIcon = document.querySelector('.show-favorites__checkbox');

getPopularMovies();

favoritesCheckbox.addEventListener('click', () => {
    checkbox.classList.toggle('active');
    checkIcon.classList.toggle('active');
    if (checkbox.classList.contains('active')) {
        clearMovies();
        showFavorites();
    } else {
        clearMovies();
        getPopularMovies();
    }
});

btnSearch.addEventListener('click', searchMovies);
searchMovie.addEventListener('keydown', e => {
    
    if (searchMovie.value === '') {
        getPopularMovies();
    }

    if (e.keyCode === 13) {
        searchMovies();
    }
});

async function getPopularMovies() {
    const url ='https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1';
    const fetchResponse = await fetch(url, options)
    .then(response => response.json())
    .then(response => response.results.forEach(movie => createMovieCard(movie)))
    .catch(err => console.log(err));
}

async function searchMovies() {

    const search = searchMovie.value;

    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=pt-BR&page=1`;
    clearMovies();
    const fetchResponse = await fetch(url, options)
    .then(response => response.json())
    .then(response => response.results.forEach(movie => createMovieCard(movie)))
    .catch(err => console.log(err));
}

function clearMovies() {
    moviesList.innerHTML = '';
}

function createMovieCard(movie) {
    
    const { id, title, poster_path, vote_average, release_date, overview } = movie;
    const isFavorited = checkMovieIsFavorited(id);

    const year = new Date(release_date).getFullYear();
    const image = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const movieElement = document.createElement('li');
    movieElement.classList.add('list__movie');
    moviesList.appendChild(movieElement);

    const movieImage = document.createElement('img');
    movieImage.classList.add('movie__image')
    movieImage.src = image;
    movieImage.alt = `${title} Poster`;
    movieElement.appendChild(movieImage);

    const movieInformations = document.createElement('div');
    movieInformations.classList.add('movie__info');
    movieElement.appendChild(movieInformations);

    const movieTitle = document.createElement('h3');
    movieTitle.classList.add('info__name');
    movieTitle.textContent = `${title} (${year})`;
    movieInformations.appendChild(movieTitle);

    const movieRateContainer = document.createElement('div');
    movieRateContainer.classList.add('info__rate');
    movieInformations.appendChild(movieRateContainer);

    const movieStars = document.createElement('div');
    movieStars.classList.add('rate__star');
    movieRateContainer.appendChild(movieStars);

    const starImage = document.createElement('img');
    starImage.src = '/assets/img/Star.svg';
    movieStars.appendChild(starImage);

    const movieRate = document.createElement('span');
    movieRate.textContent = vote_average.toFixed(1);
    movieStars.appendChild(movieRate)

    const movieFavorite = document.createElement('div');
    movieFavorite.classList.add('rate__favorite');
    movieRateContainer.appendChild(movieFavorite);
    
    const favoriteImage = document.createElement('img');
    favoriteImage.src = isFavorited ? '/assets/img/heart-fill.svg' : '/assets/img/Heart.svg';
    favoriteImage.alt = 'Heart';
    favoriteImage.classList.add('favorite__image');
    favoriteImage.addEventListener('click', e => favoriteButtonPressed(e, movie));
    movieFavorite.appendChild(favoriteImage);

    const favoriteText = document.createElement('span');
    favoriteText.textContent = 'Favoritar';
    movieFavorite.appendChild(favoriteText);

    const movieSynopsis = document.createElement('p');
    movieSynopsis.classList.add('movie__synopsis');
    movieSynopsis.textContent = overview;
    movieElement.appendChild(movieSynopsis);

}

function showFavorites() {
    getFavoriteMovies().forEach(movie => createMovieCard(movie));
}

function favoriteButtonPressed(event, movie) {
    const favoriteState = {
      favorited: '/assets/img/heart-fill.svg',
      notFavorited: '/assets/img/Heart.svg'
    }
  
    if(event.target.src.includes(favoriteState.notFavorited)) {
      // aqui ele será favoritado
      event.target.src = favoriteState.favorited;
      saveToLocalStorage(movie);
    } else {
      // aqui ele será desfavoritado
      event.target.src = favoriteState.notFavorited;
      removeFromLocalStorage(movie.id);
    }
}

function getFavoriteMovies() {
    return JSON.parse(localStorage.getItem('favoriteMovies'));
}
  
function saveToLocalStorage(movie) {
    const movies = getFavoriteMovies() || [];
    movies.push(movie);
    const moviesJSON = JSON.stringify(movies);
    localStorage.setItem('favoriteMovies', moviesJSON);
}
  
function checkMovieIsFavorited(id) {
    const movies = getFavoriteMovies() || [];
    return movies.find(movie => movie.id == id);
}
  
function removeFromLocalStorage(id) {
    const movies = getFavoriteMovies() || [];
    const findMovie = movies.find(movie => movie.id == id);
    const newMovies = movies.filter(movie => movie.id != findMovie.id);
    localStorage.setItem('favoriteMovies', JSON.stringify(newMovies));
}
