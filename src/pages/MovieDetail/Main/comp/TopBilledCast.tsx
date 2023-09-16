import { useState } from "react";
import { still_300 } from "../../../../api/api";
import { MovieCredits } from "../../../../types/types";

type Props = {
  castData: MovieCredits;
};
export default function TopBilledCast({ castData }: Props) {
  const [loadNumber, setLoadNumber] = useState(10);
  return (
    <div className="p-2 border-b">
      <h3 className="text-xl font-bold mb-2 ml-1.5">Top Billed Cast</h3>
      <div className="flex overflow-auto scb space-x-4 pb-4 bg-stone-50">
        {castData.cast
          .slice(0, loadNumber)
          // .sort((a, b) => {
          //   return a.order - b.order;
          // })
          .map((item) => (
            <div className="rounded-lg flex-none w-36 shadow-lg" key={item.id}>
              <div className="img h-8/12">
                <img
                  src={still_300 + item.profile_path}
                  alt=""
                  className="rounded-t-lg h-full"
                />
              </div>
              <div className="content py-2 px-1.5">
                <strong className="text-base font-bold">{item.name}</strong>
                <p className="text-gray text-sm">{item.character}</p>
              </div>
            </div>
          ))}
        <div className="w-36 flex items-center flex-none">
          <div className="w-full flex items-center ml-2 hover:text-gray-500">
            <p className="font-bold">View More</p>
            <span>
              <svg
                className="ml-1.5 font-bold"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 1024 1024"
              >
                <path
                  fill="currentColor"
                  d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312L754.752 480z"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <a href="" className="text-base font-semibold mt-4 ml-1.5 inline-block ">
        Full Cast & Crew
      </a>
    </div>
  );
}
