import { ReactNode } from "react";
import { RiArrowRightSLine, RiH2 } from "react-icons/ri";
import { useState } from "react";
type Props = {
  children: ReactNode;
  watchProviderNumber?: number;
  title: string;
  padding?: number;
};
function Card({ children, title, watchProviderNumber, padding = 4 }: Props) {
  const [openCard, setOpenCard] = useState(false);

  return (
    <div className="mb-4 rounded-lg border shadow-md">
      <div
        className={
          `flex items-center justify-between border-b p-4 font-semibold ` +
          (openCard ? "rounded-t-lg" : "rounded-lg")
        }
        onClick={(e) => {
          setOpenCard(!openCard);
        }}
      >
        <h2>{title}</h2>
        {watchProviderNumber && (
          <span className="rounded-lg bg-zinc-200 px-4 py-2 font-thin antialiased hover:text-black">
            {watchProviderNumber}
          </span>
        )}
        <div className={"text-xl " + (openCard ? "rotate-90" : "")}>
          <RiArrowRightSLine />
        </div>
      </div>
      <div
        className={
          `rounded-b-lg  p-${padding} ` + (openCard ? " block" : "hidden")
        }
      >
        {children}
      </div>
    </div>
  );
}
export default Card;
