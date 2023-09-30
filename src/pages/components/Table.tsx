import { AiFillUnlock } from "react-icons/ai";
import {
  MovieAltTitles,
  MovieTranslations,
  tvAltTitles,
} from "../../types/types";
import { getFlag } from "../../utils/func";
import { minaltTitles } from "../MovieDetail/AlternativeTitles/AlternativeTitles";

type Props = {
  data: MovieAltTitles | tvAltTitles | MovieTranslations;
  purpose: "translations" | "altTitles";
};

function Table({ data, purpose }: Props) {
  const saveData: {
    [index: string]: (minaltTitles | MovieTranslations["translations"][0])[];
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
    <article className="pl-5">
      {Object.keys(saveData).map((item, index) => {
        return (
          <table
            id="tableSegment"
            key={`article-key ${(item[0], index)} `}
            className="mb-4 w-full shadow-lg rounded-lg "
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
              {purpose === "altTitles" ? (
                <tr className="text-left   flex ">
                  <th className=" basis-1/2 py-1.5 px-2.5   font-semibold">
                    Title
                  </th>
                  <th className=" basis-1/2 py-1.5 px-2.5  font-semibold">
                    Type
                  </th>
                  {/* {"certification" in item[1][0] ? (
                <>
                  <th className="pl-4 text-lg font-bold">Date</th>
                  <th className="pl-4 text-lg font-bold">Certification</th>
                  <th className="pl-4 text-lg font-bold">Type</th>
                  <th className="pr-4 text-lg font-bold">Language</th>
                  <th className="pr-4 text-lg font-bold">Note</th>
                </>
              ) : null} */}
                </tr>
              ) : null}
              {purpose == "translations" ? <></> : null}
            </thead>
            <tbody className=" p-10 rounded-t-lg   ">
              {purpose === "translations"
                ? saveData[item].map((item) => {
                    console.log(item);
                    {
                      "title" in item ? (
                        <tr className="">
                          <td className=" bg-blue-300 " key={index}>
                            {item ? (
                              <>
                                <div>{item.type}</div>
                                <div className="">{item.type}</div>
                              </>
                            ) : null}
                          </td>
                        </tr>
                      ) : null;
                    }
                    if ("data" in item) {
                      return (
                        <>
                          {/* For tv names */}
                          <tr className="">
                            {item ? (
                              <td className="[&_div]:px-2 [&_div]:py-1">
                                <div className="w-full flex items-start  ">
                                  <div className="w-24 ">Name</div>
                                  <div className="flex-grow">
                                    {item.data.title}
                                  </div>
                                  <div className="p-3">
                                    <AiFillUnlock />
                                  </div>
                                </div>
                                <div className="w-full flex items-start  ">
                                  <div className="w-24  ">Taglines</div>
                                  <div className="flex-grow">
                                    {item.data.tagline ?? "No Taglines"}
                                  </div>
                                </div>
                                <div className="w-full flex items-start  ">
                                  <div className="w-24 flex-none ">
                                    Overview
                                  </div>
                                  <div>{item.data.overview}</div>
                                  <div className="h-1 p-1">
                                    <AiFillUnlock />
                                  </div>
                                </div>
                              </td>
                            ) : null}
                          </tr>
                        </>
                      );
                    }
                  })
                : null}
              {purpose === "altTitles" ? (
                <tr className="">
                  {saveData[item].map((item2) => {
                    return (
                      <td className="flex  ">
                        <>
                          {"title" in item2 ? (
                            <>
                              <div className="flex-initial basis-1/2 py-1.5 px-2.5">
                                {item2.title}
                              </div>
                              <div className="flex-initial basis-1/2 py-1.5 px-2.5">
                                {item2.type}
                              </div>
                            </>
                          ) : null}
                        </>
                      </td>
                    );
                  })}
                </tr>
              ) : null}
            </tbody>
          </table>
        );
      })}
    </article>
  );
}
export default Table;
