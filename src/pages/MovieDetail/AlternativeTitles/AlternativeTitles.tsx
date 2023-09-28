import { useLoaderData } from "react-router-dom";
import {
  MovieAltTitles,
  MovieDetails,
  TvDetails,
  tvAltTitles,
} from "../../../types/types";
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
    details: MovieDetails | TvDetails;
    altTitles: MovieAltTitles | tvAltTitles;
  };
  const saveData: filterArrayTitles = {};

  // altTitles["results" in altTitles ? "results" : "titles"].forEach((item) => {
  //   if (!saveData[item.iso_3166_1]) {
  //     saveData[item.iso_3166_1] = [];
  //   }

  //   saveData[item.iso_3166_1].push(item);
  // });

  if ("results" in altTitles) {
    altTitles.results.forEach((item) => {
      if (!saveData[item.iso_3166_1]) {
        saveData[item.iso_3166_1] = [];
      }

      saveData[item.iso_3166_1].push(item);
    });
  } else {
    altTitles.titles.forEach((item) => {
      if (!saveData[item.iso_3166_1]) {
        saveData[item.iso_3166_1] = [];
      }

      saveData[item.iso_3166_1].push(item);
    });
  }

  return (
    <>
      {"release_date" in details ? (
        <Banner data={details} />
      ) : (
        <Banner data={details} tv={true} />
      )}

      <main className="mx-auto grid w-10/12 grid-cols-[30%_70%] p-4">
        <Aside data={saveData} asideTitle={"Alternative Titles"} />
        <Table data={saveData} />
      </main>
    </>
  );
}
