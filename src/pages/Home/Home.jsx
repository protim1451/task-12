import AboutUs from "./AboutUs/AboutUs";
import Banner from "./Banner/Banner";
import CallToAction from "./CallToAction/CallToAction";
import Category from "./Category/Category";
import HowItWorks from "./HowItWorks/HowItWorks";
import SuccessStories from "./SuccessStories/SuccessStories";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Category></Category>
            <CallToAction></CallToAction>
            <AboutUs></AboutUs>
            <SuccessStories></SuccessStories>
            <HowItWorks></HowItWorks>
        </div>
    );
};

export default Home;