import { AiFillPlayCircle, AiFillYoutube } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useSearchParams } from "react-router-dom";
import { MovieVideos } from "../../../../types/types";

type Props = {
  data: MovieVideos;
};

function MainVideo({ data }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterType = searchParams.get("videoType");
  return (
    <div className="space-y-6 p-4">
      {data.results
        .filter((item) => {
          return (
            item.type.toLowerCase() ===
            decodeURIComponent(filterType as string).toLowerCase()
          );
        })
        .map((item) => {
          // if (
          //   item.type === decodeURIComponent(filterType as string).toLowerCase()
          // ) {
          //   return <p>{`There are no ${filterType}s added to this Movie`}</p>;
          // }
          return (
            <div
              key={item.id}
              className=" rounded-lg stroke-gray-500 shadow-lg hover:shadow-xl"
            >
              <div className="flex">
                <div className="video min-h-[200px] w-2/5 ">
                  <a className="" href={`http://www.youtube.com/` + item.key}>
                    <div
                      className="relative block h-full  w-full rounded-l-lg bg-cover bg-clip-padding bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(https://img.youtube.com/vi/${item.key}/mqdefault.jpg)`,
                      }}
                    >
                      <div className="playbtn absolute left-2/4 top-2/4   text-5xl text-gray-950/60 [transform:translate(-50%,-50%)] hover:text-gray-300">
                        <AiFillPlayCircle />
                      </div>
                    </div>
                  </a>
                </div>
                <div className="content flex w-3/5 flex-col justify-between">
                  <h3 className="mb-4 p-2 text-base font-bold">{item.name}</h3>
                  <div className="flex p-2 text-sm">
                    <p>{item.type}•</p>
                    <p className="">
                      {((): string => {
                        const date = new Date(item.published_at);
                        return `${date.getMonth()}-${date.getDate()}-${date.getFullYear()}`;
                      })()}
                    </p>
                  </div>
                  <div className="flex gap-2 p-2">
                    <a href={`https://youtube.com/${item.key}`}>
                      <AiFillYoutube />
                    </a>
                    <IoMdCheckmarkCircleOutline />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
export default MainVideo;
