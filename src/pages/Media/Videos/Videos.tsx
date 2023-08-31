import { useLoaderData } from "react-router-dom";
import { MovieDetails, MovieVideos } from "../../../types/types";
import Banner from "../../components/Banner";
import AsideVideo from "./Comp/AsideVideo";
import MainVideo from "./Comp/MainVideo";
import { videoResults } from "./Teasers/Teasers";

export default function Videos() {
  const { data, details } = useLoaderData() as {
    data: MovieVideos;
    details: MovieDetails;
  };

  const dataFilterBytitle: { [x: string]: videoResults } = {};

  data.results.forEach((item) => {
    if (!dataFilterBytitle[item.type]) {
      dataFilterBytitle[item.type] = [];
    }

    dataFilterBytitle[item.type].push(item);
  });

  return (
    <>
      <Banner movieDetail={details} />
      <main className="mx-auto flex w-11/12">
        <aside className="w-[30%] border p-4">
          <AsideVideo data={dataFilterBytitle} type="trailers" />
        </aside>
        <article className="w-[70%]">
          <MainVideo data={data} />
        </article>
      </main>
    </>
  );
}
