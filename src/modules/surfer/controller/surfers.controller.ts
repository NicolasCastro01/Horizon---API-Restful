import SurferRepository from '../repository/surfer.repository';

const surferRepository = new SurferRepository();

export async function getAllSurfers(request, reply){
  try {
    const surfers = await surferRepository.getAllSurfers();

    reply.status(200).send(surfers);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function getAllSurfersByCountry(request, reply) {
  const { country } = request.query;

  try {
    const surfersByCountry = await surferRepository.getAllSurfersByCountry(country);

    reply.status(200).send(surfersByCountry);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function newSurfer(request, reply){
  const { number, name, country } = request.body;

  try {
    const newSurfer = await surferRepository.createSurfer({ number, name, country });

    reply.status(200).send(newSurfer);
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function editSurfer(request, reply){
  const { surferNumber } = request.params;

  try {
    await surferRepository.editSurfer(Number(surferNumber), request.body);

    reply.status(200).send({ message: `Number ${surferNumber} Surfer has been edited.`});
  } catch (error) {
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

export async function removeSurfer(request, reply){
  const { surferNumber } = request.params;

  try {
    await surferRepository.removeSurfer(Number(surferNumber));

    reply.status(200).send({ message: `Number ${surferNumber} Surfer has been removed.`});
  } catch (error) {
    console.log(error);
    
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}