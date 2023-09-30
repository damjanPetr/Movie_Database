import { Link, useLoaderData } from "react-router-dom";
import { TVbase, TvDetails } from "../../../types/types";
import Banner from "../../components/Banner";
import { still_182 } from "../../../api/api";

function Seasons() {
  const { details } = useLoaderData() as { details: TvDetails };

  console.log("🚀 ✔ file: Seasons.tsx:9 ✔ Seasons ✔ details:", details);

  return (
    <div>
      <Banner data={details} />

      {details.seasons.map((item) => {
        return (
          <div key={item.id} className="py-5  max-w-screen-xl mx-auto    ">
            <section className="px-10 flex items-center md:px-20  ">
              {item.air_date ? (
                <img
                  src={still_182 + item.poster_path}
                  alt=""
                  className=" w-[100px] h-[150px] rounded-md"
                />
              ) : (
                <div className="w-[100px] h-[150px] rounded-md bg-gray-200 fci">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    color="gray"
                    width="50"
                    height="50"
                    viewBox="0 0 256 256"
                    className="w-1/2"
                  >
                    <g fill="currentColor">
                      <path
                        d="M224 56v122.06l-39.72-39.72a8 8 0 0 0-11.31 0L147.31 164l-49.65-49.66a8 8 0 0 0-11.32 0L32 168.69V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8Z"
                        opacity=".2"
                      />
                      <path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20l-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52l80 80H40Zm176 28h-21.37l-36-36l20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z" />
                    </g>
                  </svg>
                </div>
              )}
              {/* Content */}
              <div className="  ml-7 flex items-center">
                <div className="">
                  <Link
                    to={`/tv/${details.id}/season/${item.season_number}`}
                    className="text-2xl font-bold"
                  >
                    {item.name}
                  </Link>
                  <div className="font-semibold flex items-center">
                    {item.air_date !== null ? (
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
                    ) : (
                      <div></div>
                    )}
                    <span>
                      {`${
                        item.air_date
                          ? item.air_date.slice(0, 4) + " • "
                          : "—" + " • "
                      }  ${item.episode_count} Episodes`}
                    </span>
                  </div>

                  {item.air_date ? (
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
                  ) : (
                    <p>
                      We don't have an overview translated in English. Help us
                      expand our database by adding one.
                    </p>
                  )}

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
