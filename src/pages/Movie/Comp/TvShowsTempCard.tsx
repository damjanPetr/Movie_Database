import { Link } from "react-router-dom";
import { base_url } from "../../../api/api";
import { useState } from "react";
import { TvDetails, TvShows } from "../../../types/types";

type Props = {
  tvShow: TvDetails;
};
function TvShowsTempCard({ tvShow }: Props) {
  const [loading, setLoading] = useState();

  return (
    <Link
      key={tvShow.id}
      to={
        tvShow.first_air_date
          ? `/${tvShow.id}/tv/details`
          : `/${tvShow.id}/details`
      }
      className={`hover:scale-105 transition-all duration-200 ease-linear   min-[700px]:max-[820px]:flex-auto  w-[170px] shadow-lg rounded-lg border mt-7    ${
        loading ? "opacity-0" : "opacity-100"
      } `}
    >
      <div className="relative transition-all ">
        <div className="hover:shadow-xl transition-shadow">
          <div className=" ">
            <img
              src={base_url + tvShow.poster_path}
              alt={tvShow.name + "image"}
              className="w-full rounded-t-lg   "
            />
          </div>
        </div>
        <div
          className="absolute -bottom-2 right-0 h-10 w-10   rounded-full flex items-center justify-center   border-4 border-black hover:scale-105 transition-all delay-150"
          style={{
            backgroundImage: `conic-gradient(${
              tvShow.vote_average > 9
                ? "hsl(116deg 100% 50%)"
                : tvShow.vote_average > 8
                ? "hsl(104deg 100% 50%)"
                : tvShow.vote_average > 7
                ? "hsl(93deg 100% 50%)"
                : tvShow.vote_average > 6
                ? "hsl(81deg 100% 50%)"
                : tvShow.vote_average > 5
                ? "hsl(70deg 100% 50%)"
                : tvShow.vote_average > 4
                ? "hsl(58deg 100% 50%)"
                : tvShow.vote_average > 3
                ? "hsl(35deg 100% 50%)"
                : tvShow.vote_average > 2
                ? "hsl(12deg 100% 49%)"
                : tvShow.vote_average > 1
                ? "hsl(1deg 100% 49%)"
                : "hsl(0deg 100% 49%)"
            } ${Math.round(
              ((tvShow.vote_average * 10) / 100) * 360
            )}deg, ${0}deg, rgb(24, 18, 18))`,
          }}
        >
          <div className="absolute text-sm   h-7 w-7 bg-black rounded-full text-white text-center  font-normal flex items-center justify-center ">
            {Math.round(tvShow.vote_average * 10)}
            <sup>%</sup>
          </div>
        </div>
      </div>
      <div className=" p-2 text-black w-full">
        <p className="text-sm font-bold mt-2 ">
          {tvShow.name ? tvShow.name : tvShow.name ? tvShow.name : "----"}
        </p>
        <p className="text-gray-500">
          {tvShow.first_air_date != null
            ? new Date(tvShow.first_air_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : tvShow.first_air_date
            ? new Date(tvShow.first_air_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "--/--/--"}
        </p>
      </div>
    </Link>
  );
}
export default TvShowsTempCard;
