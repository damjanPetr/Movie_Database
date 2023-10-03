import { useRef } from "react";
import { ScrollRestoration, useLoaderData } from "react-router-dom";
import { base_url, base_urlBg } from "../../../api/api";
import { MovieDetails } from "../../../types/types";
import { toHoursAndMinutes } from "../../../utils/func";
import Nav from "../../components/Nav";
import MovieCollection from "./MovieCollection";
import MovieDetailAside from "./MovieDetailAside";
import MediaBar from "./comp/MediaBar";
import Recommendations from "./comp/Recommendations";
import Social from "./comp/Social";
import TopBilledCast from "./comp/TopBilledCast";

export default function MovieDetail() {
  const { movieDetail /* mediaBarData */ } = useLoaderData() as {
    movieDetail: MovieDetails;
  };

  const popupYoutube = useRef<HTMLDialogElement>(null);

  const { hours, minutes } = toHoursAndMinutes(movieDetail.runtime);
  return (
    <div className=" ">
      <Nav />
      <main className="">
        <ScrollRestoration />

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
              <div className="mb-10 space-x-1 ">
                <h2 className="text-4xl font-bold ">
                  {movieDetail.title}
                  <span className="text-4xl text-gray-200 font-normal">
                    {" (" + movieDetail.release_date.slice(0, 4) + ")"}
                  </span>
                </h2>
                <div className="flex items-center">
                  <span className="">
                    {new Date(movieDetail.release_date).toLocaleDateString(
                      navigator.language,
                      {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                    {movieDetail.production_countries.length > 0 &&
                      " (" +
                        movieDetail.production_countries[
                          movieDetail.production_countries.length - 1
                        ].iso_3166_1 +
                        ")"}
                  </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2Z"
                      />
                    </svg>
                  </span>
                  {movieDetail.genres.length > 0 &&
                    movieDetail.genres.slice(0, 6).map((item, index) => (
                      <span key={item.id}>
                        {item.name}
                        {index !== movieDetail.genres.length - 1 ? "," : null}
                      </span>
                    ))}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12 10a2 2 0 0 0-2 2a2 2 0 0 0 2 2c1.11 0 2-.89 2-2a2 2 0 0 0-2-2Z"
                      />
                    </svg>
                  </span>
                  <span>
                    {hours}h {minutes}m
                  </span>
                </div>
              </div>

              {/* User Score / Trailer */}
              <div className="flex items-center">
                {/* Circular Progress Meter */}

                <div className="flex justify-between gap-2 items-center">
                  <div
                    className="relative h-16 w-16   rounded-full flex items-center justify-center   border-4 border-black hover:scale-105 transition-all "
                    style={{
                      backgroundImage: `conic-gradient(${
                        movieDetail.vote_average > 9
                          ? "hsl(116deg 100% 50%)"
                          : movieDetail.vote_average > 8
                          ? "hsl(104deg 100% 50%)"
                          : movieDetail.vote_average > 7
                          ? "hsl(93deg 100% 50%)"
                          : movieDetail.vote_average > 6
                          ? "hsl(81deg 100% 50%)"
                          : movieDetail.vote_average > 5
                          ? "hsl(70deg 100% 50%)"
                          : movieDetail.vote_average > 4
                          ? "hsl(58deg 100% 50%)"
                          : movieDetail.vote_average > 3
                          ? "hsl(35deg 100% 50%)"
                          : movieDetail.vote_average > 2
                          ? "hsl(12deg 100% 49%)"
                          : movieDetail.vote_average > 1
                          ? "hsl(0deg 100% 49%)"
                          : null
                      } ${Math.round(
                        ((movieDetail.vote_average * 10) / 100) * 360
                      )}deg, ${0}deg, rgb(24, 18, 18))`,
                    }}
                  >
                    <div className="absolute h-12 w-12 bg-black rounded-full text-white text-center  font-bold flex items-center justify-center ">
                      {Math.round(movieDetail.vote_average * 10)}
                      <sup>%</sup>
                    </div>
                  </div>
                  <p className="text-base font-bold break-word w-16">
                    User Score
                  </p>
                </div>
                <button
                  className="btn flex items-center font-semibold p-2 bg-black/60 hover:shadow-lg transition-all hover:bg-black/70 rounded-md hover:scale-105 "
                  onClick={() => {
                    // const modal = document.getElementById(
                    //   "trailer_modal"
                    // ) as HTMLDialogElement;

                    const modal = popupYoutube.current;

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

              {movieDetail.videos.results.filter((item) => {
                return item.official === true && item.type === "Trailer";
              }).length > 0 ? (
                <dialog id="trailer_modal" className="modal" ref={popupYoutube}>
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
                      allow="autoplay;"
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
              ) : null}
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
          <MovieDetailAside itemDetail={movieDetail} />
        </article>
      </main>
    </div>
  );
}
