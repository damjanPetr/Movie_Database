import { useLoaderData } from "react-router-dom";
import { MovieDetails, MovieImages, TvDetails } from "../../../types/types";
import Banner from "../../components/Banner";
import Nav from "../../components/Nav";
import AsideMedia from "../Comp/AsideMedia";
import MainMedia from "../Comp/MainMedia";

export default function Logos() {
  const { data, details } = useLoaderData() as {
    data: MovieImages;
    details: MovieDetails | TvDetails;
  };

  return (
    <>
      <Nav />
      <Banner data={details} />
      <main className="mx-auto flex w-11/12 max-sm:flex-col">
        <aside className="sm:w-[30%] p-4">
          <AsideMedia data={data} details={details} type="logos" />
        </aside>
        <article className="sm:w-[70%]">
          <MainMedia data={data} type="logos" />
        </article>
      </main>
    </>
  );
}
