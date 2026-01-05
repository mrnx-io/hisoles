#!/usr/bin/env python3
"""
HISOLES Brand Book Generator
Ma & Marrow → Sumi Breath → Design Tokens

A museum-quality PDF expressing the hisoles brand through
the hierarchical philosophy system:
  Layer 3: Ma & Marrow (Universal Worldview)
  Layer 2: Sumi Breath (Visual Implementation)
  Layer 1: Design Tokens (Technical Specification)
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path

# ═══════════════════════════════════════════════════════════════════════════════
# DESIGN TOKENS — Layer 1: Clockwork Materials
# ═══════════════════════════════════════════════════════════════════════════════

# Colors (earned through generations of use)
WASHI = HexColor("#FCFAF5")       # Aged paper - background
SUMI = HexColor("#1A1A1A")        # Ink - primary text
PERSIMMON = HexColor("#E85D04")   # Kaki - accent
STONE = HexColor("#4A4A4A")       # Secondary text
CHARCOAL = HexColor("#222222")    # Deep accents
MIST = HexColor("#E8E6E1")        # Subtle rules

# Page dimensions
PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 25 * mm
INNER_WIDTH = PAGE_WIDTH - (2 * MARGIN)

# Typography scale (based on 8pt grid)
TYPE_WHISPER = 8
TYPE_BODY = 10
TYPE_LEAD = 12
TYPE_HEADING = 16
TYPE_DISPLAY = 32
TYPE_HERO = 64

# Spacing (Ma intervals)
MA_BREATH = 8 * mm      # Minimal pause
MA_PAUSE = 16 * mm      # Standard pause
MA_REST = 32 * mm       # Contemplative rest
MA_SILENCE = 64 * mm    # Deep silence

# Register fonts
FONT_DIR = Path.home() / ".claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts"

try:
    pdfmetrics.registerFont(TTFont("Display", str(FONT_DIR / "InstrumentSans-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Body", str(FONT_DIR / "CrimsonPro-Regular.ttf")))
    pdfmetrics.registerFont(TTFont("BodyItalic", str(FONT_DIR / "CrimsonPro-Italic.ttf")))
    pdfmetrics.registerFont(TTFont("BodyBold", str(FONT_DIR / "CrimsonPro-Bold.ttf")))
    pdfmetrics.registerFont(TTFont("Mono", str(FONT_DIR / "GeistMono-Regular.ttf")))
except Exception as e:
    print(f"Font registration warning: {e}")


def create_brand_book():
    """Generate the complete hisoles brand book PDF"""

    output_path = Path("docs/hisoles-brand-book.pdf")
    c = canvas.Canvas(str(output_path), pagesize=A4)

    # ═══════════════════════════════════════════════════════════════════════════
    # COVER
    # ═══════════════════════════════════════════════════════════════════════════
    draw_cover(c)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # LAYER 3: MA & MARROW — Universal Worldview (Pages 2-5)
    # ═══════════════════════════════════════════════════════════════════════════
    draw_ma_marrow_intro(c)
    c.showPage()

    draw_ma_marrow_pillars_1(c)
    c.showPage()

    draw_ma_marrow_pillars_2(c)
    c.showPage()

    draw_ma_marrow_commerce(c)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # LAYER 2: SUMI BREATH — Visual Implementation (Pages 6-7)
    # ═══════════════════════════════════════════════════════════════════════════
    draw_sumi_breath_intro(c)
    c.showPage()

    draw_sumi_breath_application(c)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # HISOLES APPLICATION (Pages 8-14)
    # ═══════════════════════════════════════════════════════════════════════════
    draw_philosophy_page(c)
    c.showPage()

    draw_architecture_page(c)
    c.showPage()

    draw_equation_page(c)
    c.showPage()

    draw_narrative_page(c)
    c.showPage()

    draw_visual_language_page(c)
    c.showPage()

    draw_timing_page(c)
    c.showPage()

    draw_journey_page(c)
    c.showPage()

    # ═══════════════════════════════════════════════════════════════════════════
    # DECISION FILTERS & COLOPHON (Pages 15-16)
    # ═══════════════════════════════════════════════════════════════════════════
    draw_decision_filters(c)
    c.showPage()

    draw_colophon(c)

    c.save()
    print(f"Brand book generated: {output_path}")
    return output_path


# ═══════════════════════════════════════════════════════════════════════════════
# UTILITY FUNCTIONS
# ═══════════════════════════════════════════════════════════════════════════════

def draw_washi_background(c):
    """Draw subtle washi paper texture background"""
    c.setFillColor(WASHI)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)


def draw_vertical_rule(c, x, y1, y2, color=MIST, width=0.5):
    """Draw a subtle vertical rule"""
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x, y1, x, y2)


def draw_horizontal_rule(c, x1, x2, y, color=MIST, width=0.5):
    """Draw a subtle horizontal rule"""
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x1, y, x2, y)


def draw_page_number(c, num):
    """Draw page number in corner"""
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawRightString(PAGE_WIDTH - MARGIN, MARGIN, f"{num:02d}")


def draw_section_kicker(c, text, y=None):
    """Draw section kicker at top"""
    if y is None:
        y = PAGE_HEIGHT - MARGIN - MA_BREATH
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, text)


# ═══════════════════════════════════════════════════════════════════════════════
# COVER PAGE
# ═══════════════════════════════════════════════════════════════════════════════

def draw_cover(c):
    """Page 1: Cover - Meditative simplicity"""
    draw_washi_background(c)

    # Vertical spine line
    draw_vertical_rule(c, MARGIN, MA_REST, PAGE_HEIGHT - MA_REST, STONE, 0.75)

    # Brand mark
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HERO)
    brand_y = PAGE_HEIGHT / 2 + 40 * mm
    c.drawString(MARGIN + MA_PAUSE, brand_y, "hisoles")

    # Tagline
    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    c.drawString(MARGIN + MA_PAUSE, brand_y - MA_PAUSE, "Engineered for those who stand")

    # Persimmon accent
    c.setFillColor(PERSIMMON)
    c.circle(MARGIN + MA_PAUSE + 115 * mm, brand_y + 8 * mm, 2.5 * mm, fill=1, stroke=0)

    # Philosophy marker
    c.setFillColor(MIST)
    c.setFont("Mono", TYPE_WHISPER)
    c.saveState()
    c.translate(PAGE_WIDTH - MARGIN - 5 * mm, PAGE_HEIGHT / 2)
    c.rotate(90)
    c.drawCentredString(0, 0, "MA & MARROW · SUMI BREATH")
    c.restoreState()

    # Year
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN + MA_PAUSE, MA_REST, "2025 — 2035")


# ═══════════════════════════════════════════════════════════════════════════════
# LAYER 3: MA & MARROW PAGES
# ═══════════════════════════════════════════════════════════════════════════════

def draw_ma_marrow_intro(c):
    """Page 2: Ma & Marrow Introduction"""
    draw_washi_background(c)
    draw_section_kicker(c, "LAYER 3 — MA & MARROW")

    # Title
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_DISPLAY)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN, y, "Post-Digital Breath")

    draw_horizontal_rule(c, MARGIN, MARGIN + 80 * mm, y - MA_BREATH, PERSIMMON, 1.5)

    # Opening statement
    c.setFillColor(PERSIMMON)
    c.setFont("BodyItalic", TYPE_HEADING)
    y -= MA_REST
    c.drawString(MARGIN, y, "Perfection is a commodity.")
    c.setFillColor(SUMI)
    c.drawString(MARGIN + 75 * mm, y, "Reality is a luxury.")

    # Philosophy text
    c.setFont("Body", TYPE_LEAD)
    c.setFillColor(SUMI)
    y -= MA_PAUSE + MA_BREATH

    intro_text = [
        "In an age where Artificial Intelligence can generate infinite",
        "variations of flawless geometry in a nanosecond, the concept",
        "of 'smoothness' has depreciated to zero.",
        "",
        "When the virtual world offers a hallucination of eternal,",
        "frictionless symmetry, the human spirit retreats to the only",
        "fortress the algorithm cannot conquer: Entropy.",
        "",
        "Ma & Marrow is not a style; it is a metabolic correction.",
        "It applies the Japanese concept of Ma (the meaningful void)",
        "to the biological imperative of the human animal.",
        "",
        "We do not build to freeze time; we build to host it.",
    ]

    for line in intro_text:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 16

    draw_page_number(c, 2)


def draw_ma_marrow_pillars_1(c):
    """Page 3: Physics of the Flaw + Architecture of Cortisol"""
    draw_washi_background(c)
    draw_section_kicker(c, "LAYER 3 — MA & MARROW")

    y = PAGE_HEIGHT - MARGIN - MA_REST

    # Pillar I
    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "I")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    c.drawString(MARGIN + 10 * mm, y, "Physics of the Flaw")

    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN + 10 * mm, y, "Entropy as Value")

    y -= MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)

    pillar1 = [
        "What a machine can infinitely replicate, it cannot make precious.",
        "Value is no longer derived from complexity, but from Time.",
        "",
        "We design with Clockwork Materials: unsealed copper that greens,",
        "raw linen that softens, limestone that stains with tea.",
        "",
        "A crack in a ceramic bowl is not a defect—it is a receipt of reality.",
    ]

    for line in pillar1:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    # Quote
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    y -= MA_BREATH
    c.drawString(MARGIN, y, '"The digital image remembers nothing. The wood remembers everything."')

    y -= MA_REST

    # Pillar II
    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "II")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    c.drawString(MARGIN + 10 * mm, y, "Architecture of Cortisol")

    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN + 10 * mm, y, "Health as Geometry")

    y -= MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)

    pillar2 = [
        "Information density is a biological toxin. Design is not about",
        "what we add, but what we surgically remove to lower cortisol.",
        "",
        "Space is treated as an external immune system. We use Ma—",
        "not as empty space, but as a Cortisol Vacuum.",
        "",
        "We do not build rooms; we build cavities for silence.",
    ]

    for line in pillar2:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    # Quote
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    y -= MA_BREATH
    c.drawString(MARGIN, y, '"In a world of infinite noise, the ultimate luxury is silence."')

    draw_page_number(c, 3)


def draw_ma_marrow_pillars_2(c):
    """Page 4: Ritual of Friction + Shadow of Intelligence"""
    draw_washi_background(c)
    draw_section_kicker(c, "LAYER 3 — MA & MARROW")

    y = PAGE_HEIGHT - MARGIN - MA_REST

    # Pillar III
    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "III")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    c.drawString(MARGIN + 10 * mm, y, "Ritual of Friction")

    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN + 10 * mm, y, "Touch as Truth")

    y -= MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)

    pillar3 = [
        "When robots perform all labor, human activity shifts from",
        "'production' to 'ritual.' Design must facilitate friction.",
        "",
        "The screen is a surface of zero resistance—a slippery lie.",
        "We prioritize High-Friction Aesthetics: textures that engage",
        "the fingerprints and ground the primate brain.",
        "",
        "Rough clay, woven tatami, cold stone.",
    ]

    for line in pillar3:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    # Quote
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    y -= MA_BREATH
    c.drawString(MARGIN, y, '"Smoothness is the camouflage of the machine."')

    y -= MA_REST

    # Pillar IV
    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "IV")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    c.drawString(MARGIN + 10 * mm, y, "Shadow of Intelligence")

    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN + 10 * mm, y, "Yūgen")

    y -= MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)

    pillar4 = [
        "AI thrives in uniform brightness; it needs data lit from all angles.",
        "The human soul thrives in Yūgen—the profound grace of the unseen.",
        "",
        "We design for the shadow. We return to Black-Body Radiation:",
        "fire, incandescent tungsten, the deep indigo of twilight.",
        "",
        "In hyper-definition, blur and shadow become the realm of the sacred.",
    ]

    for line in pillar4:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    # Quote
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_BODY)
    y -= MA_BREATH
    c.drawString(MARGIN, y, '"The machine requires data. The soul requires mystery."')

    draw_page_number(c, 4)


def draw_ma_marrow_commerce(c):
    """Page 5: Commerce of Presence + Final Principle"""
    draw_washi_background(c)
    draw_section_kicker(c, "LAYER 3 — MA & MARROW")

    y = PAGE_HEIGHT - MARGIN - MA_REST

    # Pillar V
    c.setFillColor(PERSIMMON)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "V")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    c.drawString(MARGIN + 10 * mm, y, "Commerce of Presence")

    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN + 10 * mm, y, "Transaction as Ritual")

    y -= MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)

    pillar5 = [
        "Purchase is not a conversion event—it is a threshold crossing.",
        "The exchange becomes a moment of Ma: a deliberate pause that",
        "honors both the maker and the receiver.",
        "",
        "We reject the frictionless checkout, the one-click purchase.",
        "We design Ritual Commerce: the intentional threshold,",
        "the moment of commitment that transforms transaction.",
        "",
        "The product that ages with its owner creates relationship.",
        "The brand that respects biology earns loyalty discounts cannot buy.",
    ]

    for line in pillar5:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 14

    # Final Principle box
    y -= MA_REST
    c.setStrokeColor(PERSIMMON)
    c.setLineWidth(1.5)
    c.rect(MARGIN, y - 70, INNER_WIDTH, 80, fill=0, stroke=1)

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawCentredString(PAGE_WIDTH / 2, y - 5, "The Final Principle")

    c.setFont("Body", TYPE_BODY)
    c.setFillColor(SUMI)
    c.drawCentredString(PAGE_WIDTH / 2, y - 25, "We are no longer consumers of content;")
    c.drawCentredString(PAGE_WIDTH / 2, y - 40, "we are custodians of biology.")

    c.setFillColor(PERSIMMON)
    c.setFont("BodyItalic", TYPE_LEAD)
    c.drawCentredString(PAGE_WIDTH / 2, y - 60, "Ma & Marrow: Optimizing for heartbeat, not algorithm.")

    draw_page_number(c, 5)


# ═══════════════════════════════════════════════════════════════════════════════
# LAYER 2: SUMI BREATH PAGES
# ═══════════════════════════════════════════════════════════════════════════════

def draw_sumi_breath_intro(c):
    """Page 6: Sumi Breath Introduction"""
    draw_washi_background(c)
    draw_section_kicker(c, "LAYER 2 — SUMI BREATH")

    # Large background character
    c.setFillColor(MIST)
    c.setFont("Display", 200)
    c.drawCentredString(PAGE_WIDTH / 2 + 40 * mm, PAGE_HEIGHT / 2 - 30 * mm, "墨")

    # Title
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_DISPLAY)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN, y, "Engineered Silence")

    draw_horizontal_rule(c, MARGIN, MARGIN + 80 * mm, y - MA_BREATH, PERSIMMON, 1.5)

    # Subtitle
    c.setFillColor(STONE)
    c.setFont("BodyItalic", TYPE_LEAD)
    y -= MA_PAUSE
    c.drawString(MARGIN, y, "Visual Implementation of Ma & Marrow")

    # Derivation table
    y -= MA_REST

    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "MA & MARROW AXIOM")
    c.drawString(MARGIN + 65 * mm, y, "SUMI BREATH EXPRESSION")

    derivations = [
        ("Architecture of Cortisol", "Negative space as immune system"),
        ("Physics of the Flaw", "Earned colors, clockwork materials"),
        ("Ritual of Friction", "Typography as breath marks"),
        ("Shadow of Intelligence", "Yūgen in composition"),
        ("Commerce of Presence", "Threshold ritual design"),
    ]

    y -= MA_BREATH
    for axiom, expression in derivations:
        y -= 16
        c.setFillColor(SUMI)
        c.setFont("Body", TYPE_BODY)
        c.drawString(MARGIN, y, axiom)

        c.setFillColor(PERSIMMON)
        c.drawString(MARGIN + 60 * mm, y, "→")

        c.setFillColor(SUMI)
        c.drawString(MARGIN + 65 * mm, y, expression)

    # Philosophy statement
    y -= MA_REST
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)

    philosophy = [
        "Where Ma & Marrow defines why we design,",
        "Sumi Breath defines how we express it.",
        "",
        "Ink becomes architecture.",
        "Emptiness becomes eloquence.",
    ]

    for line in philosophy:
        if line == "":
            y -= MA_BREATH
        else:
            c.drawString(MARGIN, y, line)
            y -= 18

    draw_page_number(c, 6)


def draw_sumi_breath_application(c):
    """Page 7: Sumi Breath Application"""
    draw_washi_background(c)
    draw_section_kicker(c, "LAYER 2 — SUMI BREATH")

    y = PAGE_HEIGHT - MARGIN - MA_REST

    # Space as Cortisol Vacuum
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawString(MARGIN, y, "Space as Cortisol Vacuum")

    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN, y, "Every element exists only because its removal would diminish the whole.")
    y -= 14
    c.drawString(MARGIN, y, "This is not minimalism as fashion; this is minimalism as biology.")

    y -= MA_PAUSE

    # Clockwork Colors
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawString(MARGIN, y, "Clockwork Colors")

    y -= MA_BREATH

    colors = [
        (WASHI, "Washi", "#FCFAF5", "Aged paper"),
        (SUMI, "Sumi", "#1A1A1A", "Centuries-dried ink"),
        (PERSIMMON, "Persimmon", "#E85D04", "Autumn flame"),
        (STONE, "Stone", "#4A4A4A", "Weathered mineral"),
    ]

    swatch_size = 10 * mm
    for color, name, hex_val, desc in colors:
        c.setFillColor(color)
        c.setStrokeColor(MIST)
        c.setLineWidth(0.5)
        c.rect(MARGIN, y - swatch_size + 3 * mm, swatch_size, swatch_size, fill=1, stroke=1)

        c.setFillColor(SUMI)
        c.setFont("Mono", TYPE_WHISPER)
        c.drawString(MARGIN + swatch_size + MA_BREATH, y, name)
        c.setFillColor(STONE)
        c.drawString(MARGIN + swatch_size + 25 * mm, y, hex_val)
        c.setFont("Body", TYPE_WHISPER)
        c.drawString(MARGIN + swatch_size + 50 * mm, y, desc)

        y -= swatch_size + 2 * mm

    y -= MA_BREATH

    # Typography as Friction
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawString(MARGIN, y, "Typography as Friction")

    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN, y, "Text provides resistance—not friction that frustrates, but friction that grounds.")

    y -= MA_PAUSE

    # Timing tokens
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawString(MARGIN, y, "Ma Intervals")

    y -= MA_BREATH
    timings = [
        ("breath", "3600ms", "Meditative"),
        ("attention", "600ms", "State change"),
        ("whisper", "400ms", "Micro"),
        ("ma", "80ms", "Anticipation"),
    ]

    for token, duration, purpose in timings:
        c.setFillColor(SUMI)
        c.setFont("Mono", TYPE_WHISPER)
        c.drawString(MARGIN, y, f"--duration-{token}")
        c.setFillColor(STONE)
        c.drawString(MARGIN + 45 * mm, y, duration)
        c.setFont("Body", TYPE_WHISPER)
        c.drawString(MARGIN + 65 * mm, y, purpose)
        y -= 12

    draw_page_number(c, 7)


# ═══════════════════════════════════════════════════════════════════════════════
# HISOLES APPLICATION PAGES
# ═══════════════════════════════════════════════════════════════════════════════

def draw_philosophy_page(c):
    """Page 8: hisoles Philosophy"""
    draw_washi_background(c)
    draw_section_kicker(c, "APPLICATION — HISOLES")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_DISPLAY)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN, y, "Sacred Ground")

    draw_horizontal_rule(c, MARGIN, MARGIN + 80 * mm, y - MA_BREATH, PERSIMMON, 1.5)

    c.setFont("Body", TYPE_LEAD)
    c.setFillColor(SUMI)
    y -= MA_REST

    text = [
        "Healthcare workers stand 9-14 hours daily on surfaces designed",
        "for everything except human feet.",
        "",
        "Their pain is not weakness—it is physics.",
        "",
        "hisoles exists to honor the ground they stand on by engineering",
        "a foundation worthy of their sacrifice.",
        "",
        "This is not a product. This is recognition.",
    ]

    for line in text:
        if line == "":
            y -= MA_PAUSE
        else:
            c.drawString(MARGIN, y, line)
            y -= 18

    # Ma & Marrow alignment
    y -= MA_REST
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "MA & MARROW ALIGNMENT")

    alignments = [
        ("Cortisol Vacuum", "Insoles as stress-relief for standing"),
        ("Clockwork Materials", "Product that wears, ages, proves use"),
        ("Ritual Commerce", "Purchase as sacred threshold"),
    ]

    y -= MA_BREATH
    for principle, application in alignments:
        y -= 14
        c.setFillColor(SUMI)
        c.setFont("Body", TYPE_BODY)
        c.drawString(MARGIN, y, principle)
        c.setFillColor(PERSIMMON)
        c.drawString(MARGIN + 50 * mm, y, "→")
        c.setFillColor(STONE)
        c.drawString(MARGIN + 55 * mm, y, application)

    c.setFillColor(PERSIMMON)
    c.setFont("BodyItalic", TYPE_HEADING)
    c.drawString(MARGIN, MARGIN + MA_REST, '"Transformational, not transactional."')

    draw_page_number(c, 8)


def draw_architecture_page(c):
    """Page 9: Architecture"""
    draw_washi_background(c)
    draw_section_kicker(c, "APPLICATION — ARCHITECTURE")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_DISPLAY)
    y = PAGE_HEIGHT - MARGIN - MA_REST - MA_PAUSE
    c.drawString(MARGIN, y, "Single Scroll")

    draw_horizontal_rule(c, MARGIN, MARGIN + 60 * mm, y - MA_BREATH, PERSIMMON, 1.5)

    y -= MA_REST
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)

    constraints = [
        ("PRODUCTS", "1 (insoles, 2 tiers)", "No catalog needed"),
        ("AUDIENCE", "1 (healthcare workers)", "No routing needed"),
        ("DECISION", "Binary (buy or don't)", "No comparison needed"),
        ("NARRATIVE", "Linear persuasion", "Controlled sequence"),
    ]

    for constraint, reality, implication in constraints:
        c.setFont("Mono", TYPE_WHISPER)
        c.setFillColor(STONE)
        c.drawString(MARGIN, y, constraint)

        c.setFont("Body", TYPE_BODY)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 35 * mm, y, reality)

        c.setFillColor(PERSIMMON)
        c.drawString(MARGIN + 90 * mm, y, "→")
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 95 * mm, y, implication)

        y -= 20

    y -= MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawString(MARGIN, y, "Two URLs. Total.")

    c.setFont("Mono", TYPE_BODY)
    c.setFillColor(STONE)
    y -= MA_PAUSE
    c.drawString(MARGIN, y, "/")
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)
    c.drawString(MARGIN + 15 * mm, y, "The brand experience (scroll)")

    y -= 18
    c.setFont("Mono", TYPE_BODY)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "/checkout")
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)
    c.drawString(MARGIN + 25 * mm, y, "Transaction mechanics (Ma threshold)")

    draw_page_number(c, 9)


def draw_equation_page(c):
    """Page 10: Conversion Equation"""
    draw_washi_background(c)
    draw_section_kicker(c, "APPLICATION — EQUATION")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)

    eq_y = PAGE_HEIGHT / 2 + MA_REST

    c.drawCentredString(PAGE_WIDTH / 2, eq_y + 25, "Trust + Desire + Urgency")

    c.setStrokeColor(SUMI)
    c.setLineWidth(1.5)
    c.line(PAGE_WIDTH / 2 - 80 * mm, eq_y, PAGE_WIDTH / 2 + 80 * mm, eq_y)

    c.drawCentredString(PAGE_WIDTH / 2, eq_y - 25, "Friction + Doubt + Price Resistance")

    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_DISPLAY)
    c.drawCentredString(PAGE_WIDTH / 2, eq_y - MA_REST - MA_PAUSE, "= Conversion")

    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_BODY)
    text_y = eq_y - MA_REST - MA_SILENCE

    explanations = [
        "The scroll maximizes the numerator through controlled narrative.",
        "Zero navigation minimizes the denominator.",
        "Ma (間) creates space for trust to form.",
    ]

    for exp in explanations:
        c.drawCentredString(PAGE_WIDTH / 2, text_y, exp)
        text_y -= 18

    draw_page_number(c, 10)


def draw_narrative_page(c):
    """Page 11: Six Chapters"""
    draw_washi_background(c)
    draw_section_kicker(c, "APPLICATION — NARRATIVE")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST
    c.drawString(MARGIN, y, "Six Chapters")

    chapters = [
        ("虚", "VOID", "First impression", "Brand positioning"),
        ("張", "TENSION", "Problem statement", "Empathy building"),
        ("衰", "DECAY", "Education", "Technical proof"),
        ("器", "ARTIFACT", "Product reveal", "Solution presentation"),
        ("響", "ECHO", "Social proof", "Trust reinforcement"),
        ("壇", "ALTAR", "Conversion", "Sacred transaction"),
    ]

    y -= MA_PAUSE + MA_BREATH

    for i, (kanji, name, equiv, purpose) in enumerate(chapters):
        c.setFillColor(PERSIMMON if i == 5 else SUMI)
        c.setFont("Display", TYPE_HEADING)
        c.drawString(MARGIN, y, kanji)

        c.setFont("Mono", TYPE_WHISPER)
        c.setFillColor(STONE)
        c.drawString(MARGIN + 15 * mm, y + 2, name)

        c.setFont("Body", TYPE_BODY)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 40 * mm, y + 2, equiv)

        c.setFillColor(STONE)
        c.drawString(MARGIN + 80 * mm, y + 2, purpose)

        if i < len(chapters) - 1:
            c.setStrokeColor(MIST)
            c.setLineWidth(0.5)
            c.line(MARGIN + 5 * mm, y - 5, MARGIN + 5 * mm, y - 20)

        y -= 30

    c.setFillColor(SUMI)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN, MARGIN + MA_REST, "The scroll unifies what traditional sites fragment.")

    draw_page_number(c, 11)


def draw_visual_language_page(c):
    """Page 12: Visual Language"""
    draw_washi_background(c)
    draw_section_kicker(c, "LAYER 1 — DESIGN TOKENS")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST
    c.drawString(MARGIN, y, "Palette & Type")

    colors_data = [
        (WASHI, "Washi", "#FCFAF5", "Background, paper"),
        (SUMI, "Sumi", "#1A1A1A", "Primary text, ink"),
        (PERSIMMON, "Persimmon", "#E85D04", "Accent, CTAs"),
        (STONE, "Stone", "#4A4A4A", "Secondary text"),
    ]

    y -= MA_PAUSE + MA_BREATH
    swatch_size = 12 * mm

    for color, name, hex_val, usage in colors_data:
        c.setFillColor(color)
        c.setStrokeColor(MIST)
        c.setLineWidth(0.5)
        c.rect(MARGIN, y - swatch_size + 3 * mm, swatch_size, swatch_size, fill=1, stroke=1)

        c.setFillColor(SUMI)
        c.setFont("Display", TYPE_BODY)
        c.drawString(MARGIN + swatch_size + MA_BREATH, y, name)

        c.setFillColor(STONE)
        c.setFont("Mono", TYPE_WHISPER)
        c.drawString(MARGIN + swatch_size + MA_BREATH, y - 12, hex_val)

        c.setFont("Body", TYPE_WHISPER)
        c.drawString(MARGIN + swatch_size + 35 * mm, y - 4, usage)

        y -= swatch_size + MA_BREATH

    y -= MA_PAUSE
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawString(MARGIN, y, "TYPOGRAPHY")

    y -= MA_PAUSE

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawString(MARGIN, y, "General Sans — Display")
    c.setFont("Body", TYPE_WHISPER)
    c.setFillColor(STONE)
    c.drawString(MARGIN + 70 * mm, y + 2, "Headings")

    y -= 20
    c.setFillColor(SUMI)
    c.setFont("Body", TYPE_LEAD)
    c.drawString(MARGIN, y, "Switzer — Body copy")
    c.setFillColor(STONE)
    c.setFont("Body", TYPE_WHISPER)
    c.drawString(MARGIN + 70 * mm, y + 2, "Narrative")

    y -= 20
    c.setFillColor(SUMI)
    c.setFont("Mono", TYPE_LEAD)
    c.drawString(MARGIN, y, "Space Mono — Technical")
    c.setFillColor(STONE)
    c.setFont("Body", TYPE_WHISPER)
    c.drawString(MARGIN + 70 * mm, y + 2, "Metadata")

    draw_page_number(c, 12)


def draw_timing_page(c):
    """Page 13: Animation Timing"""
    draw_washi_background(c)
    draw_section_kicker(c, "LAYER 1 — MOTION")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST
    c.drawString(MARGIN, y, "Animation Timing")

    timings = [
        ("breath", "3600ms", "Ambient, meditative loops"),
        ("attention", "600ms", "State changes, focus shifts"),
        ("whisper", "400ms", "Micro-interactions, hover"),
        ("ma", "80ms", "Anticipation delay before action"),
    ]

    y -= MA_PAUSE + MA_BREATH

    for token, duration, usage in timings:
        bar_width = int(duration.replace("ms", "")) / 30
        c.setFillColor(PERSIMMON if token == "breath" else MIST)
        c.rect(MARGIN, y - 2, bar_width * mm, 4, fill=1, stroke=0)

        c.setFillColor(SUMI)
        c.setFont("Mono", TYPE_BODY)
        c.drawString(MARGIN + max(bar_width + 5, 40) * mm, y, f"--duration-{token}")

        c.setFillColor(STONE)
        c.setFont("Mono", TYPE_WHISPER)
        c.drawString(MARGIN + max(bar_width + 5, 40) * mm + 45 * mm, y, duration)

        c.setFont("Body", TYPE_WHISPER)
        c.drawString(MARGIN, y - 14, usage)

        y -= 35

    y -= MA_PAUSE
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_BODY)
    c.drawString(MARGIN, y, "Spring Physics")

    c.setFont("Mono", TYPE_BODY)
    c.setFillColor(STONE)
    y -= 18
    c.drawString(MARGIN, y, "damping: 50")
    c.drawString(MARGIN + 35 * mm, y, "stiffness: 400")

    c.setFont("Body", TYPE_WHISPER)
    y -= 18
    c.drawString(MARGIN, y, "Controlled tension that resolves into stillness")

    draw_page_number(c, 13)


def draw_journey_page(c):
    """Page 14: Purchase Journey"""
    draw_washi_background(c)
    draw_section_kicker(c, "APPLICATION — JOURNEY")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST
    c.drawString(MARGIN, y, "The Threshold")

    y -= MA_REST

    # Stage 1
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_BODY)
    c.drawString(MARGIN, y, "SCROLL")
    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    c.drawString(MARGIN + 25 * mm, y, "Narrative immersion")
    c.setFont("Body", TYPE_WHISPER)
    c.drawString(MARGIN, y - 14, "Trust accumulates through controlled sequence")

    c.setFillColor(MIST)
    c.setFont("Display", TYPE_HEADING)
    c.drawCentredString(MARGIN + 15 * mm, y - 35, "↓")

    y -= 55

    # Stage 2
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_BODY)
    c.drawString(MARGIN, y, "CART DRAWER")
    c.setFont("Body", TYPE_BODY)
    c.setFillColor(STONE)
    c.drawString(MARGIN + 40 * mm, y, "Low commitment preview")
    c.setFont("Body", TYPE_WHISPER)
    c.drawString(MARGIN, y - 14, "Maintains context, allows retreat without shame")

    c.setFillColor(MIST)
    c.setFont("Display", TYPE_HEADING)
    c.drawCentredString(MARGIN + 15 * mm, y - 35, "↓")

    y -= 55

    # Stage 3
    c.setFillColor(PERSIMMON)
    c.setFont("Display", TYPE_BODY)
    c.drawString(MARGIN, y, "/CHECKOUT")
    c.setFont("Body", TYPE_BODY)
    c.setFillColor(SUMI)
    c.drawString(MARGIN + 40 * mm, y, "The sacred threshold")
    c.setFont("Body", TYPE_WHISPER)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y - 14, "Ma — space for commitment")

    # Insight box
    y -= MA_REST + MA_PAUSE
    c.setStrokeColor(PERSIMMON)
    c.setLineWidth(1)
    c.rect(MARGIN, y - 30, INNER_WIDTH, 40, fill=0, stroke=1)

    c.setFillColor(SUMI)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawString(MARGIN + MA_BREATH, y - 5, "The page transition is not friction—it is ritual.")
    c.setFont("Body", TYPE_WHISPER)
    c.setFillColor(STONE)
    c.drawString(MARGIN + MA_BREATH, y - 20, "A threshold moment before transformation.")

    draw_page_number(c, 14)


def draw_decision_filters(c):
    """Page 15: Decision Filters"""
    draw_washi_background(c)
    draw_section_kicker(c, "DECISION FILTERS")

    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_HEADING)
    y = PAGE_HEIGHT - MARGIN - MA_REST
    c.drawString(MARGIN, y, "Binary Tests")

    c.setFont("Body", TYPE_LEAD)
    c.setFillColor(STONE)
    y -= MA_BREATH
    c.drawString(MARGIN, y, "These questions serve as binary tests for any design decision.")

    filters = [
        ("Physics of the Flaw", "Does this material possess the capacity to age?"),
        ("Architecture of Cortisol", "Does this space reduce biological stress?"),
        ("Ritual of Friction", "Does this surface engage the fingerprints?"),
        ("Shadow of Intelligence", "Does this environment preserve mystery?"),
        ("Commerce of Presence", "Does this exchange honor the threshold?"),
    ]

    y -= MA_REST

    for pillar, question in filters:
        c.setFillColor(PERSIMMON)
        c.setFont("Mono", TYPE_WHISPER)
        c.drawString(MARGIN, y, pillar.upper())

        c.setFillColor(SUMI)
        c.setFont("Body", TYPE_BODY)
        y -= 14
        c.drawString(MARGIN, y, question)

        y -= MA_PAUSE

    # Final statement
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_LEAD)
    c.drawCentredString(PAGE_WIDTH / 2, MARGIN + MA_REST + MA_PAUSE, "If the answer is no, reconsider.")

    draw_page_number(c, 15)


def draw_colophon(c):
    """Page 16: Colophon"""
    draw_washi_background(c)

    draw_vertical_rule(c, MARGIN, MA_REST, PAGE_HEIGHT - MA_REST, MIST, 0.5)

    center_y = PAGE_HEIGHT / 2

    # Brand mark
    c.setFillColor(SUMI)
    c.setFont("Display", TYPE_DISPLAY)
    c.drawCentredString(PAGE_WIDTH / 2, center_y + MA_PAUSE, "hisoles")

    # Persimmon dot
    c.setFillColor(PERSIMMON)
    c.circle(PAGE_WIDTH / 2 + 58 * mm, center_y + MA_PAUSE + 10, 2 * mm, fill=1, stroke=0)

    # Philosophy hierarchy
    c.setFillColor(STONE)
    c.setFont("Mono", TYPE_WHISPER)
    y = center_y - MA_BREATH

    hierarchy = [
        "Layer 3: Ma & Marrow — Universal Worldview",
        "Layer 2: Sumi Breath — Visual Implementation",
        "Layer 1: Design Tokens — Technical Specification",
    ]

    for layer in hierarchy:
        c.drawCentredString(PAGE_WIDTH / 2, y, layer)
        y -= 12

    # Final line
    draw_horizontal_rule(c, PAGE_WIDTH / 2 - 40 * mm, PAGE_WIDTH / 2 + 40 * mm,
                         y - MA_BREATH, MIST, 0.5)

    c.setFillColor(PERSIMMON)
    c.setFont("BodyItalic", TYPE_BODY)
    c.drawCentredString(PAGE_WIDTH / 2, y - MA_PAUSE,
                        "Optimizing for heartbeat, not algorithm.")

    # Credits
    c.setFillColor(MIST)
    c.setFont("Mono", TYPE_WHISPER)
    c.drawCentredString(PAGE_WIDTH / 2, MARGIN + MA_PAUSE, "Brand Strategy Document")
    c.drawCentredString(PAGE_WIDTH / 2, MARGIN, "2025 — 2035")


if __name__ == "__main__":
    create_brand_book()
