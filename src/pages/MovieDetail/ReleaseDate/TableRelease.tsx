import { AiFillUnlock } from "react-icons/ai";
import { FilteredReleaseDate } from "./ReleaseDate";
import { getFlag } from "../../../utils/func";

type Props = {
  data: FilteredReleaseDate;
};

function Table({ data }: Props) {
  return (
    <article className="pl-5">
      {Object.keys(data).map((item, index) => {
        return (
          <table
            id="tableSegment"
            key={`article-key ${index} `}
            className="mb-4 w-full shadow-lg rounded-lg table-fixed "
          >
            {/* HEADER */}
            <caption
              className="bg-stone-200  text-left rounded-t-lg   "
              id={`goLink${item}`}
            >
              <p className=" px-2.5 py-1.5 font-semibold mb-1">
                <span>
                  <img
                    src={getFlag(item)}
                    alt=""
                    className="mr-2.5 inline-block  w-5 "
                  />
                </span>
                {`${new Intl.DisplayNames(navigator.language, {
                  type: "region",
                }).of(item)}`}
              </p>
            </caption>
            <thead className="">
              <tr className="px-4 font-semibold ">
                <th className="w-8">Date</th>
                <th className="w-8">Certification</th>
                <th className="w-10">Type</th>
                <th className="w-4">Language</th>
                <th className="w-20">Note</th>
              </tr>
            </thead>
            <tbody className="p-10 rounded-t-lg text-center  [&_td]:p-1">
              {data[item].map((item2) => {
                return (
                  <tr className="" key={item2.release_date}>
                    <td>{new Date(item2.release_date).toLocaleDateString()}</td>
                    <td>{item2.certification}</td>
                    <td>
                      {item2.type == 1
                        ? "Premiere"
                        : item2.type == 2
                        ? "Theatrical (limited)"
                        : item2.type == 3
                        ? "Theatrical"
                        : item2.type == 4
                        ? "Digital"
                        : item2.type == 5
                        ? "Physical"
                        : item2.type == 6
                        ? "TV"
                        : ""}
                    </td>
                    <td>{item2.iso_639_1 ? item2.iso_639_1 : ""}</td>
                    <td className="text-right">{item2.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        );
      })}
    </article>
  );
}
export default Table;
