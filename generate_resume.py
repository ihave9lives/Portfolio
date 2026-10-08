from fpdf import FPDF

class ResumePDF(FPDF):
    def header(self):
        pass
    def footer(self):
        pass

pdf = ResumePDF()
pdf.set_auto_page_break(auto=True, margin=10)
pdf.add_page()

# ---- Colors ----
DARK_BG = (18, 18, 24)
ACCENT = (56, 189, 248)  # sky-400
MUTED = (148, 163, 184)
WHITE = (255, 255, 255)
LIGHT_GRAY = (226, 232, 240)

# ---- Helpers ----
def section_title(title):
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 6, title, new_x="LMARGIN", new_y="NEXT")
    pdf.set_draw_color(*ACCENT)
    pdf.line(pdf.l_margin, pdf.get_y(), pdf.w - pdf.r_margin, pdf.get_y())
    pdf.ln(2)

def body_text(text, size=8.5, bold=False, color=WHITE):
    pdf.set_font("Helvetica", "B" if bold else "", size)
    pdf.set_text_color(*color)
    pdf.multi_cell(0, 4, text)
    pdf.ln(0.5)

def bullet(text, indent=6, size=8):
    x = pdf.get_x()
    pdf.set_x(x + indent)
    pdf.set_font("Helvetica", "", size)
    pdf.set_text_color(*WHITE)
    pdf.multi_cell(pdf.w - pdf.l_margin - pdf.r_margin - indent, 3.8, "- " + text)
    pdf.ln(0.3)

# ---- HEADER ----
pdf.set_fill_color(*DARK_BG)
pdf.rect(0, 0, pdf.w, pdf.h, "F")

pdf.set_font("Helvetica", "B", 20)
pdf.set_text_color(*ACCENT)
pdf.cell(0, 9, "SASHANKAR J", new_x="LMARGIN", new_y="NEXT", align="C")

pdf.set_font("Helvetica", "", 8)
pdf.set_text_color(*MUTED)
contact = "Bangalore, India  |  +91 80886 72269  |  sashankarj2999@gmail.com  |  juug24btech20500@jainuniversity.ac.in"
pdf.cell(0, 4, contact, new_x="LMARGIN", new_y="NEXT", align="C")
links = "github.com/ihave9lives  |  linkedin.com/in/sashankar-j-30399a3b1  |  cyberpunk-portfolio-inky.vercel.app"
pdf.cell(0, 4, links, new_x="LMARGIN", new_y="NEXT", align="C")
pdf.ln(3)

# ---- SUMMARY ----
section_title("SUMMARY")
body_text(
    "B.Tech CSE (AI-Driven DevOps) student bridging intelligent systems and scalable infrastructure. "
    "Build desktop apps in Rust/Tauri, data & AI pipelines in Python, and agentic workflows with Hermes/ChatML. "
    "Ship end-to-end: architecture, UI/UX (glassmorphism), cross-platform compilation, and CI/CD."
)

# ---- EDUCATION ----
section_title("EDUCATION")
pdf.set_font("Helvetica", "B", 8.5)
pdf.set_text_color(*WHITE)
pdf.cell(0, 4.5, "Bachelor of Technology in Computer Science and Engineering (AI Driven DevOps)", new_x="LMARGIN", new_y="NEXT")
pdf.set_font("Helvetica", "", 8)
pdf.set_text_color(*MUTED)
pdf.cell(0, 4.5, "Jain (Deemed-to-be University), Bangalore  |  Expected 2028", new_x="LMARGIN", new_y="NEXT")
pdf.set_text_color(*WHITE)
pdf.cell(0, 4.5, "Relevant Coursework: Algorithms, ML, Network Layers, Data Structures, Cloud Computing, MLOps", new_x="LMARGIN", new_y="NEXT")
pdf.ln(1.5)

# ---- TECHNICAL SKILLS ----
section_title("TECHNICAL SKILLS")
skills = [
    ("Programming", "Python, Rust, TypeScript/JavaScript, SQL, CSS, HTML"),
    ("Frameworks & Tools", "Tauri 2, React, Streamlit, FastAPI/Flask, Next.js, Three.js, Git, Docker, cargo-xwin, Windows MSVC, Jupyter"),
    ("AI & Agentic Systems", "LLM Function Calling, Hermes Agent (Nous Research), ChatML, SOUL.md Context Mgmt, Prompt Engineering, Local Model Inference"),
    ("Core Competencies", "Algorithm Design, Glassmorphism UI/UX, Cross-Platform Dev, Systems Compilation, API Design, Multi-target (Windows/Android)"),
]
for label, val in skills:
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_text_color(*ACCENT)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 4.5, label + ":")
    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(*WHITE)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 4, val)
    pdf.ln(0.5)
