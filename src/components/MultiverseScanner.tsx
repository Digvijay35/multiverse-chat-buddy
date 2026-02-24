import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface ScanResult {
  question: string;
  characters: { name: string; msg: string }[];
  final_result: string;
}

interface Props {
  onScanComplete: (result: ScanResult) => void;
}

const MultiverseScanner = ({ onScanComplete }: Props) => {
  const [scanning, setScanning] = useState(false);
  const [logs, setLogs] = useState<string[]>(["PROMPT: ESTABLISHING QUANTUM LINK..."]);
  const [result, setResult] = useState<ScanResult | null>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [logs]);

  const typeLog = (text: string) => {
    setLogs((prev) => [...prev, text]);
  };

  const scan = async () => {
    setScanning(true);
    setResult(null);
    setLogs([">> INITIALIZING DEEP SCAN..."]);

    const fakeSteps = [
      ">> CONNECTING TO NASA QUANTUM ARRAY...",
      ">> SCANNING PARALLEL DIMENSIONS...",
      ">> INTERCEPTING MULTIVERSE SIGNALS...",
      ">> DECODING QUANTUM TRANSMISSIONS...",
    ];

    for (const step of fakeSteps) {
      await new Promise((r) => setTimeout(r, 600));
      typeLog(step);
    }

    try {
      const { data, error } = await supabase.functions.invoke("multiverse-scan");
      
      if (error) throw error;

      typeLog(">> SIGNAL LOCKED ✓");
      await new Promise((r) => setTimeout(r, 400));

      typeLog(`\n◆ QUESTION: ${data.question}`);
      await new Promise((r) => setTimeout(r, 300));

      for (const char of data.characters) {
        await new Promise((r) => setTimeout(r, 400));
        typeLog(`  [${char.name}]: "${char.msg}"`);
      }

      await new Promise((r) => setTimeout(r, 500));
      typeLog(`\n★ FINAL RESULT: ${data.final_result}`);

      setResult(data);
      onScanComplete(data);
    } catch (err) {
      console.error(err);
      typeLog(">> ⚠ DIMENSION GLITCH — RETRY SCAN");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="terminal-panel animate-fade-in">
      <div
        ref={logRef}
        className="h-[300px] overflow-y-auto border border-border p-4 mb-5 text-sm leading-relaxed scrollbar-thin"
      >
        {logs.map((log, i) => (
          <div key={i} className="mb-2 border-l-2 border-primary pl-3">
            {log.startsWith("  [") ? (
              <span>
                <span className="bg-secondary text-secondary-foreground px-1 font-bold text-xs">
                  {log.split("]")[0].replace("  [", "")}
                </span>
                {log.split("]").slice(1).join("]")}
              </span>
            ) : (
              log
            )}
          </div>
        ))}
        <span className="cursor-blink" />
      </div>

      {result && (
        <div className="mb-5 p-5 border-2 border-dashed border-accent text-center animate-glitch">
          <div className="text-accent font-display font-bold text-lg">
            {result.final_result}
          </div>
        </div>
      )}

      <button
        onClick={scan}
        disabled={scanning}
        className="w-full border-2 border-primary bg-transparent text-primary font-display font-bold text-lg py-4 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_hsl(var(--glow))] disabled:opacity-40 disabled:cursor-wait disabled:border-muted disabled:text-muted-foreground"
      >
        {scanning ? "⟳ SCANNING DIMENSIONS..." : "INITIALIZE DEEP SCAN"}
      </button>
    </div>
  );
};

export default MultiverseScanner;
