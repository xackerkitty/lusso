import type { Attribute, Schema } from '@strapi/strapi';

export interface AboutUsMainAboutUsMain extends Schema.Component {
  collectionName: 'components_about_us_main_about_us_mains';
  info: {
    description: '';
    displayName: 'aboutUsMain';
  };
  attributes: {
    AU_mainBG: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    AU_mainDesc: Attribute.String;
    AU_TitleText: Attribute.String;
    buttonTxt: Attribute.String;
  };
}

export interface AboutUsPageAboutUsPage extends Schema.Component {
  collectionName: 'components_about_us_page_about_us_pages';
  info: {
    description: '';
    displayName: 'aboutUsPage';
  };
  attributes: {
    aboutUsMain: Attribute.Component<'about-us-main.about-us-main'>;
    AU_Journey: Attribute.Component<'au-journey.au-journey'>;
    AU_values: Attribute.Component<'au-values.au-values', true>;
    AU_whyChooseUs: Attribute.Component<'au-why-choose-us.au-why-choose-us'>;
  };
}

export interface AboutUsSectionAboutUsSection extends Schema.Component {
  collectionName: 'components_about_us_section_about_us_sections';
  info: {
    description: '';
    displayName: 'aboutUsSection';
    icon: 'bulletList';
  };
  attributes: {
    aboutUsBackground: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    aboutUsDesc: Attribute.Text;
    aboutUsTitle: Attribute.String;
    buttonText: Attribute.String;
    carImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface AllCarsAllCars extends Schema.Component {
  collectionName: 'components_all_cars_all_cars';
  info: {
    displayName: 'allCars';
  };
  attributes: {};
}

export interface AuJourneyAuJourney extends Schema.Component {
  collectionName: 'components_au_journey_au_journeys';
  info: {
    description: '';
    displayName: 'AU_Journey';
  };
  attributes: {
    AU_journeyBG: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    AU_JourneyDesc: Attribute.String;
    Au_JourneyTitleTxt: Attribute.String;
    journeyDesc2nd: Attribute.Text;
  };
}

export interface AuValuesAuValues extends Schema.Component {
  collectionName: 'components_au_values_au_values';
  info: {
    displayName: 'AU_values';
  };
  attributes: {
    AU_valueDesc: Attribute.String;
    AU_valueImg: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    AU_valueTxt: Attribute.String;
  };
}

export interface AuWhyChooseUsAuWhyChooseUs extends Schema.Component {
  collectionName: 'components_au_why_choose_us_au_why_chooseuses';
  info: {
    displayName: 'AU_whyChooseUs';
  };
  attributes: {
    AU_whyUsTitle: Attribute.String;
    whyUsText: Attribute.String;
  };
}

export interface BasicinfoBasicInfo extends Schema.Component {
  collectionName: 'components_basicinfo_basic_infos';
  info: {
    description: '';
    displayName: 'basicInfo';
    icon: 'alien';
  };
  attributes: {
    companyLogo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    companyName: Attribute.String;
    img: Attribute.Media<'images'>;
    stefstef: Attribute.String;
  };
}

export interface BrandsBrands extends Schema.Component {
  collectionName: 'components_brands_brands';
  info: {
    description: '';
    displayName: 'brands';
  };
  attributes: {
    brandLogo: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    brandName: Attribute.String;
  };
}

export interface CarSpecificationsCarSpecifications extends Schema.Component {
  collectionName: 'components_car_specifications_car_specifications';
  info: {
    displayName: 'carSpecifications';
  };
  attributes: {
    exteriorColor: Attribute.String;
    fuelType: Attribute.String;
    gear: Attribute.String;
    interiorColor: Attribute.String;
    mileage: Attribute.String;
    owners: Attribute.String;
    power: Attribute.String;
    regYear: Attribute.String;
    year: Attribute.String;
  };
}

export interface FeaturedCarFeaturedCar extends Schema.Component {
  collectionName: 'components_featured_car_featured_cars';
  info: {
    description: '';
    displayName: 'featuredCar';
    icon: 'crown';
  };
  attributes: {
    backgroundColor: Attribute.String &
      Attribute.CustomField<'plugin::color-picker.color'>;
    carDesc: Attribute.String;
    carPhoto: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    carTitle: Attribute.String;
  };
}

export interface GalleryImageCardGalleryImageCard extends Schema.Component {
  collectionName: 'components_gallery_image_card_gallery_image_cards';
  info: {
    description: '';
    displayName: 'GalleryImageCard';
  };
  attributes: {
    Description: Attribute.String;
    Image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    spanColumns: Attribute.Integer;
    Title: Attribute.String;
  };
}

export interface HeroSectionHerosection extends Schema.Component {
  collectionName: 'components_hero_section_herosections';
  info: {
    displayName: 'Herosection';
    icon: 'briefcase';
  };
  attributes: {
    ButtonTxt: Attribute.String;
    landingFailedImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    landingVideo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    lussoDesc: Attribute.String;
    lussoTitle: Attribute.String;
  };
}

export interface LcAuCallToActionLcAuCallToAction extends Schema.Component {
  collectionName: 'components_lc_au_call_to_action_lc_au_call_to_actions';
  info: {
    displayName: 'LC_AU_CallToAction';
  };
  attributes: {
    buttonTxt: Attribute.String;
    desc: Attribute.String;
    mainText: Attribute.String;
  };
}

export interface LocationSectionLocationSection extends Schema.Component {
  collectionName: 'components_location_section_location_sections';
  info: {
    description: '';
    displayName: 'locationSection';
  };
  attributes: {
    descLocation: Attribute.Text;
    sectionTitle: Attribute.String;
  };
}

export interface OurCarsContactUs extends Schema.Component {
  collectionName: 'components_contact_us_contactuses';
  info: {
    description: '';
    displayName: 'ourCars';
  };
  attributes: {
    brands: Attribute.Component<'brands.brands', true>;
    ourCarsBtn: Attribute.String;
    ourCarsDesc: Attribute.Text;
    ourCarsTitle: Attribute.String;
  };
}

export interface SliderCarImgsSliderCarImgs extends Schema.Component {
  collectionName: 'components_slider_car_imgs_slider_car_imgs';
  info: {
    displayName: 'slider_car_imgs';
  };
  attributes: {
    slider_img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SrMainCardsSrMainCards extends Schema.Component {
  collectionName: 'components_sr_main_cards_sr_main_cards';
  info: {
    displayName: 'SR_mainCards';
  };
  attributes: {
    Description: Attribute.Text;
    Title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about-us-main.about-us-main': AboutUsMainAboutUsMain;
      'about-us-page.about-us-page': AboutUsPageAboutUsPage;
      'about-us-section.about-us-section': AboutUsSectionAboutUsSection;
      'all-cars.all-cars': AllCarsAllCars;
      'au-journey.au-journey': AuJourneyAuJourney;
      'au-values.au-values': AuValuesAuValues;
      'au-why-choose-us.au-why-choose-us': AuWhyChooseUsAuWhyChooseUs;
      'basicinfo.basic-info': BasicinfoBasicInfo;
      'brands.brands': BrandsBrands;
      'car-specifications.car-specifications': CarSpecificationsCarSpecifications;
      'featured-car.featured-car': FeaturedCarFeaturedCar;
      'gallery-image-card.gallery-image-card': GalleryImageCardGalleryImageCard;
      'hero-section.herosection': HeroSectionHerosection;
      'lc-au-call-to-action.lc-au-call-to-action': LcAuCallToActionLcAuCallToAction;
      'location-section.location-section': LocationSectionLocationSection;
      'our-cars.contact-us': OurCarsContactUs;
      'slider-car-imgs.slider-car-imgs': SliderCarImgsSliderCarImgs;
      'sr-main-cards.sr-main-cards': SrMainCardsSrMainCards;
    }
  }
}
