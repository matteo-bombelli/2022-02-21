import { Company } from "../sharedTypes/Company";
import { CompanyRow } from "./CompanyRow";
import { Pagination } from "./Pagination";
import styles from "./CompaniesTable.module.scss"

interface Props {
    companies:Company[],
    pages?:number,
    page?:number,
    goToPage?:(page:number)=>void    
}

export const CompaniesTable = ({
    companies,
    pages = 0,
    page = 0,
    goToPage
}:Props) => (
    <div className={styles.CompaniesTable}>
        <CompanyRow
            name={<>Name</>}
            logo={(<>Logo</>)}
            specialities={(<>Specialities</>)}
            city={(<> City </>)}
            className={styles.topRow}
        />
        {companies.map((company) => (
            <CompanyRow
                key={company.id}
                name={<span>{company.companyName}</span>}
                logo={<span
                    className={styles.logo}
                    style={{ backgroundImage: `url(${company.logo})` }}
                />}
                specialities={<span>{
                    company.specialities
                        .map(el => (
                            <span
                                className={styles.speciality__tag}
                                key={el.id}
                            >
                                {el.localizedName}
                            </span>))
                }</span>
                }
                city={<span>{company.city}</span>}
            />
        ))}
        {pages > 0 && goToPage && (
            <Pagination page={page} pages={pages} goToPage={goToPage} />
        )}
    </div>
)