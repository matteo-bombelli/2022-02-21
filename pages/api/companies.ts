import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs'
import path from 'path'
import { filterCompaniesByData } from "../../utils/filterCompanies";

import { Company } from "./../../sharedTypes/Company"

const dataDirectory = path.join(process.cwd(), 'data')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Company[]>
) {
  const companies = JSON.parse(await fs.readFile(path.join(dataDirectory, "companies.json"), {encoding:"utf-8"})) as Company[]
  res.status(200).json(companies);
}
