import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { COLORS, NAV_LINKS, DISCOVER_LINKS } from "../data";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { supabase } from "../supabaseClient";
import { useRef } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [discoverOpen, setDiscoverOpen] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const closeTimeout = useRef(null);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: `1px solid ${COLORS.steel}`,
        background: "rgba(11,11,12,0.85)",
        backdropFilter: "blur(8px)",
      }}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2">
          <span style={{ fontSize: 22, color: COLORS.text, lineHeight: 1 }}>
            STREET<span style={{ color: COLORS.red }}>GYM</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <div
            className="relative"
            onMouseEnter={() => {
              clearTimeout(closeTimeout.current);
              setDiscoverOpen(true);
            }}
            onMouseLeave={() => {
              closeTimeout.current = setTimeout(
                () => setDiscoverOpen(false),
                200,
              );
            }}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium"
              style={{ color: COLORS.text }}
            >
              Découvrir
              <ChevronDown size={16} style={{ color: COLORS.textMuted }} />
            </button>
            {discoverOpen && (
              <div
                className="absolute left-0 mt-3 w-56 rounded-lg overflow-hidden"
                style={{
                  background: COLORS.bgAlt,
                  border: `1px solid ${COLORS.steel}`,
                }}
              >
                {DISCOVER_LINKS.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    className="block px-4 py-3 text-sm"
                    style={{ color: COLORS.text }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium"
              style={{ color: COLORS.text }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/espace"
                className="text-sm font-medium"
                style={{ color: COLORS.text }}
              >
                Mes messages
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold px-5 py-2 rounded-full"
                style={{
                  border: `1px solid ${COLORS.steel}`,
                  color: COLORS.text,
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/connexion"
                className="text-sm font-medium"
                style={{ color: COLORS.textMuted }}
              >
                Se connecter
              </Link>
              <Link
                to="/inscription"
                className="text-sm font-semibold px-5 py-2 rounded-full"
                style={{ background: COLORS.red, color: "#0B0B0C" }}
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Ouvrir le menu"
        >
          {mobileOpen ? (
            <X color={COLORS.text} />
          ) : (
            <Menu color={COLORS.text} />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ borderTop: `1px solid ${COLORS.steel}` }}
        >
          {[...DISCOVER_LINKS, ...NAV_LINKS].map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium pt-4"
              style={{ color: COLORS.text }}
            >
              {l.label}
            </a>
          ))}
          {user ? (
            <>
              <Link
                to="/espace"
                className="text-sm font-medium pt-4"
                style={{ color: COLORS.text }}
              >
                Mes messages
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-semibold px-5 py-3 rounded-full text-center"
                style={{
                  border: `1px solid ${COLORS.steel}`,
                  color: COLORS.text,
                }}
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/inscription"
              className="text-sm font-semibold px-5 py-3 rounded-full text-center"
              style={{ background: COLORS.red, color: "#0B0B0C" }}
            >
              S'inscrire
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
