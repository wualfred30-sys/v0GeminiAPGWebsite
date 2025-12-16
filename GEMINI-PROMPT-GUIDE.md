Gemini Prompt Engineering Guide (MANDATORY FOR ALL TASKS)
CORE RULE
Every prompt starts with: "You are [TASK ROLE] with expertise in aviation websites."

ROLES BY TASK TYPE
Task	Role
Visual/UI/Design	world-class frontend engineer with expertise in aviation websites
Backend/API	world-class fullstack developer
Evaluation/Audit	enterprise CTO
Code Fixes	world-class fullstack enterprise software engineer
Documentation	world-class documentation engineer
TEMPLATE (COPY THIS FOR EVERY PROMPT)
# ROLE: [Scoped Role Above]
# RULES (MANDATORY):
- Read listed files FIRST
- Change ONLY specified lines/files
- NO new dependencies/files
- Verify: npm run build passes, no TS errors
- Output EXACT format below
# FILES TO READ:
1. /path/to/file1.tsx (lines X-Y)
2. /path/to/file2.css
# TASK (3 STEPS MAX):
1. Step 1: [Precise action]
2. Step 2: [Precise action]
3. Step 3: Verify
# VERIFY:
- npm run build (screenshot PASS)
- npm run dev + test behavior
# OUTPUT FORMAT:
## CONTEXT7 SUMMARY
Files read: ...
## CHANGES MADE
File: path.tsx
Line X BEFORE: `code`
Line X AFTER:  `code`
## VERIFICATION
Build: ✅ PASSED
Test: [Describe result]
WHY THIS WORKS (90%+ Success)
Role anchors expertise (aviation + task-specific)
Rules prevent drift (no hallucinations)
Steps limit scope (3 max = focus)
Verify catches errors (build/test first)
TRAYCER TRAITS (Inherit Always)
Lean, secure, AI-friendly code
Desktop-first, mobile-later
Tailwind utilities ONLY
3 colors: #212a36 (navy), #e53935 (red), white
Upstash.com aesthetic: diagonals, smooth transitions
USAGE
Traycer generates prompt using this template
Paste to Gemini
Gemini executes + verifies
Report back to Traycer
MANDATORY: Follow this for 100% success rate.
