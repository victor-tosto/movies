import { options } from "./apiMovie.js";

const moviesList = document.querySelector('.movies__list');
const searchMovie = document.querySelector('.search-bar__input');
const btnSearch = document.querySelector('.search-bar__icon');

getPopularMovies();

btnSearch.addEventListener('click', searchMovies);
searchMovie.addEventListener('keydown', e => {
    if (e.keyCode === 13) {
        searchMovies();
    }
});

async function getPopularMovies() {
    const url ='https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1';
    const fetchResponse = await fetch(url, options)
    .then(response => response.json())
    .then(response => response.results.forEach(movie => {
        moviesList.innerHTML +=
        `
            <li class="list__movie">
                <img class="movie__image" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="Avengers">
                <div class="movie__info">
                    <h3 class="info__name">${movie.title}</h3>
                    <div class="info__rate">
                        <div class="rate__star">
                            <img src="./assets/img/Star.svg" alt="Estrela">
                            <span>${movie.vote_average}</span>
                        </div>
                        <div class="rate__favorite">
                            <svg class="favorite__image" width="23" height="21" viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg">
                            <path id="Heart" d="M20.2913 2.61183C19.7805 2.10083 19.1741 1.69547 18.5066 1.41891C17.8392 1.14235 17.1238 1 16.4013 1C15.6788 1 14.9634 1.14235 14.2959 1.41891C13.6285 1.69547 13.022 2.10083 12.5113 2.61183L11.4513 3.67183L10.3913 2.61183C9.3596 1.58013 7.96032 1.00053 6.50129 1.00053C5.04226 1.00053 3.64298 1.58013 2.61129 2.61183C1.5796 3.64352 1 5.04279 1 6.50183C1 7.96086 1.5796 9.36013 2.61129 10.3918L3.67129 11.4518L11.4513 19.2318L19.2313 11.4518L20.2913 10.3918C20.8023 9.88107 21.2076 9.27464 21.4842 8.60718C21.7608 7.93972 21.9031 7.22431 21.9031 6.50183C21.9031 5.77934 21.7608 5.06393 21.4842 4.39647C21.2076 3.72901 20.8023 3.12258 20.2913 2.61183V2.61183Z" stroke="#BA0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>  
                            
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
                <p class="movie__synopsis">${movie.overview}</p>
            </li>
        `;
    }))
    .catch(err => console.log(err));

    const favorite = moviesList.querySelectorAll('.favorite__image');

    favorite.forEach(btn => btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    }));
}

async function searchMovies() {

    const search = searchMovie.value;

    const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=pt-BR&page=1`;
    moviesList.innerHTML = '';
    const fetchResponse = await fetch(url, options)
    .then(response => response.json())
    .then(response => response.results.forEach(movie => {
        moviesList.innerHTML +=
        `
            <li class="list__movie">
                <img class="movie__image" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="Avengers">
                <div class="movie__info">
                    <h3 class="info__name">${movie.title}</h3>
                    <div class="info__rate">
                        <div class="rate__star">
                            <img src="./assets/img/Star.svg" alt="Estrela">
                            <span>${movie.vote_average.toFixed(1)}</span>
                        </div>
                        <div class="rate__favorite">
                            <svg class="favorite__image" width="23" height="21" viewBox="0 0 23 21" xmlns="http://www.w3.org/2000/svg">
                            <path id="Heart" d="M20.2913 2.61183C19.7805 2.10083 19.1741 1.69547 18.5066 1.41891C17.8392 1.14235 17.1238 1 16.4013 1C15.6788 1 14.9634 1.14235 14.2959 1.41891C13.6285 1.69547 13.022 2.10083 12.5113 2.61183L11.4513 3.67183L10.3913 2.61183C9.3596 1.58013 7.96032 1.00053 6.50129 1.00053C5.04226 1.00053 3.64298 1.58013 2.61129 2.61183C1.5796 3.64352 1 5.04279 1 6.50183C1 7.96086 1.5796 9.36013 2.61129 10.3918L3.67129 11.4518L11.4513 19.2318L19.2313 11.4518L20.2913 10.3918C20.8023 9.88107 21.2076 9.27464 21.4842 8.60718C21.7608 7.93972 21.9031 7.22431 21.9031 6.50183C21.9031 5.77934 21.7608 5.06393 21.4842 4.39647C21.2076 3.72901 20.8023 3.12258 20.2913 2.61183V2.61183Z" stroke="#BA0707" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg> 
                            <span>Favoritar</span>
                        </div>
                    </div>
                </div>
                <p class="movie__synopsis">${movie.overview}</p>
            </li>
        `;
    }))
    .catch(err => console.log(err));

    const favorite = moviesList.querySelectorAll('.favorite__image');

    favorite.forEach(btn => btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    }));
}

const movies = document.querySelector

function saveToLocalStorage(favorite) {
    favorite.forEach(btn => btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    }));
}
