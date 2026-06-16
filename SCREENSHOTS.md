# Guida screenshot per soreya.app

Palette comune: sfondo `#0a0a0a`, accento `#67e8f9`, font Inter.

Esporta in **WebP** (qualità ~85). Nomi file coerenti con la tabella sotto.

---

## Formati consigliati

| Uso | Dimensioni | Note |
|-----|------------|------|
| Hero desktop | 1440 × 900 | Browser a larghezza fissa, barra indirizzi nascosta |
| Card prodotto | 1200 × 750 | Crop dal hero o vista dedicata |
| Mobile (Chat) | 390 × 844 | Simulatore iPhone 14 / Pixel 7 |
| Sezione split | 1280 × 800 | Metà pagina o componente isolato |

---

## Soreya Assistant (`localhost:3002`)

Avvia da `soreya-ai-secretary/apps/web`:

```bash
npm run dev -- -p 3002
```

| ID | URL | Cosa catturare | File suggerito |
|----|-----|----------------|----------------|
| A1 | `/` | Landing dark: hero + mock UI | `assistant-landing.webp` |
| A2 | `/app?screenshot=1` | Demo playground con richiesta WhatsApp precompilata + bozze in attesa | `assistant-demo.webp` |
| A3 | `/dashboard?screenshot=1` | Dashboard giornata: metriche + pannello approvazioni | `assistant-dashboard.webp` |
| A4 | `/` (scroll) | Sezione “Come funziona” / approval flow | `assistant-how.webp` |
| A5 | `/` (scroll) | Trust / sicurezza | `assistant-trust.webp` |

**Note:** `/app` e `/dashboard` restano tema chiaro (prodotto). `?screenshot=1` nasconde link impostazioni e pre-semina la demo.

---

## HumanSurface (`localhost:3000`)

```bash
npm run dev
```

| ID | URL | Cosa catturare | File suggerito |
|----|-----|----------------|----------------|
| H1 | `/` | Hero + trust bar | `humansurface-landing.webp` |
| H2 | `/#dashboard-preview` | Anteprima dashboard (scroll fino al blocco) | `humansurface-dashboard.webp` |
| H3 | `/esempio-report` | Report demo: score + sezioni | `humansurface-report.webp` |
| H4 | `/buy` | Prenota call + piani | `humansurface-buy.webp` |
| H5 | `/thank-you` | Conferma richiesta | `humansurface-thankyou.webp` |

---

## Soreya Chat (Flutter)

Da `Soreya/soreya`:

```bash
flutter run --dart-define=SCREENSHOT_MODE=true
```

| ID | Schermata | Come arrivarci | File suggerito |
|----|-----------|----------------|----------------|
| C1 | Lock | Schermata iniziale (4 puntini PIN, senza biometria) | `chat-lock.webp` |
| C2 | Lista chat | Tocca il logo sulla lock → Home → tab Chat | `chat-list.webp` |
| C3 | Thread | Apri **Marta Bianchi** (conversazione più ricca) | `chat-thread.webp` |
| C4 | Verifica | Dal thread → icona scudo → safety number | `chat-verify.webp` |
| C5 | Scanner QR | Lista → Aggiungi contatto (frame statico, no camera) | `chat-scanner.webp` |
| C6 | Identità | Lista → icona QR → “La mia identità” | `chat-identity.webp` |

**Note:** in screenshot mode i contatti demo sono pre-caricati; i non verificati sono nascosti; identità fissa “Enrico Demo”.

Prima di catturare, fai un **hot restart** se hai già aperto l’app senza `SCREENSHOT_MODE`.

---

## Marketing site (`localhost:8080`)

Riferimento visivo attuale. Dopo gli screenshot, aggiornare:

- `index.html` — hero e card prodotti
- `products/soreya-assistant.html`
- `products/soreya-chat.html`
- `products/humansurface.html`

Cartella asset suggerita: `assets/screenshots/` (creare se manca).

---

## Checklist pre-capture

- [ ] Browser zoom 100%, tema scuro OS coerente
- [ ] Nessuna barra dev / estensioni visibili
- [ ] Lingua IT (HumanSurface: cookie/header locale)
- [ ] Assistant: attendere 1–2 s su `?screenshot=1` per il seed playground
- [ ] Chat: `SCREENSHOT_MODE=true` attivo
- [ ] Esportazione WebP, peso &lt; 300 KB per hero se possibile

---

## Dopo gli screenshot

Invia i file o mettili in `Soreua Site Pages/assets/screenshots/` e chiedi l’aggiornamento del sito marketing.
