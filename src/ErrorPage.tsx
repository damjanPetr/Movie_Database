import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { message: string; statusText: string };

  return (
    <div className="flex h-screen  items-center bg-teal-100 text-lg ">
      <div className="desc mx-auto">
        <h1 className="text-xl font-bold text-violet-500">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <div className="">
          <p className="font-mono font-bold">
            <span className="block bg-red-500 p-4 text-xl text-red-900">
              {error.message}
            </span>
            <span className="tracking-widest text-blue-500">
              {error.statusText && error.statusText}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
