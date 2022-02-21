import style from "./Pagination.module.css";

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
                >
                    {"<<"}    
                </button>
            )}
            {(buttonNumbersList[0] > 0)&&(
                <button 
                    onClick={()=>goToPage(page - 3)}
                    className={style.Pagination__prev}
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
                >
                    {el + 1}
                </button>
            ))}
            {(page < pages - 3)&&(
                <button 
                    onClick={()=>goToPage(page + 3)}
                    className={style.Pagination__next}
                >
                    {">"}    
                </button>
            )}
            {(page < pages - 3)&&(
                <button 
                    onClick={()=>goToPage(pages - 1)}
                    className={style.Pagination__last}
                >
                    {">>"}    
                </button>
            )}
        </div>
        )
}