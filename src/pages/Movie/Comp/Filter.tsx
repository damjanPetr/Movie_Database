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
import { Countries, MovieProvidersGeneral } from "../../../types/types";
import { getFlag, getHighlight } from "../../../utils/func";
import { useCountry } from "../../../utils/hooks";
import Card from "./Card";

export type stateReducer = {
  searchFilter: string;
  searchOpen: boolean;
  filterUrl: "";
  whereToWatchOpen: boolean;
  countryCode: {
    text: string;
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
  | { type: "filtering"; text: string };

function Filter() {
  const [watchProviders, setWatchProviders] = useState<MovieProvidersGeneral>();
  const country = useCountry();

  const target = useRef<HTMLLIElement>(null);
  const [countries, setCountries] = useState<Countries>([]);
  const [searchTerm, setSearchTerm] = useState<{
    type: string;
    text?: string | null;
  }>({
    type: "",
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
      const regions = await getWatchProvidersRegionMovie(country!);
      setWatchProviders(regions);
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
    if (searchTerm.type) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(searchTerm);
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
            target.current?.scrollIntoView({ behavior: "smooth" });
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
              target.current?.scrollIntoView({
                behavior: "auto",
                block: "center",
              });
            }
          }}
        >
          <div className="   flex items-center text-sm">
            {/* geolocationFlag */}
            {countryCode.text && (
              <img
                src={getFlag((countryCode.text as string).toLowerCase())}
                className="mr-2"
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
              "absolute top-full z-10 -translate-x-4 flex-col " +
              (whereToWatchOpen ? "flex" : "hidden")
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
                    <img src={getFlag(item.iso_3166_1)}></img>
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
      <Card title="Filter">hhhh</Card>
    </aside>
  );
}
export default Filter;
