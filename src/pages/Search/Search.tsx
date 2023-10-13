import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { still_182 } from "../../api/api";
import { TvDetails } from "../../types/types";
import { Movie } from "../Home/comp/ContentBlock";
import { P } from "vitest/dist/reporters-5f784f42.js";

type Props = {
  data: {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  };
  data2: {
    page: number;
    results: TvDetails[];
    total_pages: number;
    total_results: number;
  };
};
function Search() {
  const { data, data2 } = useLoaderData() as Props;

  const [type, setType] = useState<"movies" | "tvshows">("movies");

  return (
    <div className="mx-auto max-w-screen-2xl">
      <main className="max-w-screen-xl mx-auto flex p-10 ">
        <section className="w-[30%]  p-4">
          <div className="rounded-xl shadow-md">
            <div className="flex w-full items-center justify-between bg-slate-900   text-center text-white p-5 text-xl font-bold rounded-t-xl ">
              <h3 className=" text-xl">Search Results</h3>
            </div>
            <div className="py-2  rounded-b-xl">
              <div
                className="cursor-pointer hover:bg-slate-300"
                onClick={() => {
                  setType("movies");
                }}
              >
                <div
                  className={`flex items-center justify-between px-6${
                    type === "movies" ? " bg-slate-200" : ""
                  }`}
                >
                  <p>Movies</p>
                </div>
              </div>
              <div
                className="cursor-pointer hover:bg-slate-300"
                onClick={(e) => {
                  setType("tvshows");
                }}
              >
                <div
                  className={`flex items-center justify-between px-6${
                    type === "tvshows" ? " bg-slate-200" : ""
                  }`}
                >
                  <p>Tv Shows</p>
                </div>
              </div>
            </div>
          </div>
          <Link
            to="/"
            className="text-gray-500 flex items-center text-xl ml-auto mt-5 font-medium"
          >
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m10 18l-6-6l6-6l1.4 1.45L7.85 11H20v2H7.85l3.55 3.55L10 18Z"
                />
              </svg>
            </span>
            Back
          </Link>
        </section>
        <div className="w-[70%] space-y-4 py-4">
          {data.results &&
            type === "movies" &&
            data.results.map((item) => {
              if ("release_date" in item) {
                return (
                  <div className="flex rounded-lg border shadow-md">
                    <div className="left w-24 flex-none  ">
                      <img
                        src={still_182 + item.poster_path}
                        alt=""
                        className="w-full bg-cover rounded-l-lg "
                      />
                    </div>
                    <div className="right flex flex-col justify-center ml-4 p-4">
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <h4 className="text-gray-400">
                        {new Date(item.release_date).toLocaleDateString(
                          navigator.language,
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                      </h4>

                      <p className="text-sm text-ellipsis line-clamp-2">
                        {item.overview}
                      </p>
                    </div>
                  </div>
                );
              }
            })}
          {type === "movies" && data.results.length === 0 ? (
            <p className="text-gray-500 ml-5 mt-5 ">
              There are no Movies that fit this search criteria
            </p>
          ) : null}
          {type === "tvshows" &&
            data2.results &&
            data2.results.map((item) => {
              return (
                <div className="flex rounded-lg border shadow-md">
                  <div className="left w-24 flex-none  ">
                    {item.poster_path ? (
                      <img
                        src={still_182 + item.poster_path}
                        alt=""
                        className="w-full bg-cover rounded-l-lg "
                      />
                    ) : (
                      <img></img>
                    )}
                  </div>
                  <div className="right flex flex-col justify-center ml-4 p-4">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <h4 className="text-gray-400">
                      {new Date(item.first_air_date).toLocaleDateString(
                        navigator.language,
                        { day: "numeric", month: "long", year: "numeric" }
                      )}
                    </h4>

                    <p className="text-sm text-ellipsis line-clamp-2">
                      {item.overview}
                    </p>
                  </div>
                </div>
              );
            })}
          {type === "tvshows" && data2.results.length === 0 ? (
            <p className="text-gray-500 ml-5 mt-5 ">
              There are no Tv Shows that fit this search criteria
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
export default Search;
