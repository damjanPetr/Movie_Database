type Props = {
  func: () => void;
};
export default function LoadMoreBtn({ func }: Props) {
  return (
    <div className="flex items-center justify-center flex-none pl-5   ">
      <button
        className="cursor-pointer hover:text-gray-600 font-bold hover:scale-105 transition-all  bg-gray-100 p-2 rounded-md"
        onClick={func}
      >
        Load More
      </button>
    </div>
  );
}
