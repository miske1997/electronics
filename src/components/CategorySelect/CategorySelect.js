import { Accordion, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./CategorySelect.css"

function CategorySelect({onCategoryClick = () => {}, categories = [], activeCategory = '' }) {

    function GetActiveCategoryIndex() {
        let index = 0;
        for (const categorie in categories) {
            if (categorie?.categoryNames?.includes(activeCategory))
                return index;
            index++;
        }
        return 0
    }

    function IsCategoryActive(category) {
        return activeCategory === category
    }

    function RenderCategoriy(category) {
        return category.categoryNames.map((categoryName, index) => {
            return (<ListGroup.Item onClick={()=> onCategoryClick(category.categorys[index])} active={IsCategoryActive(categoryName)}>
                {/* <Link className="category-link" to={`/browse/${categoryItem}`}>
                </Link> */}
                {categoryName}
            </ListGroup.Item>)
        })
    }

    function RenderAllCategories() {
        return categories.map((category, index) => {
            return (
                <Accordion.Item eventKey={index}>
                    <Accordion.Header>{category.name}</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            {RenderCategoriy(category)}
                        </ListGroup>
                    </Accordion.Body>
                </Accordion.Item>
            )
        })
    }

    return (
        <Accordion className="category-select" defaultActiveKey={GetActiveCategoryIndex()}>
            {RenderAllCategories()}
        </Accordion>
    );
}

export default CategorySelect;