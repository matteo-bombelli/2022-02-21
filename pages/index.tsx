import type { NextPage } from "next"
import Head from "next/head"
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { Company, Speciality } from "../sharedTypes/Company";
import { getCompanies } from "../api/company";
import { getSpecialities } from "../api/specialities";
import { CompanyRow } from "../components/CompanyRow";
import { filterCompaniesByData } from "../utils/filterCompanies";
import styles from '../styles/Home.module.css'


const Home: NextPage = () => {
	

	return (
		<div className={styles.container}>
			<Head>
				<title>Test App</title>
				<meta name="description" content="Search and filter for companies" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
		</div>
	)
}

export default Home
