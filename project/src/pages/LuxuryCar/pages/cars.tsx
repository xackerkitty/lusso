// src/pages/LuxuryCar/pages/cars.tsx

import React, { useState, useEffect, useRef } from 'react'; // Import useRef for DOM element reference
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Assuming Navbar is in this path
import Footer from '../components/Footer';
// --- INTERFACES ---
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

interface SingleMediaRelation {
    data: MediaDataItem | null;
}

interface MultipleMediaRelation {
    data: MediaDataItem[]; // Array for multiple images like carSliderImg
}

interface StrapiCarAttributes {
    carName: string;
    carBrand: string | null;
    carPrice: string;
    slug: string;
    carImage?: SingleMediaRelation; // Remains for main image if you still have it, otherwise can be removed
    brandLogo?: SingleMediaRelation;
    carSliderImg?: MultipleMediaRelation; // Field for multiple slider images
    isSold?: boolean;
}

interface StrapiCarData {
    id: number;
    attributes: StrapiCarAttributes;
}

interface Car {
    id: number;
    model: string;
    brand: string;
    price: number;
    slug: string;
    imageUrl: string; // Could become the first image of slider, or a placeholder
    brandLogoUrl: string;
    sliderImages: string[]; // Array of URLs for the slider
    isSold: boolean;
}

// Interfaces for LuxuryHero data (for Navbar logo)
interface BasicInfoAttributes {
    companyName?: string;
    companyLogo?: SingleMediaRelation;
}

interface LuxuryHeroAttributes {
    basicinfo?: BasicInfoAttributes;
}

interface FilterSidebarProps {
    searchTerm: string;
    onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    minPrice: number;
    maxPrice: number;
    onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    selectedBrands: string[];
    onBrandChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    availableBrands: string[];
}

interface CarCardProps {
    car: Car;
}

interface CarListingsProps {
    cars: Car[];
}

// --- Helper Functions ---
const getMediaUrl = (
    mediaContent: MediaDataItem | string | null | undefined,
    baseUrl: string
): string => {
    let relativePath: string | undefined;

    if (typeof mediaContent === "string") {
        relativePath = mediaContent;
    } else if (mediaContent && mediaContent.attributes && mediaContent.attributes.url) {
        relativePath = mediaContent.attributes.url;
    } else {
        return "";
    }

    if (!relativePath) {
        return "";
    }

    if (relativePath.startsWith("http://") || relativePath.startsWith("https://")) {
        return relativePath;
    } else {
        return `${baseUrl}${relativePath.startsWith("/") ? "" : "/"}${relativePath}`;
    }
};

// --- Hero Section Component ---
const HeroSection: React.FC = () => (
    <header className="relative bg-gray-900 text-white py-24 md:py-32 overflow-hidden shadow-xl">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x600/333333/ffffff?text=Luxury+Cars+Background')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="container mx-auto relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Cars</h1>
            <p className="text-lg md:text-xl opacity-90">Explore our exclusive collection of luxury vehicles.</p>
        </div>
    </header>
);

