import React from 'react'

const App = ({ Component, pageProps }) => {
  return (
    
    <>
      <Component {...pageProps} />  {/* Renders the page content */}
    </>
  )
}

export default App