import { json, useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner";
import { MovieCredits, MovieDetails } from "../../../types/types";
import { still_182, still_92 } from "../../../api/api";
import { BiCloudLightRain } from "react-icons/bi";

export type departmentFilter = Record<string, MovieCredits["crew"]>;

export default function CastCrew() {
  const { details, castCrew } = useLoaderData() as {
    details: MovieDetails;
    castCrew: MovieCredits;
  };

  console.log(castCrew);

  const castSorted = castCrew.cast.sort((a, z) => a.order - z.order);
  const crewSorter = castCrew.crew.sort((a, z) => a.order - z.order);

  const department: departmentFilter = {};

  crewSorter.forEach((item) => {
    if (!department[item.known_for_department]) {
      department[item.known_for_department] = [];
    }
    department[item.known_for_department].push(item);
  });
  return (
    <>
      <Banner movieDetail={details} />
      <div className="mx-auto flex w-11/12 ">
        {
          <div className="cast w-1/2">
            <h2 className="ml-2 p-2">
              Cast: <span className="text-gray-400">{crewSorter.length}</span>
            </h2>
            {castSorted.map((item, index) => {
              return (
                <div className="flex p-2" key={index}>
                  <div className="p-2">
                    {item.profile_path ? (
                      <img
                        src={still_182 + item.profile_path}
                        alt=""
                        className="rounded-md"
                      />
                    ) : (
                      <div className="">
                        <img
                          src={
                            "assets/noun-user-2063433.svg"
                          }
                          className=" h-[278px] w-[185px] rounded-md bg-slate-300 object-contain text-white shadow-inner shadow-black "
                          alt=""
                        />
                      </div>
                    )}
                  </div>
                  <div className="my-auto ml-2 basis-1/2">
                    <h3 className="m-2 inline text-xl">{item.name}</h3>
                    <p className="m-2 text-lg">{item.character}</p>
                  </div>
                </div>
              );
            })}
          </div>
        }
        <div className="crev w-1/2">
          <h2 className="ml-2 p-2 text-lg">
            Cast: <span className="text-gray-400">{crewSorter.length}</span>
          </h2>
          {Object.entries(department).map((key, value) => {
            return (
              <div key={value}>
                <h1 className="ml-2 p-2 text-lg">{key[0]}</h1>
                {key[1].map((item, index) => {
                  return (
                    <div className="flex p-2" key={"crew" + index}>
                      <div className="p-2">
                        {item.profile_path ? (
                          <img
                            src={still_182 + item.profile_path}
                            alt=""
                            className="rounded-md"
                          />
                        ) : (
                          <div className="">
                            <img
                              src={
                                "assets/noun-user-2063433.svg"
                              }
                              className=" h-[278px] w-[185px] rounded-md bg-slate-300 object-contain text-white shadow-inner shadow-black "
                              alt=""
                            />
                          </div>
                        )}
                      </div>
                      <div className="my-auto ml-2 basis-1/2">
                        <h3 className="text-xl">{item.name}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
