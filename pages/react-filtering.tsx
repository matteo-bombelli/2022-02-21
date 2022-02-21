import type { NextPage } from "next"
import Head from "next/head"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Company, Speciality } from "../sharedTypes/Company";
import { getCompanies } from "../api/company";
import { getSpecialities } from "../api/specialities";
import { filterCompaniesByData } from "../utils/filterCompanies";
import { CompaniesTable } from "../components/CompaniesTable";
import { Filters } from "../components/Filters";

const Home: NextPage = () => {
	const [companies, setCompanies] = useState<Company[]>([]);
	const [filters, setFilters] = useState<string[]>([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [specialities, setSpecialities] = useState<Speciality[]>([]);

	useEffect(() => {
		(async () => {
			const comp = await getCompanies();
			setCompanies(comp);
			const specs = await getSpecialities();
			setSpecialities(specs);
		})()
	}, []);

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

	const filteredCompanies = useMemo(()=>{
		return filterCompaniesByData(companies, filters, searchTerm)
	}, [companies, filters, searchTerm]) ;

	return (
		<div>
			<Head>
				<title>Test App - React Filetring</title>
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
					companies={filteredCompanies}
				/>
			</div>
		</div>
	)
}

export default Home
