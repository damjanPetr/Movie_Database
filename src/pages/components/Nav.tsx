import { Link } from "react-router-dom";
import { BiSolidRightArrow } from "react-icons/bi";

function Nav() {
  return (
    <nav className="flex items-center justify-center p-2">
      <ul className="blue flex gap-4 capitalize">
        <li className="group relative rounded-md p-2 hover:bg-slate-500">
          overview
          <div className="absolute top-[calc(100%+0.1rem)] flex hidden w-max flex-col items-start justify-start gap-4 rounded-lg bg-white px-2 py-2  text-sm group-hover:flex">
            <Link
              to={"../details"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Main
            </Link>
            <Link
              to={"../alternative-titles"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Alternative Titles
            </Link>
            <Link
              to={"../cast-crew"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Cast & Crew
            </Link>
            <Link
              to={"../release-date"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Release Date
            </Link>
            <Link
              to={"../translations"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Translations
            </Link>
            <Link
              to={"../changes"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Changes
            </Link>
            {/* <Link
                  to={"../report"}
                  relative="path"
                  className="w-full p-2 hover:bg-stone-300/50"
                >
                  Report
                </Link>
                <Link
                  to={"../edit"}
                  relative="path"
                  className="w-full p-2 hover:bg-stone-300/50"
                >
                  Edit
                </Link> */}
          </div>
        </li>
        <li className="group relative rounded-md p-2 hover:bg-slate-500">
          Media
          <div className="absolute top-[calc(100%+0.1rem)] flex hidden w-max flex-col items-start justify-start gap-4 rounded-lg bg-white px-2 py-2  text-sm group-hover:flex">
            <Link
              to={"../images/backdrops"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Backdrops{" "}
            </Link>
            <Link
              to={"../images/logos"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Logos
            </Link>
            <Link
              to={"../images/posters"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Posters
            </Link>
            <div
              // to={"../videos"}
              // relative="path"
              className="group/video relative block flex w-full items-center justify-between p-2 hover:bg-stone-300/50 "
            >
              Videos
              <p className="ml-4">{<BiSolidRightArrow />}</p>
              <div className="absolute left-full top-0 hidden flex-col rounded-md bg-white p-2 group-hover/video:flex">
                <Link
                  to={"../videos/?videoType=trailer"}
                  className="w-full p-2 hover:bg-stone-300/50"
                >
                  Trailers
                </Link>
                <Link
                  to={"../videos/?videoType=teaser"}
                  className=" w-full p-2 hover:bg-stone-300/50"
                >
                  Teasers
                </Link>

                <Link
                  to={"../videos/?videoType=clip"}
                  className=" w-full p-2 hover:bg-stone-300/50"
                >
                  Clips
                </Link>

                <Link
                  to={"../videos/?videoType=Behind the Scenes"}
                  className="  w-full p-2 hover:bg-stone-300/50"
                >
                  Behind The Scenes
                </Link>
                <Link
                  to={"../videos/?videoType=featurette"}
                  className="  w-full p-2 hover:bg-stone-300/50"
                >
                  Featurettes
                </Link>
              </div>
            </div>
          </div>
        </li>
        <li className="group relative rounded-md p-2 hover:bg-slate-500">
          Fandom
          <div className="absolute top-[calc(100%+0.1rem)] flex hidden w-max flex-col items-start justify-start gap-4 rounded-lg bg-white px-2 py-2  text-sm group-hover:flex">
            <div className="group/1 relative">
              <div className="flex w-full items-center self-stretch p-2 hover:bg-stone-300/50">
                <p>Discuss </p>
                <p className="ml-4">{<BiSolidRightArrow />}</p>
              </div>
              <div className="absolute left-full top-2/4 flex hidden w-max flex-col items-start justify-start gap-4 rounded-lg bg-white px-2 py-2  text-sm group-hover/1:flex">
                <Link
                  to={"../fandom/discuss"}
                  className="w-full p-2 hover:bg-stone-300/50"
                >
                  Overview
                </Link>
                <Link
                  to={"../fandom/general"}
                  className="w-full p-2 hover:bg-stone-300/50"
                >
                  General
                </Link>
                <Link
                  to={"../fandom/content-issues"}
                  className="w-full p-2 hover:bg-stone-300/50"
                >
                  Content Issues
                </Link>
              </div>
            </div>
            <Link
              to={"../reviews"}
              className="w-full p-2 hover:bg-stone-300/50"
            >
              Reviews
            </Link>
          </div>
        </li>
        <li className="group relative rounded-md p-2  hover:bg-slate-500">
          Share
          <div className="absolute top-[calc(100%+0.1rem)] flex hidden w-max flex-col items-start justify-start gap-4 rounded-lg bg-white px-2 py-2  text-sm group-hover:flex">
            <Link to={"/"} className="w-full p-2 hover:bg-stone-300/50">
              Share Link
            </Link>
            <Link to={"/"} className="w-full p-2 hover:bg-stone-300/50">
              Facebook
            </Link>
            <Link to={"/"} className="w-full p-2 hover:bg-stone-300/50">
              Tweet
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
