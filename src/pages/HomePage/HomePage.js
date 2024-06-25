
import { useEffect } from 'react';
import './HomePage.css'
import { Carousel, Stack } from 'react-bootstrap';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import ScrollingImage from '../../components/ParalaxImage/ScrollingImage';


function HomePage() {

    return (
        <main style={{height: "80rem"}}>
            <ScrollingImage firstParagraphFirstRow='Anika ' secondParagraph='panika' picPositionPixels={-20} backgroundImageSource='https://www.nextpcb.com/uploads/images/202303/20/1679303211-0734-cavktR.jpg'></ScrollingImage>
        </main>
    );
}

export default HomePage;