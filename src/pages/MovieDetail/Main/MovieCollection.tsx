import { useEffect, useState } from "react";
import { movieCollection, still_300 } from "../../../api/api";
import { MovieDetails, collections } from "../../../types/types";

type Props = {
  movieDetail: MovieDetails;
};
function MovieCollection({ movieDetail }: Props) {
  const { belongs_to_collection, title } = movieDetail;

  const [collection, setCollection] = useState<collections>();

  useEffect(() => {
    const getCollections = async () => {
      if (belongs_to_collection != null) {
        const data = (await movieCollection(
          belongs_to_collection.id
        )) as collections;

        setCollection(data);
      }
    };
    getCollections();
  }, [belongs_to_collection]);

  if (!collection) return <div>Loading Collection...</div>;
  return (
    <div
      className="flex  items-center justify-center px-5 bg-cover object-center h-64 rounded-md text-white bg-black/60 bg-blend-color"
      style={{
        backgroundImage: `url(${still_300 + collection?.backdrop_path})`,
      }}
    >
      <div className="">
        <h3 className=" text-3xl font-semibold       ">
          Part of the {collection?.name}
        </h3>
        <div className="font-normal">
          Includes{" "}
          {collection?.parts.map((item, index) => {
            return index === collection.parts.length - 1 ? (
              <span key={item.id}>and {item.title} </span>
            ) : (
              <span key={item.id}>{item.title} </span>
            );
          })}
        </div>
        <div className="py-2 px-4 btn-active mt-5 bg-stone-600 rounded-full w-fit hover:bg-stone-700">
          <a href="" className="text-lg font-semibold">
            View The Collection
          </a>
        </div>
      </div>
    </div>
  );
}
export default MovieCollection;
