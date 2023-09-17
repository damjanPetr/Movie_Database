import { createBrowserRouter, createHashRouter, defer } from "react-router-dom";
import ErrorPage from "./ErrorPage.tsx";
import {
  getAltTitles,
  getChanges,
  getCredits,
  getImages,
  getMovieReleaseDate,
  getMovieReviews,
  getPopularMovies,
  getPopularTv,
  getTranslations,
  getTrending,
  getVideos,
  movieDetailLoader,
  tvDetailLoader,
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
import Edit from "./pages/MovieDetail/Edit/Edit.tsx";
import MovieDetail from "./pages/MovieDetail/Main/MovieDetail.tsx";
import ReleaseDate from "./pages/MovieDetail/ReleaseDate/ReleaseDate.tsx";
import Report from "./pages/MovieDetail/Report/Report.tsx";
import Translations from "./pages/MovieDetail/Translations/Translations.tsx";
import People from "./pages/People/People.tsx";
import Reviews from "./pages/Reviews/Reviews.tsx";
import { MovieAltTitles, MovieDetails, TvDetails } from "./types/types.tsx";
import MovieTemp from "./pages/Movie/MovieTemp.tsx";
import TVShowTemp from "./pages/TVShow/TVShowTemp.tsx";

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
              const popular = await getPopularMovies(1);
              const trending = await getTrending();
              const getPTV = await getPopularTv();

              return { popular, trending, getPTV };
            },
          },
          {
            path: "/movie",
            element: <MovieTemp />,
          },
          {
            path: "/:tvId/tv/details",
            element: <TVShowTemp />,
            loader: async ({ params }) => {
              const tvDetail = (await tvDetailLoader(params.tvId)) as TvDetails;
              return defer({
                tvDetail,
              });
            },
          },
          {
            path: "/:movieId",
            children: [
              {
                path: "/:movieId/details",
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
                path: "/:movieId/alternative-titles",
                element: <AlternativeTitles />,
                loader: async ({ params }) => {
                  const altTitles = (await getAltTitles(
                    params.movieIda
                  )) as MovieAltTitles;
                  const details = (await movieDetailLoader(
                    params.movieId
                  )) as MovieDetails;
                  return { details, altTitles };
                },
              },
              {
                path: "/:movieId/cast-crew",
                element: <CastCrew />,
                loader: async ({ params }) => {
                  const castCrew = await getCredits(params.movieId);

                  const details = await movieDetailLoader(params.movieId);

                  return {
                    castCrew,
                    details,
                  };
                },
              },
              {
                path: "/:movieId/release-date",
                element: <ReleaseDate />,
                loader: async ({ params }) => {
                  const data = await getMovieReleaseDate(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { data, details };
                },
              },

              {
                path: "/:movieId/translations",
                element: <Translations />,
                loader: async ({ params }) => {
                  const details = await movieDetailLoader(params.movieId);
                  const data = await getTranslations(params.movieId);
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
                path: "/:movieId/report",
                element: <Report />,
              },
              {
                path: "/:movieId/edit",
                element: <Edit />,
              },
              //end of main Movied Detail
              {
                path: "/:movieId/images/backdrops",
                element: <Backdrops />,
                loader: async ({ params }) => {
                  const data = await getImages(params.movieId);
                  const details = await movieDetailLoader(params.movieId);
                  return { details, data };
                },
              },
              {
                path: "/:movieId/images/logos",
                element: <Logos />,
                loader: async ({ params }) => {
                  const data = await getImages(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { details, data };
                },
              },
              {
                path: "/:movieId/images/posters",
                element: <Posters />,
                loader: async ({ params }) => {
                  const data = await getImages(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { details, data };
                },
              },

              {
                path: "/:movieId/videos/",
                element: <Videos />,
                loader: async ({ params }) => {
                  const data = await getVideos(params.movieId);
                  const details = await movieDetailLoader(params.movieId);

                  return { details, data };
                },
              },

              //fandom
              {
                path: "/:movieId/fandom/discuss/",
                element: <Overview />,
              },
              {
                path: "/:movieId/fandom/general",
                element: <General />,
              },
              {
                path: "/:movieId/fandom/content-issues",
                element: <ContentIssues />,
              },
              {
                path: "/:movieId/reviews",
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
