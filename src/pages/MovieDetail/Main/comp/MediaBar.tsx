import { useEffect, useState, useReducer, useRef } from "react";
import { base_url, getImages, getVideos } from "../../../../api/api";
import {
  MovieDetails,
  MovieImages,
  MovieVideos,
} from "../../../../types/types";
import LoadMoreBtn from "./mediaBarComp/LoadMoreBtn";
import BackdropTab from "./mediaBarComp/BackdropTab";
import MovieDetail, { movieDetailLoader } from "../MovieDetail";
import VideoTab from "./mediaBarComp/VideoTab";
import PosterTab from "./mediaBarComp/PosterTab";

/* reducer types */
export type State =
  | {
      video: true;
      backdrops: false;
      poster: false;
    }
  | {
      video: false;
      backdrops: true;
      poster: false;
    }
  | {
      video: false;
      backdrops: false;
      poster: true;
    }
  | {
      video: false;
      backdrops: false;
      poster: false;
    };

export type Actions =
  | {
      type: "video";
    }
  | {
      type: "posters";
    }
  | {
      type: "backdrops";
    };

export default function MediaBar({ movieData }: { movieData: MovieDetails }) {
  /**
   *
   */
  function toggleTab<T extends Element | null | undefined>(
    displayTab: T,
    ...args: T[]
  ) {
    if (displayTab instanceof Element && args instanceof Element) {
      args.forEach((tab) => {
        if (tab instanceof Element) {
          tab.classList.add("hidden");
        }
      });
      displayTab.classList.remove("hidden");
    }
  }

  function handelClick(e: MouseEvent) {
    setLoadNumber(loadNumber + 5);

    setTimeout(() => {
      if (e.target instanceof HTMLButtonElement && e.target !== null) {
        e.target?.parentElement?.parentElement?.scrollBy({
          left: 400,
          top: 0,
          behavior: "smooth",
        });
      }
    }, 80);
  }

  const [loadNumber, setLoadNumber] = useState(5);

  //change use state to load more items

  const [data, setData] = useState<MovieDetails>();

  const content = useRef<HTMLDivElement>(null);

  const videos = content.current?.querySelector("#videos");
  const images = content.current?.querySelector("#images");
  const posters = content.current?.querySelector("#posters");

  const initialState: State = {
    video: false,
    backdrops: false,
    poster: false,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      // const movieData = await movieDetailLoader(movieId);
      setData(movieData);
    })();
  }, [movieData]);

  return (
    <div className="mediaBar  mt-4 p-2">
      <header className="flex items-center ">
        <div className="logo">
          <h3 className="text-xl font-bold mb-2 ml-1.5">Media</h3>
        </div>
        <nav className="ml-auto mr-8 shadowAside">
          <ul className="ml-auto flex gap-4">
            <li>Most Popular</li>
            <li
              className="text-base font-semibold"
              onClick={() => {
                setLoadNumber(5);
                console.log("video");
                toggleTab(videos, images, posters);
                dispatch({ type: "video" });
              }}
            >
              Videos{" "}
              <span className="text-gray-500 ml-1 ">
                {movieData.videos.results.length}
              </span>
            </li>
            <li
              className="text-base font-semibold"
              onClick={() => {
                console.log("backdrops");
                setLoadNumber(5);

                toggleTab(images, videos, posters);

                dispatch({ type: "backdrops" });
              }}
            >
              Backdrops
              <span className="text-gray-500 ml-1 ">
                {movieData.images.backdrops.length}
              </span>
            </li>
            <li
              className="text-base font-semibold"
              onClick={() => {
                console.log("posters");
                setLoadNumber(5);

                toggleTab(posters, images, videos);

                dispatch({ type: "posters" });
              }}
            >
              Posters
              <span className="text-gray-500 ml-1 ">
                {movieData.images.posters.length}
              </span>
            </li>
          </ul>
        </nav>
      </header>

      <div className="h-[300px] " ref={content}>
        {/* videos */}
        {data && state.video === true ? (
          <div
            id="videos"
            className="flex h-full items-stretch overflow-auto scb"
          >
            {data.videos.results
              .slice(0, loadNumber)
              // .filter((item) => {
              // console.log(item.type);
              // return item.type == "Trailer";
              // })
              .map((item) => (
                <VideoTab item={item} key={item.id} />
              ))}
            {data.videos.results.length > loadNumber ? (
              <LoadMoreBtn func={(e) => handelClick(e)} />
            ) : null}
          </div>
        ) : null}

        {/* backdrops */}
        {data && state.backdrops === true ? (
          <div className="flex overflow-auto h-full  scb" id="backdrops">
            {data.images.backdrops.slice(0, loadNumber).map((item) => {
              return <BackdropTab item={item} key={item.file_path} />;
            })}
            {data.images.posters.length > loadNumber ? (
              <LoadMoreBtn func={(e) => handelClick(e)} />
            ) : null}
          </div>
        ) : null}

        {/* posters */}

        {data && state.poster === true ? (
          <div id="posters" className="flex overflow-auto h-full scb ">
            {data.images.posters.slice(0, loadNumber).map((item) => {
              return <PosterTab item={item} key={item.file_path} />;
            })}
            {data.images.posters.length > loadNumber ? (
              <LoadMoreBtn func={(e) => handelClick(e)} />
            ) : null}
          </div>
        ) : null}

        {state.video === true &&
        data &&
        loadNumber < data?.videos.results.length
          ? // <LoadMoreBtn func={handelClick} />
            null
          : null}
        {state.backdrops === true &&
        data &&
        loadNumber < data?.images.backdrops.length
          ? // <LoadMoreBtn func={handelClick} />
            null
          : null}
        {state.poster === true &&
        data &&
        loadNumber < data?.images.posters.length
          ? // <LoadMoreBtn func={handelClick} />
            null
          : null}
      </div>
      <hr className="mt-10" />
    </div>
  );
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "video": {
      return {
        ...state,
        video: true,
        backdrops: false,
        poster: false,
      };
    }
    case "backdrops": {
      return {
        video: false,
        backdrops: true,
        poster: false,
      };
    }
    case "posters": {
      [];

      return {
        video: false,
        backdrops: false,
        poster: true,
      };
    }
    default: {
      return state as State;
    }
  }
}
