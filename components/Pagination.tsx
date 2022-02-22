import style from "./Pagination.module.scss";

interface Props {
    page: number,
    pages: number,
    goToPage: (n:number)=>void
}

export const Pagination = ({page, pages, goToPage}:Props)=>{
    const buttonNumbersList = new Array(5).fill(0)
        .map((_,index)=>page + index - 2)
        .filter(el=>(el >= 0 && el < pages));
    return (
        <div className={style.Pagination}>
            {(buttonNumbersList[0] > 0)&&(
                <button 
                    onClick={()=>goToPage(0)}
                    className={style.Pagination__first}
                    aria-label={"go to first page"}
                >
                    {"<<"}    
                </button>
            )}
            {(buttonNumbersList[0] > 0)&&(
                <button 
                    onClick={()=>goToPage(page - 3)}
                    className={style.Pagination__prev}
                    aria-label={"go to previous list of pages"}
                >
                    {"<"}    
                </button>
            )}
            {buttonNumbersList.map((el)=>(
                <button 
                    onClick={()=>goToPage(el)} 
                    key={el}
                    className={`${style.Pagination__button} ${(page===el)?
                        style.Pagination__selected:
                        ""
                    }`}
                    aria-label={`go to page ${el +1}`}
                >
                    {el + 1}
                </button>
            ))}
            {(page < pages - 3)&&(
                <button 
                    onClick={()=>goToPage(page + 3)}
                    className={style.Pagination__next}
                    aria-label={"go to next list of pages"}
                >
                    {">"}    
                </button>
            )}
            {(page < pages - 3)&&(
                <button 
                    onClick={()=>goToPage(pages - 1)}
                    className={style.Pagination__last}
                    aria-label={"go to last page"}
                >
                    {">>"}    
                </button>
            )}
        </div>
        )
}