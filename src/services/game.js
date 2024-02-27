import appleUrl from '../assets/img/apple.png'
import fruitUrl from '../assets/img/fruit.png'
import strawberryUrl from '../assets/img/strawberry.png'
import candyUrl from '../assets/img/candy.png'
import cupcakeUrl from '../assets/img/cupcake.png'
import chocolateAppleUrl from '../assets/img/chocolate-apple.png'

export function getFoods() {
    return [
        { src: fruitUrl, name: 'fruit', isEaten: false },
        { src: strawberryUrl, name: 'strawberry', isEaten: false },
        { src: candyUrl, name: 'candy', isEaten: false },
        { src: appleUrl, name: 'apple', isEaten: false },
        { src: cupcakeUrl, name: 'cupcake', isEaten: false },
        { src: chocolateAppleUrl, name: 'chocolate-apple', isEaten: false },
    ]
}