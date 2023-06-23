import { fetchWrapper } from '@/src/helpers/fetchWrapper';
import { Client } from '@/src/types/clients';
import { NextApiRequest, NextApiResponse } from "next";

async function clients(req: NextApiRequest, res: NextApiResponse) {
    try {
        const clients: Array<Client> = await fetchWrapper.get("Cliente");
        res.send({ ok: true, clients });
    } catch (error) {
        res.status(500).send({ ok: false, error, message: 'Error ao receber clientes' });
    }
}

export default clients
