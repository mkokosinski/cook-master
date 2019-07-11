import React, { useState, useEffect } from 'react'
import './Tips.scss'
import Card, { CardType } from '../Cards/Card';
import SearchInput from '../SearchInput/SearchInput';
import InfiniteScroll from 'react-infinite-scroller';

const dummyContent = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum laboriosam dolorem quod laborum rerum eum repellendus ratione sapiente, rem ea.'

const dummyCards = [
    {
        id: 1,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 2,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.min
    },
    {
        id: 3,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.min
    },
    {
        id: 4,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 5,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 6,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 7,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 8,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 9,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 10,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 11,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 12,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    },
    {
        id: 13,
        img: 'http://fakeimg.pl/200x200?font=lobster',
        title: 'ELO ELO',
        content: dummyContent,
        type: CardType.twoSide
    }
]

const Porady = () => {
    const [cards, setCards] = useState([])
    const [lastId, setLastId] = useState(0)
    const [hasMore, setHasMore] = useState(true)
    const loadMore = () => {
        if (dummyCards.some(card => card.id > lastId)) {
            setCards([...cards, dummyCards[lastId]]);
            setLastId(lastId + 1);
        }
        else {
            setHasMore(false);
        }
    }

    return (
        <div className="tips-page">
            <SearchInput />
            {/* <div className="grid"> */}
            <InfiniteScroll
                pageStart={0}
                className='grid'
                loadMore={loadMore}
                hasMore={hasMore}
                initialLoad={true}
                loader={<div className="loader" key={0}>Loading ...</div>}
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