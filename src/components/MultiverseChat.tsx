import { useState, useRef, useEffect } from "react";
import { Character } from "@/data/characters";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/multiverse-chat`;

const MultiverseChat = ({
  character,
  onBack,
}: {
  character: Character;
  onBack: () => void;
}) => {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const allMsgs = [...messages, userMsg];

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ character: character.name, messages: allMsgs }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Connection disrupted");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                  );
                }
                return [...prev, { role: "assistant", content: assistantSoFar }];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠ QUANTUM LINK DISRUPTED — SIGNAL LOST" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="terminal-panel animate-fade-in flex flex-col h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{character.emoji}</span>
          <div>
            <div className="font-display text-xs tracking-widest text-glow">
              {character.name}
            </div>
            <div className="text-[10px] text-cyan">
              📡 {character.dimension} — CONNECTED
            </div>
          </div>
        </div>
        <button
          onClick={onBack}
          className="border border-destructive text-destructive text-xs px-3 py-1 hover:bg-destructive hover:text-accent-foreground transition-all"
        >
          DISCONNECT
        </button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground text-xs py-8">
            QUANTUM LINK ACTIVE — SEND A MESSAGE TO {character.name}
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`text-sm ${
              msg.role === "user"
                ? "text-right"
                : "border-l-2 border-primary pl-3"
            }`}
          >
            <span className="text-[10px] text-muted-foreground block mb-1">
              {msg.role === "user" ? "YOU" : character.name}
            </span>
            <span className={msg.role === "user" ? "text-cyan" : "text-foreground"}>
              {msg.content}
            </span>
          </div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
          <div className="border-l-2 border-primary pl-3 text-sm">
            <span className="text-[10px] text-muted-foreground block mb-1">
              {character.name}
            </span>
            <span className="cursor-blink" />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 border-t border-border pt-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="TYPE YOUR MESSAGE..."
          className="flex-1 bg-transparent border border-border px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
          disabled={isLoading}
        />
        <button
          onClick={send}
          disabled={isLoading || !input.trim()}
          className="border border-primary px-4 py-2 text-primary text-sm font-bold hover:bg-primary hover:text-primary-foreground transition-all disabled:opacity-40"
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default MultiverseChat;
