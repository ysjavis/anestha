import { REFERENCE_REGISTRY } from '../data/reference-registry.js';
import { currentLanguage, t } from '../i18n.js';

export function getReferenceItems(referenceIds) {
  return referenceIds.map(function (referenceId) {
    return REFERENCE_REGISTRY[referenceId];
  }).filter(Boolean);
}

export function getReferenceType(item) {
  if (!item) {
    return "";
  }

  if (item.referenceType) {
    return item.referenceType;
  }

  if (item.source === "AHA" || /algorithm|guideline/i.test(item.title)) {
    return "guideline";
  }

  if (item.source === "DailyMed" || item.source === "FDA" || /label dose/i.test(item.title)) {
    return "label";
  }

  if (item.source === "PubMed" || /study|meta-analysis/i.test(item.title)) {
    return "study";
  }

  if (item.source === "OpenAnesthesia" || /clinical|context|dosing/i.test(item.title)) {
    return "clinical";
  }

  return "";
}

export function getReferenceTypeBadge(type) {
  if (type === "guideline") {
    return '<span class="reference-badge is-guideline">Guideline</span>';
  }

  if (type === "label") {
    return '<span class="reference-badge is-label">Label</span>';
  }

  if (type === "clinical") {
    return '<span class="reference-badge is-clinical">Clinical</span>';
  }

  if (type === "study") {
    return '<span class="reference-badge is-study">Study-specific</span>';
  }

  return "";
}

export function getUseCaseBadge(useCase) {
  if (useCase === "ga-induction") {
    return '<span class="reference-badge is-use-case-induction">GA induction</span>';
  }

  if (useCase === "ga-maintenance") {
    return '<span class="reference-badge is-use-case-maintenance">GA maintenance</span>';
  }

  if (useCase === "procedural-sedation") {
    return '<span class="reference-badge is-use-case-sedation">Procedural sedation</span>';
  }

  if (useCase === "vasopressor-support") {
    return '<span class="reference-badge is-use-case-support">Hemodynamic support</span>';
  }

  return "";
}

export function getRangeSourceType(drug) {
  return drug && drug.rangeSourceType ? drug.rangeSourceType : "";
}

export function renderRangeSourceBadge(container, drug) {
  if (!container) {
    return;
  }

  container.innerHTML = getReferenceTypeBadge(getRangeSourceType(drug));
}

export function applyRangeSourceTheme(element, drug) {
  if (!element) {
    return;
  }

  element.classList.remove("has-range-label", "has-range-clinical", "has-range-study");

  const type = getRangeSourceType(drug);
  if (type) {
    element.classList.add(`has-range-${type}`);
  }
}

export function getDrugUseCaseSummary(drug) {
  if (!drug || !drug.useCaseLabel) {
    return "Not specified";
  }

  return drug.useCaseLabel;
}

export function getDisplaySourceLabel(rawSource) {
  const source = (rawSource || "").trim();

  if (!source) {
    return "-";
  }

  if (source === "Editable local preset") {
    return currentLanguage === "en" ? "Literature-based summary value" : "문헌 기반 요약값";
  }

  return source;
}

export function extractReferenceYears(text) {
  if (typeof text !== "string" || !text.trim()) {
    return [];
  }

  const matches = text.match(/\b(19|20)\d{2}\b/g);
  return matches ? Array.from(new Set(matches)) : [];
}

export function getReferenceSourceYear(item) {
  if (!item) {
    return "";
  }

  if (item.sourceYear) {
    return String(item.sourceYear);
  }

  const candidateYears = [
    ...extractReferenceYears(item.title),
    ...extractReferenceYears(item.url)
  ];

  return candidateYears.length ? candidateYears[0] : "";
}

export function getReferenceMetaText(item) {
  if (!item) {
    return "";
  }

  const sourceLine = item.source
    ? `<span class="reference-summary-meta-line reference-summary-meta-source">${item.source}</span>`
    : "";
  const secondaryParts = [];
  const sourceYear = getReferenceSourceYear(item);

  if (sourceYear) {
    secondaryParts.push(`${t("source_year")}: ${sourceYear}`);
  }

  if (item.lastReviewed) {
    secondaryParts.push(`${t("last_reviewed")}: ${item.lastReviewed}`);
  }

  const secondaryLine = secondaryParts.length
    ? `<span class="reference-summary-meta-line reference-summary-meta-secondary">${secondaryParts.join(" · ")}</span>`
    : "";

  return `${sourceLine}${secondaryLine}`;
}

