import { useLoaderData } from "react-router-dom";
import { MovieDetails, MovieImages } from "../../../types/types";
import Banner from "../../components/Banner";
import MainMedia from "../Comp/MainMedia";
import AsideMedia from "../Comp/AsideMedia";
import Nav from "../../components/Nav";

export default function Backdrops() {
  const { data, details } = useLoaderData() as {
    data: MovieImages;
    details: MovieDetails;
  };

  return (
    <>
      <Nav />
      <Banner movieDetail={details} />

      <main className="mx-auto flex w-11/12 max-w-screen-2xl">
        <aside className="w-[25%]  p-4">
          <AsideMedia data={data} details={details} type="backdrops" />
        </aside>
        <article className="w-[75%]">
          <MainMedia data={data} type="backdrops" />
        </article>
      </main>
    </>
  );
}
