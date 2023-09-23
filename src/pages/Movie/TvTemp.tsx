import { useLoaderData } from "react-router-dom";
import Filter from "./Comp/Filter";
import ShowSection from "./Comp/ShowSection";
import { TvShows, genresTV, languagesTV } from "../../types/types";
import { getDiscoverTV } from "../../api/api";
import { useState } from "react";

function TvTemp() {
  const { genres, languages, tvShows } = useLoaderData() as {
    genres: genresTV;
    languages: languagesTV;
    tvShows: TvShows;
  };

  const [twShowFilterData, setTwShowFilterData] = useState<TvShows>(tvShows);

  console.log(
    "🚀 ✔ file: TvTemp.tsx:17 ✔ TvTemp ✔ twShowFilterData:",
    twShowFilterData
  );

  async function filterCallback(args: string) {
    console.log(args);
    const tvShowData = await getDiscoverTV(args);
    setTwShowFilterData(tvShowData);
  }

  if (twShowFilterData === undefined) throw new Error("Error");

  return (
    <main className="mx-auto   max-w-screen-xl px-10 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Popular TV Shows</h1>
      <div className="flex justify-between">
        <Filter
          genres={genres}
          languages={languages}
          callback={filterCallback}
        />
        <ShowSection tvShows={twShowFilterData} />
      </div>
    </main>
  );
}
export default TvTemp;
