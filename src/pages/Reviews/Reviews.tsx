import { useLoaderData } from "react-router-dom";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import { MovieDetails, MovieReviews } from "../../types/types";
import { base_url, still_182, still_92 } from "../../api/api";
import { AiFillStar } from "react-icons/ai";
import { IoMdPartlySunny } from "react-icons/io";
export default function Reviews() {
  const { data, details } = useLoaderData() as {
    data: MovieReviews;
    details: MovieDetails;
  };
  return (
    <div>
      <Nav />
      <Banner movieDetail={details} />
      <main className="mx-auto flex w-11/12 max-w-screen-xl">
        <div className="w-[30%]"></div>
        <div className=" mt-4 w-[70%]">
          {data.results.length === 0 ? <p>No viewBox</p> : null}
          {data.results.map((item) => {
            return (
              <div key={item.id} className="mb-4 rounded-lg p-4 shadow-xl">
                <div className="mb-4 flex">
                  <div className="img p-2">
                    {item.author_details.avatar_path !== null &&
                    item.author_details.avatar_path
                      .split("//")[1]
                      ?.includes("gravatar") ? (
                      <img
                        src={item.author_details.avatar_path.slice(1)}
                        alt=""
                        className="h-14 w-14 rounded-full"
                      />
                    ) : null}
                    {item.author_details.avatar_path === null ? (
                      <div
                        className="relative flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          backgroundColor: `rgb(
                          ${Math.floor(Math.random() * 256)},
                          ${Math.floor(Math.random() * 256)},
                          ${Math.floor(Math.random() * 256)})`,
                        }}
                      >
                        <span className="text-xl font-semibold">
                          {item.author_details.username
                            .slice(0, 1)
                            .toLocaleUpperCase()}
                        </span>
                      </div>
                    ) : null}
                    {item.author_details.avatar_path?.slice(0, 4) !== "/htt" &&
                    item.author_details.avatar_path !== null ? (
                      <img
                        src={still_92 + item.author_details.avatar_path}
                        alt=""
                        className="h-14 w-14 rounded-full"
                      />
                    ) : null}
                  </div>

                  <div className="content p-2">
                    <h2 className="text-xl font-bold">
                      A review written by {item.author}
                    </h2>
                    <div className="flex items-center text-sm">
                      {item.author_details.rating && (
                        <span className="mr-2 flex items-center gap-1 rounded-lg bg-black  px-1.5  text-white ">
                          <AiFillStar />
                          {item.author_details.rating + ".0"}
                        </span>
                      )}
                      <p className="text-neutral-500">
                        Written by{" "}
                        <a
                          href="#"
                          className="text-black underline underline-offset-2"
                        >
                          {item.author_details.username}
                        </a>
                      </p>
                      <p className="text-neutral-500">
                        {" "}
                        on{"  "}
                        {(() => {
                          return new Date(item.updated_at).toLocaleDateString(
                            "en-En",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          );
                        })()}
                      </p>
                    </div>
                    {/* <p>{item.url}</p> */}
                  </div>
                </div>
                <div className="max-h-60  overflow-hidden overflow-ellipsis text-sm">
                  {item.content.split("\r").map((item, index) => (
                    <p className="mb-4" key={index}>
                      {item.trim()}
                    </p>
                  ))}
                  <a href="#" className="text-xl"></a>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
