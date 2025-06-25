// src/pages/ShowroomPage.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

// --- ABSOLUTELY CRITICAL: IMPORT LOCAL PLACEHOLDER IMAGES ---
// IMPORTANT: These local imports are now primarily used as fallbacks or for initial rendering
// before Strapi data loads. The actual displayed content will come from Strapi.
// This path assumes 'images' is directly under the 'src' directory,
// meaning 'gallery01.png' is located at 'src/images/gallery01.png'
import defaultMainImage from '../scr/images/gallery01.png'; // Make sure this path is correct for your project!
import defaultAboutImage from '../scr/images/gallery01.png'; // Assuming you might have a different about image

// Import the Navbar component from the components directory
// This path assumes Navbar.tsx is located directly in 'src/components/'.
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// Define Strapi Data Interfaces (copied from ContactPage structure for consistency)
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

interface MultiMediaData {
  data: MediaDataItem[];
}

interface BasicInfoAttributes {
  companyName?: string;
  companyLogo?: SingleMediaData;
}

// Interface for the hero section attributes from Strapi
interface LuxuryHeroAttributes {
  basicinfo?: BasicInfoAttributes;
  videoPoster?: SingleMediaData;
  videoUrl?: SingleMediaData;
  aboutUsBackground?: SingleMediaData;
  // No more pillarsSectionBackground here as it's part of the hero background now
  // Add other fields as needed based on your Strapi 'luxury-heroes' collection structure
}

// Define custom colors using the names from tailwind.config.js for consistency
const COLORS = {
  mainDarkGreen: 'bg-dark-green-main',
  accentDarkGreen: 'bg-dark-green-accent',
  buttonGreenPrimary: 'bg-green-primary hover:bg-green-hover',
  white: 'bg-white',
  grayTextDark: 'text-gray-900',
  grayTextLight: 'text-gray-100',
  grayTextMedium: 'text-gray-300',
  grayTextLighter: 'text-gray-400',
};

// Helper function to get media URL from Strapi media object (copied from ContactPage)
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
    console.warn(
      "getMediaUrl: No valid mediaDataContent provided or it's empty."
    );
    return "";
  }

  if (!relativePath) {
    console.warn(
      "getMediaUrl: extracted relativePath was empty or undefined."
    );
    return "";
  }

  // IMPORTANT: Replace with your actual Strapi base URL, ideally from environment variables
  const STRAPI_BASE_URL = "http://localhost:1337";

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

  console.log(
    `DEBUG: getMediaUrl input: "${relativePath}" -> output URL: "${fullUrl}"`
  );
  return fullUrl;
};

// Curated list of gallery images (for now, still using defaultMainImage as Strapi gallery data structure not provided)
const showroomGalleryImages = [
  { src: defaultMainImage, alt: 'Main Display Hall', span: '' },
  { src: defaultMainImage, alt: 'Exclusive Customer Lounge', span: 'md:col-span-2' },
  { src: defaultMainImage, alt: 'Architectural Grandeur', span: '' },
  { src: defaultMainImage, alt: 'Bespoke Customization Studio', span: 'md:row-span-2' },
  { src: defaultMainImage, alt: 'VIP Viewing Deck', span: '' },
  { src: defaultMainImage, alt: 'Illuminated Evening Entrance', span: '' },
  { src: defaultMainImage, alt: 'Private Consultation Area', span: '' },
  { src: defaultMainImage, alt: 'Detailing Studio Entrance', span: 'md:col-span-2' },
  { src: defaultMainImage, alt: 'Panoramic Sunroof Showcase', span: '' },
  { src: defaultMainImage, alt: 'Innovative Interior Design', span: '' },
  { src: defaultMainImage, alt: 'Performance Engine Display', span: '' },
  { src: defaultMainImage, alt: 'Luxury Leather Upholstery Samples', span: '' },
  { src: defaultMainImage, alt: 'Virtual Reality Experience Zone', span: 'md:col-span-2' },
  { src: defaultMainImage, alt: 'Brand Heritage Wall', span: '' },
  { src: defaultMainImage, alt: 'Automotive Art Gallery', span: '' },
];

/**
 * Custom hook for Intersection Observer.
 * @param ref - React ref to the DOM element to observe.
 * @param options - Intersection Observer options (e.g., threshold).
 * @returns boolean indicating if the element is currently intersecting.
 */
const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverInit = { threshold: 0.1 }
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Cleanup function to disconnect observer on component unmount
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options]);

  return isVisible;
};

/**
 * A wrapper component for sections that should animate into view on scroll.
 * Applies a fade-in-up transition.
 * @param children - The content of the section.
 * @param className - Additional Tailwind CSS classes for the container.
 * @param delay - Optional animation delay in milliseconds for staggered effects.
 * @param threshold - Intersection Observer threshold for triggering the animation.
 */
const AnimatedSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
  id?: string; // Added id prop
}> = ({ children, className = '', delay = 0, threshold = 0.2, id }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold });

  return (
    <div
      ref={sectionRef}
      id={id} // Assign the id here
      className={`${className} transition-all duration-1000 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

/**
 * Hero Section component with parallax background video and animated text.
 * Now features refined scroll-based blur, a subtle vignette overlay, and integrated
 * "Pillars of Excellence" content with a scroll-down arrow.
 * @param videoSrc - URL of the video to display.
 * @param posterSrc - URL of the image to use as a poster for the video.
 * @param scrollToNextSection - Function to scroll to the next section.
 */
const HeroSection: React.FC<{ videoSrc: string; posterSrc: string; scrollToNextSection: () => void }> = ({ videoSrc, posterSrc, scrollToNextSection }) => {
  const heroContainerRef = useRef<HTMLElement>(null);
  const [videoTransform, setVideoTransform] = useState('translateY(0%)'); // State for video parallax
  const [videoBlur, setVideoBlur] = useState(0); // State for blur amount
  const videoRef = useRef<HTMLVideoElement>(null); // Ref to control video playback based on visibility

  // Calculates the parallax offset and blur based on scroll position
  const handleScroll = useCallback(() => {
    if (heroContainerRef.current) {
      const { top, height } = heroContainerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;

      // Parallax effect for the video
      const parallaxOffset = scrollY * 0.5;
      setVideoTransform(`translateY(-${parallaxOffset}px)`);

      // Calculate blur amount based on how much the hero section has scrolled out of view
      const scrollProgressOutOfView = Math.max(0, -top / (height * 0.5));
      const blurAmount = Math.min(scrollProgressOutOfView * 6, 8);
      setVideoBlur(blurAmount);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount to set initial position
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Use Intersection Observer to play/pause video based on its visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(e => console.error("Video play failed:", e));
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the video is visible
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const pillars = [
    { title: "ELEGANCE", description: "Refined aesthetics, timeless design." },
    { title: "INNOVATION", description: "Pioneering technology, future-forward." },
    { title: "HERITAGE", description: "Rich legacy, enduring craftsmanship." },
    { title: "EXCLUSIVITY", description: "Bespoke experiences, unparalleled access." },
  ];


  return (
    <section
      ref={heroContainerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center p-8 overflow-hidden"
    >
      {/* Parallax Background Layer: Video moves slower than foreground content */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out"
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        style={{ transform: videoTransform, filter: `blur(${videoBlur}px)` }}
      >
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay for text readability with a subtle radial gradient for vignette */}
      <div className="absolute inset-0 bg-black bg-opacity-70 before:content-[''] before:absolute before:inset-0 before:bg-radial-gradient-vignette before:opacity-50"></div>

      {/* Text Content: Animated and interactive */}
      <div className="relative text-center z-10 max-w-5xl mx-auto flex-grow flex flex-col justify-center">
        {/* Main Headline */}
        <h1
          className={`text-5xl md:text-6xl font-heading font-extrabold mb-8 ${COLORS.grayTextLight} drop-shadow-lg
            animate-fade-in-up-custom animate-breathe text-shimmer-light`}
          style={{ animationDelay: '200ms' }}
        >
          Defining the Lusso Standard
        </h1>
        {/* Subtext */}
        <p
          className={`text-xl md:text-2xl ${COLORS.grayTextLight} mb-12 leading-relaxed max-w-3xl mx-auto
            animate-fade-in-up-custom`}
          style={{ animationDelay: '600ms' }}
        >
          At Lusso, we don't just craft automobiles; we embody a philosophy of unparalleled quality, pioneering spirit, and an enduring commitment to luxury.
        </p>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 mb-16">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg backdrop-filter backdrop-blur-sm bg-white bg-opacity-10
                          shadow-lg border border-white border-opacity-20
                          transform transition-all duration-500 ease-out
                          hover:bg-opacity-20 hover:scale-[1.02] hover:shadow-xl hover:border-green-primary
                          animate-fade-in-up-custom`}
              style={{ animationDelay: `${800 + (100 * index)}ms` }} // Staggered animation
            >
              <h3 className={`text-2xl font-heading font-bold mb-2 ${COLORS.grayTextLight}`}>
                {pillar.title}
              </h3>
              <p className={`text-base ${COLORS.grayTextMedium}`}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Beautiful Downward Arrow */}
      <div className="absolute bottom-8 z-10 animate-bounce cursor-pointer">
        <svg
          className="w-12 h-12 text-green-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </div>
    </section>
  );
};


