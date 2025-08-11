import { GoogleGenAI } from "@google/genai";
import { type PodcastFormInputs } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const buildPrompt = (inputs: PodcastFormInputs): string => {
  const { specialization, hostName, hostRole, guestName, episodeTitle, guestHit, section1, section2, section3 } = inputs;
  
  return `
    Actúa como un productor de podcast y comediante chileno, con un humor irónico y rápido, similar al de Fabricio Copano o Paloma Salas. Tu misión es generar una pauta de conversación, no un guion fome y estructurado. El objetivo es crear una lista de premisas, preguntas y temas que provoquen un diálogo entretenido, con anécdotas y humor.

    **Contexto del Episodio:**
    *   **Anfitrión:** ${hostName}, que trabaja como "${hostRole}".
    *   **Invitado/a:** ${guestName}, una persona experta en ${specialization}.
    *   **El "Hit" del Invitado/a:** ${guestName} es conocido/a por su trabajo en "${guestHit}". Este es un punto clave.
    *   **Título del Episodio:** "${episodeTitle}"
    
    **Estructura Temática del Programa (definida por el anfitrión):**
    *   **Sección 1:** "${section1}"
    *   **Sección 2:** "${section2}"
    *   **Sección 3:** "${section3}"

    **Tus Instrucciones:**
    1.  **Primero, crea una sección "Intro" de 1 a 3 minutos.** Este debe ser un rompehielos donde el anfitrión ${hostName} se presenta y presenta al invitado ${guestName} de forma chistosa y rápida. Debe mencionar la pega del anfitrión ("${hostRole}") y el "hit" del invitado ("${guestHit}"). ¡Cero intros fomes!
    2.  **Genera una pauta para un podcast de 30 a 45 minutos en total.** Distribuye el tiempo de forma lógica entre la intro y las 3 secciones temáticas.
    3.  **Estructura la respuesta comenzando con la "Intro", seguida de las TRES secciones dadas.** Usa los nombres exactos: "Intro", "${section1}", "${section2}", y "${section3}".
    4.  **Indica el minutaje APROXIMADO para CADA sección.** Por ejemplo: **Intro (1-3 minutos)** o **${section1} (10-15 minutos)**.
    5.  Dentro de cada sección, crea una lista numerada de 2 a 4 "puntos de partida" para la conversación.
    6.  **Relaciona las preguntas directamente con el "Hit" del invitado (${guestHit}) y la pega del anfitrión (${hostRole}).** Busca conexiones graciosas, irónicas o inesperadas entre sus mundos.
    7.  Mantén el tono de comedia, irónico, rápido y coloquial chileno.

    **Formato de la Respuesta (MUY IMPORTANTE):**
    Usa Markdown para la estructura, con los títulos de sección en negrita. Devuelve ÚNICAMENTE la pauta. No agregues saludos, explicaciones ni texto adicional.

    **Ejemplo de formato esperado:**

    **Intro (1-3 minutos)**
    1. Un chiste corto para romper el hielo sobre ser un "${hostRole}".
    2. Presentación del invitado ${guestName}, conectando su especialidad (${specialization}) con su "hit" ("${guestHit}") de una forma inesperada.

    **${section1} (10-15 minutos)**
    1. Pregunta chistosa que conecte el tema "${section1}" con el proyecto "${guestHit}".
    2. Otra premisa que relacione la pega de ${hostName} (${hostRole}) con este primer tema.
    3. Punto de partida irónico sobre los inicios en ${specialization}.

    **${section2} (15-20 minutos)**
    1. Pregunta sobre los desafíos del tema "${section2}", mencionando cómo se aplica a "${guestHit}".
    2. Anécdota potencial que ${hostName} podría contar desde su rol de "${hostRole}" sobre este tema.
    3. Otro punto...

    **${section3} (5-10 minutos)**
    1. Pregunta sobre el futuro, conectando "${section3}" con el "hit" y la especialidad de ${specialization}.
    2. Comentario final chistoso para cerrar el tema.
    `;
};

export const generatePodcastStructure = async (inputs: PodcastFormInputs): Promise<string> => {
  try {
    const prompt = buildPrompt(inputs);
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Falla en la Matrix generando la pauta: ${error.message}`);
    }
    throw new Error("Ocurrió un error desconocido al contactar a la IA. Quizás se fue a tomar un café.");
  }
};