import { Flame, Users, TrendingUp } from "lucide-react";
import { COLORS } from "../data";

const ITEMS = [
  {
    icon: Flame,
    title: "Force",
    text: "Des programmes progressifs, du poids de corps au tirage de barre avancé.",
  },
  {
    icon: Users,
    title: "Collectif",
    text: "On s'entraîne ensemble, on se motive ensemble, on progresse ensemble.",
  },
  {
    icon: TrendingUp,
    title: "Dépassement de soi",
    text: "Chaque séance repousse un peu plus la limite d'hier.",
  },
];

export default function Objectifs() {
  return (
    <section
      id="objectifs"
      className="py-20"
      style={{ background: COLORS.bgAlt }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <p
          className="text-sm font-semibold tracking-widest"
          style={{ color: COLORS.red }}
        >
          NOS OBJECTIFS
        </p>
        <h2
          className="mt-3 text-4xl md:text-5xl mb-12"
          style={{ color: COLORS.text }}
        >
          Trois raisons de monter à la barre.
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {ITEMS.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl p-8"
              style={{
                background: COLORS.bg,
                border: `1px solid ${COLORS.steel}`,
              }}
            >
              <Icon size={28} style={{ color: COLORS.red }} />
              <h3 className="mt-4 text-2xl" style={{ color: COLORS.text }}>
                {title}
              </h3>
              <p className="mt-2" style={{ color: COLORS.textMuted }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
