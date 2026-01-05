#!/usr/bin/env python3
"""
ATTENTION ENTROPY — Visual Artifact Generator

A museum-quality visual expression of the philosophy descended from
Tadao Ando, Kenya Hara, and the sacred economics of attention.

Living Tension: Washi (warm void) vs Sumi (cold void)
Single earned fire: Persimmon

SECOND PASS: Refined for pristine, masterpiece-level craftsmanship.
Every element questioned. Every relationship verified.
"""

import math
from pathlib import Path
from reportlab.lib.pagesizes import A3
from reportlab.lib.colors import Color
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.units import mm

# === DESIGN TOKENS (from philosophy) ===

# Clockwork Colors — calibrated for living tension
WASHI = Color(252/255, 250/255, 245/255)      # #FCFAF5 - aged paper (warm void)
SUMI = Color(26/255, 26/255, 26/255)          # #1A1A1A - dried ink (cold void)
PERSIMMON = Color(232/255, 93/255, 4/255)     # #E85D04 - autumn flame (earned fire)
STONE = Color(74/255, 74/255, 74/255)         # #4A4A4A - weathered mineral

# Opacity variants — refined for maximum subtlety
def with_alpha(color, alpha):
    return Color(color.red, color.green, color.blue, alpha)

# Canvas dimensions (A3 portrait for gallery presence)
WIDTH, HEIGHT = A3
MARGIN = 45 * mm  # Increased for more generous breathing room
CENTER_X = WIDTH / 2
CENTER_Y = HEIGHT / 2

# Golden ratio for proportional harmony
PHI = 1.618033988749

# Fonts directory
FONTS_DIR = Path("/Users/MarnixPluim/.claude/plugins/cache/anthropic-agent-skills/document-skills/f23222824449/skills/canvas-design/canvas-fonts")

