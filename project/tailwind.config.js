/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ana renkler - Anasayfada kullanılan merkezi renkler
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)', // Koyu yeşil (#0e4e25)
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
          dark: '#0d3d1f', // Daha koyu yeşil - hover efektleri için
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)', // Açık yeşil (#4CAF50)
          light: 'rgb(var(--color-secondary-light) / <alpha-value>)',
        },
        accent: 'rgb(var(--color-accent) / <alpha-value>)', // Yeşil (#4CAF50) - Ana sayfayla uyumlu
        
        // Durum renkleri
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        
        // Metin renkleri - Anasayfada kullanılan renkler
        text: 'rgb(var(--color-text) / <alpha-value>)', // text-gray-700 için
        heading: 'rgb(var(--color-heading) / <alpha-value>)', // text-gray-900 için
        
        // UI eşleştirmeleri - Tailwind'in varsayılan gray renkleri yerine merkezi renk sistemi
        gray: {
          600: 'rgb(var(--color-text) / <alpha-value>)', // Paragraf metni
          700: 'rgb(var(--color-text) / <alpha-value>)', // Nav linklerinde
          800: 'rgb(var(--color-text) / <alpha-value>)', // Ana metin rengi
          900: 'rgb(var(--color-heading) / <alpha-value>)', // Başlıklar için
        },
        
        // Arka plan renkleri
        bg: {
          light: 'rgb(var(--color-bg-light) / <alpha-value>)', // bg-white eşdeğeri
          gray: 'rgb(var(--color-bg-gray) / <alpha-value>)', // bg-gray-100 eşdeğeri
          dark: 'rgb(var(--color-bg-dark) / <alpha-value>)',
        },
        
        // Lusso uyumluluk için geriye dönük haritalama (eski projelerde kullanılan renkleri desteklemek için)
        lusso: {
          primary: 'rgb(var(--color-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
          accent: 'rgb(var(--color-accent) / <alpha-value>)',
          
          warning: 'rgb(var(--color-warning) / <alpha-value>)',
          error: 'rgb(var(--color-error) / <alpha-value>)',
          success: 'rgb(var(--color-success) / <alpha-value>)',
          info: 'rgb(var(--color-info) / <alpha-value>)',
          
          text: 'rgb(var(--color-text) / <alpha-value>)',
          heading: 'rgb(var(--color-heading) / <alpha-value>)',
          
          bg: {
            light: 'rgb(var(--color-bg-light) / <alpha-value>)',
            gray: 'rgb(var(--color-bg-gray) / <alpha-value>)',
            dark: 'rgb(var(--color-bg-dark) / <alpha-value>)',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
