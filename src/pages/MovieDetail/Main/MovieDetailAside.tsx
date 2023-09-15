import { base_url } from "../../../api/api";
import { MovieDetails } from "../../../types/types";

type Props = {
  movieDetail: MovieDetails;
};
function MovieDetailAside({ movieDetail }: Props) {
  return (
    <aside className="min-w-[30%]   shadow-lg">
      <div className="mb-6">
        <h3 className="mb-2">Made in :</h3>
        {movieDetail.production_countries.map((item, index) => (
          <div key={index} className="mb-2 flex justify-between gap-4">
            <p>{item.name}</p>
            <img
              src={`https://flagcdn.com/20x15/${item.iso_3166_1.toLocaleLowerCase()}.png`}
              srcSet={`https://flagcdn.com/40x30/${item.iso_3166_1.toLowerCase()}.png 2x, https://flagcdn.com/60x45/${item.iso_3166_1.toLowerCase()}.png 3x`}
              width="30"
              height="15"
              alt="Ukraine"
            ></img>
          </div>
        ))}
      </div>
      <div className="mb-6">
        <h3 className="mb-2">By : </h3>
        <ul>
          {movieDetail.production_companies.map((item, index) => (
            <li key={index} className="flex justify-between gap-4">
              {/* <p>{item.id}</p> */}
              <p>{item.name}</p>
              <img
                src={base_url + item.logo_path}
                className="h-10 max-w-[70px]"
              ></img>
              {/* <p>{item.origin_country}</p> */}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
export default MovieDetailAside;
