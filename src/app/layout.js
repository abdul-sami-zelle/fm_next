import ClientLayout from "@/Global-Components/ClientLayout/ClientLayout";
import Script from "next/script";

export const metadata = {
  title: "Luxurious Furniture, Rugs and Mattress Online Store Philadelphia - Furniture Mecca",
  description:
    "Furniture Mecca has the largest selection of quality furniture, rugs, mattresses and other stylish furnishings items for great prices.",
  openGraph: {
    title: "Luxurious Furniture, Rugs and Mattress Online Store Philadelphia - Furniture Mecca",
    description:
      "Furniture Mecca has the largest selection of quality furniture, rugs, mattresses and other stylish furnishings items for great prices.",
    url: "https://myfurnituremecca.com/home-furniture-mecca",
    siteName: "Furniture Mecca",
    images: [
      {
        url: "https://myfurnituremecca.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Furniture Mecca",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" sizes="any" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </head>
      <body>
        {/* ✅ Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GQL4WY726N"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GQL4WY726N', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
