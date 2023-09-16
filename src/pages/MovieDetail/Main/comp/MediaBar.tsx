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

  function handelClick() {
    setLoadNumber(loadNumber + 5);
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
              onClick={() => {
                setLoadNumber(5);
                console.log("video");
                toggleTab(videos, images, posters);
                dispatch({ type: "video" });
              }}
            >
              Videos
            </li>
            <li
              onClick={() => {
                console.log("backdrops");
                setLoadNumber(5);

                toggleTab(images, videos, posters);

                dispatch({ type: "backdrops" });
              }}
            >
              Backdrops
            </li>
            <li
              onClick={() => {
                console.log("posters");
                setLoadNumber(5);

                toggleTab(posters, images, videos);

                dispatch({ type: "posters" });
              }}
            >
              Posters
            </li>
          </ul>
        </nav>
      </header>

      {/* videos */}
      <div className="h-[300px]   bg-gray-200  " ref={content}>
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
          </div>
        ) : null}

        {/* backdrops */}
        {data && state.backdrops === true ? (
          <div className="flex overflow-auto h-full  scb" id="backdrops">
            {data.images.backdrops.slice(0, loadNumber).map((item) => {
              return <BackdropTab item={item} key={item.file_path} />;
            })}
          </div>
        ) : null}

        {/* posters */}

        {data && state.poster === true ? (
          <div id="posters" className="flex overflow-auto h-full scb ">
            {data.images.posters.slice(0, loadNumber).map((item) => {
              return <PosterTab item={item} key={item.file_path} />;
            })}
          </div>
        ) : null}

        {state.video === true &&
        data &&
        loadNumber < data?.videos.results.length ? (
          <LoadMoreBtn func={handelClick} />
        ) : null}
        {state.backdrops === true &&
        data &&
        loadNumber < data?.images.backdrops.length ? (
          <LoadMoreBtn func={handelClick} />
        ) : null}
        {state.poster === true &&
        data &&
        loadNumber < data?.images.posters.length ? (
          <LoadMoreBtn func={handelClick} />
        ) : null}
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
