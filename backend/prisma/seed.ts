import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Realizando seeding...');

    // 1. Crear usuario Admin
    const admin = await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: 'admin123', // En producción esto debería estar hasheado
        },
    });

    console.log(`✅ Usuario creado: ${admin.username}`);

    // 2. Crear Recetas de prueba
    const recipes = [
        {
            name: 'Pasta Carbonara',
            type: 'Pasta',
            prepTime: 20,
            servings: 2,
            instructions: '1. Cocer la pasta. 2. Mezclar huevos y queso. 3. Saltear panceta. 4. Mezclar todo.',
            ingredients: {
                create: [
                    { name: 'Espaguetis', quantity: '200g' },
                    { name: 'Huevos', quantity: '2 unidades' },
                    { name: 'Panceta', quantity: '100g' },
                    { name: 'Parmesano', quantity: '50g' },
                ],
            },
        },
        {
            name: 'Ensalada César',
            type: 'Ensalada',
            prepTime: 15,
            servings: 1,
            instructions: '1. Cortar lechuga. 2. Añadir pollo a la plancha. 3. Añadir croutons y salsa.',
            ingredients: {
                create: [
                    { name: 'Lechuga Romana', quantity: '1 bowl' },
                    { name: 'Pechuga de Pollo', quantity: '150g' },
                    { name: 'Croutons', quantity: 'un puñado' },
                    { name: 'Salsa César', quantity: '2 cucharadas' },
                ],
            },
        },
        {
            name: 'Lentejas con Chorizo',
            type: 'Legumbre',
            prepTime: 45,
            servings: 4,
            instructions: '1. Sofreír verduras. 2. Añadir lentejas y agua. 3. Cocer con chorizo y patata.',
            ingredients: {
                create: [
                    { name: 'Lentejas pardinas', quantity: '300g' },
                    { name: 'Chorizo', quantity: '100g' },
                    { name: 'Patata', quantity: '1 grande' },
                    { name: 'Cebolla', quantity: '1/2' },
                ],
            },
        },
        {
            name: 'Tortilla de Patatas',
            type: 'Otro',
            prepTime: 30,
            servings: 4,
            instructions: '1. Freír patatas y cebolla. 2. Escurrir aceite. 3. Mezclar con huevo batido. 4. Cuajar en sartén.',
            ingredients: {
                create: [
                    { name: 'Patatas', quantity: '4 grandes' },
                    { name: 'Huevos', quantity: '6' },
                    { name: 'Cebolla', quantity: '1/2' },
                    { name: 'Sal', quantity: 'al gusto' },
                ],
            },
        },
        {
            name: 'Salmón al Horno',
            type: 'Pescado',
            prepTime: 25,
            servings: 2,
            instructions: '1. Precalentar horno a 200C. 2. Sazonar salmón. 3. Hornear 15-20 min con limón.',
            ingredients: {
                create: [
                    { name: 'Lomos de Salmón', quantity: '2' },
                    { name: 'Limón', quantity: '1/2' },
                    { name: 'Eneldo', quantity: 'al gusto' },
                    { name: 'Espárragos', quantity: '1 manojo' },
                ],
            },
        },
    ];

    for (const recipeData of recipes) {
        await prisma.recipe.create({
            data: {
                ...recipeData,
                ownerId: admin.id,
            },
        });
    }

    console.log('✅ Seeding completado con 5 recetas.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
