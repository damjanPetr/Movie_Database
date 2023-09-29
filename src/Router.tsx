import { createHashRouter, defer } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import {
  getGenresMovies,
  getGenresTv,
  getLanguages,
  getMovieAltTitles,
  getMovieNowPlaying,
  getMoviePopularMovies,
  getMovieReleaseDate,
  getMovieReviews,
  getMovieTranslations,
  getMovieTrending,
  getMovieUpcoming,
  getMovieVideos,
  getOnTheAirTV,
  getPopularTv,
  getTVAltTitles,
  getTVReviews,
  getTVTranslations,
  getTVVideos,
  getTopratedTV,
  getTvEpisodeGroups,
  getTvSeason,
  movieDetailLoader,
  movieGetCredits,
  movieGetImages,
  tvDetailLoader,
  tvGetCredits,
  tvGetImages,
} from "./api/api.ts";
import { AuthProvider } from "./context/Auth.tsx";
import Main from "./layouts/Main.tsx";
import ContentIssues from "./pages/Discussion/ContentIssues/ContentIssues.tsx";
import General from "./pages/Discussion/General/General.tsx";
import Overview from "./pages/Discussion/Overview/Overview.tsx";
import Home from "./pages/Home/Home.tsx";
import Backdrops from "./pages/Media/Backdrops/Backdrops.tsx";
import Logos from "./pages/Media/Logos/Logos.tsx";
import Posters from "./pages/Media/Posters/Posters.tsx";
import Videos from "./pages/Media/Videos/Videos.tsx";
import AlternativeTitles from "./pages/MovieDetail/AlternativeTitles/AlternativeTitles.tsx";
import CastCrew from "./pages/MovieDetail/CastCrew/CastCrew.tsx";
// import Changes from "./pages/MovieDetail/Changes/Changes.tsx";
import MovieTemp from "./pages/Movie/MovieTemp.tsx";
import Edit from "./pages/MovieDetail/Edit/Edit.tsx";
import MovieDetail from "./pages/MovieDetail/Main/MovieDetail.tsx";
import ReleaseDate from "./pages/MovieDetail/ReleaseDate/ReleaseDate.tsx";
import Report from "./pages/MovieDetail/Report/Report.tsx";
import Translations from "./pages/MovieDetail/Translations/Translations.tsx";
import People from "./pages/People/People.tsx";
import Reviews from "./pages/Reviews/Reviews.tsx";
import EpisodeTypes from "./pages/TV/EpisodeTypes/EpisodeGroups.tsx";
import TvTemp from "./pages/TV/TvTemp.tsx";
import TVShowDetail from "./pages/TVShowDetail/TVShowDetail.tsx";
import { MovieAltTitles, MovieDetails } from "./types/types.tsx";
import Seasons from "./pages/TV/Seasons/Seasons.tsx";
import SeasonDetails from "./pages/TV/Seasons/SeasonDetails.tsx";
import { GiCottonFlower } from "react-icons/gi";

