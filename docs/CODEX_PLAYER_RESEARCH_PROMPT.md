# Codex prompt: player-by-player research

Use this prompt when updating one athlete at a time.

```text
Update the PL Commentary Bank database for exactly one athlete.

Target athlete:
- Group:
- Lot:
- Name:
- Kana:
- English name:
- Class:
- Team:

Rules:
1. Do not change the v5.9.6_LOCK layout.
2. Do not change src/styles.css unless explicitly requested.
3. Search by Japanese name, name variants, kana, and English name.
4. Prioritize official result PDFs, Goodlift/IPF, JPA/HPA, and record databases.
5. Add only confirmed rows to data/database.json with status 確認済.
6. Put uncertain rows into data/research-candidates.json, not into the confirmed histories.
7. Keep sources in the sources array and connect histories by sourceIds.
8. Preserve A4 landscape PDF output behavior.
9. Summarize exactly which rows were confirmed and which remain candidates.
```
