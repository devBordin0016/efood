import styled from 'styled-components'
import { cores } from '../../styles'

export const ProductCard = styled.div`
  width: 320px;
  padding: 8px;
  background-color: ${cores.fontColor};
  display: flex;
  flex-direction: column;

  h2 {
    padding: 8px 0;
    font-weight: 900;
    font-size: 16px;
    color: ${cores.bgColor};
  }

  p {
    font-size: 14px;
    padding-bottom: 8px;
    color: ${cores.bgColor};
  }

  button {
    color: ${cores.fontColor};
    background-color: ${cores.bgColor};
    border: none;
    font-weight: 700;
    padding-top: 4px;
    padding-bottom: 4px;
  }
`
