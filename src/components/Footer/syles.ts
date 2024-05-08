import { styled } from 'styled-components'
import { cores } from '../../styles'

export const Footer = styled.footer`
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: ${cores.bgFooter};
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const Logo = styled.img`
  width: 125px;
`

export const List = styled.ul`
  margin-top: 32px;
  margin-bottom: 80px;
  display: flex;
  list-style: none;
`

export const ListItem = styled.li`
  margin-right: 8px;
`

export const Copyrights = styled.p`
  max-width: 480px;
  font-size: 10px;
`
