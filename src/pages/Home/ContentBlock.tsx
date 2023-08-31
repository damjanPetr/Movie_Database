import { Link } from "react-router-dom";
import {} from "react";
import {
  base_url,
  getDiscoverMovies,
  getDiscoverTV,
  getPopularTv,
  getTrending,
} from "../../api/api";

import { useEffect, useState, useRef } from "react";
export type MovieProps = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export interface Movie {
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
  // const [change, dispatch] = useReducer(reducer, data);
  const target = useRef<HTMLDivElement>(null);
  // console.log("🚀 ~ file: ContentBlock.tsx:45 ~ change:", change);
  const [state, setState] = useState(data);
  const [change, setChange] = useState("");

  useEffect(() => {
    (async () => {
      switch (change) {
        case "trendingToday": {
          const actionData = await getTrending();
          setState(actionData);
          break;
        }
        case "trendingWeek": {
          const actionData = await getTrending(true);
          setState(actionData);

          break;
        }
        case "in_theathers": {
          const actionData = await getDiscoverMovies(
            "region=US&with_release_type=3|2"
          );
          setState(actionData);

          break;
        }

        case "on_tv": {
          const actionData = await getPopularTv();

          setState(actionData);

          break;
        }

        case "streaming": {
          const actionData = await getDiscoverMovies(
            "watch_region=US&with_watch_monetization_types=flatrate"
          );
          setState(actionData);

          break;
        }

        case "for_rent": {
          const actionData = await getDiscoverMovies(
            "watch_region=US&with_watch_monetization_types=rent"
          );
          setState(actionData);

          break;
        }
        case "free_movies": {
          const actionData = await getDiscoverMovies(
            "watch_region=US&with_watch_monetization_types=free"
          );

          setState(actionData);

          break;
        }
        case "free_tv": {
          const actionData = await getDiscoverTV(
            "watch_region=US&with_watch_monetization_types=free"
          );
          setState(actionData);

          break;
        }
        default:
          return "huenoa";
      }
      target.current?.classList.add("animate-fading");
    })();
    const targetCopy = target.current;
    return () => {
      targetCopy?.classList.remove("animate-fading");
    };
  }, [change]);
  // useEffect(() => {
  //   setTimeout(() => {
  //     target.current?.classList.add("animate-fading");
  //   }, 10);
  //   const targetCopy = target.current;

  //   return () => {
  //     targetCopy?.classList.remove("animate-fading");
  //   };
  // }, [state]);

  return (
    <div className=" p-4">
      <div className="flex items-center justify-start gap-4 ">
        <h1 className="mr-6 p-2 text-xl font-bold">{title}</h1>
        <div className=" flex rounded-full border-2">
          {buttons.map((item, index) => {
            return (
              <div
                key={index}
                id="form1"
                className={`rounded-full px-3 py-1 ${
                  index === 0 ? "activeBtnHome" : ""
                }`}
                onClick={(e) => {
                  e.currentTarget.parentElement
                    ?.querySelectorAll("#form1")
                    .forEach((item) => {
                      item.classList.remove("activeBtnHome");
                    });
                  e.currentTarget.classList.add("activeBtnHome");
                }}
              >
                <button
                  className=""
                  onClick={() => {
                    setChange(item.methodName);
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
        className="scb flex overflow-y-scroll scroll-auto bg-slate-700 p-4"
        ref={target}
      >
        {state.results.map((item: Movie) => {
          return (
            <Link
              key={item.id}
              to={`/${item.id}/details`}
              className="hover:scale-110 "
            >
              <div className="">
                <div className="scb ml-4 w-max">
                  <img
                    src={base_url + item.poster_path}
                    alt={item.title + "image"}
                    className="w-[140px] rounded-lg"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
