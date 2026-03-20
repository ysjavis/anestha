import { currentLanguage, t } from '../i18n.js';

// -----------------------------
// DOM references
// -----------------------------

const languageSelect = document.getElementById("language-select");
const feedbackGeneralLink = document.getElementById("feedback-general-link");
const feedbackReferenceLink = document.getElementById("feedback-reference-link");
const feedbackBugLink = document.getElementById("feedback-bug-link");
const contactLink = document.getElementById("contact-link");
const contactEmailRow = document.getElementById("contact-email-row");
const contactEmailText = document.getElementById("contact-email-text");
const feedbackStatus = document.getElementById("feedback-status");
const supportDonateCard = document.getElementById("support-donate-card");
const supportTossLink = document.getElementById("support-toss-link");
const supportKofiLink = document.getElementById("support-kofi-link");
const supportStatus = document.getElementById("support-status");

// -----------------------------
// Config
// -----------------------------

const FEEDBACK_CONFIG = {
  generalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  referenceUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  bugUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  email: ""
};
const CONTACT_CONFIG = {
  url: "",
  email: "Anestha.contact@gmail.com"
};
const SUPPORT_CONFIG = {
  tossUrl: "",
  kofiUrl: ""
};

// -----------------------------
// Feedback / support helpers
// -----------------------------

function buildFeedbackMailto(subject, body) {
  if (!FEEDBACK_CONFIG.email) {
    return "";
  }

  const query = new URLSearchParams({
    subject: subject,
    body: body
  });

  return `mailto:${FEEDBACK_CONFIG.email}?${query.toString()}`;
}

function buildContactMailto() {
  if (!CONTACT_CONFIG.email) {
    return "";
  }

  const query = new URLSearchParams({
    subject: "Anestha inquiry",
    body: "Name:\nInstitution (optional):\nTopic:\nMessage:\n"
  });

  return `mailto:${CONTACT_CONFIG.email}?${query.toString()}`;
}

function resolveFeedbackHref(type) {
  if (type === "general") {
    return FEEDBACK_CONFIG.generalUrl || buildFeedbackMailto(
      "Anestha feedback",
      "Category: General feedback\nCalculator:\nDrug/Feature:\nWhat happened?\nWhat would you like to improve?\n"
    );
  }

  if (type === "reference") {
    return FEEDBACK_CONFIG.referenceUrl || buildFeedbackMailto(
      "Anestha reference issue",
      "Category: Reference issue\nCalculator:\nDrug/Feature:\nCurrent displayed content:\nWhat seems incorrect?\nReference/source:\n"
    );
  }

  return FEEDBACK_CONFIG.bugUrl || buildFeedbackMailto(
    "Anestha bug report",
    "Category: Bug report\nCalculator:\nDevice/Browser:\nWhat happened?\nExpected behavior:\nSteps to reproduce:\n"
  );
}

function resolveContactHref() {
  return CONTACT_CONFIG.url || buildContactMailto() || resolveFeedbackHref("general");
}

function applyActionLink(element, href) {
  if (!element) {
    return;
  }

  if (href) {
    element.href = href;
    element.classList.remove("is-disabled");
    element.setAttribute("aria-disabled", "false");
    return;
  }

  element.href = "#";
  element.classList.add("is-disabled");
  element.setAttribute("aria-disabled", "true");
}

// -----------------------------
// Exported functions
// -----------------------------

export function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage === "en" ? "en" : "ko";

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    element.textContent = t(element.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach(function (element) {
    element.setAttribute("placeholder", t(element.dataset.i18nPlaceholder));
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(function (element) {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel));
  });

  if (languageSelect) {
    languageSelect.value = currentLanguage;
  }
}

export function updateFeedbackLinks() {
  const generalHref = resolveFeedbackHref("general");
  const referenceHref = resolveFeedbackHref("reference");
  const bugHref = resolveFeedbackHref("bug");
  const hasLiveChannel = Boolean(generalHref || referenceHref || bugHref);

  applyActionLink(feedbackGeneralLink, generalHref);
  applyActionLink(feedbackReferenceLink, referenceHref);
  applyActionLink(feedbackBugLink, bugHref);

  if (feedbackStatus) {
    feedbackStatus.textContent = hasLiveChannel
      ? t("feedback_status_configured")
      : t("feedback_status_unconfigured");
    feedbackStatus.classList.toggle("hidden", hasLiveChannel);
  }
}

export function updateSupportLinks() {
  const tossHref = SUPPORT_CONFIG.tossUrl || "";
  const kofiHref = SUPPORT_CONFIG.kofiUrl || "";
  const hasLiveChannel = Boolean(tossHref || kofiHref);
  const contactHref = resolveContactHref();
  const contactEmail = CONTACT_CONFIG.email || "";

  if (supportDonateCard) {
    supportDonateCard.classList.toggle("hidden", !hasLiveChannel);
  }

  applyActionLink(supportTossLink, tossHref);
  applyActionLink(supportKofiLink, kofiHref);
  applyActionLink(contactLink, contactHref);

  if (contactEmailRow && contactEmailText) {
    contactEmailText.textContent = contactEmail;
    contactEmailRow.classList.toggle("hidden", !contactEmail);
  }

  if (supportStatus) {
    supportStatus.textContent = hasLiveChannel
      ? t("support_status_configured")
      : t("support_status_unconfigured");
    supportStatus.classList.toggle("hidden", hasLiveChannel);
  }
}
