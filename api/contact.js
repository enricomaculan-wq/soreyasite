const INTEREST_LABELS = {
  demo: "Demo Soreya",
  confronto: "Confronto operativo",
  partnership: "Partnership / rivendita",
  integrazione: "Integrazione con clienti",
  altro: "Altro",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: "Servizio email non configurato." });
  }

  const body = req.body ?? {};
  const nome = String(body.nome ?? "").trim();
  const azienda = String(body.azienda ?? "").trim();
  const email = String(body.email ?? "").trim();
  const telefono = String(body.telefono ?? "").trim();
  const interesse = String(body.interesse ?? "").trim();
  const messaggio = String(body.messaggio ?? "").trim();
  const honeypot = String(body.website ?? "").trim();

  if (honeypot) {
    return res.status(200).json({ ok: true });
  }

  if (!nome || !azienda || !email || !interesse) {
    return res.status(400).json({ error: "Compila i campi obbligatori." });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email non valida." });
  }

  const interesseLabel = INTEREST_LABELS[interesse] ?? interesse;
  const to = process.env.CONTACT_TO || "support@soreya.app";
  const from =
    process.env.CONTACT_FROM || "Soreya <noreply@soreya.app>";

  const html = `
    <h2>Nuova richiesta dal form WMF</h2>
    <p><strong>Nome:</strong> ${escapeHtml(nome)}</p>
    <p><strong>Azienda:</strong> ${escapeHtml(azienda)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefono:</strong> ${escapeHtml(telefono || "—")}</p>
    <p><strong>Interesse:</strong> ${escapeHtml(interesseLabel)}</p>
    <p><strong>Messaggio:</strong></p>
    <p>${escapeHtml(messaggio || "—").replace(/\n/g, "<br>")}</p>
  `.trim();

  const text = [
    "Nuova richiesta dal form WMF",
    "",
    `Nome: ${nome}`,
    `Azienda: ${azienda}`,
    `Email: ${email}`,
    `Telefono: ${telefono || "—"}`,
    `Interesse: ${interesseLabel}`,
    "",
    "Messaggio:",
    messaggio || "—",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `[WMF] ${interesseLabel} — ${azienda}`,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error:", response.status, detail);
      return res.status(502).json({ error: "Invio email fallito. Riprova più tardi." });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return res.status(500).json({ error: "Errore interno. Riprova più tardi." });
  }
}
