import React from "react";

// components
import SideSelection from "../components/SideSelection";
import Screen from "../components/Screen";

// stylesheet
import Styles from './Home.module.css';

const Home: React.FC = () => {
    return (
        <>
            <div className={Styles._home_wrapper}>
                <div className={Styles._selections}>
                    <SideSelection />
                </div>
                <div className={Styles._screen}>
                    <Screen />
                </div>
            </div>
        </>
    )
}

export default Home