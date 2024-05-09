import estrela from '../../assets/images/estrela.svg'

import Tag from '../Tag'
import { ButtonLink, Card, CardHeader, CardInfos, Infos } from './styles'

type Props = {
  name: string
  rating: string
  description: string
  infos: string[]
  image: string
}

const Restaurant = ({ name, rating, description, infos, image }: Props) => (
  <Card>
    <img src={image} alt={image} />
    <CardInfos>
      <CardHeader>
        <h3>{name}</h3>
        <div>
          <h3>{rating}</h3>
          <img src={estrela} alt="avaliação" />
        </div>
      </CardHeader>
      <Infos>
        {infos.map((info) => (
          <Tag key={info}>{info}</Tag>
        ))}
      </Infos>
      <p>{description}</p>
      <ButtonLink to={'/profile'}>Saiba mais</ButtonLink>
    </CardInfos>
  </Card>
)

export default Restaurant
