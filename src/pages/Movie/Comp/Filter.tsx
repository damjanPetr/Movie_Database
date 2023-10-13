import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import { BiSearch } from "react-icons/bi";
import { GiCheckMark } from "react-icons/gi";
import { RiArrowRightSLine } from "react-icons/ri";

import { useLocation, useMatch, useNavigation } from "react-router-dom";
import {
  getDBCounties,
  getWatchProvidersRegionTVShow,
  movieGetWatchProvidersRegion,
  searchKeywords,
  still_92,
} from "../../../api/api";
import {
  Countries,
  MovieProvidersGeneral,
  genresTV,
  languagesTV,
  searchKeywordResultsObject,
  searchKeywordsType,
} from "../../../types/types";
import { getFlag, getHighlight, setBubble } from "../../../utils/func";
import { useCountry } from "../../../utils/hooks";
import Card from "./Card";

export type stateReducer = {
  searchFilter: string;
  searchOpen: boolean;
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

export type initialStateFilter = {
  with_genres: number[];
  minRuntime: number;
  maxRuntime: number;
  filterLanguage: string;
  minCount: number;
  minVotes: number;
  maxVotes: number;
  sortBy: string;
  fromDate: string;
  toDate: string;
  watchProviderArray: number[];
  genresArray: number[];
  // page: number;
  monetization: string[];
  watch_region: string;
  keywords: searchKeywordsType | object;
  renderKeywords: searchKeywordResultsObject[];
};

export type Props = {
  renderMovies: boolean;
  callback: (
    args: string,
    scroll: string,
    discoverScroll?: boolean
  ) => Promise<void>;
  genres: genresTV;
  languages: languagesTV;
  todayDateFilter?: boolean;
};

function Filter({
  genres,
  languages,
  callback,
  todayDateFilter,
  renderMovies,
}: Props) {
  const [watchProviders, setWatchProviders] = useState<MovieProvidersGeneral>();

  const initialState = {
    with_genres: [],
    minRuntime: 0,
    maxRuntime: 400,
    filterLanguage: "",
    minCount: 0,
    minVotes: 0,
    maxVotes: 10,
    sortBy: "popularity.desc",
    fromDate: "",
    toDate: new Date().toISOString().split("T")[0],
    watchProviderArray: [],
    genresArray: [],
    monetization: ["flatrate", "free", "ads", "rent", "buy"],
    watch_region: "",
    keywords: {},
    renderKeywords: [],
  };

  const [filterUrs, setFilterUrs] = useState<initialStateFilter>(initialState);
  const [page, setPage] = useState(1);
  const [normalScroll, setNormalScroll] = useState(true);

  const {
    renderKeywords,
    minRuntime,
    keywords,
    maxRuntime,
    filterLanguage,
    minCount,
    minVotes,
    maxVotes,
    sortBy,
    fromDate,
    toDate,
    watchProviderArray,
    genresArray,
    monetization,
    watch_region,
  } = filterUrs;

  const filterCb = useCallback(filterCallback, [
    filterLanguage,
    minRuntime,
    maxRuntime,
    minCount,
    minVotes,
    fromDate,
    toDate,
    watchProviderArray,
    genresArray,
    monetization,
    watch_region,
    page,
    maxVotes,
    sortBy,
  ]);
  function filterCallback() {
    const urlTv = `page=${page}&sort_by=${sortBy}&with_runtime.gte=${minRuntime}&with_runtime.lte=${maxRuntime}&language=${
      filterLanguage ?? ""
    }&vote_count.gte=${minCount}&vote_average.gte=${minVotes}&vote_average.lte=${maxVotes}${
      fromDate ? `&air_date.gte=${fromDate}` : ""
    }&air_date.lte=${toDate}${
      monetization.length > 0
        ? `&with_watch_monetization_types=${monetization
            .map((item, index) => {
              return index === 0 ? item : "|" + item;
            })
            .join("")}`
        : ""
    }${
      genresArray.length > 0
        ? `&with_genres=${genresArray
            .map((item, index) => {
              return index === 0 ? item : "," + item;
            })
            .join("")}`
        : ""
    }${
      watchProviderArray.length > 0
        ? `&with_watch_providers=${watchProviderArray
            .map((item, index) => {
              return index === 0 ? item : "|" + item;
            })
            .join("")}`
        : ""
    }&watch_region=${watch_region}`;
    if (renderMovies) {
      const url = `page=${page}&sort_by=${sortBy}&with_runtime.gte=${minRuntime}&with_runtime.lte=${maxRuntime}&language=${
        filterLanguage ?? ""
      }&vote_count.gte=${minCount}&vote_average.gte=${minVotes}&vote_average.lte=${maxVotes}${
        fromDate ? `&release_date.gte=${fromDate}` : ""
      }&release_date.lte=${toDate}${
        monetization.length > 0
          ? `&with_watch_monetization_types=${monetization
              .map((item, index) => {
                return index === 0 ? item : "|" + item;
              })
              .join("")}`
          : ""
      }${
        genresArray.length > 0
          ? `&with_genres=${genresArray
              .map((item, index) => {
                return index === 0 ? item : "," + item;
              })
              .join("")}`
          : ""
      }${
        watchProviderArray.length > 0
          ? `&with_watch_providers=${watchProviderArray
              .map((item, index) => {
                return index === 0 ? item : "|" + item;
              })
              .join("")}`
          : ""
      }&watch_region=${watch_region}`;
      return url;
    } else {
      return urlTv;
    }
  }

  useEffect(() => {
    let timerScroll: ReturnType<typeof setTimeout>;
    const debounce = () => {
      clearTimeout(timerScroll);
    };
    const infinitiveScroll = () => {
      debounce();
      timerScroll = setTimeout(() => {
        if (
          document.documentElement.scrollHeight -
            document.documentElement.clientHeight -
            document.documentElement.scrollHeight / 5 <=
          window.scrollY
        ) {
          setPage((page) => page + 1);

          callback(filterCb(), "scroll");
        }
      }, 300);
    };
    window.addEventListener("scroll", infinitiveScroll);
    return () => {
      window.removeEventListener("scroll", infinitiveScroll);
    };
  }, [page, callback, filterCb]);
  const url = useLocation();
  let timer: number;

  const match = useMatch("/tvshow/top-rated");

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
        const regions = await movieGetWatchProvidersRegion(country);
        setWatchProviders(regions);
      }
    })();
  }, [country]);

  const [state, dispatch] = useReducer(reducer, {
    searchFilter: "Popularity Descending",
    searchOpen: false,
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

  const nav = useNavigation();
  const memoizeFilter = useMemo(() => {
    const play = countries.filter((item) => {
      if (filter !== "") {
        return item.english_name.toLowerCase().includes(filter.toLowerCase());
      } else if (filter === "") {
        return true;
      }
    });
    return play;
  }, [countries, filter]);

  return (
    <aside className="w-64 flex-none">
      {/* <p
        className="fixed left-0 p-4 bg-blue-200 text-white"
        onClick={() => {
          console.log(filterUrs);
        }}
      >
        {JSON.stringify(nav.state)}
      </p> */}
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
              // { value: "title.asc", name: "Title (A-Z)" },
              // { value: "title.desc", name: "Title (Z-A)" },
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
                    setFilterUrs({ ...filterUrs, sortBy: value });

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

      {/* Countries */}

      <Card title="Where To Watch">
        <p className="mb-2">Country</p>

        <div
          className="relative flex items-center justify-between rounded-md bg-neutral-300 px-4 py-2 cursor-pointer hover:bg-neutral-400/60"
          onClick={async function (e) {
            if (
              e.target === e.currentTarget ||
              (e.target as HTMLElement).tagName.toLowerCase() !== "input"
            ) {
              await dispatch({ type: "open_where_to_watch" });
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
                    onClick={async () => {
                      const wProviders = await getWatchProvidersRegionTVShow(
                        item.iso_3166_1
                      );
                      setWatchProviders(wProviders);
                      dispatch({
                        type: "change_country",
                        countryData: {
                          text: item.iso_3166_1,
                          engFullName: item.english_name,
                        },
                      });

                      setFilterUrs({
                        ...filterUrs,
                        // watch_region: item.iso_3166_1,
                        watchProviderArray: [],
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
                  onClick={(e) => {
                    if (Array.isArray(watchProviderArray)) {
                      e.currentTarget.classList.remove("open");

                      if (
                        watchProviderArray.includes(item.provider_id as never)
                      ) {
                        setFilterUrs({
                          ...filterUrs,
                          watchProviderArray: watchProviderArray.filter(
                            (el) => el !== item.provider_id
                          ),
                        });
                      } else {
                        e.currentTarget.classList.add("open");
                        setFilterUrs({
                          ...filterUrs,
                          watchProviderArray: [
                            ...watchProviderArray,
                            item.provider_id,
                          ] as never[],
                        });
                      }
                    }
                  }}
                >
                  <div className="m-1 basis-1/4 cursor-pointer">
                    <img
                      className="rounded-lg"
                      src={still_92 + item.logo_path}
                      alt="Watch Provider logo-picture "
                    />
                  </div>
                  <div
                    className={`absolute -inset-x-[200%] bottom-full mx-auto mb-2 opacity-0 w-max rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white group-hover:opacity-100 pointer-events-none transition-all duration-[10] delay-150 `}
                  >
                    {item.provider_name}
                  </div>
                  <div className="triable absolute inset-x-0 -top-3  mx-auto h-0 w-0 border-[10px] border-transparent border-t-blue-900 group-hover:opacity-100 opacity-0 pointer-events-none transition-opacity delay-150"></div>
                  <div className="group-open:block  group-open:bg-cyan-600   absolute inset-[1px]  m-auto hidden   rounded-xl group-hover:bg-sky-500/90 group-hover:block transition-all   ">
                    <div className="absolute inset-0  items-center justify-center text-3xl text-white flex group-hover:flex ">
                      <GiCheckMark />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>

      {/* Monetization types */}

      <Card title="Filter" padding={0} openCardProp={true}>
        <div className="    px-3.5 py-1 ">
          <h3 className="font-light mb-2.5">Avalibilities</h3>
          <input
            className="peer "
            type="checkbox"
            name="main"
            id="main"
            defaultChecked
            onClick={(e) => {
              const free = document.querySelector("#free");
              const ads = document.querySelector("#ads");
              const stream = document.querySelector("#stream");
              const rent = document.querySelector("#rent");
              const buy = document.querySelector("#buy");

              setFilterUrs({
                ...filterUrs,
                monetization: ["flatrate", "free", "ads", "rent", "buy"],
              });
              [free, ads, stream, rent, buy].forEach((item) => {
                if (item != null && item instanceof HTMLInputElement)
                  item.checked = true;
              });
            }}
          />
          <label
            htmlFor="main"
            className="inline-block ml-1.5  justify-start w-30 "
          >
            Search all availabilities?
          </label>
          <label
            htmlFor="stream"
            className="peer-checked:hidden flex  justify-start w-20 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="stream"
              id="stream"
              defaultChecked
              onClick={(e) => {
                if (monetization.includes("flatrate" as never)) {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [
                      ...monetization.filter((item) => item !== "flatrate"),
                    ],
                  });
                } else {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [...monetization, "flatrate"],
                  });
                }
              }}
            />
            Stream
          </label>
          <label
            htmlFor="free"
            className="peer-checked:hidden flex  justify-start w-20 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="free"
              id="free"
              defaultChecked
              onClick={(e) => {
                if (monetization.includes("free")) {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [
                      ...monetization.filter((item) => item !== "free"),
                    ],
                  });
                } else {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [...monetization, "free"],
                  });
                }
              }}
            />
            Free
          </label>
          <label
            htmlFor="ads"
            className="peer-checked:hidden flex  justify-start w-20 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="ads"
              id="ads"
              defaultChecked
              onClick={(e) => {
                if (monetization.includes("ads")) {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [
                      ...monetization.filter((item) => item !== "ads"),
                    ],
                  });
                } else {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [...monetization, "ads"],
                  });
                }
              }}
            />
            Ads
          </label>
          <label
            htmlFor="rent"
            className="peer-checked:hidden flex  justify-start w-20 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="rent"
              id="rent"
              defaultChecked
              onClick={(e) => {
                if (monetization.includes("rent" as never)) {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [
                      ...monetization.filter((item) => item !== "rent"),
                    ],
                  });
                } else {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [...monetization, "rent"],
                  });
                }
              }}
            />
            Rent
          </label>
          <label
            htmlFor="buy"
            className="peer-checked:hidden flex  justify-start w-20 "
          >
            <input
              className="mr-1"
              type="checkbox"
              name="buy"
              id="buy"
              defaultChecked
              onClick={(e) => {
                if (monetization.includes("buy" as never)) {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [
                      ...monetization.filter((item) => item !== "buy"),
                    ],
                  });
                } else {
                  setFilterUrs({
                    ...filterUrs,
                    monetization: [...monetization, "buy"],
                  });
                }
              }}
            />
            Buy
          </label>
          <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
        </div>
        <div className="    px-3.5 py-1 ">
          <h3 className="font-light mb-2.5">Air Dates</h3>
          {/* <input type="checkbox" name="main" id="main" className="peer" />
          <label
            htmlFor="main"
            className="inline-block ml-1.5  justify-start w-30 "
          >
            Search all releases?
          </label> */}
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
            <label className="text-gray-500 " htmlFor="formDate">
              from:
            </label>{" "}
            <input
              className="p-1.5 outline-none  border border-blue-200 text-sm font-normal focus:ring-1 ring-blue-300 rounded-sm"
              type="date"
              defaultValue={(() => {
                if (todayDateFilter) {
                  return new Date().toISOString().split("T")[0];
                }
              })()}
              max={new Date().toISOString().split("T")[0]}
              onInput={(e) => {
                e.preventDefault();
                const value = e.currentTarget.value;
                setFilterUrs({
                  ...filterUrs,
                  fromDate: value,
                });
              }}
              name="formDate"
              id="formDate"
            />
          </div>
          <div className="flex justify-between items-center mt-1 ">
            <label className="text-gray-500 " htmlFor="toDate">
              to:
            </label>{" "}
            <input
              className="p-1.5 outline-none  border border-blue-200 text-sm font-normal focus:ring-1 ring-blue-300 rounded-sm "
              type="date"
              max={new Date().toISOString().split("T")[0]}
              defaultValue={new Date().toISOString().split("T")[0]}
              name="toDate"
              onInput={(e) => {
                e.preventDefault();
                const value = e.currentTarget.value;
                setFilterUrs({
                  ...filterUrs,
                  toDate: value,
                });
              }}
              id="toDate"
            />
          </div>

          <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
        </div>
        <div className="    px-3.5 py-1 ">
          <h3 className="font-light mb-2.5">Genres</h3>

          <ul className="flex flex-wrap gap-2 p-1">
            {genres &&
              genres.genres.map((item) => {
                return (
                  <li
                    key={item.id}
                    onClick={(e) => {
                      if (genresArray.includes(item.id as never)) {
                        setFilterUrs({
                          ...filterUrs,
                          genresArray: [
                            ...genresArray.filter((el) => el !== item.id),
                          ] as number[],
                        });
                        e.currentTarget.classList.remove("active-keyword");
                      } else {
                        setFilterUrs({
                          ...filterUrs,
                          genresArray: [...genresArray, item.id] as number[],
                        });
                        e.currentTarget.classList.add("active-keyword");
                      }
                    }}
                    className={`px-3 py-1 cursor-pointer  rounded-full text-sm ring-[0.8px] bg-white  hover:bg-cyan-500 hover:text-white hover:ring-none   [&.active-keyword]:bg-cyan-500 [&.active-keyword]:text-white active:bg-cyan-600 active:scale-105 `}
                  >
                    {item.name}
                  </li>
                );
              })}
          </ul>

          <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
        </div>

        <div className="    px-3.5 py-1 ">
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
                  const debounce = () => {
                    clearTimeout(timer);
                  };
                  debounce();
                  // const timer = setTimeout(() => {}, 1000);

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
          <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
        </div>

        <div className="    px-3.5 py-1 ">
          <h3 className="font-light mb-2.5">Certification</h3>
          <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
        </div>
        {/* Languages */}
        <div className="    px-3.5 py-1 ">
          <h3 className="font-light mb-2.5">Language</h3>
          <div
            className="w-full bg-stone-50 group relative text-sm  "
            onClick={(e) => {
              e.currentTarget.classList.toggle("open");
              const liElements = e.currentTarget.querySelectorAll("ul li");
              liElements.forEach((item) => {
                if (item.textContent == e.currentTarget.textContent) {
                  // item.scrollIntoView(true);
                  // break;
                }
              });
            }}
          >
            <div className="py-2 px-4 bg-stone-100">
              {/* {languages.find((item) => (item.english_name = "English")) */}
              {/* ?.english_name ?? "No selected language"} */}
              No Selected Language
            </div>
            <ul className="hidden group-open:block flex-col w-full absolute blur-0 bg-white  z-10 max-h-40 overflow-auto scb p-2 rounded-sm mt-1">
              <li
                className="px-2 py-1 hover:bg-gray-200 flex items-center  "
                onClick={(e) => {
                  e.currentTarget?.parentElement
                    ?.querySelectorAll("li")
                    .forEach((item) => {
                      item.classList.remove("bg-violet-200");
                    });
                  e.currentTarget.classList.add("bg-violet-200");
                  const liElement = e.currentTarget.cloneNode(
                    true
                  ) as HTMLLIElement;
                  liElement.className =
                    " hover:bg-gray-200 flex items-center  ";
                  const parent =
                    e.currentTarget.parentElement?.previousElementSibling;
                  parent?.firstChild?.remove();
                  parent?.appendChild(liElement);
                  setFilterUrs({
                    ...filterUrs,
                    filterLanguage: "",
                  });
                }}
              >
                {/* <img
                  // src={`assets/flag/${item.iso_639_1}.svg`}
                  src={getFlag(item.iso_639_1)}
                  className="w-4 mr-2"
                  alt=""
                /> */}
                No Selected Language
              </li>
              {languages.map((item) => {
                return (
                  <li
                    key={item.iso_639_1}
                    className="px-2 py-1 hover:bg-gray-200 flex items-center  "
                    onClick={(e) => {
                      e.currentTarget?.parentElement
                        ?.querySelectorAll("li")
                        .forEach((item) => {
                          item.classList.remove("bg-violet-200");
                        });
                      e.currentTarget.classList.add("bg-violet-200");
                      const liElement = e.currentTarget.cloneNode(
                        true
                      ) as HTMLLIElement;
                      liElement.className =
                        " hover:bg-gray-200 flex items-center  ";
                      const parent =
                        e.currentTarget.parentElement?.previousElementSibling;
                      parent?.firstChild?.remove();
                      parent?.appendChild(liElement);
                      setFilterUrs({
                        ...filterUrs,
                        filterLanguage: item.iso_639_1,
                      });
                    }}
                  >
                    <img
                      // src={`assets/flag/${item.iso_639_1}.svg`}
                      src={getFlag(item.iso_639_1)}
                      className="w-4 mr-2"
                      alt=""
                    />

                    {item.english_name}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
        </div>
        <div className="">
          <div className="px-3.5 py-1">
            <h3 className="font-light mb-2.5">User Score</h3>
            <div className="flex  items-center h-10">
              <label htmlFor="min-user-score" className="mr-2 w-10">
                Min
              </label>
              <form action="" className="relative  flex-grow">
                <input
                  type="range"
                  name="min-user-score"
                  id="min-user-score"
                  list="markersUserScore"
                  min={0}
                  className="accent-sky-600  w-full"
                  max={10}
                  step={1}
                  defaultValue={0}
                  autoComplete="on"
                  onInput={(e) => {
                    const output =
                      e.currentTarget.parentElement?.querySelector("output");

                    const maxUserScore = document.querySelector(
                      "#max-user-score"
                    ) as HTMLInputElement;

                    if (
                      maxUserScore.valueAsNumber >=
                      e.currentTarget.valueAsNumber
                    ) {
                      setFilterUrs({
                        ...filterUrs,
                        minVotes: e.currentTarget.valueAsNumber,
                      });
                      if (output) {
                        setBubble(e.currentTarget, output);
                      }
                    } else {
                      maxUserScore.value = String(
                        e.currentTarget.valueAsNumber
                      );

                      setFilterUrs({
                        ...filterUrs,
                        minVotes: e.currentTarget.valueAsNumber,
                        maxVotes: e.currentTarget.valueAsNumber,
                      });
                    }
                    if (output) {
                      setBubble(e.currentTarget, output);
                    }
                  }}
                />
                <output
                  htmlFor="min-runtime"
                  name="bubble"
                  className="absolute -top-5 bg-blue-500 text-white rounded-lg px-0.5 text-sm"
                ></output>
                <datalist id="markersUserScore" className="">
                  <option value="0"> 0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </datalist>
              </form>
            </div>
            <div className="flex  items-center h-10 mt-4">
              <label htmlFor="max-user-score" className="mr-2 w-10">
                Max
              </label>
              <form action="" className="relative  flex-grow">
                <input
                  type="range"
                  name="max-user-score"
                  id="max-user-score"
                  min={0}
                  defaultValue={10}
                  list="markersUserScoreMax"
                  className="accent-sky-600  w-full"
                  max={10}
                  step={1}
                  onInput={(e) => {
                    const output =
                      e.currentTarget.parentElement?.querySelector("output");

                    const minUserScore = document.querySelector(
                      "#min-user-score"
                    ) as HTMLInputElement;

                    if (
                      minUserScore.valueAsNumber <=
                      e.currentTarget.valueAsNumber
                    ) {
                      setFilterUrs({
                        ...filterUrs,
                        maxVotes: e.currentTarget.valueAsNumber,
                      });

                      if (output) {
                        setBubble(e.currentTarget, output);
                      }
                    } else {
                      const value = e.currentTarget.valueAsNumber;
                      setFilterUrs({
                        ...filterUrs,
                        maxVotes: e.currentTarget.valueAsNumber,
                        minVotes: e.currentTarget.valueAsNumber,
                      });
                      minUserScore.value = String(value);
                    }
                    if (output) {
                      setBubble(e.currentTarget, output);
                    }
                  }}
                />
                <output
                  htmlFor="min-runtime"
                  name="bubble"
                  className="absolute -top-5 bg-blue-500 text-white rounded-lg px-0.5 text-sm  "
                ></output>
                <datalist id="markersUserScoreMax" className="">
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </datalist>
              </form>
            </div>
            <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
          </div>
          <div className="px-3.5 py-1">
            <h3 className="font-light mb-2.5">Minimum User Votes</h3>

            <div className="flex  items-center h-10">
              <label htmlFor="min-user-vote" className="mr-2 w-10">
                Min
              </label>
              <form action="" className="relative flex-grow ">
                <input
                  type="range"
                  name="min-user-vote"
                  id="min-user-vote"
                  min={0}
                  className="accent-sky-600 flex-grow w-full"
                  list="markersUserVotes"
                  defaultValue={
                    match?.pathnameBase === "/tvshow/top-rated" ? 200 : 0
                  }
                  max={500}
                  step={10}
                  onInput={(e) => {
                    const output =
                      e.currentTarget.parentElement?.querySelector("output");
                    setFilterUrs({
                      ...filterUrs,
                      minCount: e.currentTarget.valueAsNumber,
                    });
                    if (output) setBubble(e.currentTarget, output);
                  }}
                />
                <output
                  htmlFor="min-runtime"
                  name="bubble"
                  className="absolute -top-5 bg-blue-500 text-white rounded-lg px-0.5 text-sm "
                ></output>
                <datalist id="markersUserVotes" className="">
                  <option value="0">0</option>
                  {/* <option value="1"></option> */}
                  {/* <option value="2"></option> */}
                  {/* <option value="3"></option> */}
                  {/* <option value="4"></option> */}
                  {/* <option value="5">5</option> */}
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                </datalist>
              </form>
            </div>
            <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
          </div>
          <div className="    px-3.5 py-1 ">
            <h3 className="font-light mb-2.5">Runtime</h3>
            <div className="flex  items-center h-10">
              <label htmlFor="min-runtime" className="mr-2 w-10">
                Min
              </label>
              <form action="" className="relative flex-grow ">
                <input
                  type="range"
                  name="min-runtime"
                  id="min-runtime"
                  min={0}
                  className="accent-sky-600 w-full"
                  defaultValue={0}
                  max={400}
                  list="markersRuntime"
                  step={10}
                  onInput={(e) => {
                    const output =
                      e.currentTarget.parentElement?.querySelector("output");
                    const maxRuntimeelement = document.querySelector(
                      "#max-runtime"
                    ) as HTMLInputElement;

                    if (
                      e.currentTarget.valueAsNumber >=
                      maxRuntimeelement.valueAsNumber
                    ) {
                      setFilterUrs({
                        ...filterUrs,
                        maxRuntime: e.currentTarget.valueAsNumber,
                        minRuntime: e.currentTarget.valueAsNumber,
                      });

                      maxRuntimeelement.value = String(
                        e.currentTarget.valueAsNumber
                      );
                    } else {
                      setFilterUrs({
                        ...filterUrs,
                        minRuntime: e.currentTarget.valueAsNumber,
                      });
                    }
                    if (output) {
                      setBubble(e.currentTarget, output);
                    }
                  }}
                />
                <output
                  htmlFor="min-runtime"
                  name="bubble"
                  className="absolute -top-5 bg-blue-500 text-white rounded-lg px-0.5 text-sm "
                ></output>
                <datalist id="markersRuntime" className="">
                  <option value="0">0</option>

                  <option value="100">100</option>

                  <option value="200">200</option>

                  <option value="300">300</option>

                  <option value="400">400</option>
                </datalist>
              </form>
            </div>
            <div className="flex  items-center h-10 mt-4 ">
              <label htmlFor="max-runtime" className="mr-2 w-10">
                Max
              </label>
              <form action="" className="relative  flex-grow">
                <input
                  type="range"
                  name="max-runtime"
                  id="max-runtime"
                  min={0}
                  className="accent-sky-600 w-full"
                  list="markersRuntime"
                  max={400}
                  defaultValue={400}
                  step={10}
                  onInputCapture={(e) => {
                    const output =
                      e.currentTarget.parentElement?.querySelector("output");
                    const minRuntime = document.querySelector(
                      "#min-runtime"
                    ) as HTMLInputElement;
                    if (
                      minRuntime.valueAsNumber <= e.currentTarget.valueAsNumber
                    ) {
                      if (output) {
                        setFilterUrs({
                          ...filterUrs,
                          maxRuntime: e.currentTarget.valueAsNumber,
                          minRuntime: minRuntime.valueAsNumber,
                        });
                        setBubble(e.currentTarget, output);
                      }
                    } else {
                      const value = e.currentTarget.valueAsNumber;
                      minRuntime.value = String(value);
                      setFilterUrs({
                        ...filterUrs,
                        minRuntime: e.currentTarget.valueAsNumber,
                      });
                    }
                  }}
                />
                <output
                  htmlFor="min-runtime"
                  name="bubble"
                  className="absolute -top-5 bg-blue-500 text-white rounded-lg px-0.5  text-sm opacity-0"
                ></output>
                <datalist id="markersRuntime" className="">
                  <option value="0">0</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                </datalist>
              </form>
            </div>

            <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>
          </div>
        </div>

        <div className="    px-3.5 py-1 ">
          <h3 className="font-light mb-2.5">Keywords</h3>
        </div>
        <div className="  fci  px-3.5 py-1">
          <div className="relative">
            <div className="relative w-[calc(100%+28px);] top-0 m-2 h-[0.2px] -left-[22px]  bg-gray-200"></div>

            <div className="w-full flex items-center relative peer">
              <input
                placeholder="Filter by keywords..."
                type="text"
                name="keywords"
                id="keywords"
                className=" outline-none ring-1 ring-blue-200 focus-within:ring-blue-400 p-1 rounded-sm w-full placeholder:text-sm"
                onInput={(e: React.MouseEvent<HTMLInputElement>) => {
                  e.preventDefault();

                  clearTimeout(timer);
                  e.currentTarget.parentElement?.classList.remove("open");

                  if (timer != undefined) {
                    timer = window.setTimeout(async () => {
                      const data: searchKeywordsType =
                        await searchKeywords(value);
                      if (data.results.length > 0) {
                        setFilterUrs({
                          ...filterUrs,
                          keywords: data,
                        });
                      }
                    }, 500);
                  }
                  const value = e.currentTarget.value;

                  if (value.length > 0) {
                    e.currentTarget.parentElement?.classList.add("open");
                  }
                }}
              />
              <div
                className="peer-open:opacity-100 opacity-0  fci absolute inset-y-0 right-1 transition-opacity"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                  const inputBox = document.querySelector(
                    "#keywords"
                  ) as HTMLInputElement;
                  inputBox.value = "";
                  inputBox.parentElement?.classList.remove("open");
                  setFilterUrs({
                    ...filterUrs,
                    keywords: {
                      results: [],
                    },
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
                  />
                </svg>
              </div>
            </div>
            <div className="absolute z-50 bg-white w-full" id="keywordDropdown">
              <ul className="w-full max-h-[300px] overflow-auto scb  px-2">
                {"results" in keywords
                  ? keywords.results
                      .filter((item) => {
                        let includes;

                        renderKeywords.forEach((el) => {
                          return el.id === item.id
                            ? (includes = true)
                            : (includes = false);
                        });

                        return !includes;
                      })
                      .map((item: searchKeywordResultsObject) => {
                        return (
                          <li
                            className="hover:bg-gray-200 px-1 my-1 capitalize active:bg-cyan-800 active:scal120   "
                            key={item.id}
                            onClick={() => {
                              const keyboarddrop =
                                document.querySelector("#keywordDropdown");
                              keyboarddrop?.classList.remove("open");
                              setTimeout(() => {
                                setFilterUrs({
                                  ...filterUrs,
                                  renderKeywords: renderKeywords.includes(item)
                                    ? {
                                        ...renderKeywords.filter((el) => {
                                          return el.id !== item.id;
                                        }),
                                      }
                                    : [...renderKeywords, item],
                                  keywords: {
                                    ...keywords,
                                    results: [],
                                  },
                                });
                                keywordsInput.value = "";
                              }, 50);
                              const keywordsInput = document.querySelector(
                                "#keywords"
                              ) as HTMLInputElement;
                            }}
                          >
                            {item.name}
                          </li>
                        );
                      })
                  : null}
              </ul>
            </div>
            <div className="flex p-1 flex-wrap max-h-40 scb overflow-auto  mt-4 w-full gap-1">
              {/* Render keywords  (blue rounded boxes) */}

              {renderKeywords.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex flex-auto items-center  bg-cyan-500 py-0.5 px-1 rounded-lg justify-between group hover:bg-cyan-600"
                  >
                    <p className="capitalize text-[13px] text-white">
                      {item.name}
                    </p>
                    <div
                      className="p-1 group-hover:text-white group-hover:scale-150 transition-transform hover:scale-105  cursor-pointer"
                      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                        if ("results" in keywords) {
                          setFilterUrs({
                            ...filterUrs,
                            keywords: {
                              ...keywords,
                              results: keywords.results.filter(
                                (item: searchKeywordResultsObject) =>
                                  item.id !== item.id
                              ),
                            },
                            renderKeywords: renderKeywords.filter(
                              (item) => item.id !== item.id
                            ),
                          });
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        // className="text-gray-950"
                        width="10"
                        height="10"
                        viewBox="0 0 256 256"
                      >
                        <path
                          fill="currentColor"
                          d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"
                        />
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
      <button
        className=" bg-cyan-500 rounded-xl w-full text-lg text-white py-4 active:scale-105  active:bg-cyan-600o transition-transform duration-0   mx-auto"
        onClick={() => {
          setPage(1);
          callback(filterCb(), "normal", true);
        }}
      >
        Search
      </button>
    </aside>
  );
}
export default Filter;
