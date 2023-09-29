import { Link } from "react-router-dom";
import { still_92 } from "../../api/api";
import { MovieDetails, TvDetails } from "../../types/types";

type Props = {
  data: MovieDetails | TvDetails;
  tv?: boolean;
};
export default function Banner({ data, tv }: Props) {
  return (
    <section className=" bg-zinc-600  text-white py-1.5 px-10">
      <div className="mr-auto flex p-2 items-center">
        <img
          src={still_92 + data.poster_path}
          className="rounded-md w-16 flex-none "
        />
        <div className=" pl-5">
          <h1 className="mb-4 text-3xl font-bold">
            {"release_date" in data ? data.title : data.name}{" "}
            <span className="text-gray-300">
              {("release_date" in data
                ? data.release_date
                : data.first_air_date
              ).slice(0, 4)}
            </span>
          </h1>
          <Link
            to={"../details"}
            className="ml-1  flex items-center font-bold text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M20 12H4m0 0l6-6m-6 6l6 6"
              />
            </svg>
            <span className="ml-1">Go back to main</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
