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

            {/* mobile note */}
            <div className={Styles.mobile_note}>
                <p>This application is designed for desktop browsers to provide an authentic old-school TV watching experience. Please switch to a desktop device for the best experience.</p>
            </div>
        </>
    )
}

export default Home