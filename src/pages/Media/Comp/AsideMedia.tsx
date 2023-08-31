import { AiFillPlusCircle, AiFillQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MovieDetails, MovieImages, MovieVideos } from "../../../types/types";
import { getCountryLanguage } from "../../../utils/func";
type Props = {
  data: MovieImages | MovieVideos;
  details: MovieDetails;
  type: "backdrops" | "posters" | "logos";
};

function AsideMedia({ data, details, type }: Props) {
  //this is the data that's used for figuring out the number of different objcets in the data
  const dataForLanguageNumbers: {
    [x: string]:
      | MovieImages["backdrops"]
      | MovieImages["logos"]
      | MovieImages["posters"];
  } = {};
  function getNumber(arg: MovieImages["backdrops" | "posters" | "logos"]) {
    arg.forEach((item) => {
      if (!dataForLanguageNumbers[item.iso_639_1]) {
        dataForLanguageNumbers[item.iso_639_1] = [];
      }
      dataForLanguageNumbers[item.iso_639_1].push(item);
    });

    return;
  }
  switch (type) {
    case "backdrops":
      if ("backdrops" in data) {
        getNumber(data.backdrops);
      }
      break;
    case "logos":
      if ("logos" in data) {
        getNumber(data.logos);
      }
      break;
    case "posters":
      if ("posters" in data) {
        getNumber(data.posters);
      }
      break;
    default:
      return;
  }
  const obKeys = Object.keys(dataForLanguageNumbers);
  const dataList = obKeys.map((item) => {
    console.log("🚀 ~ file: AsideMedia.tsx:49 ~ dataList ~ item:", typeof item);
    const propertyValue = dataForLanguageNumbers[item];
    const arrayLength = propertyValue.length;
    const language = getCountryLanguage(item);
    return { arrayLength, language, item };
  });

  return (
    <div className="ml-auto max-w-[200px] rounded-lg text-sm shadow-lg">
      <div className="mb-2 flex items-center justify-between rounded-t-lg bg-stone-900 p-4 text-white shadow-inner ">
        <p className="flex-shrink text-xl font-bold capitalize">{type}</p>
        <div className="flex gap-1">
          <AiFillPlusCircle />
          <AiFillQuestionCircle />
        </div>
      </div>
      {/* Content */}
      {type === "backdrops" ? (
        <ul>
          {dataList
            .sort((a, b) => {
              return a.item.localeCompare(b.item);
            })
            .map((item) => {
              return (
                <Link to={"?image_lang=" + item.item}>
                  <li className="group flex items-center justify-between p-1 px-4 hover:bg-gray-200">
                    <p className="text-gray-600 group-hover:text-black">
                      {item.language}
                    </p>
                    <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm font-light text-gray-500 group-hover:text-black">
                      {item.arrayLength}
                    </span>
                  </li>
                </Link>
              );
            })}
        </ul>
      ) : null}
      {type === "logos" ? (
        <ul>
          {dataList
            .sort((a, b) => {
              return a.item.localeCompare(b.item);
            })
            .map((item) => {
              return (
                <Link to={"?image_lang=" + item.item}>
                  <li className="flex justify-between p-2">
                    <p>{item.language}</p>
                    <p>{item.arrayLength}</p>
                  </li>
                </Link>
              );
            })}
        </ul>
      ) : null}
      {type === "posters" ? (
        <ul>
          {dataList
            .sort((a, b) => {
              return a.item.localeCompare(b.item);
            })
            .map((item) => {
              return (
                <Link to={"?image_lang=" + item.item}>
                  <li className="flex justify-between p-2 px-4 hover:bg-gray-200">
                    <p>{item.language}</p>
                    <span className="ml-auto rounded-lg bg-gray-100 p-1 px-2 text-sm">
                      {item.arrayLength}
                    </span>
                  </li>
                </Link>
              );
            })}
        </ul>
      ) : null}
    </div>
  );
}
export default AsideMedia;
