import pizza from '../../assets/images/pizza.svg'
import { ProductCard } from './styles'

const Product = () => (
  <ProductCard>
    <img src={pizza} alt="Pizza Marguerita" />
    <h2>Pizza Marguerita</h2>
    <p>
      A clássica Marguerita: molho de tomate suculento, mussarela derretida,
      manjericão fresco e um toque de azeite. Sabor e simplicidade!
    </p>
    <button>Adicione ao carrinho</button>
  </ProductCard>
)

export default Product
