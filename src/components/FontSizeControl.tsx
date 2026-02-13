import { useState, useEffect } from "react";
import { AArrowUp, AArrowDown } from "lucide-react";

const FONT_SIZES = [100, 112, 125] as const;
const STORAGE_KEY = "curation-font-size";

const FontSizeControl = () => {
  const [sizeIndex, setSizeIndex] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? Number(saved) : 0;
  });

  useEffect(() => {
    document.documentElement.style.fontSize = `${FONT_SIZES[sizeIndex]}%`;
    localStorage.setItem(STORAGE_KEY, String(sizeIndex));
  }, [sizeIndex]);

  const decrease = () => setSizeIndex((i) => Math.max(0, i - 1));
  const increase = () => setSizeIndex((i) => Math.min(FONT_SIZES.length - 1, i + 1));

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={decrease}
        disabled={sizeIndex === 0}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Decrease font size"
      >
        <AArrowDown className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={increase}
        disabled={sizeIndex === FONT_SIZES.length - 1}
        className="p-1.5 rounded text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Increase font size"
      >
        <AArrowUp className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default FontSizeControl;
