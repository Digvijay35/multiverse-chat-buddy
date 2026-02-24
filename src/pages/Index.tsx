import { useState } from "react";
import StarField from "@/components/StarField";
import TerminalHeader from "@/components/TerminalHeader";
import MultiverseScanner from "@/components/MultiverseScanner";
import CharacterGrid from "@/components/CharacterGrid";
import MultiverseChat from "@/components/MultiverseChat";
import { Character } from "@/data/characters";

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [connectedChar, setConnectedChar] = useState<Character | null>(null);
  const [scanDone, setScanDone] = useState(false);

  const handleConnect = (char: Character) => {
    setConnectedChar(char);
    setShowChat(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <StarField />
      <div className="w-full max-w-3xl relative z-10 space-y-6">
        <div className="terminal-panel">
          <TerminalHeader />
        </div>

        {/* Scanner */}
        <MultiverseScanner onScanComplete={() => setScanDone(true)} />

        {/* Character Grid - always visible */}
        {!showChat && (
          <CharacterGrid onConnect={handleConnect} />
        )}

        {/* Chat */}
        {showChat && connectedChar && (
          <MultiverseChat
            character={connectedChar}
            onBack={() => {
              setShowChat(false);
              setConnectedChar(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
