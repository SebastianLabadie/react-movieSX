import axios from 'axios'

const apiKey='d8792ad8e2f663b6c2aad88e135c8e81'
const url='https://api.themoviedb.org/3'
const nowPlayingUrl=`${url}/movie/now_playing`
const topRatedUrl=`${url}/movie/top_rated`
const movieUrl=`${url}/`
const genreUrl=`${url}/genre/movie/list`
const moviesUrl=`${url}/discover/movie`
const personUrl=`${url}/trending/person/week`

export const getMovies=async()=>{
    try {
       const res = await axios.get(nowPlayingUrl,{
           params:{
               api_key:apiKey,
               language:'en_US',
               page:1
           }
       })
       const data=res.data

       const imagesUrl='https://image.tmdb.org/t/p/original/'
       const movies=data.results.map((movie)=>{
           return {
            id:movie['id'],
            backPoster:imagesUrl + movie['backdrop_path'],
            popularity:movie['popularity'],
            title:movie['title'],
            poster:imagesUrl + movie['poster_path'],
            overview:movie['overview'],
            rating:movie['vote_average'],
           }
       })

       return movies
    } catch (error) {
        console.log(error)
    }
}

export const getGenres=async()=>{
    try {
       const res = await axios.get(genreUrl,{
           params:{
               api_key:apiKey,
               language:'en_US',
               page:1
           }
       })
       const data=res.data
       const genres=data.genres
       return genres
    } catch (error) {
        console.log(error)
    }
}
export const getMoviesByGenre=async()=>{
    
}

export const getPersons=async()=>{
    
}

export const getMoviesTopRated=async()=>{
    
}

export const getMovieDetail=async()=>{
    
}

export const getMovieVideos=async()=>{
    
}

export const getCasts=async()=>{
    
}
export const getSimilarMovie=async()=>{
    
}