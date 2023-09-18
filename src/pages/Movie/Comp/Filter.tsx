import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoMdCheckbox, IoMdCheckmark } from "react-icons/io";
import { GiCheckMark } from "react-icons/gi";

import {
  getDBCounties,
  getWatchProvidersRegionMovie,
  still_92,
} from "../../../api/api";
import { Countries, MovieProvidersGeneral, genres } from "../../../types/types";
import { getFlag, getHighlight } from "../../../utils/func";
import { useCountry } from "../../../utils/hooks";
import Card from "./Card";

export type stateReducer = {
  searchFilter: string;
  searchOpen: boolean;
  filterUrl: "";
  whereToWatchOpen: boolean;
  countryCode: {
    text: string | { [key: string]: any };
    engFullName: string;
  };
  filter: string;
};

export type actionReducer =
  | { type: "open_search" }
  | { type: "open_where_to_watch" }
  | {
      type: "change_country";
      countryData: { text: string; engFullName: string };
    }
  | { type: "change_sort_filter"; text: string }
  | { type: "filtering" | ""; text: string | null; countryData?: object };

export type Props = {
  genres: genres;
};
function Filter({ genres }: Props) {
  const [watchProviders, setWatchProviders] = useState<MovieProvidersGeneral>();

  const country = useCountry();

  const target = useRef<HTMLLIElement>(null);
  const [countries, setCountries] = useState<Countries>([]);
  const [searchTerm, setSearchTerm] = useState<{
    type: "filtering" | "";
    text: string | null;
  }>({
    type: "",
    text: "",
  });

  const reducer = (
    state: stateReducer,
    action: actionReducer
  ): stateReducer => {
    switch (action.type) {
      case "open_search": {
        return {
          ...state,
          searchOpen: !state.searchOpen,
        };
      }
      case "change_sort_filter": {
        return {
          ...state,
          searchFilter: action.text,
        };
      }
      case "open_where_to_watch": {
        return {
          ...state,
          whereToWatchOpen: !state.whereToWatchOpen,
        };
      }
      case "change_country": {
        return {
          ...state,
          countryCode: {
            text: action.countryData.text,
            engFullName: action.countryData.engFullName,
          },
        };
      }
      case "filtering": {
        if (action.text === null) {
          return { ...state, filter: "" };
        } else {
          return { ...state, filter: action.text };
        }
      }
      default:
        return state as stateReducer;
    }
  };

  useEffect(() => {
    (async () => {
      const data = await getDBCounties();
      setCountries(data);
      data.forEach((item) => {
        if (item.iso_3166_1.toLowerCase() === country?.toLowerCase()) {
          dispatch({
            type: "change_country",
            countryData: {
              text: item.iso_3166_1,
              engFullName: item.english_name,
            },
          });
        }
      });
      if (country) {
        const regions = await getWatchProvidersRegionMovie(country);
        setWatchProviders(regions);
      }
    })();
  }, [country]);

  const [state, dispatch] = useReducer(reducer, {
    searchFilter: "Popularity Ascending",
    searchOpen: false,
    filterUrl: "",
    whereToWatchOpen: false,
    countryCode: {
      text: "",
      engFullName: "",
    },
    filter: "",
  });

  const { searchOpen, searchFilter, whereToWatchOpen, countryCode, filter } =
    state;

  useEffect(() => {
    if (searchTerm.type != undefined) {
      const delayDebounceFn = setTimeout(() => {
        if (searchTerm.type === "filtering") {
          if (typeof searchTerm.text == "string") {
            dispatch(searchTerm);
          }
        }
      }, 400);
      return () => clearTimeout(delayDebounceFn);
    }
  }, [searchTerm]);
  const memoizeFilter = useMemo(() => {
    const play = countries.sort().filter((item) => {
      if (filter !== "") {
        return item.english_name.toLowerCase().includes(filter.toLowerCase());
      } else if (filter === "") {
        return true;
      }
    });
    return play;
  }, [countries, filter]);

  return (
    <aside className="w-64">
      <Card title="Sort">
        <p className="mb-2">Sort Results By</p>
        <div
          className={
            "relative z-10 flex items-center justify-between  rounded-md bg-neutral-300 px-4 py-2 text-sm"
          }
          onClick={() => {
            dispatch({
              type: "open_search",
            });
            // target.current?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="">{searchFilter}</span>
          <span className={searchOpen ? "rotate-90" : ""}>
            <RiArrowRightSLine />
          </span>
          <ul
            className={
              "absolute top-[calc(100%+0.5rem)]  max-h-[250px] w-full -translate-x-4 flex-col justify-start overflow-auto " +
              (searchOpen ? "flex" : "hidden")
            }
          >
            {[
              { value: "popularity.desc", name: "Popularity Descending" },
              { value: "popularity.asc", name: "Popularity Ascending" },
              { value: "vote_average.desc", name: "Rating Descending" },
              { value: "vote_average.asc", name: "Rating Ascending" },
              {
                value: "primary_release_date.desc",
                name: "Release Date Descending",
              },
              {
                value: "primary_release_date.asc",
                name: "Release Date Ascending",
              },
              { value: "title.asc", name: "Title (A-Z)" },
              { value: "title.desc", name: "Title (Z-A)" },
            ].map(({ value, name }, index) => {
              return (
                <li
                  key={index}
                  className={
                    "bg-stone-50 p-2 hover:cursor-pointer hover:bg-stone-200 " +
                    (searchFilter === name ? "bg-violet-100 font-bold" : "")
                  }
                  data-value={value}
                  onClick={() => {
                    dispatch({ type: "change_sort_filter", text: name });
                    target.current?.scrollIntoView({
                      behavior: "instant",
                      block: "center",
                      inline: "center",
                    });
                  }}
                >
                  {name}
                </li>
              );
            })}
          </ul>
        </div>
      </Card>
      <Card title="Where To Watch">
        <p className="mb-2">Country</p>
        <div
          className="relative flex items-center justify-between rounded-md bg-neutral-300 px-4 py-2"
          onClick={async function (e) {
            if (
              e.target === e.currentTarget ||
              (e.target as HTMLElement).tagName.toLowerCase() !== "input"
            ) {
              await dispatch({ type: "open_where_to_watch" });
              // target.current?.scrollIntoView({
              //   behavior: "auto",
              //   block: "center",
              // });
            }
          }}
        >
          <div className="   flex items-center text-sm">
            {/* geolocationFlag */}
            {countryCode.text && (
              <img
                src={getFlag((countryCode.text as string).toLowerCase())}
                className="mr-2 w-8"
              ></img>
            )}
            {/* geolocation Name */}
            {/* {countryCode && */}
            {/* new Intl.DisplayNames(undefined, { type: "region" }).of( */}
            {/* countryCode.text */}
            {/* )} */}
            {countryCode.engFullName}
          </div>
          <span>
            <RiArrowRightSLine />
          </span>

          <div
            className={
              "absolute top-full z-10 -inset-x-10  flex-col  flex transition-all " +
              (whereToWatchOpen ? "opacity-100" : "opacity-0 hidden")
            }
          >
            <div className=" bg-stone-50 p-4">
              <div className="flex items-center rounded-md  border-2 border-blue-500">
                <form>
                  <input
                    type="text"
                    name="searchCountry"
                    id="searchCountry"
                    autoFocus
                    tabIndex={0}
                    className=" p-2 outline-none"
                    onInput={(e) => {
                      e.preventDefault();
                      if (e.currentTarget.value.length === 0) {
                        setSearchTerm({
                          type: "filtering",
                          text: null,
                        });
                      } else {
                        const key = e.currentTarget.value;
                        setSearchTerm({ type: "filtering", text: key });
                      }
                    }}
                  />
                </form>
                <div className=" mr-2 bg-white text-xl ">
                  <BiSearch />
                </div>
              </div>
            </div>
            <ul
              className={
                "  max-h-[300px] overflow-auto bg-stone-50 " +
                (filter ? "[&_li:first-child]:bg-neutral-100" : "bg-stone-50 ")
              }
            >
              {memoizeFilter.map((item) => {
                return (
                  <li
                    onClick={() => {
                      dispatch({
                        type: "change_country",
                        countryData: {
                          text: item.iso_3166_1,
                          engFullName: item.english_name,
                        },
                      });
                    }}
                    key={item.iso_3166_1}
                    ref={
                      item.iso_3166_1.toLowerCase() ===
                      countryCode.text?.toLocaleLowerCase()
                        ? target
                        : undefined
                    }
                    className={
                      "flex items-center  px-4 py-2 text-sm  hover:bg-stone-200 " +
                      (item.iso_3166_1.toLowerCase() ===
                      countryCode.text?.toLocaleLowerCase()
                        ? "bg-violet-100 font-bold "
                        : "")
                    }
                  >
                    <img className="w-6" src={getFlag(item.iso_3166_1)}></img>
                    {filter ? (
                      <p className="ml-2 ">
                        <span>
                          {getHighlight(item.english_name, filter)?.left}
                        </span>
                        <span className="bg-red-400 ">
                          {getHighlight(item.english_name, filter)?.middle}
                        </span>
                        <span>
                          {getHighlight(item.english_name, filter)?.right}
                        </span>
                      </p>
                    ) : (
                      <span className="ml-2 ">{item.english_name}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="watch providers mt-4 flex w-full flex-wrap">
          {watchProviders &&
            watchProviders.results.map((item) => {
              return (
                <div
                  className="group relative  w-full basis-1/4 flex-wrap "
                  key={item.provider_id}
                >
                  <div className="m-1 basis-1/4 cursor-pointer">
                    <img
                      className="rounded-lg"
                      src={still_92 + item.logo_path}
                      alt="Watch Provider logo-picture "
                    />
                  </div>
                  <div
                    className={`absolute -inset-x-[200%] bottom-full  mx-auto  mb-2 hidden w-max rounded-lg bg-neutral-900 px-4 py-2 text-lg  text-white group-hover:block `}
                  >
                    {item.provider_name}
                  </div>
                  <div className="triable absolute inset-x-0 -top-3  mx-auto hidden h-0  w-0  border-[10px]  border-transparent  border-t-blue-900 group-hover:block"></div>
                  <div className="absolute inset-0  m-auto hidden h-[calc(100%-4px)] w-[calc(100%-4px)] rounded-xl bg-sky-500/90 group-hover:block">
                    <div className="absolute inset-0    items-center justify-center text-4xl text-white group-hover:flex">
                      <GiCheckMark />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
      <Card title="Filter" padding={0}>
        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Avalibilities</h3>
          <input className="peer" type="checkbox" name="main" id="main" />
          <label
            htmlFor="main"
            className="inline-block ml-1.5  justify-start w-30 "
          >
            Search all availabilities?
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-20 "
          >
            <input className="mr-1" type="checkbox" name="stream" id="stream" />
            Stream
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-20 "
          >
            <input className="mr-1" type="checkbox" name="free" id="free" />
            Free
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-20 "
          >
            <input className="mr-1" type="checkbox" name="ads" id="ads" />
            Ads
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-20 "
          >
            <input className="mr-1" type="checkbox" name="rent" id="rent" />
            Rent
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-20 "
          >
            <input className="mr-1" type="checkbox" name="buy" id="buy" />
            Buy
          </label>
          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>
        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Release Dates</h3>
          <input type="checkbox" name="main" id="main" className="peer" />
          <label
            htmlFor="main"
            className="inline-block ml-1.5  justify-start w-30 "
          >
            Search all releases?
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-30 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="countries"
              id="countries"
            />
            Search All Countries?
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-30 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="premiere"
              id="premiere"
            />
            Premiere
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-30 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="theatrical-limited"
              id="theatrical-limited"
            />
            Theatrical (Limited)
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-30 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="theatrical"
              id="theatrical"
            />
            Theatrical
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-30 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="digital"
              id="digital "
            />
            Digital
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-30 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="physical"
              id="physical"
            />
            Physical
          </label>
          <label
            htmlFor=""
            className="peer-checked:flex hidden  justify-start w-30 "
          >
            <input className="mr-1" type="checkbox" name="tv" id="tv" />
            TV
          </label>

          <div className="flex justify-between items-center mt-4 ">
            <label className="text-gray-400" htmlFor="formDate">
              form:
            </label>{" "}
            <input
              className="p-1.5 outline-none  border border-blue-200 text-sm font-light focus:ring-1 ring-blue-300 rounded-sm"
              type="date"
              name="formDate"
              id="formDate"
            />
          </div>
          <div className="flex justify-between items-center ">
            <label className="text-gray-400" htmlFor="toDate">
              to:
            </label>{" "}
            <input
              className="p-1.5 outline-none  border border-blue-200 text-sm font-light focus:ring-1 ring-blue-300 rounded-sm"
              type="date"
              name="toDate"
              id="toDate"
            />
          </div>

          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>
        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Genres</h3>

          <ul className="flex flex-wrap gap-2">
            {genres &&
              genres.genres.map((item) => {
                return (
                  <li
                    onClick={(e) => {}}
                    className="px-3 py-1  rounded-full text-sm border-[0.8px] bg-white border-black "
                  >
                    {item.name}
                  </li>
                );
              })}
          </ul>

          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>

        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Network</h3>
          <div className="fci mb-4">
            <div className="inner flex items-center relative ">
              <input
                type="text"
                name=" "
                id=""
                placeholder="Filter By Tv Networks"
                className="peer w-full  px-3 py-1.5 rounded-sm outline-none text-sm   ring-blue-200 focus:ring-blue-400  ring-1  "
                onKeyUp={(e) => {
                  const target = e.target as HTMLInputElement;
                  if (target.value.length !== 0) {
                    target.dataset.type = "search";
                  } else {
                    target.dataset.type = "";
                  }
                }}
              />
              <div className="flex-1  peer-data-[type=search]:opacity-100 transition-opacity opacity-0 absolute right-1 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800">
                <svg
                  onClick={function (e: React.MouseEvent) {
                    const input =
                      e.currentTarget.parentElement?.parentElement?.querySelector(
                        "input"
                      ) as HTMLInputElement;
                    input.value = "";
                    input.dataset.type = "";
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  className="w-full"
                  height="18"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>

        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Certification</h3>
          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>
        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Language</h3>
          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>
        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">User Score</h3>
          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>
        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Minimum User Scores</h3>
          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>
        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Runtime</h3>
          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>
        <div className="    p-3.5 ">
          <h3 className="font-light mb-2.5">Keywords</h3>
          <div className="relative w-[calc(100%+4rem);] top-0 h-[0.2px] -left-8 bg-gray-100"></div>
        </div>
        <div className="  fci">
          <div className="">hetuaoen</div>
        </div>
      </Card>
    </aside>
  );
}
export default Filter;
