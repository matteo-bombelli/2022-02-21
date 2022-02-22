import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Company, Speciality } from "../sharedTypes/Company";
import { getSpecialities } from "../api/specialities";
import { getCompaniesFiltered } from "../api/getCompanyFiltered";
import { CompaniesTable } from "../components/CompaniesTable";
import { Filters } from "../components/Filters";

const Home: NextPage = () => {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [specialities, setSpecialities] = useState<Speciality[]>([]);
	const [page, setPage] = useState<number>(0);
	const [pages, setPages] = useState<number>(0);

	const onChangeSearchTerm = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const newSearchterm = event.target?.value || "";
		setPage(0);
		setSearchTerm(newSearchterm)
	}, [])

	const onSelectedFilter = useCallback((event: ChangeEvent<HTMLInputElement>) => {
		const filterValue = !!(event.target?.checked);
		const filterId = event.target.id;
		if (filterValue) {
			setPage(0);
			setFilters(filters => {
				return Array.from(new Set([...filters, filterId]))
			})
		} else {
			setPage(0);
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
		<div>
			<Head>
				<title>Test App - NodeJs Filetring</title>
				<meta name="description" content="Search and filter for companies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<div>
				<Filters
					searchTerm={searchTerm}
					filters={filters}
					onChangeSearchTerm={onChangeSearchTerm}
					onSelectedFilter={onSelectedFilter} 
					specialities={specialities}
				/>
				<CompaniesTable 
					companies={companies}
					page={page}
					pages={pages}
					goToPage={goToPage} 
				/>

			</div>
		</div>
	)
}

export default Home
