import { messages } from '@/src/config/messages/general';
import { fetchWrapper } from '@/src/helpers/fetchWrapper';
import { Vehicle } from '@/src/types/vehicles';
import { NextApiRequest, NextApiResponse } from 'next';

async function vehicles(req: NextApiRequest, res: NextApiResponse) {
  try {
    const vehicles: Array<Vehicle> = await fetchWrapper.get('Veiculo');
    res.send({ ok: true, vehicles });
  } catch (error) {
    res
      .status(500)
      .send({ ok: false, error, message: messages.vehicles.error });
  }
}

export default vehicles;
