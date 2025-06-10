import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./components/navbar.css";
import "./components/style.css";
import AOS from "aos";
import "aos/dist/aos.css";

// --- Interface Definitions ---
// Defines the expected structure of data fetched from the API.
interface MediaData {
  data?: {
    attributes: {
      url: string;
      mime?: string;
      name?: string;
    };
  };
}


// Featured Car section
interface FeaturedCar {
  id: number;
  carTitle?: string;
  carDesc?: string;
  carPhoto?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
}


// About Us section
interface aboutUsSection {
  aboutUsTitle?: string;
  aboutUsDesc?: string;
  buttonText?: string;
  carImage?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
  aboutUsBackground?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };

}

interface LuxuryHeroAttributes {
  title?: string;
  subtitle?: string;
  cta?: string;
  videoUrl?: {
    data?: {
      attributes: {
        url: string;
        mime: string;
      };
    };
  };
  videoPoster?: {
    data?: {
      attributes: {
        url: string;
      };
    };
  };
  heroSection?: {
    lussoTitle?: string;
    lussoDesc?: string;
    buttonTxt?: string;
    landingVideo?: {
      data?: {
        attributes: {
          url: string;
          mime: string;
        };
      };
    };
    landingFailedImage?: {
      data?: {
        attributes: {
          url: string;
        };
      };
    };
  };
  basicinfo?: {
    companyName?: string;
    companyLogo?: MediaData;
  };
  featuredCar?: FeaturedCar[];
  aboutUsSection?: aboutUsSection;
  aboutUsBackground?: MediaData;
  porscheImage?: MediaData;
}

// Fallback video source for robustness.
const FALLBACK_VIDEO_URL =
  "http://localhost:1337/uploads/landing_v2_03b5dc92f5.mp4";
const FALLBACK_VIDEO_MIME = "video/mp4";

