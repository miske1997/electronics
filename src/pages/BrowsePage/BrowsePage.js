import { useNavigate, useParams } from 'react-router-dom';
import ArticleGrid from '../../components/ArticleGrid/ArticleGrid';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import "./BrowsePage.css"
import { Button } from 'react-bootstrap';
import CustomToggle from '../../components/CustomToggle/CustomeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '../../store/slices/generalSlice';
import { fetchGeneralData } from '../../store/effects/generalDataEffects';
import { useEffect, useState } from 'react';
import { filterByNameAsc, filterByNameDesc, filterByPopularity, filterByPriceAsc, filterByPriceDesc, selectArticles, selectFilters } from '../../store/slices/categorySlice';
import { fetchCategoryArticlesById, fetchFiltersForCategory } from '../../store/effects/categoryEffects';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import { setArticle } from '../../store/slices/articleSlice';
import { selectArticlesInCart } from '../../store/slices/cartSlice';
import TablePagination from '../../components/TablePagination/TablePagination';

const filterMap = [
    filterByNameAsc,
    filterByNameDesc,
    filterByPopularity,
    filterByPriceAsc,
    filterByPriceDesc,
]

function BrowsePage() {
    const [showFilters, setShowFilters] = useState(false)
    const categories = useSelector(selectCategories)
    const filters = useSelector(selectFilters)
    const articlesList = useSelector(selectArticles)
    const articlesInCart = useSelector(selectArticlesInCart)

    const dispatch = useDispatch()

    let { categoryId } = useParams("categoryId");
    const currentPage = new URL(window.location).searchParams.get("page") ?? 1
    const pageSize = 30

    let navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGeneralData())
        dispatch(fetchCategoryArticlesById(categoryId))
        dispatch(fetchFiltersForCategory(categoryId))
    }, [categoryId]);

    function OnArticleClick(article) {
        setArticle(article)
        navigate("/article/" + categoryId + "/" + article.id ?? 0)
    }

    function OnCategoryClick(categorieRef) {
        dispatch(fetchCategoryArticlesById(categorieRef))
        dispatch(fetchFiltersForCategory(categorieRef))
        navigate("/browse/" + categorieRef ?? '')
    }

    function OnFilterSelect(filter){
        console.log(filter);
        dispatch(filterMap[filter]())
    }

    function RenderFilters(){
        return filters.map(filter => {
            return (<FilterSelect filterName={filter.name}  options={filter.options} paramName={filter.propName}></FilterSelect>)
        })
    }


    return (
        <main className='browse-page-main'>
            {/* <div className='categorys'>
                <CategorySelect onCategoryClick={OnCategoryClick} activeCategory={categoryId} categories={categories}></CategorySelect>
            </div> */}
            <div className='articles-grid-controlls'>
                <div className='controlles'>
                    <Button onClick={() => setShowFilters(show => !show)}>Filters</Button>
                    <div style={{flexGrow: '1'}}></div>
                    <CustomToggle onValueChanged={OnFilterSelect}></CustomToggle>
                </div>
                {showFilters === true ? (<div className='filters-con'>
                    {RenderFilters()}
                </div>) : ""}
                <ArticleGrid articlesInCart={articlesInCart} onArticleClick={OnArticleClick} articleList={articlesList.slice((currentPage - 1) * pageSize, Math.min(articlesList.length, (currentPage - 1) * pageSize + pageSize))}></ArticleGrid>
                <TablePagination currentPage={currentPage} numOfPages={Math.ceil(articlesList.length / pageSize)}></TablePagination>
            </div>
        </main>
    );
}

export default BrowsePage;