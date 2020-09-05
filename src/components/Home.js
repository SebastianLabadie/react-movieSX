import React, { useState, useEffect } from "react";
import RBCarousel from 'react-bootstrap-carousel'
import { getMovies,getGenres,getMoviesByGenre,getPersons,getMoviesTopRated } from "../services/index";

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
        setMoviesByGenre(await getMoviesByGenre(28));
        setPersons(await getPersons());
        setTopRated(await getMoviesTopRated());
    };
    fetchApi();
  }, []);

  const renderMovies = nowPlaying.slice(0, 5).map((item, index) => {
    return (
      <div style={{ height: 500, width: "100%" }} key={index}>
        <div className="carousel-center">
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          <i
            className="far fa-play-circle"
            style={{ fontSize: 95, color: "#f4c10f" }}
          ></i>
        </div>
        <div
          className="carousel-caption"
          style={{ textAlign: "center", fontSize: 35 }}
        >
          {item.title}
        </div>
      </div>
    );
  });
  console.log('GENGRES'+genres[0])
  const renderGenres= genres.map((genre,i)=>{
    return (
        <li className="list-inline-item " key={i}>
          <button
            type="button"
            className="btn btn-outline-info"
            
          >
            {genre.name}
          </button>
        </li>
      );
  })


  return (
    <div>
      <div className="container">
          <div className="row mt-2">
              <div className="col m-0">
                <RBCarousel
                    autoplay={true}
                    pauseOnVisibility={false}
                    slideshowSpeed={2000}
                    version={4}
                    indicators={true}
                >
                    {renderMovies}
                </RBCarousel>
              </div>
          </div>
          <div className="row mt-3">
                <div className="col">
                    <div className="list-inline">
                        {renderGenres}
                    </div>
                </div>
          </div>
      </div>
    </div>
  );
};

export default Home;
