import { useLoaderData } from "react-router-dom";
import { MovieDetails, MovieReleaseDate } from "../../../types/types";
import Banner from "../../components/Banner";
import AsideRelease from "./AsideRelease";
import TableRelease from "./TableRelease";

export type minReleaseDate = {
  certification: string;
  descriptors: string[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
};
export type FilteredReleaseDate = Record<string, minReleaseDate[]>;

type Props = {
  data: MovieReleaseDate;
  details: MovieDetails;
};

export default function ReleaseDate() {
  const { data, details } = useLoaderData() as Props;
  const dataFilter: FilteredReleaseDate = {};

  data.results.forEach((item) => {
    if (!dataFilter[item.iso_3166_1]) {
      dataFilter[item.iso_3166_1] = [];
    }
    item.release_dates.forEach((item2) => {
      dataFilter[item.iso_3166_1].push(item2);
    });
  });

  return (
    <>
      <Banner data={details} />
      <main className="mx-auto grid grid-cols-[30%_70%] px-10 py-7 max-w-screen-xl ">
        <AsideRelease asideTitle="Release Dates" data={dataFilter} />
        <TableRelease data={dataFilter} />
      </main>
    </>
  );
}
