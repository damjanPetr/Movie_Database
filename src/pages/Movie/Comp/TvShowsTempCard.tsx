import { useState } from "react";
import { Link } from "react-router-dom";
import { still_300 } from "../../../api/api";
import { TvDetails } from "../../../types/types";
import { Movie } from "../../Home/ContentBlock";

type Props = {
  cardData: TvDetails | Movie;
};
function TvShowsTempCard({ cardData }: Props) {
  const [loading, setLoading] = useState();

  return (
    <Link
      key={cardData.id}
      to={(() => {
        if ("release_date" in cardData) {
          return cardData.release_date ? `/movie/${cardData.id}/details` : "";
        } else {
          return cardData.first_air_date ? `/tv/${cardData.id}/details` : "";
        }
      })()}
      className={` hover:scale-105 transition-all duration-200 ease-linear  min-[700px]:max-[820px]:flex-auto  w-[170px] shadow-lg rounded-lg border mb-7   ${
        loading ? "opacity-0" : "opacity-100"
      } `}
    >
      <div className="relative transition-all ">
        <div className="hover:shadow-xl transition-shadow">
          <div className=" ">
            {cardData.poster_path == null ? (
              <div className="flex items-center justify-center bg-gray-300 w-full rounded-md h-[252px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  color="gray"
                  width="50"
                  height="50"
                  viewBox="0 0 256 256"
                >
                  <g fill="currentColor">
                    <path
                      d="M224 56v122.06l-39.72-39.72a8 8 0 0 0-11.31 0L147.31 164l-49.65-49.66a8 8 0 0 0-11.32 0L32 168.69V56a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8Z"
                      opacity=".2"
                    />
                    <path d="M216 40H40a16 16 0 0 0-16 16v144a16 16 0 0 0 16 16h176a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 16v102.75l-26.07-26.06a16 16 0 0 0-22.63 0l-20 20l-44-44a16 16 0 0 0-22.62 0L40 149.37V56ZM40 172l52-52l80 80H40Zm176 28h-21.37l-36-36l20-20L216 181.38V200Zm-72-100a12 12 0 1 1 12 12a12 12 0 0 1-12-12Z" />
                  </g>
                </svg>
                <div className="hidden group-hover:block">
                  {"release_date" in cardData
                    ? new Date(cardData.release_date).toLocaleDateString(
                        navigator.language,
                        { day: "numeric", month: "long" }
                      )
                    : new Date(cardData.first_air_date).toLocaleDateString(
                        navigator.language,
                        { day: "numeric", month: "long" }
                      )}
                </div>
              </div>
            ) : (
              <img
                src={still_300 + cardData.poster_path}
                alt={cardData.name + "image"}
                className="w-full rounded-t-lg min-h-[250px]  "
              />
            )}
          </div>
        </div>
        <div
          className="absolute -bottom-2 right-0 h-10 w-10   rounded-full flex items-center justify-center   border-4 border-black hover:scale-105 transition-all delay-150"
          style={{
            backgroundImage: `conic-gradient(${
              cardData.vote_average > 9
                ? "hsl(116deg 100% 50%)"
                : cardData.vote_average > 8
                ? "hsl(104deg 100% 50%)"
                : cardData.vote_average > 7
                ? "hsl(93deg 100% 50%)"
                : cardData.vote_average > 6
                ? "hsl(81deg 100% 50%)"
                : cardData.vote_average > 5
                ? "hsl(70deg 100% 50%)"
                : cardData.vote_average > 4
                ? "hsl(58deg 100% 50%)"
                : cardData.vote_average > 3
                ? "hsl(35deg 100% 50%)"
                : cardData.vote_average > 2
                ? "hsl(12deg 100% 49%)"
                : cardData.vote_average > 1
                ? "hsl(1deg 100% 49%)"
                : "hsl(0deg 100% 49%)"
            } ${Math.round(
              ((cardData.vote_average * 10) / 100) * 360
            )}deg, ${0}deg, rgb(24, 18, 18))`,
          }}
        >
          <div className="absolute text-sm   h-7 w-7 bg-black rounded-full text-white text-center  font-normal flex items-center justify-center ">
            {cardData.vote_average == 0 ? (
              "NR"
            ) : (
              <>
                {Math.round(cardData.vote_average * 10)}
                <sup>%</sup>
              </>
            )}
          </div>
        </div>
      </div>
      <div className=" p-2 text-black w-full ">
        <p className="text-sm font-bold mt-2  ">
          {"release_date" in cardData
            ? cardData.original_title
            : cardData.name
            ? cardData.name
            : "----"}
        </p>
        <p className="text-gray-500">
          {"release_date" in cardData
            ? new Date(cardData.release_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : cardData.first_air_date
            ? new Date(cardData.first_air_date).toLocaleDateString("en-US", {
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