// --- LuxuryHeroFetcher Component ---
// This component fetches and displays hero data, including a dynamic featured car section.
const LuxuryHeroFetcher = () => {
  // --- State Management ---
  // Manages the component's data and UI state.
  const [heroData, setHeroData] = useState<LuxuryHeroAttributes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useFallbackVideo, setUseFallbackVideo] = useState(false);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);

  // --- Utility Function: getMediaUrl ---
  // Converts relative API paths to full URLs for media assets.
  const getMediaUrl = (relativePath: string | undefined): string => {
    if (!relativePath) {
      console.log("getMediaUrl: No relativePath provided.");
      return "";
    }
    let fullUrl = "";
    if (
      relativePath.startsWith("http://") ||
      relativePath.startsWith("https://")
    ) {
      fullUrl = relativePath;
    } else {
      fullUrl = `http://localhost:1337${relativePath}`; // Ensure this base URL is correct for your Strapi instance
    }
    console.log(
      `DEBUG: getMediaUrl input: "<span class="math-inline">\{relativePath\}" \-\> output URL\: "</span>{fullUrl}"`
    ); // <--- ADD THIS LINE
    return fullUrl;
  };

  // --- useEffect Hook: Data Fetching and AOS Initialization ---
  // Handles data fetching and initializes the AOS library when the component mounts.
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });

    const fetchData = async () => {
      try {
        // Fetches hero data from Strapi, populating all related fields.
        const heroApiUrl =
  "http://localhost:1337/api/luxury-heroes?populate[basicinfo][populate]=companyLogo&populate[heroSection][populate]=*&populate[videoPoster]=*&populate[videoUrl]=*&populate[aboutUsBackground]=*&populate[porscheImage]=*&populate[featuredCar][populate]=*&populate[aboutUsSection][populate]=*";

        const heroResponse = await fetch(heroApiUrl);
        if (!heroResponse.ok) {
          throw new Error(
            `HTTP error fetching hero data! Status: ${heroResponse.status}`
          );
        }
        const heroJson = await heroResponse.json();
        console.log("Fetched Luxury Hero Data:", heroJson); // Log the raw fetched data

        if (heroJson?.data?.length > 0) {
          const attributes = heroJson.data[0].attributes;
          setHeroData(attributes);
          // Log featuredCar specifically to verify its content and type
          console.log("Featured Cars Data:", attributes.featuredCar);
        } else {
          setHeroData(null);
          console.warn("API returned no data for Luxury Hero.");
        }
      } catch (err: any) {
        setError(`Failed to load content: ${err.message}`);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Derived URLs for Navbar and About Us section images.
  const logoUrl = heroData?.basicinfo?.companyLogo?.data?.attributes?.url
    ? getMediaUrl(heroData.basicinfo.companyLogo.data.attributes.url)
    : "";

  const lussoBgUrl = heroData?.aboutUsSection?.aboutUsBackground?.data?.attributes?.url
    ? getMediaUrl(heroData?.aboutUsSection?.aboutUsBackground?.data?.attributes?.url)
    : "";

  const porscheUrl = heroData?.porscheImage?.data?.attributes?.url
    ? getMediaUrl(heroData.porscheImage.data.attributes.url)
    : "";

  // --- Event Handlers: Featured Car Navigation ---
  // Functions to navigate through the featured cars carousel.
  const handlePreviousCar = () => {
    // Ensure featuredCarsArray is an array before accessing length
    const featuredCarsArray = heroData?.featuredCar;
    if (featuredCarsArray && featuredCarsArray.length > 0) {
      setCurrentCarIndex((prevIndex) =>
        prevIndex === 0 ? featuredCarsArray.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNextCar = () => {
    // Ensure featuredCarsArray is an array before accessing length
    const featuredCarsArray = heroData?.featuredCar;
    if (featuredCarsArray && featuredCarsArray.length > 0) {
      setCurrentCarIndex((prevIndex) =>
        prevIndex === featuredCarsArray.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  // Get the currently displayed featured car based on the index.
  // Add a check to ensure heroData.featuredCar is an array and not empty
  const currentCar = heroData?.featuredCar?.[currentCarIndex]; // Keep this line
  console.log("--- Rendering Check ---");
  console.log("heroData:", heroData);
  console.log("currentCarIndex:", currentCarIndex);
  console.log("currentCar:", currentCar);
  console.log("Is currentCar truthy?", !!currentCar);
  console.log(
    "Is heroData?.featuredCar an array?",
    Array.isArray(heroData?.featuredCar)
  );
  console.log("heroData?.featuredCar.length:", heroData?.featuredCar?.length);

  // --- Conditional Rendering for Loading and Error States ---
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading content...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  // --- Component JSX (Rendered Output) ---
  // Defines the visual structure of the component.
  return (
    <div className="relative">
      <Navbar largeLogoSrc={logoUrl} smallLogoSrc={logoUrl} />
      <div
        className="overflow-y-auto scroll-smooth"
        style={{
          height: "100vh",
          scrollSnapType: "y mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* --- Hero Section --- */}
        {/* Displays the main introductory section with a background video or image. */}
        <section
          id="home"
          className="flex items-center justify-center relative bg-gradient-to-br from-primary/10 via-primary/20 to-primary/30 h-[calc(100vh-96px)] overflow-hidden"
          style={{ scrollSnapAlign: "start" }}
        >
          {loading ? null : error && !useFallbackVideo ? (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-red-900/50">
              <span className="text-red-400 text-lg">
                Error loading content: {error}
              </span>
            </div>
          ) : (heroData &&
              (heroData.heroSection?.landingVideo?.data?.attributes?.url ||
                heroData.videoUrl?.data?.attributes?.url)) ||
            useFallbackVideo ? (
            <>
              {/* Video and Overlay */}
              <video
                autoPlay
                loop
                muted
                playsInline
                key={useFallbackVideo ? "fallback-video" : "primary-video"}
                poster={
                  heroData?.videoPoster?.data?.attributes?.url
                    ? getMediaUrl(heroData.videoPoster.data.attributes.url)
                    : undefined
                }
                className="absolute inset-0 w-full h-full object-cover z-0"
                style={{
                  pointerEvents: "none",
                  display: videoLoaded ? "block" : "none",
                }}
                onLoadedData={() => {
                  setVideoLoaded(true);
                  console.log("Video loaded successfully!");
                }}
                onError={(e) => {
                  console.error("VIDEO LOAD ERROR:", e);
                  if (e.currentTarget.error) {
                    switch (e.currentTarget.error.code) {
                      case e.currentTarget.error.MEDIA_ERR_ABORTED:
                        console.error("Video playback aborted.");
                        break;
                      case e.currentTarget.error.MEDIA_ERR_NETWORK:
                        console.error("Network error during video load.");
                        break;
                      case e.currentTarget.error.MEDIA_ERR_DECODE:
                        console.error("Decoding error during video playback.");
                        break;
                      case e.currentTarget.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                        console.error("Unsupported or missing video source.");
                        break;
                      default:
                        console.error("Unknown video error.");
                        break;
                    }
                  }
                  if (!useFallbackVideo) {
                    setError(
                      "Failed to load primary video. Attempting fallback."
                    );
                    setUseFallbackVideo(true);
                    setVideoLoaded(false);
                  } else {
                    setError(
                      "Failed to load video (both primary and fallback). Displaying image fallback."
                    );
                    setHeroData(null); // Set heroData to null to trigger image fallback
                  }
                }}
              >
                {useFallbackVideo ? (
                  <source src={FALLBACK_VIDEO_URL} type={FALLBACK_VIDEO_MIME} />
                ) : heroData?.heroSection?.landingVideo?.data?.attributes
                    ?.url ? (
                  <source
                    src={getMediaUrl(
                      heroData.heroSection.landingVideo.data.attributes.url
                    )}
                    type={
                      heroData.heroSection.landingVideo.data.attributes.mime ||
                      "video/mp4"
                    }
                  />
                ) : heroData?.videoUrl?.data?.attributes?.url ? (
                  <source
                    src={getMediaUrl(heroData.videoUrl.data.attributes.url)}
                    type={heroData.videoUrl.data.attributes.mime || "video/mp4"}
                  />
                ) : null}
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
              {!videoLoaded && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <span className="text-heading text-lg animate-pulse text-white">
                    {useFallbackVideo
                      ? "Loading fallback video..."
                      : "Loading video..."}
                  </span>
                </div>
              )}
            </>
          ) : (
            // Fallback image if no video, or if videos failed.
            <div className="absolute inset-0 z-0">
              {heroData?.heroSection?.landingFailedImage?.data?.attributes
                ?.url ? (
                <img
                  src={getMediaUrl(
                    heroData.heroSection.landingFailedImage.data.attributes.url
                  )}
                  alt="Fallback Luxury background"
                  className="w-full h-full object-cover opacity-40"
                />
              ) : (
                <img
                  src="https://images.unsplash.com/photo-1511918984145-48de785d4c4e?auto=format&fit=crop&w=1500&q=80"
                  alt="Default Luxury background"
                  className="w-full h-full object-cover opacity-40"
                />
              )}
            </div>
          )}
          {/* Main content overlaying the hero media */}
          <div className="relative z-10 text-center text-heading max-w-2xl mx-auto">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <span className="text-heading text-2xl animate-pulse">
                  Loading content...
                </span>
              </div>
            )}
            {error && !loading && !useFallbackVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-red-900/50 rounded-lg">
                <span className="text-red-400 text-xl">{error}</span>
              </div>
            )}

            <h1 className=" text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg text-white">
              {heroData?.heroSection?.lussoTitle
                ? heroData.heroSection.lussoTitle
                : heroData?.title
                ? heroData.title
                : "Welcome to "}
              <span className="text-primary">Lu$$o</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-8 drop-shadow text-gray-500">
              {heroData?.heroSection?.lussoDesc
                ? heroData.heroSection.lussoDesc
                : heroData?.subtitle
                ? heroData.subtitle
                : "Experience the Pinnacle of Luxury"}
            </p>
            {(heroData?.heroSection?.buttonTxt ||
              heroData?.cta ||
              "Learn More") && (
              <button className="bg-primary hover:bg-primary/80 text-heading px-10 py-5 rounded-xl font-semibold text-lg shadow-lg transition-all duration-300">
                {heroData?.heroSection?.buttonTxt
                  ? heroData.heroSection.buttonTxt
                  : heroData?.cta || "Learn More"}
              </button>
            )}
          </div>
        </section>

         {/* --- About us section --- */}
        <section
          id="about"
          className="section-aboutus h-[calc(100vh-96px)] flex items-center justify-center bg-gray-600 text-white text-3xl"
          style={{ scrollSnapAlign: "start" }}
        >

          
          {/* --- background image --- */}
           <img
            className="aboutUs_backgroundImg"
            src={getMediaUrl(heroData?.aboutUsSection?.aboutUsBackground?.data?.attributes.url)}  

          />

          {/* --- car image --- */}
          <img
            className="aboutUs_carPhoto"
            src={getMediaUrl(heroData?.aboutUsSection?.carImage?.data?.attributes.url)}
          />

          <div className="textAboutUs">
            <h1>
            {heroData?.aboutUsSection?.aboutUsTitle}
          </h1>

          <p className="">{heroData?.aboutUsSection?.aboutUsDesc}</p>
          <button className="aboutus-button">
            <span>{heroData?.aboutUsSection?.buttonText}</span>
          </button>
          
          </div>




          
          
         

           
        </section>

        {/* --- Featured Cars Section --- */}
        {/* Showcases a carousel of featured cars with navigation buttons. */}
        <section
          id="featured-cars"
          className="section_cars_we_offer h-[calc(100vh-96px)] flex flex-col items-center justify-center  text-white p-6"
          style={{ scrollSnapAlign: "start" }}
        >
          <h2 className="cwo_title text-4xl md:text-6xl font-bold mb-10 text-center drop-shadow-lg">
            Our Featured Cars
          </h2>
          <div className="cwo-content">
            <div className="cwo_text">
              {currentCar ? (
                <div className="text-center">
                  <h1 className="gradient-text-title carTitle text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg text-white">
                    {currentCar.carTitle}
                  </h1>
                  <p className="gradient-text-desc text-lg md:text-xl mb-8 max-w-3xl mx-auto drop-shadow-md">
                    {currentCar.carDesc}
                  </p>
                </div>
              ) : (
                <p className="text-xl">No featured cars available.</p>
              )}
            </div>

            <div className="cwo-buttons">
              {currentCar ? (
                <div className="text-center">
                  {/* Only show navigation buttons if there's more than one car */}
                  {heroData?.featuredCar && heroData.featuredCar.length > 1 && (
                    <div className="flex justify-center space-x-6">
                      <button
                      
                        className="button_elegant "
                      >
                        See more
                      </button>
                      <button
                        
                        className="button_elegant"
                      >
                        Contact
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-xl">No featured cars available.</p>
              )}
            </div>
          </div>

          {/* CRITICAL CHANGE HERE: Ensure currentCar is valid before attempting to render details */}
          {currentCar ? (
            <div className="text-center">
              {currentCar.carPhoto?.data?.attributes?.url && (
                <img
                  src={getMediaUrl(currentCar.carPhoto.data.attributes.url)}
                  alt={currentCar.carTitle || "Featured Car"}
                  className="mx-auto rounded-lg shadow-xl mb-8 max-h-80 object-cover"
                />
              )}
              {/* Only show navigation buttons if there's more than one car */}
            </div>
          ) : (
            <p className="text-xl">No featured cars available.</p>
          )}

            {heroData?.featuredCar && heroData.featuredCar.length > 1 && (
          <div className="cwo-car-image-container relative">
            <svg className="cwo-svg" width="859" height="201" viewBox="0 0 859 201" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Next Button */}
              <g
                id="moveToNextCar_button_group"
                onClick={handleNextCar}
                className="cursor-pointer"
                filter="url(#filter0_b_58_50)"
              >
                <g clipPath="url(#clip0_58_50)">
                  <rect x="572" y="151" width="42" height="43" rx="21" fill="white" fillOpacity="0.18" />
                  <path d="M588.578 160.985L599.161 172.002L589.583 183.903" stroke="white" strokeWidth="1.65277" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <rect x="572.5" y="151.5" width="41" height="42" rx="20.5" stroke="white" />
              </g>

              {/* Previous Button */}
              <g
                id="moveToPrevCar_button_group"
                onClick={handlePreviousCar}
                className="cursor-pointer"
                filter="url(#filter1_b_58_50)"
              >
                <g clipPath="url(#clip1_58_50)">
                  <rect width="42.5543" height="41.3541" rx="20.677" transform="matrix(-0.999415 0.0341914 0.0291314 0.999576 548.53 158)" fill="white" fillOpacity="0.18" />
                  <path d="M532.078 166.724L520.156 178.801L532.939 189.645" stroke="white" strokeWidth="1.65277" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <rect x="-0.485142" y="0.516884" width="41.5543" height="40.3541" rx="20.177" transform="matrix(-0.999415 0.0341914 0.0291314 0.999576 547.544 158.017)" stroke="white" />
              </g>

              {/* Overlaying SVG Path */}
              <path id="overlaying_svg" d="M416.12 2C74.9536 18.6624 -324.798 232.444 439.956 184.657C1186.73 137.994 772.508 1.99983 416.12 2Z" stroke="url(#paint0_linear_58_50)" strokeOpacity="0.7" strokeWidth="3" />
              <defs>
                <filter id="filter0_b_58_50" x="479.5" y="58.5" width="227" height="228" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="46.25" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_58_50" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_58_50" result="shape" />
                </filter>
                <filter id="filter1_b_58_50" x="413.5" y="65.5" width="228.734" height="227.792" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feGaussianBlur in="BackgroundImageFix" stdDeviation="46.25" />
                  <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_58_50" />
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_58_50" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_58_50" x1="476.674" y1="182.568" x2="469.013" y2="49.8858" gradientUnits="userSpaceOnUse">
                  <stop stopColor="white" />
                  <stop offset="0.775" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <clipPath id="clip0_58_50">
                  <rect x="572" y="151" width="42" height="43" rx="21" fill="white" />
                </clipPath>
                <clipPath id="clip1_58_50">
                  <rect width="42.5543" height="41.3541" rx="20.677" transform="matrix(-0.999415 0.0341914 0.0291314 0.999576 548.53 158)" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        )}
        </section>

  




        <section
          id="showroom"
          className="h-[calc(100vh-96px)] flex items-center justify-center bg-gray-700 text-white text-3xl"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="text-center">
            {heroData?.basicinfo?.companyName && (
              <h2 className="text-5xl font-bold mb-4">
                Company Name:{" "}
                <span className="text-primary">
                  {heroData.basicinfo.companyName}
                </span>
              </h2>
            )}
            {heroData?.basicinfo?.companyLogo?.data?.attributes?.name && (
              <p className="text-xl">
                Logo File Name:{" "}
                <span className="font-semibold">
                  {heroData.basicinfo.companyLogo.data.attributes.name}
                </span>
              </p>
            )}
            {heroData?.basicinfo?.companyLogo?.data?.attributes?.url && (
              <img
                src={getMediaUrl(
                  heroData.basicinfo.companyLogo.data.attributes.url
                )}
                alt="Company Logo"
                className="mt-8 mx-auto h-20"
              />
            )}
            <h2>display info</h2>
          </div>
        </section>

        <section
          id="contact"
          className="h-[calc(100vh-96px)] flex items-center justify-center bg-gray-600 text-white text-3xl"
          style={{ scrollSnapAlign: "start" }}
        >
          Contact Section (Coming Soon)
        </section>
      </div>
    </div>
  );
};

export default LuxuryHeroFetcher;
