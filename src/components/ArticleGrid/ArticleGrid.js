import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleGrid.css'

function ArticleGrid({articlesInCart = [], onArticleClick = () => {}, articleList = []}) {
    // xs={{span: 8}} sm={{span: 8}} md={{span: 4}} xl={{span: 2}}

    function IsArticleInCart(article){
        for (const articleInCart of articlesInCart) {
            if (articleInCart.id === article.id){
                return true
            }
        }
        return false
    }

    function RenderRow(articleSubList) {
        return articleSubList.map(article => {
            return (
                <Col  xs={{span: 8}} sm={{span: 8}} lg={{span: 4}}  xl={{span: 3}}>
                    <ArticleCard articleInCart={IsArticleInCart(article)} onClick={onArticleClick} article={article} imageSrc={article.imageSrc} ></ArticleCard>
                </Col>
            )
        })
    }

    function RenderArticles(){
        const itemsInRow = 4
        const listClone = [...articleList] 
        const rows = []
        while(listClone.length > 0){
            if(listClone.length < itemsInRow){
                rows.push((<Row  className="top-buffer justify-content-center" > {RenderRow(listClone.splice(0, listClone.length))} </Row>))
            }
            else{
                rows.push((<Row   className="top-buffer justify-content-center" > {RenderRow(listClone.splice(0, itemsInRow))} </Row>))
            }
        }
        return rows
    }

    return (
        <Container fluid>
            {RenderArticles()}
        </Container>
    );
}

export default ArticleGrid;