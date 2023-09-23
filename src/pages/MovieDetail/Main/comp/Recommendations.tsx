import { Link } from "react-router-dom";
import { still_300 } from "../../../../api/api";
import { MovieRecommendations } from "../../../../types/types";

type Props = {
  recommendations: MovieRecommendations["results"];
};
export default function Recommendations({ recommendations }: Props) {
  return (
    <div className="p-2">
      <h3 className="text-xl font-bold mb-2 ml-1.5 p-2">Recommendations</h3>
      <div className="scb flex overflow-x-auto space-x-4 ">
        {recommendations.length != 0 ? (
          recommendations.map((item) => {
            return (
              <div className="group w-60 rounded-lg flex-none " key={item.id}>
                <div className="">
                  <Link to={"/" + item.id + "/details"}>
                    {item.backdrop_path == null ? (
                      <div className="flex items-center justify-center bg-gray-300 w-full rounded-md h-[135px]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          color="gray"
                          width="50"
                          height="50"
                          viewBox="0 0 256 256"
                        >
                          <g fill="currentColor">
                            <path
                              d="M224 56v122.06l-39.72-39.72a8 8 0 0 0-11.31 0L147.31 164l-49.65-49.66a8 8 0 0 0-11.32 0L32 168.69V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8Z"
                              opacity=".2"
                            />
                            <path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20l-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52l80 80H40Zm176 28h-21.37l-36-36l20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z" />
                          </g>
                        </svg>
                        <div className="hidden group-hover:block">
                          {new Date(item.release_date).toLocaleDateString(
                            navigator.language,
                            { day: "numeric", month: "long" }
                          )}
                        </div>
                      </div>
                    ) : (
                      <img
                        src={still_300 + item.backdrop_path}
                        alt=""
                        className="rounded-lg"
                      />
                    )}
                  </Link>
                </div>
                <div className="flex justify-between px-1 py-1 mt-1">
                  <p className="font-medium ">{item.title}</p>
                  <p className="font-medium">
                    {Math.round(item.vote_average * 10)}%
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="ml-4">
            We don't have enough data to suggest any movies based on A Million
            Miles Away.
          </p>
        )}
      </div>
    </div>
  );
}
