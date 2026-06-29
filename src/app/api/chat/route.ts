import { getKnowledgeBase, type KnowledgeChunk } from "@/lib/portfolio-knowledge";
import { NextRequest } from "next/server";

type Intent =
  | "bot"
  | "contacto"
  | "educacion"
  | "experiencia"
  | "perfil"
  | "proyectos"
  | "saludo"
  | "stack";

const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;
const MAX_CONTEXT_CHARS = 9000;

const stopWords = new Set([
  "a",
  "ahora",
  "al",
  "algo",
  "antes",
  "asi",
  "bien",
  "cada",
  "como",
  "con",
  "contra",
  "cual",
  "cuando",
  "de",
  "del",
  "donde",
  "durante",
  "el",
  "ello",
  "en",
  "era",
  "eres",
  "es",
  "esta",
  "este",
  "fue",
  "hace",
  "hasta",
  "hay",
  "la",
  "las",
  "le",
  "les",
  "lo",
  "los",
  "luego",
  "mas",
  "me",
  "mediante",
  "mi",
  "mismo",
  "mucho",
  "muy",
  "nada",
  "no",
  "nos",
  "nunca",
  "o",
  "otro",
  "para",
  "pero",
  "poco",
  "por",
  "porque",
  "que",
  "quien",
  "quienes",
  "se",
  "segun",
  "si",
  "siempre",
  "sin",
  "sobre",
  "solo",
  "son",
  "su",
  "sus",
  "tambien",
  "tan",
  "tanto",
  "te",
  "tiene",
  "todo",
  "tu",
  "un",
  "una",
  "unas",
  "unos",
  "varios",
  "y",
  "ya",
]);

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .split(/\s+/)
    .filter((word) => word.length > 1 && !stopWords.has(word));
}

function scoreChunk(tokens: string[], chunk: KnowledgeChunk): number {
  const titleNorm = normalizeText(chunk.title);
  const categoryNorm = normalizeText(chunk.category);
  const contentNorm = normalizeText(chunk.content);

  let score = 0;
  for (const token of tokens) {
    if (titleNorm.includes(token)) score += 10;
    if (categoryNorm.includes(token)) score += 5;
    const regex = new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g");
    const matches = contentNorm.match(regex);
    if (matches) score += matches.length;
  }

  return score;
}

function hasAny(text: string, keywords: string[]): boolean {
  return keywords.some((keyword) => text.includes(keyword));
}

function asksAboutProfile(text: string): boolean {
  return hasAny(text, [
    "perfil",
    "quien es jorge",
    "sobre jorge",
    "presentacion",
    "presentate",
    "resumen",
    "bio",
  ]);
}

function asksAboutStack(text: string): boolean {
  return hasAny(text, [
    "tecnologia",
    "tecnologias",
    "stack",
    "herramienta",
    "herramientas",
    "lenguaje",
    "lenguajes",
    "framework",
    "frameworks",
    "base de datos",
    "bases de datos",
    "usas",
    "manejas",
    "sabes",
  ]);
}

function getIntent(question: string): Intent | null {
  const q = normalizeText(question);
  const wordCount = q.split(/\s+/).filter(Boolean).length;

  if (
    wordCount <= 3 &&
    hasAny(q, ["hola", "buenas", "buenos dias", "buenas tardes", "saludos"])
  ) {
    return "saludo";
  }

  if (hasAny(q, ["quien eres", "que eres", "eres bot", "asistente"])) {
    return "bot";
  }

  if (
    hasAny(q, [
      "contacto",
      "contactar",
      "correo",
      "email",
      "telefono",
      "celular",
      "whatsapp",
      "llamar",
    ])
  ) {
    return "contacto";
  }

  if (asksAboutStack(q)) {
    return "stack";
  }

  if (
    hasAny(q, [
      "experiencia",
      "trabajo",
      "trabajado",
      "laboral",
      "trayectoria",
      "empresa",
      "empresas",
    ])
  ) {
    return "experiencia";
  }

  if (
    hasAny(q, [
      "proyecto",
      "proyectos",
      "caso",
      "casos",
      "repositorio",
      "demo",
      "portafolio",
    ])
  ) {
    return "proyectos";
  }

  if (asksAboutProfile(q)) {
    return "perfil";
  }

  if (
    hasAny(q, [
      "educacion",
      "estudios",
      "formacion",
      "cursos",
      "certificados",
      "idiomas",
    ])
  ) {
    return "educacion";
  }

  return null;
}

