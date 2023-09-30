import { useState } from "react";
import { ScrollRestoration, useLoaderData } from "react-router-dom";
import { getTvSeasonImages, still_182, still_92 } from "../../../api/api";
import {
  TvDetails,
  TvSeasonDetails,
  episodeImages,
} from "../../../types/types";

function SeasonDetails() {
  const [seasonImages, setSeasonImages] = useState<episodeImages | null>(null);
  const { details, season } = useLoaderData() as {
    details: TvDetails;
    season: TvSeasonDetails;
  };

  console.log(season);
  return (
    <div className="max-w-screen-xl mx-auto">
      <ScrollRestoration />
      <section className=" flex justify-end ">
        <div className="pr-5"> {}</div>
      </section>
      <div className="px-10 py-[30px]">
        {season.episodes.map((item) => {
          return (
            /* Container */
            <div className="rounded-lg shadow-md group mb-5 " key={item.id}>
              {/* card not opened */}
              <div className="flex items-center">
                <div className="h-[130px] w-[230px]">
                  {item.still_path ? (
                    <img
                      src={still_182 + item.still_path}
                      alt=""
                      className="w-full h-full rounded-tl-lg"
                    />
                  ) : (
                    <div className=" rounded-md bg-gray-200 fci w-full h-full">
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
                </div>
                {/* Content */}
                <div className="items-center py-2.5 px-5 w-full  border-b min-h-[130px] ">
                  {/* title */}
                  <div className="title flex w-full">
                    <div className="text-lg font-bold px-2">{`${item.episode_number}`}</div>
                    <div className="">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <div className="flex">
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
                          <span className="font-semibold">
                            {item.vote_average != 0 ? item.vote_average : "0.0"}
                          </span>
                        </span>
                        <div className="text-sm text-gray-400 font-medium">
                          <span>{" • "}</span>
                          <span>{item.runtime}m</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* title end */}
                  <div className="mt-5 text-sm">{item.overview}</div>
                </div>

                {/* Content End*/}
              </div>
              {/* Open Btn */}
              <div className="">
                <div
                  className="fci group-open:hidden cursor-pointer"
                  onClick={async (e: React.MouseEvent<HTMLDivElement>) => {
                    e.currentTarget.parentElement?.parentElement?.classList.toggle(
                      "open"
                    );
                    const data = await getTvSeasonImages(
                      details.id,
                      season.season_number,
                      item.episode_number
                    );
                    setSeasonImages(data);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-open:rotate-45 text-gray-400"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"
                    />
                  </svg>
                  <button className="font-semibold text-sm">Expand</button>
                </div>
                {/* <div className="hidden group-open:flex text-gray-400 justify-between px-5">
                  <Link to={"../videos"}>Videos</Link>
                  <Link to={"../images"}>Images</Link>
                  <Link to={"../changes"}>Changes</Link>
                  <Link to={"../report"}>Report</Link>
                  <Link to={"../edit"}>Edit</Link>
                </div> */}
              </div>
              {/* Open Btn End */}
              {/* Dropdown */}

              <div className="group-open:block hidden px-5 py-4">
                {/* Cast & Crew */}
                <div className="flex items-start ">
                  {/* crew */}
                  <div className="text-sm w-1/3">
                    <div className="mb-2 text-base font-semibold">
                      Crew{" "}
                      <span className="text-gray-400">{item.crew.length}</span>
                    </div>
                    <div className="">
                      <span className="font-semibold">Directed by: </span>
                      <span>
                        {item.crew.filter((item) => item.job === "Director")[0]
                          ?.name ?? " No director has been added."}
                      </span>
                    </div>
                    <div className="">
                      <span className="font-semibold"> Written by: </span>
                      <span>
                        {item.crew.filter((item) => item.job === "Writter")[0]
                          ?.name ?? " No writter has been added."}
                      </span>
                    </div>
                  </div>
                  {/* crew end */}
                  {/* guest_stars */}
                  <div className="text-sm w-2/3">
                    <div className="mb-2 text-base font-semibold">
                      Guest Stars{" "}
                      <span className="text-gray-400">
                        {item.guest_stars.length}
                      </span>
                    </div>
                    <div className="">
                      {item.guest_stars.length == 0 &&
                        "No guest stars have been added."}
                      <div className="grid gap-4 grid-cols-2 ">
                        {item.guest_stars.map((item) => (
                          <div className="flex " key={item.id}>
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
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* guest_stars end */}
                </div>
                {/* Cast & Crew end */}
                {/* Episode List   */}
                <div className="">
                  <h2 className="text-base font-semibold  ">
                    Episode Images{" "}
                    <span className="text-gray-400 ml-1 ">
                      {seasonImages && seasonImages.stills.length}
                    </span>
                  </h2>
                  <div className="flex overflow-auto py-2 gap-2 scb  ">
                    {seasonImages &&
                      seasonImages.stills.map((item) => {
                        return (
                          <div
                            className="w-[150px] flex-none min-h-[120px] "
                            key={item.file_path}
                          >
                            <img
                              src={still_92 + item.file_path}
                              alt=""
                              className="w-full rounded-md  object-cover h-full  "
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                {/* Episode List end  */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SeasonDetails;
