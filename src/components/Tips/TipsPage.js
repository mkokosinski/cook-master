import React, { useState, useEffect } from "react"
import "./Tips.scss"
import Card, { CardType } from "../Cards/Card"
import SearchInput from "../SearchInput/SearchInput"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../Loader/BallLoader"
import { getTips } from "../../services/api"

// const dummyContent =
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum laboriosam dolorem quod laborum rerum eum repellendus ratione sapiente, rem ea."

// const dummyCards = [
//   {
//     id: 1,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 2,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.min,
//   },
//   {
//     id: 3,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.min,
//   },
//   {
//     id: 4,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 5,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 6,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 7,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 8,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 9,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 10,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 11,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 12,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
//   {
//     id: 13,
//     img: "http://fakeimg.pl/200x200?font=lobster",
//     title: "ELO ELO",
//     content: dummyContent,
//     type: CardType.twoSide,
//   },
// ]

const tipsPageCardsSkeleton = [CardType.twoSide, CardType.min, CardType.min]
const Porady = () => {
  const [tips, setTips] = useState([])
  const [cards, setCards] = useState([])
  const [lastId, setLastId] = useState(0)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    try {
      getTips().then(res => {
        setTips(res)
      })
    } catch (error) {
      console.log(error)
    }
    // setTips(dummyCards)
  }, [])

  const loadMore = () => {
    const newCards = cards
    if (tips.some(card => card.id > lastId)) {
      newCards.push(tips[lastId])
      setLastId(lastId + 1)
    } else {
      setHasMore(false)
    }
    setCards(newCards)
  }

  const getCardType = index => {
    const { length } = tipsPageCardsSkeleton
    if (index < length) {
      return tipsPageCardsSkeleton[index]
    } else {
      return CardType.twoSide
    }
  }

  return (
    <div className="tips-page">
      <SearchInput />
      {/* <div className="grid"> */}

      <InfiniteScroll
        className="grid"
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={true}
        threshold={200}
        loader={<Loader />}
      >
        {tips.map((tip, index) => (
          <Card
            type={getCardType(index)}
            img={tip.img}
            content={tip.content}
            title={tip.title}
            key={index}
          />
        ))}
      </InfiniteScroll>

      {/* </div> */}
    </div>
  )
}

export default Porady
