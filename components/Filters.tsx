import { ChangeEvent } from "react";
import { Speciality } from "../sharedTypes/Company";
import styles from "./Filters.module.scss";

interface Props {
    onChangeSearchTerm: (event:ChangeEvent<HTMLInputElement>)=>void ;
    searchTerm: string,
    specialities: Speciality[],
    onSelectedFilter: (event:ChangeEvent<HTMLInputElement>)=>void,
    filters: string[]
}

export const Filters = ({
    onChangeSearchTerm,
    searchTerm,
    specialities,
    onSelectedFilter,
    filters
}:Props) => (
    <div className={styles.Filters}>
        <fieldset>
            <label 
                htmlFor="searchTerm"
            >
                Search for companies
            </label>
            <input 
                onChange={onChangeSearchTerm} 
                className={styles.searchtermInput}
                id="searchTerm" 
                value={searchTerm}
            />
        </fieldset>
        <fieldset>
            <legend>Filter by specialities</legend>
            {specialities.map((spec)=>(
                <div 
                    className={styles.speciality} 
                    key={spec.id}
                >
                    <input 
                        type="checkbox" 
                        id={spec.id} 
                        onChange={onSelectedFilter}
                        className={styles.specialityCheck} 
                        checked={filters.includes(spec.id)}
                    />
                    <label
                        htmlFor={spec.id}
                        className={styles.specialityLabel}
                    >
                        {spec.localizedName}
                    </label>
                </div>
            ))}
        </fieldset>
    </div>
)