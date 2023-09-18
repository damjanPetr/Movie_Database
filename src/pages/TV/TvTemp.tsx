import { useLoaderData } from "react-router-dom";
import Filter from "../Movie/Comp/Filter";
import ShowSection from "../Movie/Comp/ShowSection";
import { genres } from "../../types/types";

function TvTemp() {
  const { genres } = useLoaderData() as { genres: genres };

  return (
    <main className="mx-auto  w-11/12 max-w-screen-xl px-10 py-8">
      <h1 className="mb-6 text-2xl font-bold">Popular Movies</h1>
      <div className="flex justify-between">
        <Filter genres={genres} />
        <ShowSection />
      </div>
    </main>
  );
}
export default TvTemp;
