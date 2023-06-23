import { messages } from '@/src/config/messages/general';
import { fetchWrapper } from '@/src/helpers/fetchWrapper';
import { Displacement } from '@/src/types/displacements';
import { NextApiRequest, NextApiResponse } from "next";

async function drivers(req: NextApiRequest, res: NextApiResponse) {
    try {
        const drivers: Array<Displacement> = await fetchWrapper.get("Condutor");
        res.send({ ok: true, drivers });
    } catch (error) {
        res.status(500).send({ ok: false, error, message: messages.drivers.error });
    }
}

export default drivers
