import { Cabecalho, Logo, Slogan } from './styles'

import logo from '../../assets/images/logo.svg'
import bgImg from '../../assets/images/Vector.svg'

const Header = () => (
  <Cabecalho style={{ backgroundImage: `url(${bgImg})` }}>
    <Logo src={logo} alt="efood" />
    <Slogan>Viva experiências gastronômicas no conforto da sua casa</Slogan>
  </Cabecalho>
)

export default Header
