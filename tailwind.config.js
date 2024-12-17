/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    animation: {
      'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      'bounce-slow': 'bounce 3s infinite',
      blob: "blob 7s infinite",
      float: "float 20s infinite",
      rays: "rays 10s infinite",
      'float-icon': 'float-icon 6s ease-in-out infinite',
      'slide-right': 'slide-right 8s linear infinite',
      'float-bg': 'float-bg 15s ease-in-out infinite',
    },
    keyframes: {
      pulse: {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
      },
      blob: {
        "0%": {
          transform: "translate(0px, 0px) scale(1)",
        },
        "33%": {
          transform: "translate(30px, -50px) scale(1.1)",
        },
        "66%": {
          transform: "translate(-20px, 20px) scale(0.9)",
        },
        "100%": {
          transform: "translate(0px, 0px) scale(1)",
        },
      },
      float: {
        "0%": {
          transform: "perspective(1000px) rotateX(45deg) rotateZ(-45deg) translateY(0)",
        },
        "50%": {
          transform: "perspective(1000px) rotateX(45deg) rotateZ(-45deg) translateY(-20px)",
        },
        "100%": {
          transform: "perspective(1000px) rotateX(45deg) rotateZ(-45deg) translateY(0)",
        },
      },
      rays: {
        "0%": {
          opacity: "0.5",
          transform: "perspective(1000px) rotateX(45deg) translateY(0%)",
        },
        "50%": {
          opacity: "0.8",
          transform: "perspective(1000px) rotateX(45deg) translateY(-50%)",
        },
        "100%": {
          opacity: "0.5",
          transform: "perspective(1000px) rotateX(45deg) translateY(-100%)",
        },
      },
      'float-icon': {
        '0%, 100%': {
          transform: 'translateY(0) rotate(0deg)',
        },
        '25%': {
          transform: 'translateY(-15px) rotate(5deg)',
        },
        '75%': {
          transform: 'translateY(15px) rotate(-5deg)',
        },
      },
      'slide-right': {
        '0%': {
          transform: 'translateX(-100%)',
          opacity: '0',
        },
        '50%': {
          opacity: '1',
        },
        '100%': {
          transform: 'translateX(100%)',
          opacity: '0',
        },
      },
      'float-bg': {
        '0%, 100%': {
          transform: 'translateY(0) rotate(0deg)',
        },
        '50%': {
          transform: 'translateY(-20px) rotate(5deg)',
        },
      },
    },
    boxShadow: {
      'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },
    colors: {
      'primary': {
        50: '#f0f9ff',
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
    },
    blur: {
      '3xl': '64px',
    },
    backdropBlur: {
      xs: '2px',
    },
    perspective: {
      '1000': '1000px',
      '2000': '2000px',
    },
    transformStyle: {
      '3d': 'preserve-3d',
    },
    rotate: {
      '30': '30deg',
      '-30': '-30deg',
    },
  },
};
export const plugins = [];