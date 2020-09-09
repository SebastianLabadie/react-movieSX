import React, { useState, useEffect } from "react";
import RBCarousel from "react-bootstrap-carousel";
import {
  getMovies,
  getGenres,
  getMoviesByGenre,
  getPersons,
  getMoviesTopRated,
} from "../services/index";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      setNowPlaying(await getMovies());
      setGenres(await getGenres());
      setMoviesByGenre(await getMoviesByGenre(37));
      setPersons(await getPersons());
      setTopRated(await getMoviesTopRated());
    };
    fetchApi();
  }, []);


const handleClickGenre=async (genreId)=>{
  setMoviesByGenre(await getMoviesByGenre(genreId))
}

  

  const renderMoviesSlider = nowPlaying.slice(0, 5).map((movie, i) => {
    return (
      <div style={{ height: 500, width: "100%" }} key={i}>
        <div className="carousel-center">
          <img
            style={{ height: 600 }}
            src={movie.backPoster}
            alt={movie.title}
          />
        </div>
        <div className="carousel-center">
          <i
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#f4c10f",cursor:"pointer"}}
          ></i>
        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          {movie.title}
        </div>
      </div>
    );
  });
  const renderGenres = genres.map((genre, i) => {
    return (
      <li className="list-inline-item " key={i}>
        <button type="button" className="btn btn-outline-info" onClick={()=>handleClickGenre(genre.id)}>
          {genre.name}
        </button>
      </li>
    );
  });

  const renderMoviesByGenre = moviesByGenre.slice(0, 4).map((movie) => {
    return (
      <div className="col-md-3 col-sm-6" key={movie.id}>
        <div className="card">
          <Link to={`/movie/${movie.id}`}>
            <img src={movie.poster} alt={movie.title} className="img-fluid" />
          </Link>
        </div>
        <div className="mt-3">
          <p>{movie.title}</p>
          <p>Rated: {movie.rating}</p>
          <ReactStars
            count={movie.rating}
            size={20}
            color="#f4c10f"
          ></ReactStars>
        </div>
      </div>
    );
  });

  const renderTrendingPersons = persons.slice(0, 4).map((person, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          src={person.profileImg}
          alt={person.name}
          className="img-fluid rounded-circle mx-auto d-block"
        />
        <p className="font-weight-bold text-center">{person.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
          Trending for {person.known}
        </p>
      </div>
    );
  });

  const renderMoviesTopRated = topRated.slice(0, 4).map((movie) => {
    return (
      <div className="col-md-3" key={movie.id}>
        <div className="card">
          <Link to={`/movie/${movie.id}`}>
            <img src={movie.poster} alt={movie.title} className="img-fluid" />
          </Link>
        </div>
        <div className="mt-3">
          <p>{movie.title}</p>
          <p>Rated: {movie.rating}</p>
          <ReactStars
            count={movie.rating}
            size={25}
            color="#f4c10f"
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="container">
        <div className="row mt-2">
          <div className="col ">
            <RBCarousel
              autoplay={true}
              pauseOnVisibility={false}
              slideshowSpeed={2000}
              version={4}
              indicators={true}
            >
              {renderMoviesSlider}
            </RBCarousel>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="list-inline">{renderGenres}</div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="float-right">
              <i className="far fa-arrow-alt-circle-right"></i>
            </div>
          </div>
        </div>
        <div className="row mt-3">{renderMoviesByGenre}</div>

        <div className="row mt-3">
          <p className="font-weight-bold" style={{ color: "#5a606b" }}>
            TRENDING PERSON ON THIS WEEK
          </p>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="float-right">
              <i className="far fa-arrow-alt-circle-right"></i>
            </div>
          </div>
        </div>
        <div className="row mt-3">{renderTrendingPersons}</div>
        <div className="row mt-3">
          <div className="col">
            <p className="font-weight-bold" style={{ color: "#5a606b" }}>
              TOP RATED MOVIES
            </p>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col">
            <div className="float-right">
              <i className="far fa-arrow-alt-circle-right"></i>
            </div>
          </div>
        </div>
        <div className="row mt-3">{renderMoviesTopRated}</div>
      </div>
    </div>
  );
};

export default Home;
