import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiAuMainSectionAuMainSection extends Schema.SingleType {
  collectionName: 'au_main_sections';
  info: {
    description: '';
    displayName: 'AU_mainSection';
    pluralName: 'au-main-sections';
    singularName: 'au-main-section';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Call_to_action: Attribute.Component<'lc-au-call-to-action.lc-au-call-to-action'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::au-main-section.au-main-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    LC_AU_JourneySection: Attribute.Component<'au-journey.au-journey'>;
    LC_AU_Values: Attribute.Component<'au-values.au-values', true>;
    LC_AU_WhyChooseUs: Attribute.Component<
      'au-why-choose-us.au-why-choose-us',
      true
    >;
    LC_mainSection: Attribute.Component<'about-us-main.about-us-main'>;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::au-main-section.au-main-section',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    WCU_IMG: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ApiCarCar extends Schema.CollectionType {
  collectionName: 'cars';
  info: {
    description: '';
    displayName: 'car';
    pluralName: 'cars';
    singularName: 'car';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundVid: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Brand: Attribute.Enumeration<
      [
        'Audi',
        'BMW',
        'Ferrari',
        'Lamborghini',
        'Mercedes-Benz',
        'Porsche',
        'Rolls-Royce'
      ]
    >;
    brandLogo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Car_fuel_economy_range: Attribute.Text;
    carDesc: Attribute.Text;
    carEngineDesc: Attribute.Text;
    carName: Attribute.String;
    carOverviewP1: Attribute.Text;
    carOverviewP2: Attribute.Text;
    carPic: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    carPrice: Attribute.String;
    carSliderImg: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    carSold: Attribute.Boolean;
    carSpecifications: Attribute.Component<'car-specifications.car-specifications'>;
    carSuspension: Attribute.Text;
    checkingIMGs: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::car.car', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    display: Attribute.Boolean;
    mainImg: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    publishedAt: Attribute.DateTime;
    slider_car_imgs: Attribute.Component<
      'slider-car-imgs.slider-car-imgs',
      true
    >;
    slug: Attribute.UID<'api::car.car', 'carName'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::car.car', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiContactUsPageContactUsPage extends Schema.SingleType {
  collectionName: 'contact_us_pages';
  info: {
    description: '';
    displayName: 'contactUsPage';
    pluralName: 'contact-us-pages';
    singularName: 'contact-us-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    AddressDesc: Attribute.Text;
    addressTitle: Attribute.String;
    contactUsDesc: Attribute.String;
    contactUsTitle: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contact-us-page.contact-us-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    emailDesc: Attribute.String;
    emailTitle: Attribute.String;
    phoneDesc: Attribute.Text;
    phoneTitle: Attribute.String;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::contact-us-page.contact-us-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFeaturedCarFeaturedCar extends Schema.CollectionType {
  collectionName: 'featured_cars';
  info: {
    description: '';
    displayName: 'featuredCar';
    pluralName: 'featured-cars';
    singularName: 'featured-car';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    carDesc: Attribute.Text;
    carPhoto: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    carTitle: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::featured-car.featured-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    featuredCar: Attribute.Component<'featured-car.featured-car', true>;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::featured-car.featured-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFixtureFixture extends Schema.CollectionType {
  collectionName: 'fixtures';
  info: {
    description: '';
    displayName: 'Fixture';
    pluralName: 'fixtures';
    singularName: 'fixture';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    awayTeam: Attribute.String & Attribute.Required;
    competition: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::fixture.fixture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date: Attribute.DateTime & Attribute.Required;
    external_id: Attribute.String;
    homeTeam: Attribute.String & Attribute.Required;
    location: Attribute.String;
    publishedAt: Attribute.DateTime;
    source: Attribute.Enumeration<['manual', 'api']>;
    tv_broadcast: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::fixture.fixture',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    venue: Attribute.String;
  };
}

export interface ApiGalleryGallery extends Schema.CollectionType {
  collectionName: 'galleries';
  info: {
    description: '';
    displayName: 'Gallery';
    pluralName: 'galleries';
    singularName: 'gallery';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    category: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gallery.gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Blocks;
    imageUrl: Attribute.String & Attribute.Required;
    publishedAt: Attribute.DateTime;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::gallery.gallery',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLuxuryCarLuxuryCar extends Schema.CollectionType {
  collectionName: 'luxury_cars';
  info: {
    description: '';
    displayName: 'luxuryCar';
    pluralName: 'luxury-cars';
    singularName: 'luxury-car';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutUsMain: Attribute.Component<'about-us-main.about-us-main', true>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::luxury-car.luxury-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::luxury-car.luxury-car',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLuxuryHeroLuxuryHero extends Schema.CollectionType {
  collectionName: 'luxury_heroes';
  info: {
    description: '';
    displayName: 'Luxury Hero';
    pluralName: 'luxury-heroes';
    singularName: 'luxury-hero';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    aboutUsSection: Attribute.Component<'about-us-section.about-us-section'>;
    basicinfo: Attribute.Component<'basicinfo.basic-info'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::luxury-hero.luxury-hero',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    cta: Attribute.String;
    featuredCar: Attribute.Component<'featured-car.featured-car', true>;
    heroSection: Attribute.Component<'hero-section.herosection'>;
    locationSection: Attribute.Component<'location-section.location-section'>;
    ourCars: Attribute.Component<'our-cars.contact-us'>;
    publishedAt: Attribute.DateTime;
    subtitle: Attribute.String;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::luxury-hero.luxury-hero',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    videoPoster: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    videoUrl: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ApiNewNew extends Schema.CollectionType {
  collectionName: 'news';
  info: {
    description: '';
    displayName: 'News';
    pluralName: 'news';
    singularName: 'new';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Attribute.String;
    category: Attribute.String;
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::new.new', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    date: Attribute.DateTime;
    featured: Attribute.Boolean;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    publishedAt: Attribute.DateTime;
    readTime: Attribute.String;
    summary: Attribute.Text;
    tags: Attribute.String;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::new.new', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    views: Attribute.Integer;
  };
}

export interface ApiProjectProject extends Schema.CollectionType {
  collectionName: 'projects';
  info: {
    displayName: 'Project';
    pluralName: 'projects';
    singularName: 'project';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Blocks & Attribute.Required;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    order: Attribute.Integer & Attribute.Required;
    publishedAt: Attribute.DateTime;
    slug: Attribute.String & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::project.project',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiResultResult extends Schema.CollectionType {
  collectionName: 'results';
  info: {
    displayName: 'Result';
    pluralName: 'results';
    singularName: 'result';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    away_score: Attribute.Integer & Attribute.Required;
    away_team: Attribute.String & Attribute.Required;
    competition: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::result.result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date: Attribute.DateTime & Attribute.Required;
    external_id: Attribute.String;
    highlights_url: Attribute.String;
    home_score: Attribute.Integer & Attribute.Required;
    home_team: Attribute.String & Attribute.Required;
    match_report_url: Attribute.String;
    publishedAt: Attribute.DateTime;
    source: Attribute.Enumeration<['manuel', 'api']>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::result.result',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    venue: Attribute.String;
  };
}

export interface ApiShowroomPageShowroomPage extends Schema.SingleType {
  collectionName: 'showroom_pages';
  info: {
    description: '';
    displayName: 'showroomPage';
    pluralName: 'showroom-pages';
    singularName: 'showroom-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::showroom-page.showroom-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    descriptionIMG: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    discoverP1: Attribute.String;
    discoverp2: Attribute.String;
    discoverTitle: Attribute.String;
    GalleryImageCard: Attribute.Component<
      'gallery-image-card.gallery-image-card',
      true
    >;
    mainDesc: Attribute.Text;
    mainTitle: Attribute.String;
    publishedAt: Attribute.DateTime;
    SR_mainCards: Attribute.Component<'sr-main-cards.sr-main-cards', true>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::showroom-page.showroom-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSliderSlider extends Schema.CollectionType {
  collectionName: 'sliders';
  info: {
    description: '';
    displayName: 'Slider';
    pluralName: 'sliders';
    singularName: 'slider';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::slider.slider',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    link: Attribute.String;
    order: Attribute.Integer;
    publishedAt: Attribute.DateTime;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::slider.slider',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSponsorSponsor extends Schema.CollectionType {
  collectionName: 'sponsors';
  info: {
    description: '';
    displayName: 'Sponsor';
    pluralName: 'sponsors';
    singularName: 'sponsor';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    active: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sponsor.sponsor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Attribute.String & Attribute.Required;
    order: Attribute.Integer;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::sponsor.sponsor',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    website: Attribute.String;
  };
}

export interface ApiTableTable extends Schema.CollectionType {
  collectionName: 'tables';
  info: {
    displayName: 'Table';
    pluralName: 'tables';
    singularName: 'table';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    club_logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    club_name: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::table.table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    draw: Attribute.Integer;
    goal_difference: Attribute.Integer;
    goals_against: Attribute.Integer;
    goals_for: Attribute.Integer;
    loss: Attribute.Integer;
    next_match_link: Attribute.String;
    next_match_name: Attribute.String;
    played: Attribute.Integer;
    points: Attribute.Integer;
    position: Attribute.Integer;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::table.table',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    win: Attribute.Integer;
  };
}

export interface ApiTeamMemberTeamMember extends Schema.CollectionType {
  collectionName: 'team_members';
  info: {
    description: '';
    displayName: 'Team Member';
    pluralName: 'team-members';
    singularName: 'team-member';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bio: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::team-member.team-member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Attribute.String;
    number: Attribute.Integer;
    position: Attribute.String;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::team-member.team-member',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTesttestTesttest extends Schema.CollectionType {
  collectionName: 'testtests';
  info: {
    displayName: 'Testtest';
    pluralName: 'testtests';
    singularName: 'testtest';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::testtest.testtest',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    test: Attribute.String;
    testt: Attribute.Integer;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::testtest.testtest',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::au-main-section.au-main-section': ApiAuMainSectionAuMainSection;
      'api::car.car': ApiCarCar;
      'api::contact-us-page.contact-us-page': ApiContactUsPageContactUsPage;
      'api::featured-car.featured-car': ApiFeaturedCarFeaturedCar;
      'api::fixture.fixture': ApiFixtureFixture;
      'api::gallery.gallery': ApiGalleryGallery;
      'api::luxury-car.luxury-car': ApiLuxuryCarLuxuryCar;
      'api::luxury-hero.luxury-hero': ApiLuxuryHeroLuxuryHero;
      'api::new.new': ApiNewNew;
      'api::project.project': ApiProjectProject;
      'api::result.result': ApiResultResult;
      'api::showroom-page.showroom-page': ApiShowroomPageShowroomPage;
      'api::slider.slider': ApiSliderSlider;
      'api::sponsor.sponsor': ApiSponsorSponsor;
      'api::table.table': ApiTableTable;
      'api::team-member.team-member': ApiTeamMemberTeamMember;
      'api::testtest.testtest': ApiTesttestTesttest;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
