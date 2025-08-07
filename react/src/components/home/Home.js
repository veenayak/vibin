import HomeSection1 from "./HomeSection1";
import HomeSection2 from "./HomeSection2";
import HomeSection3 from "./HomeSection3";
import HomeSection4 from "./HomeSection4";
import MetaTags from 'react-meta-tags';

const Home = () => {
    return (
        <>
            <MetaTags>
                <title>Vibin: Listen to music share &amp; collaborate with friends on app for free</title>
                <meta name="description" content="" />
            </MetaTags>

            <HomeSection1/>
            <HomeSection2/>
            <HomeSection3/>
            <HomeSection4/>
        </>
    );
  }
  
export default Home;
  