// 'use client';

// import { useState, useEffect } from 'react';
import '../Styles/index.css';
import '../Styles/App.css'

import { IoIosArrowUp } from 'react-icons/io';
import Header from '@/Global-Components/Header/Header';
import Footer from '@/Global-Components/Footer/Footer';
import Shopvia from '@/UI/Components/ShopViaBanner/Shopvia';
import Loader from '@/UI/Components/Loader/Loader'; // Adjust path if needed
// import WarrantyModal from '../components/WarrantyModal'; // Adjust path if needed
// import DynamicMetaTags from '../components/Helmet'; // Adjust path if needed
// import { useSEOContext } from '@/context/SEOcontext/SEOcontext'; // Adjust path if needed
// import { useGlobalContext } from '@/context/GlobalContext/globalContext'; // Adjust path if needed
import { ProductProvider } from '@/context/productsContext/productContext';
import { CartProvider } from '@/context/cartContext/cartContext';
import { NavigationProvider } from '@/context/BreadCrumbContext/NavigationContext';
import { OrderProvivder } from '@/context/orderContext/orderContext';
import { SingleProductProvider } from '@/context/singleProductContext/singleProductContext';
import { AddCartProvider } from '@/context/AddToCart/addToCart';
import { MyOrdersProvider } from '@/context/orderContext/ordersContext';
import { VariationProvider } from '@/context/BreadCrumbContext/variationsContext';
import { LPContentProvider } from '@/context/LPContentContext/LPContentContext';
import { WishListProvider } from '@/context/wishListContext/wishListContext';
import { ProductPageProvider } from '@/context/ProductPageContext/productPageContext';
import { SEOctxProvider } from '@/context/SEOcontext/SEOcontext';
import { GlobalContextProvider } from '@/context/GlobalContext/globalContext';
import { ActiveSalePageProvider } from '@/context/ActiveSalePageContext/ActiveSalePageContext';
import { BlogsProvider } from '@/context/BlogsContext/blogsContext';
import { UserDashboardCtxProvider } from '@/context/userDashboardContext/userDashboard';
import { ProductArchiveProvider } from '@/context/ActiveSalePageContext/productArchiveContext';
import { AppointmentProvider } from '@/context/AppointmentContext/AppointmentContext';


import { ToastContainer, Zoom } from 'react-toastify';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Styles/App.css'; // Global styles for the entire app
import '../Styles/index.css' // Global styles for the entire app


export const metadata = {
  title: 'Default Layout Title',
  description: 'Default Layout Description',
};


export default function RootLayout({ children }) {
  // const { title, description, image } = useSEOContext();
  // const { mainLoader, isWarrantyModalOpen } = useGlobalContext();
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   if(typeof window !== 'undefined') {
  //     const handleScroll = () => {
  //       if (window.scrollY > 300) {
  //         setIsVisible(true);
  //       } else {
  //         setIsVisible(false);
  //       }
  //     };
  
  //     window.addEventListener('scroll', handleScroll);
  //     return () => window.removeEventListener('scroll', handleScroll);
  //   }
  // }, []);

  // const handleClickTop = () => {
  //   if(typeof window !== 'undefined') {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   }
  // };

  return (
    <html lang="en">
      <body>

        <UserDashboardCtxProvider>
          <SEOctxProvider>
            <CartProvider>
              <GlobalContextProvider>
                <BlogsProvider>
                  <ActiveSalePageProvider>
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


                                            <ToastContainer
                                              style={{ zIndex: 99999 }}
                                              position="top-center"
                                              transition={Zoom}
                                              autoClose={1000}
                                            />
                                            <Header />
                                            <Shopvia />
                                            <main>{children}</main>
                                            <Footer />
                                            {/* <button
                                              onClick={handleClickTop}
                                              className={`scroll-to-top-button ${isVisible ? 'show-scrollTop' : ''}`}
                                            >
                                              <IoIosArrowUp size={30} className="lead-to-top-btn" />
                                            </button> */}
                                            {/* <DynamicMetaTags title={title} description={description} image={image} /> */}
                                            {/* {mainLoader && <Loader />} */}
                                            {/* {isWarrantyModalOpen && <WarrantyModal />} */}

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
                  </ActiveSalePageProvider>
                </BlogsProvider>
              </GlobalContextProvider>
            </CartProvider>
          </SEOctxProvider>
        </UserDashboardCtxProvider>
      </body>
    </html>
  );
}
