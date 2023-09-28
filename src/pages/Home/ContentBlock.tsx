import {} from "react";
import { Await, Link } from "react-router-dom";
import {
  getDiscoverMovies,
  getDiscoverTV,
  getMovieTrending,
  getPopularTv,
  still_182,
} from "../../api/api";

import React, { useEffect, useState } from "react";
export type MovieProps = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export interface Movie {
  name?: string;
  first_air_date?: string;
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path?: string;
  popularity: number;
  release_date: string;
  genre_ids: Array<number>;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function ContentBlock({
  title,
  data,
  buttons,
}: {
  title: string;
  data: MovieProps;
  buttons: { title: string; methodName: string }[];
}) {
  const [state, setState] = useState(data);
  const [change, setChange] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      switch (change) {
        case "trendingToday": {
          setLoading(true);
          const actionData = await getMovieTrending();
          setState(actionData);
          setLoading(false);

          break;
        }
        case "trendingWeek": {
          setLoading(true);

          const actionData = await getMovieTrending(true);
          setState(actionData);
          setLoading(false);

          break;
        }
        case "in_theathers": {
          setLoading(true);

          const actionData = await getDiscoverMovies(
            "region=US&with_release_type=3|2"
          );
          setState(actionData);
          setLoading(false);

          break;
        }

        case "on_tv": {
          setLoading(true);

          const actionData = await getPopularTv("popularTv", "1");

          setState(actionData);
          setLoading(false);

          break;
        }

        case "streaming": {
          setLoading(true);

          const actionData = await getDiscoverMovies(
            "with_watch_monetization_types=flatrate"
          );
          setState(actionData);
          setLoading(false);

          break;
        }

        case "for_rent": {
          setLoading(true);

          const actionData = await getDiscoverMovies(
            "watch_region=US&with_watch_monetization_types=rent"
          );
          setState(actionData);
          setLoading(false);

          break;
        }
        case "free_movies": {
          setLoading(true);

          const actionData = await getDiscoverMovies(
            "watch_region=US&with_watch_monetization_types=free"
          );

          setState(actionData);
          setLoading(false);

          break;
        }
        case "free_tv": {
          setLoading(true);

          const actionData = await getDiscoverTV(
            "watch_region=US&with_watch_monetization_types=free"
          );
          setState(actionData);
          setLoading(false);

          break;
        }

        default:
          return "";
      }
    })();
  }, [change]);

  return (
    <div
      className={`shadowAside mt-4 min-h-[370px]${
        loading ? "bg-red-900" : "bg-blue-900"
      }`}
    >
      <div className=" ml-4 flex items-center justify-start gap-4 ">
        <h1 className="ml-6 p-2 text-2xl font-semibold">{title}</h1>
        <div className=" flex rounded-full border-2">
          {buttons.map((item, index) => {
            return (
              <div
                key={item.title}
                id="form1"
                className={`rounded-full px-3 py-1 transition-all ${
                  index === 0 ? "activeBtnHome" : ""
                }`}
              >
                <button
                  className=""
                  onClick={(e) => {
                    setChange(item.methodName);

                    e.currentTarget?.parentElement?.parentElement
                      ?.querySelectorAll("#form1")
                      .forEach((item) => {
                        item.classList.remove("activeBtnHome");
                      });
                    e.currentTarget.parentElement?.classList.add(
                      "activeBtnHome"
                    );
                  }}
                >
                  {item.title}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className={`scb flex overflow-y-scroll scroll-auto  py-4  transition-opacity min-h-8  ${
          loading ? "" : ""
        }`}
      >
        <div className="spacer mr-4"></div>

        <React.Suspense fallback={<div></div>}>
          <Await
            resolve={state.results}
            errorElement={<div>Could not load reviews 😬</div>}
            children={(resolvedResuts) => {
              return resolvedResuts.map((item: Movie) => {
                if (loading) {
                  return (
                    <div className=" h-[340px] p-2  flex-none flex flex-col  ">
                      <div className="bg-gray-100 w-[140px]  rounded-lg border border-gray-300 h-[280px] ">
                        <div className="fci h-3/4 opacity-20">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            color="gray"
                            width="50"
                            height="50"
                            viewBox="0 0 256 256"
                          >
                            <g fill="currentColor">
                              <path
                                d="M224 56v122.06l-39.72-39.72a8 8 0 0 0-11.31 0L147.31 164l-49.65-49.66a8 8 0 0 0-11.32 0L32 168.69V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8Z"
                                opacity=".2"
                              />
                              <path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20l-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52l80 80H40Zm176 28h-21.37l-36-36l20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z" />
                            </g>
                          </svg>
                        </div>
                        <div className=" p-2 text-black mt-auto">
                          <p className="text-sm p-1  mt-2 h-2 rounded-full w-11/12 mx-auto bg-gray-200"></p>
                          <p className="text-sm p-1 mt-2 h-2 rounded-full w-11/12 mx-auto bg-gray-200"></p>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <Link
                      key={item.id}
                      to={
                        item.first_air_date
                          ? `/tv/${item.id}/details`
                          : `/movie/${item.id}/details`
                      }
                      className={`hover:scale-105 transition-all p-2 duration-200 ease-linear    ${
                        loading ? "opacity-0" : "opacity-100"
                      } `}
                    >
                      <div className="relative transition-all ">
                        <div className="hover:shadow-xl transition-shadow">
                          <div className="min-h-[200px] w-max">
                            <img
                              src={still_182 + item.poster_path}
                              alt={item.title + "image"}
                              className="w-[140px] rounded-t-lg   "
                            />
                          </div>
                        </div>
                        <div
                          className="absolute -bottom-2 right-0 h-10 w-10   rounded-full flex items-center justify-center   border-4 border-black hover:scale-105 transition-all delay-150"
                          style={{
                            backgroundImage: `conic-gradient(${
                              item.vote_average > 9
                                ? "hsl(116deg 100% 50%)"
                                : item.vote_average > 8
                                ? "hsl(104deg 100% 50%)"
                                : item.vote_average > 7
                                ? "hsl(93deg 100% 50%)"
                                : item.vote_average > 6
                                ? "hsl(81deg 100% 50%)"
                                : item.vote_average > 5
                                ? "hsl(70deg 100% 50%)"
                                : item.vote_average > 4
                                ? "hsl(58deg 100% 50%)"
                                : item.vote_average > 3
                                ? "hsl(35deg 100% 50%)"
                                : item.vote_average > 2
                                ? "hsl(12deg 100% 49%)"
                                : item.vote_average > 1
                                ? "hsl(1deg 100% 49%)"
                                : "hsl(0deg 100% 49%)"
                            } ${Math.round(
                              ((item.vote_average * 10) / 100) * 360
                            )}deg, ${0}deg, rgb(24, 18, 18))`,
                          }}
                        >
                          <div className="absolute text-sm   h-7 w-7 bg-black rounded-full text-white text-center  font-normal flex items-center justify-center ">
                            {Math.round(item.vote_average * 10)}
                            <sup>%</sup>
                          </div>
                        </div>
                      </div>
                      <div className=" p-2 text-black ">
                        <p className="text-sm font-bold mt-2">
                          {item.title
                            ? item.title
                            : item.name
                            ? item.name
                            : "----"}
                        </p>
                        <p className="">
                          {item.release_date != null
                            ? new Date(item.release_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : item.first_air_date
                            ? new Date(item.first_air_date).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "--/--/--"}
                        </p>
                      </div>
                    </Link>
                  );
                }
              });
            }}
          />
        </React.Suspense>
        <div className="spacer ml-4"></div>
      </div>
    </div>
  );
}
