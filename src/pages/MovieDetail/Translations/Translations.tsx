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

  const dataObject: filteredTranslations = {};
  data.translations.forEach((item) => {
    if (!dataObject[item.iso_3166_1]) {
      dataObject[item.iso_3166_1] = [];
    }
    dataObject[item.iso_3166_1].push(item);
  });
  console.log(
    "🚀 ~ file: Translations.tsx:15 ~ Translations ~ dataObject:",
    dataObject
  );
  return (
    <>
      <Banner movieDetail={details} />

      <main className="mx-auto grid w-10/12 grid-cols-[30%_70%] p-4">
        <Aside asideTitle="Translations" data={dataObject} />
        <Table data={dataObject} />
      </main>
    </>
  );
}
