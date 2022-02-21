import { Company } from "./../sharedTypes/Company"

export const companyExample: Company = {
    id: "company",
    companyName: "exampleCompany",
    logo: "http://placekitten.com/200/300",
    city: "Berlin",
    specialities: [
        {
            id: "excavation",
            localizedName: "Excavation",
        },
        {
            id: "plumbig",
            localizedName: "Plumbing",
        },
        {
            id: "electrical",
            localizedName: "Electrical"
        }
    ]
}
const exampleCompanies: Company[] = new Array(10).fill(companyExample).map((_, index) => {
    return {
        ...companyExample,
        id: `${companyExample.id}_${index}`,
        companyName: `${companyExample.companyName}_${index}`,
        specialities: companyExample.specialities.filter((_, index) => Math.round(Math.random() * companyExample.specialities.length) === index)
    }
});