/**
 * About Section component, describing the showroom experience.
 * @param imageSrc - URL of the image to display in the about section.
 */
const AboutSection: React.FC<{ imageSrc: string }> = ({ imageSrc }) => {
  return (
    <AnimatedSection
      id="about-section" // Added ID for scrolling
      className={`py-24 px-4 md:px-12 w-full flex flex-col lg:flex-row items-center gap-16 ${COLORS.white} ${COLORS.grayTextDark} shadow-xl rounded-b-lg`}
      threshold={0.2}
    >
      {/* Image Block with layered visual depth and dynamic overlay */}
      <div className="lg:w-1/2 flex-shrink-0 relative group"> {/* Added group for hover effects */}
        <div className="absolute inset-0 border-4 border-green-primary rounded-lg transform translate-x-4 -translate-y-4 md:translate-x-8 md:-translate-y-8 z-0 opacity-60"></div> {/* Layered border */}
        <img
          src={imageSrc}
          alt="Showroom Interior"
          className="w-full h-[400px] md:h-[500px] object-cover rounded-lg shadow-2xl transform transition-transform duration-700 ease-in-out group-hover:scale-[1.02] relative z-10"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/600x400/333/FFF?text=Image+Error`;
            e.currentTarget.alt = "Image failed to load";
          }}
        />
        {/* Dynamic gradient overlay that reveals more on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500 rounded-lg z-10"></div>
        {/* NEW: Overlay text on hover */}
        <div className="absolute inset-0 flex items-center justify-center p-4 text-white text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20">
            <p className="text-3xl font-heading font-bold drop-shadow-md">Discover the Difference</p>
        </div>
      </div>

      {/* Text Content */}
      <div className="lg:w-1/2 text-left">
        <h2 className={`text-5xl font-heading font-extrabold mb-6 ${COLORS.grayTextDark}`}>
          An Experience Beyond Expectations
        </h2>
        <p className={`text-xl ${COLORS.grayTextDark} mb-6 leading-relaxed`}>
          More than just a display space, our showroom is an architectural masterpiece, thoughtfully curated to reflect
          the prestige and innovation of every vehicle it houses. From the gleaming polished floors to the ambient,
          intelligent lighting, every element contributes to an atmosphere of exclusive sophistication.
        </p>
        <p className={`text-lg ${COLORS.grayTextDark} leading-relaxed`}>
          We've designed every corner to evoke a sense of wonder and comfort, inviting you to immerse yourself in
          dedicated zones for personalized consultations, unwind in our luxurious private lounges, and engage with
          dynamic interactive displays that bring the legacy and future of our automotive masterpieces to life. This is
          where dreams are realized.
        </p>
      </div>
    </AnimatedSection>
  );
};


/**
 * Gallery Section component, showcasing a selection of showroom images.
 * Each image animates into view and has interactive hover effects.
 */
const GallerySection: React.FC = () => {
  // States and refs for individual gallery item animations
  const [galleryItemVisibles, setGalleryItemVisibles] = useState<boolean[]>(
    Array(showroomGalleryImages.length).fill(false)
  );
  const galleryItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Effect to set up Intersection Observers for each gallery item
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    galleryItemRefs.current.forEach((itemRef, index) => {
      if (itemRef) {
        // Set first few items as visible on initial load if they are already in the viewport
        if (index < 6) { // Keeping this heuristic for initial visibility
          setGalleryItemVisibles(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
          });
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setGalleryItemVisibles(prev => {
                  const newState = [...prev];
                  if (index < newState.length) newState[index] = true;
                  return newState;
                });
                observer.unobserve(entry.target); // Stop observing once visible
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(itemRef);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <AnimatedSection
      className={`w-full py-24 ${COLORS.accentDarkGreen}`}
      threshold={0.1}
    >
      <h2 className={`text-5xl font-heading font-extrabold mb-16 text-center ${COLORS.grayTextLight}`}>
        A Glimpse Inside Our World
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 px-4 md:px-12 max-w-7xl mx-auto">
        {showroomGalleryImages.map((image, index) => (
          <div
            key={index}
            ref={el => { galleryItemRefs.current[index] = el; }}
            className={`relative overflow-hidden rounded-xl shadow-2xl group cursor-pointer aspect-video
                ${image.span || ''}
                transform transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.03]
                ${galleryItemVisibles[index] ? 'opacity-100 translate-y-0 animate-fade-in-up-custom animate-slide-in' : 'opacity-0 translate-y-16'}
                `}
            style={{ animationDelay: `${50 * index}ms` }}
          >
            <img
              src={image.src} // Still using local defaultMainImage for gallery until Strapi structure for it is known
              alt={image.alt}
              className="w-full h-full object-cover transform transition-transform duration-700 ease-out group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.src = `https://placehold.co/600x400/333/FFF?text=Image+Error`;
                e.currentTarget.alt = "Image failed to load";
              }}
            />
            {/* Enhanced overlay on hover for a more unique effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-primary via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div> {/* NEW: Diagonal subtle gradient on hover */}

            <div className="absolute bottom-4 left-4 right-4 text-white p-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
              <p className={`text-xl md:text-2xl font-bold font-heading tracking-wide ${COLORS.grayTextLight}`}>
                {image.alt}
              </p>
              <p className={`${COLORS.grayTextLighter} text-sm mt-1`}>Explore this exquisite space.</p>
            </div>
          </div>
        ))}
      </div>
      <p className={`text-center ${COLORS.grayTextMedium} mt-20 text-lg max-w-3xl mx-auto px-4`}>
        Every detail, every corner, meticulously designed to elevate your senses and connect you with the artistry of
        luxury automobiles.
      </p>
    </AnimatedSection>
  );
};


