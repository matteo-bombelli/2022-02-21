import type { NextApiRequest, NextApiResponse } from 'next';
import { promises as fs } from 'fs'
import path from 'path'
import { Speciality } from "../../sharedTypes/Company";

const dataDirectory = path.join(process.cwd(), 'data')

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Speciality[]>
) {
    const companies = JSON.parse(
        await fs.readFile(
            path.join(dataDirectory, "specialities.json"),
            { encoding: "utf-8" }
        )
    ) as Speciality[]
    res.status(200).json(companies);
}
