import logo from '../../assets/images/logo.svg'
import instagram from '../../assets/images/Instagram.svg'
import meta from '../../assets/images/Meta.svg'
import x from '../../assets/images/X.svg'
import * as S from './styles'
const Footer = () => (
  <S.FooterStyle>
    <S.Logo src={logo} alt="efood" />
    <S.List>
      <S.ListItem>
        <img src={instagram} alt="" />
      </S.ListItem>
      <S.ListItem>
        <img src={meta} alt="" />
      </S.ListItem>
      <S.ListItem>
        <img src={x} alt="" />
      </S.ListItem>
    </S.List>
    <S.Copyrights>
      A efood e uma plataforma para divulgacao de estabelecimentos, a
      responsabilidade pela entrega, qualidade dos produtos e toda do
      estabelecimento contratado.
    </S.Copyrights>
  </S.FooterStyle>
)

export default Footer
