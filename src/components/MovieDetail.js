import React, { useState, useEffect } from "react";
import { getMovieDetail, getMovieVideos,getCasts,getSimilarMovies } from "../services/index";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const MovieDetail = ({ match }) => {
  const [detail, setDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState("");
  const [casts, setCasts] = useState([]);
  const [similar, setSimilar] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      setDetail(await getMovieDetail(match.params.id));
      setVideo(await getMovieVideos(match.params.id));
      setCasts(await getCasts(match.params.id));
      setSimilar(await getSimilarMovies(match.params.id));
    };
    fetchApi();
  }, [match.params.id]);

  const MoviePlayerModal = () => {
    const youtubeENDPOINT = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        show={open}
        onHide={() => setOpen(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#000", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ background: "#000" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeENDPOINT + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let renderGenres;

  if (detail.genres !== undefined) {
    renderGenres = detail.genres.map((genre) => {
      return (
        <li className="list-inline-item" key={genre.id}>
          <button type="button" className="btn btn-outline-info">
            {genre.name}
          </button>
        </li>
      );
    });
  }

  const renderCasts=casts.slice(0,4).map((cast)=>{
      return(
        <div className="col-md-3 text-center" key={cast.id}>
        <img
          src={cast.img}
          alt={cast.name}
          className="img-fluid rounded-circle mx-auto d-block"
        />
        <p className="font-weight-bold text-center">{cast.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#5a606b" }}
        >
         {cast.character}
        </p>
      </div>
      )
  })

const renderSimilar=similar.slice(0,4).map((movie)=>{
    return(
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
    )
}) 

  return detail ? (
    <div className="container">
      <div className="row mt-2">
        <MoviePlayerModal></MoviePlayerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            src={detail.backPoster}
            alt={detail.title}
            className="img-fluid"
          />

          <div className="carousel-center">
            <i
              className="far fa-play-circle"
              onClick={() => setOpen(true)}
              style={{ fontSize: 95, color: "#f4c10f", cursor: "pointer" }}
            ></i>
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 35 }}
          >
            {detail.title}
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{renderGenres}</ul>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          <div className="text-center">
            <ReactStars
              count={detail.rating}
              size={20}
              color="#f4c10f"
            ></ReactStars>
          </div>
          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bold" }}>
              OVERVIEW
            </p>
              {detail.overview}
          </div>
          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bold" }}>
              CASTS
            </p>
            <div className="row">
              {renderCasts}
            </div>
          </div>
          <div className="mt-3">
            <p style={{ color: "#5a606b", fontWeight: "bold" }}>
              SIMILAR MOVIES
            </p>
            <div className="row">
              {renderSimilar}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default MovieDetail;
