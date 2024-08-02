import { ListGroup } from "react-bootstrap";
import "./CategorySelectHover.css"
function CategorySelectHover({onCategoryClick = () => {}, categories = [] }) {

    function RenderCategoriy(category) {
        if (!category.categoryNames)
            return ""
        return category.categoryNames.map((categoryName, index) => {
            return (<ListGroup.Item onClick={()=> onCategoryClick(category.categorys[index])}>
                {categoryName}
            </ListGroup.Item>)
        })
    }

    function RenderCategories() {
        return categories.map(categorie => {
            return (
                <ListGroup.Item className="category-main-name">
                    {categorie.name}
                    <div className="hover-drawer">
                        {RenderCategoriy(categorie)}    
                    </div>    
                </ListGroup.Item>
            )
        })
    }

    return (
        <div className="category-select-hover">
            <ListGroup>
                {RenderCategories()}
            </ListGroup>
        </div>
    );
}

export default CategorySelectHover;