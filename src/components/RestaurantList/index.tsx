import RestaurantModel from '../../models/Restaurant'
import Restaurant from '../Restaurant'
import { List } from './syles'

export type Props = {
  restaurants: RestaurantModel[]
}

const RestaurantList = ({ restaurants }: Props) => (
  <List>
    {restaurants.map((restaurant) => (
      <Restaurant
        key={restaurant.id}
        name={restaurant.name}
        rating={restaurant.rating}
        description={restaurant.description}
        infos={restaurant.infos}
        image={restaurant.image}
      />
    ))}
  </List>
)

export default RestaurantList
