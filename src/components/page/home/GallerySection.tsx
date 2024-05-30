import GallerySlider from "./GallerySlider";

const GallerySection = () => {
  return (
    <div className="container mx-auto px-5 mt-20">
      <div className="">
        <h1 className=" font-extrabold  text-[#061c3c] text-3xl dark:text-white">
          ENJOY A PHOTOGALLERY
        </h1>
        <p className="mt-3 text-[#293543] font-medium dark:text-gray-400">
          Discover the impact of your generosity through our gallery
        </p>
      </div>
      <GallerySlider />
    </div>
  );
};

export default GallerySection;
