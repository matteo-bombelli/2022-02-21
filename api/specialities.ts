import { Speciality } from "../sharedTypes/Company"

export const getSpecialities = async () => {
    try{
        const req = await window.fetch("./api/specialities");
        const companies = await req.json() as Speciality[] ;
        return companies
    } catch (e) {
        throw e;
    }
}