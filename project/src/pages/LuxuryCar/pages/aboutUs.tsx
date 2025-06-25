import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import "../scr/css/aboutus.css";
import Footer from '../components/Footer';
declare global {
  interface Window {
    tailwind: {
      config: object;
    };
  }
}

interface MediaAttributes {
  url: string;
  mime?: string;
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
}

interface MediaDataItem {
  id: number;
  attributes: MediaAttributes;
}

interface SingleMediaData {
  data: MediaDataItem | null;
}

interface BasicInfoAttributes {
  companyName?: string;
  companyLogo?: SingleMediaData;
}

interface LuxuryHeroAttributes {
  basicinfo?: BasicInfoAttributes;
  videoPoster?: SingleMediaData;
  videoUrl?: SingleMediaData;
  aboutUsBackground?: SingleMediaData;
  porscheImage?: SingleMediaData;
  ourStoryTitle?: string;
  aboutUsTextP1?: string;
  aboutUsTextP2?: string;
  heroSection?: any;
  featuredCar?: any;
  aboutUsSection?: any;
  locationSection?: any;
  ourCars?: any;
}

interface LCMainSectionAttributes {
  id: number;
  AU_TitleText?: string;
  AU_mainDesc?: string;
  buttonTxt?: string;
  // If 'icon' is a media field within LC_mainSection, ensure it's populated if used.
  // Currently, the icon for this section is not used in the JSX provided.
  // icon?: SingleMediaData; 
}

interface LCAUJourneySectionAttributes {
  id: number;
  Au_JourneyTitleTxt?: string;
  AU_JourneyDesc?: string;
  AU_journeyBG?: SingleMediaData; // This is the field we want to use for the image
}

// Interface for repeatable values (LC_AU_Values)
interface LCAUValueItemAttributes {
  id: number;
  AU_valueTxt?: string; // Corresponds to AU_valueTxt in Strapi
  AU_valueDesc?: string; // Corresponds to AU_valueDesc in Strapi
  iconIdentifier?: string; // This MUST be a Text field in Strapi, e.g., "quality", "client"
  // If you use AU_valuelmg (Media) for icons, then:
  // AU_valuelmg?: SingleMediaData;
}

// **NEW INTERFACE:** For the repeatable "Why Choose Us" items
interface LCAUWhyChooseUsItemAttributes {
  id: number;
  AU_whyUsTitle?: string; // From your Strapi field
  whyUsText?: string;     // From your Strapi field
}

interface AUMainSectionAttributes {
  AU_mainBG?: SingleMediaData;
  LC_mainSection?: LCMainSectionAttributes | null; // Changed to null as it's a single component
  LC_AU_JourneySection?: LCAUJourneySectionAttributes | null; // Changed to null as it's a single component
  LC_AU_Values?: LCAUValueItemAttributes[]; // This remains an array for repeatable components
  // **NEW FIELD:** Add the Why Choose Us repeatable component
  LC_AU_WhyChooseUs?: LCAUWhyChooseUsItemAttributes[]; // Assuming this is also repeatable
  WCU_IMG?: SingleMediaData; // Added WCU_IMG as a SingleMediaData type
}

interface AUMainSectionResponse {
  data: {
    id: number;
    attributes: AUMainSectionAttributes;
  } | null;
  meta: any;
}

interface LuxuryHeroResponse {
  data: Array<{
    id: number;
    attributes: LuxuryHeroAttributes;
  }> | null;
  meta: any;
}

// Icon map (assuming iconIdentifier is a string like "quality", "client", "innovation")
const iconMap: { [key: string]: React.ReactNode } = {
  quality: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18s-2.5-3-4-5c-1.5-2-2-4-2-6 0-3.314 2.686-6 6-6s6 2.686 6 6c0 2-1 4-2.5 6-1.5 2-4 5-4 5z" />
    </svg>
  ),
  client: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4h2a1 1 0 001-1v-3a1 1 0 00-1-1h-2a1 1 0 00-1 1v3a1 1 0 001 1z" />
    </svg>
  ),
  innovation: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  default: ( // Fallback icon if iconIdentifier is not found or null
    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
};

