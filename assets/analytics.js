/* =============================================================
   LUMAITEC - Google Analytics 4 + consentement (RGPD)
   -------------------------------------------------------------
   1. Collez ci-dessous votre identifiant de mesure GA4.
      Il se trouve dans Google Analytics : Admin > Flux de donnees
      > votre site. Il ressemble a : G-XXXXXXXXXX
   2. Tant que cette valeur est vide, rien ne se charge et aucune
      banniere ne s'affiche : le site reste sans aucun traceur.
   ============================================================= */
var GA_MEASUREMENT_ID = '';
/* ============================================================= */

(function () {
  'use strict';
  if (!GA_MEASUREMENT_ID) return;               // pas d'identifiant : on ne fait rien

  var KEY = 'lmt-consent';
  var choice = null;
  try { choice = localStorage.getItem(KEY); } catch (e) {}

  /* --- Mode consentement : tout refuse par defaut (exige dans l'UE) --- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    wait_for_update: 500
  });

  function loadGA() {
    if (document.getElementById('ga-lib')) return;
    var s = document.createElement('script');
    s.id = 'ga-lib';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_MEASUREMENT_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true });
  }

  function accept() {
    try { localStorage.setItem(KEY, 'granted'); } catch (e) {}
    gtag('consent', 'update', { analytics_storage: 'granted' });
    loadGA();
    hide();
  }
  function refuse() {
    try { localStorage.setItem(KEY, 'denied'); } catch (e) {}
    hide();
  }
  function hide() {
    var b = document.getElementById('lmt-consent');
    if (b) b.remove();
  }

  function banner() {
    var el = document.createElement('div');
    el.id = 'lmt-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Measurement consent');
    el.innerHTML =
      '<div class="lc-text"><strong>We measure how this site is used.</strong>' +
      ' Google Analytics helps us understand which pages are useful and where people get stuck.' +
      ' It sets cookies and sends data to Google. Nothing you write in a form is ever measured.' +
      ' <a href="/privacy">Read our privacy policy</a>.</div>' +
      '<div class="lc-btns"><button type="button" id="lc-no">Refuse</button>' +
      '<button type="button" id="lc-yes">Accept</button></div>';
    document.body.appendChild(el);
    document.getElementById('lc-yes').addEventListener('click', accept);
    document.getElementById('lc-no').addEventListener('click', refuse);
  }

  if (choice === 'granted') { gtag('consent', 'update', { analytics_storage: 'granted' }); loadGA(); }
  else if (choice !== 'denied') {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', banner);
    else banner();
  }

  /* Permet de revenir sur son choix depuis le pied de page */
  window.lmtResetConsent = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    location.reload();
  };
})();