export function getReferenceDisclaimer(item) {
  const type = getReferenceType(item);
  const isEnglish = currentLanguage === "en";

  if (type === "label") {
    return isEnglish
      ? "Label references reflect approved prescribing information. Confirm concentration, indication, and local protocol before use."
      : "Label reference는 허가사항 기반 자료입니다. 실제 사용 전 농도, 적응증, 기관 프로토콜을 함께 확인하세요.";
  }

  if (type === "guideline") {
    return isEnglish
      ? "Guideline references summarize official algorithm or society recommendations, but they still require patient-specific interpretation and protocol alignment."
      : "Guideline reference는 공식 algorithm 또는 학회 권고를 요약한 자료이지만, 실제 적용에는 환자 상태와 기관 프로토콜을 함께 반영해야 합니다.";
  }

  if (type === "study") {
    return isEnglish
      ? "Study-specific references describe selected protocols or research settings and should not be treated as universal dosing standards."
      : "Study-specific reference는 특정 연구 프로토콜 또는 제한된 연구 환경을 반영하므로, 절대적 표준 용법으로 해석하면 안 됩니다.";
  }

  return isEnglish
    ? "Clinical references describe common practice patterns or selected educational summaries and should be checked against the original source and local protocol."
    : "Clinical reference는 관행적 사용이나 교육용 요약을 반영하므로, 원문과 기관 프로토콜을 함께 확인해야 합니다.";
}

export function getReferenceDetailMetadataMarkup(item) {
  const detailRows = [];

  if (item.referenceContext) {
    detailRows.push(`<p class="reference-detail-meta"><strong>${t("reference_context")}:</strong> ${item.referenceContext}</p>`);
  }

  if (item.checkSection) {
    detailRows.push(`<p class="reference-detail-meta"><strong>${t("reference_check_section")}:</strong> ${item.checkSection}</p>`);
  }

  if (!detailRows.length) {
    return "";
  }

  return `<div class="reference-detail-grid">${detailRows.join("")}</div>`;
}

export function renderUseCaseBadge(container, drug) {
  if (!container) {
    return;
  }

  container.innerHTML = getUseCaseBadge(drug && drug.useCase ? drug.useCase : "");
}

export function getRangeSourceSummary(drug) {
  if (!drug || !drug.rangeSourceType) {
    return "Not specified";
  }

  if (drug.rangeSourceType === "label") {
    return drug.rangeSourceNote || "Derived from product labeling and intended label-based dosing context.";
  }

  if (drug.rangeSourceType === "clinical") {
    return drug.rangeSourceNote || "Derived from clinical or perioperative practice references rather than a single package insert range.";
  }

  if (drug.rangeSourceType === "study") {
    return drug.rangeSourceNote || "Derived from a specific study context and not intended as a universal range.";
  }

  return drug.rangeSourceNote || "Not specified";
}

export function getRangeRationale(drug) {
  return drug && drug.rangeRationale
    ? drug.rangeRationale
    : "Verify against the original source, local protocol, and patient-specific context before use.";
}

export function renderReferenceList(container, referenceIds) {
  if (!container) {
    return;
  }

  const referenceItems = getReferenceItems(referenceIds);

  if (!referenceItems.length) {
    container.innerHTML = '<li>No references attached yet.</li>';
    return;
  }

  container.innerHTML = referenceItems.map(function (item) {
    const badgeStr = getReferenceTypeBadge(getReferenceType(item));
    const metaText = getReferenceMetaText(item);
    const detailMetadataMarkup = getReferenceDetailMetadataMarkup(item);
    const hasExpandedDetail = Boolean(item.usageNote || detailMetadataMarkup);

    if (hasExpandedDetail) {
      return `<li class="reference-item">
                <details class="reference-details">
                  <summary class="reference-summary">
                    <span class="reference-summary-title-row">
                      <span class="reference-summary-title">${item.title}</span>
                      ${badgeStr}
                    </span>
                    <span class="reference-summary-meta">${metaText}</span>
                  </summary>
                  <div class="reference-detail-body">
                    ${detailMetadataMarkup}
                    ${item.usageNote ? `<p class="reference-usage-note"><strong>${t("usage_note")}:</strong> ${item.usageNote}</p>` : ""}
                    <p class="reference-disclaimer">${getReferenceDisclaimer(item)}</p>
                    <a class="reference-external-link" href="${item.url}" target="_blank" rel="noreferrer">${item.linkLabel || "Open reference"}</a>
                  </div>
                </details>
              </li>`;
    }

    return `<li class="reference-item">
              <span class="reference-summary-title-row">
                <span class="reference-summary-title">${item.title}</span>
                ${badgeStr}
              </span>
              <span class="reference-summary-meta">${metaText}</span>
              <a class="reference-external-link" href="${item.url}" target="_blank" rel="noreferrer">${item.linkLabel || "Open reference"}</a>
            </li>`;
  }).join("");
}
