import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs'
import path from 'path'
import { filterCompaniesByData } from "../../utils/filterCompanies";

import { Company, OutputFilteredCall } from "./../../sharedTypes/Company"

const dataDirectory = path.join(process.cwd(), 'data')

interface ErrorOutPut {
    error:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OutputFilteredCall|ErrorOutPut>
) {
    
    try{
        const searchTerm = req.query.search_term as string;

        const filters = req.query.filters?(`${req.query.filters}`).split(","):[];

        const limit = req.query.limit?parseInt(req.query.limit as string):10;
        const page = req.query.page?parseInt(req.query.page as string):0;

        const firstElement = limit * page;
        const lastElement = firstElement + limit;

        const companies = JSON.parse(await fs.readFile(path.join(dataDirectory, "companies-big.json"), {encoding:"utf-8"})) as Company[];

        const filteredCompanies = filterCompaniesByData(companies, filters, searchTerm);

        const paginatedFilteredCompanies = filteredCompanies
            .filter(
                (_,index)=>(index >= firstElement && index < lastElement)
            )

        res.status(200).json({
            companies: paginatedFilteredCompanies, 
            pagination:{
                page,
                limit,
                pages: Math.ceil(filteredCompanies.length/limit),
                size: filteredCompanies.length,
            },
            filters:{
                searchTerm,
                filters
            }
        });
    } catch (e) {
        res.status(500).json({
            error:"systemError"
        })
    }
}
