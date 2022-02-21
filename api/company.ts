import { Company } from "../sharedTypes/Company"

export const getCompanies = async () => {
    try{
        const req = await window.fetch("./api/companies");
        const companies = await req.json() as Company[] ;
        return companies
    } catch (e) {
        throw e;
    }
}