import { useState, useEffect, useRef } from "react";

const StratumEdgeLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSpec, setActiveSpec] = useState(0);
  const [emailValue, setEmailValue] = useState("");
  const [isVisible, setIsVisible] = useState({});
  const observerRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    observerRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const specs = [
    { label: "MATERIAL", value: "Grade 5 Titanium", detail: "6AL-4V Aerospace Alloy" },
    { label: "WEIGHT", value: "3.2 oz", detail: "90.7 grams" },
    { label: "FINISH", value: "Stonewash", detail: "Tumbled Matte Surface" },
    { label: "ORIGIN", value: "Muenster, TX", detail: "CNC Machined In-House" },
  ];

  const products = [
    { name: "THE FULCRUM", type: "Ti Pry Bar", price: "$149", tag: "HERO" },
    { name: "DC-D4V2", type: "Deep Carry Clip", price: "$38", tag: "NEW" },
    { name: "LANYARD BEAD", type: "Ti Bead — Hex", price: "$32", tag: null },
    { name: "THE WEDGE", type: "Bottle Opener", price: "$45", tag: "SOON" },
  ];

  return (
    <div style={{
      fontFamily: "'Chakra Petch', sans-serif",
      background: "#0D0D0D",
      color: "#E8E4DE",
      minHeight: "100vh",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500&family=Bebas+Neue&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0D0D0D; }
        ::-webkit-scrollbar-thumb { background: #B87333; border-radius: 2px; }
        
        .fade-up {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .grain {
          position: fixed;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 9999;
        }
        
        .trust-item {
          transition: all 0.3s ease;
        }
        .trust-item:hover {
          color: #B87333;
        }
        
        .product-card {
          background: #161616;
          border: 1px solid #222;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .product-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: #B87333;
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }
        .product-card:hover {
          border-color: #B87333;
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }
        .product-card:hover::before {
          transform: scaleX(1);
        }
        
        .spec-row {
          cursor: pointer;
          transition: all 0.3s ease;
          border-left: 2px solid transparent;
        }
        .spec-row:hover, .spec-row.active {
          border-left-color: #B87333;
          background: rgba(184, 115, 51, 0.05);
        }
        
        .cta-btn {
          background: #B87333;
          color: #0D0D0D;
          border: none;
          padding: 14px 36px;
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }
        .cta-btn:hover {
          background: #D4944A;
          transform: translateY(-1px);
          box-shadow: 0 4px 20px rgba(184, 115, 51, 0.3);
        }
        
        .cta-btn-outline {
          background: transparent;
          color: #B87333;
          border: 1px solid #B87333;
          padding: 14px 36px;
          font-family: 'Chakra Petch', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .cta-btn-outline:hover {
          background: rgba(184, 115, 51, 0.1);
        }
        
        .nav-link {
          color: #888;
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          transition: color 0.3s;
          font-weight: 500;
        }
        .nav-link:hover { color: #B87333; }
        
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 40px",
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrollY > 50 ? "rgba(13,13,13,0.95)" : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? "1px solid #1a1a1a" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 8, height: 8,
            background: "#B87333",
            transform: "rotate(45deg)",
          }} />
          <span style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 20,
            letterSpacing: 4,
            color: "#E8E4DE",
          }}>STRATUM EDGE</span>
          <span style={{
            fontSize: 9,
            letterSpacing: 2,
            color: "#555",
            marginLeft: 4,
          }}>CO.</span>
        </div>
        
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["SHOP", "THE SHOP", "MATERIALS", "FAQ"].map((item) => (
            <a key={item} className="nav-link" href="#">{item}</a>
          ))}
          <div style={{ width: 1, height: 20, background: "#333" }} />
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <span style={{ color: "#666", fontSize: 12, cursor: "pointer" }}>⌕</span>
            <span style={{ color: "#666", fontSize: 12, cursor: "pointer" }}>☰</span>
            <span style={{
              color: "#666", fontSize: 11, cursor: "pointer",
              position: "relative",
            }}>
              BAG
              <span style={{
                position: "absolute",
                top: -6, right: -12,
                background: "#B87333",
                color: "#0D0D0D",
                fontSize: 8,
                width: 14, height: 14,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}>0</span>
            </span>
          </div>
        </div>
      </nav>

      {/* ANNOUNCEMENT BAR */}
      <div style={{
        position: "fixed",
        top: 64,
        left: 0,
        right: 0,
        zIndex: 999,
        background: "#B87333",
        color: "#0D0D0D",
        textAlign: "center",
        padding: "6px 0",
        fontSize: 10,
        letterSpacing: 3,
        fontWeight: 600,
        opacity: scrollY > 200 ? 0 : 1,
        transform: scrollY > 200 ? "translateY(-100%)" : "translateY(0)",
        transition: "all 0.3s ease",
      }}>
        FREE SHIPPING ON ORDERS OVER $150 — MADE IN MUENSTER, TX
      </div>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 60px 80px",
        position: "relative",
        background: `
          linear-gradient(180deg, transparent 0%, rgba(13,13,13,0.3) 50%, #0D0D0D 100%),
          linear-gradient(135deg, #1a1714 0%, #0D0D0D 50%, #151210 100%)
        `,
      }}>
        {/* Geometric accent */}
        <div style={{
          position: "absolute",
          top: "15%",
          right: "8%",
          width: 400,
          height: 400,
          border: "1px solid rgba(184, 115, 51, 0.08)",
          transform: `rotate(${45 + scrollY * 0.02}deg)`,
        }} />
        <div style={{
          position: "absolute",
          top: "20%",
          right: "10%",
          width: 300,
          height: 300,
          border: "1px solid rgba(184, 115, 51, 0.05)",
          transform: `rotate(${-30 + scrollY * 0.01}deg)`,
        }} />
        
        {/* Hash marks / datum target */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: 20,
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
          opacity: 0.15,
        }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{
              width: i % 3 === 0 ? 20 : 10,
              height: 1,
              background: "#B87333",
            }} />
          ))}
        </div>

        <div style={{ maxWidth: 700, position: "relative", zIndex: 2 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#B87333",
            letterSpacing: 4,
            marginBottom: 16,
            opacity: 0.8,
          }}>
            RUN #001 — GRADE 5 TITANIUM — 6AL-4V
          </div>
          
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "clamp(48px, 8vw, 96px)",
            lineHeight: 0.95,
            color: "#E8E4DE",
            marginBottom: 24,
          }}>
            CUT FROM
            <br />
            <span style={{ color: "#B87333" }}>BILLET.</span>
            <br />
            BUILT TO
            <br />
            CARRY.
          </h1>
          
          <p style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: "#777",
            maxWidth: 420,
            marginBottom: 40,
            fontWeight: 300,
          }}>
            Precision-machined titanium tools and accessories. 
            Designed, programmed, and cut on a Haas VF-2 in Muenster, Texas. 
            Every piece. One shop.
          </p>
          
          <div style={{ display: "flex", gap: 16 }}>
            <button className="cta-btn">SHOP NOW</button>
            <button className="cta-btn-outline">THE SHOP →</button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute",
          bottom: 30,
          right: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          opacity: 0.3,
        }}>
          <span style={{ fontSize: 9, letterSpacing: 2 }}>SCROLL</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #B87333, transparent)" }} />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{
        padding: "20px 60px",
        borderTop: "1px solid #1a1a1a",
        borderBottom: "1px solid #1a1a1a",
        display: "flex",
        justifyContent: "center",
        gap: 60,
        flexWrap: "wrap",
      }}>
        {[
          { icon: "◎", text: "MADE IN MUENSTER, TX" },
          { icon: "⬡", text: "GRADE 5 TI · 6AL-4V" },
          { icon: "⚙", text: "HAAS VF-2 CNC" },
          { icon: "→", text: "FREE SHIP $150+" },
        ].map(({ icon, text }) => (
          <div key={text} className="trust-item" style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 10,
            letterSpacing: 2.5,
            color: "#555",
            fontWeight: 500,
          }}>
            <span style={{ color: "#B87333", fontSize: 14 }}>{icon}</span>
            {text}
          </div>
        ))}
      </section>

      {/* FEATURED PRODUCTS */}
      <section
        id="products"
        ref={(el) => (observerRefs.current[0] = el)}
        className={`fade-up ${isVisible["products"] ? "visible" : ""}`}
        style={{ padding: "100px 60px" }}
      >
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 50,
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              color: "#B87333",
              letterSpacing: 3,
              marginBottom: 12,
            }}>
              001 — PRODUCTS
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 42,
              letterSpacing: 2,
            }}>
              TITANIUM ESSENTIALS
            </h2>
          </div>
          <a href="#" style={{
            color: "#B87333",
            fontSize: 11,
            letterSpacing: 2,
            textDecoration: "none",
          }}>VIEW ALL →</a>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}>
          {products.map((p, i) => (
            <div key={i} className="product-card" style={{
              padding: 0,
              animationDelay: `${i * 0.1}s`,
            }}>
              {/* Product image placeholder */}
              <div style={{
                height: 280,
                background: `linear-gradient(135deg, #1a1a1a 0%, #111 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}>
                {/* Crosshair / datum marks */}
                <div style={{
                  width: 60, height: 60,
                  border: "1px solid rgba(184,115,51,0.15)",
                  borderRadius: "50%",
                  position: "relative",
                }}>
                  <div style={{
                    position: "absolute",
                    top: "50%", left: -10, right: -10,
                    height: 1,
                    background: "rgba(184,115,51,0.1)",
                  }} />
                  <div style={{
                    position: "absolute",
                    left: "50%", top: -10, bottom: -10,
                    width: 1,
                    background: "rgba(184,115,51,0.1)",
                  }} />
                </div>
                
                {p.tag && (
                  <span style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    fontSize: 8,
                    letterSpacing: 2,
                    background: p.tag === "HERO" ? "#B87333" : p.tag === "NEW" ? "#2a6a2a" : "#333",
                    color: p.tag === "HERO" ? "#0D0D0D" : "#E8E4DE",
                    padding: "4px 10px",
                    fontWeight: 600,
                  }}>{p.tag}</span>
                )}
              </div>
              
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: "#555",
                  letterSpacing: 2,
                  marginBottom: 6,
                }}>{p.type.toUpperCase()}</div>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  letterSpacing: 1,
                  marginBottom: 12,
                }}>{p.name}</div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 16,
                    color: "#B87333",
                    fontWeight: 500,
                  }}>{p.price}</span>
                  <span style={{
                    fontSize: 10,
                    color: "#444",
                    letterSpacing: 1,
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}>+ ADD</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MANUFACTURING / ABOUT SECTION */}
      <section
        id="manufacturing"
        ref={(el) => (observerRefs.current[1] = el)}
        className={`fade-up ${isVisible["manufacturing"] ? "visible" : ""}`}
        style={{
          padding: "100px 60px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          borderTop: "1px solid #1a1a1a",
        }}
      >
        <div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "#B87333",
            letterSpacing: 3,
            marginBottom: 12,
          }}>
            002 — THE SHOP
          </div>
          <h2 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 42,
            letterSpacing: 2,
            marginBottom: 24,
            lineHeight: 1.1,
          }}>
            REAL PERSON.
            <br />
            REAL MACHINE.
            <br />
            <span style={{ color: "#B87333" }}>REAL SHOP.</span>
          </h2>
          <p style={{
            fontSize: 14,
            lineHeight: 1.8,
            color: "#666",
            marginBottom: 32,
            fontWeight: 300,
          }}>
            Every product in this store is designed, programmed, fixtured, and machined 
            by one person on one machine in a 30×40 shop in Muenster, Texas. No outsourcing. 
            No overseas. No middlemen. From raw 6AL-4V billet to finished product — 
            same hands, same building.
          </p>
          
          <div style={{ marginBottom: 40 }}>
            {specs.map((spec, i) => (
              <div
                key={i}
                className={`spec-row ${activeSpec === i ? "active" : ""}`}
                onClick={() => setActiveSpec(i)}
                style={{
                  padding: "14px 16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #1a1a1a",
                }}
              >
                <div>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: "#555",
                    letterSpacing: 2,
                  }}>{spec.label}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13,
                    color: activeSpec === i ? "#B87333" : "#999",
                    fontWeight: 500,
                  }}>{spec.value}</span>
                  {activeSpec === i && (
                    <div style={{
                      fontSize: 10,
                      color: "#555",
                      marginTop: 2,
                      animation: "slideIn 0.3s ease",
                    }}>{spec.detail}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <button className="cta-btn-outline">SEE THE PROCESS →</button>
        </div>

        {/* Shop Image Placeholder */}
        <div style={{
          background: "linear-gradient(135deg, #1a1814 0%, #12100E 100%)",
          border: "1px solid #222",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          minHeight: 500,
        }}>
          <div style={{
            width: 120, height: 120,
            border: "1px solid rgba(184,115,51,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 16,
          }}>
            <span style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 32,
              color: "rgba(184,115,51,0.3)",
            }}>VF-2</span>
          </div>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "#333",
            letterSpacing: 3,
          }}>HAAS VF-2 — MUENSTER, TX</span>
          
          {/* Corner accents */}
          {[
            { top: 12, left: 12 },
            { top: 12, right: 12 },
            { bottom: 12, left: 12 },
            { bottom: 12, right: 12 },
          ].map((pos, i) => (
            <div key={i} style={{
              position: "absolute",
              ...pos,
              width: 20, height: 20,
              borderTop: pos.top !== undefined ? "1px solid rgba(184,115,51,0.2)" : "none",
              borderBottom: pos.bottom !== undefined ? "1px solid rgba(184,115,51,0.2)" : "none",
              borderLeft: pos.left !== undefined ? "1px solid rgba(184,115,51,0.2)" : "none",
              borderRight: pos.right !== undefined ? "1px solid rgba(184,115,51,0.2)" : "none",
            }} />
          ))}
        </div>
      </section>

      {/* MATERIALS SECTION */}
      <section
        id="materials"
        ref={(el) => (observerRefs.current[2] = el)}
        className={`fade-up ${isVisible["materials"] ? "visible" : ""}`}
        style={{
          padding: "80px 60px",
          borderTop: "1px solid #1a1a1a",
          textAlign: "center",
        }}
      >
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "#B87333",
          letterSpacing: 3,
          marginBottom: 12,
        }}>003 — MATERIAL</div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 36,
          letterSpacing: 2,
          marginBottom: 16,
        }}>GRADE 5 TITANIUM</h2>
        <p style={{
          fontSize: 13,
          color: "#555",
          maxWidth: 500,
          margin: "0 auto 40px",
          lineHeight: 1.8,
          fontWeight: 300,
        }}>
          6AL-4V. The same alloy in aircraft turbine blades and surgical implants. 
          45% lighter than steel, stronger than aluminum, immune to corrosion. 
          It develops a character patina over years of hard use.
        </p>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}>
          {[
            { val: "45%", desc: "LIGHTER THAN STEEL" },
            { val: "0.001\"", desc: "TOLERANCE" },
            { val: "100%", desc: "US MACHINED" },
          ].map(({ val, desc }) => (
            <div key={desc}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 36,
                color: "#B87333",
                marginBottom: 4,
              }}>{val}</div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: "#555",
                letterSpacing: 2,
              }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* EMAIL CAPTURE */}
      <section style={{
        padding: "80px 60px",
        borderTop: "1px solid #1a1a1a",
        textAlign: "center",
      }}>
        <h3 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 28,
          letterSpacing: 2,
          marginBottom: 8,
        }}>NEW DROPS & SHOP UPDATES</h3>
        <p style={{
          fontSize: 12,
          color: "#555",
          marginBottom: 24,
        }}>First access. No spam. Unsubscribe anytime.</p>
        <div style={{
          display: "flex",
          gap: 0,
          maxWidth: 420,
          margin: "0 auto",
        }}>
          <input
            type="email"
            placeholder="EMAIL ADDRESS"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            style={{
              flex: 1,
              background: "#161616",
              border: "1px solid #333",
              borderRight: "none",
              padding: "14px 16px",
              color: "#E8E4DE",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              letterSpacing: 2,
              outline: "none",
            }}
          />
          <button className="cta-btn" style={{ borderLeft: "none" }}>
            SUBSCRIBE
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "60px 60px 40px",
        borderTop: "1px solid #1a1a1a",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 60,
          marginBottom: 60,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <div style={{ width: 8, height: 8, background: "#B87333", transform: "rotate(45deg)" }} />
              <span style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 18,
                letterSpacing: 3,
              }}>STRATUM EDGE CO.</span>
            </div>
            <p style={{
              fontSize: 12,
              color: "#444",
              lineHeight: 1.8,
              maxWidth: 280,
            }}>
              Precision-machined titanium tools and accessories. 
              Designed and made by a real machinist in Muenster, Texas.
            </p>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: "#333",
              letterSpacing: 2,
              marginTop: 16,
            }}>
              A WAYPOINT MACHINE WORKS BRAND
            </div>
          </div>
          
          {[
            { title: "SHOP", links: ["All Products", "Knives", "Tools", "Clips", "Pens"] },
            { title: "INFO", links: ["The Shop", "Materials", "FAQ", "Contact"] },
            { title: "POLICY", links: ["Shipping", "Returns", "Warranty", "Privacy"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{
                fontSize: 10,
                letterSpacing: 3,
                color: "#B87333",
                marginBottom: 16,
                fontWeight: 600,
              }}>{title}</div>
              {links.map((link) => (
                <a key={link} href="#" style={{
                  display: "block",
                  color: "#444",
                  fontSize: 12,
                  textDecoration: "none",
                  marginBottom: 10,
                  transition: "color 0.3s",
                }}>{link}</a>
              ))}
            </div>
          ))}
        </div>
        
        <div style={{
          borderTop: "1px solid #1a1a1a",
          paddingTop: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "#333",
            letterSpacing: 2,
          }}>
            © 2026 STRATUM EDGE CO. — MUENSTER, TEXAS
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: "#333",
            letterSpacing: 2,
          }}>
            CNC MACHINED ON HAAS EQUIPMENT
          </span>
        </div>
      </footer>
    </div>
  );
};

export default StratumEdgeLanding;
