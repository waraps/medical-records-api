import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2';

const config = new ConfigService()
const prisma = new PrismaClient()

async function main() {
    await prisma.rol.createMany({
        data: [
            { name: 'administrator' }, { name: 'doctor' }, { name: 'receptionist' },
        ],
    });

    const hash = await argon.hash(config.get('DEFAULT_PASSWORD'));
    await prisma.user.createMany({
      data: [
          {
              email: "galenosclinica.vet@gmail.com",
              password: hash,
              first_name: "Galenos",
              last_name: "Clinica Vet",
              dni: "00000000",
              avatar: "https://i.ibb.co/C2Vw01w/galenos.png",
              rol_id: 1,
          },
      ],
    });

    await prisma.petSex.createMany({
        data: [
            { name: 'female', }, { name: 'male' },
        ],
    });

    await prisma.test.createMany({
        data: [
            { name: 'HEMATOLOGÍA'}, { name: 'QUÍMICA' }, { name: 'CLP' },
            { name: '4DX' }, { name: 'T4' }, { name: 'RX' }, { name: 'ELECTRO' },
            { name: 'US' }, { name: 'ECOCARDIO' }, { name: 'SEROLOGIA PARVOVIRUS' },
            { name: 'FELV/FIV' }, { name: 'DENMATOF' }, { name: 'RASPADO' },
        ],
    });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})
