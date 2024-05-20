import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Prisma queries here...
    const user = await prisma.user.create({
        data: {
            username: "Shabab",
            email: "shababhussain525@gmail.com"
        }
    });
    console.log(user);
}

main()
    .catch(e => {
        console.log(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })