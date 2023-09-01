import { useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { base_url, base_urlBg } from "../../../api/api";
import { MovieImages, MovieVideos } from "../../../types/types";
import { getFullCountryName } from "../../../utils/func";
import { useSearchParams } from "react-router-dom";

type Props = {
  data: MovieImages | MovieVideos;
  type: "backdrops" | "posters" | "logos";
};

function MainMedia({ data, type }: Props) {
  console.log("🚀 ~ file: AsideMedia.tsx:7 ~ data:", data);
  const [items, setItems] = useState(data);
  const [searchParams, setSearchParams] = useSearchParams();

  const filterLanguage = searchParams.get("image_lang");
  const filterSearchFunction = (item: any) => {
    if (filterLanguage === "null") {
      return item.iso_639_1 === null;
    }
    return item.iso_639_1 === filterLanguage;
  };
  return (
    <div className="mx-auto flex max-w-7xl flex-wrap content-center items-start justify-start gap-4 p-4">
      {type === "backdrops"
        ? (items as MovieImages).backdrops
            .filter(filterSearchFunction)
            .map((item) => {
              return (
                <div className="box-shadow: 10px 5px 5px black; max-w-[250px] flex-initial basis-1/4 rounded-lg shadow-slate-400  ">
                  <a
                    href={base_urlBg + item.file_path}
                    className="hover:underline"
                    id={`linkTarget ${item.iso_639_1}`}
                  >
                    <img
                      src={base_url + item.file_path}
                      alt="pic"
                      className="aspect-video rounded-t-lg"
                    />
                  </a>
                  <div className="">
                    <div className="flex items-center justify-between pr-4">
                      <h3 className="mb-1 border-b p-3 text-base">Info</h3>
                      <AiFillLock />
                    </div>
                    <div className="space-y-2 p-4">
                      <label
                        htmlFor="linkTarget "
                        className="mb-2 block text-sm"
                      >
                        Size:
                      </label>
                      <a
                        href={base_urlBg + item.file_path}
                        className="hover:underline"
                        id="linkTarget"
                      >
                        {item.height}x {item.width} ✓
                      </a>
                      <label
                        htmlFor="lgOption"
                        className="my-2 block rounded-md text-sm"
                      >
                        Language:
                      </label>
                      {item.iso_639_1 ? (
                        <span className="block rounded-md bg-neutral-200 p-2">
                          {getFullCountryName(item.iso_639_1)}
                        </span>
                      ) : (
                        <span className="block rounded-md bg-neutral-200 p-2">
                          No Language
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
        : null}
      {type === "logos"
        ? (items as MovieImages).logos
            .filter(filterSearchFunction)
            .map((item, index) => {
              return (
                <div className="box-shadow: 10px 5px 5px black; min-w-[300px] flex-1 rounded-lg shadow-slate-400  ">
                  <a
                    href={base_urlBg + item.file_path}
                    className="hover:underline"
                    id={`linkTarget ${item.iso_639_1}`}
                  >
                    <img
                      src={base_url + item.file_path}
                      alt="pic"
                      className="aspect-video rounded-t-lg"
                    />
                  </a>
                  <div className="">
                    <div className="flex items-center justify-between pr-4">
                      <h3 className="mb-1 border-b p-3 text-base">Info</h3>
                      <AiFillLock />
                    </div>
                    <div className="space-y-2 p-4">
                      <label
                        htmlFor="linkTarget "
                        className="mb-2 block text-sm"
                      >
                        Size:
                      </label>
                      <a
                        href={base_urlBg + item.file_path}
                        className="hover:underline"
                        id="linkTarget"
                      >
                        {item.height}x {item.width} ✓
                      </a>
                      <label
                        htmlFor="lgOption"
                        className="my-2 block rounded-md text-sm"
                      >
                        Language:
                      </label>
                      {item.iso_639_1 ? (
                        <span className="block rounded-md bg-neutral-200 p-2">
                          {getFullCountryName(item.iso_639_1)}
                        </span>
                      ) : (
                        <span className="block rounded-md bg-neutral-200 p-2">
                          No Language
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
        : null}
      {type === "posters"
        ? (items as MovieImages).posters
            .filter(filterSearchFunction)
            .map((item, index) => {
              return (
                <div className="box-shadow: 10px 5px 5px black; flex-initial basis-1/5 rounded-lg shadow-slate-400  ">
                  <a
                    href={base_urlBg + item.file_path}
                    className="hover:underline"
                    id={`linkTarget ${item.iso_639_1}`}
                  >
                    <img
                      src={base_url + item.file_path}
                      alt="pic"
                      className="aspect-square   rounded-t-lg"
                    />
                  </a>
                  <div className="">
                    <div className="flex items-center justify-between pr-4">
                      <h3 className="mb-1 border-b p-3 text-base">Info</h3>
                      <AiFillLock />
                    </div>
                    <div className="space-y-2 p-4">
                      <label
                        htmlFor="linkTarget "
                        className="mb-2 block text-sm"
                      >
                        Size:
                      </label>
                      <a
                        href={base_urlBg + item.file_path}
                        className="hover:underline"
                        id="linkTarget"
                      >
                        {item.height}x {item.width} ✓
                      </a>
                      <label
                        htmlFor="lgOption"
                        className="my-2 block rounded-md text-sm"
                      >
                        Language:
                      </label>
                      {item.iso_639_1 ? (
                        <span className="block rounded-md bg-neutral-200 p-2">
                          {getFullCountryName(item.iso_639_1)}
                        </span>
                      ) : (
                        <span className="block rounded-md bg-neutral-200 p-2">
                          No Language
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
        : null}
    </div>
  );
}
export default MainMedia;
