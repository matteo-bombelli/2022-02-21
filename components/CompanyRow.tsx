import styles from "./CompanyRow.module.scss";

interface Props {
	name: React.ReactElement,
	logo: React.ReactElement,
	specialities: React.ReactElement,
	city: React.ReactElement,
    className?: string
}

export const CompanyRow = ({
	name,
	logo,
	specialities,
	city,
    className
}:Props)=>(
	<div className={`${styles.companyRow} ${className||""}`}>
		<div className={styles.companyRow__name}>
			{name}
		</div>
		<div className={styles.companyRow__logo}>
			{logo}
		</div>
		<div className={styles.companyRow__specialities}>
			{specialities}
		</div>
		<div className={styles.companyRow__city}>
			{city}
		</div>
	</div>
)