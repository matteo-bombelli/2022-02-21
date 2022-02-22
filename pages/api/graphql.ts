// @ts-nocheck

import type { NextApiRequest, NextApiResponse, PageConfig  } from "next";
import path from "path";
import { gql, ApolloServer } from "apollo-server-micro";
import { promises as fs } from 'fs';
import { Speciality, Company } from "../../sharedTypes/Company";
import { filterCompaniesByData } from "../../utils/filterCompanies";

const dataDirectory = path.join(process.cwd(), 'data')

const typeDefs = gql`

    type Speciality {
        localizedName: String!
        id: String!
    }

    type Company {
        id: String!
        companyName: String!
        logo: String!
        city: String!
        specialities: [Speciality]
    }

    type Pagination {
        page: Int!
        pages: Int!
        size: Int!
        limit: Int!
    }

    type Filters {
        searchTerm: String!
        filters: [String!]!
    }

    type CompanyResponsePaginated {
        companies: [Company!]!
        pagination: Pagination!
        filters: Filters
    }

    type Query {
        specialities: [Speciality!]!
        companies: [Company]!
        getCompaniesPaginated(
            searchTerm:String,
            filters:[String],
            page: Int,
            limit: Int
        ): CompanyResponsePaginated!
        companiesQuery(
            searchTerm:String,
            filters:[String],
            page: Int,
            limit: Int
        ): [Company]!
    }
`;

const getCompaniesPaginated = async (
    searchTerm = "", 
    filters: string[] = [],
    page = 0,
    limit = 10,
) => {
    const companies = JSON.parse(await fs.readFile(path.join(dataDirectory, "companies-big.json"), {encoding:"utf-8"})) as Company[];
    const filteredCompanies = filterCompaniesByData(companies, filters, searchTerm);
    const firstElement = limit * page;
    const lastElement = firstElement + limit;
    const paginatedFilteredCompanies = filteredCompanies
        .filter(
            (_,index)=>(index >= firstElement && index < lastElement)
        )

    console.log(JSON.stringify(
        {
            firstElement, 
            lastElement,
            companies: JSON.stringify(paginatedFilteredCompanies)
        }, null, 4
    ))

    return {
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
    }
}

interface GetCompaniesPaginatedArgs {
    searchTerm?: string, 
    filters?: string[];
    page?:number,
    limit?:number,
}

const resolvers = {
    Query: {
        specialities: async () => {
            const companies = JSON.parse(
                await fs.readFile(
                    path.join(dataDirectory, "specialities.json"),
                    { encoding: "utf-8" }
                )
            ) as Speciality[]
            return companies;
        },
        getCompaniesPaginated: async (_:any, {
            searchTerm,
            filters,
            page,
            limit
        }:GetCompaniesPaginatedArgs)=>{
            return await getCompaniesPaginated(
                searchTerm,
                filters,
                page,
                limit
            )
        },
        companiesQuery: async (_:any, {
            searchTerm,
            filters,
            page,
            limit
        }:GetCompaniesPaginatedArgs)=>{
            const allData = await getCompaniesPaginated(
                searchTerm,
                filters,
                page,
                limit
            );
            return allData.companies;
        },
        companies: async () => JSON.parse(await fs.readFile(path.join(dataDirectory, "companies-big.json"), {encoding:"utf-8"})) as Company[]
    },
};

// @ts-ignore
const apolloServer = new ApolloServer({ typeDefs, resolvers })

const serverStart = apolloServer.start()

const GraphQl = async (
    req: NextApiRequest,
    res: NextApiResponse<any>
) => {
    if (req.method === "OPTIONS") {
        res.end();
        return false;
    }
    await serverStart;
    await apolloServer.createHandler({
        path: "/api/graphql",
    })(req, res);
}

export default GraphQl;

export const config: PageConfig = {
    api: {
        bodyParser: false,
    },
};