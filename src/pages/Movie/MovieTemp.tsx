import { useCountry } from "../../utils/hooks";
import Filter from "./Comp/Filter";
import ShowSection from "./Comp/ShowSection";

function MovieTemp() {
  return (
    <main className="mx-auto  w-11/12 max-w-screen-xl px-10 py-8">
      <h1 className="mb-6 text-2xl font-bold">Popular Movies</h1>
      <div className="flex justify-between">
        <Filter />
        <ShowSection />
      </div>
    </main>
  );
}
export default MovieTemp;
