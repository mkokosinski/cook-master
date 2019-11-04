import React, { useState, useEffect } from "react"
import {graphql, useStaticQuery} from 'gatsby'

import "./Tips.scss"
import Card, { CardType } from "../Cards/Card"
import SearchInput from "../SearchInput/SearchInput"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../Loader/BallLoader"
import Img from "../../images/cat.jpg"

const tipsPageCardsSkeleton = [CardType.twoSide, CardType.min, CardType.min]
const Porady = () => {
  const [cards, setCards] = useState([])
  const [lastId, setLastId] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const tipsQuery = useStaticQuery(graphql`
  query {
    allTips {
      edges {
        node {
          Desc
          Img
          Title
          id
          Category__NODE
        }
      }
    }
  }
  `)

  const {node:tips} = tipsQuery.allTips.edges;

  const loadMore = () => {
    const newCards = cards
    console.log(tips[0]);
    if (tips.some(card => card.id > lastId)) {
      newCards.push(tips[lastId])
      setLastId(card.id)
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

  const egdes = [...tipsQuery.allTips.edges, ...tipsQuery.allTips.edges, ...tipsQuery.allTips.edges]
  return (
    <div className="tips-page">
      <SearchInput />
      {/* <div className="grid"> */}

      <InfiniteScroll
        className="grid"
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={true}
        threshold={0}
        loader={<Loader />}
      >
        {cards.map((tip, index) => (
          <Card
            type={getCardType(index)}
            img={Img}
            content={tip.node.Desc}
            title={tip.node.Title}
            key={index}
          />
        ))}
      </InfiniteScroll>

      {/* </div> */}
    </div>
  )
}

export default Porady
