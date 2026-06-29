"use client";

import { ArrowUp, BotMessageSquare, MessageCircle, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const suggestions = [
  "Quien eres?",
  "Que tecnologias usas?",
  "Cual es tu experiencia?",
  "Como contactarte?",
];

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hola, soy el asistente virtual de Jorge. Preguntame cualquier cosa sobre su perfil, proyectos, tecnologias o experiencia.",
    },
  ]);
  const endRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      const handler = (e: MouseEvent) => {
        if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, 100);
    return () => clearTimeout(t);
  }, [open]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text: text.trim() }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text.trim() }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Ocurrio un error. Intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        aria-label="Abrir chat"
        className="fixed bottom-4 right-4 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700 active:scale-95"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-20 right-4 z-[90] flex w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl"
          style={{ height: 520, maxHeight: "calc(100vh - 120px)" }}
        >
          <div className="flex items-center gap-2 bg-blue-600 px-4 py-3 text-white">
            <BotMessageSquare className="h-5 w-5 shrink-0" />
            <span className="font-semibold">Asistente</span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-blue-600 text-white"
                      : "rounded-bl-md bg-gray-100 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-gray-100 px-4 py-2 text-sm text-gray-500">
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {suggestions.map((q) => (
                <button
                  key={q}
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs text-blue-700 transition hover:bg-blue-100"
                  onClick={() => send(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            className="flex items-center gap-2 border-t border-blue-100 px-4 py-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              className="flex-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              disabled={loading}
              placeholder="Escribe tu pregunta..."
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-50"
              disabled={!input.trim() || loading}
              type="submit"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
