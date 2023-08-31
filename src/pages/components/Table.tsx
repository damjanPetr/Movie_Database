import { TdHTMLAttributes } from "react";
import { AiFillUnlock } from "react-icons/ai";
import { BiEdit, BiSolidEdit } from "react-icons/bi";
import {
  getFlag,
  getFullCountryName,
  getSideCountryName,
} from "../../utils/func";
import { minaltTitles } from "../MovieDetail/AlternativeTitles/AlternativeTitles";
import { minReleaseDate } from "../MovieDetail/ReleaseDate/ReleaseDate";
import { minTranslations } from "../MovieDetail/Translations/Translations";

type Props = {
  data: {
    [x: string]: minaltTitles[] | minReleaseDate[] | minTranslations[];
  };
};

function Table({ data }: Props) {
  const dataObject = Object.entries(data);
  return (
    <article className="p-4 ">
      {dataObject.map((item, index) => {
        console.log("🚀 ~ file: Table.tsx:33 ~ {dataObject.map ~ item:", item);
        return (
          <table
            key={`article-key ${(item[0], index)} `}
            className="mb-4 w-full shadow-lg "
          >
            {"english_name" in item[1][0] ? (
              <caption
                className="bg-brown-300 p-2 pl-2 text-left"
                id={`goLink${item[0]}`}
              >
                <p className="">{getSideCountryName(item[0])}</p>
                <BiEdit />
              </caption>
            ) : (
              <caption
                className="bg-brown-300 p-2 pl-2 text-left"
                id={`goLink${item[0]}`}
              >
                <img
                  src={getFlag(item[0])}
                  alt=""
                  className="mr-4 inline-block "
                />
                <p className="inline">{getFullCountryName(item[0])}</p>
              </caption>
            )}
            <thead className="">
              <tr className="border-collapse bg-zinc-200 p-1  ">
                {"title" in item[1][0] ? (
                  <>
                    <th className="pl-4 text-lg font-bold">Title</th>
                    <th className="pr-4 text-lg font-bold">Type</th>
                  </>
                ) : null}
                {"certification" in item[1][0] ? (
                  <>
                    <th className="pl-4 text-lg font-bold">Date</th>
                    <th className="pl-4 text-lg font-bold">Certification</th>
                    <th className="pl-4 text-lg font-bold">Type</th>
                    <th className="pr-4 text-lg font-bold">Language</th>
                    <th className="pr-4 text-lg font-bold">Note</th>
                  </>
                ) : null}
              </tr>
            </thead>
            <tbody className="border p-1 ">
              {"title" in item[1][0]
                ? item[1].map((item) => {
                    return "title" in item ? (
                      <tr className=" bg-blue-300 ">
                        <td>{item.type}</td>
                        <td className="">{item.type}</td>
                      </tr>
                    ) : null;
                  })
                : null}
              {"certification" in item[1][0] ? (
                <tr className="w-full ">
                  <td>{item[1][0].release_date}</td>
                  <td>{item[1][0].certification}</td>
                  <td>{item[1][0].type}</td>
                  {/* <td>{getCountryLanguage(item[1][0].iso_639_1)}</td> */}
                  {/* <td>{item[1][0].descriptors}</td> */}
                  <td>{item[1][0].note}</td>
                </tr>
              ) : null}

              {"english_name" in item[1][0] ? (
                <div className="w-full ">
                  <tr>
                    <td>Title</td>
                    <td>{item[1][0].data.title}</td>
                    <td className="h-1 p-1">
                      <AiFillUnlock />
                    </td>{" "}
                  </tr>
                  <tr>
                    <td>Taglines</td>
                    <td>{item[1][0].data.tagline}</td>
                  </tr>
                  <tr>
                    <td>Overview</td>
                    <td>{item[1][0].data.overview}</td>
                    <td className="h-1 p-1">
                      <AiFillUnlock />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <table className="table-auto ">
                        <tbody>
                          <tr>
                            <td className="h-1 p-1">
                              <AiFillUnlock />
                            </td>
                            <td className="h-1 p-1"></td>
                            {item[1][0].data.runtime ? (
                              <td>{item[1][0].english_name}</td>
                            ) : (
                              <td>Add Runtime</td>
                            )}
                            <AiFillUnlock />
                            {item[1][0].data.homepage ? (
                              <td>{item[1][0].data.homepage}</td>
                            ) : (
                              <td>Add Homepage</td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                  <td></td>
                </div>
              ) : null}
            </tbody>
          </table>
        );
      })}
    </article>
  );
}
export default Table;