// --- Filter Sidebar Component ---
const FilterSidebar: React.FC<FilterSidebarProps> = ({
    searchTerm, onSearchChange,
    minPrice, maxPrice, onMinPriceChange, onMaxPriceChange,
    selectedBrands, onBrandChange, availableBrands
}) => {
    const [isPriceExpanded, setIsPriceExpanded] = useState(true);
    const [isBrandsExpanded, setIsBrandsExpanded] = useState(true);

    return (
        <aside className="w-full lg:w-1/4 bg-white p-6 rounded-xl shadow-lg h-fit mb-8 lg:mb-0 min-h-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Filter</h2>

            <div className="mb-6">
                <label htmlFor="search-cars" className="block text-gray-700 text-sm font-medium mb-2">Search for cars or brand</label>
                <div className="relative">
                    <input
                        type="text"
                        id="search-cars"
                        placeholder="Search for cars or brand"
                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                        value={searchTerm}
                        onChange={onSearchChange}
                    />
                    <svg className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div>
            </div>

            <div className="mb-6">
                <div
                    className="flex justify-between items-center mb-2 cursor-pointer select-none"
                    onClick={() => setIsPriceExpanded(!isPriceExpanded)}
                >
                    <label className="block text-gray-700 text-sm font-medium">Price</label>
                    <svg className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${isPriceExpanded ? 'rotate-0' : '-rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPriceExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="border-t border-gray-200 pt-4">
                        <div className="mb-4">
                            <p className="text-gray-600 text-sm font-medium">Min: <span className="font-bold text-gray-800">${minPrice.toLocaleString()}</span></p>
                            <input
                                type="range"
                                min="0"
                                max="500000"
                                value={minPrice}
                                onChange={onMinPriceChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm font-medium">Max: <span className="font-bold text-gray-800">${maxPrice.toLocaleString()}</span></p>
                            <input
                                type="range"
                                min="0"
                                max="500000"
                                value={maxPrice}
                                onChange={onMaxPriceChange}
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-0">
                <div
                    className="flex justify-between items-center mb-2 cursor-pointer select-none"
                    onClick={() => setIsBrandsExpanded(!isBrandsExpanded)}
                >
                    <label className="block text-gray-700 text-sm font-medium">Brands</label>
                    <svg className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${isBrandsExpanded ? 'rotate-0' : '-rotate-90'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isBrandsExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="border-t border-gray-200 pt-4 custom-scrollbar max-h-40 overflow-y-auto">
                        {availableBrands.length > 0 ? (
                            availableBrands.map(brand => (
                                <div key={brand} className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id={`brand-${brand}`}
                                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500 accent-blue-600"
                                        value={brand}
                                        checked={selectedBrands.includes(brand)}
                                        onChange={onBrandChange}
                                    />
                                    <label htmlFor={`brand-${brand}`} className="ml-2 text-gray-700 text-sm">{brand}</label>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No brands available.</p>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

// --- Car Card Component with Slider Logic ---
const CarCard: React.FC<CarCardProps> = ({ car }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageError, setImageError] = useState(false);
    const handleImageError = () => setImageError(true);
    const [brandLogoError, setBrandLogoError] = useState(false);
    const handleBrandLogoError = () => setBrandLogoError(true);

    const imageContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current || car.sliderImages.length <= 1) {
            return;
        }

        const containerWidth = imageContainerRef.current.offsetWidth;
        const mouseX = e.nativeEvent.offsetX; // Mouse X position relative to the element

        // Calculate segment width for each image
        const segmentWidth = containerWidth / car.sliderImages.length;
        const newIndex = Math.floor(mouseX / segmentWidth);

        // Update index only if it's different to prevent unnecessary re-renders
        if (newIndex !== currentImageIndex && newIndex < car.sliderImages.length && newIndex >= 0) {
            setCurrentImageIndex(newIndex);
        }
    };

    // Reset index when mouse leaves the card
    const handleMouseLeave = () => {
        setCurrentImageIndex(0);
    };

    const displayImageUrl = car.sliderImages[currentImageIndex] || car.imageUrl;

    return (
        <Link
            to={`/luxurycars/cardetails/${car.slug}`}
            className="relative bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out w-full border border-gray-200 block"
        >
            {car.isSold && (
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">Sold</div>
            )}
            <div
                ref={imageContainerRef}
                className="relative w-full h-40 overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            >
                {/* Image Display */}
                {imageError || !displayImageUrl ? (
                    <div className="w-full h-full bg-gray-300 flex flex-col items-center justify-center text-gray-600 text-center p-4">
                        <p className="font-bold text-lg mb-1">{car.model}</p>
                        <p className="text-sm">Image not available</p>
                    </div>
                ) : (
                    <img
                        src={displayImageUrl}
                        alt={`${car.model} - ${currentImageIndex + 1}`}
                        // Added transition for smoothness
                        className="w-full h-full object-cover transition-opacity duration-100 ease-in-out"
                        onError={handleImageError}
                    />
                )}

                {/* Slider Indicators (Dots) */}
                {car.sliderImages.length > 1 && (
                    <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-1">
                        {car.sliderImages.map((_, idx) => (
                            <span
                                key={idx}
                                className={`block w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-white' : 'bg-gray-400 opacity-75'}`}
                            ></span>
                        ))}
                    </div>
                )}
            </div>
            <div className="p-3">
                <div className="flex items-center mb-0.5">
                    {brandLogoError || !car.brandLogoUrl ? (
                        <div className="w-6 h-6 mr-2 flex items-center justify-center bg-gray-200 rounded-full text-gray-500 text-xs">
                            {car.brand ? car.brand.charAt(0) : ''}
                        </div>
                    ) : (
                        <img
                            src={car.brandLogoUrl}
                            alt={`${car.brand} Logo`}
                            className="w-6 h-6 mr-2 object-contain"
                            onError={handleBrandLogoError}
                        />
                    )}
                    <span className="text-gray-500 text-sm">{car.brand}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1 leading-tight">{car.model}</h3>
                <p className="text-lg font-bold text-gray-800">${car.price.toLocaleString()}</p>
            </div>
        </Link>
    );
};

// --- Car Listings Component ---
const CarListings: React.FC<CarListingsProps> = ({ cars }) => (
    <section className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 min-h-0">
        {cars.length > 0 ? cars.map(car => (
            <div key={car.id}>
                <CarCard car={car} />
            </div>
        )) : (
            <div className="col-span-full text-center py-10 text-gray-500 text-lg">No cars found matching your criteria.</div>
        )}
    </section>
);

// --- Main LuxuryCar Page Component ---
const LuxuryCar: React.FC = () => {
    const strapiBaseUrl = "http://localhost:1337";

    const [allCars, setAllCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [companyLogoUrl, setCompanyLogoUrl] = useState<string>("");

    const [searchTerm, setSearchTerm] = useState('');
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(500000);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);
            setError(null);

            try {
                // 1. Fetch Luxury Heroes Data for Navbar Logo
                const heroApiUrl = `${strapiBaseUrl}/api/luxury-heroes?populate[basicinfo][populate]=companyLogo`;
                const heroResponse = await fetch(heroApiUrl);
                if (!heroResponse.ok) {
                    throw new Error(`HTTP error fetching hero data! Status: ${heroResponse.status}`);
                }
                const heroJson = await heroResponse.json();
                if (heroJson?.data?.length > 0) {
                    const logoData = heroJson.data[0].attributes?.basicinfo?.companyLogo?.data;
                    setCompanyLogoUrl(getMediaUrl(logoData, strapiBaseUrl));
                } else {
                    setCompanyLogoUrl("https://placehold.co/40x40/ffffff/000000?text=L");
                }

                // 2. Fetch Car Details Data
                // IMPORTANT: Ensure 'carSliderImg' is populated to get all images
                // The image_d2d87a.png and image_d3485a.png show 'carPic' and 'carSliderImg' fields.
                // We'll populate both to ensure flexibility, but 'carSliderImg' will be used for the slider.
                const response = await fetch(`${strapiBaseUrl}/api/cars?populate=carImage,brandLogo,carSliderImg,slug`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const responseData = await response.json();

                const loadedCars: Car[] = responseData.data.map((strapiCar: StrapiCarData) => {
                    const brand = strapiCar.attributes.carBrand || '';
                    const carSlug = strapiCar.attributes.slug;

                    const priceString = strapiCar.attributes.carPrice;
                    const parsedPrice = parseFloat(priceString.replace(/[^0-9.-]+/g, ""));
                    const price = isNaN(parsedPrice) ? 0 : parsedPrice;

                    // Get slider images from carSliderImg
                    const sliderImages = strapiCar.attributes.carSliderImg?.data
                        ? strapiCar.attributes.carSliderImg.data.map(img => getMediaUrl(img, strapiBaseUrl))
                        : [];


                    // The main image for the card can be the first slider image, or carImage, or a placeholder
                    const imageUrl = sliderImages[0] || getMediaUrl(strapiCar.attributes.carImage?.data, strapiBaseUrl)
                        || `https://placehold.co/600x400/cccccc/ffffff?text=${encodeURIComponent(strapiCar.attributes.carName)}`;

                    const brandLogoPlaceholder = brand ? encodeURIComponent(brand.charAt(0)) : '';
                    const brandLogoUrl = getMediaUrl(strapiCar.attributes.brandLogo?.data, strapiBaseUrl)
                        || `https://placehold.co/20x20/cccccc/ffffff?text=${brandLogoPlaceholder}`;

                    return {
                        id: strapiCar.id,
                        model: strapiCar.attributes.carName,
                        brand: brand,
                        price: price,
                        slug: carSlug,
                        imageUrl: imageUrl, // Now potentially the first slider image
                        brandLogoUrl: brandLogoUrl,
                        sliderImages: sliderImages, // Store the array of slider image URLs
                        isSold: strapiCar.attributes.isSold || false,
                    };
                }).filter((car: Car) => car.slug);

                setAllCars(loadedCars);
                setFilteredCars(loadedCars);

                if (loadedCars.length > 0) {
                    const maxFetchedPrice = Math.max(...loadedCars.map(car => car.price));
                    setMinPrice(0);
                    setMaxPrice(maxFetchedPrice);
                }

            } catch (e: any) {
                console.error("Failed to fetch data:", e);
                setError(`Failed to load content: ${e.message}. Please check your Strapi server and network connection.`);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, [strapiBaseUrl]);

    useEffect(() => {
        let temp = [...allCars];
        if (searchTerm) {
            temp = temp.filter(c =>
                c.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        temp = temp.filter(c => c.price >= minPrice && c.price <= maxPrice);
        if (selectedBrands.length > 0) {
            temp = temp.filter(c => selectedBrands.includes(c.brand));
        }
        setFilteredCars(temp);
    }, [searchTerm, minPrice, maxPrice, selectedBrands, allCars]);

    const availableBrands = [...new Set(allCars.map(c => c.brand).filter(Boolean))].sort();

    return (
        <div className="font-sans text-gray-800 bg-gray-100 min-h-screen overflow-x-hidden flex flex-col">
            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #e0e0e0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                    border-radius: 10px;
                }
            `}</style>
            <Navbar largeLogoSrc={companyLogoUrl} smallLogoSrc={companyLogoUrl} />
            <HeroSection />
            <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 flex-grow">
                {loading ? (
                    <div className="w-full text-center py-20 text-gray-600 text-xl">Loading cars...</div>
                ) : error ? (
                    <div className="w-full text-center py-20 text-red-600 text-xl">Error: {error}</div>
                ) : (
                    <>
                        <FilterSidebar
                            searchTerm={searchTerm}
                            onSearchChange={e => setSearchTerm(e.target.value)}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onMinPriceChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                            onMaxPriceChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                            availableBrands={availableBrands}
                            selectedBrands={selectedBrands}
                            onBrandChange={e => {
                                const brand = e.target.value;
                                if (e.target.checked) setSelectedBrands([...selectedBrands, brand]);
                                else setSelectedBrands(selectedBrands.filter(b => b !== brand));
                            }}
                        />
                        <CarListings cars={filteredCars} />
                    </>
                )}
            </main>
            <Footer logoUrl={companyLogoUrl} />
        </div>
    );
};

export default LuxuryCar;