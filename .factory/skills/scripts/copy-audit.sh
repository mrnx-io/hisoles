#!/bin/bash
#
# Copy Audit Script
# Validates copy against core copywriting principles
#
# Usage: ./copy-audit.sh <file.txt>
#        cat copy.txt | ./copy-audit.sh
#
# Checks:
#   - Flesch readability score estimation
#   - Sentence and paragraph structure
#   - Decision Protocol alignment
#   - Common issues detection

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Read input
if [ -n "$1" ] && [ -f "$1" ]; then
    COPY=$(cat "$1")
elif [ ! -t 0 ]; then
    COPY=$(cat)
else
    echo "Usage: $0 <file.txt> or cat copy.txt | $0"
    exit 1
fi

echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}                     COPY AUDIT REPORT                         ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

# Basic metrics
WORD_COUNT=$(echo "$COPY" | wc -w | tr -d ' ')
CHAR_COUNT=$(echo "$COPY" | wc -c | tr -d ' ')
SENTENCE_COUNT=$(echo "$COPY" | grep -oE '[.!?]+' | wc -l | tr -d ' ')
PARAGRAPH_COUNT=$(echo "$COPY" | grep -c '^$' 2>/dev/null || echo "1")
((PARAGRAPH_COUNT++))

# Calculate average sentence length
if [ "$SENTENCE_COUNT" -gt 0 ]; then
    AVG_SENTENCE_LENGTH=$((WORD_COUNT / SENTENCE_COUNT))
else
    AVG_SENTENCE_LENGTH=$WORD_COUNT
fi

# Calculate average word length (syllables approximation)
# Simple heuristic: count vowel groups as syllables
SYLLABLE_COUNT=$(echo "$COPY" | grep -ioE '[aeiouy]+' | wc -l | tr -d ' ')
if [ "$WORD_COUNT" -gt 0 ]; then
    AVG_SYLLABLES_PER_WORD=$(echo "scale=2; $SYLLABLE_COUNT / $WORD_COUNT" | bc)
else
    AVG_SYLLABLES_PER_WORD="0"
fi

# Flesch Reading Ease estimation
# Formula: 206.835 - (1.015 × ASL) - (84.6 × ASW)
if [ "$WORD_COUNT" -gt 0 ] && [ "$SENTENCE_COUNT" -gt 0 ]; then
    FLESCH=$(echo "scale=1; 206.835 - (1.015 * $AVG_SENTENCE_LENGTH) - (84.6 * $AVG_SYLLABLES_PER_WORD)" | bc)
else
    FLESCH="N/A"
fi

echo -e "${YELLOW}METRICS${NC}"
echo "───────────────────────────────────────────────────────────────"
echo "  Words:              $WORD_COUNT"
echo "  Sentences:          $SENTENCE_COUNT"
echo "  Paragraphs:         $PARAGRAPH_COUNT"
echo "  Avg sentence:       $AVG_SENTENCE_LENGTH words"
echo "  Avg syllables/word: $AVG_SYLLABLES_PER_WORD"
echo ""

# Flesch score interpretation
echo -e "${YELLOW}READABILITY${NC}"
echo "───────────────────────────────────────────────────────────────"
echo -n "  Flesch score:       $FLESCH "

if [ "$FLESCH" != "N/A" ]; then
    FLESCH_INT=${FLESCH%.*}
    if [ "$FLESCH_INT" -ge 60 ] && [ "$FLESCH_INT" -le 70 ]; then
        echo -e "${GREEN}[OPTIMAL]${NC}"
    elif [ "$FLESCH_INT" -ge 50 ] && [ "$FLESCH_INT" -lt 60 ]; then
        echo -e "${YELLOW}[ACCEPTABLE]${NC}"
    elif [ "$FLESCH_INT" -gt 70 ] && [ "$FLESCH_INT" -le 80 ]; then
        echo -e "${YELLOW}[SLIGHTLY SIMPLE]${NC}"
    else
        echo -e "${RED}[NEEDS REVIEW]${NC}"
    fi

    echo ""
    echo "  Target: 60-70 (6th-8th grade level)"
    echo "  90-100: Very easy (5th grade)"
    echo "  60-70:  Standard (8th grade) ← TARGET"
    echo "  30-50:  Difficult (college)"
    echo "  0-30:   Very difficult (academic)"
