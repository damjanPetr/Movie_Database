import { useRef, useState } from "react";
import { MovieReviews } from "../../../../types/types";
import { still_182, still_300 } from "../../../../api/api";

type Props = {
  reviews: MovieReviews["results"];
};
function Social({ reviews }: Props) {
  const ul = useRef<HTMLUListElement>(null);
  const [tabLoad, setTabLoad] = useState<"reviews" | "discussion">("reviews");

  const reviewsTab = useRef<HTMLDivElement>(null);
  const discussionTab = useRef<HTMLDivElement>(null);

  async function handelClick(e: MouseEvent, index: number) {
    if (ul.current) {
      const listItems = ul.current.querySelectorAll("li");
      listItems.forEach((item) => {
        const underlineItem = item.querySelector("#underline");
        if (underlineItem) {
          underlineItem.classList.remove("opacity-0", "opacity-100");
          underlineItem.classList.add("opacity-0");
        }
      });

      if (e.currentTarget instanceof HTMLLIElement) {
        const underline = e.currentTarget.querySelector("#underline");

        if (underline instanceof HTMLDivElement) {
          underline.classList.remove("opacity-0");
          underline.classList.add("opacity-100");
        }
      }
    }
    if (index === 0) {
      setTabLoad("reviews");
    } else {
      setTabLoad("discussion");
    }
    return;
  }

  return (
    <div className="p-2 border-b">
      <p className="text-xl font-bold mb-2 ml-1.5">Social</p>
      <header className="">
        <nav>
          <ul ref={ul} className="flex ">
            {["Reviews", "Discussion"].map((item, index) => {
              return (
                <li
                  key={index}
                  className="p-2"
                  onClick={(e) => {
                    handelClick(e, index);
                  }}
                >
                  {item}
                  <div
                    className={`h-1 bg-teal-500 rounded-lg  transition-opacity ${
                      index === 0 ? "opacity-100" : "opacity-0"
                    }`}
                    id="underline"
                  ></div>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>

      <section>
        {tabLoad === "reviews" ? (
          <article
            className="p-4 shadowCard rounded-lg"
            id="reviews"
            ref={reviewsTab}
          >
            <header className="flex mb-4">
              <div className="">
                {reviews[0].author_details.avatar_path == null ? (
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-500 font-bold text-white">
                    {reviews[0].author.slice(0, 1)}
                  </div>
                ) : (
                  <img
                    src={still_182 + reviews[0].author_details.avatar_path}
                    alt=""
                    className="rounded-full w-12"
                  />
                )}
              </div>
              <div className="w-full px-4">
                <p className="font-bold">
                  A Review by{" "}
                  <span className="font-semibold">{reviews[0].author}</span>
                </p>
                <div className="flex items-baseline">
                  <span className="bg-black text-white px-1.5 flex text-sm w-fit items-center rounded-lg py-[1px] mr-1 ">
                    <svg
                      className="mr-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m5.825 22l1.625-7.025L2 10.25l7.2-.625L12 3l2.8 6.625l7.2.625l-5.45 4.725L18.175 22L12 18.275L5.825 22Z"
                      />
                    </svg>
                    {reviews[0].author_details.rating + ".0"}
                  </span>
                  {/* <div className="">{reviews[0].author}</div> */}
                  {/* <div className="">{reviews[0].author_details.name}</div> */}

                  <div className="text-gray-600 text-sm py-[1px] ">
                    Written by{" "}
                    <span className="underline text-black underline-offset-2">
                      {reviews[0].author_details.name}
                    </span>{" "}
                    on{" "}
                    {new Date(reviews[0].created_at).toLocaleDateString(
                      navigator.language,
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </div>
                </div>
              </div>
            </header>

            <div className="">
              <div className="prose-slate  text-clip text-sm">
                {reviews[0].content.split("\n").map((item, index) => {
                  return (
                    <p className="mb-5 " key={index}>
                      {item}
                    </p>
                  );
                })}
              </div>
              <span className="inline text-sm underline">
                <a href={reviews[0].url}>read The rest.</a>
              </span>
            </div>
          </article>
        ) : null}
        {tabLoad === "discussion" ? (
          <article
            ref={discussionTab}
            className="hidden"
            id="discussion"
          ></article>
        ) : null}
      </section>
      <p className="text-base font-semibold mt-4 ml-1.5 ">
        <a href="">Go to Discussions</a>
      </p>
    </div>
  );
}
export default Social;
