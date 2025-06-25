import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


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

// Define a specific interface for single media fields (e.g., companyLogo, videoPoster)
interface SingleMediaData {
  data: MediaDataItem | null;
}

// Define a specific interface for multiple media fields (e.g., carPhoto if it were an array)
interface MultiMediaData {
  data: MediaDataItem[];
}

interface BasicInfoAttributes {
  companyName?: string;
  companyLogo?: SingleMediaData;
}



// Main interface for the luxury-hero attributes
interface LuxuryHeroAttributes {
  basicinfo?: BasicInfoAttributes;
  videoPoster?: SingleMediaData;
  videoUrl?: SingleMediaData; // Assuming videoUrl also comes as a media object
  aboutUsBackground?: SingleMediaData;
  porscheImage?: SingleMediaData;
 
}


const ContactPage = () => {
    // States for Strapi data fetching
      const [heroData, setHeroData] = useState<LuxuryHeroAttributes | null>(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);
      
    
      // Helper function to get media URL from Strapi media object
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
          relativePath = mediaDataContent; // It's already a direct URL string
        } else if (mediaDataContent && !Array.isArray(mediaDataContent)) {
          // It's a single MediaDataItem (e.g., logo.data, poster.data)
          relativePath = mediaDataContent.attributes?.url;
        } else if (Array.isArray(mediaDataContent) && mediaDataContent.length > 0) {
          // It's an array of MediaDataItem (e.g., carPhoto.data)
          relativePath = mediaDataContent[0].attributes?.url;
        } else {
          console.warn(
            "getMediaUrl: No valid mediaDataContent provided or it's empty."
          );
          return ""; // Return empty string or a placeholder if no path
        }
    
        if (!relativePath) {
          console.warn(
            "getMediaUrl: extracted relativePath was empty or undefined."
          );
          return "";
        }
    
        // Ensure this base URL is correct for your Strapi instance
        // It's highly recommended to use environment variables for this.
        // For example: process.env.REACT_APP_STRAPI_BASE_URL
        const STRAPI_BASE_URL = "http://localhost:1337";
    
        let fullUrl = "";
        if (
          relativePath.startsWith("http://") ||
          relativePath.startsWith("https://")
        ) {
          fullUrl = relativePath; // Already a full URL
        } else {
          // Handle cases where relativePath might start with a leading slash or not
          fullUrl = `${STRAPI_BASE_URL}${
            relativePath.startsWith("/") ? "" : "/"
          }${relativePath}`;
        }
    
        console.log(
          `DEBUG: getMediaUrl input: "${relativePath}" -> output URL: "${fullUrl}"`
        );
        return fullUrl;
      };
    
      useEffect(() => {
        // AOS.init({
        //   duration: 1000,
        //   once: true,
        // }); // Uncomment if you are using AOS and have it imported
    
        const fetchData = async () => {
          try {
            const heroApiUrl =
              "http://localhost:1337/api/luxury-heroes?populate[basicinfo][populate]=companyLogo&populate[heroSection][populate]=*&populate[videoPoster]=*&populate[videoUrl]=*&populate[aboutUsBackground]=*&populate[porscheImage]=*&populate[featuredCar][populate]=*&populate[aboutUsSection][populate]=*&populate[locationSection][populate]=*&populate[ourCars][populate]=*";
    
            const heroResponse = await fetch(heroApiUrl);
            if (!heroResponse.ok) {
              throw new Error(
                `HTTP error fetching hero data! Status: ${heroResponse.status}`
              );
            }
            const heroJson = await heroResponse.json();
            console.log("Fetched Luxury Hero Data:", heroJson);
    
            if (heroJson?.data?.length > 0) {
              const attributes = heroJson.data[0].attributes;
              setHeroData(attributes);
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
    
      // Safely get the logo URL from the fetched heroData
      const logoUrl = heroData?.basicinfo?.companyLogo?.data
        ? getMediaUrl(heroData.basicinfo.companyLogo.data)
        : "";
    
      // Render loading or error state
      if (loading) {
        return <div className="text-center p-8">Loading showroom data...</div>;
      }
    
      if (error) {
        return <div className="text-center p-8 text-red-600">Error: {error}</div>;
      }
  return (
    <div className="min-h-screen bg-white text-[#013220] font-sans overflow-hidden">
      <Navbar largeLogoSrc={logoUrl} smallLogoSrc={logoUrl} />
      <div
        className="max-w-6xl mx-auto px-6 py-20"
        style={{ marginTop: "55px" }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center text-[#013220]"
        >
          Contact Lusso Luxury Cars
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6 bg-[#f8f8f8] p-6 rounded-xl shadow-xl hover:shadow-2xl transition"
          >
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#013220]"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#013220]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Message</label>
              <textarea
                rows={5}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#013220]"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-[#013220] text-white py-3 rounded-lg hover:bg-green-900 transition"
            >
              Send Message
            </motion.button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-gray-700">
              Whether you're exploring our exclusive models or need help with a
              purchase, our dedicated support team is ready to assist you.
            </p>

            <div>
              <h3 className="text-lg font-medium">Address</h3>
              <p className="text-gray-700">
                274 Agmashenebeli Alley, Tbilisi 0159, Georgia.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Phone</h3>
              <p className="text-gray-700">+995 555188888</p>
            </div>

            <div>
              <h3 className="text-lg font-medium">Email</h3>
              <p className="text-gray-700">info@lussoluxurycar.com</p>
            </div>

            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[#013220] hover:scale-110 transition">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-[#013220] hover:scale-110 transition">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer logoUrl={logoUrl} />
    </div>
  );
};

export default ContactPage;
