import { Movie } from "../pages/Home/comp/ContentBlock";

type collectionPart = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
export type collections = {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: collectionPart[];
};

export type Countries = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
}[];

export type MovieWithMedaType = Movie & {
  media_type: string;
};
export type TVProps = {
  page: number;
  results: TVbase[];
  total_pages: number;
  total_results: number;
};

export type genresTV = {
  genres: {
    id: number;
    name: string;
  }[];
};

export type languagesTV = {
  english_name: string;
  iso_639_1: string;
  name: string;
}[];

export type TvShows = {
  id: number;
  results: TvDetails[];
  total_pages: number;
  total_results: number;
};

export type TVbase = Movie;

export type TvSeason = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type episodeImages = {
  id: number;
  stills: {
    aspect_ratio: number;
    height: number;
    iso_639_1: null | string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
};
export type episodes = {
  air_date: null | string;
  crew: castCrew[];
  episode_number: number;
  episode_type: "standard";
  guest_stars: castCrew[];
  id: number;
  name: string;
  overview: string;
  production_code: "";
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
};

export type TvSeasonDetails = {
  air_date: string | null;
  episodes: episodes[];
  images: {
    posters: {
      width: number;
      aspect_ratio: number;
      file_path: string;
      height: number;
      iso_639_1: string;
      vote_average: number;
      vote_count: number;
    }[];
  };

  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
  _id: string;
};

// export type episodeGroups = {};

export type TvDetails = {
  adult: false;
  backdrop_path: string;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string;
  };
  credits: MovieDetails["credits"];
  episode_run_time: number[];
  first_air_date: string;
  genres: MovieDetails["genres"];
  homepage: string;
  id: number;
  images: MovieDetails["images"];
  in_production: boolean;
  keywords: Omit<MovieDetails["keywords"], "keywords"> & {
    results: MovieDetails["keywords"]["keywords"][0][];
  };
  languages: string[];
  last_air_date: string;
  last_episode_to_air: {
    air_date: string;
    episode_number: number;
    episode_type: string;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: null | any;
    season_number: number;
    show_id: number;
    still_path: null | any;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  networks: {
    id: 5369;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];

  next_episode_to_air: TvDetails["last_episode_to_air"];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: MovieDetails["production_companies"];
  production_countries: MovieDetails["production_countries"];
  recommendations: MovieDetails["recommendations"];
  reviews: MovieDetails["reviews"];

  seasons: TvSeason[];

  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  type: string;
  videos: MovieDetails["videos"];
  vote_average: number;
  vote_count: number;
};

export type MovieDetails = {
  adult: boolean;
  backdrop_path: null | string;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  keywords: MovieKeywords;
  budget: number;
  credits: MovieCredits;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: number;
  images: {
    backdrops: MovieImages["backdrops"];
    logos: MovieImages["logos"];
    posters: MovieImages["posters"];
  };
  videos: {
    results: MovieVideos["results"];
  };

  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | boolean;
    name: string;
    origin_country: string;
  }[];
  production_countries: { iso_3166_1: string; name: string }[];
  reviews: MovieReviews;
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  recommendations: MovieRecommendations;
};

export type searchKeywordResultsObject = {
  id: number;
  name: string;
};
export type searchKeywordsType = {
  page: number;
  results: searchKeywordResultsObject[];
  total_pages: number;
  total_results: number;
};
export type MovieKeywords = {
  id: number;
  keywords: {
    id: number;
    name: string;
  }[];
};

export type MovieVideos = {
  id: number;
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: true;
    published_at: string;
    id: string;
  }[];
};

export type MovieImages<
  T = {
    id: number;
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  },
> = {
  backdrops: T[];
  id: number;
  logos: T[];
  posters: T[];
};

export type MovieAltTitles = {
  id: number;
  titles: {
    iso_3166_1: string;
    title: string;
    type: string;
  }[];
};
export type tvAltTitles = {
  id: number;
  results: {
    iso_3166_1: string;
    title: string;
    type: string;
  }[];
};
export type MovieTranslations = {
  id: number;
  translations: {
    iso_3166_1: string;
    iso_639_1: string;
    name: string;
    english_name: string;
    data: {
      homepage: string;
      overview: string;
      runtime: number;
      tagline: string;
      title: string;
    };
  }[];
};

export type MovieSimilar = {
  page: number;
  results: Movie[];
};

export type MovieReviews = {
  id: number;
  page: number;
  results: {
    author: string;
    author_details: {
      name: "";
      username: string;
      avatar_path: null | string;
      rating: null | number;
    };
    content: string;
    created_at: string;
    id: string;
    updated_at: string;
    url: string;
  }[];
};

export type MovieReleaseDate = {
  id: number;
  results: {
    iso_3166_1: string;
    release_dates: {
      certification: string;
      descriptors: string[];
      iso_639_1: string;
      note: string;
      release_date: string;
      type: number;
    }[];
  }[];
};

export type MovieProvidersGeneral = {
  results: {
    display_priorities: {
      [x: string]: number;
    };
    display_priority: number;
    logo_path: string;
    provider_name: string;
    provider_id: number;
  }[];
};

export type TVShowProviderGeneral = MovieProvidersGeneral;

export type SingularMovieWatchProviders = {
  id: number;
  results: {
    [key: string]: {
      link: string;
      rent: {
        logo_path: string;
        provider_id: number;
        provider_name: string;
        display_priority: number;
      }[];
    };
  };
};
export type MovieRecommendations = {
  page: number;
  results: (Movie & { media_type: "movie" | "tv" })[];
  total_pages: number;
  total_results: number;
};

export type MovieLists = {
  id: number;
  page: number;
  resurts: {
    description: string;
    favorite_count: number;
    id: number;
    item_count: number;
    iso_639_1: string;
    list_type: string;
    name: string;
    poster_path: null | string;
  }[];
};

export type MovieExternalId = {
  id: number;
  imdb_id: string;
  wikidata_id: null | string;
  facebook_id: null | string;
  instagram_id: null | string;
  twitter_id: null | string;
};

export type castCrew = {
  adult: false;
  job?: string;
  gender: 1;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};
export type MovieCredits<T = castCrew> = {
  id: number;
  cast: T[];
  crew: T[];
};

export type MovieChanges = {
  changes: {
    key: string;
    items: {
      id: string;
      action: string;
      time: string;
      iso_639_1: string;
      iso_3166_1: string;
      original_value?: {
        // cast_id: number;
        // character: string;
        // credit_id: string;
        // order: number;
        // person_id: string;
        [x: string]: unknown;
      };
      value?: {
        [x: string]: unknown;
      };
    }[];
  }[];
};
