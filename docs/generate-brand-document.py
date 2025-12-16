#!/usr/bin/env python3
"""
Generate hisoles Brand Strategy Document
Visual Philosophy: Washi Silence
Refined Edition - Museum Quality
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.lib.colors import Color
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import math
import random

# Register fonts - using hisoles brand fonts
BRAND_FONT_DIR = "/Users/MarnixPluim/hisoles/src/fonts"
FALLBACK_FONT_DIR = "/Users/MarnixPluim/.claude/plugins/cache/anthropic-agent-skills/example-skills/00756142ab04/skills/canvas-design/canvas-fonts"

# Brand fonts (General Sans for display, Switzer for body)
pdfmetrics.registerFont(TTFont('GeneralSans', f'{BRAND_FONT_DIR}/GeneralSans-Variable.ttf'))
pdfmetrics.registerFont(TTFont('Switzer', f'{BRAND_FONT_DIR}/Switzer-Variable.ttf'))

# Fallback fonts for mono and italic (brand doesn't have these as TTF)
pdfmetrics.registerFont(TTFont('IBMPlexMono', f'{FALLBACK_FONT_DIR}/IBMPlexMono-Regular.ttf'))
pdfmetrics.registerFont(TTFont('InstrumentSerif-Italic', f'{FALLBACK_FONT_DIR}/InstrumentSerif-Italic.ttf'))

# Color palette (OKLCH-inspired values converted to RGB)
WASHI = Color(0.988, 0.98, 0.961)      # #FCFAF5 - warm Japanese paper white
SUMI = Color(0.102, 0.102, 0.102)      # #1A1A1A - traditional ink black
PERSIMMON = Color(0.91, 0.365, 0.016)  # #E85D04 - warm orange accent
STONE = Color(0.29, 0.29, 0.29)        # #4A4A4A - secondary text
CHARCOAL = Color(0.133, 0.133, 0.133)  # #222222 - deep backgrounds

# Page dimensions
WIDTH, HEIGHT = A4
MARGIN = 28 * mm
CONTENT_WIDTH = WIDTH - 2 * MARGIN

# Seed for consistent texture
random.seed(42)


def draw_washi_texture(c, density=0.0006):
    """Draw subtle paper grain texture - refined for depth"""
    c.saveState()
    for _ in range(int(WIDTH * HEIGHT * density)):
        x = random.uniform(0, WIDTH)
        y = random.uniform(0, HEIGHT)
        size = random.uniform(0.2, 0.5)
        opacity = random.uniform(0.015, 0.04)
        c.setFillColor(Color(0.65, 0.62, 0.58, alpha=opacity))
        c.circle(x, y, size, fill=1, stroke=0)
    c.restoreState()


def draw_meridian_line(c, y_start, y_end, x_pos=None):
    """Draw vertical meridian spine with subtle glow"""
    if x_pos is None:
        x_pos = WIDTH / 2
    c.saveState()
    # Subtle glow
    for i in range(3):
        alpha = 0.03 - (i * 0.01)
        c.setStrokeColor(Color(0.91, 0.365, 0.016, alpha=alpha))
        c.setLineWidth(3 - i)
        c.line(x_pos, y_start, x_pos, y_end)
    # Core line
    c.setStrokeColor(Color(0.91, 0.365, 0.016, alpha=0.12))
    c.setLineWidth(0.4)
    c.line(x_pos, y_start, x_pos, y_end)
    c.restoreState()


def draw_section_marker(c, y_pos, label, x_offset=0):
    """Draw subtle section marker"""
    x = MARGIN + x_offset
    c.saveState()
    c.setFillColor(PERSIMMON)
    c.circle(x - 10, y_pos - 3, 2.5, fill=1, stroke=0)
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawString(x, y_pos - 5, label.upper())
    c.restoreState()


def draw_horizontal_rule(c, y_pos, width_ratio=0.25):
    """Draw minimal horizontal rule"""
    c.saveState()
    c.setStrokeColor(Color(0.91, 0.365, 0.016, alpha=0.25))
    c.setLineWidth(0.4)
    x_start = MARGIN
    x_end = MARGIN + CONTENT_WIDTH * width_ratio
    c.line(x_start, y_pos, x_end, y_pos)
    c.restoreState()


def wrap_text(text, font_name, font_size, max_width, c):
    """Wrap text to fit within max_width"""
    words = text.split()
    lines = []
    current_line = []

    for word in words:
        current_line.append(word)
        test_line = ' '.join(current_line)
        if c.stringWidth(test_line, font_name, font_size) > max_width:
            if len(current_line) > 1:
                current_line.pop()
                lines.append(' '.join(current_line))
                current_line = [word]
            else:
                lines.append(test_line)
                current_line = []

    if current_line:
        lines.append(' '.join(current_line))

    return lines


def draw_honeycomb_pattern(c, x, y, size, rows=3, cols=4, alpha=0.08):
    """Draw subtle honeycomb pattern - brand reference"""
    c.saveState()
    hex_size = size / cols
    h = hex_size * math.sqrt(3) / 2

    c.setStrokeColor(Color(0.91, 0.365, 0.016, alpha=alpha))
    c.setLineWidth(0.3)

    for row in range(rows):
        for col in range(cols):
            cx = x + col * hex_size * 1.5
            cy = y - row * h * 2 - (h if col % 2 else 0)

            # Draw hexagon
            points = []
            for i in range(6):
                angle = math.pi / 3 * i + math.pi / 6
                px = cx + hex_size * 0.4 * math.cos(angle)
                py = cy + hex_size * 0.4 * math.sin(angle)
                points.append((px, py))

            path = c.beginPath()
            path.moveTo(points[0][0], points[0][1])
            for px, py in points[1:]:
                path.lineTo(px, py)
            path.close()
            c.drawPath(path, stroke=1, fill=0)

    c.restoreState()


def create_cover_page(c):
    """Page 1: The Void - Cover"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c, density=0.0005)

    # Central split - the "ma" opening
    split_y = HEIGHT / 2 - 15*mm
    gap = 2 * mm

    # Paper edge shadows - refined
    c.saveState()
    for i in range(8):
        alpha = 0.025 - (i * 0.003)
        c.setFillColor(Color(0, 0, 0, alpha=max(0, alpha)))
        c.rect(0, split_y + gap/2 + i*0.5*mm, WIDTH, 0.5*mm, fill=1, stroke=0)
    for i in range(8):
        alpha = 0.025 - (i * 0.003)
        c.setFillColor(Color(0, 0, 0, alpha=max(0, alpha)))
        c.rect(0, split_y - gap/2 - i*0.5*mm - 0.5*mm, WIDTH, 0.5*mm, fill=1, stroke=0)
    c.restoreState()

    # Persimmon glow in the split - refined gradient
    c.saveState()
    for i in range(25):
        alpha = 0.2 - (i * 0.008)
        spread = i * 1.5*mm
        c.setFillColor(Color(0.91, 0.365, 0.016, alpha=max(0, alpha)))
        c.rect(0, split_y - gap/2 - spread, WIDTH, gap + spread*2, fill=1, stroke=0)
    c.restoreState()

    # Meridian dot at center of split
    c.setFillColor(PERSIMMON)
    c.circle(WIDTH/2, split_y, 3.5, fill=1, stroke=0)

    # Subtle glow around dot
    c.saveState()
    for i in range(5):
        alpha = 0.1 - (i * 0.02)
        c.setFillColor(Color(0.91, 0.365, 0.016, alpha=max(0, alpha)))
        c.circle(WIDTH/2, split_y, 3.5 + i*2, fill=1, stroke=0)
    c.restoreState()

    # Brand mark - positioned with golden ratio spacing
    c.setFont('GeneralSans', 68)
    c.setFillColor(SUMI)
    brand_width = c.stringWidth('hisoles', 'GeneralSans', 68)
    c.drawString((WIDTH - brand_width) / 2, HEIGHT - 85*mm, 'hisoles')

    # Positioning statement
    c.setFont('InstrumentSerif-Italic', 13)
    c.setFillColor(STONE)
    tagline = "The art of standing."
    tagline_width = c.stringWidth(tagline, 'InstrumentSerif-Italic', 13)
    c.drawString((WIDTH - tagline_width) / 2, HEIGHT - 100*mm, tagline)

    # Bottom anchor text - refined positioning
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawString(MARGIN, 28*mm, "BRAND STRATEGY")
    c.drawRightString(WIDTH - MARGIN, 28*mm, "DECEMBER 2025")


