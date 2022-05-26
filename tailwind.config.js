module.exports = {
  content: [
    "./pages/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      "primary": "#F8FAFC",
      "secondary": "#0D0C2D",
      "accent": "#6366F1",
      "neutral": "#C4C4C4",
      "base": "#09090B",
      "info": "#6366F1",
      "success": "#78FF9E",
      "warning": "#FAED7A",
      "error": "#FF7575",
      "gray": "#9CA3AF",
      "darkGray": "#1d1d29",
      "orange": "#f2a900",
    },
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {        
          "primary": "#F8FAFC",
          "secondary": "#0D0C2D",
          "accent": "#6366F1",
          "neutral": "#C4C4C4",
          "base-100": "#09090B",
          "info": "#6366F1",
          "success": "#78FF9E",
          "warning": "#FAED7A",                  
          "error": "#FF7575",
          "gray": "#9CA3AF",
          "darkGray": "#1d1d29",  
          "orange": "#f2a900",
        },
        },
      ],
    },
  plugins: [
    require("daisyui")
  ],
}
