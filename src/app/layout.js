
import ClientLayout from "@/Global-Components/ClientLayout/ClientLayout";

// import '../Styles/index.css';
// import '../Styles/App.css'

// import Header from '@/Global-Components/Header/Header';
// import Footer from '@/Global-Components/Footer/Footer';
// import Shopvia from '@/UI/Components/ShopViaBanner/Shopvia';
// import { ProductProvider } from '@/context/productsContext/productContext';
// import { CartProvider } from '@/context/cartContext/cartContext';
// import { NavigationProvider } from '@/context/BreadCrumbContext/NavigationContext';
// import { OrderProvivder } from '@/context/orderContext/orderContext';
// import { SingleProductProvider } from '@/context/singleProductContext/singleProductContext';
// import { AddCartProvider } from '@/context/AddToCart/addToCart';
// import { MyOrdersProvider } from '@/context/orderContext/ordersContext';
// import { VariationProvider } from '@/context/BreadCrumbContext/variationsContext';
// import { LPContentProvider } from '@/context/LPContentContext/LPContentContext';
// import { WishListProvider } from '@/context/wishListContext/wishListContext';
// import { ProductPageProvider } from '@/context/ProductPageContext/productPageContext';
// import { SEOctxProvider } from '@/context/SEOcontext/SEOcontext';
// import { GlobalContextProvider } from '@/context/GlobalContext/globalContext';
// import { ActiveSalePageProvider } from '@/context/ActiveSalePageContext/ActiveSalePageContext';
// import { BlogsProvider } from '@/context/BlogsContext/blogsContext';
// import { UserDashboardCtxProvider } from '@/context/userDashboardContext/userDashboard';
// import { ProductArchiveProvider } from '@/context/ActiveSalePageContext/productArchiveContext';
// import { AppointmentProvider } from '@/context/AppointmentContext/AppointmentContext';
// import Home from '@/chatbot-components/Home/Home';


// import { ToastContainer, Zoom } from 'react-toastify';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import '../Styles/App.css'; // Global styles for the entire app
// import '../Styles/index.css' // Global styles for the entire app
// import { usePathname } from 'next/navigation';
// import { ChatOpenProvider } from '@/context/ChatbotContext/ChatbotContext';
// import { LastCallProvider } from '@/context/LastCallContext/LastCallContext';


// ✅ Default metadata for all pages (used by Next.js to inject SEO)
// export const metadata = {
//   title: {
//     default: "My Furniture Store",
//     template: "%s | My Furniture Store", // e.g., "Sofa Set | My Furniture Store"
//   },
//   description: "Shop stylish and affordable furniture for every room in your home.",
//   keywords: ["furniture", "sofa", "bed", "dining", "interior", "home decor"],
//   robots: {
//     index: true,
//     follow: true,
//   },
//   openGraph: {
//     title: "My Furniture Store",
//     description: "Affordable and modern furniture for your home.",
//     url: "https://yourdomain.com", // change to your real domain
//     siteName: "My Furniture Store",
//     images: [
//       {
//         url: "/og-default.jpg", // make sure this image is in /public folder
//         width: 1200,
//         height: 630,
//         alt: "Preview of My Furniture Store",
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },
// };

export const metadata = {
  title: "Luxurious Furniture, Rugs and Mattress Online Store Philadelphia - Furniture Mecca",
  description:
    "Furniture Mecca has the largest selection of quality furniture, rugs, mattresses and other stylish furnishings items for great prices.",
  openGraph: {
    title: "Luxurious Furniture, Rugs and Mattress Online Store Philadelphia - Furniture Mecca",
    description:
      "Furniture Mecca has the largest selection of quality furniture, rugs, mattresses and other stylish furnishings items for great prices.",
    url: "https://fmnext.myfurnituremecca.com/home-furniture-mecca",
    siteName: "Furniture Mecca",
    images: [
      {
        url: "https://fmnext.myfurnituremecca.com/images/og-image.jpg", // Replace with actual image
        width: 1200,
        height: 630,
        alt: "Furniture Mecca",
      },
    ],
    type: "website",
  },
};



export default function RootLayout({ children }) {

  // const pathname = usePathname();
  // const hideHeaderFooter = pathname.startsWith('/order-confirmation');
  // const hideOnlyFooter = pathname.startsWith('/order-confirmation') || pathname.startsWith('/check-out');
  // const hideChatOption = pathname.startsWith('/cart') || pathname.startsWith('/check-out');

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

        {/* Add this line below for favicon */}
        <link rel="icon" href="/favicon.png" sizes="any" />

        {/* ✅ Mobile meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>

        <ClientLayout>{children}</ClientLayout>

        {/* <UserDashboardCtxProvider>
          <SEOctxProvider>
            <CartProvider>
              <GlobalContextProvider>
                <BlogsProvider>
                  <ActiveSalePageProvider>
                    <LastCallProvider>
                      <WishListProvider>
                        <LPContentProvider>
                          <OrderProvivder>
                            <NavigationProvider>
                              <AddCartProvider>
                                <ProductProvider>
                                  <AppointmentProvider>
                                    <SingleProductProvider>
                                      <MyOrdersProvider>
                                        <ProductPageProvider>
                                          <VariationProvider>
                                            <ProductArchiveProvider>
                                              <ChatOpenProvider>


                                                <ToastContainer
                                                  style={{ zIndex: 99999 }}
                                                  position="top-center"
                                                  transition={Zoom}
                                                  autoClose={1000}
                                                />
                                                {!hideHeaderFooter && <Header />}
                                                {!hideHeaderFooter && <Shopvia />} */}
                                                {/* <main>{children}</main> */}
                                                {/* {!hideOnlyFooter && <Footer />}

                                                {!hideChatOption && <Home />}
                                              </ChatOpenProvider>
                                            </ProductArchiveProvider>
                                          </VariationProvider>
                                        </ProductPageProvider>
                                      </MyOrdersProvider>
                                    </SingleProductProvider>
                                  </AppointmentProvider>
                                </ProductProvider>
                              </AddCartProvider>
                            </NavigationProvider>
                          </OrderProvivder>
                        </LPContentProvider>
                      </WishListProvider>
                    </LastCallProvider>
                  </ActiveSalePageProvider>
                </BlogsProvider>
              </GlobalContextProvider>
            </CartProvider>
          </SEOctxProvider>
        </UserDashboardCtxProvider> */}
      </body>
    </html>
  );
}
