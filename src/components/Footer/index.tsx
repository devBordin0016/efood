import logo from '../../assets/images/logo.svg'
import instagram from '../../assets/images/Instagram.svg'
import meta from '../../assets/images/Meta.svg'
import x from '../../assets/images/X.svg'
import {
  Logo,
  Footer as FooterStyle,
  List,
  ListItem,
  Copyrights
} from './syles'
const Footer = () => (
  <FooterStyle>
    <Logo src={logo} alt="efood" />
    <List>
      <ListItem>
        <img src={instagram} alt="" />
      </ListItem>
      <ListItem>
        <img src={meta} alt="" />
      </ListItem>
      <ListItem>
        <img src={x} alt="" />
      </ListItem>
    </List>
    <Copyrights>
      A efood é uma plataforma para divulgação de estabelecimentos, a
      responsabilidade pela entrega, qualidade dos produtos é toda do
      estabelecimento contratado.
    </Copyrights>
  </FooterStyle>
)

export default Footer