function chunksByCategory(chunks: KnowledgeChunk[], categories: string[]) {
  return chunks.filter((chunk) => categories.includes(chunk.category));
}

function findChunk(chunks: KnowledgeChunk[], title: string) {
  return chunks.find((chunk) => chunk.title === title);
}

function joinContents(chunks: KnowledgeChunk[]): string {
  return chunks.map((chunk) => chunk.content).join(" ");
}

function answerProfileAndStack(chunks: KnowledgeChunk[]) {
  const presentation = findChunk(chunks, "Presentacion personal");
  const stackSummary = summarizeStack(chunks);
  const profileText = presentation?.content;

  if (profileText && stackSummary) {
    return `${profileText} En tecnologias maneja principalmente ${stackSummary}.`;
  }

  return profileText || stackSummary || null;
}

function summarizeStack(chunks: KnowledgeChunk[]) {
  const preferredOrder = [
    "Frontend",
    "Backend",
    "Bases de datos",
    "Framework",
    "Servidores",
    "Operacion",
  ];
  const stack = chunksByCategory(chunks, ["stack"]);
  const byTitle = new Map(
    stack.map((chunk) => [chunk.title.replace("Stack: ", ""), chunk.content]),
  );

  return preferredOrder
    .map((category) => {
      const content = byTitle.get(category);
      const items = content
        ?.replace(/^En la categoria .+ maneja:\s*/i, "")
        .replace(/\.$/, "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 4);

      return items?.length ? `${category}: ${items.join(", ")}` : null;
    })
    .filter(Boolean)
    .join("; ");
}

function getFallbackAnswer(question: string, chunks: KnowledgeChunk[]) {
  const normalizedQuestion = normalizeText(question);

  if (asksAboutProfile(normalizedQuestion) && asksAboutStack(normalizedQuestion)) {
    const combined = answerProfileAndStack(chunks);

    if (combined) {
      return {
        answer: combined,
        source: "perfil-stack",
      };
    }
  }

  const intent = getIntent(question);

  if (intent) {
    return {
      answer: answerByIntent(intent, chunks),
      source: intent,
    };
  }

  const tokens = tokenize(question);

  if (tokens.length === 0) {
    return {
      answer:
        "No entendi la pregunta. Puedes preguntarme sobre su perfil, proyectos, tecnologias o experiencia profesional.",
      source: null,
    };
  }

  const nonProjectChunks = chunks.filter(
    (chunk) => chunk.category !== "proyectos",
  );
  let { bestChunk, bestScore } = findBestChunk(tokens, nonProjectChunks);

  if (!bestChunk || bestScore < 2) {
    ({ bestChunk, bestScore } = findBestChunk(tokens, chunks));
  }

  if (!bestChunk || bestScore < 2) {
    return {
      answer:
        "No tengo informacion sobre eso en el portafolio. Preguntame sobre su perfil, proyectos, tecnologias o experiencia profesional.",
      source: null,
    };
  }

  return {
    answer: bestChunk.content,
    source: bestChunk.title,
  };
}

function answerByIntent(intent: Intent, chunks: KnowledgeChunk[]): string {
  const presentation = findChunk(chunks, "Presentacion personal");
  const summary = findChunk(chunks, "Resumen profesional");

  if (intent === "saludo") {
    return "Hola, soy el asistente virtual del portafolio de Jorge. Puedo contarte sobre su perfil, proyectos, tecnologias, experiencia o formas de contacto.";
  }

  if (intent === "bot") {
    return "Soy el asistente virtual del portafolio de Jorge. Estoy aqui para responder preguntas sobre su perfil profesional, proyectos, tecnologias, experiencia y datos de contacto.";
  }

  if (intent === "perfil") {
    const parts = [
      presentation?.content,
      summary?.content ? `Resumen profesional: ${summary.content}` : null,
    ].filter(Boolean);

    return parts.length > 0
      ? parts.join(" ")
      : "Jorge es un profesional enfocado en desarrollo de software, automatizacion, datos y soluciones web.";
  }

  if (intent === "stack") {
    const stack = chunksByCategory(chunks, ["stack"]);

    return stack.length > 0
      ? `Jorge maneja estas tecnologias y herramientas: ${joinContents(stack)}`
      : "En el portafolio no hay tecnologias cargadas todavia.";
  }

  if (intent === "experiencia") {
    const experience = chunksByCategory(chunks, ["experiencia"]);

    if (experience.length > 0) {
      return `Sobre su experiencia profesional: ${joinContents(experience)}`;
    }

    const projects = chunksByCategory(chunks, ["proyectos"]);
    return projects.length > 0
      ? `Su experiencia se refleja en proyectos publicados como: ${projects
          .slice(0, 3)
          .map((project) => project.title)
          .join(", ")}.`
      : "Aun no hay experiencia laboral cargada en el portafolio.";
  }

  if (intent === "proyectos") {
    const projects = chunksByCategory(chunks, ["proyectos"]);

    return projects.length > 0
      ? `Estos son algunos proyectos publicados: ${projects
          .slice(0, 5)
          .map((project) => project.title)
          .join(", ")}. Si quieres, preguntame por un proyecto especifico.`
      : "Aun no hay proyectos publicados en el portafolio.";
  }

  if (intent === "contacto") {
    const contact = chunksByCategory(chunks, ["perfil"]).filter((chunk) =>
      ["Contacto", "Enlaces externos", "Ubicacion"].includes(chunk.title),
    );

    return contact.length > 0
      ? joinContents(contact)
      : "No hay datos de contacto cargados en el portafolio.";
  }

  const education = chunksByCategory(chunks, [
    "educacion",
    "cursos",
    "idiomas",
    "competencias",
  ]);

  return education.length > 0
    ? joinContents(education)
    : "Aun no hay informacion de formacion, cursos o competencias cargada en el portafolio.";
}

function findBestChunk(tokens: string[], chunks: KnowledgeChunk[]) {
  let bestScore = 0;
  let bestChunk: KnowledgeChunk | null = null;

  for (const chunk of chunks) {
    const score = scoreChunk(tokens, chunk);
    if (score > bestScore) {
      bestScore = score;
      bestChunk = chunk;
    }
  }

  return { bestChunk, bestScore };
}

function getRelevantChunks(question: string, chunks: KnowledgeChunk[]) {
  const normalizedQuestion = normalizeText(question);
  const selectedCategories = new Set<string>();

  if (asksAboutProfile(normalizedQuestion)) {
    selectedCategories.add("perfil");
    selectedCategories.add("resumen");
    selectedCategories.add("competencias");
  }

  if (asksAboutStack(normalizedQuestion)) {
    selectedCategories.add("stack");
    selectedCategories.add("proyectos");
  }

  if (selectedCategories.size > 0) {
    return chunks.filter((chunk) => selectedCategories.has(chunk.category));
  }

  const intent = getIntent(question);

  if (intent === "perfil" || intent === "bot" || intent === "saludo") {
    return chunks.filter((chunk) =>
      ["perfil", "resumen", "competencias"].includes(chunk.category),
    );
  }

  if (intent === "stack") {
    return chunks.filter((chunk) =>
      ["stack", "competencias", "proyectos"].includes(chunk.category),
    );
  }

  if (intent === "experiencia") {
    return chunks.filter((chunk) =>
      ["experiencia", "proyectos", "logros"].includes(chunk.category),
    );
  }

  if (intent === "proyectos") {
    return chunks.filter((chunk) => chunk.category === "proyectos");
  }

  if (intent === "contacto") {
    return chunks.filter((chunk) => chunk.category === "perfil");
  }

  if (intent === "educacion") {
    return chunks.filter((chunk) =>
      ["educacion", "cursos", "idiomas", "competencias"].includes(
        chunk.category,
      ),
    );
  }

  const tokens = tokenize(question);
  const scored = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(tokens, chunk) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((item) => item.chunk);

  if (scored.length > 0) {
    return scored;
  }

  return chunks.filter((chunk) =>
    ["perfil", "resumen", "stack", "experiencia", "proyectos"].includes(
      chunk.category,
    ),
  );
}

function buildContext(chunks: KnowledgeChunk[]) {
  const lines = chunks.map(
    (chunk) => `- ${chunk.category} / ${chunk.title}: ${chunk.content}`,
  );
  const context = lines.join("\n");

  return context.length > MAX_CONTEXT_CHARS
    ? `${context.slice(0, MAX_CONTEXT_CHARS)}\n- Contexto recortado por longitud.`
    : context;
}

function extractGeminiText(payload: unknown) {
  if (!payload || typeof payload !== "object") return null;

  const response = payload as {
    output_text?: string;
    steps?: Array<{
      content?: Array<{
        text?: string;
      }>;
    }>;
    candidates?: Array<{
      content?: {
        parts?: Array<{
          text?: string;
        }>;
      };
    }>;
  };
  const interactionText = response.output_text?.trim();

  if (interactionText) {
    return interactionText;
  }

  const stepsText = response.steps
    ?.flatMap((step) => step.content ?? [])
    .map((part) => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  if (stepsText) {
    return stepsText;
  }

  const text = response.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  return text || null;
}

function isCompleteAnswer(answer: string) {
  const trimmed = answer.trim();

  if (trimmed.length < 40) {
    return false;
  }

  if (/[.!?)]$/.test(trimmed)) {
    return true;
  }

  return false;
}

async function answerWithGemini(question: string, chunks: KnowledgeChunk[]) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const context = buildContext(getRelevantChunks(question, chunks));
  const systemInstruction = [
    "Eres el asistente virtual del portafolio profesional de Jorge Andres Morales De La Ossa.",
    "Responde siempre en espanol, con tono profesional, claro y cercano.",
    "Usa unicamente la informacion del contexto del portafolio.",
    "No inventes empresas, experiencia, proyectos, tecnologias, estudios, telefonos ni enlaces.",
    "Si el contexto no contiene la respuesta, dilo con honestidad y sugiere preguntar por perfil, proyectos, tecnologias, experiencia o contacto.",
    "No digas que eres Jorge; eres su asistente virtual.",
    "Evita respuestas demasiado largas. Normalmente responde en 2 a 5 frases.",
    "Termina siempre con una frase completa y con puntuacion final.",
  ].join(" ");
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [
          {
            text: systemInstruction,
          },
        ],
      },
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Contexto del portafolio:\n${context}\n\nPregunta del visitante:\n${question}`,
            },
          ],
        },
      ],
      generationConfig: {
        maxOutputTokens: 700,
        temperature: 0.35,
      },
    }),
  });

  if (!response.ok) {
    return null;
  }

  const text = extractGeminiText(await response.json());

  return text && isCompleteAnswer(text) ? text : null;
}

export async function POST(request: NextRequest) {
  try {
    let question: string;
    try {
      const body = await request.json();
      question = body?.question;
    } catch {
      return Response.json(
        { answer: "Por favor envia una pregunta valida.", source: null },
        { status: 400 },
      );
    }

    if (!question || typeof question !== "string" || !question.trim()) {
      return Response.json(
        { answer: "Escribe una pregunta para poder ayudarte.", source: null },
        { status: 400 },
      );
    }

    const chunks = await getKnowledgeBase();

    if (chunks.length === 0) {
      return Response.json({
        answer: "No hay informacion disponible en el portafolio aun.",
        source: null,
      });
    }

    const fallback = getFallbackAnswer(question.trim(), chunks);

    try {
      const geminiAnswer = await answerWithGemini(question.trim(), chunks);

      if (geminiAnswer) {
        return Response.json({
          answer: geminiAnswer,
          source: "gemini",
        });
      }
    } catch {
      // Keep the chatbot usable if the external model is unavailable.
    }

    if (fallback.source === null && fallback.answer.startsWith("No entendi")) {
      return Response.json({
        answer: fallback.answer,
        source: null,
      });
    }

    return Response.json(fallback);
  } catch {
    return Response.json(
      {
        answer: "Ocurrio un error al procesar tu pregunta. Intenta de nuevo.",
        source: null,
      },
      { status: 500 },
    );
  }
}
