import { useState, useEffect, useRef } from "react";

const WaypointLanding = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeBrand, setActiveBrand] = useState(0);
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
      { threshold: 0.12 }
    );
    observerRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const brands = [
    {
      name: "STRATUM EDGE CO.",
      desc: "Titanium EDC tools & accessories",
      category: "EVERYDAY CARRY",
      color: "#B87333",
      url: "stratumedgeco.com",
    },
    {
      name: "HIGHPOINT TRAILWORKS",
      desc: "Vehicle-specific overlanding accessories",
      category: "OVERLANDING",
      color: "#7A8B5C",
      url: "highpointtrailworks.com",
    },
    {
      name: "COLD BORE COLLECTIVE",
      desc: "Precision firearms accessories",
      category: "FIREARMS",
      color: "#8B7355",
      url: "coldborecollective.com",
    },
  ];

  const equipment = [
    { name: "HAAS VF-2", type: "CNC Vertical Mill", spec: "30\" × 16\" × 20\" travel" },
    { name: "HAAS ST-20", type: "CNC Lathe", spec: "20\" swing, 2\" bar capacity" },
    { name: "FIBER LASER", type: "Engraver", spec: "Deep etch & serialization" },
    { name: "INSPECTION", type: "Metrology", spec: "Mitutoyo digital measurement" },
  ];

  const materials = [
    { grade: "6AL-4V", name: "Grade 5 Titanium", use: "Primary — tools, clips, hardware" },
    { grade: "6061-T6", name: "Aluminum", use: "Secondary — lightweight components" },
    { grade: "17-4 PH", name: "Stainless Steel", use: "High-load fasteners & springs" },
    { grade: "C360", name: "Brass", use: "Accent components & weights" },
  ];

  return (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      background: "#F4F1EB",
      color: "#1A1A18",
      minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Oswald:wght@300;400;500;600;700&family=Source+Serif+4:wght@300;400;600&display=swap');
        
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        ::selection { background: #2C2C28; color: #F4F1EB; }
        
        .fade-up-w {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .fade-up-w.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .wp-btn {
          background: #2C2C28;
          color: #F4F1EB;
          border: none;
          padding: 16px 40px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .wp-btn:hover {
          background: #3D3D38;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
        
        .wp-btn-ghost {
          background: transparent;
          color: #2C2C28;
          border: 1.5px solid #2C2C28;
          padding: 16px 40px;
          font-family: 'Space Mono', monospace;
          font-size: 10px;
          letter-spacing: 3px;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .wp-btn-ghost:hover {
          background: #2C2C28;
          color: #F4F1EB;
        }
        
        .brand-tab {
          padding: 20px 24px;
          cursor: pointer;
          border-left: 3px solid transparent;
          transition: all 0.4s ease;
          background: transparent;
        }
        .brand-tab:hover {
          background: rgba(44,44,40,0.03);
        }
        .brand-tab.active {
          background: rgba(44,44,40,0.04);
        }
        
        .equip-card {
          padding: 28px;
          border: 1px solid #DDD8D0;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          background: rgba(255,255,255,0.5);
        }
        .equip-card:hover {
          border-color: #2C2C28;
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.06);
          background: #fff;
        }
        
        .topo-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 80 Q50 60 100 80 T200 80' fill='none' stroke='%23DDD8D0' stroke-width='0.5'/%3E%3Cpath d='M0 100 Q50 80 100 100 T200 100' fill='none' stroke='%23DDD8D0' stroke-width='0.5'/%3E%3Cpath d='M0 120 Q50 100 100 120 T200 120' fill='none' stroke='%23DDD8D0' stroke-width='0.5'/%3E%3Cpath d='M0 60 Q50 40 100 60 T200 60' fill='none' stroke='%23E8E4DD' stroke-width='0.3'/%3E%3Cpath d='M0 140 Q50 120 100 140 T200 140' fill='none' stroke='%23E8E4DD' stroke-width='0.3'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 48px",
        height: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrollY > 60 ? "rgba(244,241,235,0.95)" : "transparent",
        backdropFilter: scrollY > 60 ? "blur(16px)" : "none",
        borderBottom: scrollY > 60 ? "1px solid #DDD8D0" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Logo mark — stylized W in a diamond */}
          <div style={{
            width: 32, height: 32,
            border: "1.5px solid #2C2C28",
            transform: "rotate(45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <span style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              transform: "rotate(-45deg)",
              color: "#2C2C28",
            }}>W</span>
          </div>
          <div>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: 3,
              lineHeight: 1,
            }}>WAYPOINT</div>
            <div style={{
              fontSize: 7,
              letterSpacing: 3.5,
              color: "#888",
              lineHeight: 1,
              marginTop: 2,
            }}>MACHINE WORKS</div>
          </div>
        </div>
        
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["ABOUT", "CAPABILITIES", "BRANDS", "WHOLESALE", "CONTACT"].map((item) => (
            <a key={item} href="#" style={{
              color: "#777",
              textDecoration: "none",
              fontSize: 9,
              letterSpacing: 3,
              transition: "color 0.3s",
            }}
              onMouseEnter={(e) => e.target.style.color = "#2C2C28"}
              onMouseLeave={(e) => e.target.style.color = "#777"}
            >{item}</a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section className="topo-bg" style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "0 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Large background text */}
        <div style={{
          position: "absolute",
          bottom: -20,
          right: -20,
          fontFamily: "'Oswald', sans-serif",
          fontSize: "clamp(120px, 18vw, 240px)",
          fontWeight: 700,
          color: "rgba(44,44,40,0.03)",
          lineHeight: 0.85,
          letterSpacing: -4,
          pointerEvents: "none",
          textAlign: "right",
        }}>
          MACHINE
          <br />
          WORKS
        </div>
        
        {/* Coordinate marks */}
        <div style={{
          position: "absolute",
          top: 120,
          right: 48,
          textAlign: "right",
          opacity: 0.2,
        }}>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#888" }}>33.6518° N</div>
          <div style={{ fontSize: 9, letterSpacing: 2, color: "#888" }}>97.3742° W</div>
          <div style={{ fontSize: 8, letterSpacing: 2, color: "#aaa", marginTop: 4 }}>MUENSTER, TX</div>
        </div>

        <div style={{ maxWidth: 680, position: "relative", zIndex: 2 }}>
          <div style={{
            fontSize: 9,
            letterSpacing: 4,
            color: "#999",
            marginBottom: 20,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{ width: 40, height: 1, background: "#999" }} />
            PRECISION CNC MANUFACTURING — EST. 2026
          </div>
          
          <h1 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: "clamp(42px, 6vw, 72px)",
            fontWeight: 600,
            lineHeight: 1.05,
            color: "#2C2C28",
            marginBottom: 28,
            letterSpacing: -1,
          }}>
            Where Raw Billet
            <br />
            Becomes{" "}
            <span style={{
              fontFamily: "'Source Serif 4', serif",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#5C5A54",
            }}>Something</span>
            <br />
            Worth Carrying.
          </h1>
          
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 16,
            lineHeight: 1.9,
            color: "#777",
            maxWidth: 460,
            marginBottom: 40,
            fontWeight: 300,
          }}>
            Waypoint Machine Works is a precision CNC manufacturing operation 
            in Muenster, Texas. We design, machine, and ship premium hard goods 
            across multiple brands — all from one shop, one set of machines, 
            one standard of quality.
          </p>
          
          <div style={{ display: "flex", gap: 16 }}>
            <button className="wp-btn">OUR BRANDS</button>
            <button className="wp-btn-ghost">WHOLESALE INQUIRY</button>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        padding: "32px 48px",
        background: "#2C2C28",
        display: "flex",
        justifyContent: "center",
        gap: 80,
      }}>
        {[
          { val: "6AL-4V", label: "PRIMARY ALLOY" },
          { val: ".001\"", label: "TOLERANCE" },
          { val: "3", label: "BRANDS" },
          { val: "1", label: "MACHINE SHOP" },
        ].map(({ val, label }) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 28,
              fontWeight: 500,
              color: "#F4F1EB",
              letterSpacing: 1,
            }}>{val}</div>
            <div style={{
              fontSize: 8,
              letterSpacing: 3,
              color: "#777",
              marginTop: 4,
            }}>{label}</div>
          </div>
        ))}
      </section>

      {/* ABOUT / CAPABILITIES */}
      <section
        id="wp-about"
        ref={(el) => (observerRefs.current[0] = el)}
        className={`fade-up-w ${isVisible["wp-about"] ? "visible" : ""}`}
        style={{
          padding: "100px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
        }}
      >
        {/* Image placeholder */}
        <div style={{
          background: "#E8E4DD",
          minHeight: 480,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}>
          <div style={{
            textAlign: "center",
          }}>
            <div style={{
              width: 80, height: 80,
              border: "2px solid #CCC8C0",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}>
              <span style={{
                fontFamily: "'Oswald', sans-serif",
                fontSize: 24,
                color: "#AAA",
              }}>▶</span>
            </div>
            <span style={{ fontSize: 9, letterSpacing: 2, color: "#999" }}>
              WATCH: INSIDE THE SHOP
            </span>
          </div>
          
          {/* Corner brackets */}
          <div style={{ position: "absolute", top: 16, left: 16, width: 24, height: 24, borderTop: "2px solid #CCC8C0", borderLeft: "2px solid #CCC8C0" }} />
          <div style={{ position: "absolute", top: 16, right: 16, width: 24, height: 24, borderTop: "2px solid #CCC8C0", borderRight: "2px solid #CCC8C0" }} />
          <div style={{ position: "absolute", bottom: 16, left: 16, width: 24, height: 24, borderBottom: "2px solid #CCC8C0", borderLeft: "2px solid #CCC8C0" }} />
          <div style={{ position: "absolute", bottom: 16, right: 16, width: 24, height: 24, borderBottom: "2px solid #CCC8C0", borderRight: "2px solid #CCC8C0" }} />
        </div>

        <div>
          <div style={{
            fontSize: 9,
            letterSpacing: 4,
            color: "#999",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <div style={{ width: 24, height: 1, background: "#CCC" }} />
            CAPABILITIES
          </div>
          
          <h2 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: 1,
            marginBottom: 24,
            lineHeight: 1.15,
          }}>
            One Shop.
            <br />
            Every Product.
          </h2>
          
          <p style={{
            fontFamily: "'Source Serif 4', serif",
            fontSize: 15,
            lineHeight: 1.9,
            color: "#777",
            marginBottom: 40,
          }}>
            Every product across every brand in the Waypoint portfolio 
            is machined on the same equipment, from the same materials, 
            to the same tolerances. No outsourcing, no contract shops, 
            no compromise.
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}>
            {equipment.map((eq, i) => (
              <div key={i} className="equip-card">
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 18,
                  fontWeight: 500,
                  marginBottom: 4,
                  letterSpacing: 1,
                }}>{eq.name}</div>
                <div style={{
                  fontSize: 9,
                  letterSpacing: 2,
                  color: "#999",
                  marginBottom: 8,
                }}>{eq.type.toUpperCase()}</div>
                <div style={{
                  fontSize: 10,
                  color: "#888",
                }}>{eq.spec}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIALS TABLE */}
      <section
        id="wp-materials"
        ref={(el) => (observerRefs.current[1] = el)}
        className={`fade-up-w ${isVisible["wp-materials"] ? "visible" : ""}`}
        style={{
          padding: "80px 48px",
          background: "#EDEAE4",
        }}
      >
        <div style={{
          maxWidth: 800,
          margin: "0 auto",
        }}>
          <div style={{
            fontSize: 9,
            letterSpacing: 4,
            color: "#999",
            marginBottom: 16,
            textAlign: "center",
          }}>MATERIALS</div>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: 1,
            marginBottom: 40,
            textAlign: "center",
          }}>What We Cut</h2>

          <div style={{ borderTop: "2px solid #2C2C28" }}>
            {materials.map((mat, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "100px 180px 1fr",
                gap: 24,
                padding: "18px 0",
                borderBottom: "1px solid #DDD8D0",
                alignItems: "center",
              }}>
                <span style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 16,
                  fontWeight: 500,
                  letterSpacing: 1,
                }}>{mat.grade}</span>
                <span style={{
                  fontSize: 12,
                  color: "#666",
                }}>{mat.name}</span>
                <span style={{
                  fontSize: 11,
                  color: "#999",
                  textAlign: "right",
                }}>{mat.use}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND PORTFOLIO */}
      <section
        id="wp-brands"
        ref={(el) => (observerRefs.current[2] = el)}
        className={`fade-up-w ${isVisible["wp-brands"] ? "visible" : ""}`}
        style={{
          padding: "100px 48px",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{
            fontSize: 9,
            letterSpacing: 4,
            color: "#999",
            marginBottom: 16,
          }}>OUR BRANDS</div>
          <h2 style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 36,
            fontWeight: 600,
            letterSpacing: 1,
          }}>Three Brands. One Standard.</h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 0,
          maxWidth: 900,
          margin: "0 auto",
          border: "1px solid #DDD8D0",
        }}>
          {/* Brand tabs */}
          <div style={{ borderRight: "1px solid #DDD8D0" }}>
            {brands.map((brand, i) => (
              <div
                key={i}
                className={`brand-tab ${activeBrand === i ? "active" : ""}`}
                onClick={() => setActiveBrand(i)}
                style={{
                  borderLeftColor: activeBrand === i ? brand.color : "transparent",
                  borderBottom: i < brands.length - 1 ? "1px solid #DDD8D0" : "none",
                }}
              >
                <div style={{
                  fontSize: 8,
                  letterSpacing: 3,
                  color: activeBrand === i ? brand.color : "#bbb",
                  marginBottom: 6,
                  transition: "color 0.3s",
                }}>{brand.category}</div>
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: 1,
                  color: activeBrand === i ? "#2C2C28" : "#999",
                  transition: "color 0.3s",
                }}>{brand.name}</div>
              </div>
            ))}
          </div>

          {/* Brand detail */}
          <div style={{
            padding: 40,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            background: "rgba(255,255,255,0.4)",
          }}>
            <div style={{
              width: 48, height: 3,
              background: brands[activeBrand].color,
              marginBottom: 20,
              transition: "background 0.4s",
            }} />
            <h3 style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 12,
            }}>{brands[activeBrand].name}</h3>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 15,
              lineHeight: 1.8,
              color: "#777",
              marginBottom: 24,
            }}>{brands[activeBrand].desc}</p>
            <div style={{
              fontSize: 10,
              color: "#999",
              letterSpacing: 1,
              marginBottom: 24,
            }}>
              → {brands[activeBrand].url}
            </div>
            <button className="wp-btn" style={{ alignSelf: "flex-start", fontSize: 9 }}>
              VISIT STORE →
            </button>
          </div>
        </div>
      </section>

      {/* WHOLESALE CTA */}
      <section style={{
        padding: "80px 48px",
        background: "#2C2C28",
        textAlign: "center",
      }}>
        <div style={{
          fontSize: 9,
          letterSpacing: 4,
          color: "#666",
          marginBottom: 16,
        }}>WHOLESALE & B2B</div>
        <h2 style={{
          fontFamily: "'Oswald', sans-serif",
          fontSize: 32,
          fontWeight: 600,
          color: "#F4F1EB",
          letterSpacing: 1,
          marginBottom: 16,
        }}>Work With Us</h2>
        <p style={{
          fontFamily: "'Source Serif 4', serif",
          fontSize: 14,
          color: "#888",
          maxWidth: 460,
          margin: "0 auto 32px",
          lineHeight: 1.8,
        }}>
          Retailers, distributors, and contract machining inquiries welcome. 
          Tell us about your project.
        </p>
        <button style={{
          background: "transparent",
          color: "#F4F1EB",
          border: "1.5px solid #555",
          padding: "16px 40px",
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          letterSpacing: 3,
          cursor: "pointer",
          transition: "all 0.3s ease",
          textTransform: "uppercase",
        }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = "#F4F1EB";
            e.target.style.background = "rgba(244,241,235,0.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = "#555";
            e.target.style.background = "transparent";
          }}
        >SUBMIT INQUIRY →</button>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: "60px 48px 32px",
        background: "#1E1E1C",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: 60,
          marginBottom: 48,
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{
                width: 28, height: 28,
                border: "1.5px solid #555",
                transform: "rotate(45deg)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 12,
                  fontWeight: 600,
                  transform: "rotate(-45deg)",
                  color: "#888",
                }}>W</span>
              </div>
              <div>
                <div style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 3,
                  color: "#999",
                }}>WAYPOINT MACHINE WORKS</div>
              </div>
            </div>
            <p style={{
              fontFamily: "'Source Serif 4', serif",
              fontSize: 12,
              color: "#555",
              lineHeight: 1.8,
              maxWidth: 300,
            }}>
              Precision CNC manufacturing in Muenster, Texas. 
              Titanium, aluminum, stainless, and brass — machined 
              in-house from raw billet to finished product.
            </p>
          </div>
          
          <div>
            <div style={{
              fontSize: 9,
              letterSpacing: 3,
              color: "#666",
              marginBottom: 16,
            }}>COMPANY</div>
            {["About", "Capabilities", "Our Brands", "Wholesale", "Contact"].map((link) => (
              <a key={link} href="#" style={{
                display: "block",
                color: "#555",
                fontSize: 11,
                textDecoration: "none",
                marginBottom: 10,
              }}>{link}</a>
            ))}
          </div>
          
          <div>
            <div style={{
              fontSize: 9,
              letterSpacing: 3,
              color: "#666",
              marginBottom: 16,
            }}>LOCATION</div>
            <p style={{ fontSize: 11, color: "#555", lineHeight: 1.8 }}>
              Muenster, Texas
              <br />
              Cooke County
              <br />
              United States
            </p>
            <div style={{
              fontSize: 9,
              color: "#444",
              marginTop: 12,
              letterSpacing: 1,
            }}>
              33.6518° N, 97.3742° W
            </div>
          </div>
        </div>
        
        <div style={{
          borderTop: "1px solid #2C2C28",
          paddingTop: 16,
          display: "flex",
          justifyContent: "space-between",
        }}>
          <span style={{ fontSize: 9, color: "#444", letterSpacing: 2 }}>
            © 2026 WAYPOINT MACHINE WORKS LLC
          </span>
          <span style={{ fontSize: 9, color: "#444", letterSpacing: 2 }}>
            SANGER, TX
          </span>
        </div>
      </footer>
    </div>
  );
};

export default WaypointLanding;
