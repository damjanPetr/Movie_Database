import { base_url } from "../../../api/api";
import { MovieDetails, TvDetails } from "../../../types/types";

type Props = {
  itemDetail: MovieDetails | TvDetails;
};
function MovieDetailAside({ itemDetail: movieDetail }: Props) {
  return (
    <aside className="min-w-[25%]    pt-8">
      <div className="mb-6">
        <div className="mb-5  ">
          <strong className=" font-bold">Status</strong>
          <p className="">{movieDetail.status}</p>
        </div>
        <div className="mb-5  ">
          <strong className="   font-bold">Original Language:</strong>
          <p className="">
            {new Intl.DisplayNames(navigator.language, { type: "language" }).of(
              movieDetail.original_language
            )}
          </p>
        </div>
        <div className="mb-5  ">
          <strong className="   font-bold"> Budget</strong>
          <p className="">
            {"budget" in movieDetail
              ? new Intl.NumberFormat(navigator.language, {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                  unitDisplay: "long",
                  notation: "standard",
                }).format(movieDetail.budget)
              : "-"}
          </p>
        </div>
        <div className="mb-5  ">
          <strong className="   font-bold">Revenue</strong>
          <p className="">
            {"revenue" in movieDetail
              ? new Intl.NumberFormat(navigator.language, {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 2,
                  unitDisplay: "long",
                  notation: "standard",
                }).format(movieDetail.revenue)
              : "-"}
          </p>
        </div>

        <div className="mb-2">
          <p className="font-bold">Keywords</p>
        </div>

        <ul className="flex flex-wrap  content-center gap-2 ">
          {("results" in movieDetail.keywords
            ? movieDetail.keywords.results
            : movieDetail.keywords.keywords
          ).map((item) => {
            return (
              <li
                className="p-2 bg-gray-200 rounded-sm text-sm font-"
                key={item.id}
              >
                {item.name}
              </li>
            );
          })}
        </ul>
        <hr className="my-10" />
        <div className="">
          {/* <h3 className="font-bold">Content Score</h3> */}
          <div className=" rounded-lg">
            {/* <div className="">{movieDetail.}</div> */}
            <div className=""></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
export default MovieDetailAside;
