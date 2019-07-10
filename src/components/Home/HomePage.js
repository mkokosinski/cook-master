import React from 'react'
import SearchInput from '../SearchInput/SearchInput'
import './HomePage.scss'

const Home = () => {
    return (
        <>
            <div className="home-bg">
                <div className="card seach-dialog">
                    <form action="">
                        <label htmlFor="seachInput">
                            Wpisz co Cię interesuje:
                        </label>
                        <SearchInput />
                    </form>
                </div>
            </div>

        </>
    );
}

export default Home;