import { TvShows } from "../../../types/types";
import TvShowsTempCard from "./TvShowsTempCard";

type Props = {
  tvShows: TvShows;
};

function ShowSection({ tvShows }: Props) {
  console.log(tvShows);
  return (
    <div className="flex justify-between flex-wrap pl-7 gap-4 content-center  min-[850px]:max-[880px]:gap-2 min-[800px]:max-[880px]:justify-around ">
      {tvShows.results.map((tvShow) => (
        <TvShowsTempCard key={tvShow.id} tvShow={tvShow} />
      ))}
      <div className=" flex-none  w-[170px] "></div>
    </div>
  );
}
export default ShowSection;
