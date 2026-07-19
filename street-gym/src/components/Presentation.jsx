import { COLORS } from "../data";

export default function Presentation() {
  return (
    <section
      id="presentation"
      className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center"
    >
      <div>
        <p
          className="text-sm font-semibold tracking-widest"
          style={{ color: COLORS.red }}
        >
          L'ASSOCIATION
        </p>
        <h2
          className="mt-3 text-4xl md:text-5xl"
          style={{ color: COLORS.text }}
        >
          Née dans la rue,
          <br />
          portée par le collectif.
        </h2>
        <p className="mt-6 leading-relaxed" style={{ color: COLORS.textMuted }}>
          Street Gym Association réunit les pratiquants de street workout de
          l'île autour d'un même terrain d'entraînement : la rue, les barres,
          l'effort en groupe. Nos coachs construisent des programmes adaptés à
          chaque niveau, du premier tirage de barre à la préparation
          compétition.
        </p>
      </div>
      <div
        className="rounded-2xl p-8 aspect-square flex items-center justify-center"
        style={{
          background: COLORS.bgAlt,
          border: `1px solid ${COLORS.steel}`,
        }}
      >
        <div className="w-full flex flex-col gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 9999,
                  background: COLORS.steel,
                }}
              />
              <div
                style={{
                  flex: 1,
                  height: 6,
                  background: i === 1 ? COLORS.red : COLORS.steel,
                  borderRadius: 3,
                }}
              />
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: 9999,
                  background: COLORS.steel,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