def register_fonts():
    """Register typography that honors the philosophy."""
    pdfmetrics.registerFont(TTFont("Jura-Light", FONTS_DIR / "Jura-Light.ttf"))
    pdfmetrics.registerFont(TTFont("Jura-Medium", FONTS_DIR / "Jura-Medium.ttf"))
    pdfmetrics.registerFont(TTFont("IBMPlexMono", FONTS_DIR / "IBMPlexMono-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("InstrumentSerif", FONTS_DIR / "InstrumentSerif-Regular.ttf"))
    pdfmetrics.registerFont(TTFont("InstrumentSerif-Italic", FONTS_DIR / "InstrumentSerif-Italic.ttf"))

def draw_washi_ground(c):
    """
    The warm void — Washi as pregnant nothingness.
    Not absence, but infinite potential (Kenya Hara).
    """
    c.setFillColor(WASHI)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)

def draw_meridian_spine(c):
    """
    The central organizing principle — vertical descent.
    Honors Kakemono tradition. The grid is felt but never seen.
    """
    # Primary meridian — ghostly presence
    c.setStrokeColor(with_alpha(SUMI, 0.08))
    c.setLineWidth(0.5)
    c.line(CENTER_X, MARGIN, CENTER_X, HEIGHT - MARGIN)

    # Secondary structure lines — architectural ghost grid (Ando)
    grid_spacing = 60 * mm
    for offset in [-2, -1, 1, 2]:
        x = CENTER_X + (offset * grid_spacing)
        if MARGIN < x < WIDTH - MARGIN:
            c.setStrokeColor(with_alpha(SUMI, 0.03))
            c.line(x, MARGIN + 20*mm, x, HEIGHT - MARGIN - 20*mm)

def draw_threshold_markers(c):
    """
    The Five Laws encoded spatially — threshold moments.
    Each marker represents a Law, positioned along the meridian.
    Refined: Perfect vertical rhythm, consistent spacing.
    """
    # Positions calculated for visual harmony
    laws_positions = [
        (0.12, "EARNED ENTRY"),
        (0.27, "PREGNANT VOID"),
        (0.50, "LIVING MATERIALS"),  # Central — most important
        (0.73, "SACRED FRICTION"),
        (0.88, "THE THRESHOLD"),
    ]

    for i, (ratio, label) in enumerate(laws_positions):
        y = MARGIN + (HEIGHT - 2*MARGIN) * ratio

        # Horizontal threshold line — minimal, earned
        c.setStrokeColor(with_alpha(SUMI, 0.05))
        c.setLineWidth(0.25)
        line_width = 22 * mm
        c.line(CENTER_X - line_width, y, CENTER_X + line_width, y)

        # Threshold marker dot — subtle presence
        c.setFillColor(with_alpha(SUMI, 0.12))
        c.circle(CENTER_X, y, 1.2*mm, fill=1, stroke=0)

        # Law label — whispered, not announced
        c.setFont("IBMPlexMono", 4.5)
        c.setFillColor(with_alpha(STONE, 0.28))
        text_x = CENTER_X + 28*mm
        c.drawString(text_x, y - 1.2, label)

        # Roman numeral on left — systematic reference
        c.setFont("Jura-Light", 5.5)
        c.setFillColor(with_alpha(SUMI, 0.2))
        numerals = ["I", "II", "III", "IV", "V"]
        c.drawRightString(CENTER_X - 28*mm, y - 1.5, numerals[i])

def draw_attention_field(c):
    """
    The central visual element — consciousness as field.
    Geometric precision creating container for mystery (Ando).
    Refined: Golden ratio proportions, more subtle gradation.
    """
    field_center_y = CENTER_Y + 12*mm

    # Outer boundary — the container (barely visible)
    c.setStrokeColor(with_alpha(SUMI, 0.07))
    c.setLineWidth(0.35)
    outer_radius = 52 * mm
    c.circle(CENTER_X, field_center_y, outer_radius, fill=0, stroke=1)

    # Concentric rings — attention wavelengths (golden ratio spacing)
    radii = [outer_radius / PHI, outer_radius / (PHI * PHI),
             outer_radius / (PHI * PHI * PHI), outer_radius / (PHI ** 4)]
    for i, r in enumerate(radii):
        alpha = 0.04 + (i * 0.015)
        c.setStrokeColor(with_alpha(SUMI, alpha))
        c.setLineWidth(0.2)
        c.circle(CENTER_X, field_center_y, r, fill=0, stroke=1)

    # The core — where attention settles (persimmon earned)
    # Smaller, more precious
    c.setFillColor(with_alpha(PERSIMMON, 0.65))
    c.circle(CENTER_X, field_center_y, 2*mm, fill=1, stroke=0)

    # Inner glow — subtle aura
    c.setStrokeColor(with_alpha(PERSIMMON, 0.1))
    c.setLineWidth(0.2)
    c.circle(CENTER_X, field_center_y, 6*mm, fill=0, stroke=1)

def draw_entropy_pattern(c):
    """
    Repeating marks suggesting systematic observation.
    Dense accumulation that rewards sustained viewing.
    Refined: More controlled distribution, subtler presence.
    """
    import random
    random.seed(42)  # Reproducible entropy

    field_center_y = CENTER_Y + 12*mm

    # Fewer, more intentional marks
    for _ in range(120):
        # Distribute around the attention field with controlled randomness
        angle = random.uniform(0, 2 * math.pi)
        distance = random.gauss(72*mm, 18*mm)

        # More restrictive placement for cleaner composition
        if 58*mm < distance < 95*mm:
            x = CENTER_X + distance * math.cos(angle)
            y = field_center_y + distance * math.sin(angle)

            # Generous margins
            if MARGIN + 15*mm < x < WIDTH - MARGIN - 15*mm:
                if MARGIN + 40*mm < y < HEIGHT - MARGIN - 40*mm:
                    # Smaller, more uniform marks
                    size = random.uniform(0.25, 0.6)
                    alpha = random.uniform(0.025, 0.06)
                    c.setFillColor(with_alpha(SUMI, alpha))
                    c.circle(x, y, size*mm, fill=1, stroke=0)

def draw_header(c):
    """
    Movement title — breath mark in visual music.
    Typography as earned presence, not announcement.
    Refined: Perfect vertical rhythm, subtler presence.
    """
    header_y = HEIGHT - MARGIN

    # Title — spaced for contemplation
    c.setFont("Jura-Light", 8.5)
    c.setFillColor(with_alpha(SUMI, 0.55))

    title = "A T T E N T I O N   E N T R O P Y"
    title_width = c.stringWidth(title, "Jura-Light", 8.5)
    c.drawString(CENTER_X - title_width/2, header_y - 8*mm, title)

    # Subtitle — whispered
    c.setFont("InstrumentSerif-Italic", 6.5)
    c.setFillColor(with_alpha(STONE, 0.32))
    subtitle = "The Sacred Economics of Consciousness"
    subtitle_width = c.stringWidth(subtitle, "InstrumentSerif-Italic", 6.5)
    c.drawString(CENTER_X - subtitle_width/2, header_y - 16*mm, subtitle)

def draw_axiom(c):
    """
    The foundational truth — positioned with reverence.
    Refined: More generous spacing, perfect symmetry.
    """
    axiom_y = HEIGHT - MARGIN - 38*mm

    # Axiom line above — hair-thin
    c.setStrokeColor(with_alpha(SUMI, 0.08))
    c.setLineWidth(0.2)
    line_half = 48 * mm
    c.line(CENTER_X - line_half, axiom_y + 7*mm, CENTER_X + line_half, axiom_y + 7*mm)

    # The axiom itself
    c.setFont("InstrumentSerif", 7.5)
    c.setFillColor(with_alpha(SUMI, 0.48))
    axiom = "Attention is sacred. Every demand must be earned."
    axiom_width = c.stringWidth(axiom, "InstrumentSerif", 7.5)
    c.drawString(CENTER_X - axiom_width/2, axiom_y, axiom)

    # Axiom line below — matching
    c.line(CENTER_X - line_half, axiom_y - 5*mm, CENTER_X + line_half, axiom_y - 5*mm)

def draw_lineage(c):
    """
    The masters — positioned at the base as foundation.
    Refined: More subtle, better spacing.
    """
    base_y = MARGIN + 22*mm

    c.setFont("IBMPlexMono", 4.5)
    c.setFillColor(with_alpha(STONE, 0.25))

    lineage = "ANDO · HARA · MA"
    lineage_width = c.stringWidth(lineage, "IBMPlexMono", 4.5)
    c.drawString(CENTER_X - lineage_width/2, base_y, lineage)

    # Year marker — whispered
    c.setFont("IBMPlexMono", 3.5)
    c.setFillColor(with_alpha(STONE, 0.18))
    year = "EST. 2035"
    year_width = c.stringWidth(year, "IBMPlexMono", 3.5)
    c.drawString(CENTER_X - year_width/2, base_y - 7*mm, year)

def draw_corner_marks(c):
    """
    Registration marks — systematic reference anchors.
    Suggests this is a diagram from an imaginary discipline.
    Refined: Subtler, more precise placement.
    """
    mark_length = 6 * mm
    inset = 22 * mm

    c.setStrokeColor(with_alpha(SUMI, 0.06))
    c.setLineWidth(0.2)

    corners = [
        (inset, HEIGHT - inset),  # Top left
        (WIDTH - inset, HEIGHT - inset),  # Top right
        (inset, inset),  # Bottom left
        (WIDTH - inset, inset),  # Bottom right
    ]

    for x, y in corners:
        # Horizontal mark
        h_dir = 1 if x < CENTER_X else -1
        c.line(x, y, x + mark_length * h_dir, y)

        # Vertical mark
        v_dir = 1 if y < CENTER_Y else -1
        c.line(x, y, x, y + mark_length * v_dir)

def draw_scale_reference(c):
    """
    Scale bar — clinical precision.
    Refined: More delicate, better positioned.
    """
    scale_y = MARGIN + 10*mm
    scale_x = WIDTH - MARGIN - 32*mm
    scale_length = 18 * mm

    c.setStrokeColor(with_alpha(SUMI, 0.1))
    c.setLineWidth(0.3)
    c.line(scale_x, scale_y, scale_x + scale_length, scale_y)

    # Tick marks — subtle
    for i in range(4):
        tick_x = scale_x + (i * 6*mm)
        c.line(tick_x, scale_y - 0.8*mm, tick_x, scale_y + 0.8*mm)
    # End tick
    c.line(scale_x + scale_length, scale_y - 0.8*mm, scale_x + scale_length, scale_y + 0.8*mm)

    c.setFont("IBMPlexMono", 3.5)
    c.setFillColor(with_alpha(STONE, 0.2))
    c.drawString(scale_x + scale_length/2 - 4*mm, scale_y - 4*mm, "18mm")

def generate_attention_entropy_pdf():
    """
    Generate the visual artifact — museum-quality execution.
    """
    output_path = Path("/Users/MarnixPluim/dev/hisoles/docs/ATTENTION-ENTROPY.pdf")

    register_fonts()

    c = canvas.Canvas(str(output_path), pagesize=A3)

    # Layer 1: Ground (Washi void)
    draw_washi_ground(c)

    # Layer 2: Structure (invisible grid)
    draw_meridian_spine(c)
    draw_corner_marks(c)

    # Layer 3: Pattern (entropy marks)
    draw_entropy_pattern(c)

    # Layer 4: Central element (attention field)
    draw_attention_field(c)

    # Layer 5: Threshold markers (Five Laws)
    draw_threshold_markers(c)

    # Layer 6: Typography (breath marks)
    draw_header(c)
    draw_axiom(c)
    draw_lineage(c)
    draw_scale_reference(c)

    c.save()
    print(f"Generated: {output_path}")
    return output_path

if __name__ == "__main__":
    generate_attention_entropy_pdf()