else
    echo ""
fi
echo ""

# Structure analysis
echo -e "${YELLOW}STRUCTURE ANALYSIS${NC}"
echo "───────────────────────────────────────────────────────────────"

# Check for short first sentence (Sugarman Element #2)
FIRST_SENTENCE=$(echo "$COPY" | head -1 | sed 's/[.!?].*/&/' | head -1)
FIRST_SENTENCE_WORDS=$(echo "$FIRST_SENTENCE" | wc -w | tr -d ' ')
echo -n "  First sentence:     $FIRST_SENTENCE_WORDS words "
if [ "$FIRST_SENTENCE_WORDS" -le 10 ]; then
    echo -e "${GREEN}[GOOD - pulls reader in]${NC}"
elif [ "$FIRST_SENTENCE_WORDS" -le 15 ]; then
    echo -e "${YELLOW}[ACCEPTABLE]${NC}"
else
    echo -e "${RED}[CONSIDER SHORTENING]${NC}"
fi

# Check for P.S. (Kennedy Step 14)
if echo "$COPY" | grep -qiE 'P\.?S\.?'; then
    echo -e "  P.S. present:       ${GREEN}YES [Kennedy Step 14]${NC}"
else
    echo -e "  P.S. present:       ${YELLOW}NO [Consider adding]${NC}"
fi

# Check for CTA
if echo "$COPY" | grep -qiE '(click|buy|order|get|start|join|sign up|subscribe|download|call|contact)'; then
    echo -e "  CTA detected:       ${GREEN}YES${NC}"
else
    echo -e "  CTA detected:       ${RED}NO [Add clear call-to-action]${NC}"
fi

# Check for questions (engagement)
QUESTION_COUNT=$(echo "$COPY" | grep -oE '\?' | wc -l | tr -d ' ')
echo -n "  Questions:          $QUESTION_COUNT "
if [ "$QUESTION_COUNT" -ge 1 ] && [ "$QUESTION_COUNT" -le 5 ]; then
    echo -e "${GREEN}[ENGAGING]${NC}"
elif [ "$QUESTION_COUNT" -eq 0 ]; then
    echo -e "${YELLOW}[Consider adding]${NC}"
else
    echo -e "${YELLOW}[Many - ensure purposeful]${NC}"
fi
echo ""

# Word analysis
echo -e "${YELLOW}PERSUASION SIGNALS${NC}"
echo "───────────────────────────────────────────────────────────────"

# "You" count (personal connection)
YOU_COUNT=$(echo "$COPY" | grep -ioE '\byou\b' | wc -l | tr -d ' ')
I_COUNT=$(echo "$COPY" | grep -ioE '\bi\b' | wc -l | tr -d ' ')
echo "  'You' count:        $YOU_COUNT"
echo "  'I' count:          $I_COUNT"

if [ "$YOU_COUNT" -gt "$I_COUNT" ]; then
    echo -e "  You/I ratio:        ${GREEN}Reader-focused [GOOD]${NC}"
else
    echo -e "  You/I ratio:        ${YELLOW}Consider more 'you' focus${NC}"
fi

# Power words check
POWER_WORDS="free|new|now|instant|discover|secret|proven|guarantee|results|save|easy|amazing|exclusive|limited|urgent|act"
POWER_COUNT=$(echo "$COPY" | grep -ioE "\b($POWER_WORDS)\b" | wc -l | tr -d ' ')
echo -n "  Power words:        $POWER_COUNT "
if [ "$POWER_COUNT" -ge 3 ]; then
    echo -e "${GREEN}[GOOD]${NC}"
else
    echo -e "${YELLOW}[Consider adding]${NC}"
fi

# Urgency/scarcity signals (verify these are real and enforceable)
URGENCY_WORDS="now|today|limited|hurry|deadline|expires|only|last|final|act fast|before|ends"
URGENCY_COUNT=$(echo "$COPY" | grep -ioE "\b($URGENCY_WORDS)\b" | wc -l | tr -d ' ')
echo -n "  Urgency signals:    $URGENCY_COUNT "
if [ "$URGENCY_COUNT" -ge 1 ]; then
    echo -e "${YELLOW}[VERIFY: Is urgency real and enforceable?]${NC}"
