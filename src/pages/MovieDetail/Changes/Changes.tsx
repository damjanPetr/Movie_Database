import { useLoaderData } from "react-router-dom";
import { MovieChanges, MovieDetails } from "../../../types/types";
import Banner from "../../components/Banner";
import { BiCloudLightRain } from "react-icons/bi";

export default function Changes() {
  const { data, details } = useLoaderData() as {
    data: MovieChanges;
    details: MovieDetails;
  };

  const dataObject = {};
  data.changes.forEach((item) => {
    item.items.forEach((item2) => {
      item2.time;
      if (!dataObject[new Date(item2.time).toLocaleDateString()]) {
        dataObject[new Date(item2.time).toLocaleDateString()] = [];
      }
      dataObject[new Date(item2.time).toLocaleDateString()].push(item);
    });
  });
  const main = Object.entries(dataObject);
  console.log("🚀 ~ file: Changes.tsx:23 ~ Changes ~ main:", data);
  return (
    <>
      <Banner movieDetail={details} />
      <main className="mx-auto w-10/12">
        {data.changes.map((item, index) => {
          return (
            <div key={index} className="p-4p-2 my-4">
              <h3 className="text-gray-400">{item.key}</h3>
              {item.items.map((item2, index) => {
                return (
                  <div key={`div ${item2} +${index} `} className="break-all">
                    {item2.action === "deleted"
                      ? Object.keys(item2.original_value).map(
                          (keyitem, index) => {
                            return (
                              <div className="my-2 bg-red-400 p-2" key={index}>
                                <p>
                                  {" "}
                                  {"- " + JSON.stringify(item2.original_value)}
                                </p>
                              </div>
                            );
                          }
                        )
                      : null}
                    {item2.action === "added"
                      ? Object.keys(item2.value).map((keyitem, index) => {
                          return (
                            <div
                              className="my-4  bg-green-400  p-2"
                              key={index}
                            >
                              <p>{"+ " + JSON.stringify(item2.value)}</p>
                            </div>
                          );
                        })
                      : null}
                    {item2.action === "updated"
                      ? Object.keys(item2.original_value).map(
                          (keyitem, index) => {
                            return (
                              <div className="p-2" key={index}>
                                <h2>htneouhaont</h2>
                                <div className="bg-red-300 p-2">
                                  <p>
                                    {"- " +
                                      JSON.stringify(item2.original_value)}
                                  </p>
                                </div>
                                <div className="bg-green-300 p-2">
                                  <p>{"+ " + JSON.stringify(item2.value)}</p>
                                </div>
                              </div>
                            );
                          }
                        )
                      : null}
                  </div>
                );
              })}
            </div>
          );
        })}
      </main>
    </>
  );
}
