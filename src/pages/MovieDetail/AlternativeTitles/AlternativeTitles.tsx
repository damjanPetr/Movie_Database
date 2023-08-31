import { useLoaderData } from "react-router-dom";
import { MovieAltTitles, MovieDetails } from "../../../types/types";
import Aside from "../../components/Aside";
import Banner from "../../components/Banner";
import Table from "../../components/Table";

// type Props = {};
export type minaltTitles = {
  iso_3166_1: string;
  title: string;
  type: string;
};
export type filterArrayTitles = Record<string, minaltTitles[]>;

export default function AlternativeTitles() {
  const { details, altTitles } = useLoaderData() as {
    details: MovieDetails;
    altTitles: MovieAltTitles;
  };
  const saveData: filterArrayTitles = {};

  altTitles.titles.forEach((item) => {
    if (!saveData[item.iso_3166_1]) {
      saveData[item.iso_3166_1] = [];
    }

    saveData[item.iso_3166_1].push(item);
  });

  return (
    <>
      <Banner movieDetail={details} />
      <main className="mx-auto grid w-10/12 grid-cols-[30%_70%] p-4">
        <Aside data={saveData} asideTitle={"Alternative Titles"} />
        <Table data={saveData} />
      </main>
    </>
  );
}
