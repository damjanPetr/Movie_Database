import { useEffect, useState } from "react";
import { Link, useLocation, useNavigation } from "react-router-dom";
import { useAuth } from "../context/Auth";
function Switch() {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();
  const nav = useNavigation();
  useEffect(() => {
    if (nav.state === "loading") {
      setProgress(true);
    }
    return () => {
      setProgress(false);
    };
  }, [nav.state]);

  return (
    <div className="fixed top-0 w-full ">
      {progress && (
        <div className="h-2 bg-cyan-600 loadingBar rounded-r-full z-[9999]"></div>
      )}
    </div>
  );
}

export default function Header() {
  const user = useAuth();
  const loc = useLocation();
  return (
    <header className=" bg-[#032541]   text-white ">
      <Switch />

      <div className="mx-auto max-w-screen-xl flex items-center text-lg px-6 py-1">
        <div className="logo ml-4 ">
          <Link to="/">
            <img
              className=" h-5"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt=""
            />
          </Link>
        </div>
        <div className="right-side flex items-center">
          <nav className="flex w-full items-center justify-start px-5">
            <div className="group  text-base relative p-4 ">
              <div className="font-semibold">Movies</div>
              <ul className="absolute z-50 left-2 top-[calc(100%+3px)] -mt-3 hidden flex-col items-center rounded-lg py-2 bg-white  border group-hover:flex">
                {[
                  { place: "/movie", name: "Popular" },
                  { place: "/movie/now-playing", name: "Now Playing" },
                  { place: "/movie/upcoming", name: "Upcoming" },
                  { place: "/movie/top-rated", name: "Top Rated" },
                ].map(({ place, name }, index) => {
                  return (
                    <Link
                      key={index}
                      to={place}
                      className="w-full  hover:bg-gray-100  z-50 bg-white pl-6 pr-12   whitespace-nowrap py-1 text-base text-neutral-700"
                    >
                      {name}
                    </Link>
                  );
                })}
              </ul>
            </div>
            <div className="group  text-base relative p-4">
              <div className="font-semibold">Shows TV</div>
              <ul className="absolute z-50 left-2 top-[calc(100%+3px)] -mt-3 hidden flex-col items-center rounded-lg py-2 bg-white  border group-hover:flex">
                {[
                  { place: "/tvshow", name: "Popular" },
                  { place: "/tvshow/airing-today", name: "Airing Today" },
                  { place: "/tvshow/on-the-air", name: "On TV" },
                  { place: "/tvshow/top-rated", name: "Top Rated" },
                ].map(({ place, name }, index) => {
                  return (
                    <Link
                      to={place}
                      className="w-full hover:bg-gray-100  z-50 bg-white pl-6 pr-12   whitespace-nowrap py-1 text-base text-neutral-700"
                      key={index}
                    >
                      {name}
                    </Link>
                  );
                })}
              </ul>
            </div>
            <div className="group  text-base relative p-4">
              <div className="font-semibold">People</div>
              <ul className="absolute z-50 left-2 top-[calc(100%+3px)] -mt-3 hidden flex-col items-center rounded-lg py-2 bg-white  border group-hover:flex">
                {[{ place: "people", name: "Popular People" }].map(
                  ({ place, name }, index) => {
                    return (
                      <Link
                        to={place}
                        className="w-full hover:bg-gray-100  z-50 bg-white pl-6 pr-12   whitespace-nowrap py-1 text-base text-neutral-700"
                        key={index}
                      >
                        {name}
                      </Link>
                    );
                  }
                )}
              </ul>
            </div>
          </nav>
          {/* <div className="ml-auto mr-4">
          <ul>
            {user ? (
              <li className="ml-auto p-1 first-letter:underline first-letter:underline-offset-2">
                <NavLink to={"/login"} className="">
                  Login
                </NavLink>
              </li>
            ) : (
              <li className="p-1 first-letter:underline first-letter:underline-offset-2 ">
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            )}
          </ul>
        </div> */}
        </div>
      </div>
    </header>
  );
}