def create_philosophy_page(c):
    """Page 2: Brand Philosophy"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    # Section marker
    draw_section_marker(c, y + 18*mm, "01 — Philosophy")

    # Mission statement - large
    c.setFont('GeneralSans', 26)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Engineered calm")
    c.drawString(MARGIN, y - 11*mm, "for those who")
    c.drawString(MARGIN, y - 22*mm, "cannot stop.")

    y -= 48*mm
    draw_horizontal_rule(c, y)

    y -= 18*mm

    # Philosophy text
    c.setFont('Switzer', 9)
    c.setFillColor(STONE)
    philosophy = "Relief is not a luxury — it is a ritual. hisoles treats foot support as a meditative practice, transforming the mundane act of standing into an art form."
    lines = wrap_text(philosophy, 'Switzer', 9, CONTENT_WIDTH * 0.62, c)
    for line in lines:
        c.drawString(MARGIN, y, line)
        y -= 5*mm

    y -= 22*mm

    # Brand promise box
    c.saveState()
    c.setFillColor(Color(0.91, 0.365, 0.016, alpha=0.06))
    c.roundRect(MARGIN, y - 38*mm, CONTENT_WIDTH * 0.68, 48*mm, 2*mm, fill=1, stroke=0)
    c.restoreState()

    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(PERSIMMON)
    c.drawString(MARGIN + 10*mm, y, "BRAND PROMISE")

    c.setFont('InstrumentSerif-Italic', 10.5)
    c.setFillColor(SUMI)
    promise = "We don't sell insoles. We engineer calm for people who cannot stop working."
    lines = wrap_text(promise, 'InstrumentSerif-Italic', 10.5, CONTENT_WIDTH * 0.58, c)
    y -= 10*mm
    for line in lines:
        c.drawString(MARGIN + 10*mm, y, line)
        y -= 6*mm

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "02")


def create_audience_page(c):
    """Page 3: Target Audience"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "02 — Audience")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Those who stand")
    c.drawString(MARGIN, y - 9*mm, "when others sit.")

    y -= 32*mm
    draw_horizontal_rule(c, y, 0.18)
    y -= 16*mm

    # Audience segments as minimal table
    segments = [
        ("ER NURSES", "12h", "Post-shift recovery rituals"),
        ("SURGICAL TECHS", "10h", "Dead shoe syndrome"),
        ("CNAs", "14h", "Structural collapse at hour 9+"),
        ("ICU NURSES", "12h", "Mental fatigue from physical pain"),
        ("MED ASSISTANTS", "9h", "Glass-floor sensation"),
    ]

    col1_x = MARGIN
    col2_x = MARGIN + 52*mm
    col3_x = MARGIN + 78*mm

    # Header
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(col1_x, y, "SEGMENT")
    c.drawString(col2_x, y, "SHIFT")
    c.drawString(col3_x, y, "PAIN POINT")

    y -= 3.5*mm
    c.setStrokeColor(Color(0, 0, 0, alpha=0.08))
    c.setLineWidth(0.25)
    c.line(col1_x, y, col3_x + 65*mm, y)

    y -= 9*mm

    for segment, shift, pain in segments:
        c.setFont('Switzer', 8)
        c.setFillColor(SUMI)
        c.drawString(col1_x, y, segment)

        c.setFont('IBMPlexMono', 8)
        c.setFillColor(PERSIMMON)
        c.drawString(col2_x, y, shift)

        c.setFont('Switzer', 8)
        c.setFillColor(STONE)
        c.drawString(col3_x, y, pain)

        y -= 11*mm

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "03")


