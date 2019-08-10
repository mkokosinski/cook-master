import React, { useEffect } from "react"
import SearchInput from "../SearchInput/SearchInput"
import "./HomePage.scss"
import JumboCard, { CardType } from "../Cards/Card"
// import Image from "../image"
import Bg from "../../images/bg-img.png"
import { graphql, useStaticQuery } from "gatsby"

const dummyContent = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quae esse quas tempora mollitia ut laborum dolorum atque quaerat. Consequatur atque doloribus blanditiis animi velit soluta laborum cupiditate veniam, libero dolor unde minus, obcaecati mollitia repellendus placeat asperiores odit voluptatum eligendi molestiae ullam error natus voluptate tempora. Similique dolores, tenetur in ipsa labore aliquid! Impedit, inventore? Omnis aspernatur, voluptas, tenetur quaerat sed aliquam consequ.`

const Home = () => {
  return (
    <div className="home">
      <div className="home-bg">
        <img src={Bg} alt="" />
      </div>
      <div className="card seach-dialog">
        <form action="">
          <label htmlFor="seachInput">Wpisz co Cię interesuje:</label>
          <SearchInput />
        </form>
      </div>
      <div className="news">
        <JumboCard
          content={dummyContent}
          img={`https://dummyimage.com/300x300.png`}
          link="Test"
          title="Najnowsza porada"
          type={CardType.jumbo}
        />
        <JumboCard
          content={dummyContent}
          img={`https://dummyimage.com/300x300.png`}
          link="Test"
          title="Najnowszy przepis"
          type={CardType.min}
        />
      </div>
    </div>
  )
}

export default Home
