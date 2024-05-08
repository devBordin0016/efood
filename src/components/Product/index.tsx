import estrela from '../../assets/images/estrela.svg'

import hsImg from '../../assets/images/prato1.svg'
import { Button, Card, CardHeader, Descricao, Rating } from './styles'

const Product = () => (
  <Card>
    <img src={hsImg} alt="" />
    <div>
      <CardHeader>
        <h3>Hioki Sushi</h3>
        <Rating>
          <h3>4.9</h3>
          <img src={estrela} alt="avaliação" />
        </Rating>
      </CardHeader>
      <Descricao>
        Peça já o melhor da culinária japonesa no conforto da sua casa! Sushis
        frescos, sashimis deliciosos e pratos quentes irresistíveis. Entrega
        rápida, embalagens cuidadosas e qualidade garantida. EDescricaoperimente
        o Japão sem sair do lar com nosso delivery!
      </Descricao>
    </div>
    <Button>Saiba mais</Button>
  </Card>
)

export default Product
