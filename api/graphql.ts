import { Speciality } from "../sharedTypes/Company";
import { OutputFilteredCall } from "../sharedTypes/Company"

interface Options {
    query: string,
    variables?: Record<string, unknown>
}

const stdGraphQl = (optionsReq:Options) => {
    const options = {
        method:"post",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ...optionsReq
        })
    }
    return window.fetch("./api/graphql", options);
}

interface Out {
    data:{
        specialities:Speciality[]
    }
}

const specialitiesQuery = () => {
    return `
query {
    specialities {
        id
        localizedName
    }
}
    `
}

export const getSpecialities = async () => {
    try{
        const req = await stdGraphQl({query:specialitiesQuery()});
        const { data:{ specialities } } = await req.json() as Out ;
        return specialities
    } catch (e) {
        throw e;
    }
}

interface Input {
    filters?:string[],
    searchTerm?: string,
    page: number
}

const companiesQuery = () => {
    return `
query GetCompaniesPaginated( $searchTerm: String, $filters: [String], $page: Int ) {
    getCompaniesPaginated(searchTerm: $searchTerm, filters: $filters, page: $page ){
        companies {
            id
            companyName
            logo
            city
            specialities {
                id
                localizedName
            }
        }
        pagination {
            page
            limit
            pages
        }
    }
    companies {
        id
        companyName
        logo
        city
        specialities {
            id
            localizedName
        }
    }
}
`
}

export const getCompaniesFiltered = async ({
    filters = [], 
    searchTerm = "",
    page = 0
}:Input) => {
    try{
        const req = await stdGraphQl({
            query:companiesQuery(),
            variables:{
                filters: filters,
                searchTerm: searchTerm,
                page: page
            }
        });
        const { data:{ getCompaniesPaginated } } = await req.json() as {data:{getCompaniesPaginated:OutputFilteredCall}} ;
        return getCompaniesPaginated
    } catch (e) {
        console.error(e);
        return {
            companies: [],
            pagination: {
                page: 0,
                pages: 0,
                size: 0,
                limit: 0
            },
            filters:{
                searchTerm: "",
                filters: []
            }
        }
    }
}