import axios from 'axios'

const apiKey='d8792ad8e2f663b6c2aad88e135c8e81'
const url='https://api.themoviedb.org/3'
const nowPlayingUrl=`${url}/movie/now_playing`
const topRatedUrl=`${url}/movie/top_rated`
const movieUrl=`${url}/movie`
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
export const getMoviesByGenre=async(genre_id)=>{
    try {
        const res = await axios.get(moviesUrl,{
            params:{
                api_key:apiKey,
                language:'en_US',
                page:1,
                with_genres:genre_id
            }
        })
        const data=res.data
        const imagesUrl='https://image.tmdb.org/t/p/original/'
       const moviesByGenre=data.results.map((movie)=>{
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
       return moviesByGenre
     } catch (error) {
         console.log(error)
     }
}

export const getPersons=async()=>{
    try {
        const res = await axios.get(personUrl,{
            params:{
                api_key:apiKey
            }
        })
        const data=res.data
        const persons=data.results.map(person=> {
            return {
                id:person['id'],
                profileImg:'https://image.tmdb.org/t/p/w200' + person['profile_path'],
                popularity:person['popularity'],
                name:person['name'],
                known:person['known_for_department']
            }
        })
        return persons
     } catch (error) {
         console.log(error)
     }
}

export const getMoviesTopRated=async()=>{
    try {
        const res = await axios.get(topRatedUrl,{
            params:{
                api_key:apiKey,
                language:'en_US',
                page:1,
            }
        })
        const data=res.data
        const imagesUrl='https://image.tmdb.org/t/p/original/'
       const moviesTopRated=data.results.map((movie)=>{
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
       return moviesTopRated
     } catch (error) {
         console.log(error)
     }
}

export const getMovieDetail=async(id)=>{
    console.log(id+ 'dddddddddddd')
    try {
        const res = await axios.get(`${movieUrl}/${id}`,{
            params:{
                api_key:apiKey,
                language:'en_US',
            }
        })
        const data=res.data
        const imagesUrl='https://image.tmdb.org/t/p/original/'
       const movie={
            id:data.id,
            backPoster:imagesUrl + data['backdrop_path'],
            popularity:data['popularity'],
            title:data['title'],
            poster:imagesUrl + data['poster_path'],
            overview:data['overview'],
            rating:data['vote_average'],
           }
       
       return movie
     } catch (error) {
         console.log(error)
     }
}

export const getMovieVideos=async()=>{
    
}

export const getCasts=async()=>{
    
}
export const getSimilarMovie=async()=>{
    
}
