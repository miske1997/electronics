import { useNavigate, useParams } from 'react-router-dom';
import ArticleGrid from '../../components/ArticleGrid/ArticleGrid';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import "./BrowsePage.css"
import { Breadcrumb, Button, Stack } from 'react-bootstrap';
import CustomToggle from '../../components/CustomToggle/CustomeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '../../store/slices/generalSlice';
import { fetchGeneralData } from '../../store/effects/generalDataEffects';
import { useEffect, useState } from 'react';
import { filterByNameAsc, filterByNameDesc, filterByPopularity, filterByPriceAsc, filterByPriceDesc, selectArticles, selectCategory, selectFilters } from '../../store/slices/categorySlice';
import { fetchCategory, fetchCategoryArticlesById, fetchFiltersForCategory } from '../../store/effects/categoryEffects';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import { setArticle } from '../../store/slices/articleSlice';
import { selectArticlesInCart } from '../../store/slices/cartSlice';
import TablePagination from '../../components/TablePagination/TablePagination';
import FilterSideBar from '../../components/FilterSideBar/FilterSideBar';
import FilterChips from '../../components/FilterChips/FilterChips';
import GridStyleSelect from '../../components/Helpers/GridStyleSelect/GridStyleSelect';
import ArticleList from '../../components/ArticleList/ArticleList';

const filterMap = [
    filterByNameAsc,
    filterByNameDesc,
    filterByPopularity,
    filterByPriceAsc,
    filterByPriceDesc,
]

function BrowsePage() {
    const [showFilters, setShowFilters] = useState(false)
    const [gridDisplayType, setGridDisplayType] = useState("grid")
    const categories = useSelector(selectCategories)
    const filters = useSelector(selectFilters)
    const articlesList = useSelector(selectArticles)
    const articlesInCart = useSelector(selectArticlesInCart)
    const category = useSelector(selectCategory)

    const dispatch = useDispatch()

    let { categoryId } = useParams("categoryId");
    const currentPage = new URL(window.location).searchParams.get("page") ?? 1
    const pageSize = 8

    let navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGeneralData())
        dispatch(fetchCategory(categoryId))
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
            <Breadcrumb className='bread-crumbs'>
                <Breadcrumb.Item>Pocetna</Breadcrumb.Item>
                <Breadcrumb.Item>Merni Instrumenti</Breadcrumb.Item>
                <Breadcrumb.Item>Digitalni multimeri</Breadcrumb.Item>
            </Breadcrumb>
            <div className='name-container'>
                <div className='category-name'>
                    {category.name}
                </div>
                <div style={{flexGrow: '1'}}></div>
                <Stack style={{alignItems: "center"}} gap={1}  direction='horizontal'>
                    <p>Sortiranje prema:</p>
                    <CustomToggle onValueChanged={OnFilterSelect}></CustomToggle>
                </Stack>
                <GridStyleSelect displayType={gridDisplayType} setDisplayType={setGridDisplayType}></GridStyleSelect>
            </div>
            <div className='articles-grid-controlls'>
                {/* <div className='controlles'>
                    <Button onClick={() => setShowFilters(show => !show)}>Filters</Button>
                    <div style={{flexGrow: '1'}}></div>
                    <CustomToggle onValueChanged={OnFilterSelect}></CustomToggle>
                </div> */}
                {showFilters === true ? (<div className='filters-con'>
                    {RenderFilters()}
                </div>) : ""}
            </div>
            <div className='grid-container'>
                <FilterSideBar filters={filters}></FilterSideBar>
                <div style={{width: "100%"}}>
                    <FilterChips></FilterChips>
                    {gridDisplayType === "grid" ?
                    <ArticleGrid articlesInCart={articlesInCart} onArticleClick={OnArticleClick} articleList={articlesList.slice((currentPage - 1) * pageSize, Math.min(articlesList.length, (currentPage - 1) * pageSize + pageSize))}></ArticleGrid>
                    :
                    <ArticleList articlesInCart={articlesInCart} onArticleClick={OnArticleClick} articleList={articlesList.slice((currentPage - 1) * pageSize, Math.min(articlesList.length, (currentPage - 1) * pageSize + pageSize))}></ArticleList>
                    }
                </div>
            </div>
            <TablePagination currentPage={currentPage} numOfPages={Math.ceil(articlesList.length / pageSize)}></TablePagination>
        </main>
    );
}

export default BrowsePage;