else
    echo -e "${GREEN}[None - OK if no real deadline exists]${NC}"
fi
echo ""

# Decision Protocol check
echo -e "${YELLOW}DECISION PROTOCOL${NC}"
echo "───────────────────────────────────────────────────────────────"
echo "  Manual verification required for:"
echo ""
echo "  [ ] 1. Does this earn the attention it demands?"
echo "      (Every word pays its cost in meaning)"
echo ""
echo "  [ ] 2. Does its absence diminish the whole?"
echo "      (Cut ruthlessly until cutting would diminish)"
echo ""
echo "  [ ] 3. Will this age with dignity?"
echo "      (No trendy slang or dated references)"
echo ""
echo "  [ ] 4. Does this ground the human, or seduce the reflex?"
echo "      (Sacred friction, not frictionless deception)"
echo ""
echo "  [ ] 5. Does this honor the crossing?"
echo "      (CTA as ritual, not manipulation)"
echo ""

# Rule of One check
echo -e "${YELLOW}RULE OF ONE VERIFICATION${NC}"
echo "───────────────────────────────────────────────────────────────"
echo "  Manual verification required:"
echo ""
echo "  [ ] One Good Idea (instant grasp, unique, jolting)"
echo "  [ ] One Core Emotion (LF8 driver identified)"
echo "  [ ] One Captivating Story (validates promise)"
echo "  [ ] One Desirable Benefit (dream outcome clear)"
echo "  [ ] One Inevitable Response (singular CTA)"
echo ""

# Truth Gate check
echo -e "${YELLOW}TRUTH GATE (7 Tests)${NC}"
echo "───────────────────────────────────────────────────────────────"
echo "  For every claim, verify:"
echo ""
echo "  [ ] 1. Specificity: Is the claim falsifiable?"
echo "  [ ] 2. Evidence: Could I prove this in court?"
echo "  [ ] 3. Worst-Case Reader: How would skeptic interpret?"
echo "  [ ] 4. Hostile Auditor: Would regulator flag this?"
echo "  [ ] 5. Post-Purchase: Would buyer still agree?"
echo "  [ ] 6. Conditions Disclosed: Are limitations visible?"
echo "  [ ] 7. Consent Preserved: Does reader choose freely?"
echo ""
echo "  If ANY urgency/scarcity is present, verify it is:"
echo "  [ ] Real and enforceable (not manufactured)"
echo "  [ ] Honestly stated (no countdown timers that reset)"
echo ""

# Summary
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}                         SUMMARY                               ${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
echo ""

ISSUES=0

if [ "$FLESCH" != "N/A" ]; then
    FLESCH_INT=${FLESCH%.*}
    if [ "$FLESCH_INT" -lt 50 ] || [ "$FLESCH_INT" -gt 80 ]; then
        echo -e "  ${RED}!${NC} Readability needs adjustment (target: 60-70)"
        ((ISSUES++))
    fi
fi

if [ "$AVG_SENTENCE_LENGTH" -gt 25 ]; then
    echo -e "  ${RED}!${NC} Average sentences too long (target: 15-20 words)"
    ((ISSUES++))
fi

if [ "$FIRST_SENTENCE_WORDS" -gt 15 ]; then
    echo -e "  ${RED}!${NC} First sentence could be shorter"
    ((ISSUES++))
fi

if [ "$YOU_COUNT" -le "$I_COUNT" ]; then
    echo -e "  ${YELLOW}!${NC} Consider more reader-focused language"
    ((ISSUES++))
fi

# Urgency is only flagged if present but potentially manufactured
if [ "$URGENCY_COUNT" -ge 3 ]; then
    echo -e "  ${YELLOW}!${NC} Multiple urgency signals detected - verify all are real"
    ((ISSUES++))
fi

if [ "$ISSUES" -eq 0 ]; then
    echo -e "  ${GREEN}✓ No automated issues detected${NC}"
fi

echo ""
echo "  Complete manual Decision Protocol and Rule of One checks above."
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════════${NC}"
