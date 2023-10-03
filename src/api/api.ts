// import dotenv from "dotenv";

import {
  Countries,
  MovieProvidersGeneral,
  MovieRecommendations,
} from "../types/types";
import { useCountry } from "../utils/hooks";

// dotenv.config();
export const apiFetchOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: import.meta.env.VITE_TOKEN,
  },
};

export const base_url = "http://image.tmdb.org/t/p/w500";
export const still_92 = "http://image.tmdb.org/t/p/w92";
export const still_182 = "http://image.tmdb.org/t/p/w185";
export const still_300 = "http://image.tmdb.org/t/p/w300";
export const still_original = "http://image.tmdb.org/t/p/w500";
export const base_urlBg = "http://image.tmdb.org/t/p/original";
export const apiURL = "https://api.themoviedb.org/3";

export async function movieDetailLoader<T>(id: T) {
  const response = await fetch(
    apiURL +
      `/movie/${id}?append_to_response=videos,images,reviews,credits,recommendations,keywords,collections`,
    apiFetchOptions
  );
  return response.json();
}

export async function getTvSeason(tvId: string, season_number: string) {
  const response = await fetch(
    apiURL + `/tv/${tvId}/season/${season_number}?append_to_response=images`,
    apiFetchOptions
  );
  return response.json();
}

export async function getTvSeasonImages(
  tvId: number,
  season_number: number,
  episode_number: number
) {
  const response = await fetch(
    apiURL +
      `/tv/${tvId}/season/${season_number}/episode/${episode_number}/images`,
    apiFetchOptions
  );
  return response.json();
}

export async function tvDetailLoader<T>(id: T) {
  const response = await fetch(
    apiURL +
      `/tv/${id}?append_to_response=videos,images,reviews,credits,recommendations,keywords,collections,seasons`,
    apiFetchOptions
  );
  return response.json();
}

export async function getGenresTv() {
  const response = await fetch(apiURL + `/genre/tv/list`, apiFetchOptions);
  return response.json();
}
export async function getGenresMovies() {
  const response = await fetch(apiURL + `/genre/movie/list`, apiFetchOptions);
  return response.json();
}

export async function getLanguages() {
  const response = await fetch(
    apiURL + `/configuration/languages`,
    apiFetchOptions
  );
  return response.json();
}

export async function movieCollection<T>(id: T) {
  const response = await fetch(apiURL + `/collection/${id}`, apiFetchOptions);
  return response.json();
}

export async function getDBCounties(): Promise<Countries> {
  const response = await fetch(
    apiURL + `/configuration/countries`,
    apiFetchOptions
  );
  const data = await response.json();
  return data;
}

export async function getPopularTv(
  arg: "popularTv" | "airingToday" | "topRated" | "onTheAir",
  page_number: string
) {
  const popularTv = `/discover/tv?air_date.lte=${
    new Date().toISOString().split("T")[0]
  }&language=${navigator.language}&page=${
    page_number ?? "1"
  }&sort_by=popularity.desc&watch_region=${
    window.localStorage.getItem("loc") ?? "US"
  }&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate|free|ads|rent|buy`;

  const airingToday = `/discover/tv?air_date.lte=${
    new Date().toISOString().split("T")[0]
  }&air_date.gte=${new Date().toISOString().split("T")[0]}&language=${
    navigator.language
  }&page=${page_number ?? "1"}&sort_by=popularity.desc&watch_region=${
    window.localStorage.getItem("loc") ?? "US"
  }&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate|free|ads|rent|buy`;

  const onTheAir = `/discover/tv?air_date.lte=${
    new Date().toISOString().split("T")[0]
  }&language=${
    navigator.language
  }&page=1&sort_by=popularity.desc&watch_region=${
    window.localStorage.getItem("loc") ?? "US"
  }&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate|free|ads|rent|buy`;

  const topRated = `/discover/tv?air_date.lte=${
    new Date().toISOString().split("T")[0]
  }&language=${
    navigator.language
  }&page=1&sort_by=popularity.desc&watch_region=${
    window.localStorage.getItem("loc") ?? "US"
  }&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate|free|ads|rent|buy`;

  const response = await fetch(
    apiURL +
      `${
        arg === "popularTv"
          ? popularTv
          : arg === "topRated"
          ? topRated
          : arg === "onTheAir"
          ? onTheAir
          : arg === "airingToday"
          ? airingToday
          : ""
      }`,
    apiFetchOptions
  );

  const data = await response.json();

  return data;
}

export async function getDiscoverMovies(arg: string) {
  const response = await fetch(
    apiURL + `/discover/movie?${arg}`,
    apiFetchOptions
  );
  const data = await response.json();
  return data;
}
export async function getOnTheAirTV(page_number: string) {
  const response = await fetch(
    apiURL + `/tv/on_the_air?page=${page_number}`,
    apiFetchOptions
  );
  const data = await response.json();
  return data;
}

export async function getTopratedTV(page_number = "1") {
  const response = await fetch(
    apiURL + `/tv/top_rated?page=${page_number}`,
    apiFetchOptions
  );
  const data = await response.json();
  return data;
}

export async function getDiscoverTV(arg: string) {
  const response = await fetch(apiURL + `/discover/tv?${arg}`, apiFetchOptions);
  const data = await response.json();
  return data;
}

