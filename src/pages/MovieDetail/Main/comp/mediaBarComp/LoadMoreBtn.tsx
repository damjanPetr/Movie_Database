type Props = {
  func: () => void;
};
export default function LoadMoreBtn({ func }: Props) {
  return (
    <div className="flex items-center justify-center">
      <button onClick={func}>Load More...</button>
    </div>
  );
}
