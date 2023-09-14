import { base_url } from "../../../../../api/api";
import { MovieImages } from "../../../../../types/types";

type Props = {
  item: MovieImages["backdrops"][0];
};
export default function BackdropTab({ item }: Props) {
  return (
    <div className="flex-none">
      <img
        src={base_url + item.file_path}
        alt=""
        className="mr-2  min-h-full  rounded-lg object-cover"
      />
    </div>
  );
}
