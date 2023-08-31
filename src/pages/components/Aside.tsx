import { getFullCountryName } from "../../utils/func";
import { filterArrayTitles } from "../MovieDetail/AlternativeTitles/AlternativeTitles";
import { FilteredReleaseDate } from "../MovieDetail/ReleaseDate/ReleaseDate";
import { filteredTranslations } from "../MovieDetail/Translations/Translations";

type Props = {
  asideTitle: string;
  data: filterArrayTitles | FilteredReleaseDate | filteredTranslations;
};
function Aside({ data, asideTitle }: Props) {
  const dataObject = Object.entries(data);

  return (
    <aside className="p-4">
      <section className="rounded-xl">
        <div className="flex w-full items-center justify-between bg-slate-900 px-4 py-2 text-center text-white">
          <h1 className=" text-xl">{asideTitle + " " + dataObject.length}</h1>
          <span className="p-2 text-xl text-gray-400 "></span>
        </div>
        <div className=" shadow-md">
          {dataObject.sort().map((start, index) => {
            const item = start[1];

            // const newArray = altTitles.titles.filter(
            // (element) => element.title === item.title
            // );
            return (
              <div
                key={`sidebar-key ${index}`}
                className="justify-center p-2 hover:bg-slate-200"
              >
                <a href={`#goLink${start[0]}`}>
                  <div className="flex items-center justify-between px-6">
                    <p>{getFullCountryName(start[0])}</p>
                    <p>{item.length}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
export default Aside;
