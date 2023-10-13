import { useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner";
import { MovieDetails, MovieTranslations } from "../../../types/types";
import Table from "../../components/Table";
import Aside from "../../components/Aside";

export type filteredTranslations = {
  [x: string]: MovieTranslations["translations"];
};

export type minTranslations = {
  iso_3166_1: string;
  iso_639_1: string;
  name: string;
  english_name: string;
  data: {
    homepage: string;
    overview: string;
    runtime: number;
    tagline: string;
    title: string;
  };
};
export default function Translations() {
  const { details, data } = useLoaderData() as {
    details: MovieDetails;
    data: MovieTranslations;
  };

  // if ("results" in data) {
  //   data.results.forEach((item) => {
  //     if (!saveData[item.iso_3166_1]) {
  //       saveData[item.iso_3166_1] = [];
  //     }
  //     saveData[item.iso_3166_1].push(item);
  //   });
  // } else if ("titles" in data) {
  //   data.titles.forEach((item) => {
  //     if (!saveData[item.iso_3166_1]) {
  //       saveData[item.iso_3166_1] = [];
  //     }
  //     saveData[item.iso_3166_1].push(item);
  //   });
  // }
  // Object.keys(saveData).forEach((item) => {
  //   console.log(saveData[item]);
  // });

  return (
    <>
      <Banner data={details} />
      <main className="mx-auto grid px-10 py-7 grid-cols-[30%_70%] p-4 max-w-screen-xl max-sm:grid-cols-1 max-sm:gap-y-5 ">
        <Aside asideTitle="Translations" data={data} />
        <Table data={data} purpose="translations" />
      </main>
    </>
  );
}
