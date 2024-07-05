import { Pagination } from "react-bootstrap";
import "./TablePagination.css"
import { useNavigate } from "react-router";

function TablePagination({display = false, currentPage = 1, numOfPages = 1}) {
    
    const navigate = useNavigate();

    function RenderItems() {
        const start = Math.max(1, currentPage - 2)
        const end = Math.min(currentPage + 2, numOfPages)

        let items = []
        console.log(currentPage);
        for (let pageNum = start; pageNum <= end; pageNum++) {
            items.push((<Pagination.Item onClick={() => AddUrlParam(pageNum)} active={pageNum == currentPage}>{pageNum}</Pagination.Item>))
        }
        return items
    }

    function AddUrlParam(pageNum){
        const url = new URL(window.location);
        url.searchParams.set("page", pageNum);
        navigate(url.search)
    }

    return (
        <div className="table-pagination">

            <Pagination>
                <Pagination.First onClick={() => AddUrlParam(1)}/>
                <Pagination.Prev onClick={() => AddUrlParam(Math.max(1, currentPage - 1))} />
                {RenderItems()}
                <Pagination.Next onClick={() => AddUrlParam(Math.min(numOfPages, currentPage + 1))}/>
                <Pagination.Last onClick={() => AddUrlParam(numOfPages + 1)}/>
            </Pagination>
        </div>
    );
}

export default TablePagination;