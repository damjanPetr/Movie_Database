import { useLoaderData } from "react-router-dom";
import { TvDetails, episodeGroups } from "../../../types/types";
import Banner from "../../components/Banner";

function EpisodeGroups() {
  const { details, episodeGroups } = useLoaderData() as {
    details: TvDetails;
    episodeGroups: episodeGroups;
  };

  return (
    <>
      <Banner data={details} />
    </>
  );
}
export default EpisodeGroups;
