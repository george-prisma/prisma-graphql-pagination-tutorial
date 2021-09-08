import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const pokemonData: Prisma.PokemonCreateInput[] = [
  {
    name: 'Cleffa',
    hp: 30,
    attack: 1,
  },
  {
    name: 'Feraligatr',
    hp: 120,
    attack: 10,
  },
  {
    name: 'Gengar Prime',
    hp: 130,
    attack: 25,
  },
  {
    name: 'Sneasel',
    hp: 60,
    attack: 25,
  },
  {
    name: 'Chansey',
    hp: 120,
    attack: 15,
  },
  {
    name: 'Venusaur',
    hp: 10,
    attack: 60,
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const p of pokemonData) {
    const pokemon = await prisma.pokemon.create({
      data: p,
    })
    console.log(`Created pokemon with id: ${pokemon.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