pdf.ln(0.5)

# ---- PROJECTS ----
section_title("PROJECTS")
projects = [
    ("Lumen - Desktop Game Launcher", "Rust + Tauri 2 + React + TypeScript",
     "Cross-platform game launcher with glassmorphic UI. Auto-discovers libraries via local process/file scanning (Steam, Epic, local). Typed IPC command bindings for safe frontend-backend communication. Per-session playtime tracking. Native Windows compilation pipeline with cargo-xwin and windows-sys."),
    ("Autoflix Interactive - Streaming Media App", "Python + Streamlit + ani-cli + Async",
     "Premium frosted-glass Streamlit UI via custom HTML/CSS injections. Orchestrates ani-cli as managed subprocess engine. Async background processes keep UI responsive. Local media player integration."),
    ("Campus Life Hub - Smart Campus Platform", "FastAPI/Flask + SQL + Full-Stack + IoT",
     "REST API with clean resource modeling for student-life workflows. Full event lifecycle (draft, publish, RSVP, archive). Sensor data integration (library seats, transit, events) to actionable insights."),
    ("AI System Monitor - Infra Watchdog", "Python + FastAPI + Streamlit + Docker + Kubernetes + ML",
     "Real-time CPU/memory/process telemetry. AI-driven anomaly prediction beyond threshold alerts. Infrastructure health insights in plain language. Containerized, K8s-ready."),
    ("Emberfall Valley - Low-Poly Web Adventure", "Three.js + WebGL + JavaScript (Procedural)",
     "Fully procedural stylized low-poly 3D world, zero imported assets. Runs offline in browser once loaded. Pure Three.js implementation."),
    ("Infra Log Analyzer - AI-Powered Ops Tooling", "Python + Rust + TypeScript + React + IsolationForest",
     "Multi-stack pipeline ingesting raw infra logs, surfacing anomalies/root causes. Rust file I/O, IsolationForest detection, glassmorphism React dashboard. Methodology documented in TeX."),
    ("Portfolio - Glassmorphic Next.js Site", "Next.js + TypeScript + Framer Motion + Tailwind + Vercel",
     "Particle canvas, cursor glow, scroll reveals. Turbopack, CI/CD on Vercel. Deployed at cyberpunk-portfolio-inky.vercel.app"),
]
for title, stack, desc in projects:
    pdf.set_font("Helvetica", "B", 8.5)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 4.5, title, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "I", 7.5)
    pdf.set_text_color(*ACCENT)
    pdf.cell(0, 4, stack, new_x="LMARGIN", new_y="NEXT")
    pdf.set_font("Helvetica", "", 8)
    pdf.set_text_color(*LIGHT_GRAY)
    pdf.multi_cell(0, 3.8, desc)
    pdf.ln(1)

# ---- EXTRACURRICULARS & ACHIEVEMENTS ----
section_title("EXTRACURRICULARS & ACHIEVEMENTS")
achievements = [
    "Smart India Hackathon (SIH) 2026 - Participant: Built end-to-end solution for PS26171 (Orbitveil) - AI-powered PII redaction with checksum-gated Indian identifiers (Aadhaar/Verhoeff, PAN, GSTIN, IFSC), air-gap kill switch, held-out eval n=100 (92/92).",
    "Agentic AI: Design layered system prompts with explicit role boundaries, strict JSON tool schemas, multi-turn tool loops, and parser-feedback error recovery for Nous Research Hermes models.",
    "Technical Problem Solving: Mastered algorithmic concepts - Merge Intervals, Linked List manipulations, advanced data structures for technical assessments.",
    "Competitions: Active in hackathons and CTF events - rapid software prototyping and cybersecurity problem-solving.",
    "Open Source: 7 public repositories on GitHub (ihave9lives) spanning Rust, Python, TypeScript, AI/ML, DevOps, and game dev.",
]
for a in achievements:
    bullet(a, indent=6, size=8)

# Save
output_path = r"C:\Users\Sashankar J\portfolio-cyberpunk\public\Sashankar_J_Resume.pdf"
pdf.output(output_path)
print(f"Saved to {output_path}")
print(f"Pages: {pdf.pages_count}")