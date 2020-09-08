import React, { useState, useEffect } from "react";
import { getMovieDetail } from "../services/index";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

const MovieDetail = ({ match }) => {
  const [detail, setDetail] = useState([]);
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState('');
  useEffect(() => {
    const fetchApi = async () => {
      setDetail(await getMovieDetail(match.params.id));
      setVideo(await getMovieVideos(match.params.id))
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
        aria-labelledy="contained-modal-title-vcenter"
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
          >


          </ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="container">
      <div className="row mt-2">
        <MoviePlayerModal></MoviePlayerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          {detail ? (
            <img
              src={detail.backPoster}
              alt={detail.title}
              className="img-fluid"
            />
          ) : null}
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
    </div>
  );
};

export default MovieDetail;
