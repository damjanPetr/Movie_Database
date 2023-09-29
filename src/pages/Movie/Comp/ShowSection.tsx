import { TvShows } from "../../../types/types";
import { Movie, MovieProps } from "../../Home/comp/ContentBlock";
import TvShowsTempCard from "./TvShowsTempCard";

type Props = {
  cardData: TvShows | MovieProps;
  movies: boolean;
};

function ShowSection({ cardData, movies }: Props) {
  console.log("%c heoatnuo", "background: pink", cardData);
  return (
    <div className="flex justify-between flex-wrap pl-7 gap-4  max-[700px]:justify-center min-[850px]:max-[880px]:gap-2 min-[800px]:max-[900px]:justify-around content-start  max-[480px]:flex-col max-[480px]:mt-10 ">
      {cardData.results.length > 0 ? (
        cardData.results.map((item) => (
          <TvShowsTempCard key={item.id} cardData={item} />
        ))
      ) : (
        <p>No items were found that match your query.</p>
      )}
      <div className=" flex-none  w-[170px] "></div>
    </div>
  );
}
export default ShowSection;
