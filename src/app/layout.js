import "./globals.css";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090a0d",
};

export const metadata = {
  title: "Rajesh Respall",
  description: "Portfolio of Rajesh Respall — Systems Architecture, Full-Stack Engineering & Interface Design.",
  keywords: ["Rajesh Respall", "portfolio", "software engineer", "full stack", "next.js", "react"],
  authors: [{ name: "Rajesh Respall" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
