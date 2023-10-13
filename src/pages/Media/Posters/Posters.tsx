import { useLoaderData } from "react-router-dom";
import { MovieDetails, MovieImages } from "../../../types/types";
import Banner from "../../components/Banner";
import MainMedia from "../Comp/MainMedia";
import AsideMedia from "../Comp/AsideMedia";
import Nav from "../../components/Nav";

export default function Posters() {
  const { data, details } = useLoaderData() as {
    data: MovieImages;
    details: MovieDetails;
  };
  return (
    <>
      <Nav />
      <Banner data={details} />
      <main className="mx-auto flex w-11/12 max-w-screen-2xl max-sm:flex-col">
        <aside className="sm:w-[25%]  p-4">
          <AsideMedia data={data} details={details} type="posters" />
        </aside>
        <article className="sm:w-[75%]">
          <MainMedia data={data} type="posters" />
        </article>
      </main>
    </>
  );
}
