import { prisma } from "../src/lib/prisma"

async function seed() {
  await prisma.event.create({
    data: {
      id: 'baf863db-cb0a-4785-bb2d-0cb068d082f3',
      title: 'Unite Summit',
      slug: 'unite-summit',
      details: 'evento para programadores',
      maximumAttendees: 120,
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()

})