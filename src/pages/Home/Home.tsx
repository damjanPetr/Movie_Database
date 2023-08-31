/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from "react";
import { useActionData, useLoaderData } from "react-router-dom";
import ContentBlock, { MovieProps } from "./ContentBlock";
import { MovieWithMedaType, TVProps } from "../../types/types";
import { base_url } from "../../api/api";

export default function Home() {
  const mytarget = useRef<HTMLDivElement>(null);

  let bgPicture = null;

  const { popular, trending, getPTV } = useLoaderData() as {
    popular: MovieProps;
    trending: MovieProps;
    getPTV: TVProps;
  };

  const [data, setData] = useState(popular);
  const [data2, setData2] = useState(trending);
  const [data3, setData3] = useState(getPTV);

  if (bgPicture === null) {
    bgPicture =
      data.results[Math.floor(Math.random() * data.results.length)]
        .backdrop_path;
  }
  console.log("🚀 ~ file: Home.tsx:25 ~ Home ~ bgPicture:", bgPicture);

  const { actionData, forBlock } =
    (useActionData() as {
      actionData: MovieProps | TVProps;
      forBlock: "trending" | "whatspopular" | "free_to_watch";
    }) || {};

  useEffect(() => {
    if (forBlock === "trending") {
      setData(actionData);
    }
    if (forBlock === "whatspopular") {
      setData2(actionData);
    }
    if (forBlock === "free_to_watch") {
      setData3(actionData);
    }
  }, [actionData, forBlock]);

  return (
    <div className="mx-auto max-w-screen-2xl">
      <section
        className="[] bannerImg flex flex-col items-start justify-center bg-cover bg-no-repeat p-14"
        style={{
          backgroundImage: `url('https://image.tmdb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,032541,01b4e4)${bgPicture}')`,
        }}
      >
        <div className="flex flex-col items-start justify-between p-4 font-bold text-white ">
          <h1 className="mb-4 text-5xl">Welcome.</h1>
          <h2 className="text-3xl">
            Millions of movies, TV shows and people to discover. Explore now.
          </h2>
        </div>
        <div className="w-full p-4">
          <div className="relative flex ">
            <form className="w-full">
              <input
                type="text"
                name="search"
                id="search"
                className=" w-full rounded-full  p-4 text-xl  capitalize outline-none placeholder:italic placeholder:tracking-wide placeholder:text-gray-600 "
                placeholder="search for a movie, tv show, person..."
              />
              <button className="absolute right-0 h-full w-40   rounded-full bg-gradient-to-r from-teal-500  to-teal-600 text-lg font-bold text-white outline-none hover:text-gray-800">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      <main className="" ref={mytarget}>
        <ContentBlock
          title="Trending"
          data={data}
          buttons={[
            {
              title: "Today",
              methodName: "trendingToday",
            },
            {
              title: "This Week",
              methodName: "trendingWeek",
            },
          ]}
        ></ContentBlock>
        <ContentBlock
          title="What's Popular"
          data={data2}
          buttons={[
            {
              title: "Streaming",
              methodName: "streaming",
            },
            {
              title: "On TV",
              methodName: "on_tv",
            },
            {
              title: "For Rent",
              methodName: "for_rent",
            },
            {
              title: "In Theathers",
              methodName: "in_theathers",
            },
          ]}
        ></ContentBlock>
        <ContentBlock
          title="Free To Watch"
          data={data3}
          buttons={[
            {
              title: "Movies",
              methodName: "free_movies",
            },
            {
              title: "TV",
              methodName: "free_tv",
            },
          ]}
        ></ContentBlock>
      </main>
    </div>
  );
}
