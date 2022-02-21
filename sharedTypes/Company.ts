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