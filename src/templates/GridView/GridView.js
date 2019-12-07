import React, { useState } from "react"
import InfiniteScroll from "react-infinite-scroller"

import Loader from "../../components/Loader/BallLoader"
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import SearchInput from "../../components/SearchInput/SearchInput"

import styles from './GridView.module.scss'


const GridView = ({ location, CardComponent, items, slug}) => {
  const [cards, setCards] = useState([])
  const [limit, setLimit] = useState(5)
  const [hasMore, setHasMore] = useState(true)
  const span = 5

  const loadMore = () => {
    let { edges, totalCount } = items;
    edges = [...edges, ...edges, ...edges, ...edges, ...edges, ...edges, ...edges]

    totalCount = 48

    if (limit <= totalCount + span) {
      setCards([...cards, ...edges.slice(limit - span, limit)])
      setLimit(limit + span)
    } else {
      setHasMore(false)
    }
  }
  return (
    <div className={styles.gridViewPage}>
      <BreadCrumb pathname={location.pathname} />
      <div className={styles.searchInput}>
        <SearchInput />
      </div>
      <InfiniteScroll
        className={styles.grid}
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={true}
        threshold={400}
        loader={<Loader />}
      >
        {cards.map(({ node: card }, index) => (
          <div className={styles.gridItem}>
            <CardComponent
              img={card.image}
              content={card.desc}
              title={card.name}
              key={index + card.id}
              link={`/${slug}/${card.name}`}
            />
          </div>
        ))}
      </InfiniteScroll>

      {/* </div> */}
    </div>
 
 )
}

export default GridView