def create_product_page(c):
    """Page 4: Product Strategy"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "03 — Product")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Your shoes aren't dead.")

    c.setFont('GeneralSans', 22)
    c.setFillColor(PERSIMMON)
    c.drawString(MARGIN, y - 9*mm, "The foam is.")

    y -= 32*mm
    draw_horizontal_rule(c, y, 0.22)
    y -= 14*mm

    # Problem statement
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "THE PROBLEM")

    y -= 9*mm
    c.setFont('Switzer', 8.5)
    c.setFillColor(SUMI)
    problem = "Dead Shoe Syndrome — the hidden problem where shoe structure remains intact but internal foam support has collapsed after weeks of use."
    lines = wrap_text(problem, 'Switzer', 8.5, CONTENT_WIDTH * 0.68, c)
    for line in lines:
        c.drawString(MARGIN, y, line)
        y -= 5*mm

    y -= 12*mm

    # Differentiators
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "DIFFERENTIATORS")
    y -= 10*mm

    diffs = [
        ("Honeycomb geometry", "rebounds without mushing"),
        ("Activated charcoal weave", "breathable, odor-resistant"),
        ("12-hour durability guarantee", "Held. Or Free."),
    ]

    for title, desc in diffs:
        c.setFillColor(PERSIMMON)
        c.circle(MARGIN + 2.5*mm, y - 1*mm, 1.8, fill=1, stroke=0)

        c.setFont('Switzer', 8.5)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 9*mm, y, title)

        c.setFont('Switzer', 8.5)
        c.setFillColor(STONE)
        c.drawString(MARGIN + 9*mm + c.stringWidth(title, 'Switzer', 8.5) + 4*mm, y, f"— {desc}")
        y -= 9*mm

    y -= 16*mm

    # Pricing grid
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "PRICING")
    y -= 12*mm

    prices = [
        ("1 PAIR", "$39", "Trial"),
        ("2 PAIRS", "$69", "Rotation"),
        ("ADD-ON", "+$29", "Second pair"),
    ]

    box_width = 44*mm
    box_height = 26*mm
    gap = 6*mm

    for i, (tier, price, pos) in enumerate(prices):
        x = MARGIN + i * (box_width + gap)

        # Box background
        c.saveState()
        if i == 1:  # Highlight middle option
            c.setFillColor(Color(0.91, 0.365, 0.016, alpha=0.08))
        else:
            c.setFillColor(Color(0, 0, 0, alpha=0.02))
        c.roundRect(x, y - box_height, box_width, box_height, 1.5*mm, fill=1, stroke=0)
        c.restoreState()

        c.setFont('IBMPlexMono', 6.5)
        c.setFillColor(STONE)
        c.drawString(x + 5*mm, y - 6*mm, tier)

        c.setFont('GeneralSans', 17)
        c.setFillColor(SUMI)
        c.drawString(x + 5*mm, y - 17*mm, price)

        c.setFont('Switzer', 7)
        c.setFillColor(STONE)
        c.drawString(x + 5*mm, y - 23*mm, pos)

    y -= box_height + 12*mm

    # Guarantees
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(PERSIMMON)
    c.drawString(MARGIN, y, "90-DAY MONEY-BACK  •  FREE RETURNS")

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "04")


def create_design_system_page(c):
    """Page 5: Design System"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "04 — Design")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Visual Language")

    y -= 24*mm
    draw_horizontal_rule(c, y, 0.12)
    y -= 14*mm

    # Color palette
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "COLOR PALETTE")
    y -= 12*mm

    colors = [
        ("Washi", "#FCFAF5", WASHI, "Primary background"),
        ("Sumi", "#1A1A1A", SUMI, "Text"),
        ("Persimmon", "#E85D04", PERSIMMON, "Accent"),
        ("Stone", "#4A4A4A", STONE, "Secondary"),
        ("Charcoal", "#222222", CHARCOAL, "Deep bg"),
    ]

    swatch_size = 17*mm
    gap = 7*mm

    for i, (name, hex_val, color, role) in enumerate(colors):
        x = MARGIN + i * (swatch_size + gap)

        # Color swatch
        c.setFillColor(color)
        c.roundRect(x, y - swatch_size, swatch_size, swatch_size, 1*mm, fill=1, stroke=0)

        # Border for light colors
        if name == "Washi":
            c.setStrokeColor(Color(0, 0, 0, alpha=0.08))
            c.setLineWidth(0.4)
            c.roundRect(x, y - swatch_size, swatch_size, swatch_size, 1*mm, fill=0, stroke=1)

        c.setFont('Switzer', 7)
        c.setFillColor(SUMI)
        c.drawString(x, y - swatch_size - 5.5*mm, name)

        c.setFont('IBMPlexMono', 5.5)
        c.setFillColor(STONE)
        c.drawString(x, y - swatch_size - 10*mm, hex_val)

    y -= swatch_size + 22*mm

    # Typography
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "TYPOGRAPHY")
    y -= 11*mm

    fonts = [
        ("Display", "General Sans", "Clean, architectural"),
        ("Body", "Switzer", "Warm, readable"),
        ("UI/Labels", "Space Mono", "Technical precision"),
    ]

    for purpose, font, char in fonts:
        c.setFont('IBMPlexMono', 6.5)
        c.setFillColor(PERSIMMON)
        c.drawString(MARGIN, y, purpose.upper())

        c.setFont('Switzer', 8.5)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 26*mm, y, font)

        c.setFont('Switzer', 8)
        c.setFillColor(STONE)
        c.drawString(MARGIN + 62*mm, y, char)

        y -= 9*mm

    y -= 12*mm

    # Visual concepts
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "VISUAL CONCEPTS")
    y -= 11*mm

    concepts = [
        ("Ma 間", "Strategic use of void and emptiness"),
        ("Kakemono", "Page unfolds like a hanging scroll"),
        ("Washi Texture", "Subtle grain evoking handmade paper"),
        ("Meridian System", "Central spine connecting all sections"),
    ]

    for name, desc in concepts:
        c.setFillColor(PERSIMMON)
        c.circle(MARGIN + 2.5*mm, y - 1*mm, 1.8, fill=1, stroke=0)

        c.setFont('InstrumentSerif-Italic', 8.5)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 9*mm, y, name)

        c.setFont('Switzer', 8)
        c.setFillColor(STONE)
        name_width = c.stringWidth(name, 'InstrumentSerif-Italic', 8.5)
        c.drawString(MARGIN + 9*mm + name_width + 5*mm, y, f"— {desc}")
        y -= 10*mm

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "05")


