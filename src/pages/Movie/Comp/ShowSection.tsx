import { useState, useEffect } from "react";
import { TvShows } from "../../../types/types";
import TvShowsTempCard from "./TvShowsTempCard";

type Props = {
  tvShows: TvShows;
};

function ShowSection({ tvShows }: Props) {
  return (
    <div className="flex justify-between flex-wrap pl-7 gap-4 min-[850px]:max-[880px]:gap-2 min-[800px]:max-[880px]:justify-around content-start  ">
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
