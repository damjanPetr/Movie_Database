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
        <div className="">
          {/* // <iframe src={`https://youtube.com/embed/${item.key}`}></iframe> */}
          <img src={convertLinks(item.key)} alt="" />
          <div className="absolute inset-auto">play</div>
        </div>
      )}
    </div>
  );
}
