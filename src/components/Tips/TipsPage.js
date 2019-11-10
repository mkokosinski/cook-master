import React, { useState, useEffect } from "react"
import { graphql, useStaticQuery } from "gatsby"

import "./Tips.scss"
import Card, { CardType } from "../Cards/Card"
import SearchInput from "../SearchInput/SearchInput"
import InfiniteScroll from "react-infinite-scroller"
import Loader from "../Loader/BallLoader"
import BreadCrumb from "../BreadCrumb/BreadCrumb"

const tipsPageCardsSkeleton = [CardType.twoSide, CardType.min, CardType.min]
const Porady = ({ location }) => {
  const [cards, setCards] = useState([])
  const [limit, setLimit] = useState(5)
  const [hasMore, setHasMore] = useState(true)
  const span = 5

  const tipsQuery = useStaticQuery(graphql`
    {
      allTip {
        totalCount
        edges {
          node {
            desc
            image {
              childImageSharp {
                fluid(quality: 100, maxWidth:1600, maxHeight:700, srcSetBreakpoints: [600]) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            name
            id
          }
        }
      }
    }
  `)

  const loadMore = () => {
    let { edges: tips, totalCount } = tipsQuery.allTip
    tips = [...tips, ...tips, ...tips, ...tips]
    totalCount = 24

    if (limit <= totalCount + span) {
      setCards([...cards, ...tips.slice(limit - span, limit)])
      console.log("Cards", cards)
      setLimit(limit + span)
    } else {
      setHasMore(false)
    }
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
      <BreadCrumb pathname={location.pathname} />
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
        {cards.map(({ node: tip }, index) => (
          <Card
            type={getCardType(index)}
            img={tip.image}
            content={tip.desc}
            title={tip.name}
            key={index + tip.id}
            link={"/Tips/" + tip.name}
          />
        ))}
      </InfiniteScroll>

      {/* </div> */}
    </div>
  )
}

export default Porady
