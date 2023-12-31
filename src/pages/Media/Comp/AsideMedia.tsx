import { Link } from "react-router-dom";
import {
  MovieDetails,
  MovieImages,
  MovieVideos,
  TvDetails,
} from "../../../types/types";
type Props = {
  data: MovieImages | MovieVideos;
  details: MovieDetails | TvDetails;
  type: "backdrops" | "posters" | "logos";
};

function AsideMedia({ data, details, type }: Props) {
  const imagesArray: MovieImages["backdrops"] = [];
  //place all images in same array
  const key = "logos" || "posters" || "backdrops";
  if (key in data) {
    data[key].forEach((item) => {
      imagesArray.push(item);
    });
  }

  //sort by iso_639_1 and put into object
  const sortingImages: { [x: string]: MovieImages["backdrops"] } = {};
  imagesArray.forEach((item) => {
    if (!sortingImages[item.iso_639_1]) {
      sortingImages[item.iso_639_1] = [];
    }
    sortingImages[item.iso_639_1].push(item);
  });

  return (
    <aside className="">
      <section className="rounded-xl shadow-md">
        <div className="flex w-full items-center justify-between bg-slate-900   text-center text-white p-5 text-xl font-bold rounded-t-xl ">
          <h3 className=" text-xl capitalize">{type + " "}</h3>
          <span className="p-2 text-xl text-gray-300 ">
            {/* {"results" in data
              ? data.results.length
              : "titles" in data
              ? data.titles.length
              : null} */}
          </span>
        </div>
        <div className=" py-2  rounded-b-xl">
          <>
            {Object.keys(sortingImages).map((item, index) => {
              return (
                <div key={item}>
                  <div
                    key={`sidebar-key ${item}`}
                    className="justify-center p-2 hover:bg-slate-200"
                  >
                    <Link to={`#goLink${item}`}>
                      <div className="flex items-center justify-between px-6">
                        <p>
                          {`${new Intl.DisplayNames(navigator.language, {
                            type: "language",
                          }).of(item)}`}
                        </p>
                        <p>{sortingImages[item].length}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </>
        </div>
      </section>
    </aside>
  );
}
export default AsideMedia;
