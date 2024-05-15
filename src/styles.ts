import styled, { createGlobalStyle } from 'styled-components'

export const cores = {
  fontColor: '#E66767',
  bgColor: '#FFF8F2',
  branco: '#fff',
  bgFooter: '#FFEBD9'
}

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding:0;
      box-sizing: border-box;
      font-family: Roboto, sans-serif;
    }

    body {
      background-color: ${cores.bgColor};
      color: ${cores.fontColor};
    }
`
export default GlobalStyle

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`
