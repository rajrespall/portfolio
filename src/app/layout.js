import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#eeebe2",
};

export const metadata = {
  title: "Rajesh Respall",
  description: "Portfolio of Rajesh Respall — Systems Architecture, Full-Stack Engineering & Interface Design.",
  keywords: ["Rajesh Respall", "portfolio", "software engineer", "full stack", "next.js", "react", "9009"],
  authors: [{ name: "Rajesh Respall" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="9009" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("portfolio_theme")||"9009";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
