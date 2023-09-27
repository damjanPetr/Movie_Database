import { TvShows } from "../../../types/types";
import TvShowsTempCard from "./TvShowsTempCard";

type Props = {
  tvShows: TvShows;
};

function ShowSection({ tvShows }: Props) {
  return (
    <div className="flex justify-between flex-wrap pl-7 gap-4  max-[700px]:justify-center min-[850px]:max-[880px]:gap-2 min-[800px]:max-[900px]:justify-around content-start  max-[480px]:flex-col max-[480px]:mt-10 ">
      {tvShows.results.length > 0 ? (
        tvShows.results.map((tvShow) => (
          <TvShowsTempCard key={tvShow.id} tvShow={tvShow} />
        ))
      ) : (
        <p>No items were found that match your query.</p>
      )}
      <div className=" flex-none  w-[170px] "></div>
    </div>
  );
}
export default ShowSection;
