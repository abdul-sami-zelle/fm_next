import React from 'react'

const App = ({ Component, pageProps }) => {

  const getLayout = Component.getLayout || ((page) => page)
  return getLayout(<Component {...pageProps} />)
  // return (
    
  //   <>
  //     <Component {...pageProps} />  {/* Renders the page content */}
  //   </>
  // )
}

export default App