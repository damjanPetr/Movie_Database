import { AiFillPlusCircle } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
export type PropsAsideVideo = {
  type: "trailers" | "Clip" | "teasers" | "featurettes" | "BehindTheScenes";
  data: {
    // [x in
    //   | "Clip"
    //   | "Featurette"
    //   | "Teaser"
    //   | "Trailer"
    //   | "Bloopers"
    //   | "Behind the Scenes"]
    [x: string]: object[];
  };
};

function AsideVideo({ type, data }: PropsAsideVideo) {
  // const dataObjectKeys = Object.keys(data).map((item) => {
  //   const number = data[item].length;
  //   return { item, number };
  // });

  return (
    <div className="max-w-sm rounded-lg shadow-md">
      <div className="mb-2 flex items-center justify-between rounded-lg bg-stone-900 p-4 text-white shadow-inner ">
        <p className="text-xl font-bold capitalize">Videos</p>
        <div className="flex gap-4">
          <AiFillPlusCircle />
        </div>
      </div>
      {/* Content */}
      <ul>
        {/* dataObjectKeys.map((item) => {
          return (
            <Link to={`videoType=${item.item.toLowerCase()}`} className="">
              <li className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-200">
                <p className="inline">{item.item}</p>
                <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm">
                  {item.number}
                </span>
              </li>
            </Link>
          );
        }) */}
        <NavLink to={`?videoType=trailer`}>
          <li className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-200">
            <p className="inline">Trailers</p>
            <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm">
              {data["Trailer"].length ?? 0}
            </span>
          </li>
        </NavLink>
        <NavLink to={`?videoType=teaser`} className="">
          <li className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-200">
            <p className="inline">Teasers</p>
            <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm">
              {data["Teaser"].length ?? 0}
            </span>
          </li>
        </NavLink>
        <NavLink to={`?videoType=clip`} className="">
          <li className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-200">
            <p className="inline">Clips</p>
            <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm">
              {data["Clip"]?.length ?? 0}
            </span>
          </li>
        </NavLink>
        <NavLink to={`?videoType=Behind the Scenes`} className="">
          <li className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-200">
            <p className="inline">Behind The Scenes</p>
            <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm">
              {data["Behind the Scenes"]?.length ?? 0}
            </span>
          </li>
        </NavLink>
        <NavLink to={`?videoType=blooper`} className="">
          <li className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-200">
            <p className="inline">Bloopers</p>
            <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm">
              {data.Bloopers?.length ?? 0}
            </span>
          </li>
        </NavLink>
        <NavLink to={`?videoType=featurette`} className="">
          <li className="flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-200">
            <p className="inline">Featurettes</p>
            <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm">
              {data.Featurette?.length ?? 0}
            </span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
}
export default AsideVideo;
