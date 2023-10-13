type Props = {};
function Footer({}: Props) {
  return (
    <div className="bg-[#032541] text-white  flex  py-2 ">
      <div className=" flex items-center text-lg px-6 py-1 mx-auto max-w-screen-xl ">
        <div className="w-28">
          <img
            src={
              "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
            }
            alt=""
          />
        </div>
        <p className="ml-auto w-1/2">
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </p>
      </div>
    </div>
  );
}
export default Footer;
