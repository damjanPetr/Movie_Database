import {} from "react";
import { useLoaderData, Link } from "react-router-dom";
import {
  apiFetchOptions,
  apiURL,
  base_url,
  base_urlBg,
} from "../../../api/api";
import { MovieDetails, MovieImages, MovieVideos } from "../../../types/types";
import { toHoursAndMinutes } from "../../../utils/func";
import MediaBar from "./comp/MediaBar";
import Social from "./comp/Social";
import TopBilledCast from "./comp/TopBilledCast";
import Recommendations from "./comp/Recommendations";
import Nav from "../../components/Nav";
import Aside from "../../components/Aside";
import MovieDetailAside from "./MovieDetailAside";
import MovieCollection from "./MovieCollection";

export default function MovieDetail() {
  const { movieDetail /* mediaBarData */ } = useLoaderData() as {
    movieDetail: MovieDetails;
  };

  console.log(movieDetail);
  const { hours, minutes } = toHoursAndMinutes(movieDetail.runtime);
  return (
    <div className=" ">
      <Nav />
      <main className="">
        <section
          className="bg-black/40 bg-cover bg-center  bg-blend-darken"
          style={{
            backgroundImage: `url(${base_urlBg + movieDetail.backdrop_path})`,
          }}
        >
          <div className=" max-w-screen-xl mx-auto flex items-center justify-center  bg-transparent px-10 py-8 text-white bg-blend-darken ">
            {/* Image*/}
            <div className="img w-[300px] h-[450px] flex-none ">
              <img
                src={base_url + movieDetail.poster_path}
                alt="Movie Title Picture"
                className="rounded-xl w-full h-full"
              />
            </div>
            {/* Content*/}
            <section className="content flex flex-col  pl-10">
              <div className="mb-10 space-x-1">
                <h2 className="text-4xl font-bold">
                  {movieDetail.title}
                  <span className="text-4xl text-gray-200 font-normal">
                    {" (" + movieDetail.release_date.slice(0, 4) + ")"}
                  </span>
                </h2>
                <span className="">
                  {new Date(movieDetail.release_date).toLocaleDateString(
                    navigator.language,
                    {
                      month: "numeric",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                  {" (" +
                    movieDetail.production_countries[
                      movieDetail.production_countries.length - 1
                    ].iso_3166_1 +
                    ")"}
                </span>
                {movieDetail.genres.map((item, index) => (
                  <span key={item.id}>
                    {item.name}
                    {index !== movieDetail.genres.length - 1 ? "," : null}
                  </span>
                ))}
                <span>
                  {hours}h {minutes}m
                </span>
              </div>
              {/* User Score / Trailer */}
              <div className="flex items-center">
                <p className="">Vote Everage: {movieDetail.vote_average}</p>
                <p className="bg-blue-800">
                  Vote Count: {movieDetail.vote_count}
                </p>
                <button
                  className="btn flex items-center font-semibold"
                  onClick={() => {
                    const modal = document.getElementById(
                      "trailer_modal"
                    ) as HTMLDialogElement;
                    if (modal !== null) {
                      modal.showModal();
                    }
                    const dialogIframe = document.querySelector(
                      "#trailer_modal iframe"
                    ) as HTMLIFrameElement;

                    setTimeout(() => {
                      if (dialogIframe.contentWindow !== null) {
                        dialogIframe.contentWindow.postMessage(
                          `{"event":"command", "func":"playVideo","args":""}`,
                          "*"
                        );
                      }
                    }, 400);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="m11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"
                    />
                  </svg>
                  Play Trailer
                </button>
              </div>
              {/* Overview */}
              <div className="min-h-[150px]">
                <p className="mb-2 italic text-gray-400">
                  {movieDetail.tagline}
                </p>
                <h3 className="text-2xl mb-4 leading-tight">Overview</h3>
                <p className="">{movieDetail.overview}</p>
              </div>
              {movieDetail.homepage && <a href={movieDetail.homepage}></a>}

              <dialog id="trailer_modal" className="modal">
                <div className="modal-box bg-black w-[80vw] h-[80vh]">
                  <form method="dialog">
                    <button
                      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white p-2 "
                      onClick={() => {
                        const dialogIframe = document.querySelector(
                          "#trailer_modal iframe"
                        ) as HTMLIFrameElement;

                        if (dialogIframe.contentWindow !== null) {
                          dialogIframe.contentWindow.postMessage(
                            `
                          {"event":"command", "func":"stopVideo","args":""}`,
                            "*"
                          );
                        }
                      }}
                    >
                      ✕
                    </button>
                  </form>
                  <iframe
                    allow=" autoplay;"
                    allowFullScreen
                    className="w-full h-full rounded-lg"
                    src={`https://youtube.com/embed/${
                      movieDetail.videos.results.filter((item) => {
                        return (
                          item.official === true && item.type === "Trailer"
                        );
                      })[0].key
                    }?enablejsapi=1&version=3&playerapiid=ytplayer`}
                  ></iframe>
                </div>
              </dialog>
            </section>
          </div>
        </section>

        {/* Main Section */}
        <article className=" mx-auto flex max-w-screen-xl  p-10">
          <section className=" min-w-[75%] pr-10">
            <TopBilledCast
              castData={movieDetail.credits}
              movieId={movieDetail.id}
            />
            <Social reviews={movieDetail.reviews.results} />
            <MediaBar movieData={movieDetail} />
            {movieDetail.belongs_to_collection && <div className=""></div>}
            {movieDetail.belongs_to_collection && (
              <MovieCollection movieDetail={movieDetail} />
            )}
            <Recommendations
              recommendations={movieDetail.recommendations.results}
            />
          </section>
          <MovieDetailAside movieDetail={movieDetail} />
        </article>
      </main>
    </div>
  );
}
