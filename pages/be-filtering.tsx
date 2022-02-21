import type { NextPage } from "next"
import Head from "next/head"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Company, Speciality } from "../sharedTypes/Company";
import { getCompanies } from "../api/company";
import { getSpecialities } from "../api/specialities";
import { CompanyRow } from "../components/CompanyRow";
import styles from '../styles/Home.module.css'
import { getCompaniesFiltered } from "../api/getCompanyFiltered";
import { Pagination } from "../components/Pagination"


const Home: NextPage = () => {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [specialities, setSpecialities] = useState<Speciality[]>([]);
	const [page, setPage] = useState<number>(0);
	const [pages, setPages] = useState<number>(0);

	const onChangeSearchTerm = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newSearchterm = event.target?.value || "";
		setSearchTerm(newSearchterm)
	}, [])

	const onSelectedFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const filterValue = !!(event.target?.checked);
		const filterId = event.target.id;
		if (filterValue) {
			setFilters(filters => {
				return Array.from(new Set([...filters, filterId]))
			})
		} else {
			setFilters(filters => {
				return filters.filter(el => el != filterId);
			})
		}
	}, [])

	const callBackend = useCallback(()=>{
		(async ()=>{
			const {companies, pagination} = await getCompaniesFiltered({filters, searchTerm, page});
			setCompanies(companies)
			setPages(pagination.pages);
		})()
	}, [filters, searchTerm, page])

	useEffect(()=>{
		callBackend();
	}, [callBackend])

	useEffect(() => {
		(async () => {
			const specs = await getSpecialities();
			setSpecialities(specs);
		})()
	}, []);

	const goToPage = useCallback((page:number)=>{
		setPage(page);
	}, [])

	return (
		<div className={styles.container}>
			<Head>
				<title>Test App</title>
				<meta name="description" content="Search and filter for companies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
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
				<div>
					<CompanyRow  
						name={<>Name</>} 
						logo={(<>Logo</>)} 
						specialities={(<>Specialities</>)} 
						city={(<> City </>)} 
						className={styles.onlyDesktop}
					/>
					{companies.map((company) => (
						<CompanyRow 
							key={company.id}
							name={<span>{company.companyName}</span>}
							logo={<span
								className={styles.logo}  
								style={{backgroundImage:`url(${company.logo})`}}
							/>}
							specialities={<span>{
								company.specialities
									.map(el=>(
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
					{pages>0 && (
						<Pagination page={page} pages={pages} goToPage={goToPage} />
					)}
				</div>
			</div>
		</div>
	)
}

export default Home
