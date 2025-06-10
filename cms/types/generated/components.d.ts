import type { Schema, Attribute } from '@strapi/strapi';

export interface HeroSectionHerosection extends Schema.Component {
  collectionName: 'components_hero_section_herosections';
  info: {
    displayName: 'Herosection';
    icon: 'briefcase';
  };
  attributes: {
    lussoTitle: Attribute.String;
    lussoDesc: Attribute.String;
    ButtonTxt: Attribute.String;
    landingVideo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    landingFailedImage: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface FeaturedCarFeaturedCar extends Schema.Component {
  collectionName: 'components_featured_car_featured_cars';
  info: {
    displayName: 'featuredCar';
    icon: 'crown';
  };
  attributes: {
    carTitle: Attribute.String;
    carDesc: Attribute.String;
    carPhoto: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
  };
}

export interface BasicinfoBasicInfo extends Schema.Component {
  collectionName: 'components_basicinfo_basic_infos';
  info: {
    displayName: 'basicInfo';
    icon: 'alien';
    description: '';
  };
  attributes: {
    companyName: Attribute.String;
    companyLogo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    img: Attribute.Media<'images'>;
    stefstef: Attribute.String;
  };
}

export interface AboutUsSectionAboutUsSection extends Schema.Component {
  collectionName: 'components_about_us_section_about_us_sections';
  info: {
    displayName: 'aboutUsSection';
    icon: 'bulletList';
    description: '';
  };
  attributes: {
    aboutUsTitle: Attribute.String;
    aboutUsDesc: Attribute.Text;
    buttonText: Attribute.String;
    carImage: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    aboutUsBackground: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'hero-section.herosection': HeroSectionHerosection;
      'featured-car.featured-car': FeaturedCarFeaturedCar;
      'basicinfo.basic-info': BasicinfoBasicInfo;
      'about-us-section.about-us-section': AboutUsSectionAboutUsSection;
    }
  }
}
