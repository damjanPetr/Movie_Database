import { useLoaderData } from "react-router-dom";
import Filter from "./Comp/Filter";
import ShowSection from "./Comp/ShowSection";
import { TvShows, genresTV, languagesTV } from "../../types/types";

function TvTemp() {
  const { genres, languages, tvShows } = useLoaderData() as {
    genres: genresTV;
    languages: languagesTV;
    tvShows: TvShows;
  };
  return (
    <main className="mx-auto   max-w-screen-xl px-10 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Popular TV Shows</h1>
      <div className="flex justify-between">
        <Filter genres={genres} languages={languages} />
        <ShowSection tvShows={tvShows} />
      </div>
    </main>
  );
}
export default TvTemp;
