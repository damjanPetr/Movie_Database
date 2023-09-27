import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useLocation } from "react-router-dom";
import { getDiscoverMovies } from "../../api/api";
import { TvShows, genresTV, languagesTV } from "../../types/types";
import { Movie, MovieProps } from "../Home/ContentBlock";
import Filter from "./Comp/Filter";
import ShowSection from "./Comp/ShowSection";

function MovieTemp({
  todayDateFilter,
}: {
  todayDateFilter?: boolean;
  load?: string;
}) {
  const { genres, languages, movies } = useLoaderData() as {
    genres: genresTV;
    languages: languagesTV;
    movies: MovieProps;
  };

  const fetcher = useFetcher();
  const [pages, setPages] = useState(2);
  const [startFiltering, setstartFiltering] = useState(false);
  const [twShowFilterData, setTwShowFilterData] = useState<MovieProps>(movies);

  const loc = useLocation();

  useEffect(() => {
    console.log("TRANSFOR LINKNS");
    setTwShowFilterData(movies);
    setstartFiltering(false);
  }, [movies]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.movies) {
      console.log(fetcher.data.movies);
      // setPages((p) => p + 1);
      setTwShowFilterData((prev) => {
        return {
          ...prev,
          results:
            prev != null
              ? [...prev.results, ...fetcher.data.movies.results]
              : [...fetcher.data.movies.results],
          // ...fetcher.data.tvShows,
        };
      });
    }
  }, [fetcher.data]);

  async function filterCallback(
    args: string,
    scroll: string,
    discoverScroll?: boolean
  ) {
    if (scroll === "scroll" && startFiltering) {
      const movieData: MovieProps = await getDiscoverMovies(args);
      console.log("filtering scroll scroll");
      setTwShowFilterData({
        ...twShowFilterData,
        ...movieData,
        results: [...twShowFilterData.results, ...movieData.results],
      });

      return;
    } else if (scroll === "scroll" && !startFiltering) {
      if (fetcher.state === "idle") {
        console.log("normal staring  scroll");

        fetcher.load(loc.pathname + "/" + pages.toString());

        console.log(loc);
        setPages(pages + 1);

        // if (fetcher.data && fetcher.data.tvShows != null) {
        // console.log(fetcher.data.tvShows, pages);
        // setPages(pages + 1);

        // setTwShowFilterData({
        // ...tvShows,
        // results: [...tvShows.results, ...fetcher.data.tvShows.results],
        // });
        // }
      }
      return;
    } else if (scroll === "normal" && !discoverScroll) {
      return;
    } else if (scroll === "normal" && discoverScroll) {
      const movieData: MovieProps = await getDiscoverMovies(args);
      console.log("once");
      setTwShowFilterData({ ...movieData, results: movieData.results });
      setstartFiltering(true);
      return;
    }
  }

  return (
    <main className="mx-auto   max-w-screen-xl px-10 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Popular TV Shows</h1>
      <div className="flex justify-between max-[480px]:flex-col max-[480px]:items-center   ">
        <Filter
          renderMovies={true}
          genres={genres}
          languages={languages}
          callback={filterCallback}
          todayDateFilter={todayDateFilter}
        />
        {twShowFilterData ? (
          <ShowSection cardData={twShowFilterData} movies={true} />
        ) : null}
      </div>
    </main>
  );
}
export default MovieTemp;
