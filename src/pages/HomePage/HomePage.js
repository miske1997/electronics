import './HomePage.css'
import ScrollingImage from '../../components/ParalaxImage/ScrollingImage';
import Carousel from '../../components/Carousel/Carousel';
import PopularCard from '../../components/PopularCard/PopularCard';


function HomePage() {

    return (
        <main style={{height: "180rem"}}>
            <ScrollingImage firstParagraphFirstRow='Anika ' secondParagraph='panika' picPositionPixels={-20} backgroundImageSource='https://www.nextpcb.com/uploads/images/202303/20/1679303211-0734-cavktR.jpg'></ScrollingImage>
            <div style={{display: "flex",alignItems: "center", flexDirection: "column", width: "100%", justifyContent: "center"}}>
                <h1 style={{marginBlock: "3rem"}}>Popular Articles</h1>
                <Carousel>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                    <PopularCard article={{name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500"}}></PopularCard>
                </Carousel>

            </div>
        </main>
    );
}

export default HomePage;