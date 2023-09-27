import { useEffect, useState } from "react";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { getDiscoverTV } from "../../api/api";
import { TvShows, genresTV, languagesTV } from "../../types/types";
import Filter from "../Movie/Comp/Filter";
import ShowSection from "../Movie/Comp/ShowSection";

function TvTemp({ todayDateFilter }: { todayDateFilter?: boolean }) {
  const { genres, languages, tvShows } = useLoaderData() as {
    genres: genresTV;
    languages: languagesTV;
    tvShows: TvShows;
  };

  const fetcher = useFetcher();
  const [pages, setPages] = useState(2);
  const [startFiltering, setstartFiltering] = useState(false);
  const [twShowFilterData, setTwShowFilterData] = useState<TvShows>(tvShows);
  console.log("%c utouhtnoea", "background: cyan", twShowFilterData);
  const loc = useLocation();

  useEffect(() => {
    console.log("TRANSFOR LINKNS");
    setTwShowFilterData(tvShows);
    setstartFiltering(false);
  }, [tvShows]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.tvShows) {
      console.log(fetcher.data.tvShows);
      // setPages((p) => p + 1);
      setTwShowFilterData((prev) => {
        return {
          ...prev,
          results:
            prev != null
              ? [...prev.results, ...fetcher.data.tvShows.results]
              : [...fetcher.data.tvShows.results],
          // ...fetcher.data.tvShows,
        };
      });
    }
  }, [fetcher.data]);
  const [searchParams] = useSearchParams();

  async function filterCallback(
    args: string,
    scroll: string,
    discoverScroll: true
  ) {
    if (scroll === "scroll" && startFiltering) {
      const tvShowData: TvShows = await getDiscoverTV(args);
      console.log("filtering scroll scroll");
      setTwShowFilterData({
        ...twShowFilterData,
        ...tvShowData,
        results: [...twShowFilterData.results, ...tvShowData.results],
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
      const tvShowData: TvShows = await getDiscoverTV(args);
      console.log("once");
      setTwShowFilterData({ ...tvShowData, results: tvShowData.results });
      setstartFiltering(true);

      return;
    }
  }

  return (
    <main className="mx-auto   max-w-screen-xl px-10 py-8">
      <h1 className="mb-6 text-2xl font-semibold">Popular TV Shows</h1>
      <div className="flex justify-between max-[480px]:flex-col max-[480px]:items-center   ">
        <Filter
          genres={genres}
          languages={languages}
          callback={filterCallback}
          todayDateFilter={todayDateFilter}
        />
        {twShowFilterData ? (
          <ShowSection cardData={twShowFilterData} movies={false} />
        ) : null}
      </div>
    </main>
  );
}
export default TvTemp;
