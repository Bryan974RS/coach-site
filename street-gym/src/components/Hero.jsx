import { COLORS, BRAND } from "../data";

export default function Hero() {
  return (
    <section
      id="top"
      className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28"
    >
      <p
        className="text-sm font-semibold tracking-widest"
        style={{ color: COLORS.red }}
      >
        ASSOCIATION SPORTIVE — LA RÉUNION
      </p>
      <h1
        className="mt-4 leading-[0.95]"
        style={{ fontSize: "clamp(2.8rem, 8vw, 6rem)", color: COLORS.text }}
      >
        {BRAND.name1}
        <span style={{ color: COLORS.red }}>{BRAND.name2}</span>
      </h1>
      <p className="mt-6 max-w-xl text-lg" style={{ color: COLORS.textMuted }}>
        Street Workout encadré par les coachs de {BRAND.full}. Choisis ton
        coach, suis ton programme, progresse avec le collectif.
      </p>
      <div className="flex flex-wrap gap-4 mt-8">
        <a
          href="#coachs"
          className="font-semibold px-6 py-3 rounded-full"
          style={{ background: COLORS.red, color: "#0B0B0C" }}
        >
          Voir les coachs
        </a>
        <a
          href="#presentation"
          className="font-semibold px-6 py-3 rounded-full"
          style={{ border: `1px solid ${COLORS.steel}`, color: COLORS.text }}
        >
          Découvrir l'asso
        </a>
      </div>
    </section>
  );
}
