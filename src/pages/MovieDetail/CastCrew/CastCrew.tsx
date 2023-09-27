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
      <Banner data={details} />
      <div className="mx-auto flex w-11/12 ">
        {
          <div className="cast w-1/2">
            <h2 className="ml-2 p-2 text-2xl font-medium">
              Cast:{" "}
              <span className="text-gray-400">{castCrew.cast.length}</span>
            </h2>
            <div className="space-y-2.5">
              {castSorted.map((item, index) => {
                return (
                  <div className="flex " key={index}>
                    <div className=" w-[66px] h-[66px] flex-none flex items-center">
                      {item.profile_path ? (
                        <img
                          src={still_92 + item.profile_path}
                          alt=""
                          className="rounded-md w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="fci w-full rounded-md border border-gray-400 bg-gray-200  text-white shadow-black h-full">
                          {item.gender === 1 ? (
                            <div className=" text-gray-400  ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="30"
                                viewBox="0 0 22 24"
                              >
                                <path
                                  fill="currentColor"
                                  d="M14.041 16.683a14.884 14.884 0 0 1-.035-.72c2.549-.261 4.338-.872 4.338-1.585c-.007 0-.006-.03-.006-.041C16.432 12.619 19.99.417 13.367.663a3.344 3.344 0 0 0-2.196-.664h.008C2.208.677 6.175 12.202 4.13 14.377h-.004c.008.698 1.736 1.298 4.211 1.566c-.007.17-.022.381-.054.734C7.256 19.447.321 18.671.001 24h22.294c-.319-5.33-7.225-4.554-8.253-7.317z"
                                />
                              </svg>
                            </div>
                          ) : (
                            <div className=" text-gray-400  ">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="30"
                                viewBox="0 0 22 24"
                                className=""
                              >
                                <path
                                  fill="currentColor"
                                  d="M14.145 16.629a23.876 23.876 0 0 1-.052-2.525l-.001.037a4.847 4.847 0 0 0 1.333-2.868l.002-.021c.339-.028.874-.358 1.03-1.666a1.217 1.217 0 0 0-.455-1.218l-.003-.002c.552-1.66 1.698-6.796-2.121-7.326C13.485.35 12.479 0 11.171 0c-5.233.096-5.864 3.951-4.72 8.366a1.222 1.222 0 0 0-.455 1.229l-.001-.008c.16 1.306.691 1.638 1.03 1.666a4.858 4.858 0 0 0 1.374 2.888a24.648 24.648 0 0 1-.058 2.569l.005-.081C7.308 19.413.32 18.631 0 24h22.458c-.322-5.369-7.278-4.587-8.314-7.371z"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="my-auto ml-6 basis-1/2 flex  flex-col">
                      <h3 className=" inline font-bold">{item.name}</h3>
                      <p className=" text-sm">{item.character}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        }
        <div className="crev w-1/2">
          <h2 className="ml-2 p-2 text-2xl font-medium">
            Crew: <span className="text-gray-400">{castCrew.crew.length}</span>
          </h2>
          <div className="space-y-2.5">
            {Object.entries(department).map((key, value) => {
              return (
                <div key={value}>
                  <h1 className="ml-2  font-bold">{key[0]}</h1>
                  {key[1].map((item, index) => {
                    return (
                      <div className="flex p-2" key={"crew" + index}>
                        <div className="flex " key={index}>
                          <div className=" w-[66px] h-[66px] flex-none flex items-center">
                            {item.profile_path ? (
                              <img
                                src={still_92 + item.profile_path}
                                alt=""
                                className="rounded-md w-full h-full object-cover object-center"
                              />
                            ) : (
                              <div className="fci w-full rounded-md border border-gray-400 bg-gray-200  text-white shadow-black h-full">
                                {item.gender === 1 ? (
                                  <div className=" text-gray-400  ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="28"
                                      height="30"
                                      viewBox="0 0 22 24"
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M14.041 16.683a14.884 14.884 0 0 1-.035-.72c2.549-.261 4.338-.872 4.338-1.585c-.007 0-.006-.03-.006-.041C16.432 12.619 19.99.417 13.367.663a3.344 3.344 0 0 0-2.196-.664h.008C2.208.677 6.175 12.202 4.13 14.377h-.004c.008.698 1.736 1.298 4.211 1.566c-.007.17-.022.381-.054.734C7.256 19.447.321 18.671.001 24h22.294c-.319-5.33-7.225-4.554-8.253-7.317z"
                                      />
                                    </svg>
                                  </div>
                                ) : (
                                  <div className=" text-gray-400  ">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="28"
                                      height="30"
                                      viewBox="0 0 22 24"
                                      className=""
                                    >
                                      <path
                                        fill="currentColor"
                                        d="M14.145 16.629a23.876 23.876 0 0 1-.052-2.525l-.001.037a4.847 4.847 0 0 0 1.333-2.868l.002-.021c.339-.028.874-.358 1.03-1.666a1.217 1.217 0 0 0-.455-1.218l-.003-.002c.552-1.66 1.698-6.796-2.121-7.326C13.485.35 12.479 0 11.171 0c-5.233.096-5.864 3.951-4.72 8.366a1.222 1.222 0 0 0-.455 1.229l-.001-.008c.16 1.306.691 1.638 1.03 1.666a4.858 4.858 0 0 0 1.374 2.888a24.648 24.648 0 0 1-.058 2.569l.005-.081C7.308 19.413.32 18.631 0 24h22.458c-.322-5.369-7.278-4.587-8.314-7.371z"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <div className="my-auto ml-6 basis-1/2 flex  flex-col">
                            <h3 className=" inline font-bold">{item.name}</h3>
                            <p className=" text-sm">{item.character}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