const Aboutus = () => {
  const [heroData, setHeroData] = useState<LuxuryHeroAttributes | null>(null);
  const [auMainSectionData, setAuMainSectionData] = useState<AUMainSectionAttributes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const STRAPI_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:1337";

  const getMediaUrl = (
    mediaDataContent:
      | MediaDataItem
      | MediaDataItem[]
      | string
      | null
      | undefined
  ): string => {
    let relativePath: string | undefined;

    if (typeof mediaDataContent === "string") {
      relativePath = mediaDataContent;
    } else if (mediaDataContent && !Array.isArray(mediaDataContent)) {
      relativePath = mediaDataContent.attributes?.url;
    } else if (Array.isArray(mediaDataContent) && mediaDataContent.length > 0) {
      relativePath = mediaDataContent[0].attributes?.url;
    } else {
      return "";
    }

    if (!relativePath) {
      return "";
    }

    let fullUrl = "";
    if (
      relativePath.startsWith("http://") ||
      relativePath.startsWith("https://")
    ) {
      fullUrl = relativePath;
    } else {
      fullUrl = `${STRAPI_BASE_URL}${
        relativePath.startsWith("/") ? "" : "/"
      }${relativePath}`;
    }
    return fullUrl;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const heroApiUrl =
          `${STRAPI_BASE_URL}/api/luxury-heroes?populate[basicinfo][populate]=companyLogo&populate[heroSection][populate]=*&populate[videoPoster]=*&populate[videoUrl]=*&populate[aboutUsBackground]=*&populate[porscheImage]=*&populate[featuredCar][populate]=*&populate[aboutUsSection][populate]=*&populate[locationSection][populate]=*&populate[ourCars][populate]=*&populate[aboutUsTextP1]=*&populate[aboutUsTextP2]=*&populate[ourStoryTitle]=*`;

        const auMainSectionPopulate =
          "populate[LC_mainSection][populate]=*&" +
          "populate[AU_mainBG]=*&" +
          "populate[LC_AU_JourneySection][populate]=*&" +
          "populate[LC_AU_Values]=*&" +
          "populate[LC_AU_WhyChooseUs]=*&" +
          "populate[WCU_IMG]=*"; // Added WCU_IMG to populate

        const auMainSectionApiUrl =
          `${STRAPI_BASE_URL}/api/au-main-section?${auMainSectionPopulate}`;

        const [heroResponse, auMainSectionResponse] = await Promise.all([
          fetch(heroApiUrl),
          fetch(auMainSectionApiUrl)
        ]);

        if (!heroResponse.ok) {
          throw new Error(`HTTP error fetching hero data! Status: ${heroResponse.status}`);
        }
        const heroJson: LuxuryHeroResponse = await heroResponse.json();
        if (heroJson?.data && heroJson.data.length > 0) {
          setHeroData(heroJson.data[0].attributes);
        } else {
          setHeroData(null);
        }

        if (!auMainSectionResponse.ok) {
          throw new Error(`HTTP error fetching AU_mainSection data! Status: ${auMainSectionResponse.status}. Check Strapi server logs.`);
        }
        const auMainSectionJson: AUMainSectionResponse = await auMainSectionResponse.json();
        if (auMainSectionJson?.data) {
          setAuMainSectionData(auMainSectionJson.data.attributes);
        } else {
          setAuMainSectionData(null);
        }

      } catch (err: any) {
        setError(`Failed to load content: ${err.message}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const logoUrl = heroData?.basicinfo?.companyLogo?.data
    ? getMediaUrl(heroData.basicinfo.companyLogo.data)
    : "";

  const heroBackgroundImage = heroData?.aboutUsBackground?.data
    ? getMediaUrl(heroData.aboutUsBackground.data)
    : 'https://placehold.co/1920x800/1e3a24/ffffff?text=Luxury+Car+Hero';

  // Changed this variable to use AU_journeyBG
  const journeyBackgroundImage = auMainSectionData?.LC_AU_JourneySection?.AU_journeyBG?.data
    ? getMediaUrl(auMainSectionData.LC_AU_JourneySection.AU_journeyBG.data)
    : 'https://placehold.co/600x400/1e3a24/ffffff?text=Our+Story'; // Fallback image

  // New variable for Why Choose Us image
  const whyChooseUsImage = auMainSectionData?.WCU_IMG?.data
    ? getMediaUrl(auMainSectionData.WCU_IMG.data)
    : 'https://placehold.co/600x400/1e3a24/ffffff?text=Why+Choose+Us'; // Fallback image

  if (loading) {
    return <div className="text-center p-8">Loading showroom data...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">Error: {error}</div>;
  }

  const journeySection = auMainSectionData?.LC_AU_JourneySection;

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-[#1a202c] overflow-x-hidden font-inter antialiased">
      {/* Navbar */}
      <Navbar largeLogoSrc={logoUrl} smallLogoSrc={logoUrl} />

      {/* Hero Section */}
      <section
        className="relative py-24 sm:py-32 lg:py-48 flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url('${heroBackgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-black bg-opacity-40 rounded-xl p-8 shadow-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 sm:mb-6 tracking-tight">
            {auMainSectionData?.LC_mainSection?.AU_TitleText || (
              <>
                Driving Excellence,{" "}
                <span className="text-emerald-300">Defining Luxury</span>
              </>
            )}
          </h1>
          <p className="text-base sm:text-lg lg:text-xl font-light mb-8 sm:mb-10 opacity-90">
            {auMainSectionData?.LC_mainSection?.AU_mainDesc ||
              "Crafting unparalleled automotive experiences since 1995."}
          </p>
          <a
            href="#"
            className="inline-block bg-emerald-500 text-white font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105"
          >
            {auMainSectionData?.LC_mainSection?.buttonTxt ||
              "Explore Our Legacy"}
          </a>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a24] mb-4 sm:mb-6">
              {journeySection?.Au_JourneyTitleTxt ||
                "Our Journey of Passion and Precision"}
            </h2>
            <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 text-gray-700">
              {journeySection?.AU_JourneyDesc ||
                "At Lusso Luxury Car, we are committed to delivering high-quality, reliable, and eco-friendly luxury vehicles that combine elegance with advanced performance. Since our launch in 2023, we’ve focused on redefining automotive passion through innovative design and modern technology. Each Lusso model is crafted to offer a refined driving experience that reflects both style and functionality."}
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-gray-700">
              {journeySection?.AU_JourneyDesc ||
                "Sustainability and customer satisfaction are at the heart of everything we do. From development to delivery, we take an eco-conscious approach while maintaining the highest standards of excellence. At Lusso, we believe true luxury means driving with purpose—where performance, innovation, and responsibility come together seamlessly."}
            </p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            {/* Using journeyBackgroundImage for the image source */}
            <img
              src={journeyBackgroundImage}
              alt="Our Story Image"
              className="rounded-xl shadow-xl w-full max-w-lg object-cover h-auto"
            />
          </div>
        </div>
      </section>

      {/* Our Values Section - Dynamically rendered from Strapi repeatable component */}
      <section className="bg-[#1e3a24] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2
            className="text-3xl sm:text-4xl font-extrabold mb-8 sm:mb-12"
            style={{ color: "white" }}
          >
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Check if LC_AU_Values exists AND has items */}
            {auMainSectionData?.LC_AU_Values &&
            auMainSectionData.LC_AU_Values.length > 0 ? (
              auMainSectionData.LC_AU_Values.map((valueItem) => (
                <div
                  key={valueItem.id} // Make sure Strapi items have an 'id'
                  className="bg-white text-[#1a202c] p-6 sm:p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                >
                  {/* Render the appropriate SVG icon based on iconIdentifier from Strapi */}
                  {/* You mentioned you still use iconMap, so I'll keep this logic.
                      However, if AU_valuelmg is a Media field in Strapi,
                      you might want to display an actual image here instead.
                      If using image, replace line below with:
                      {valueItem.AU_valuelmg?.data && <img src={getMediaUrl(valueItem.AU_valuelmg.data)} alt="Value Icon" className="h-14 w-14 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6" />}
                  */}
                  {iconMap[valueItem.iconIdentifier || "default"]}
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    {valueItem.AU_valueTxt || "Default Value Title"}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {valueItem.AU_valueDesc || "Default value description."}
                  </p>
                </div>
              ))
            ) : (
              // Fallback to hardcoded values if no dynamic data is available
              <>
                <div className="bg-white text-[#1a202c] p-6 sm:p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  {iconMap["quality"]}
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    Unrivaled Quality
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Every vehicle and service meets the highest standards of
                    excellence and meticulous attention to detail.
                  </p>
                </div>
                <div className="bg-white text-[#1a202c] p-6 sm:p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  {iconMap["client"]}
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    Client-Centric Approach
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    We prioritize our clients' desires, delivering tailored
                    experiences and fostering lasting relationships.
                  </p>
                </div>
                <div className="bg-white text-[#1a202c] p-6 sm:p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  {iconMap["innovation"]}
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                    Innovation & Integrity
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Continuously embracing advancements while upholding the
                    highest ethical standards in every interaction.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1e3a24] text-center mb-8 sm:mb-12">
            Why Choose Lusso?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div className="flex justify-center">
              {/* Using whyChooseUsImage for the image source */}
              <img
                src={whyChooseUsImage}
                alt="Why Choose Us Image"
                className="rounded-xl shadow-xl w-full max-w-lg object-cover h-auto"
              />
            </div>
            <div>
              <ul className="space-y-4 sm:space-y-6 text-base sm:text-lg text-gray-700">
                {/* Dynamically render Why Choose Us items */}
                {auMainSectionData?.LC_AU_WhyChooseUs &&
                auMainSectionData.LC_AU_WhyChooseUs.length > 0 ? (
                  auMainSectionData.LC_AU_WhyChooseUs.map((whyUsItem) => (
                    <li key={whyUsItem.id} className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mr-3 sm:mr-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-lg sm:text-xl text-[#1e3a24] mb-1">
                          {whyUsItem.AU_whyUsTitle ||
                            "Default Why Choose Us Title"}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {whyUsItem.whyUsText ||
                            "Default why choose us description."}
                        </p>
                      </div>
                    </li>
                  ))
                ) : (
                  // Fallback to hardcoded values if no dynamic data is available
                  <>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mr-3 sm:mr-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-lg sm:text-xl text-[#1e3a24] mb-1">
                          Exclusive Selection
                        </h3>
                        Access to a meticulously curated inventory of rare and
                        sought-after luxury vehicles.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mr-3 sm:mr-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-lg sm:text-xl text-[#1e3a24] mb-1">
                          Personalized Concierge Service
                        </h3>
                        Dedicated advisors providing bespoke services from
                        selection to after-sales care.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mr-3 sm:mr-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-lg sm:text-xl text-[#1e3a24] mb-1">
                          Uncompromising Standards
                        </h3>
                        Every vehicle undergoes rigorous inspection to ensure
                        peak condition and authenticity.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 sm:h-8 sm:w-8 text-emerald-600 mr-3 sm:mr-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <div>
                        <h3 className="font-semibold text-lg sm:text-xl text-[#1e3a24] mb-1">
                          Legacy of Trust
                        </h3>
                        Decades of experience building a reputation for
                        integrity and client satisfaction.
                      </div>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="beforeFooter bg-[#1e3a24] text-white py-16 sm:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 sm:mb-6">
            Ready to Experience True Luxury?
          </h2>
          <p className="text-base sm:text-lg mb-8 sm:mb-10 opacity-90">
            Connect with our team today to begin your journey with Luxury Lanes.
          </p>
          <a
            href="#"
            className="inline-block bg-white text-[#1e3a24] font-semibold py-2 px-6 sm:py-3 sm:px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Contact Our Specialists
          </a>
        </div>
      </section>
      <Footer logoUrl={logoUrl} />
    </div>
  );
};

export default Aboutus;