import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import './Main.css'
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";

const Main = () =>{
    return(
        <main>
            <Promo/>
            <AboutProject/>
            <Techs/>
            <AboutMe/>
            <Portfolio/>
        </main>
    )
}

export default Main