import { AiFillLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import { base_url, base_urlBg } from "../../../api/api";
import { MovieImages } from "../../../types/types";

type Props = {
  data: MovieImages;
  type: "backdrops" | "posters" | "logos";
};

function MainMedia({ data, type }: Props) {
  const imagesArray: MovieImages["backdrops"] = [];
  //place all images in same array
  // const key = "logos" && "posters" && "backdrops";
  const key = type;
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
    <div className="mx-auto flex max-w-7xl flex-wrap content-center items-start justify-start gap-4 pl-7 py-4">
      {imagesArray.map((item) => {
        return (
          <div
            key={item.id}
            className="shadow-md flex-initial  rounded-lg w-40 "
          >
            <Link
              to={base_urlBg + item.file_path}
              className="hover:underline"
              id={`linkTarget ${item.iso_639_1}`}
            >
              <img
                src={base_url + item.file_path}
                alt="pic"
                className={` rounded-t-lg ${
                  type == "logos"
                    ? "p-4 object-fill h-[100px] object-center "
                    : ""
                }`}
              />
            </Link>
            <div className="py-2.5 ">
              <div className="flex items-center justify-between px-3.5 mb-2   border-b">
                <h3 className="mb-1 ">Info</h3>
                <AiFillLock />
              </div>
              <div className="space-y-2 p-4">
                <p className="mb-2  ">Size:</p>
                <a
                  href={base_urlBg + item.file_path}
                  className="hover:underline"
                  id="linkTarget"
                >
                  {item.height}x {item.width} ✓
                </a>
                <div className=""></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MainMedia;
