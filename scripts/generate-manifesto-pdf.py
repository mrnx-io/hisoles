#!/usr/bin/env python3
"""
THE MANIFESTO PDF Generator
Ma & Marrow: A Philosophy for the Biological Renaissance

A museum-quality single-document PDF expressing the unified philosophy.
Now includes: First Principles Protocol + The Paradox (Mysterious yet Logical)
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path

# ═══════════════════════════════════════════════════════════════════════════════
# DESIGN TOKENS
# ═══════════════════════════════════════════════════════════════════════════════

WASHI = HexColor("#FCFAF5")
SUMI = HexColor("#1A1A1A")
PERSIMMON = HexColor("#E85D04")
STONE = HexColor("#4A4A4A")
MIST = HexColor("#E8E6E1")

PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 28 * mm
INNER_WIDTH = PAGE_WIDTH - (2 * MARGIN)

TYPE_WHISPER = 8
TYPE_BODY = 10
TYPE_LEAD = 12
TYPE_HEADING = 18
TYPE_DISPLAY = 36
TYPE_HERO = 72

MA_BREATH = 8 * mm
MA_PAUSE = 16 * mm
MA_REST = 32 * mm

FONT_DIR = Path.home() / ".claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts"

try:
    pdfmetrics.registerFont(TTFont("Display", str(FONT_DIR / "InstrumentSans-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Body", str(FONT_DIR / "CrimsonPro-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("BodyItalic", str(FONT_DIR / "CrimsonPro-Italic.ttf")))
    pdfmetrics.registerFont(TTFont("Mono", str(FONT_DIR / "GeistMono-Regular.ttf")))
except Exception as e:
    print(f"Font warning: {e}")


def bg(c):
    c.setFillColor(WASHI)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)


def hr(c, x1, x2, y, color=MIST, w=0.5):
    c.setStrokeColor(color)
    c.setLineWidth(w)
    c.line(x1, y, x2, y)


def vr(c, x, y1, y2, color=MIST, w=0.5):
    c.setStrokeColor(color)
    c.setLineWidth(w)
    c.line(x, y1, x, y2)


def pn(c, n):
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawRightString(PAGE_WIDTH - MARGIN, MARGIN, f"{n:02d}")


def create_manifesto():
    output = Path("docs/THE-MANIFESTO.pdf")
    c = canvas.Canvas(str(output), pagesize=A4)

    # ═══════════════════════════════════════════════════════════════════════════
    # PAGE 1: COVER
    # ═══════════════════════════════════════════════════════════════════════════
    bg(c)
    vr(c, MARGIN, MA_REST, PAGE_HEIGHT - MA_REST, STONE, 1)

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HERO)
    c.drawString(MARGIN + MA_PAUSE, PAGE_HEIGHT / 2 + 60 * mm, "THE")
    c.drawString(MARGIN + MA_PAUSE, PAGE_HEIGHT / 2 + 20 * mm, "MANIFESTO")

    c.setFillColor(PERSIMMON)
    c.circle(PAGE_WIDTH - MARGIN - MA_PAUSE, PAGE_HEIGHT / 2 + 70 * mm, 4 * mm, fill=1, stroke=0)

    c.setFillColor(STONE)
    c.setFont("Body", TYPE_LEAD)
    c.drawString(MARGIN + MA_PAUSE, PAGE_HEIGHT / 2 - MA_PAUSE, "Ma & Marrow")
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN + MA_PAUSE, PAGE_HEIGHT / 2 - MA_PAUSE - 16, "A Philosophy for the Biological Renaissance")

    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN + MA_PAUSE, MA_REST, "2025 — 2035")

    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # PAGE 2: THE AXIOM
    # ═══════════════════════════════════════════════════════════════════════════
    bg(c)

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_BREATH, "I — THE AXIOM")

    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN, y, "Perfection is a commodity.")

    c.setFillColor(SUMI)
    c.drawString(MARGIN, y - 24, "Reality is a luxury.")

    hr(c, MARGIN, MARGIN + 100 * mm, y - MA_PAUSE - MA_BREATH, PERSIMMON, 1.5)

    y -= MA_REST + MA_PAUSE
    c.setFont("Body", TYPE_LEAD)
    c.setFillColor(SUMI)

    axiom = [
        "In an age where Artificial Intelligence generates infinite",
        "variations of flawless geometry in a nanosecond, the concept",
        "of 'smoothness' has depreciated to zero.",
        "",
        "When the virtual world offers a hallucination of eternal,",
        "frictionless symmetry, the human spirit retreats to the only",
        "fortress the algorithm cannot conquer:",
    ]

    for line in axiom:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 16

    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_DISPLAY)
    c.drawString(MARGIN, y - MA_BREATH, "Entropy.")

    y -= MA_REST + MA_PAUSE

    c.setFillColor(SUMI)
    c.setFont("BodyItalic", TYPE_LEAD)
    c.drawString(MARGIN, y, "We are no longer consumers of content.")
    y -= 18
    c.drawString(MARGIN, y, "We are custodians of biology.")

    pn(c, 2)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # PAGE 3: FIRST PRINCIPLES PROTOCOL
    # ═══════════════════════════════════════════════════════════════════════════
    bg(c)

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_BREATH, "II — THE FIRST PRINCIPLES PROTOCOL")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST
    c.drawString(MARGIN, y, "Derive from Axioms")

    c.setFont("BodyItalic", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN, y, "How to derive any decision from irreducible truths")

    y -= MA_PAUSE + MA_BREATH
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)
    c.drawString(MARGIN, y, "We do not reason by analogy ('others do it this way').")
    y -= 14
    c.drawString(MARGIN, y, "We reason by axiom ('what is necessarily true?').")

    y -= MA_PAUSE

    # The Protocol
    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "THE PROTOCOL")

    steps = [
        "1. IDENTIFY the decision to be made",
        "2. STRIP away assumptions until only physics remains",
        "3. ASK which axiom governs this domain",
        "4. DERIVE the answer from the axiom, not from convention",
        "5. VERIFY against the Decision Filters",
    ]

    y -= MA_BREATH
    c.setFillColor(SUMI)
    c.setFont("Mono", TYPE_WHISPER)
    for step in steps:
        c.drawString(MARGIN + MA_BREATH, y, step)
        y -= 12

    y -= MA_PAUSE

    # Irreducible Truths
    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "THE IRREDUCIBLE TRUTHS")

    truths = [
        ("Economics", "Infinite supply → Zero value"),
        ("Biology", "Cortisol degrades the organism"),
        ("Neurology", "The primate brain seeks texture"),
        ("Physics", "Entropy increases over time"),
        ("Psychology", "Mystery engages imagination"),
    ]

    y -= MA_BREATH
    for domain, axiom_text in truths:
        c.setFillColor(SUMI)
        c.setFont("Display", TYPE_WHISPER)
        c.drawString(MARGIN, y, domain)
        c.setFillColor(STONE)
        c.setFont("Body", TYPE_WHISPER)
        c.drawString(MARGIN + 30 * mm, y, axiom_text)
        y -= 12

    y -= MA_PAUSE

    # Derivation Chain
    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "THE DERIVATION CHAIN")

    chain = [
        "AXIOM → PRINCIPLE → PILLAR → APPLICATION → TOKEN",
        "",
        "Example:",
        "What machines replicate infinitely cannot be precious",
        "    → Value accrues to entropy, not perfection",
        "    → Physics of the Flaw",
        "    → Use materials that age",
        "    → Clockwork Colors",
    ]

    y -= MA_BREATH
    c.setFillColor(SUMI)
    c.setFont("Mono", TYPE_WHISPER)
    for line in chain:
        if line == "":
            y -= 4
        else:
            c.drawString(MARGIN, y, line)
            y -= 10

    pn(c, 3)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # PAGE 4: THE PARADOX (Mysterious yet Logical)
    # ═══════════════════════════════════════════════════════════════════════════
    bg(c)

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_BREATH, "III — THE PARADOX")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST
    c.drawString(MARGIN, y, "Mysterious yet Logical")

    hr(c, MARGIN, MARGIN + 80 * mm, y - MA_BREATH, PERSIMMON, 1.5)

    y -= MA_REST
    c.setFont("Body", TYPE_LEAD)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "The highest form of design holds two truths in tension:")

    y -= MA_PAUSE

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_BODY)
    c.drawString(MARGIN, y, "It must be completely logical.")
    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= 14
    c.drawString(MARGIN, y, "Every element must derive from first principles. Every choice")
    y -= 12
    c.drawString(MARGIN, y, "must trace to an axiom. The rational mind must find nothing to question.")

    y -= MA_PAUSE

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_BODY)
    c.drawString(MARGIN, y, "It must be deeply mysterious.")
    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= 14
    c.drawString(MARGIN, y, "The emotional response must exceed the sum of logical parts.")
    y -= 12
    c.drawString(MARGIN, y, "The whole must be greater than what analysis can explain.")

    y -= MA_PAUSE

    c.setFillColor(SUMI)
    c.setFont("BodyItalic", TYPE_LEAD)
    c.drawString(MARGIN, y, "This is not contradiction. This is Yūgen applied to philosophy itself.")

    y -= MA_REST

    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "THE RESOLUTION")

    y -= MA_BREATH
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)
    c.drawString(MARGIN, y, "Logic determines what is present.")
    y -= 16
    c.drawString(MARGIN, y, "Mystery emerges from what is absent.")

    y -= MA_PAUSE
    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "The shadow cast by the structure is not in the blueprint,")
    y -= 12
    c.drawString(MARGIN, y, "yet it is the most important part of the experience.")

    y -= MA_PAUSE + MA_BREATH
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN, y, '"The explicable creates trust. The inexplicable creates devotion."')

    y -= MA_REST

    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "THE METHOD")

    method = [
        "1. Build with ruthless logic (first principles, axiom-derived)",
        "2. Remove until nothing else can be removed (Ma)",
        "3. The mystery will emerge from what remains (Yūgen)",
    ]

    y -= MA_BREATH
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)
    for step in method:
        c.drawString(MARGIN, y, step)
        y -= 14

    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN, MARGIN + MA_REST, '"Logic is the skeleton. Mystery is the breath."')

    pn(c, 4)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # PAGE 5-9: THE FIVE PILLARS (condensed to fit)
    # ═══════════════════════════════════════════════════════════════════════════

    # Pillar 1: Physics of the Flaw
    bg(c)
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_BREATH, "IV — THE FIVE PILLARS")

    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_HERO)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE, "1")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN + 25 * mm, y, "Physics of the Flaw")

    c.setFont("BodyItalic", TYPE_LEAD)
    c.setFillColor(STONE)
    c.drawString(MARGIN + 25 * mm, y - 20, "Entropy as Value")

    y -= MA_REST + MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)

    p1 = [
        "What a machine can infinitely replicate, it cannot make precious.",
        "",
        "Value is no longer derived from complexity, but from Time—",
        "the capacity to age, to bruise, to die.",
        "",
        "Clockwork Materials: Unsealed copper that greens. Raw linen",
        "that softens. Limestone that stains with tea. A crack in a",
        "ceramic bowl is a receipt of reality.",
    ]

    for line in p1:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    y -= MA_PAUSE
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN, y, '"The digital image remembers nothing.')
    c.drawString(MARGIN, y - 12, 'The wood remembers everything."')

    pn(c, 5)
    c.showPage()

    # Pillar 2: Architecture of Cortisol
    bg(c)
    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_HERO)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE, "2")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN + 25 * mm, y, "Architecture of Cortisol")

    c.setFont("BodyItalic", TYPE_LEAD)
    c.setFillColor(STONE)
    c.drawString(MARGIN + 25 * mm, y - 20, "Health as Geometry")

    y -= MA_REST + MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)

    p2 = [
        "Information density is a biological toxin.",
        "",
        "Design is not about what we add, but what we surgically",
        "remove to lower cortisol. Space is an external immune system.",
        "",
        "The Cortisol Vacuum: Ma is not empty—it is pregnant space.",
        "Light is diffracted through Shoji to mimic forest floor.",
        "",
        "We do not build rooms; we build cavities for silence.",
    ]

    for line in p2:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    y -= MA_PAUSE
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN, y, '"In a world of infinite noise, the ultimate luxury is silence."')

    pn(c, 6)
    c.showPage()

    # Pillar 3: Ritual of Friction
    bg(c)
    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_HERO)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE, "3")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN + 25 * mm, y, "Ritual of Friction")

    c.setFont("BodyItalic", TYPE_LEAD)
    c.setFillColor(STONE)
    c.drawString(MARGIN + 25 * mm, y - 20, "Touch as Truth")

    y -= MA_REST + MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)

    p3 = [
        "When robots perform all labor, human activity shifts",
        "from 'production' to 'ritual.'",
        "",
        "The screen is a surface of zero resistance—a slippery lie.",
        "The Biological Renaissance demands Resistance.",
        "",
        "High-Friction Aesthetics: Rough clay. Woven tatami. Cold stone.",
        "",
        "We do not want frictionless. We want the grain of existence.",
    ]

    for line in p3:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    y -= MA_PAUSE
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN, y, '"Smoothness is the camouflage of the machine.')
    c.drawString(MARGIN, y - 12, 'Texture is the fingerprint of the soul."')

    pn(c, 7)
    c.showPage()

    # Pillar 4: Shadow of Intelligence
    bg(c)
    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_HERO)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE, "4")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN + 25 * mm, y, "Shadow of Intelligence")

    c.setFont("BodyItalic", TYPE_LEAD)
    c.setFillColor(STONE)
    c.drawString(MARGIN + 25 * mm, y - 20, "Yūgen")

    y -= MA_REST + MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)

    p4 = [
        "AI thrives in uniform brightness; it needs data lit from all angles.",
        "",
        "The human soul thrives in Yūgen—the profound grace of the unseen.",
        "We design for the shadow.",
        "",
        "We return to Black-Body Radiation: fire, incandescent tungsten,",
        "the deep indigo of twilight.",
        "",
        "In hyper-definition, blur and shadow become the realm of the sacred.",
    ]

    for line in p4:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    y -= MA_PAUSE
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN, y, '"The machine requires data. The soul requires mystery."')

    pn(c, 8)
    c.showPage()

    # Pillar 5: Commerce of Presence
    bg(c)
    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_HERO)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE, "5")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN + 25 * mm, y, "Commerce of Presence")

    c.setFont("BodyItalic", TYPE_LEAD)
    c.setFillColor(STONE)
    c.drawString(MARGIN + 25 * mm, y - 20, "Transaction as Ritual")

    y -= MA_REST + MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)

    p5 = [
        "Purchase is not a conversion event. It is a threshold crossing.",
        "",
        "The exchange becomes a moment of Ma: a deliberate pause",
        "that honors both maker and receiver.",
        "",
        "Ritual Commerce: The intentional threshold. The moment of",
        "commitment that transforms transaction into transformation.",
        "",
        "The brand that respects biology earns loyalty discounts cannot buy.",
    ]

    for line in p5:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    y -= MA_PAUSE
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN, y, '"The algorithm optimizes for conversion.')
    c.drawString(MARGIN, y - 12, 'We optimize for the heartbeat."')

    pn(c, 9)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # PAGE 10: VISUAL EXPRESSION + TOKENS
    # ═══════════════════════════════════════════════════════════════════════════
    bg(c)

    # Background kanji
    c.setFillColor(MIST)
    c.setFont("Display", 180)
    c.drawCentredString(PAGE_WIDTH / 2 + 40 * mm, PAGE_HEIGHT / 2 - 20 * mm, "墨")

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_BREATH, "V — VISUAL EXPRESSION")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_DISPLAY)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN, y, "Sumi Breath")

    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    y -= MA_BREATH
    c.drawString(MARGIN, y, "Where ink becomes architecture, and emptiness becomes eloquence.")

    y -= MA_PAUSE + MA_BREATH

    expressions = [
        ("Ma (間)", "Space as immune system"),
        ("Sumi-e (墨絵)", "Ink as truth"),
        ("Kakemono (掛物)", "Vertical descent"),
        ("Yūgen (幽玄)", "The grace of shadow"),
    ]

    for term, meaning in expressions:
        c.setFillColor(SUMI)
        c.setFont("Display", TYPE_BODY)
        c.drawString(MARGIN, y, term)
        c.setFillColor(STONE)
        c.setFont("Body", TYPE_BODY)
        c.drawString(MARGIN + 45 * mm, y, meaning)
        y -= 18

    y -= MA_PAUSE

    # Tokens
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "CLOCKWORK COLORS")

    colors = [(WASHI, "Washi", "#FCFAF5"), (SUMI, "Sumi", "#1A1A1A"),
              (PERSIMMON, "Persimmon", "#E85D04"), (STONE, "Stone", "#4A4A4A")]

    y -= MA_BREATH
    swatch = 10 * mm
    for color, name, hex_val in colors:
        c.setFillColor(color)
        c.setStrokeColor(MIST)
        c.setLineWidth(0.5)
        c.rect(MARGIN, y - swatch + 3 * mm, swatch, swatch, fill=1, stroke=1)
        c.setFillColor(SUMI)
        c.setFont("Mono", TYPE_WHISPER)
        c.drawString(MARGIN + swatch + 4 * mm, y, name)
        c.setFillColor(STONE)
        c.drawString(MARGIN + swatch + 30 * mm, y, hex_val)
        y -= swatch + 2 * mm

    y -= MA_BREATH

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "MA INTERVALS")

    timings = [("breath", "3600ms"), ("attention", "600ms"),
               ("whisper", "400ms"), ("ma", "80ms")]

    y -= MA_BREATH
    for token, dur in timings:
        c.setFillColor(SUMI)
        c.setFont("Mono", TYPE_WHISPER)
        c.drawString(MARGIN, y, f"--duration-{token}")
        c.setFillColor(STONE)
        c.drawString(MARGIN + 45 * mm, y, dur)
        y -= 10

    pn(c, 10)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # PAGE 11: DECISION FILTERS
    # ═══════════════════════════════════════════════════════════════════════════
    bg(c)

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_BREATH, "VII — DECISION FILTERS")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST
    c.drawString(MARGIN, y, "Before any design decision, ask:")

    filters = [
        ("PHYSICS OF THE FLAW", "Does this material possess the capacity to age?"),
        ("ARCHITECTURE OF CORTISOL", "Does this space reduce biological stress?"),
        ("RITUAL OF FRICTION", "Does this surface engage the fingerprints?"),
        ("SHADOW OF INTELLIGENCE", "Does this environment preserve mystery?"),
        ("COMMERCE OF PRESENCE", "Does this exchange honor the threshold?"),
    ]

    y -= MA_REST

    for pillar, question in filters:
        c.setFillColor(PERSIMMON)
        c.setFont("Mono", TYPE_WHISPER)
        c.drawString(MARGIN, y, pillar)

        c.setFillColor(SUMI)
        c.setFont("Body", TYPE_LEAD)
        y -= 16
        c.drawString(MARGIN, y, question)

        y -= MA_PAUSE

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    c.drawCentredString(PAGE_WIDTH / 2, MARGIN + MA_REST, "If the answer is no, reconsider.")

    pn(c, 11)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # PAGE 12: CLOSING
    # ═══════════════════════════════════════════════════════════════════════════
    bg(c)
    vr(c, MARGIN, MA_REST, PAGE_HEIGHT - MA_REST, MIST, 0.5)

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, PAGE_HEIGHT - MARGIN - MA_BREATH, "VIII — THE CLOSING")

    center_y = PAGE_HEIGHT / 2 + MA_REST

    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)

    closing = [
        "The screen is dark.",
        "The neon is unplugged.",
        "The air is cool.",
        "We are back in the garden.",
    ]

    y = center_y + 30
    for line in closing:
        c.drawCentredString(PAGE_WIDTH / 2, y, line)
        y -= 20

    hr(c, PAGE_WIDTH / 2 - 40 * mm, PAGE_WIDTH / 2 + 40 * mm, y - MA_BREATH, MIST, 0.5)

    y -= MA_REST

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawCentredString(PAGE_WIDTH / 2, y, "We stop optimizing for the algorithm.")

    y -= 24
    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_HEADING)
    c.drawCentredString(PAGE_WIDTH / 2, y, "We start optimizing for the heartbeat.")

    # Footer
    hr(c, PAGE_WIDTH / 2 - 50 * mm, PAGE_WIDTH / 2 + 50 * mm, MARGIN + MA_REST + MA_PAUSE, MIST, 0.5)

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawCentredString(PAGE_WIDTH / 2, MARGIN + MA_REST, "Ma & Marrow · Sumi Breath · The Biological Renaissance")
    c.drawCentredString(PAGE_WIDTH / 2, MARGIN + MA_REST - 12, "2025 — 2035")

    c.setFillColor(MIST)
    c.setFont("BodyItalic", TYPE_WHISPER)
    c.drawCentredString(PAGE_WIDTH / 2, MARGIN, "This is the founding document.")

    c.save()
    print(f"Manifesto generated: {output}")
    return output


if __name__ == "__main__":
    create_manifesto()
