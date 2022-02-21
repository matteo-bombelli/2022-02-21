import type { NextApiRequest, NextApiResponse } from 'next';
import { Company } from "../../sharedTypes/Company";
import { exampleCompanies, saveExampleList, aLotOfCompanies, saveBigExampleList, saveSpecialities} from "../../data/dataCreation";

interface Output {
    example: {
        comapnies: Company[];
    },
    bigExample: {
        comapnies: Company[];
    }
}

interface ErrorOutput {
    error:any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Output | ErrorOutput>
) {
    
    try{
        await Promise.all([saveBigExampleList(), saveExampleList(), saveSpecialities()]) ;
        res.status(200).json({
            example: {
                comapnies: exampleCompanies
            },
            bigExample: {
                comapnies: aLotOfCompanies
            }
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            error:"systemError"
        })
    }
}
