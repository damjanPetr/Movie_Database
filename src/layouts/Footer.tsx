type Props = {};
function Footer({}: Props) {
  return (
    <div className="bg-[#032541] text-white p-4 flex items-center">
      <div className="w-32">
        <img
          src={
            "https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg"
          }
          alt=""
        />
      </div>
      <p className="ml-auto">
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </p>
    </div>
  );
}
export default Footer;
