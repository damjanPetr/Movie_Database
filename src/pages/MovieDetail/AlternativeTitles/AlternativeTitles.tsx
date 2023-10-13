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
export type filterArrayTitles = minaltTitles;

export default function AlternativeTitles() {
  const { details, altTitles } = useLoaderData() as {
    details: MovieDetails | TvDetails;
    altTitles: MovieAltTitles | tvAltTitles;
  };

  // Object.keys(saveData).forEach((item) => {
  //   console.log(saveData[item]);
  // });

  return (
    <>
      {"release_date" in details ? (
        <Banner data={details} />
      ) : (
        <Banner data={details} tv={true} />
      )}

      <main className="mx-auto grid w-10/12 grid-cols-[30%_70%] p-4 max-w-screen-xl max-sm:grid-cols-1 max-sm:gap-y-5">
        <Aside data={altTitles} asideTitle={"Alternative Titles"} />
        <Table data={altTitles} purpose="altTitles" />
      </main>
    </>
  );
}
