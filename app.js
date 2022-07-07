
const apiKey = '04dc3489f7f6532d06452b1d3d0b1ec9';
// const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`
// const url = `https://api.themoviedb.org/3/search/movie?api_key=04dc3489f7f6532d06452b1d3d0b1ec9&language=en-US&query=avengers&page=3&include_adult=false`
const imgEndpoint = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2`
// https://api.themoviedb.org/3/search/avengers?api_key=04dc3489f7f6532d06452b1d3d0b1ec9&page=1
// // api request
async function fetchMovie(type = 'discover', query = '', page = 1, sortBy = '&popularity.desc', ) {
   try {
      if (query) {
       query = `&query=${query.replaceAll(' ', '%20')}`;
      }
      //  converting page to string value
      page = '&page=' + page.toString();
   
      const endpoint = `https://api.themoviedb.org/3/${type}/movie?api_key=04dc3489f7f6532d06452b1d3d0b1ec9&language=en-US${query}${page}${sortBy}&include_adult=false`;
      console.log(endpoint);
      const response = await fetch(endpoint);
      // console.log(response);
      const movies = await response.json();
      console.log(movies);
      renderMovies(movies.results);
   } catch (e) {
      console.log(e);
   }
}
// movie details request 
var ratingFromMovieDetails;
async function fetchMovieDetails(endpoint) {
   const response = await fetch(endpoint);
   if (response.ok) {
      const details = await response.json();
      // console.log(details);
      return details;
   } else {
      throw new Error(`HTTP error: ${response.status}`);
   }
}
//catching runtime
// fetchMovieDetails('https://api.themoviedb.org/3/movie/602223?api_key=04dc3489f7f6532d06452b1d3d0b1ec9&language=en-US')
// const urlDe = 'https://api.themoviedb.org/3/movie/602223?api_key=04dc3489f7f6532d06452b1d3d0b1ec9';
// console.log(getRuntime(urlDe));
// console.log(fetchMovieDetails(urlDe));

//first screen display
fetchMovie();
const mainEl = document.querySelector('.main');
function renderMovies(movies) {
   mainEl.innerHTML = '';

   movies.map(function (movie) {
      const title = movie.title;
      const rating = movie.vote_average;
      const year = movie.release_date.split('-')[0];
      const overview = movie.overview;
      const poster = imgEndpoint + movie.poster_path;

      // catching runtime 
      const id = movie.id;
      const urlMDetails = `https://api.themoviedb.org/3/movie/${id}?api_key=04dc3489f7f6532d06452b1d3d0b1ec9&video=1&language=en-US`;
      fetchMovieDetails(urlMDetails).then((response) => {
         console.log(response);
         const runtime = response.runtime;
         const  revenue =  response.revenue > 0 ? (response.revenue/1000000).toFixed(2) : 0;
         mainEl.innerHTML += `
         <div class="movie">
                 <div class="movie-poster"> <img
                         src="${poster}"
                         alt="${title}"/>
                     <div class="overview">
                         <h3>Overview</h3>
                        <p>${overview}</p>
                     </div>
                 </div>
                 <div class="movie-content">
                 
                     <div class="top">
                         <h5 class="title"><a href="">${title}</a></h5>
                         <span class="date">${year}</span>
                     </div>
                     <div class="bottom">
                         <ul>
                             <li><span class="quality"> ${revenue} M</span></li>
                             <li>
                                 <span class="duration"><i class="far fa-clock"></i> ${runtime} min</span>
                                 <span class="rating"><i class="fas fa-thumbs-up"></i> ${rating}</span>
                             </li>
                         </ul>
                     </div>
                 </div>
             </div>`
         // console.log(runtime);
      }).catch((error) => {
         console.error(error);
         return 'unknown';
      })
      // console.log(urlMDetails);
   })
}

//search movie details
const searchInput = document.querySelector('#search');
searchInput.addEventListener('keyup', function (event) {
   const query = searchInput.value;
   // mainEl.innerHTML = '';
   // if search value empty
   if(!query) {
      fetchMovie();
   } else {
      fetchMovie('search', query);
   }
   console.log(query);
})

// sort element catching
const sortBy = document.querySelector('#sort_by');
const btnAction = document.querySelector('.btn-action');
btnAction.addEventListener('click', (e) =>{
   // e.preventDefault();
   const sortTag = sortBy.value;
   console.log(sortTag);
// fetchMovie(type = 'discover', query = '', page = 1, sortBy = '&popularity.desc', )

   fetchMovie('discover', '', 1, sortTag);

})