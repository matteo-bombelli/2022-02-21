import { Company } from "./../sharedTypes/Company";
import { promises as fs } from 'fs';
import path from "path";
const dataDirectory = path.join(process.cwd(), 'data')

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
export const exampleCompanies: Company[] = new Array(10).fill(companyExample).map((_, index) => {
    return {
        ...companyExample,
        id: `${companyExample.id}_${index}`,
        companyName: `${companyExample.companyName}_${index}`,
        specialities: companyExample.specialities.filter((_, index) => Math.round(Math.random() * companyExample.specialities.length) === index)
    }
});

export const aLotOfCompanies: Company[] = new Array(1000).fill(companyExample).map((_, index) => {
    return {
        ...companyExample,
        id: `${companyExample.id}_${index}`,
        companyName: `${companyExample.companyName}_${index}`,
        specialities: companyExample.specialities.filter((_, index) => Math.round(Math.random() * companyExample.specialities.length) === index)
    }
});

export const saveExampleList = ()=> {
    return fs.writeFile(path.join(dataDirectory, 'companies.json'), JSON.stringify(exampleCompanies, null, 4), {encoding:"utf-8"})    
}

export const saveBigExampleList = () => {
    return fs.writeFile(path.join(dataDirectory, 'companies-big.json'), JSON.stringify(aLotOfCompanies, null, 4), {encoding:"utf-8"})
}