import ArticleListItem from "../ArticleListItem/ArticleListItem";
import "./ArticleList.css"
function ArticleList({articlesInCart = [], onArticleClick = () => {}, articleList = []}) {

    function RenderListItems(){
        return articleList.map(article => {
            return (
                <ArticleListItem onClick={onArticleClick} article={article}></ArticleListItem>
            )
        })
    }

    return ( 
        <div className="article-list">
            {RenderListItems()}
        </div>
     );
}

export default ArticleList;