def create_narrative_page(c):
    """Page 6: Narrative Arc"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "05 — Narrative")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "The Scroll Journey")

    y -= 24*mm
    draw_horizontal_rule(c, y, 0.15)
    y -= 14*mm

    chapters = [
        ("01", "The Void", "The Art of Standing", "Paper splits, revealing persimmon glow"),
        ("02", "The Tension", "8:00 to 18:00", "Mapping a 12-hour shift from grounded to shattered"),
        ("03", "The Decay", "Dead Shoe Syndrome", "Educational comparison showing foam deterioration"),
        ("04", "The Artifact", "Product Revelation", "Insole emerges, structure revealed"),
        ("05", "The Echo", "Social Proof", "Real healthcare worker testimonials"),
        ("06", "The Altar", "Conversion", "Purchase as sacred ritual"),
    ]

    for num, title, subtitle, desc in chapters:
        # Number
        c.setFont('IBMPlexMono', 8.5)
        c.setFillColor(PERSIMMON)
        c.drawString(MARGIN, y, num)

        # Title
        c.setFont('GeneralSans', 11)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 14*mm, y, title)

        # Subtitle
        c.setFont('InstrumentSerif-Italic', 8.5)
        c.setFillColor(STONE)
        title_width = c.stringWidth(title, 'GeneralSans', 11)
        c.drawString(MARGIN + 14*mm + title_width + 6*mm, y, f"— {subtitle}")

        y -= 6*mm

        # Description
        c.setFont('Switzer', 7.5)
        c.setFillColor(STONE)
        c.drawString(MARGIN + 14*mm, y, desc)

        y -= 13*mm

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "06")


def create_voice_page(c):
    """Page 7: Brand Voice"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "06 — Voice")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Brand Voice")

    y -= 24*mm
    draw_horizontal_rule(c, y, 0.12)
    y -= 14*mm

    # Tone attributes
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "TONE")
    y -= 10*mm

    tones = [
        "Quiet confidence — never shouts, always present",
        "Empathetic — understands the healthcare worker's reality",
        "Poetic precision — technical facts wrapped in emotional language",
    ]

    for tone in tones:
        c.setFillColor(PERSIMMON)
        c.circle(MARGIN + 2.5*mm, y - 1*mm, 1.8, fill=1, stroke=0)
        c.setFont('Switzer', 8.5)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 9*mm, y, tone)
        y -= 9*mm

    y -= 14*mm

    # Copy patterns
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "COPY PATTERNS")
    y -= 11*mm

    patterns = [
        ("Problem", "The floor has won."),
        ("Solution", "Architecture endures."),
        ("Proof", "Squeeze → rebound"),
        ("CTA", "Start the shift."),
        ("Guarantee", "12 Hours. Held. Or Free."),
    ]

    for ptype, example in patterns:
        c.setFont('IBMPlexMono', 6.5)
        c.setFillColor(STONE)
        c.drawString(MARGIN, y, ptype.upper())

        c.setFont('InstrumentSerif-Italic', 9.5)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 32*mm, y, f'"{example}"')
        y -= 10*mm

    y -= 12*mm

    # Language rules
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "LANGUAGE RULES")
    y -= 10*mm

    c.setFont('Switzer', 8.5)
    c.setFillColor(SUMI)

    rules = [
        ('Use "relief"', 'not "comfort"'),
        ('Use "structure"', 'not "support"'),
        ('Use "quiet"', 'not "silent"'),
        ('Use "ritual"', 'not "routine"'),
    ]

    for use, not_use in rules:
        c.setFillColor(PERSIMMON)
        c.drawString(MARGIN, y, use)
        c.setFillColor(STONE)
        w = c.stringWidth(use, 'Switzer', 8.5)
        c.drawString(MARGIN + w + 4*mm, y, not_use)
        y -= 8*mm

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "07")


