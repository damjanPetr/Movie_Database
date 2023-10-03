import { useRef } from "react";
import { MovieVideos } from "../../../../../types/types";
import { convertLinks } from "../../../../../utils/func";

type Props = {
  item: MovieVideos["results"][0];
};
export default function VideoTab({ item }: Props) {
  // convertLinks(item.id);
  const dialog = useRef<HTMLDialogElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);

  return (
    <div
      className="scb flex items-center gap-2  flex-none relative"
      key={item.id}
    >
      {
        <div className="relative">
          <dialog id={`my_modal_${item.id}`} className="modal" ref={dialog}>
            <div className="modal-box bg-black w-[80vw] h-[80vh]">
              <form method="dialog">
                <button
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white p-2 "
                  onClick={() => {
                    const dialogIframe = dialog.current;
                    if (iframe.current?.contentWindow !== null) {
                      iframe.current?.contentWindow.postMessage(
                        `
                      {"event":"command", "func":"stopVideo","args":""}`,
                        "*"
                      );
                    }
                  }}
                >
                  ✕
                </button>
              </form>
              <iframe
                ref={iframe}
                className="w-full h-full rounded-lg"
                src={`https://youtube.com/embed/${
                  item.key + "?enablejsapi=1&version=3&playerapiid=ytplayer"
                }`}
              ></iframe>
            </div>
          </dialog>

          <img src={convertLinks(item.key)} alt="" className="object-cover" />
          <div
            className="rounded-full p-4 bg-black/60 group absolute top-1/2 left-1/2 -translate-y-1/2 hover:bg-black/70 transition-colors active:bg-white"
            onClick={() => {
              // const modal = document.querySelector(
              // `#my_modal_${item.id}`
              // ) as HTMLDialogElement;

              const modal = dialog.current;

              if (modal) {
                modal.showModal();
              }
              const dialogIframe = iframe.current;

              if (dialogIframe) {
                setTimeout(() => {
                  if (dialogIframe.contentWindow !== null) {
                    dialogIframe.contentWindow.postMessage(
                      `{"event":"command", "func":"playVideo","args":""}`,
                      "*"
                    );
                  }
                }, 400);
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
      }
    </div>
  );
}
