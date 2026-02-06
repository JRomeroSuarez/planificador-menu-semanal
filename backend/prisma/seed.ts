import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Sembrando datos iniciales...');

    // Create a test user
    const user = await prisma.user.upsert({
        where: { username: 'demo' },
        update: {},
        create: {
            username: 'demo',
            password: 'demo123' // In production, hash this!
        }
    });

    console.log('✅ Usuario creado:', user.username);

    // Create initial recipes
    const recipes = [
        {
            name: 'Lentejas con chorizo',
            type: 'Legumbre',
            ingredients: [
                { name: 'lentejas pardinas', quantity: '400g' },
                { name: 'chorizo', quantity: '1 ud' },
                { name: 'zanahoria', quantity: '2 uds' },
                { name: 'patata', quantity: '2 uds' }
            ]
        },
        {
            name: 'Salmón con espárragos',
            type: 'Pescado',
            ingredients: [
                { name: 'lomo de salmón', quantity: '2 uds' },
                { name: 'limón', quantity: '1 ud' },
                { name: 'aceite de oliva', quantity: 'un chorrito' },
                { name: 'espárragos', quantity: '1 manojo' }
            ]
        },
        {
            name: 'Pollo al curry',
            type: 'Carne',
            ingredients: [
                { name: 'pechuga de pollo', quantity: '400g' },
                { name: 'leche de coco', quantity: '1 lata' },
                { name: 'curry en polvo', quantity: '2 cdas' },
                { name: 'arroz basmati', quantity: '200g' },
                { name: 'cebolla', quantity: '1 ud' }
            ]
        },
        {
            name: 'Ensalada César con Pollo',
            type: 'Ensalada,Carne',
            ingredients: [
                { name: 'lechuga romana', quantity: '1 ud' },
                { name: 'pechuga de pollo', quantity: '200g' },
                { name: 'pan de molde', quantity: '2 rebanadas' },
                { name: 'queso parmesano', quantity: '50g' },
                { name: 'salsa césar', quantity: 'al gusto' }
            ]
        }
    ];

    for (const recipeData of recipes) {
        const recipe = await prisma.recipe.create({
            data: {
                name: recipeData.name,
                type: recipeData.type,
                ownerId: user.id,
                ingredients: {
                    create: recipeData.ingredients
                }
            }
        });
        console.log('✅ Receta creada:', recipe.name);
    }

    console.log('🎉 ¡Datos iniciales sembrados exitosamente!');
}

main()
    .catch((e) => {
        console.error('❌ Error sembrando datos:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