def create_positioning_page(c):
    """Page 8: Strategic Positioning"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "07 — Position")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Competitive Position")

    y -= 24*mm
    draw_horizontal_rule(c, y, 0.18)
    y -= 14*mm

    # Comparison table
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "COMPETITOR")
    c.drawString(MARGIN + 55*mm, y, "HISOLES")

    y -= 4*mm
    c.setStrokeColor(Color(0, 0, 0, alpha=0.08))
    c.setLineWidth(0.25)
    c.line(MARGIN, y, WIDTH - MARGIN, y)

    y -= 10*mm

    comparisons = [
        ("Foam cushioning", "Geometric architecture"),
        ("Comfort messaging", "Relief-as-ritual messaging"),
        ("Generic audience", "Healthcare worker specificity"),
        ("Feature-led", "Story-led"),
        ("Transactional", "Transformational"),
    ]

    for comp, hisoles in comparisons:
        c.setFont('Switzer', 8)
        c.setFillColor(STONE)
        c.drawString(MARGIN, y, comp)

        c.setFont('Switzer', 8)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 55*mm, y, hisoles)

        y -= 10*mm

    y -= 14*mm

    # Metrics
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "KEY METRICS")
    y -= 11*mm

    metrics = [
        ("Conversion Rate", "Altar section CTA performance"),
        ("2-Pair Ratio", "Rotation bundle adoption"),
        ("Return Rate", "90-day guarantee utilization"),
        ("NPS", "Healthcare worker satisfaction"),
        ("Scroll Depth", "Full narrative engagement"),
    ]

    for metric, desc in metrics:
        c.setFillColor(PERSIMMON)
        c.circle(MARGIN + 2.5*mm, y - 1*mm, 1.8, fill=1, stroke=0)

        c.setFont('Switzer', 8)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 9*mm, y, metric)

        c.setFont('Switzer', 8)
        c.setFillColor(STONE)
        mw = c.stringWidth(metric, 'Switzer', 8)
        c.drawString(MARGIN + 9*mm + mw + 4*mm, y, f"— {desc}")
        y -= 9*mm

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "08")


def create_testimonials_page(c):
    """Page 9: Testimonials"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "08 — Echo")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Voices")

    y -= 28*mm

    testimonials = [
        ("I sit in my car for 20 mins after every shift. Not today.", "ER Nurse"),
        ("My Hokas were dead. These brought them back.", "Surgical Tech"),
        ("Hour 9 used to feel like glass. Now it's just… a floor.", "Med Assistant"),
    ]

    for quote, role in testimonials:
        # Quote mark - refined positioning
        c.setFont('GeneralSans', 42)
        c.setFillColor(Color(0.91, 0.365, 0.016, alpha=0.15))
        c.drawString(MARGIN, y + 6*mm, '"')

        # Quote text
        c.setFont('InstrumentSerif-Italic', 11)
        c.setFillColor(SUMI)
        lines = wrap_text(quote, 'InstrumentSerif-Italic', 11, CONTENT_WIDTH * 0.72, c)
        for line in lines:
            c.drawString(MARGIN + 14*mm, y, line)
            y -= 6*mm

        y -= 2*mm

        # Attribution
        c.setFont('IBMPlexMono', 7.5)
        c.setFillColor(PERSIMMON)
        c.drawString(MARGIN + 14*mm, y, f"— {role}")

        y -= 22*mm

    # Guarantee box - centered
    y -= 8*mm
    box_width = 68*mm
    box_height = 18*mm
    box_x = (WIDTH - box_width) / 2

    c.saveState()
    c.setFillColor(Color(0.91, 0.365, 0.016, alpha=0.08))
    c.roundRect(box_x, y - box_height, box_width, box_height, 2*mm, fill=1, stroke=0)
    c.restoreState()

    c.setFont('GeneralSans', 13)
    c.setFillColor(SUMI)
    guarantee = "12 Hours. Held. Or Free."
    gw = c.stringWidth(guarantee, 'GeneralSans', 13)
    c.drawString((WIDTH - gw) / 2, y - 11*mm, guarantee)

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "09")


def create_architecture_page(c):
    """Page 10: Component Architecture"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "09 — Architecture")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Component Structure")

    y -= 24*mm
    draw_horizontal_rule(c, y, 0.18)
    y -= 14*mm

    # Providers
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "PROVIDERS")
    y -= 10*mm

    providers = [
        ("OverlayProvider", "Modal panels"),
        ("CartProvider", "Shopping cart state"),
        ("SpineProvider", "Traveling dot coordination"),
    ]

    for name, desc in providers:
        c.setFont('IBMPlexMono', 8)
        c.setFillColor(PERSIMMON)
        c.drawString(MARGIN + 6*mm, y, name)

        c.setFont('Switzer', 8)
        c.setFillColor(STONE)
        nw = c.stringWidth(name, 'IBMPlexMono', 8)
        c.drawString(MARGIN + 6*mm + nw + 5*mm, y, f"— {desc}")
        y -= 9*mm

    y -= 12*mm

    # Sections
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "SECTIONS")
    y -= 10*mm

    sections = [
        "SectionVoid",
        "SectionTension",
        "SectionDecay",
        "SectionArtifact",
        "SectionEcho",
        "SectionAltar",
    ]

    for i, section in enumerate(sections):
        c.setFont('IBMPlexMono', 8)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 6*mm, y, section)
        y -= 8*mm

    y -= 12*mm

    # Animation patterns
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "ANIMATION PATTERNS")
    y -= 10*mm

    patterns = [
        ("Scroll-driven", "scrollYProgress transforms"),
        ("Tremor", "0.5-1px jitter during chaos"),
        ("Velocity blur", "Elements distort with speed"),
        ("Meridian pulse", "Persimmon glow on idle"),
    ]

    for name, desc in patterns:
        c.setFillColor(PERSIMMON)
        c.circle(MARGIN + 2.5*mm, y - 1*mm, 1.8, fill=1, stroke=0)

        c.setFont('Switzer', 8)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 9*mm, y, name)

        c.setFont('Switzer', 8)
        c.setFillColor(STONE)
        nw = c.stringWidth(name, 'Switzer', 8)
        c.drawString(MARGIN + 9*mm + nw + 4*mm, y, f"— {desc}")
        y -= 9*mm

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "10")


def create_technical_specs_page(c):
    """Page 11: Washi Texture Technical Specifications"""
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)
    draw_washi_texture(c)
    draw_meridian_line(c, 35*mm, HEIGHT - 35*mm)

    y = HEIGHT - 55*mm

    draw_section_marker(c, y + 18*mm, "10 — Technical")

    c.setFont('GeneralSans', 22)
    c.setFillColor(SUMI)
    c.drawString(MARGIN, y, "Washi Texture System")

    y -= 24*mm
    draw_horizontal_rule(c, y, 0.22)
    y -= 14*mm

    # Overview
    c.setFont('Switzer', 8.5)
    c.setFillColor(STONE)
    overview = "Procedural washi (Japanese handmade paper) texture using simplex noise. DPR-aware rendering ensures crisp display on retina screens. All parameters tuned for subtle, authentic paper feel."
    lines = wrap_text(overview, 'Switzer', 8.5, CONTENT_WIDTH * 0.72, c)
    for line in lines:
        c.drawString(MARGIN, y, line)
        y -= 5*mm

    y -= 12*mm

    # Texture Parameters
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "TEXTURE EFFECT MULTIPLIERS")
    y -= 10*mm

    effects = [
        ("Warm Drift", "R: +1.1×  G: +0.75×  B: -0.35×", "Subtle warm patches"),
        ("Kozo Fibers", "R: +0.9×  G: +0.75×  B: +0.4×", "Horizontal warmth (intensity: 18)"),
        ("Cross-Fiber", "R: +0.55×  G: +0.5×  B: +0.35×", "Diagonal at ~13° (breaks banding)"),
        ("Fine Grain", "R: +1.0×  G: +0.9×  B: +0.65×", "Micro noise (intensity: 6.0)"),
        ("Vignette", "R: +0.22×  G: -0.35×  B: -0.85×", "Warm orange edges"),
    ]

    for name, rgb, desc in effects:
        c.setFillColor(PERSIMMON)
        c.circle(MARGIN + 2.5*mm, y - 1*mm, 1.8, fill=1, stroke=0)

        c.setFont('Switzer', 8)
        c.setFillColor(SUMI)
        c.drawString(MARGIN + 9*mm, y, name)

        c.setFont('IBMPlexMono', 6.5)
        c.setFillColor(STONE)
        c.drawString(MARGIN + 38*mm, y, rgb)

        c.setFont('Switzer', 7)
        c.setFillColor(STONE)
        c.drawString(MARGIN + 95*mm, y, desc)
        y -= 9*mm

    y -= 10*mm

    # Configuration
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "CONFIGURATION")
    y -= 10*mm

    config = [
        ("Seed", "42", "Deterministic rendering"),
        ("Max DPR", "2", "Performance cap"),
        ("Cross Angle", "0.23 rad", "~13° rotation"),
        ("Strand Count", "46", "Fiber strands"),
        ("Inclusions", "28", "Fiber dots"),
    ]

    col1_x = MARGIN
    col2_x = MARGIN + 35*mm
    col3_x = MARGIN + 62*mm

    for param, value, desc in config:
        c.setFont('Switzer', 8)
        c.setFillColor(SUMI)
        c.drawString(col1_x, y, param)

        c.setFont('IBMPlexMono', 8)
        c.setFillColor(PERSIMMON)
        c.drawString(col2_x, y, value)

        c.setFont('Switzer', 7.5)
        c.setFillColor(STONE)
        c.drawString(col3_x, y, desc)
        y -= 8*mm

    y -= 12*mm

    # Fiber Strands
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(STONE)
    c.drawString(MARGIN, y, "FIBER STRAND PARAMETERS")
    y -= 10*mm

    strands = [
        ("Length", "60-380px", "CSS pixels"),
        ("Thickness", "0.35-1.45px", "Gaussian falloff"),
        ("Opacity", "0.006-0.018", "Per-strand base"),
        ("Angle", "±0.11 rad", "Horizontal bias"),
    ]

    for param, value, desc in strands:
        c.setFont('Switzer', 8)
        c.setFillColor(SUMI)
        c.drawString(col1_x, y, param)

        c.setFont('IBMPlexMono', 8)
        c.setFillColor(PERSIMMON)
        c.drawString(col2_x, y, value)

        c.setFont('Switzer', 7.5)
        c.setFillColor(STONE)
        c.drawString(col3_x, y, desc)
        y -= 8*mm

    # Page number
    c.setFont('IBMPlexMono', 7)
    c.setFillColor(STONE)
    c.drawCentredString(WIDTH/2, 18*mm, "11")


def create_closing_page(c):
    """Page 12: Closing / CTA"""
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)

    # Subtle texture on dark
    c.saveState()
    random.seed(99)
    for _ in range(int(WIDTH * HEIGHT * 0.00025)):
        x = random.uniform(0, WIDTH)
        y = random.uniform(0, HEIGHT)
        size = random.uniform(0.2, 0.5)
        opacity = random.uniform(0.015, 0.04)
        c.setFillColor(Color(1, 1, 1, alpha=opacity))
        c.circle(x, y, size, fill=1, stroke=0)
    c.restoreState()

    # Subtle honeycomb in corner
    draw_honeycomb_pattern(c, WIDTH - 60*mm, HEIGHT - 40*mm, 50*mm, rows=4, cols=5, alpha=0.04)

    # Central content
    center_y = HEIGHT / 2 + 25*mm

    c.setFont('GeneralSans', 34)
    c.setFillColor(WASHI)
    line1 = "Start the shift."
    w1 = c.stringWidth(line1, 'GeneralSans', 34)
    c.drawString((WIDTH - w1) / 2, center_y, line1)

    center_y -= 18*mm

    c.setFont('Switzer', 9.5)
    c.setFillColor(Color(0.98, 0.976, 0.965, alpha=0.65))
    line2 = "Quiet, structured relief — the kind you don't have to think about."
    w2 = c.stringWidth(line2, 'Switzer', 9.5)
    c.drawString((WIDTH - w2) / 2, center_y, line2)

    # Persimmon accent line
    center_y -= 22*mm
    line_width = 38*mm
    c.setStrokeColor(PERSIMMON)
    c.setLineWidth(0.8)
    c.line((WIDTH - line_width) / 2, center_y, (WIDTH + line_width) / 2, center_y)

    # Brand mark
    center_y -= 22*mm
    c.setFont('GeneralSans', 17)
    c.setFillColor(WASHI)
    brand = "hisoles"
    bw = c.stringWidth(brand, 'GeneralSans', 17)
    c.drawString((WIDTH - bw) / 2, center_y, brand)

    # Bottom info
    c.setFont('IBMPlexMono', 6.5)
    c.setFillColor(Color(0.98, 0.976, 0.965, alpha=0.45))
    c.drawCentredString(WIDTH/2, 28*mm, "hisoles.com")
    c.drawCentredString(WIDTH/2, 20*mm, "Brand Strategy  •  December 2025  •  12")


def main():
    output_path = "/Users/MarnixPluim/hisoles/docs/hisoles-brand-strategy.pdf"
    c = canvas.Canvas(output_path, pagesize=A4)

    # Generate all pages
    create_cover_page(c)
    c.showPage()

    create_philosophy_page(c)
    c.showPage()

    create_audience_page(c)
    c.showPage()

    create_product_page(c)
    c.showPage()

    create_design_system_page(c)
    c.showPage()

    create_narrative_page(c)
    c.showPage()

    create_voice_page(c)
    c.showPage()

    create_positioning_page(c)
    c.showPage()

    create_testimonials_page(c)
    c.showPage()

    create_architecture_page(c)
    c.showPage()

    create_technical_specs_page(c)
    c.showPage()

    create_closing_page(c)

    c.save()
    print(f"PDF generated: {output_path}")


if __name__ == "__main__":
    main()
