import { OutputFilteredCall } from "../sharedTypes/Company"

interface Input {
    filters?:string[],
    searchTerm?: string,
    page: number
}

export const getCompaniesFiltered = async ({
    filters = [], 
    searchTerm = "",
    page = 0
}:Input) => {
    try{
        const params = new URLSearchParams("");
        params.append("filters", filters.join(","))
        params.append("search_term", searchTerm)
        params.append("page", `${page}`)
        const req = await window.fetch(`/api/companies-filtered?${params.toString()}`);
        const companies = await req.json() as OutputFilteredCall ;
        return companies
    } catch (e) {
        throw e;
    }
}