import { Link } from "react-router-dom";
import { getFullCountryName } from "../../utils/func";
import {
  filterArrayTitles,
  minaltTitles,
} from "../MovieDetail/AlternativeTitles/AlternativeTitles";
import { FilteredReleaseDate } from "../MovieDetail/ReleaseDate/ReleaseDate";
import {
  filteredTranslations,
  minTranslations,
} from "../MovieDetail/Translations/Translations";
import {
  MovieAltTitles,
  MovieTranslations,
  tvAltTitles,
} from "../../types/types";

type Props = {
  asideTitle: string;
  data: MovieAltTitles | tvAltTitles | MovieTranslations;
  // forMovies: boolean;
};
function Aside({ data, asideTitle }: Props) {
  const saveData: {
    [index: string]: minaltTitles[] & MovieTranslations["translations"];
  } = {};

  if ("results" in data) {
    data.results.forEach((item) => {
      if (!saveData[item.iso_3166_1]) {
        saveData[item.iso_3166_1] = [];
      }
      saveData[item.iso_3166_1].push(item);
    });
  } else if ("titles" in data) {
    data.titles.forEach((item) => {
      if (!saveData[item.iso_3166_1]) {
        saveData[item.iso_3166_1] = [];
      }
      saveData[item.iso_3166_1].push(item);
    });
  } else if ("translations" in data) {
    data.translations.forEach((item) => {
      if (!saveData[item.iso_3166_1]) {
        saveData[item.iso_3166_1] = [];
      }
      saveData[item.iso_3166_1].push(item);
    });
  }

  Object.keys(saveData).forEach((item) => {
    console.log(saveData[item]);
  });

  return (
    <aside className="">
      <section className="rounded-xl shadow-md">
        <div className="flex w-full items-center justify-between bg-slate-900   text-center text-white p-5 text-xl font-bold rounded-t-xl ">
          <h3 className=" text-xl">{asideTitle + " "}</h3>
          <span className="p-2 text-xl text-gray-300 ">
            {"results" in data
              ? data.results.length
              : "titles" in data
              ? data.titles.length
              : null}
          </span>
        </div>
        <div className=" py-2  rounded-b-xl ">
          {Object.keys(saveData).map((item, index) => {
            return (
              <div key={item}>
                <div
                  key={`sidebar-key ${item}`}
                  className="justify-center p-2 hover:bg-slate-200"
                >
                  <Link to={`#goLink${item}`}>
                    <div className="flex items-center justify-between px-6">
                      <p>
                        {`${new Intl.DisplayNames(["en"], {
                          type: "region",
                        }).of(item)}`}
                      </p>
                      <p>{saveData[item].length}</p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
export default Aside;
