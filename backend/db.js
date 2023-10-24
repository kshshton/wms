import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    // const password = "123test#";
    const addData = await prisma.product.create({
        data: {
            name: "Adidas Gazelle",
            category: "Buty",
            quantity: 4
        }
    });

    // const _delete = await prisma.address.deleteMany();
    console.log(addData);
}

main()
    .catch(_err => {
        console.log(_err);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })