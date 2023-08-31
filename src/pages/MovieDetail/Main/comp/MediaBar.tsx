import { useEffect, useState, useReducer, useRef } from "react";
import { base_url, getImages, getVideos } from "../../../../api/api";
import { MovieImages, MovieVideos } from "../../../../types/types";
import LoadMore from "./LoadMore";

export type State =
  | {
      video: true;
      backdrop: false;
      poster: false;
      data: MovieVideos;
    }
  | {
      video: false;
      backdrop: true;
      poster: false;
      data: MovieImages;
    }
  | {
      video: false;
      backdrop: false;
      poster: true;
      data: MovieImages;
    }
  | {
      video: false;
      backdrop: false;
      poster: false;
      data: null;
    };

export type Actions =
  | {
      type: "video";
      arg: MovieVideos;
    }
  | {
      type: "posters";
      arg: MovieImages;
    }
  | {
      type: "backdrops";
      arg: MovieImages;
    };

export default function MediaBar({ movieId }: { movieId: number }) {
  const [loadBtn, setLoadBtn] = useState(true);
  const scrollTarget = useRef<HTMLDivElement>(null);
  const initialState: State = {
    video: false,
    backdrop: false,
    poster: false,
    data: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setTimeout(() => {
      if (scrollTarget.current != null) {
        scrollTarget.current.scrollBy(1100, 0);
      }
    }, 1100);
  }, [loadBtn]);

  function limitData<T extends MovieImages | MovieVideos>(limit: T) {
    const original: T = structuredClone(limit);
    if ("results" in limit) {
      const pass = limit.results.slice(0, 5);
      if (limit.results.length <= 5) {
        setLoadBtn(false);
      }
      limit.results = pass;
      return { original, data: limit };
    } else {
      const pass = limit.backdrops.slice(0, 5);
      const passPosters = limit.posters.slice(0, 5);

      if (limit.backdrops.length <= 5) {
        setLoadBtn(false);
      }
      if (limit.posters.length <= 5) {
        setLoadBtn(false);
      }
      limit.backdrops = pass;
      limit.posters = passPosters;
      return { original, data: limit };
    }
  }

  return (
    <div className="mediaBar h-full">
      <header className="flex items-center ">
        <div className="logo">
          <h3>Media</h3>
        </div>
        <nav className="ml-auto mr-8">
          <ul className="ml-auto flex gap-4">
            <li>Most Popular</li>
            <li
              onClick={() => {
                getVideos(movieId).then((arg) => {
                  const { data } = limitData<MovieVideos>(arg);
                  dispatch({
                    type: "video",
                    arg: data,
                  });
                });
              }}
            >
              Videos
            </li>
            <li
              onClick={() => {
                getImages(movieId).then((arg) => {
                  const { data } = limitData<MovieImages>(arg);
                  dispatch({ type: "backdrops", arg: data });
                });
              }}
            >
              Backdrops
            </li>
            <li
              onClick={() => {
                getImages(movieId).then((arg) => {
                  const { data } = limitData<MovieImages>(arg);
                  dispatch({
                    type: "posters",
                    arg: data,
                  });
                  // if (scrollTarget.current != null) {
                  //   scrollTarget.current.scroll(
                  //     scrollTarget.current.clientWidth / 2,
                  //     0
                  //   );
                  // }
                });
              }}
            >
              Posters
            </li>
          </ul>
        </nav>
      </header>
      <div
        className="always flex h-full   items-center overflow-x-auto bg-gray-200  p-4 "
        ref={scrollTarget}
      >
        {state.video &&
          state.data.results.map((item) => (
            <div className="scb flex items-center gap-2  " key={item.id}>
              {item.site.toLowerCase() === "youtube" && (
                <iframe src={`https://youtube.com/embed/${item.key}`}></iframe>
              )}
            </div>
          ))}
        {state.backdrop &&
          state.data.backdrops.map((item) => {
            return (
              <img
                src={base_url + item.file_path}
                alt=""
                className=" mr-2  max-h-full rounded-lg"
              />
            );
          })}
        {state.poster
          ? state.data.posters.map((item) => {
              return (
                <img
                  src={base_url + item.file_path}
                  alt=""
                  className=" mr-2  max-h-full rounded-lg"
                />
              );
            })
          : null}
        {loadBtn === true && (
          <LoadMore
            func={function handelClick() {
              setLoadBtn(false);
              if (state.poster) {
                getImages(movieId).then((arg) => {
                  dispatch({ type: "posters", arg: arg });
                });
              }
              if (state.backdrop) {
                getImages(movieId).then((arg) => {
                  // if (scrollTarget.current != null) {
                  //   scrollTarget.current.scroll(-19199, 20200);
                  // }
                  dispatch({ type: "backdrops", arg: arg });
                });
              }
              if (state.video) {
                getVideos(movieId).then((arg) => {
                  dispatch({ type: "video", arg: arg });
                });
              }
            }}
          />
        )}
      </div>
    </div>
  );
}

function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case "video": {
      return {
        ...state,
        video: true,
        backdrop: false,
        poster: false,
        data: action.arg,
      };
    }
    case "backdrops": {
      return {
        video: false,
        backdrop: true,
        poster: false,
        data: action.arg,
      };
    }
    case "posters": {
      return {
        video: false,
        backdrop: false,
        poster: true,
        data: action.arg,
      };
    }
    default: {
      return state as State;
    }
  }
}
