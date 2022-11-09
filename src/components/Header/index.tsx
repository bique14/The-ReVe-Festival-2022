import BirthdayLogoSrc from "../../assets/redvelvet-banner.jpeg";

const Header = () => {
  return (
    <div className="bg-[rgb(178,250,0)]">
      <img
        src={BirthdayLogoSrc}
        className="w-3/5 h-full mx-auto sm:w-2/5 md:w-1/5"
        alt="The ReVe Festival 2022 logo"
      />
    </div>
  );
};

export default Header;
