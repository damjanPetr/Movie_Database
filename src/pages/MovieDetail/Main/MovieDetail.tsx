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
import SeriesCast from "./comp/SeriesCast";
import SeasonSection from "./comp/SeasonSection";
import Recommendations from "./comp/Recommendations";
import Nav from "../../components/Nav";

export async function movieDetailLoader<T>(id: T) {
  const response = await fetch(apiURL + `/movie/${id}`, apiFetchOptions);
  return response.json();
}

export default function MovieDetail() {
  const { movieDetail /* mediaBarData */ } = useLoaderData() as {
    movieDetail: MovieDetails;
  };

  const { hours, minutes } = toHoursAndMinutes(movieDetail.runtime);

  return (
    <div className=" ">
      <Nav />
      <main className="">
        <article
          className="bg-black/40 bg-cover bg-center  bg-blend-darken"
          style={{
            backgroundImage: `url(${base_urlBg + movieDetail.backdrop_path})`,
          }}
        >
          <div className=" mx-auto flex w-11/12 items-start justify-center  bg-transparent p-4 text-white bg-blend-darken ">
            {/* Image*/}
            <div className="img min-w-[400px]">
              <img
                src={base_url + movieDetail.poster_path}
                alt="Movie Title Picture"
                className="rounded-xl "
              />
            </div>
            {/* Content*/}
            <section className="content flex flex-col p-4">
              <div className=" p-2">
                <div className="mb-10 mt-4 ">
                  <h2 className="text-3xl">
                    {" "}
                    {movieDetail.title}{" "}
                    <span className="text-3xl text-gray-300">
                      {" (" + movieDetail.release_date.slice(0, 4) + ")"}
                    </span>
                  </h2>
                  <p className="text-sm">
                    {movieDetail.release_date}{" "}
                    <span>
                      <span className="uppercase">
                        {movieDetail.original_language}
                      </span>
                    </span>
                  </p>
                  <div className="flex">
                    {movieDetail.genres.map((item) => (
                      <span
                        key={item.id}
                        className="mr-4 rounded-lg bg-stone-200 p-1"
                      >
                        {item.name}{" "}
                      </span>
                    ))}
                  </div>{" "}
                </div>
                <div className="min-h-[150px]">
                  <p className="mb-4 italic text-gray-400">
                    {movieDetail.tagline}
                  </p>
                  <p className="leading-relaxed">{movieDetail.overview}</p>
                </div>
              </div>
              {movieDetail.belongs_to_collection && (
                <div className="" key={movieDetail.belongs_to_collection.id}>
                  <h3 className="text-xl">
                    {movieDetail.belongs_to_collection.name}
                  </h3>
                  {/* <p>{movieDetail.belongs_to_collection.backdrop_path}</p> */}
                  {/* <p>{movieDetail.belongs_to_collection.poster_path}</p> */}
                </div>
              )}
              {movieDetail.homepage && <a href={movieDetail.homepage}></a>}
              {movieDetail.imdb_id && (
                <a
                  href={`https://www.imdb.com/title/${movieDetail.imdb_id}`}
                  className="w-min "
                >
                  <svg
                    id="home_img"
                    className="ipc-logo"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="32"
                    viewBox="0 0 64 32"
                    version="1.1"
                  >
                    <g fill="#F5C518">
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        rx="4"
                      ></rect>
                    </g>
                    <g
                      transform="translate(8.000000, 7.000000)"
                      fill="#000000"
                      fillRule="nonzero"
                    >
                      <polygon points="0 18 5 18 5 0 0 0"></polygon>
                      <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
                      <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
                      <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
                    </g>
                  </svg>
                </a>
              )}
              <p>
                {" "}
                {hours}h {minutes}m
              </p>
              {movieDetail.spoken_languages.map((item, index) => (
                <div key={index}>
                  <p>Languages:</p>
                  <div>{item.english_name}</div>
                  <p>{item.iso_639_1}</p>
                  <p>{item.name}</p>
                </div>
              ))}
              <p>Movie Status :{movieDetail.status}</p>
              {movieDetail.video && <p> Video:{movieDetail.video}</p>}
              <p className="">Vote Everage: {movieDetail.vote_average}</p>
              <p className="bg-blue-800">
                Vote Count: {movieDetail.vote_count}
              </p>
              <p>Budget: {movieDetail.budget}</p>
              <p>Total revenue: {movieDetail.revenue}</p>
            </section>
          </div>
        </article>
        <article className="container mx-auto flex  p-4">
          <section className="max-h-[500px] min-w-[70%]">
            <MediaBar movieId={movieDetail.id} />
            <SeriesCast />
            <SeasonSection />
            <Recommendations />
          </section>

          <section></section>
          <aside className="min-w-[30%]  p-2 shadow-lg">
            <div className="">
              <h3 className="mb-2">Made in :</h3>
              {movieDetail.production_countries.map((item, index) => (
                <div key={index} className="mb-2 flex justify-between gap-4">
                  <p>{item.name}</p>
                  <img
                    src={`https://flagcdn.com/20x15/${item.iso_3166_1.toLocaleLowerCase()}.png`}
                    srcSet={`https://flagcdn.com/40x30/${item.iso_3166_1.toLowerCase()}.png 2x, https://flagcdn.com/60x45/${item.iso_3166_1.toLowerCase()}.png 3x`}
                    width="30"
                    height="15"
                    alt="Ukraine"
                  ></img>
                </div>
              ))}
            </div>
            <div className="">
              <h3 className="mb-2">By : </h3>
              <ul>
                {movieDetail.production_companies.map((item, index) => (
                  <li key={index} className="flex justify-between gap-4">
                    {/* <p>{item.id}</p> */}
                    <p>{item.name}</p>
                    <img
                      src={base_url + item.logo_path}
                      className="h-10 max-w-[70px]"
                    ></img>
                    {/* <p>{item.origin_country}</p> */}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </article>
      </main>
    </div>
  );
}
