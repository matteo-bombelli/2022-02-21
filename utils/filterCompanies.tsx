import { Company } from "../sharedTypes/Company"

export const filterCompaniesByData = (
	companies: Company[],
	filters: string[],
	searchTerm: string
) => companies.filter((el=>{
	if(searchTerm && !(el.companyName.toLowerCase().includes(searchTerm.toLowerCase()))){
		return false;
	}
	if(Array.isArray(filters)){
		for(let filter of filters){
			if(!el.specialities.find(spec=>spec.id === filter)){
				return false;
			}
		}
	}
	return true;
}));