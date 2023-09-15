import { MovieVideos } from "../../../../../types/types";
import { convertLinks } from "../../../../../utils/func";

type Props = {
  item: MovieVideos["results"][0];
};
export default function VideoTab({ item }: Props) {
  // convertLinks(item.id);
  return (
    <div
      className="scb flex items-center gap-2  flex-none relative"
      key={item.id}
    >
      {item.site.toLowerCase() === "youtube" && (
        <div className="relative">
          <dialog id={`my_modal_${item.id}`} className="modal ">
            <div className="modal-box bg-black w-[80vw] h-[80vh] ">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white p-2 ">
                  ✕
                </button>
              </form>
              <iframe
                className="w-full h-full rounded-lg"
                // height={"100%"}
                // width={"100%"}
                src={`https://youtube.com/embed/${item.key}`}
              ></iframe>
            </div>
          </dialog>

          <img src={convertLinks(item.key)} alt="" />
          <div
            className="rounded-full p-4 bg-black/60 group absolute top-1/2 left-1/2 -translate-y-1/2 hover:bg-black/70 transition-colors active:bg-white"
            onClick={(e) => {
              const modal = document.querySelector(
                `#my_modal_${item.id}`
              ) as HTMLDialogElement;
              if (modal) {
                modal.showModal();
              }
            }}
          >
            <svg
              className="group-hover:fill-gray-200 transition-all group-hover:scale-105 "
              xmlns="http://www.w3.org/2000/svg"
              // color="red"
              width="30"
              height="30"
              fill="gray"
              viewBox="0 0 256 256"
            >
              <path d="M232.4 114.49L88.32 26.35a16 16 0 0 0-16.2-.3A15.86 15.86 0 0 0 64 39.87v176.26A15.94 15.94 0 0 0 80 232a16.07 16.07 0 0 0 8.36-2.35l144.04-88.14a15.81 15.81 0 0 0 0-27ZM80 215.94V40l143.83 88Z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
