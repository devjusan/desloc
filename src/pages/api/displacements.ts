import { messages } from '@/src/constants';
import { fetchWrapper } from '@/src/helpers/fetchWrapper';
import { Displacement } from '@/src/types/displacements';
import { NextApiRequest, NextApiResponse } from "next";

async function displacements(req: NextApiRequest, res: NextApiResponse) {
    try {
        const displacements: Array<Displacement> = await fetchWrapper.get("Deslocamento");
        res.send({ ok: true, displacements });
    } catch (error) {
        res.status(500).send({ ok: false, error, message: messages.displacements.error });
    }
}

export default displacements
