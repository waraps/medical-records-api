import { PrismaClient } from '@prisma/client'
import * as argon from 'argon2';

const prisma = new PrismaClient()

async function main() {
    await prisma.rol.createMany({
        data: [
            {
                name: 'administrator',
            },
            {
                name: 'doctor',
            },
            {
                name: 'receptionist',
            },
        ],
    });

    const hash = await argon.hash('123456');
    await prisma.user.createMany({
      data: [
          {
              email: "galenosclinica.vet@gmail.com",
              password: hash,
              first_name: "Galenos",
              last_name: "Clinica Veterinaria",
              dni: "00000000",
              avatar: "https://gravatar.com/avatar/0f37b1761eca504fd2d72045b2706330?s=400&d=robohash&r=x",
              rol_id: 1,
          },
          {
              email: "doctor@mail.com",
              password: hash,
              first_name: "Doc",
              last_name: "Tor",
              dni: "00000001",
              avatar: "https://gravatar.com/avatar/0f37b1761eca504fd2d72045b2706330?s=400&d=robohash&r=x",
              rol_id: 2,
          },
      ],
    });

    await prisma.petSex.createMany({
        data: [
            {
                name: 'female',
            },
            {
                name: 'male',
            },
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