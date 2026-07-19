import { MessageCircle } from "lucide-react";
import { COLORS } from "../data";

export default function Footer() {
  return (
    <footer className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <span className="text-lg" style={{ color: COLORS.text }}>
        STREET<span style={{ color: COLORS.red }}>GYM</span>
      </span>
      <div
        className="flex items-center gap-2 text-sm"
        style={{ color: COLORS.textMuted }}
      >
        <MessageCircle size={16} />
        <span>Une messagerie te connecte à ton coach dès ton inscription.</span>
      </div>
    </footer>
  );
}
