import styled from 'styled-components'
import { cores } from '../../styles'

export const Card = styled.div`
  border: 1px solid ${cores.fontColor};
  max-width: 472px;
  width: 100%;
  font-size: 14px;
  overflow: hidden;
`

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px;
  font-size: 18px;
`

export const Rating = styled.div`
  display: flex;

  img {
    margin-left: 8px;
  }
`
export const Descricao = styled.p`
  margin: 16px 8px 0px 8px;
`

export const Button = styled.button`
  margin: 16px 8px 8px;
  padding: 4px 6px;
  border: none;
  color: ${cores.branco};
  background-color: ${cores.fontColor};
`
