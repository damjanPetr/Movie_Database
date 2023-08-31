import { Link } from "react-router-dom";
import { still_92 } from "../../api/api";
import { MovieDetails } from "../../types/types";

type Props = {
  movieDetail: MovieDetails;
};
export default function Banner({ movieDetail }: Props) {
  return (
    <section className=" bg-zinc-600  text-white">
      <div className="ml-8 mr-auto flex p-2">
        <img src={still_92 + movieDetail.poster_path} className="rounded-md" />
        <div className=" p-6">
          <h1 className="mb-4 text-6xl capitalize">
            {movieDetail.title}{" "}
            <span className="text-gray-300">
              ({movieDetail.release_date.slice(0, 4)})
            </span>
          </h1>
          <Link to={"../details"} className="ml-1 text-sm">
            {"\t <-"} Go back to main
          </Link>
        </div>
      </div>
    </section>
  );
}
