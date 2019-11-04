import React, { useState, useEffect } from "react"
import "./Tips.scss"
import Card, { CardType } from "../Cards/Card"
import SearchInput from "../SearchInput/SearchInput"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../Loader/BallLoader"
import { getTips } from "../../services/api"
import Img from "../../images/cat.jpg"

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
            img={Img}
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
