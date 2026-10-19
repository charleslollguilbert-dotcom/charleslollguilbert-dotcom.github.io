# Lumaitec — site web

Copie fidèle de https://lumaitec.com (site statique : HTML + `assets/styles.css` + `assets/chatbot.js`).

## Lancer en local

```
python3 serve.py
```

puis ouvrir http://localhost:8000. Le script reproduit la réécriture `/coaching` → `coaching.html`
faite par l'hébergeur. En production, il faut que l'hébergeur serve les URLs sans extension
(Netlify/Cloudflare Pages le font par défaut ; sur Apache, activer `MultiViews` ou une règle de rewrite).

## Pages

index, coaching, coaching-one-to-one, coaching-transitions, coaching-teams,
training, training-cohesion, training-working-genius, training-assessments,
ai, ai-tool-d, ai-cracken, ai-due-diligence, ai-advisory, about, contact.

Le formulaire de contact envoie vers formsubmit.co (info@lumaitec.com). Le chatbot est 100 % côté client.
