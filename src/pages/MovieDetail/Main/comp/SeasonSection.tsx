type Props = {
  castData: any;
};
export default function TopBilledCast({ castData }: Props) {
  return (
    <div className="">
      <header className="">Top Billed Cast</header>
      <div className="flex overflow-auto "></div>
    </div>
  );
}
