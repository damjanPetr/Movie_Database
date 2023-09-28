import { ScrollRestoration, useLoaderData } from "react-router-dom";
import { base_url, base_urlBg } from "../../api/api";
import { TvDetails } from "../../types/types";
import MovieDetailAside from "../MovieDetail/Main/MovieDetailAside";
import MediaBar from "../MovieDetail/Main/comp/MediaBar";
import Recommendations from "../MovieDetail/Main/comp/Recommendations";
import Social from "../MovieDetail/Main/comp/Social";
import TopBilledCast from "../MovieDetail/Main/comp/TopBilledCast";
import Nav from "../components/Nav";

type Props = {
  tvDetail: TvDetails;
};
function TVShowDetail() {
  const { tvDetail } = useLoaderData() as Props;

  console.log(tvDetail);

  return (
    <div className=" ">
      <ScrollRestoration />
      <Nav />
      <main className="">
        <section
          className="bg-black/40 bg-cover bg-center  bg-blend-darken"
          style={{
            backgroundImage: `url(${base_urlBg + tvDetail.backdrop_path})`,
          }}
        >
          <div className=" max-w-screen-xl mx-auto flex items-center justify-center  bg-transparent px-10 py-8 text-white bg-blend-darken ">
            {/* Image*/}
            <div className="img w-[300px] h-[450px] flex-none ">
              <img
                src={base_url + tvDetail.poster_path}
                alt="Movie Title Picture"
                className="rounded-xl w-full h-full"
              />
            </div>
            {/* Content*/}
            <section className="content flex flex-col  pl-10">
              <div className="mb-10 space-x-1 ">
                <h2 className="text-4xl font-bold ">
                  {tvDetail.name}
                  <span className="text-4xl text-gray-200 font-normal">
                    {" (" + tvDetail.first_air_date.slice(0, 4) + ")"}
                  </span>
                </h2>
                <div className="flex items-center">
                  <span className="">
                    {new Date(tvDetail.first_air_date).toLocaleDateString(
                      navigator.language,
                      {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                    {tvDetail.production_countries.length != 0
                      ? " (" +
                        tvDetail.production_countries[
                          tvDetail.production_countries.length - 1
                        ].iso_3166_1 +
                        ")"
                      : null}
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
                  {tvDetail.genres.map((item, index) => (
                    <span key={item.id}>
                      {item.name}
                      {index !== tvDetail.genres.length - 1 ? "," : null}
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
                  {/* <span>
                    {hours}h {minutes}m
                  </span> */}
                </div>
              </div>

              {/* User Score / Trailer */}
              <div className="flex items-center">
                {/* Circular Progress Meter */}

                <div className="flex justify-between gap-2 items-center ">
                  <div
                    className="relative h-16 w-16 rounded-full flex items-center justify-center border-4 border-black hover:scale-105 transition-all isolation-auto "
                    style={{
                      backgroundImage: `conic-gradient(${
                        tvDetail.vote_average > 9
                          ? "hsl(116deg 100% 50%)"
                          : tvDetail.vote_average > 8
                          ? "hsl(104deg 100% 50%)"
                          : tvDetail.vote_average > 7
                          ? "hsl(93deg 100% 50%)"
                          : tvDetail.vote_average > 6
                          ? "hsl(81deg 100% 50%)"
                          : tvDetail.vote_average > 5
                          ? "hsl(70deg 100% 50%)"
                          : tvDetail.vote_average > 4
                          ? "hsl(58deg 100% 50%)"
                          : tvDetail.vote_average > 3
                          ? "hsl(35deg 100% 50%)"
                          : tvDetail.vote_average > 2
                          ? "hsl(12deg 100% 49%)"
                          : tvDetail.vote_average > 1
                          ? "hsl(0deg 100% 49%)"
                          : null
                      } ${Math.round(
                        ((tvDetail.vote_average * 10) / 100) * 360
                      )}deg, ${0}deg, rgb(24, 18, 18))`,
                    }}
                  >
                    <div className="absolute h-12 w-12 bg-black rounded-full text-white text-center  font-bold flex items-center justify-center ">
                      {Math.round(tvDetail.vote_average * 10)}
                      <sup>%</sup>
                    </div>
                  </div>
                  <p className="text-base font-bold break-word w-16">
                    User Score
                  </p>
                </div>
                {tvDetail.videos.results.filter((item) => {
                  return item.official === true && item.type === "Trailer";
                }).length < 0 ? (
                  <button
                    className="btn flex items-center font-semibold p-2 bg-black/60 hover:shadow-lg transition-all hover:bg-black/70 rounded-md hover:scale-105 "
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
                ) : null}
              </div>
              {/* Overview */}

              <div className="min-h-[150px]">
                <p className="mb-2 italic text-gray-400">{tvDetail.tagline}</p>
                <h3 className="text-2xl mb-4 leading-tight">Overview</h3>
                <p className="">
                  {tvDetail.overview ||
                    `We don't have an overview translated in English. Help us expand our database by adding one.`}
                </p>
              </div>
              {tvDetail.homepage && (
                <a href={tvDetail.homepage}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M16.36 14c.08-.66.14-1.32.14-2c0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2m-5.15 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56M14.34 14H9.66c-.1-.66-.16-1.32-.16-2c0-.68.06-1.35.16-2h4.68c.09.65.16 1.32.16 2c0 .68-.07 1.34-.16 2M12 19.96c-.83-1.2-1.5-2.53-1.91-3.96h3.82c-.41 1.43-1.08 2.76-1.91 3.96M8 8H5.08A7.923 7.923 0 0 1 9.4 4.44C8.8 5.55 8.35 6.75 8 8m-2.92 8H8c.35 1.25.8 2.45 1.4 3.56A8.008 8.008 0 0 1 5.08 16m-.82-2C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2c0 .68.06 1.34.14 2M12 4.03c.83 1.2 1.5 2.54 1.91 3.97h-3.82c.41-1.43 1.08-2.77 1.91-3.97M18.92 8h-2.95a15.65 15.65 0 0 0-1.38-3.56c1.84.63 3.37 1.9 4.33 3.56M12 2C6.47 2 2 6.5 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z"
                    />
                  </svg>
                </a>
              )}

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
                  {/* <iframe
                          allow=" autoplay;"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                          src={`https://youtube.com/embed/${
                            tvDetail.videos.results.filter((item) => {
                              return (
                                item.official === true && item.type === "Trailer"
                              );
                            })[0].key
                          }?enablejsapi=1&version=3&playerapiid=ytplayer`}
                        ></iframe> */}
                </div>
              </dialog>
            </section>
          </div>
        </section>

        {/* Main Section */}
        <article className=" mx-auto flex max-w-screen-xl  p-10">
          <section className=" min-w-[75%] pr-10">
            <TopBilledCast castData={tvDetail.credits} movieId={tvDetail.id} />
            <Social reviews={tvDetail.reviews.results} />
            <MediaBar movieData={tvDetail} />
            {/* {tvDetail.belongs_to_collection && <div className=""></div>} */}
            {/* {tvDetail.belongs_to_collection && ( */}
            {/* <MovieCollection movieDetail={tvDetail} /> */}
            {/* )} */}
            <Recommendations
              recommendations={tvDetail.recommendations.results}
            />
          </section>
          <MovieDetailAside itemDetail={tvDetail} />
        </article>
      </main>
    </div>
  );
}
export default TVShowDetail;
