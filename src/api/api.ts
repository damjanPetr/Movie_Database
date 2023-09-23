// import dotenv from "dotenv";

import {
  Countries,
  MovieProvidersGeneral,
  MovieRecommendations,
} from "../types/types";

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

export async function tvDetailLoader<T>(id: T) {
  const response = await fetch(
    apiURL +
      `/tv/${id}?append_to_response=videos,images,reviews,credits,recommendations,keywords,collections`,
    apiFetchOptions
  );
  return response.json();
}

export async function getGenres() {
  const response = await fetch(apiURL + `/genre/tv/list`, apiFetchOptions);
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

export async function getPopularTv() {
  const response = await fetch(
    apiURL +
      `/tv/popular?air_date.lte=${
        new Date().toISOString().split("T")[0]
      }&language=${
        navigator.language
      }&page=1&sort_by=popularity.desc&watch_region=CA&with_runtime.gte=0&with_runtime.lte=400&with_watch_monetization_types=flatrate|free|ads|rent|buy`,
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

export async function getDiscoverTV(arg: string) {
  const response = await fetch(apiURL + `/discover/tv?${arg}`, apiFetchOptions);
  const data = await response.json();
  return data;
}

export async function getPopularMovies(page?: number) {
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

export async function getTrending(week = false) {
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

export async function getUpcoming(page?: number) {
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
export async function getNowPlaying(page?: number) {
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
export async function getTopRated(page?: number) {
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

export async function getKeywords<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/keywords`,
    apiFetchOptions
  );
  return response.json();
}

export async function getVideos<T>(id: T) {
  const response = await fetch(apiURL + `/movie/${id}/videos`, apiFetchOptions);
  return response.json();
}

export async function getAltTitles<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/alternative_titles`,
    apiFetchOptions
  );
  return response.json();
}

export async function getTranslations<T>(id: T) {
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

export async function getMovieReleaseDate<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/release_dates`,
    apiFetchOptions
  );
  return response.json();
}

export async function getWatchProviders<T>(id: T) {
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
export async function getWatchProvidersRegionMovie(region: string) {
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

export async function getRecommendations<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/recommendations`,
    apiFetchOptions
  );
  return response.json();
}

export async function getLists<T>(id: T) {
  const response = await fetch(apiURL + `/movie/${id}/lists`, apiFetchOptions);
  return response.json();
}

export async function getImages<T>(id: T) {
  const response = await fetch(apiURL + `/movie/${id}/images`, apiFetchOptions);
  return response.json();
}

export async function getExternalIds<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/external_ids`,
    apiFetchOptions
  );
  return response.json();
}

export async function getCredits<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/credits`,
    apiFetchOptions
  );
  return response.json();
}

export async function getChanges<T>(id: T) {
  const response = await fetch(
    apiURL + `/movie/${id}/changes`,
    apiFetchOptions
  );
  return response.json();
}
