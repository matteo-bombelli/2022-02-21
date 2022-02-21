export interface Speciality {
    localizedName: string,
    id:string
}

export interface Company {
    id: string,
    companyName: string,
    logo: string,
    specialities: Speciality[],
    city: string
}

export interface OutputFilteredCall {
    companies: Company[],
    pagination: {
        page: number,
        pages: number,
        size: number,
        limit: number
    },
    filters:{
        searchTerm: string,
        filters: string[]
    }
}