export async function getMoviePopularMovies(page?: string) {
  if (page != undefined) {
    const response = await fetch(
      apiURL + `/movie/popular?language=en_US&page=${page}`,
      apiFetchOptions
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(apiURL + `/movie/popular`, apiFetchOptions);
    const data = await response.json();
    return data;
  }
}

export async function getMovieTrending(week = false) {
  if (week === false) {
    const response = await fetch(apiURL + `/trending/all/day`, apiFetchOptions);
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(
      apiURL + `/trending/all/week`,
      apiFetchOptions
    );
    const data = await response.json();
    return data;
  }
}

export async function getMovieUpcoming(page?: string) {
  if (page != undefined) {
    const response = await fetch(
      apiURL + `/movie/upcoming?language=en_US&page=${page}`,
      apiFetchOptions
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(apiURL + `/movie/upcoming`, apiFetchOptions);
    const data = await response.json();
    return data;
  }
}
export async function getMovieNowPlaying(page?: string) {
  if (page != undefined) {
    const response = await fetch(
      apiURL + `/movie/now_playing?language=en_US&page=${page}`,
      apiFetchOptions
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(
      apiURL + `/movie/now_playing`,
      apiFetchOptions
    );
    const data = await response.json();
    return data;
  }
}
export async function getMovieTopRated(page?: number) {
  if (page != undefined) {
    const response = await fetch(
      apiURL + `/movie/top_rated?language=en_US&page=${page}`,
      apiFetchOptions
    );
    const data = await response.json();
    return data;
  } else {
    const response = await fetch(apiURL + `/movie/top_rated`, apiFetchOptions);
    const data = await response.json();
    return data;
  }
}

/* Fetch Functions */

export async function searchKeywords(query: string) {
  const response = await fetch(
    apiURL + `/search/keyword?query=${query}`,
    apiFetchOptions
  );
  return response.json();
}

export async function getMovieKeywords<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/keywords`,
    apiFetchOptions
  );
  return response.json();
}

export async function getMovieVideos<T>(id: T) {
  const response = await fetch(apiURL + `/movie/${id}/videos`, apiFetchOptions);
  return response.json();
}

export async function getTVVideos<T>(id: T) {
  const response = await fetch(apiURL + `/tv/${id}/videos`, apiFetchOptions);
  return response.json();
}

export async function getMovieAltTitles<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/alternative_titles`,
    apiFetchOptions
  );
  return response.json();
}

export async function getTVAltTitles<T>(id: T) {
  const response = await fetch(
    apiURL + `/tv/${id}/alternative_titles`,
    apiFetchOptions
  );
  return response.json();
}

export async function getMovieTranslations<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/translations`,
    apiFetchOptions
  );
  return response.json();
}

export async function getTVTranslations<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/translations`,
    apiFetchOptions
  );
  return response.json();
}

export async function getMovieSimilar<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/similar`,
    apiFetchOptions
  );
  return response.json();
}

export async function getMovieReviews<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/reviews`,
    apiFetchOptions
  );
  return response.json();
}

export async function getTVReviews<T>(id: T) {
  const response = await fetch(apiURL + `/tv/${id}/reviews`, apiFetchOptions);
  return response.json();
}

export async function getMovieReleaseDate<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/release_dates`,
    apiFetchOptions
  );
  return response.json();
}

export async function getTvEpisodeGroups<T>(id: T) {
  const response = await fetch(
    apiURL + `/tv/${id}/episode_groups`,
    apiFetchOptions
  );
  return response.json();
}
export async function getMovieWatchProviders<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/watch/providers`,
    apiFetchOptions
  );
  return response.json();
}

/**
 *
 * @param region :region to get the watch providers
 * @returns
 */
export async function movieGetWatchProvidersRegion(region: string) {
  const response: Response = await fetch(
    apiURL + `/watch/providers/movie?watch_region=${region.toUpperCase()}`,
    apiFetchOptions
  );
  return response.json();
}

/**
 *
 * @param region :region to get the watch providers
 * @returns
 */
export async function getWatchProvidersRegionTVShow(region: string) {
  const response = await fetch(
    apiURL + `/watch/providers/tv?watch_region=${region.toUpperCase()}`,
    apiFetchOptions
  );
  return response.json();
}

export async function movieGetRecommendations<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/recommendations`,
    apiFetchOptions
  );
  return response.json();
}

export async function movieGetLists<T>(id: T) {
  const response = await fetch(apiURL + `/movie/${id}/lists`, apiFetchOptions);
  return response.json();
}

export async function movieGetImages<T>(id: T) {
  const response = await fetch(apiURL + `/movie/${id}/images`, apiFetchOptions);
  return response.json();
}

export async function tvGetImages<T>(id: T) {
  const response = await fetch(apiURL + `/tv/${id}/images`, apiFetchOptions);
  return response.json();
}

export async function movieGetExternalIds<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/external_ids`,
    apiFetchOptions
  );
  return response.json();
}

export async function movieGetCredits<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/credits`,
    apiFetchOptions
  );
  return response.json();
}

export async function tvGetCredits<T>(id: T) {
  const response = await fetch(apiURL + `/tv/${id}/credits`, apiFetchOptions);
  return response.json();
}
export async function movieGetChanges<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/changes`,
    apiFetchOptions
  );
  return response.json();
}
