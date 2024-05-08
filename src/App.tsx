import React from 'react'
import GlobalStyle, { Container } from './styles'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductList from './components/ProductList'

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header />
        <ProductList />
        <Footer />
      </Container>
    </>
  )
}

export default App
