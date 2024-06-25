import { useNavigate, useParams } from 'react-router-dom';
import ArticleGrid from '../../components/ArticleGrid/ArticleGrid';
import CategorySelect from '../../components/CategorySelect/CategorySelect';
import "./BrowsePage.css"
import { Stack } from 'react-bootstrap';
import CustomToggle from '../../components/CustomToggle/CustomeToggle';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategories } from '../../store/slices/generalSlice';
import { fetchGeneralData } from '../../store/effects/generalDataEffects';
import { useEffect } from 'react';
import { filterByNameAsc, filterByNameDesc, filterByPopularity, filterByPriceAsc, filterByPriceDesc, selectArticles, selectFilters } from '../../store/slices/categorySlice';
import { fetchCategoryArticlesById, fetchFiltersForCategory } from '../../store/effects/categoryEffects';
import FilterSelect from '../../components/FilterSelect/FilterSelect';
import { setArticle } from '../../store/slices/articleSlice';
import { selectArticlesInCart } from '../../store/slices/cartSlice';

const filterMap = [
    filterByNameAsc,
    filterByNameDesc,
    filterByPopularity,
    filterByPriceAsc,
    filterByPriceDesc,
]

function BrowsePage() {
    const categories = useSelector(selectCategories)
    const filters = useSelector(selectFilters)
    const articlesList = useSelector(selectArticles)
    const articlesInCart = useSelector(selectArticlesInCart)

    const dispatch = useDispatch()

    let { categoryId } = useParams("categoryId");
    let navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchGeneralData())
        dispatch(fetchCategoryArticlesById(categoryId))
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
            return (<FilterSelect  options={filter.options} paramName={filter.name}></FilterSelect>)
        })
    }


    return (
        <main className='browse-page-main'>
            <div className='categorys'>
                <CategorySelect onCategoryClick={OnCategoryClick} activeCategory={categoryId} categories={categories}></CategorySelect>
            </div>
            <div className='articles-grid-controlls'>
                <Stack direction="horizontal" style={{ paddingInline: '10%' }} gap={3}>
                    <div className='p-2 ms-auto'>
                        {RenderFilters()}
                        <CustomToggle onValueChanged={OnFilterSelect}></CustomToggle>
                    </div>
                </Stack>

                <ArticleGrid articlesInCart={articlesInCart} onArticleClick={OnArticleClick} articleList={articlesList}></ArticleGrid>
            </div>
        </main>
    );
}

export default BrowsePage;