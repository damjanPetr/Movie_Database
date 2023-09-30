import { Link } from "react-router-dom";
import { MovieReleaseDate } from "../../../types/types";
import { FilteredReleaseDate, minReleaseDate } from "./ReleaseDate";

type Props = {
  asideTitle: string;
  data: FilteredReleaseDate;
};
function Aside({ data, asideTitle }: Props) {
  Object.keys(data).forEach((item) => {
    console.log(data[item]);
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
          {Object.keys(data).map((item, index) => {
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
                      <p>{data[item].length}</p>
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
