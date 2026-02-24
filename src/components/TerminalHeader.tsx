import { useState, useEffect } from "react";

const TerminalHeader = () => {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-between items-center border-b border-border pb-3 mb-5">
      <span className="font-display font-bold text-sm tracking-widest text-glow">
        UPLINK: MULTIVERSE_SCANNER_v9.0
      </span>
      <span className="text-muted-foreground text-xs font-mono">{time}</span>
    </div>
  );
};

export default TerminalHeader;
