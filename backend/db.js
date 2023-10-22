import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // const password = "123test#";
    // const user = await prisma.user.create({
    //     data: {
    //         firstName: "Janusz",
    //         lastName: "Tracz",
    //         password: "test123",
    //         email: "jtracz@gmail.com"
    //     }
    // });

    const _delete = await prisma.address.deleteMany();
    console.log(_delete);
}

main()
    .catch(_err => {
        console.log(_err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })