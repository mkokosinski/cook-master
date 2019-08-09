import React from "react"
import { Link } from "gatsby"
import SearchInput from "../components/SearchInput/SearchInput"
import "./HomePage.scss"
import JumboCard, { CardType } from "../components/Cards/Card"

import Image from "../components/image"
import SEO from "../components/seo"

import Bg from "../images/bg-img.png"
import Layout from "../components/layout";

const dummyContent = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim quae esse quas tempora mollitia ut laborum dolorum atque quaerat. Consequatur atque doloribus blanditiis animi velit soluta laborum cupiditate veniam, libero dolor unde minus, obcaecati mollitia repellendus placeat asperiores odit voluptatum eligendi molestiae ullam error natus voluptate tempora. Similique dolores, tenetur in ipsa labore aliquid! Impedit, inventore? Omnis aspernatur, voluptas, tenetur quaerat sed aliquam consequ.`

const Home = () => {
  return (
    <Layout>
      <SEO title="Home" />
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
    </Layout>
  )
}

export default Home
