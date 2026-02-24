import { useState } from "react";
import { Character, CHARACTERS } from "@/data/characters";

interface Props {
  onConnect: (character: Character) => void;
}

const ConnectionAnimation = ({ name, onDone }: { name: string; onDone: (success: boolean) => void }) => {
  const [phase, setPhase] = useState<"connecting" | "success" | "failed">("connecting");

  useState(() => {
    const willConnect = Math.random() > 0.2; // 80% success rate
    const timer = setTimeout(() => {
      setPhase(willConnect ? "success" : "failed");
      setTimeout(() => onDone(willConnect), 1200);
    }, 2500);
    return () => clearTimeout(timer);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95">
      <div className="text-center">
        {/* Rings */}
        <div className="relative w-40 h-40 mx-auto mb-8">
          <div className="absolute inset-0 border-2 border-primary rounded-full animate-connect-ring" />
          <div className="absolute inset-4 border-2 border-cyan rounded-full animate-connect-ring" style={{ animationDelay: "0.5s" }} />
          <div className="absolute inset-8 border-2 border-primary rounded-full animate-connect-ring" style={{ animationDelay: "1s" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            {phase === "connecting" && <div className="connection-static w-16 h-16 rounded-full" />}
            {phase === "success" && <span className="text-4xl">✓</span>}
            {phase === "failed" && <span className="text-4xl text-destructive">✗</span>}
          </div>
        </div>
        <div className="font-display text-sm tracking-widest text-glow-strong mb-2">
          {phase === "connecting" && "ESTABLISHING QUANTUM LINK..."}
          {phase === "success" && "QUANTUM LINK ESTABLISHED"}
          {phase === "failed" && "SIGNAL LOST — PARALLEL UNIVERSE DETECTED"}
        </div>
        <div className="text-muted-foreground text-xs">
          TARGET: {name}
        </div>
      </div>
    </div>
  );
};

const CharacterGrid = ({ onConnect }: Props) => {
  const [connecting, setConnecting] = useState<Character | null>(null);

  const handleConnect = (char: Character) => {
    setConnecting(char);
  };

  const handleConnectionResult = (success: boolean) => {
    if (success && connecting) {
      onConnect(connecting);
    }
    setConnecting(null);
  };

  return (
    <>
      {connecting && (
        <ConnectionAnimation name={connecting.name} onDone={handleConnectionResult} />
      )}
      <div className="terminal-panel animate-fade-in">
        <div className="flex items-center gap-2 mb-4 border-b border-border pb-3">
          <span className="font-display text-sm tracking-widest text-glow">
            ◆ MULTIVERSE COMM CHANNEL
          </span>
        </div>
        <p className="text-muted-foreground text-xs mb-4">
          SELECT A TARGET TO ESTABLISH QUANTUM COMMUNICATION LINK
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CHARACTERS.map((char) => (
            <button
              key={char.id}
              onClick={() => handleConnect(char)}
              className="border border-border p-3 text-left transition-all duration-300 hover:border-primary hover:box-glow group"
            >
              <div className="text-2xl mb-1">{char.emoji}</div>
              <div className="text-xs font-bold text-foreground group-hover:text-glow truncate">
                {char.name}
              </div>
              <div className="text-[10px] text-muted-foreground truncate">
                {char.title}
              </div>
              <div className="text-[9px] text-cyan mt-1 truncate">
                📡 {char.dimension}
              </div>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CharacterGrid;
