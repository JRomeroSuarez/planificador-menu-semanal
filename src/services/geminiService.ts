import { GoogleGenAI, Type } from "@google/genai";
import { Meal, MealType } from "../types";

let ai: GoogleGenAI | null = null;
const API_KEY = process.env.API_KEY;

if (API_KEY) {
    try {
        ai = new GoogleGenAI({ apiKey: API_KEY });
    } catch (e) {
        console.error("Failed to initialize GoogleGenAI:", e);
        ai = null;
    }
} else {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

export const isAiAvailable = (): boolean => ai !== null;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        name: {
            type: Type.STRING,
            description: "El nombre de la receta. Debe ser conciso y atractivo."
        },
        type: {
            type: Type.ARRAY,
            description: "Una lista de uno o más tipos de comida relevantes para esta receta. Elige de la lista predefinida.",
            items: {
                type: Type.STRING,
                enum: Object.values(MealType),
            }
        },
        ingredients: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING, description: "Nombre del ingrediente." },
                    quantity: { type: Type.STRING, description: "Cantidad del ingrediente (ej: '1 kg', '2 uds')." }
                },
                required: ["name", "quantity"]
            },
            description: "Una lista de todos los ingredientes necesarios para la receta, incluyendo nombre y cantidad."
        }
    },
    required: ["name", "type", "ingredients"]
};

export const suggestMeal = async (ingredients: string): Promise<Omit<Meal, 'id'>> => {
    if (!ai) {
        throw new Error("El servicio de IA no está disponible. Asegúrate de que la API_KEY esté configurada en el entorno.");
    }

    try {
        const prompt = `
            Basado en los siguientes ingredientes: "${ingredients}", sugiere una receta de comida simple y sabrosa.
            La receta debe ser fácil de preparar para una comida casera.
            Proporciona un nombre para la receta, clasifícala en uno o más de los tipos de comida predefinidos, y lista todos los ingredientes necesarios (no solo los proporcionados) con su nombre y una cantidad aproximada para 2 personas.
            Responde únicamente con el formato JSON definido.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
            },
        });

        const jsonText = response.text?.trim();
        if (!jsonText) {
            throw new Error("La IA devolvió una respuesta vacía.");
        }
        const suggestedMeal = JSON.parse(jsonText);

        if (!suggestedMeal.name || !Array.isArray(suggestedMeal.type) || suggestedMeal.type.length === 0 || !Array.isArray(suggestedMeal.ingredients) || suggestedMeal.ingredients.some((ing: any) => !ing.name || !ing.quantity)) {
            throw new Error("Respuesta de la IA con formato inválido.");
        }

        return suggestedMeal;

    } catch (error) {
        console.error("Error fetching meal suggestion from Gemini:", error);
        throw new Error("No se pudo conectar con el servicio de sugerencias.");
    }
};
