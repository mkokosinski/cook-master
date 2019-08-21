import React, { useState, useEffect } from 'react'
import './Tips.scss'
import Card, { CardType } from '../Cards/Card';
import SearchInput from '../SearchInput/SearchInput';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from '../Loader/BallLoader'



const dummyContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum laboriosam dolorem quod laborum rerum eum repellendus ratione sapiente, rem ea.'

const Porady = () => {
    const [tips, setTips] = useState([])
    const [cards, setCards] = useState([])
    const [lastId, setLastId] = useState(0)
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
        
        return () => {
        };
    }, [])

    const loadMore = () => {
        const newCards = cards;
        if (tips.some(card => card.id > lastId)) {
            newCards.push(tips[lastId]);
            setLastId(lastId + 1);
        }
        else {
            setHasMore(false);
        }

        setCards(newCards);

    }

    return (
        <div className="tips-page">
            <SearchInput />
            {/* <div className="grid"> */}
            <InfiniteScroll
                className='grid'
                loadMore={loadMore}
                hasMore={hasMore}
                initialLoad={true}
                threshold={50}
                loader={<Loader />}
            >
                {
                    cards.map((card) => (
                        <Card
                            type={card.type}
                            img={card.img}
                            content={card.content}
                            title={card.title}
                            key={card.id} />
                    ))
                }
            </InfiniteScroll>



            {/* </div> */}
        </div>
    );
}

export default Porady;