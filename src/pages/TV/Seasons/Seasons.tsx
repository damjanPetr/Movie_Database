import { Link, useLoaderData } from "react-router-dom";
import { TVbase, TvDetails } from "../../../types/types";
import Banner from "../../components/Banner";
import { still_182 } from "../../../api/api";

function Seasons() {
  const { details } = useLoaderData() as { details: TvDetails };

  return (
    <div>
      <Banner data={details} />

      {details.seasons.map((item) => {
        return (
          <div key={item.id} className="py-5">
            <section className="px-10 flex items-center ">
              <img
                src={still_182 + item.poster_path}
                alt=""
                className=" w-[100px] h-[150px] rounded-md"
              />
              {/* Content */}
              <div className="  ml-7 flex items-center">
                <div className="">
                  <Link to={"/tv/" + item.id} className="text-2xl font-bold">
                    {item.name}
                  </Link>
                  <div className="font-semibold flex items-center">
                    <span className="bg-black text-white px-1.5 inline-flex text-sm w-fit items-center rounded-lg py-[1px] mr-2  ">
                      <svg
                        className="mr-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                        />
                      </svg>
                      {item.vote_average != 0 ? item.vote_average : null}
                    </span>
                    {`${item.air_date.slice(0, 4)} • ${
                      item.episode_count
                    } Episodes`}
                  </div>
                  <div className="">
                    Season <span>{item.season_number}</span> of {details.name}{" "}
                    premiered on{" "}
                    {new Date(item.air_date).toLocaleDateString(
                      navigator.language,
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </div>
                  <p className="pt-5">{item.overview}</p>
                </div>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
}
export default Seasons;
