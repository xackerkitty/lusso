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

        // --- NEW CUSTOM COLORS FOR SHOWROOM PAGE ---
        'dark-green-main': '#1A431A', // Example specific dark green for showroom bg
        'dark-green-accent': '#2C5F2D', // Example slightly lighter dark green for showroom section
        'button-green-primary': '#4CAF50', // Example button green
        'button-green-hover': '#45A049', // Example hover green
        // --- END NEW CUSTOM COLORS ---

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
          // It's good you have gray-900 defined, which corresponds to your heading color.
          // For consistency with the ShowroomPage.tsx, I'll assume your gray-100 and gray-300
          // are standard Tailwind grays or mapped via CSS variables. If they are
          // custom, you'd add them here with their hex/rgb values.
          // For now, I'll assume the ShowroomPage uses the standard Tailwind gray-100/300/900 classes directly
          // which will pick up your `gray: { 900: ... }` if no other definition exists.
          // If you want your `grayTextLight` and `grayTextMedium` from ShowroomPage.tsx
          // to map to your CSS variables, you'd define them like:
          // 100: 'rgb(var(--color-gray-100) / <alpha-value>)', // Example
          // 300: 'rgb(var(--color-gray-300) / <alpha-value>)', // Example
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
        // Assuming 'font-body' and 'font-heading' from ShowroomPage.tsx are mapped here
        // If not, you need to add them:
        body: ['Inter', 'sans-serif'], // Example: If 'font-body' should be Inter
        heading: ['Playfair Display', 'serif'], // Example: If 'font-heading' should be Playfair Display
      },
      // --- ADD KEYFRAMES AND ANIMATION HERE ---
      keyframes: {
        'fade-in-up-custom': {
          '0%': {
            opacity: '0',
            transform: 'translateY(2rem)', // Starts 2rem down
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)', // Ends at original position
          },
        },
      },
      animation: {
        'fade-in-up-custom': 'fade-in-up-custom 1s ease-out forwards',
        // 'forwards' ensures the animation stays at its end state
      },
      // --- ADD BACKGROUND IMAGE FOR VIGNETTE HERE ---
      backgroundImage: {
        'radial-gradient-vignette': 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0.8) 100%)',
      },
      // --- END KEYFRAMES AND ANIMATION ---
    },
  },
  plugins: [],
};