const router = createHashRouter([
  {
    element: <AuthProvider />,
    children: [
      {
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
          // {
          //   path: "/login",
          //   element: <Login />,
          //   action: ({ request }) => {
          //     console.log(request.url);
          //     return null;
          //   },
          // },
          {
            path: "/people",
            element: <People />,
          },
          {
            path: "/",
            element: <Home />,
            loader: async () => {
              const popular = await getMoviePopularMovies("1");
              const trending = await getMovieTrending();
              const getPTV = await getPopularTv("popularTv", "1");

              return { popular, trending, getPTV };
            },
          },
          {
            path: "/movie/:page_number?",
            element: <MovieTemp />,
            loader: async ({ params }) => {
              const data = await getGenresMovies();
              const data2 = await getLanguages();
              const movies = await getMoviePopularMovies(
                params.page_number ? params.page_number : ""
              );
              return {
                genres: data,
                languages: data2,
                movies: movies,
              };
            },
          },
          {
            path: "/movie/now-playing/:page_number?",
            element: <MovieTemp />,
            loader: async ({ params }) => {
              const data = await getGenresMovies();
              const data2 = await getLanguages();
              const movies = await getMovieNowPlaying(
                params.page_number ? params.page_number : ""
              );
              return {
                genres: data,
                languages: data2,
                movies: movies,
              };
            },
          },
          {
            path: "/movie/upcoming/:page_number?",
            element: <MovieTemp />,
            loader: async ({ params }) => {
              const data = await getGenresMovies();
              const data2 = await getLanguages();
              const movies = await getMovieUpcoming(
                params.page_number ? params.page_number : ""
              );
              return {
                genres: data,
                languages: data2,
                movies: movies,
              };
            },
          },
          {
            path: "/movie/top-rated/:page_number?",
            element: <MovieTemp />,
            loader: async ({ params }) => {
              const data = await getGenresMovies();
              const data2 = await getLanguages();
              const movies = await getPopularTv(
                "popularTv",
                params.page_number ? params.page_number : ""
              );
              return {
                genres: data,
                languages: data2,
                movies: movies,
              };
            },
          },
          {
            path: "/tvshow/:page_number?",
            element: <TvTemp />,
            loader: async ({ params }) => {
              const data = await getGenresTv();
              const data2 = await getLanguages();
              const movies = await getPopularTv(
                "popularTv",
                params.page_number ? params.page_number : ""
              );
              return {
                genres: data,
                languages: data2,
                tvShows: movies,
              };
            },
          },
          {
            path: "/tvshow/airing-today/:page_number?",
            element: <TvTemp todayDateFilter={true} />,
            loader: async ({ params }) => {
              console.log("airing today");
              const data = await getGenresTv();
              const data2 = await getLanguages();
              const tvShows = await getPopularTv(
                "airingToday",
                params.page_number ? params.page_number : ""
              );
              return {
                genres: data,
                languages: data2,
                tvShows: tvShows,
              };
            },
          },
          {
            path: "/tvshow/on-the-air/:page_number?",
            element: <TvTemp todayDateFilter={true} />,
            loader: async ({ params }) => {
              const data = await getGenresTv();
              const data2 = await getLanguages();
              const tvShows = await getOnTheAirTV(
                params.page_number ? params.page_number : ""
              );
              return {
                genres: data,
                languages: data2,
                tvShows: tvShows,
              };
            },
          },
          {
            path: "/tvshow/top-rated/:page_number?",
            element: <TvTemp />,

            loader: async ({ params }) => {
              const data = await getGenresTv();
              const data2 = await getLanguages();
              console.log(params.id);
              const tvShows = await getTopratedTV(
                params.page_number ? params.page_number : ""
              );

              return {
                genres: data,
                languages: data2,
                tvShows: tvShows,
              };
            },

            // action: async ({ request }) => {
            // const formData = await request.formData();
            // const { pages } = Object.fromEntries(formData);
            // const data = await getTopratedTV(pages);
            // return data;
            // },
          },
          {
            path: "/tv/:tvId",
            children: [
              {
                path: "details",
                element: <TVShowDetail />,
                loader: async ({ params }) => {
                  const tvDetail = await tvDetailLoader(params.tvId);
                  return defer({
                    tvDetail,
                  });
                },
              },
              {
                path: "alternative-titles",
                element: <AlternativeTitles />,
                loader: async ({ params }) => {
                  const altTitles = await getTVAltTitles(params.tvId);

                  const details = await tvDetailLoader(params.tvId);
                  return { details, altTitles };
                },
              },
              {
                path: "cast-crew",
                element: <CastCrew />,
                loader: async ({ params }) => {
                  const castCrew = await tvGetCredits(params.tvId);

                  const details = await tvDetailLoader(params.tvId);

                  return {
                    castCrew,
                    details,
                  };
                },
              },
              {
                path: "release-date",
                element: <EpisodeTypes />,
                loader: async ({ params }) => {
                  const data = await getTvEpisodeGroups(params.tvId);
                  const details = await tvDetailLoader(params.tvId);

                  return { data, details };
                },
              },

              {
                path: "seasons",
                element: <Seasons />,
                loader: async ({ params }) => {
                  const details = await tvDetailLoader(params.tvId);

                  return { details };
                },
              },
              {
                path: "season/:season_number",
                element: <SeasonDetails />,
                loader: async ({ params }) => {
                  const details = await tvDetailLoader(params.tvId);

                  const season = await getTvSeason(
                    params.tvId,
                    params.season_number
                  );

                  return { details, season };
                },
              },

              {
                path: "translations",
                element: <Translations />,
                loader: async ({ params }) => {
                  const details = await tvDetailLoader(params.tvId);
                  const data = await getTVTranslations(params.tvId);
                  return { data, details };
                },
              },
              // {
              //   path: "/:movieId/changes",
              //   element: <Changes />,
              //   loader: async ({ params }) => {
              //     const data = await getChanges(params.movieId);
              //     const details = await movieDetailLoader(params.movieId);
              //     return { data, details };
              //   },
              // },
              {
                path: "report",
                element: <Report />,
              },
              {
                path: "edit",
                element: <Edit />,
              },
              //end of main Movied Detail
              {
                path: "images/backdrops",
                element: <Backdrops />,
                loader: async ({ params }) => {
                  const data = await tvGetImages(params.tvId);
                  const details = await tvDetailLoader(params.tvId);
                  return { details, data };
                },
              },
              {
                path: "images/logos",
                element: <Logos />,
                loader: async ({ params }) => {
                  const data = await tvGetImages(params.tvId);
                  const details = await tvDetailLoader(params.tvId);

                  return { details, data };
                },
              },
              {
                path: "images/posters",
                element: <Posters />,
                loader: async ({ params }) => {
                  const data = await tvGetImages(params.tvId);
                  const details = await tvDetailLoader(params.tvId);

                  return { details, data };
                },
              },

              {
                path: "videos/",
                element: <Videos />,
                loader: async ({ params }) => {
                  const data = await getTVVideos(params.tvId);
                  const details = await tvDetailLoader(params.tvId);

                  return { details, data };
                },
              },

              //fandom
              {
                path: "fandom/discuss/",
                element: <Overview />,
              },
              {
                path: "fandom/general",
                element: <General />,
              },
              {
                path: "fandom/content-issues",
                element: <ContentIssues />,
              },
              {
                path: "reviews",
                element: <Reviews />,
                loader: async ({ params }) => {
                  const data = await getTVReviews(params.tvId);
                  const details = await tvDetailLoader(params.tvId);

                  return { details, data };
                },
              },
            ],
          },
          {
            path: "/movie/:movieId",
            children: [
              {
                path: "details",
                element: <MovieDetail />,
                loader: async ({ params }) => {
                  const movieDetail = (await movieDetailLoader(
                    params.movieId
                  )) as MovieDetails;
                  return defer({
                    movieDetail,
                  });
                },
              },
              {
                path: "alternative-titles",
                element: <AlternativeTitles />,
                loader: async ({ params }) => {
                  const altTitles = (await getMovieAltTitles(
                    params.movieId
                  )) as MovieAltTitles;
                  const details = (await movieDetailLoader(
                    params.movieId
                  )) as MovieDetails;
                  return { details, altTitles };
                },
              },
              {
                path: "cast-crew",
                element: <CastCrew />,
                loader: async ({ params }) => {
                  const castCrew = await movieGetCredits(params.movieId);

                  const details = await movieDetailLoader(params.movieId);

                  return {
                    castCrew,
                    details,
                  };
                },
              },
              {
                path: "release-date",
                element: <ReleaseDate />,
                loader: async ({ params }) => {
                  const data = await getMovieReleaseDate(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { data, details };
                },
              },

              {
                path: "translations",
                element: <Translations />,
                loader: async ({ params }) => {
                  const details = await movieDetailLoader(params.movieId);
                  const data = await getMovieTranslations(params.movieId);
                  return { data, details };
                },
              },
              // {
              //   path: "/:movieId/changes",
              //   element: <Changes />,
              //   loader: async ({ params }) => {
              //     const data = await getChanges(params.movieId);
              //     const details = await movieDetailLoader(params.movieId);
              //     return { data, details };
              //   },
              // },
              {
                path: "report",
                element: <Report />,
              },
              {
                path: "edit",
                element: <Edit />,
              },
              //end of main Movied Detail
              {
                path: "images/backdrops",
                element: <Backdrops />,
                loader: async ({ params }) => {
                  const data = await movieGetImages(params.movieId);
                  const details = await movieDetailLoader(params.movieId);
                  return { details, data };
                },
              },
              {
                path: "images/logos",
                element: <Logos />,
                loader: async ({ params }) => {
                  const data = await movieGetImages(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { details, data };
                },
              },
              {
                path: "images/posters",
                element: <Posters />,
                loader: async ({ params }) => {
                  const data = await movieGetImages(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { details, data };
                },
              },

              {
                path: "videos/",
                element: <Videos />,
                loader: async ({ params }) => {
                  const data = await getMovieVideos(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { details, data };
                },
              },

              //fandom
              {
                path: "fandom/discuss/",
                element: <Overview />,
              },
              {
                path: "fandom/general",
                element: <General />,
              },
              {
                path: "fandom/content-issues",
                element: <ContentIssues />,
              },
              {
                path: "reviews",
                element: <Reviews />,
                loader: async ({ params }) => {
                  const data = await getMovieReviews(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { details, data };
                },
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