// Main ShowroomPage Component: Orchestrates the entire page layout
const ShowroomPage: React.FC = () => {
  // States for Strapi data fetching
  const [heroData, setHeroData] = useState<LuxuryHeroAttributes | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Ref for the About section to scroll to
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  // Function to scroll to the About section
  const scrollToAboutSection = () => {
    if (aboutSectionRef.current) {
      // Use behavior: 'smooth' for smooth scrolling
      // Use block: 'start' to align the top of the element with the top of the scroll area
      // Use inline: 'nearest' to align the nearest edge of the element to the nearest edge of the scroll area
      aboutSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure this URL matches your Strapi endpoint for luxury-heroes
        // and includes all necessary populates for image/video URLs.
        const heroApiUrl =
          "http://localhost:1337/api/luxury-heroes?populate[basicinfo][populate]=companyLogo&populate[videoPoster]=*&populate[videoUrl]=*&populate[aboutUsBackground]=*";

        const heroResponse = await fetch(heroApiUrl);
        if (!heroResponse.ok) {
          throw new Error(
            `HTTP error fetching hero data! Status: ${heroResponse.status}`
          );
        }
        const heroJson = await heroResponse.json();
        console.log("Fetched Luxury Hero Data:", heroJson);

        if (heroJson?.data?.length > 0) {
          setHeroData(heroJson.data[0].attributes);
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

  // Safely get URLs from fetched Strapi data, using default local images as fallback
  const logoUrl = heroData?.basicinfo?.companyLogo?.data
    ? getMediaUrl(heroData.basicinfo.companyLogo.data)
    : defaultMainImage; // Fallback to local image

  const heroVideoUrl = heroData?.videoUrl?.data
    ? getMediaUrl(heroData.videoUrl.data)
    : 'https://www.w3schools.com/html/mov_bbb.mp4'; // Fallback to W3Schools video

  const heroVideoPosterUrl = heroData?.videoPoster?.data
    ? getMediaUrl(heroData.videoPoster.data)
    : defaultMainImage; // Fallback to local image (consider defaultAboutImage or a specific poster)

  const aboutSectionImageUrl = heroData?.aboutUsBackground?.data
    ? getMediaUrl(heroData.aboutUsBackground.data)
    : defaultAboutImage; // Fallback to a dedicated about image placeholder


  // Render loading or error state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-dark-green-main text-gray-100">
        <p className="text-xl">Loading showroom data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-800 text-white">
        <p className="text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${COLORS.grayTextLight} flex flex-col items-center overflow-hidden font-body ${COLORS.mainDarkGreen}`}
    >
      {/* Navbar placed at the very top, now using dynamically fetched logo URL */}
      <Navbar largeLogoSrc={logoUrl} smallLogoSrc={logoUrl} />

      {/* Main content div - removed explicit padding-top here.
          The HeroSection should now occupy the full viewport height below the Navbar. */}
      <div className="w-full">
        {/* Pass dynamically fetched video and poster URLs and the scroll function to HeroSection */}
        <HeroSection videoSrc={heroVideoUrl} posterSrc={heroVideoPosterUrl} scrollToNextSection={scrollToAboutSection} />

        {/* Pass dynamically fetched image URL to AboutSection */}
        {/* The AnimatedSection now correctly takes a ref */}
        <div ref={aboutSectionRef}> {/* Added ref to the div wrapping AboutSection */}
          <AboutSection imageSrc={aboutSectionImageUrl} />
        </div>

        <GallerySection />
        {/* The Call to Action section was previously removed and remains absent as requested. */}
        <Footer logoUrl={logoUrl} />
      </div>
     
    </div>
     
  );
};

export default ShowroomPage;