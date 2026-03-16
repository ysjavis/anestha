// -----------------------------
// DOM references
// -----------------------------

const form = document.getElementById("infusion-form");
const resetButton = document.getElementById("reset-button");
const errorMessage = document.getElementById("error-message");
const resultCard = document.getElementById("result-card");
const resultLabel = document.getElementById("result-label");
const primaryResult = document.getElementById("primary-result");
const secondaryResultLabel = document.getElementById("secondary-result-label");
const secondaryResult = document.getElementById("secondary-result");
const concentrationResult = document.getElementById("concentration-result");
const concentrationExplanation = document.getElementById("concentration-explanation");
const rateExplanation = document.getElementById("rate-explanation");
const infusionReferenceList = document.getElementById("infusion-reference-list");
const resultWarning = document.getElementById("result-warning");
const resultRangeBadge = document.getElementById("result-range-badge");
const resultUseCaseText = document.getElementById("result-use-case-text");
const resultUseCaseBadge = document.getElementById("result-use-case-badge");
const multiDrugWarning = document.getElementById("multi-drug-warning");
const drugSelect = document.getElementById("drug-select");
const drugHelp = document.getElementById("drug-help");
const favoriteDrugButton = document.getElementById("favorite-drug-button");
const favoriteDrugsContainer = document.getElementById("favorite-drugs");
const recentDrugsContainer = document.getElementById("recent-drugs");
const presetSummary = document.getElementById("preset-summary");
const referenceRangeText = document.getElementById("reference-range-text");
const referenceRangeBadge = document.getElementById("reference-range-badge");
const referenceUseCaseText = document.getElementById("reference-use-case-text");
const referenceUseCaseBadge = document.getElementById("reference-use-case-badge");
const referenceRangeSourceText = document.getElementById("reference-range-source-text");
const referenceRangeRationaleText = document.getElementById("reference-range-rationale-text");
const alternateUseCaseRow = document.getElementById("alternate-use-case-row");
const alternateUseCaseText = document.getElementById("alternate-use-case-text");
const drugNotesText = document.getElementById("drug-notes-text");
const drugDilutionText = document.getElementById("drug-dilution-text");
const drugDilutionButton = document.getElementById("drug-dilution-button");
const drugSourceText = document.getElementById("drug-source-text");
const drugLastReviewedText = document.getElementById("drug-last-reviewed-text");
const concentrationUnitLabel = document.getElementById("concentration-unit-label");
const doseUnitLabel = document.getElementById("dose-unit-label");
const nitroglycerinDoseViewSelect = document.getElementById("nitroglycerin-dose-view");
const nitroglycerinDoseViewHelp = document.getElementById("nitroglycerin-dose-view-help");
const customDrugFields = document.getElementById("custom-drug-fields");
const referenceTableCard = document.getElementById("reference-table-card");
const referenceTableCaption = document.getElementById("reference-table-caption");
const referenceTableBody = document.getElementById("reference-table-body");
const infusionModeTabs = document.querySelectorAll("[data-infusion-mode-tab]");
const infusionModePanels = document.querySelectorAll("[data-infusion-mode-panel]");
const infusionViewTabs = document.querySelectorAll("[data-infusion-view-tab]");
const infusionViewPanels = document.querySelectorAll("[data-infusion-view-panel]");
const calculatorTabs = document.querySelectorAll("[data-calculator-tab]");
const calculatorViews = document.querySelectorAll("[data-calculator-view]");
const dantroleneForm = document.getElementById("dantrolene-form");
const dantroleneResetButton = document.getElementById("dantrolene-reset-button");
const dantroleneErrorMessage = document.getElementById("dantrolene-error-message");
const dantroleneResultCard = document.getElementById("dantrolene-result-card");
const dantrolenePrimaryResult = document.getElementById("dantrolene-primary-result");
const dantroleneSecondaryResult = document.getElementById("dantrolene-secondary-result");
const dantroleneContext = document.getElementById("dantrolene-context");
const dantroleneInitialVials = document.getElementById("dantrolene-initial-vials");
const dantroleneMaxVials = document.getElementById("dantrolene-max-vials");
const dantroleneVialExplanation = document.getElementById("dantrolene-vial-explanation");
const dantroleneReconstitutionExplanation = document.getElementById("dantrolene-reconstitution-explanation");
const dantroleneInitialGuide = document.getElementById("dantrolene-initial-guide");
const dantroleneRepeatGuide = document.getElementById("dantrolene-repeat-guide");
const dantroleneMaintenanceGuide = document.getElementById("dantrolene-maintenance-guide");
const dantroleneReferenceList = document.getElementById("dantrolene-reference-list");
const dantroleneResultWarning = document.getElementById("dantrolene-result-warning");
const pediatricForm = document.getElementById("pediatric-form");
const pediatricResetButton = document.getElementById("pediatric-reset-button");
const pediatricDrugSelect = document.getElementById("pediatric-drug-select");
const pediatricModeTabs = document.querySelectorAll("[data-pediatric-mode-tab]");
const pediatricModePanels = document.querySelectorAll("[data-pediatric-mode-panel]");
const pediatricDrugHelp = document.getElementById("pediatric-drug-help");
const pediatricToggleUnverifiedButton = document.getElementById("pediatric-toggle-unverified-button");
const pediatricCustomFields = document.getElementById("pediatric-custom-fields");
const pediatricSaveCustomButton = document.getElementById("pediatric-save-custom-button");
const pediatricDeleteCustomButton = document.getElementById("pediatric-delete-custom-button");
const pediatricCustomSaveHelp = document.getElementById("pediatric-custom-save-help");
const pediatricRangeText = document.getElementById("pediatric-range-text");
const pediatricAgeNoteText = document.getElementById("pediatric-age-note-text");
const pediatricConcentrationText = document.getElementById("pediatric-concentration-text");
const pediatricVerificationText = document.getElementById("pediatric-verification-text");
const pediatricNotesText = document.getElementById("pediatric-notes-text");
const pediatricAgeWarning = document.getElementById("pediatric-age-warning");
const pediatricErrorMessage = document.getElementById("pediatric-error-message");
const pediatricResultCard = document.getElementById("pediatric-result-card");
const pediatricResultLabel = document.getElementById("pediatric-result-label");
const pediatricPrimaryResult = document.getElementById("pediatric-primary-result");
const pediatricSecondaryResultLabel = document.getElementById("pediatric-secondary-result-label");
const pediatricSecondaryResult = document.getElementById("pediatric-secondary-result");
const pediatricConcentrationResult = document.getElementById("pediatric-concentration-result");
const pediatricDoseExplanation = document.getElementById("pediatric-dose-explanation");
const pediatricVolumeExplanation = document.getElementById("pediatric-volume-explanation");
const pediatricDoseReferenceList = document.getElementById("pediatric-dose-reference-list");
const pediatricResultWarning = document.getElementById("pediatric-result-warning");
const pediatricConcentrationUnitLabel = document.getElementById("pediatric-concentration-unit-label");
const pediatricAirwayWarning = document.getElementById("pediatric-airway-warning");
const pediatricAirwayDeviceModelField = document.getElementById("pediatric-airway-device-model-field");
const pediatricAirwayResultCard = document.getElementById("pediatric-airway-result-card");
const pediatricAirwayPrimaryResult = document.getElementById("pediatric-airway-primary-result");
const pediatricAirwaySecondaryLabel = document.getElementById("pediatric-airway-secondary-label");
const pediatricAirwaySecondaryResult = document.getElementById("pediatric-airway-secondary-result");
const pediatricAirwayContext = document.getElementById("pediatric-airway-context");
const pediatricAirwayDeviceResult = document.getElementById("pediatric-airway-device-result");
const pediatricAirwaySizeExplanation = document.getElementById("pediatric-airway-size-explanation");
const pediatricAirwayDepthExplanation = document.getElementById("pediatric-airway-depth-explanation");
const pediatricAirwayReferenceList = document.getElementById("pediatric-airway-reference-list");
const pediatricAirwayResultWarning = document.getElementById("pediatric-airway-result-warning");

const inputs = {
  weight: document.getElementById("weight"),
  concentration: document.getElementById("concentration"),
  targetDose: document.getElementById("target-dose"),
  pumpRate: document.getElementById("pump-rate"),
  referenceDoseList: document.getElementById("reference-dose-list"),
  customDrugName: document.getElementById("custom-drug-name"),
  customDrugNotes: document.getElementById("custom-drug-notes")
};

const workspaceSharedWeightInput = document.getElementById("workspace-shared-weight");
const workspaceAddCardButton = document.getElementById("workspace-add-card-button");
const workspaceTemplateNameInput = document.getElementById("workspace-template-name");
const workspaceTemplateNoteInput = document.getElementById("workspace-template-note");
const workspaceTemplateSelect = document.getElementById("workspace-template-select");
const workspaceLoadTemplateButton = document.getElementById("workspace-load-template-button");
const workspaceSaveTemplateButton = document.getElementById("workspace-save-template-button");
const workspaceDeleteTemplateButton = document.getElementById("workspace-delete-template-button");
const workspaceCardList = document.getElementById("workspace-card-list");
const workspaceHelp = document.getElementById("workspace-help");

const pediatricInputs = {
  weight: document.getElementById("pediatric-weight"),
  ageGroup: document.getElementById("pediatric-age-group"),
  concentration: document.getElementById("pediatric-concentration"),
  customDrugName: document.getElementById("pediatric-custom-drug-name"),
  customDrugNotes: document.getElementById("pediatric-custom-drug-notes"),
  minDosePerKg: document.getElementById("pediatric-min-dose-per-kg"),
  maxDosePerKg: document.getElementById("pediatric-max-dose-per-kg"),
  doseUnit: document.getElementById("pediatric-dose-unit"),
  concentrationUnit: document.getElementById("pediatric-concentration-unit"),
  maxTotalDose: document.getElementById("pediatric-max-total-dose"),
  airwayAgeYears: document.getElementById("pediatric-airway-age-years"),
  airwayWeight: document.getElementById("pediatric-airway-weight"),
  airwayDeviceCategory: document.getElementById("pediatric-airway-device-category"),
  airwayDeviceModel: document.getElementById("pediatric-airway-device-model")
};

const dilutionInputs = {
  targetConcentration: document.getElementById("dilution-target-concentration"),
  targetUnit: document.getElementById("dilution-target-unit"),
  finalVolume: document.getElementById("dilution-final-volume"),
  stockConcentration: document.getElementById("dilution-stock-concentration"),
  stockUnit: document.getElementById("dilution-stock-unit"),
  errorMessage: document.getElementById("dilution-error-message"),
  form: document.getElementById("dilution-form"),
  resetButton: document.getElementById("dilution-reset-button"),
  resultCard: document.getElementById("dilution-result-card"),
  resultLabel: document.getElementById("dilution-result-label"),
  resultBox1: document.getElementById("dilution-result-box-1"),
  resultBox2: document.getElementById("dilution-result-box-2"),
  resultTitle1: document.getElementById("dilution-result-title-1"),
  resultTitle2: document.getElementById("dilution-result-title-2"),
  resultValue1: document.getElementById("dilution-result-value-1"),
  resultValue2: document.getElementById("dilution-result-value-2"),
  summaryHeading: document.getElementById("dilution-summary-heading"),
  summaryText: document.getElementById("dilution-summary-text"),
  modeTabs: document.querySelectorAll("[data-dilution-mode-tab]"),
  modePanels: document.querySelectorAll("[data-dilution-mode-panel]"),
  reverseDrugAmount: document.getElementById("dilution-reverse-drug-amount"),
  reverseDrugUnit: document.getElementById("dilution-reverse-drug-unit"),
  reverseFinalVolume: document.getElementById("dilution-reverse-final-volume")
};

const dantroleneInputs = {
  weight: document.getElementById("dantrolene-weight"),
  formulation: document.getElementById("dantrolene-formulation"),
  initialDose: document.getElementById("dantrolene-initial-dose")
};

const languageSelect = document.getElementById("language-select");
const feedbackGeneralLink = document.getElementById("feedback-general-link");
const feedbackReferenceLink = document.getElementById("feedback-reference-link");
const feedbackBugLink = document.getElementById("feedback-bug-link");
const feedbackStatus = document.getElementById("feedback-status");
const supportDonateCard = document.getElementById("support-donate-card");
const supportTossLink = document.getElementById("support-toss-link");
const supportKofiLink = document.getElementById("support-kofi-link");
const supportStatus = document.getElementById("support-status");

const LANGUAGE_STORAGE_KEY = "anestha.language";
const FEEDBACK_CONFIG = {
  generalUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  referenceUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  bugUrl: "https://docs.google.com/forms/d/e/1FAIpQLSekcnkvm28ePkxhL0tGtDDtIas3uVhr4mwiGdcKnwTn_W2qvw/viewform?usp=publish-editor",
  email: ""
};
const SUPPORT_CONFIG = {
  tossUrl: "",
  kofiUrl: ""
};

const TRANSLATIONS = {
  ko: {
    warning_banner_aria: "중요 경고",
    warning_banner_text: "이 도구는 학습용/참고용이며 실제 임상 판단에 사용하면 안 됩니다. 반드시 별도의 검증이 필요합니다.",
    hero_eyebrow: "Anesthesia Calculators",
    hero_text: "마취과에서 자주 쓰는 계산 도구를 한곳에서 빠르게 확인할 수 있도록 만든 웹앱입니다.",
    feedback_eyebrow: "Feedback",
    feedback_heading: "의견 보내기",
    feedback_description: "버그, 레퍼런스 오류, 사용성 개선 의견을 따로 받을 수 있도록 창구를 준비해두었습니다.",
    feedback_general: "일반 의견 보내기",
    feedback_reference: "레퍼런스 오류 제보",
    feedback_bug: "버그 제보",
    feedback_kicker: "Feedback",
    feedback_support_description: "bug, reference issue, usability suggestion을 이곳에서 바로 보낼 수 있습니다.",
    feedback_support_note: "",
    feedback_status_unconfigured: "",
    feedback_status_configured: "",
    calculator_switcher_aria: "계산기 선택",
    calculator_tablist_aria: "계산기 목록",
    available_calculators: "사용 가능한 계산기",
    tab_infusion: "Infusion Pump",
    tab_dilution: "Dilution",
    tab_pediatric: "Pediatric Anesthesia",
    tab_dantrolene: "MH / Dantrolene",
    tab_support: "Support",
    support_kicker: "Support",
    support_heading: "Support Anestha",
    support_description: "업데이트 지원과 feedback 채널을 한곳에서 확인할 수 있습니다.",
    support_donate_kicker: "Support",
    support_donate_heading: "지속적인 업데이트 지원",
    support_donate_description: "이 앱이 도움이 되었다면 업데이트와 유지보수를 위한 support를 보낼 수 있습니다.",
    support_toss: "Toss로 지원하기",
    support_kofi: "Ko-fi로 지원하기",
    support_donate_note: "Toss 또는 Ko-fi 중 편한 경로로 ongoing updates를 support할 수 있습니다.",
    support_status_unconfigured: "",
    support_status_configured: "",
    support_legal_note: "앱 사용 범위와 로컬 저장 항목은 Privacy / Disclaimer에서 확인할 수 있습니다.",
    privacy_page_link: "Privacy",
    disclaimer_page_link: "Disclaimer",
    footer_reference_note: "Anestha는 reference-oriented tool입니다. independent verification과 institutional protocol 확인이 계속 필요합니다.",
    infusion_heading: "Infusion Pump Dose Calculator",
    infusion_description: "환자 체중과 약물 농도를 기준으로 dose와 infusion rate를 빠르게 계산합니다.",
    infusion_view_aria: "Infusion 화면 선택",
    infusion_view_title: "Infusion 보기",
    single_drug: "Single Drug",
    multi_drug: "Multi Drug",
    infusion_mode_aria: "Infusion 계산 모드",
    calculation_mode: "계산 방식",
    dose_to_rate: "Dose to Rate",
    rate_to_dose: "Rate to Dose",
    reference_dosing_table: "Reference Dosing Table",
    drug_preset: "약물 프리셋",
    add_to_favorites: "즐겨찾기에 추가",
    remove_favorite: "즐겨찾기에서 제거",
    favorites: "즐겨찾기",
    recent: "최근 사용",
    no_drugs_yet: "아직 약물이 없습니다",
    drug_help_default: "Drug preset을 선택하면 기본 농도와 Reference Dosing Table 값이 자동으로 입력됩니다.",
    drug_help_custom: "Custom drug를 선택했습니다. 이름, 농도, Reference Dosing Table 값을 자유롭게 입력하세요.",
    drug_help_selected: "{drug} 기준값이 표시됩니다. 필요하면 직접 조정할 수 있습니다.",
    reference_range: "참고 범위",
    use_case: "사용 맥락",
    range_basis: "범위 근거",
    rationale: "선정 이유",
    other_use_case: "다른 사용 맥락",
    notes: "메모",
    standard_dilution: "표준 희석",
    apply: "Apply",
    source: "Source",
    last_reviewed: "Last reviewed",
    infusion_reference_note: "Reference range는 계산 편의를 위한 preset입니다. Label, Clinical, Study-specific는 서로 다른 맥락의 자료일 수 있으므로 절대적 표준 처방으로 해석하지 말고, 기관 프로토콜과 원문 레퍼런스를 함께 확인해야 합니다.",
    custom_drug_name: "Custom Drug Name",
    custom_notes: "추가 메모",
    patient_weight: "Patient Weight",
    drug_concentration: "Drug Concentration",
    target_dose: "Target Dose",
    pump_rate: "Pump Rate",
    reference_dose_list: "참고 Dose 목록",
    reference_dose_list_help: "쉼표로 구분해 dose 값을 입력하세요. 이 값들은 참고용이며 병원별 관행에 따라 달라질 수 있습니다.",
    calculate: "계산",
    reset: "초기화",
    references: "레퍼런스",
    workflow_preview: "사용 흐름 미리보기",
    multi_drug_heading: "Multi Drug Infusion",
    multi_drug_description: "한 환자에서 여러 infusion drug를 한 화면에서 함께 볼 수 있는 화면입니다. 각 card는 shared weight를 사용할 수 있지만 계산은 서로 독립적으로 이뤄집니다.",
    multi_drug_note: "Multi Drug 계산은 각 card별 참고용입니다. 약물 상호작용과 compatibility는 별도로 확인해야 합니다.",
    shared_patient_weight: "공통 Patient Weight",
    template_name: "Template 이름",
    template_note_optional: "메모 / 사용 맥락 (선택)",
    saved_templates: "저장된 Template",
    no_saved_templates: "저장된 Template 없음",
    load_template: "Template 불러오기",
    save_current_setup: "현재 구성 저장",
    delete_template: "Template 삭제",
    workspace_help: "Shared weight를 입력하면 각 Multi Drug card의 target dose와 Reference Dosing Table이 같은 환자 기준으로 계산됩니다.",
    add_drug: "+ 약물 추가",
    pediatric_heading: "Pediatric Calculator",
    pediatric_description: "소아 약물 용량과 airway / ETT reference를 한곳에서 빠르게 확인합니다.",
    pediatric_mode_aria: "Pediatric 모드",
    pediatric_mode: "Pediatric 보기",
    dosing: "용량 계산",
    airway_ett: "Airway / ETT",
    pediatric_drug_help_default: "Pediatric preset drug를 선택하면 권장 bolus dose range와 예시 농도가 표시됩니다.",
    pediatric_drug_help_custom: "Custom pediatric drug를 선택했습니다. 이름, dose range, unit, concentration을 직접 입력하세요.",
    show_unverified_presets: "Show unverified presets",
    hide_unverified_presets: "Hide unverified presets",
    pediatric_reference_note: "Pediatric dosing preset은 참고 예시입니다. 기관 프로토콜과 최신 레퍼런스로 다시 확인하세요.",
    age_group: "Age Group",
    pediatric_dosing_result: "Pediatric Dosing 결과",
    calculated_dose_range: "계산된 dose 범위",
    calculation_details: "계산 과정",
    pediatric_dosing_audit_note: "Pediatric dosing preset은 참고용입니다. 투여 전 기관 프로토콜과 최신 레퍼런스로 다시 확인하세요.",
    pediatric_airway_result: "Pediatric Airway / ETT 결과",
    estimated_oral_depth: "예상 oral depth (lip 기준)",
    pediatric_airway_audit_note: "Pediatric airway/ETT 값은 추정 참고치입니다. 실제 size, depth, leak, position은 임상적으로 반드시 확인하세요.",
    emergency_tool: "응급 상황 도구",
    dantrolene_heading: "Dantrolene / MH Quick Reference",
    dantrolene_description: "체중과 제형을 기준으로 MH 초기 용량, 누적 최대 용량, 예상 vial 수를 빠르게 확인합니다.",
    dantrolene_note: "응급 상황에서 빠르게 참고하기 위한 화면입니다. 실제 crisis management workflow, 재투여, cooling, labs, ICU 계획은 별도 MH protocol로 확인해야 합니다.",
    default_initial_dose: "기본 initial dose",
    cumulative_max: "누적 최대 용량",
    workflow_note: "준비 메모",
    dantrolene_workflow_note: "Formulation과 reconstitution 방식에 따라 필요한 vial 수와 준비 속도가 달라집니다.",
    formulation: "Formulation",
    initial_dose_target: "Initial dose target",
    dose_target: "Dose target",
    maximum_cumulative_dose: "누적 최대 용량",
    initial_vials_needed: "초기 준비 vial 수",
    max_vials_at_10mgkg: "10 mg/kg 기준 최대 vial 수",
    preparation: "준비 정보",
    mh_quick_guide: "MH Quick Guide",
    dilution_heading: "Drug Dilution Calculator",
    dilution_description: "원액(Stock) 약물로 원하는 농도를 만들거나, 믹스한 약물의 최종 농도를 역산합니다.",
    dilution_mode_aria: "Dilution 모드 선택",
    target_conc_to_mix: "목표 농도 기준 희석",
    mix_vol_to_final_conc: "혼합량 기준 최종 농도",
    placeholder_custom_drug_name: "예: Nicardipine",
    placeholder_custom_notes: "예: 병원 프로토콜에 따라 확인",
    placeholder_weight: "예: 70",
    placeholder_concentration: "예: 100",
    placeholder_target_dose: "예: 0.1",
    placeholder_pump_rate: "예: 4.5",
    placeholder_reference_dose_list: "예: 0.02, 0.05, 0.1, 0.2, 0.3",
    placeholder_template_name: "예: Open Heart Surgery",
    placeholder_template_note: "예: Routine TIVA 셋업",
    placeholder_pediatric_custom_drug_name: "예: Glycopyrrolate",
    placeholder_pediatric_weight: "예: 12",
    placeholder_pediatric_concentration: "예: 50",
    placeholder_initial_dose: "예: 2.5",
    result_label_calc: "계산 결과",
    supporting_information: "참고 정보",
    current_references_verified: "각 reference 링크를 열어 원문을 직접 확인할 수 있습니다.",
    reference_table_info_only: "Reference Dosing Table은 참고용입니다. 기관 프로토콜과 함께 확인하세요.",
    result_warning_default: "계산 결과는 참고용입니다. 실제 사용 전 반드시 별도로 검증해야 합니다.",
    infusion_result_reference_only: "Reference dose 값은 참고용입니다. Label, Clinical, Study-specific source는 하나의 절대 기준이 아니므로 원문과 기관 프로토콜을 함께 확인하세요.",
    infusion_result_out_of_range: "현재 입력값이 선택한 preset reference range를 벗어났습니다. 빨간 표시는 오류 확정이 아니라 기본 preset 범위 밖이라는 뜻이며, 원문 레퍼런스와 기관 프로토콜을 다시 확인해야 합니다.",
    infusion_dose_calculation: "농도 입력: {concentration} {unit}를 사용했습니다.",
    infusion_rate_formula_weight: "주입 속도 계산: ({dose} x {weight} x {factor}) / {concentration} = {rate} mL/hr",
    infusion_rate_formula_absolute: "주입 속도 계산: ({dose} x {factor}) / {concentration} = {rate} mL/hr",
    infusion_dose_formula_weight: "용량 계산: ({rate} x {concentration}) / ({weight} x {factor}) = {dose} {unit}",
    infusion_dose_formula_absolute: "용량 계산: ({rate} x {concentration}) / {factor} = {dose} {unit}",
    reference_table_explanation_weight: "Reference Dosing Table은 선택한 농도와 체중 기준으로 각 dose에 대응하는 mL/hr를 보여줍니다.",
    reference_table_explanation_absolute: "Reference Dosing Table은 선택한 농도 기준으로 absolute dose에 대응하는 mL/hr를 보여줍니다.",
    pediatric_result_warning_default: "Pediatric dosing 예시는 참고용입니다. 실제 사용 전 반드시 검증하세요.",
    pediatric_airway_warning_default: "Airway estimate는 reference formula일 뿐입니다. tube fit, leak, depth, position은 임상적으로 확인해야 합니다.",
    dantrolene_result_warning_default: "기관 MH protocol, redosing plan, emergency workflow를 확인하세요.",
    dilution_result_mix: "희석 안내",
    dilution_result_draw_volume: "뽑아야 할 약물 부피",
    dilution_result_add_diluent: "추가할 Diluent (NS/D5W)",
    dilution_result_summary: "요약",
    dilution_result_final_concentration: "최종 농도",
    dilution_result_target_conc: "목표 농도",
    dilution_result_calculated: "계산 결과",
    dose: "Dose",
    infusion_rate: "주입 속도",
    concentration: "농도",
    concentration_unit: "농도 단위",
    dose_unit_view: "Dose unit view",
    nitroglycerin_unit_help: "Nitroglycerin 기본 reference는 mcg/min입니다. 체중기반 mcg/kg/min 보기는 계산 편의를 위한 선택 보기입니다.",
    nitroglycerin_unit_help_weight_needed: "Nitroglycerin 기본 reference는 5 - 200 mcg/min입니다. mcg/kg/min 보기와 입력 해석에는 체중 입력이 필요합니다.",
    verification: "근거 분류",
    recommended_range: "권장 범위",
    age_specific_note: "연령별 메모",
    reference_guides: "참고 가이드",
    equipment_selection_support: "장비 선택 참고",
    ett_age_based_size_depth: "Age 기준 size와 oral depth 추정",
    other_airway_tools: "기타 airway 도구",
    airway_tools_reference_guides: "Supraglottic, oral airway, nasal airway, laryngoscope, face mask reference guides",
    airway_equipment_reference_note: "Airway equipment guidance는 reference only입니다. fit, anatomy, device availability, local practice를 함께 확인하세요.",
    age: "Age",
    weight_optional: "Weight (optional)",
    device_category: "Device Category",
    device_model: "Device Model",
    airway_device_select_note: "Airway device type를 선택하면 해당 guide가 표시됩니다. anatomy, fit, clinical position은 실제로 확인해야 합니다.",
    min_dose_per_kg: "kg당 최소 Dose",
    max_dose_per_kg: "kg당 최대 Dose",
    dose_unit: "Dose 단위",
    optional_max_total_dose: "Optional Max Total Dose",
    save_custom_drug: "Save custom drug",
    delete_saved_drug: "Delete saved drug",
    save_custom_drug_help: "Save custom drug를 누르면 현재 입력값이 로컬에 저장됩니다.",
    target_concentration: "목표 농도",
    final_volume_total: "최종 총량",
    drug_stock_concentration: "원액 약물 농도",
    total_drug_added: "총 약물량",
    calculate_mix: "희석 계산",
    dilution_warning_note: "Mix 전 unit(mcg vs mg)을 다시 확인하고, 선택한 diluent와의 compatibility를 확인하세요.",
    validation_patient_weight: "Patient Weight는 0보다 큰 숫자여야 합니다.",
    validation_ntg_weight_for_kg_unit: "Nitroglycerin을 mcg/kg/min으로 사용하려면 Patient Weight가 필요합니다.",
    validation_drug_concentration: "Drug Concentration은 0보다 큰 숫자여야 합니다.",
    validation_custom_drug_name: "Custom Drug Name을 입력해 주세요.",
    validation_target_dose: "Target Dose는 0보다 큰 숫자여야 합니다.",
    validation_pump_rate: "Pump Rate는 0보다 큰 숫자여야 합니다.",
    validation_reference_dose_list: "Reference Dose List에 0보다 큰 숫자를 쉼표로 구분해 입력해 주세요.",
    validation_ett_age: "ETT guide는 Age가 0보다 커야 합니다.",
    validation_supraglottic_weight: "Supraglottic guide는 Weight가 0보다 커야 합니다.",
    validation_airway_age_or_weight: "Oral Airway, Nasal Airway, Laryngoscope, Face Mask guide는 Age 또는 Weight가 필요합니다.",
    validation_custom_name_required: "Custom Drug Name이 필요합니다.",
    validation_custom_range_positive: "Custom dose range는 0보다 큰 숫자여야 합니다.",
    validation_custom_max_gte_min: "Max Dose per kg는 Min Dose per kg 이상이어야 합니다.",
    validation_unit_base_match: "Dose Unit과 Concentration Unit은 volume 계산을 위해 같은 base unit을 사용해야 합니다.",
    validation_initial_dose_target: "Initial dose target은 0보다 큰 숫자여야 합니다.",
    result_setup: "설정",
    absolute_dose_mode: "absolute-dose mode",
    reference_doses: "참고 dose",
    formula_same_weight: "표의 모든 행은 동일한 공식으로 계산됩니다: (dose x weight x {factor}) / concentration.",
    formula_same_absolute: "표의 모든 행은 동일한 공식으로 계산됩니다: (dose x {factor}) / concentration.",
    pediatric_weight_based_bolus: "Pediatric Weight-Based Bolus",
    recommended_dose_range_label: "권장 dose 범위",
    pediatric_dose_formula_adjusted: "Dose calculation: {weight} kg x {min}-{max} {unitPerKg} = {rawMin}-{rawMax} {amountUnit}. {limitMessage}",
    pediatric_dose_formula_plain: "Dose calculation: {weight} kg x {min}-{max} {unitPerKg} = {rawMin}-{rawMax} {amountUnit}",
    pediatric_optional_volume_formula: "Optional volume calculation: {minDose}-{maxDose} {amountUnit} / {concentration} {concentrationUnit} = {minVolume}-{maxVolume} mL",
    pediatric_verify_reference_only: "Pediatric dosing preset은 참고용입니다. 기관 프로토콜과 최신 레퍼런스로 다시 확인하세요.",
    pediatric_warning_suffix: "기관 프로토콜과 최신 레퍼런스로 다시 확인하세요.",
    age_not_entered: "Age 미입력",
    pediatric_ett_result: "Pediatric ETT 결과",
    pediatric_supraglottic_result: "Pediatric Supraglottic 결과",
    pediatric_oral_airway_result: "Pediatric Oral Airway 결과",
    pediatric_nasal_airway_result: "Pediatric Nasal Airway 결과",
    pediatric_face_mask_result: "Pediatric Face Mask 결과",
    pediatric_laryngoscope_result: "Pediatric Laryngoscope 결과",
    reference_weight_range: "참고 weight 범위",
    sizing_method: "Sizing 방법",
    preferred_measurement: "우선 참고할 측정법",
    alternative_guide: "보조 가이드",
    reference_band: "참고 구간",
    device_category_ett: "Device category: ETT",
    oral_depth_from_lip: "Estimated oral depth (from lip)",
    cm_from_lip: "{depth} cm from lip",
    enter_weight_size_range: "Weight를 입력하면 size range가 표시됩니다.",
    oral_airway_measure_method: "입꼬리에서 mandible angle까지 외부 길이를 먼저 확인하세요.",
    nasal_airway_measure_method: "Nostril to tragus에서 약 10 mm를 뺀 길이를 우선 참고하세요.",
    enter_age_or_weight_face_mask: "Age 또는 Weight를 입력하면 size band가 표시됩니다.",
    enter_age_or_weight_blade: "Age 또는 Weight를 입력하면 blade guide가 표시됩니다.",
    airway_age_context: "Age {ageText}{weightText}",
    device_reference_band: "Reference band: {label}",
    enter_supraglottic_reference: "Weight를 입력하면 {deviceLabel} size reference가 표시됩니다.",
    infant_depth_band: "Infant depth band: {depth} ({label})",
    use_external_measurement_first: "외부 길이 측정을 먼저 하고, infant age/weight는 대략적인 guide로만 보세요.",
    enter_face_mask_guide: "Age 또는 Weight를 입력하면 face mask guide가 표시됩니다.",
    enter_laryngoscope_guide: "Age 또는 Weight를 입력하면 laryngoscope guide가 표시됩니다.",
    suction_reference_size_only: "{deviceLabel} size는 age formula보다 manufacturer weight guide를 우선 참고합니다.",
    oral_airway_quick_guide: "Oral airway quick guide: size {size} ({length})는 {label} 범위의 시작 reference입니다.",
    oral_airway_reference_only: "Oral airway size는 quick reference only로 보세요.",
    nasal_airway_external_measurement: "Nasopharyngeal airway sizing은 age formula보다 외부 길이 측정을 우선해야 합니다.",
    face_mask_quick_guide: "Face mask quick guide: {label} 범위에서는 보통 size {size}를 먼저 고려합니다. Manufacturer numbering은 다를 수 있습니다.",
    face_mask_reference_only: "Face mask sizing은 broad reference only입니다.",
    laryngoscope_quick_guide: "Laryngoscope quick guide: {label} 범위에서는 {blade}를 첫 reference로 봅니다.",
    laryngoscope_reference_only: "Laryngoscope blade guide는 quick reference only입니다.",
    ett_depth_under_two: "Depth estimate: 2세 미만 infant/toddler는 lip 기준 10-12 cm progression reference를 사용합니다.",
    ett_depth_age_formula: "Depth estimate: oral = age/2 + 12 -> {depth} cm from the lip.",
    ett_depth_crosscheck: "Tube size x 3 기준 cuffed oral depth cross-check는 {depth} cm입니다. Oral ETT에서는 lip depth로 해석하고, tooth depth 표기는 local convention을 따르며 임상적으로 확인하세요.",
    supraglottic_depth_note: "{deviceLabel} 결과는 supraglottic airway size reference only입니다. depth-style ETT formula는 적용되지 않습니다.",
    oral_airway_depth_note: "Oral airway는 starting estimate로만 사용하고, mouth corner to angle of mandible 외부 길이와 임상 patency를 다시 확인하세요.",
    nasal_airway_depth_note: "Nostril-to-tragus 같은 외부 길이를 우선 사용하고, 실제 patency와 위치를 임상적으로 확인하세요.",
    nasal_airway_infant_study: "2세 미만에서는 연결된 study가 약 {depth} insertion depth band를 제시합니다. infancy를 벗어나면 age-only estimate보다 외부 길이와 임상 확인을 더 우선하세요.",
    face_mask_depth_note: "눈을 누르지 않으면서 nose와 mouth를 seal하는 가장 작은 mask를 선택하세요. Brand별 numbering과 cushion shape는 다를 수 있습니다.",
    laryngoscope_depth_note: "Blade type과 size는 anatomy, pathology, operator preference에 따라 달라집니다. infant에서는 straight blade를, 더 큰 소아에서는 curved blade를 더 자주 사용합니다.",
    airway_warning_ett_infant: "Age-based ETT formula는 neonate와 young infant에서 덜 정확할 수 있습니다. infant-specific reference와 임상 확인이 필요합니다.",
    airway_warning_ett: "ETT formula는 reference estimate only입니다. tube fit, leak, depth, position은 임상적으로 확인하세요.",
    airway_warning_supraglottic: "{deviceLabel} sizing은 manufacturer weight guide 기반입니다. product-specific instruction과 clinical fit을 확인하세요.",
    airway_warning_oral: "Oral airway size guide는 대략적인 reference입니다. 외부 길이와 airway patency를 다시 확인하세요.",
    airway_warning_nasal: "Nasal airway guide는 대략적인 reference이며 외부 길이 측정, lubrication, gentle insertion, clinical confirmation을 대체할 수 없습니다.",
    airway_warning_face_mask: "Face mask guide는 대략적인 reference입니다. seal, dead space, eye clearance, brand-specific numbering을 확인하세요.",
    airway_warning_laryngoscope: "Laryngoscope blade guide는 대략적인 reference입니다. mouth opening, anatomy, operator preference를 함께 확인하세요.",
    dantrolene_vial_explanation: "{formulation} 기준으로 initial dose에는 약 {initialVials} vial, cumulative 10 mg/kg 준비에는 약 {maxVials} vial이 필요합니다.",
    dantrolene_initial_guide: "Initial: 지금 {dose} mg/kg IV를 투여합니다. 많은 MH reference는 initial treatment dose로 2.5 mg/kg를 제시합니다.",
    dantrolene_repeat_guide: "Repeat bolus: hypermetabolic sign가 지속되거나 재발하면 repeat bolus를 이어갑니다. 흔한 emergency reference는 cumulative 10 mg/kg까지 증량을 권하고, 일부 formulation은 recurrence 후 1 mg/kg repeat bolus도 제시합니다.",
    dantrolene_maintenance_guide: "Maintenance: initial control 뒤에는 많은 MH reference가 최소 24시간 동안 4-6시간마다 1 mg/kg IV 또는 이에 준하는 infusion strategy를 권합니다.",
    dantrolene_emergency_reference_only: "Emergency quick reference only. 기관 MH protocol, redosing plan, cooling, post-crisis monitoring을 계속 따르세요.",
    workspace_select_template: "Template 선택",
    workspace_limit_title: "Multi Drug card는 최대 6개까지 추가할 수 있습니다",
    workspace_add_card_title: "drug card 추가",
    workspace_current_shared_weight: "현재 shared weight는 {weight} kg입니다. 각 card는 같은 환자 체중을 사용하지만 계산은 서로 독립적입니다.",
    workspace_loaded_template: "불러온 template: {name}.",
    workspace_loaded_template_note: " (메모: {note})",
    workspace_limit_help: "Multi Drug card는 최대 6개까지 추가할 수 있습니다.",
    move_up: "위로",
    move_down: "아래로",
    remove: "삭제",
    workspace_drug: "Drug",
    workspace_concentration: "Concentration",
    workspace_target_dose: "Target Dose",
    workspace_ntg_unit_hint: "Nitroglycerin 기본 reference는 mcg/min입니다. mcg/kg/min 선택 시 shared weight가 필요합니다.",
    workspace_enter_shared_weight: "shared weight와 유효한 card 값을 입력하세요.",
    workspace_enter_valid_values: "유효한 card 값을 입력하세요.",
    workspace_target_at_concentration: "Target {dose} {unit} at {concentration} {concentrationUnit}",
    workspace_out_of_range: "Reference range를 벗어났습니다. 기관 프로토콜을 다시 확인하세요.",
    workspace_reference_range_note: "Reference range: {min} - {max} {unit}.{sharedWeightNote}",
    workspace_shared_weight_not_used: " 이 drug에는 shared weight를 사용하지 않습니다.",
    workspace_use_case_note: "사용 맥락: {useCase}",
    workspace_range_basis_note: "범위 근거: {basis}",
    workspace_rationale_note: "선정 이유: {rationale}",
    workspace_standard_dilution_note: "표준 희석: {dilution}.",
    workspace_apply_standard_dilution_title: "표준 dilution concentration 적용",
    workspace_no_standard_dilution_title: "표준 dilution preset이 없습니다",
    workspace_apply_standard_dilution: "Apply standard dilution",
    dilution_error_target_concentration: "Target concentration은 양수여야 합니다.",
    dilution_error_final_volume: "Final volume은 양수여야 합니다.",
    dilution_error_stock_concentration: "Stock concentration은 양수여야 합니다.",
    dilution_error_dilution_impossible: "Target concentration이 stock concentration보다 높아 희석할 수 없습니다.",
    dilution_error_drug_amount: "Drug amount는 양수여야 합니다."
  },
  en: {
    warning_banner_aria: "Important warning",
    warning_banner_text: "This tool is for learning and reference only and must not be used as a sole basis for clinical judgment. Independent verification is required.",
    hero_eyebrow: "Anesthesia Calculators",
    hero_text: "A web app for quickly accessing commonly used anesthesia calculators in one place.",
    feedback_eyebrow: "Feedback",
    feedback_heading: "Send Feedback",
    feedback_description: "Separate channels are prepared for bugs, reference issues, and usability suggestions.",
    feedback_general: "General feedback",
    feedback_reference: "Report reference issue",
    feedback_bug: "Report bug",
    feedback_kicker: "Feedback",
    feedback_support_description: "Send bug reports, reference issues, and usability suggestions here.",
    feedback_support_note: "",
    feedback_status_unconfigured: "",
    feedback_status_configured: "",
    calculator_switcher_aria: "Calculator selector",
    calculator_tablist_aria: "Calculator tabs",
    available_calculators: "Available Calculators",
    tab_infusion: "Infusion Pump",
    tab_dilution: "Dilution",
    tab_pediatric: "Pediatric Anesthesia",
    tab_dantrolene: "MH / Dantrolene",
    tab_support: "Support",
    support_kicker: "Support",
    support_heading: "Support Anestha",
    support_description: "Find update support and feedback channels in one place.",
    support_donate_kicker: "Support",
    support_donate_heading: "Support ongoing updates",
    support_donate_description: "If this app has been helpful, you can support ongoing updates and maintenance.",
    support_toss: "Support via Toss",
    support_kofi: "Support via Ko-fi",
    support_donate_note: "Use Toss or Ko-fi if you want to support ongoing updates.",
    support_status_unconfigured: "",
    support_status_configured: "",
    support_legal_note: "See Privacy and Disclaimer for local storage details and intended use.",
    privacy_page_link: "Privacy",
    disclaimer_page_link: "Disclaimer",
    footer_reference_note: "Anestha is a reference-oriented tool. Independent verification and institutional protocols remain necessary.",
    infusion_heading: "Infusion Pump Dose Calculator",
    infusion_description: "Quickly calculate dose and infusion rate based on patient weight and drug concentration.",
    infusion_view_aria: "Infusion view selection",
    infusion_view_title: "Infusion View",
    single_drug: "Single Drug",
    multi_drug: "Multi Drug",
    infusion_mode_aria: "Infusion calculation mode",
    calculation_mode: "Calculation Mode",
    dose_to_rate: "Dose to Rate",
    rate_to_dose: "Rate to Dose",
    reference_dosing_table: "Reference Dosing Table",
    drug_preset: "Drug Preset",
    add_to_favorites: "Add to favorites",
    remove_favorite: "Remove favorite",
    favorites: "Favorites",
    recent: "Recent",
    no_drugs_yet: "No drugs yet",
    drug_help_default: "When you select a preset drug, the default concentration and Reference Dosing Table values are filled in automatically.",
    drug_help_custom: "Custom drug selected. Enter the name, concentration, and Reference Dosing Table values directly.",
    drug_help_selected: "{drug} default values are shown. Adjust them if needed.",
    reference_range: "Reference range",
    use_case: "Use case",
    range_basis: "Range basis",
    rationale: "Rationale",
    other_use_case: "Other use case",
    notes: "Notes",
    standard_dilution: "Standard dilution",
    apply: "Apply",
    source: "Source",
    last_reviewed: "Last reviewed",
    infusion_reference_note: "The displayed reference range is a calculator preset for workflow convenience. Label, Clinical, and Study-specific sources may reflect different contexts, so do not treat them as a single universal dosing standard.",
    custom_drug_name: "Custom Drug Name",
    custom_notes: "Custom Notes",
    patient_weight: "Patient Weight",
    drug_concentration: "Drug Concentration",
    target_dose: "Target Dose",
    pump_rate: "Pump Rate",
    reference_dose_list: "Reference Dose List",
    reference_dose_list_help: "Enter comma-separated dose values. These are informational references and may differ by institutional practice.",
    calculate: "Calculate",
    reset: "Reset",
    references: "References",
    workflow_preview: "Workflow Preview",
    multi_drug_heading: "Multi Drug Infusion",
    multi_drug_description: "View multiple infusion drugs for one patient on a single screen. Each card can share the patient weight, but calculations remain independent.",
    multi_drug_note: "Multi Drug calculations are reference-only for each card. Check interactions and compatibility separately.",
    shared_patient_weight: "Shared Patient Weight",
    template_name: "Template Name",
    template_note_optional: "Note / Use Case (optional)",
    saved_templates: "Saved Templates",
    no_saved_templates: "No saved templates",
    load_template: "Load template",
    save_current_setup: "Save current setup",
    delete_template: "Delete template",
    workspace_help: "When shared weight is entered, each multi-drug card uses the same patient weight for target dose and Reference Dosing Table calculations.",
    add_drug: "+ Add drug",
    pediatric_heading: "Pediatric Calculator",
    pediatric_description: "Quickly review pediatric drug dosing and airway / ETT references in one place.",
    pediatric_mode_aria: "Pediatric mode",
    pediatric_mode: "Pediatric Mode",
    dosing: "Dosing",
    airway_ett: "Airway / ETT",
    pediatric_drug_help_default: "Select a pediatric preset drug to display the recommended bolus dose range and example concentration.",
    pediatric_drug_help_custom: "Custom pediatric drug selected. Enter the name, dose range, unit, and concentration directly.",
    show_unverified_presets: "Show unverified presets",
    hide_unverified_presets: "Hide unverified presets",
    pediatric_reference_note: "Pediatric dosing presets are examples only. Verify with institutional protocols and current references.",
    age_group: "Age Group",
    pediatric_dosing_result: "Pediatric Dosing Result",
    calculated_dose_range: "Calculated dose range",
    calculation_details: "Calculation Details",
    pediatric_dosing_audit_note: "Pediatric dosing presets are reference-only. Verify with your institutional protocol and current sources before use.",
    pediatric_airway_result: "Pediatric Airway / ETT Result",
    estimated_oral_depth: "Estimated oral depth (from lip)",
    pediatric_airway_audit_note: "Pediatric airway/ETT values are estimate references only. Always confirm size, depth, leak, and position clinically.",
    emergency_tool: "Emergency Tool",
    dantrolene_heading: "Dantrolene / MH Quick Reference",
    dantrolene_description: "Quickly review MH initial dose, cumulative maximum dose, and estimated vial count based on patient weight and formulation.",
    dantrolene_note: "Emergency quick reference only. Confirm your actual crisis workflow, redosing, cooling, labs, and ICU plan against your MH protocol.",
    default_initial_dose: "Default initial dose",
    cumulative_max: "Cumulative max",
    workflow_note: "Workflow note",
    dantrolene_workflow_note: "Formulation and reconstitution change the vial count and preparation speed.",
    formulation: "Formulation",
    initial_dose_target: "Initial dose target",
    dose_target: "Dose Target",
    maximum_cumulative_dose: "Maximum cumulative dose",
    initial_vials_needed: "Initial vials needed",
    max_vials_at_10mgkg: "Max vials at 10 mg/kg",
    preparation: "Preparation",
    mh_quick_guide: "MH Quick Guide",
    dilution_heading: "Drug Dilution Calculator",
    dilution_description: "Create a target concentration from a stock drug or back-calculate the final concentration of a prepared mixture.",
    dilution_mode_aria: "Dilution mode selection",
    target_conc_to_mix: "Dilute to Target Concentration",
    mix_vol_to_final_conc: "Calculate Final Concentration",
    placeholder_custom_drug_name: "e.g. Nicardipine",
    placeholder_custom_notes: "e.g. Check against institutional protocol",
    placeholder_weight: "e.g. 70",
    placeholder_concentration: "e.g. 100",
    placeholder_target_dose: "e.g. 0.1",
    placeholder_pump_rate: "e.g. 4.5",
    placeholder_reference_dose_list: "e.g. 0.02, 0.05, 0.1, 0.2, 0.3",
    placeholder_template_name: "e.g. Open Heart Surgery",
    placeholder_template_note: "e.g. Routine TIVA setup",
    placeholder_pediatric_custom_drug_name: "e.g. Glycopyrrolate",
    placeholder_pediatric_weight: "e.g. 12",
    placeholder_pediatric_concentration: "e.g. 50",
    placeholder_initial_dose: "e.g. 2.5",
    result_label_calc: "Calculation Result",
    supporting_information: "Supporting information",
    current_references_verified: "You can open each reference link and review the original source directly.",
    reference_table_info_only: "Reference Dosing Table is informational only. Verify with institutional protocols.",
    result_warning_default: "Calculation results are for reference only. Independently verify before clinical use.",
    infusion_result_reference_only: "Reference dose values are informational only. Label, Clinical, and Study-specific sources may reflect different contexts, so verify the original source and institutional protocol.",
    infusion_result_out_of_range: "The current value is outside the selected preset reference range. Red text does not automatically mean incorrect dosing; it means the value is outside this preset's default bounds and should be checked against the original source and institutional protocol.",
    infusion_dose_calculation: "Concentration used: {concentration} {unit}.",
    infusion_rate_formula_weight: "Rate calculation: ({dose} x {weight} x {factor}) / {concentration} = {rate} mL/hr",
    infusion_rate_formula_absolute: "Rate calculation: ({dose} x {factor}) / {concentration} = {rate} mL/hr",
    infusion_dose_formula_weight: "Dose calculation: ({rate} x {concentration}) / ({weight} x {factor}) = {dose} {unit}",
    infusion_dose_formula_absolute: "Dose calculation: ({rate} x {concentration}) / {factor} = {dose} {unit}",
    reference_table_explanation_weight: "The Reference Dosing Table shows the mL/hr corresponding to each dose using the selected concentration and patient weight.",
    reference_table_explanation_absolute: "The Reference Dosing Table shows the mL/hr corresponding to each absolute dose using the selected concentration.",
    pediatric_result_warning_default: "Pediatric dosing examples are for reference only. Verify before clinical use.",
    pediatric_airway_warning_default: "Airway estimates are reference formulas only. Confirm tube fit, leak, depth, and position clinically.",
    dantrolene_result_warning_default: "Verify your institutional MH protocol, redosing plan, and emergency workflow.",
    dilution_result_mix: "Mixing Instructions",
    dilution_result_draw_volume: "Draw Drug Volume",
    dilution_result_add_diluent: "Add Diluent (NS/D5W)",
    dilution_result_summary: "Summary",
    dilution_result_final_concentration: "Final Concentration",
    dilution_result_target_conc: "Target Conc.",
    dilution_result_calculated: "Calculated Result",
    dose: "Dose",
    infusion_rate: "Infusion Rate",
    concentration: "Concentration",
    concentration_unit: "Concentration Unit",
    dose_unit_view: "Dose unit view",
    nitroglycerin_unit_help: "Nitroglycerin keeps the default label-style reference in mcg/min. A weight-based mcg/kg/min view is available for convenience.",
    nitroglycerin_unit_help_weight_needed: "The default nitroglycerin reference remains 5 - 200 mcg/min. Enter patient weight to use or interpret the mcg/kg/min view.",
    verification: "Reference type",
    recommended_range: "Recommended range",
    age_specific_note: "Age-specific note",
    reference_guides: "Reference guides",
    equipment_selection_support: "Equipment selection support",
    ett_age_based_size_depth: "Age-based size and oral depth estimate",
    other_airway_tools: "Other airway tools",
    airway_tools_reference_guides: "Supraglottic, oral airway, nasal airway, laryngoscope, face mask reference guides",
    airway_equipment_reference_note: "Airway equipment guidance is for reference only. Verify fit, anatomy, device availability, and local practice.",
    age: "Age",
    weight_optional: "Weight (optional)",
    device_category: "Device Category",
    device_model: "Device Model",
    airway_device_select_note: "Select an airway device type to see the matching guide. Confirm anatomy, fit, and clinical position before use.",
    min_dose_per_kg: "Min Dose per kg",
    max_dose_per_kg: "Max Dose per kg",
    dose_unit: "Dose Unit",
    optional_max_total_dose: "Optional Max Total Dose",
    save_custom_drug: "Save custom drug",
    delete_saved_drug: "Delete saved drug",
    save_custom_drug_help: "Click Save custom drug to store the current values locally.",
    target_concentration: "Target Concentration",
    final_volume_total: "Final Volume (Total)",
    drug_stock_concentration: "Drug Stock Concentration",
    total_drug_added: "Total Drug Added",
    calculate_mix: "Calculate Mix",
    dilution_warning_note: "Double check all units (mcg vs mg) before mixing. Verify compatibility of the drug with the chosen diluent.",
    validation_patient_weight: "Patient Weight must be a number greater than 0.",
    validation_ntg_weight_for_kg_unit: "Patient Weight is required to use nitroglycerin in mcg/kg/min.",
    validation_drug_concentration: "Drug Concentration must be a number greater than 0.",
    validation_custom_drug_name: "Enter a Custom Drug Name.",
    validation_target_dose: "Target Dose must be a number greater than 0.",
    validation_pump_rate: "Pump Rate must be a number greater than 0.",
    validation_reference_dose_list: "Enter comma-separated numbers greater than 0 in the Reference Dose List.",
    validation_ett_age: "ETT guide requires Age greater than 0.",
    validation_supraglottic_weight: "Supraglottic guide requires Weight greater than 0.",
    validation_airway_age_or_weight: "Oral Airway, Nasal Airway, Laryngoscope, and Face Mask guides require Age or Weight.",
    validation_custom_name_required: "Custom Drug Name is required.",
    validation_custom_range_positive: "Custom dose range must contain numbers greater than 0.",
    validation_custom_max_gte_min: "Max Dose per kg must be greater than or equal to Min Dose per kg.",
    validation_unit_base_match: "Dose Unit and Concentration Unit should use the same base unit for volume calculation.",
    validation_initial_dose_target: "Initial dose target must be a number greater than 0.",
    result_setup: "Setup",
    absolute_dose_mode: "absolute-dose mode",
    reference_doses: "Reference doses",
    formula_same_weight: "Each row uses the same formula: (dose x weight x {factor}) / concentration.",
    formula_same_absolute: "Each row uses the same formula: (dose x {factor}) / concentration.",
    pediatric_weight_based_bolus: "Pediatric Weight-Based Bolus",
    recommended_dose_range_label: "Recommended dose range",
    pediatric_dose_formula_adjusted: "Dose calculation: {weight} kg x {min}-{max} {unitPerKg} = {rawMin}-{rawMax} {amountUnit}. {limitMessage}",
    pediatric_dose_formula_plain: "Dose calculation: {weight} kg x {min}-{max} {unitPerKg} = {rawMin}-{rawMax} {amountUnit}",
    pediatric_optional_volume_formula: "Optional volume calculation: {minDose}-{maxDose} {amountUnit} / {concentration} {concentrationUnit} = {minVolume}-{maxVolume} mL",
    pediatric_verify_reference_only: "Pediatric dosing presets are reference examples only. Verify with institutional protocols and current references.",
    pediatric_warning_suffix: "Verify with institutional protocols and current references.",
    age_not_entered: "Age not entered",
    pediatric_ett_result: "Pediatric ETT Result",
    pediatric_supraglottic_result: "Pediatric Supraglottic Result",
    pediatric_oral_airway_result: "Pediatric Oral Airway Result",
    pediatric_nasal_airway_result: "Pediatric Nasal Airway Result",
    pediatric_face_mask_result: "Pediatric Face Mask Result",
    pediatric_laryngoscope_result: "Pediatric Laryngoscope Result",
    reference_weight_range: "Reference weight range",
    sizing_method: "Sizing method",
    preferred_measurement: "Preferred measurement",
    alternative_guide: "Alternative guide",
    reference_band: "Reference band",
    device_category_ett: "Device category: ETT",
    oral_depth_from_lip: "Estimated oral depth (from lip)",
    cm_from_lip: "{depth} cm from lip",
    enter_weight_size_range: "Enter weight to show size range.",
    oral_airway_measure_method: "Measure from the mouth corner to the angle of the mandible first.",
    nasal_airway_measure_method: "Use nostril-to-tragus minus about 10 mm as the primary guide.",
    enter_age_or_weight_face_mask: "Enter age or weight to show the size band.",
    enter_age_or_weight_blade: "Enter age or weight to show the blade guide.",
    airway_age_context: "Age {ageText}{weightText}",
    device_reference_band: "Reference band: {label}",
    enter_supraglottic_reference: "Enter weight to show the {deviceLabel} size reference.",
    infant_depth_band: "Infant depth band: {depth} ({label})",
    use_external_measurement_first: "Use external measurement first; infant age/weight only provides a rough guide.",
    enter_face_mask_guide: "Enter age or weight to show the face mask guide.",
    enter_laryngoscope_guide: "Enter age or weight to show the laryngoscope guide.",
    suction_reference_size_only: "{deviceLabel} sizing follows manufacturer weight guidance rather than an age-based formula.",
    oral_airway_quick_guide: "Oral airway quick guide: size {size} ({length}) is a starting reference for the {label} range.",
    oral_airway_reference_only: "Oral airway size is shown as a quick reference only.",
    nasal_airway_external_measurement: "Nasopharyngeal airway sizing should start with external measurement rather than age-based formula alone.",
    face_mask_quick_guide: "Face mask quick guide: size {size} is commonly used first in the {label} range. Manufacturer numbering may differ.",
    face_mask_reference_only: "Face mask sizing is shown as a broad reference only.",
    laryngoscope_quick_guide: "Laryngoscope quick guide: {blade} is the first-choice reference for the {label} range.",
    laryngoscope_reference_only: "Laryngoscope blade guidance is shown as a quick reference only.",
    ett_depth_under_two: "Depth estimate: for children under 2 years, this calculator uses the 10-12 cm progression reference from the lip.",
    ett_depth_age_formula: "Depth estimate: oral = age/2 + 12 -> {depth} cm from the lip.",
    ett_depth_crosscheck: "Tube size x 3 provides an additional cuffed oral depth cross-check of {depth} cm. For oral ETT, interpret this as lip depth and confirm clinically.",
    supraglottic_depth_note: "{deviceLabel} is a supraglottic airway size reference only. Depth-style ETT formulas do not apply.",
    oral_airway_depth_note: "Use the oral airway as a starting estimate only, then confirm external fit and clinical patency.",
    nasal_airway_depth_note: "Use nostril-to-tragus style external measurement as the primary guide, then confirm patency and position clinically.",
    nasal_airway_infant_study: "For children younger than 2 years, the attached study reported an approximate insertion depth band of {depth}. Outside infancy, rely more on external measurement and clinical confirmation.",
    face_mask_depth_note: "Choose the smallest mask that seals the nose and mouth without resting on the eyes. Brand-specific numbering and cushion shape vary.",
    laryngoscope_depth_note: "Blade type and size vary with anatomy, pathology, and operator preference. Straight blades are often preferred in younger infants, while curved blades become more common with larger children.",
    airway_warning_ett_infant: "Age-based ETT formulas are less reliable in neonates and young infants. Use infant-specific references and confirm clinically.",
    airway_warning_ett: "ETT formulas are reference estimates only. Confirm tube fit, leak, depth, and position clinically.",
    airway_warning_supraglottic: "{deviceLabel} sizing is based on manufacturer weight guidance. Verify product-specific instructions and clinical fit.",
    airway_warning_oral: "Oral airway size guidance is approximate. Confirm fit externally and reassess airway patency clinically.",
    airway_warning_nasal: "Nasal airway guidance is approximate and should not replace external measurement, lubrication, gentle insertion, and clinical confirmation.",
    airway_warning_face_mask: "Face mask guidance is approximate. Check seal, dead space, eye clearance, and brand-specific numbering before use.",
    airway_warning_laryngoscope: "Laryngoscope blade guidance is approximate. Confirm mouth opening, anatomy, and operator preference before selection.",
    dantrolene_vial_explanation: "Using {formulation}, the initial dose requires about {initialVials} vial(s), and preparing for a cumulative 10 mg/kg requires about {maxVials} vial(s).",
    dantrolene_initial_guide: "Initial: give {dose} mg/kg IV now. Many MH references start with 2.5 mg/kg as the initial treatment dose.",
    dantrolene_repeat_guide: "Repeat bolus: if hypermetabolic signs persist or recur, continue repeat boluses. A common emergency reference is to escalate toward a cumulative 10 mg/kg, while some formulations also describe a 1 mg/kg repeat bolus after recurrence.",
    dantrolene_maintenance_guide: "Maintenance: after initial control, many MH references advise 1 mg/kg IV every 4-6 hours, or an equivalent infusion strategy, for at least 24 hours.",
    dantrolene_emergency_reference_only: "Emergency quick reference only. Continue with your institutional MH protocol, redosing plan, cooling, and post-crisis monitoring.",
    workspace_select_template: "Select template",
    workspace_limit_title: "Maximum 6 Multi Drug cards",
    workspace_add_card_title: "Add another drug card",
    workspace_current_shared_weight: "Current shared weight: {weight} kg. Each card is calculated independently using the same patient weight.",
    workspace_loaded_template: "Loaded template: {name}.",
    workspace_loaded_template_note: " (Note: {note})",
    workspace_limit_help: "A maximum of 6 Multi Drug cards can be added.",
    move_up: "Move up",
    move_down: "Move down",
    remove: "Remove",
    workspace_drug: "Drug",
    workspace_concentration: "Concentration",
    workspace_target_dose: "Target Dose",
    workspace_ntg_unit_hint: "Nitroglycerin default reference is mcg/min. Shared weight is required for mcg/kg/min.",
    workspace_enter_shared_weight: "Enter shared weight and valid card values.",
    workspace_enter_valid_values: "Enter valid card values.",
    workspace_target_at_concentration: "Target {dose} {unit} at {concentration} {concentrationUnit}",
    workspace_out_of_range: "Outside reference range - verify institutional protocol.",
    workspace_reference_range_note: "Reference range: {min} - {max} {unit}.{sharedWeightNote}",
    workspace_shared_weight_not_used: " Shared weight is not used for this drug.",
    workspace_use_case_note: "Use case: {useCase}",
    workspace_range_basis_note: "Range basis: {basis}",
    workspace_rationale_note: "Rationale: {rationale}",
    workspace_standard_dilution_note: "Standard dilution: {dilution}.",
    workspace_apply_standard_dilution_title: "Apply standard dilution concentration",
    workspace_no_standard_dilution_title: "No standard dilution preset available",
    workspace_apply_standard_dilution: "Apply standard dilution",
    dilution_error_target_concentration: "Target concentration must be a positive number.",
    dilution_error_final_volume: "Final volume must be a positive number.",
    dilution_error_stock_concentration: "Stock concentration must be a positive number.",
    dilution_error_dilution_impossible: "Target concentration is higher than the stock concentration. Dilution is not possible.",
    dilution_error_drug_amount: "Drug amount must be a positive number."
  }
};

let currentLanguage = "ko";

function t(key, replacements) {
  const dictionary = TRANSLATIONS[currentLanguage] || TRANSLATIONS.ko;
  const fallbackDictionary = TRANSLATIONS.ko;
  let template = dictionary[key] || fallbackDictionary[key] || key;

  if (!replacements) {
    return template;
  }

  Object.keys(replacements).forEach(function (token) {
    template = template.replace(new RegExp(`\\{${token}\\}`, "g"), replacements[token]);
  });

  return template;
}

function loadLanguagePreference() {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage === "ko" || savedLanguage === "en") {
    return savedLanguage;
  }

  return "en";
}

function saveLanguagePreference(language) {
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
}

function applyStaticTranslations() {
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

function updateFeedbackLinks() {
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

function updateSupportLinks() {
  const tossHref = SUPPORT_CONFIG.tossUrl || "";
  const kofiHref = SUPPORT_CONFIG.kofiUrl || "";
  const hasLiveChannel = Boolean(tossHref || kofiHref);

  if (supportDonateCard) {
    supportDonateCard.classList.toggle("hidden", !hasLiveChannel);
  }

  applyActionLink(supportTossLink, tossHref);
  applyActionLink(supportKofiLink, kofiHref);

  if (supportStatus) {
    supportStatus.textContent = hasLiveChannel
      ? t("support_status_configured")
      : t("support_status_unconfigured");
    supportStatus.classList.toggle("hidden", hasLiveChannel);
  }
}

// -----------------------------
// Calculation engine
// -----------------------------

function isWeightBasedReferenceRange(referenceRange) {
  return !referenceRange || referenceRange.weightBased !== false;
}

function isNitroglycerinDrug(drug) {
  return Boolean(drug && drug.id === "nitroglycerin");
}

function getSelectedNitroglycerinDoseView() {
  return sanitizeNitroglycerinDoseUnitView(
    nitroglycerinDoseViewSelect ? nitroglycerinDoseViewSelect.value : "mcg/min"
  );
}

function getPreferredNitroglycerinDoseView() {
  return sanitizeNitroglycerinDoseUnitView(getSingleDrugState().nitroglycerinDoseUnitView);
}

function getWorkspaceNitroglycerinDoseView(card, weightKg) {
  const preferredView = sanitizeNitroglycerinDoseUnitView(card && card.nitroglycerinDoseUnitView);

  if (preferredView === "mcg/kg/min" && !isPositiveNumber(weightKg)) {
    return "mcg/min";
  }

  return preferredView;
}

function getDisplayDoseUnit(drug, weightKg, preferredView) {
  if (!isNitroglycerinDrug(drug)) {
    return (drug && drug.referenceRange && drug.referenceRange.unit) || "mcg/kg/min";
  }

  return sanitizeNitroglycerinDoseUnitView(preferredView || getPreferredNitroglycerinDoseView());
}

function convertDoseValueForDisplay(value, drug, weightKg, displayUnit) {
  if (!isNitroglycerinDrug(drug) || displayUnit !== "mcg/kg/min" || !isPositiveNumber(weightKg)) {
    return value;
  }

  return value / weightKg;
}

function convertDoseValueToReferenceUnit(value, drug, weightKg, displayUnit) {
  if (!isNitroglycerinDrug(drug) || displayUnit !== "mcg/kg/min" || !isPositiveNumber(weightKg)) {
    return value;
  }

  return value * weightKg;
}

function convertDoseListForDisplay(values, drug, weightKg, displayUnit) {
  return values.map(function (value) {
    return convertDoseValueForDisplay(value, drug, weightKg, displayUnit);
  });
}

function convertDoseListToReferenceUnit(values, drug, weightKg, displayUnit) {
  return values.map(function (value) {
    return convertDoseValueToReferenceUnit(value, drug, weightKg, displayUnit);
  });
}

function getReferenceTimeFactor(referenceRange) {
  return referenceRange && referenceRange.timeUnit === "hr" ? 1 : 60;
}

function doseToRate(weightKg, concentrationPerMl, doseValue, referenceRange) {
  const timeFactor = getReferenceTimeFactor(referenceRange);

  if (isWeightBasedReferenceRange(referenceRange)) {
    return (doseValue * weightKg * timeFactor) / concentrationPerMl;
  }

  return (doseValue * timeFactor) / concentrationPerMl;
}

function rateToDose(weightKg, concentrationPerMl, rateMlHr, referenceRange) {
  const timeFactor = getReferenceTimeFactor(referenceRange);

  if (isWeightBasedReferenceRange(referenceRange)) {
    return (rateMlHr * concentrationPerMl) / (weightKg * timeFactor);
  }

  return (rateMlHr * concentrationPerMl) / timeFactor;
}

function buildReferenceTable(weightKg, concentrationPerMl, doseList, referenceRange) {
  return doseList.map(function (dose) {
    return {
      dose: dose,
      rate: doseToRate(weightKg, concentrationPerMl, dose, referenceRange)
    };
  });
}

function calculateWeightBasedDoseRange(weightKg, minDosePerKg, maxDosePerKg) {
  return {
    minDose: weightKg * minDosePerKg,
    maxDose: weightKg * maxDosePerKg
  };
}

function calculateDoseVolume(doseAmount, concentrationPerMl) {
  return doseAmount / concentrationPerMl;
}

function calculateDantroleneDose(weightKg, dosePerKg) {
  return weightKg * dosePerKg;
}

function roundToNearestHalf(value) {
  return Math.round(value * 2) / 2;
}

function formatDoseValueWithEquivalent(value, unit) {
  if (unit === "mcg/kg/hr") {
    return `${formatNumber(value, 3)} ${unit} (${formatNumber(value / 1000, 3)} mg/kg/hr)`;
  }

  return `${formatNumber(value, 3)} ${unit}`;
}

function formatDoseRangeWithEquivalent(min, max, unit) {
  if (unit === "mcg/kg/hr") {
    return `${formatNumber(min, 3)} - ${formatNumber(max, 3)} ${unit} (${formatNumber(min / 1000, 3)} - ${formatNumber(max / 1000, 3)} mg/kg/hr)`;
  }

  return `${formatNumber(min, 3)} - ${formatNumber(max, 3)} ${unit}`;
}

function formatInfusionDoseDisplay(value, unit, drug, weightKg) {
  const baseText = formatDoseValueWithEquivalent(value, unit);

  if (
    drug &&
    drug.id === "nitroglycerin" &&
    unit === "mcg/kg/min" &&
    isPositiveNumber(weightKg)
  ) {
    return `${baseText} (${formatNumber(value * weightKg, 3)} mcg/min)`;
  }

  if (
    drug &&
    drug.id === "nitroglycerin" &&
    unit === "mcg/min" &&
    isPositiveNumber(weightKg)
  ) {
    return `${baseText} (${formatNumber(value / weightKg, 3)} mcg/kg/min)`;
  }

  return baseText;
}

function formatInfusionRangeDisplay(min, max, unit, drug, weightKg) {
  const baseText = formatDoseRangeWithEquivalent(min, max, unit);

  if (
    drug &&
    drug.id === "nitroglycerin" &&
    unit === "mcg/kg/min" &&
    isPositiveNumber(weightKg)
  ) {
    return `${baseText} (${formatNumber(min * weightKg, 3)} - ${formatNumber(max * weightKg, 3)} mcg/min)`;
  }

  if (
    drug &&
    drug.id === "nitroglycerin" &&
    unit === "mcg/min" &&
    isPositiveNumber(weightKg)
  ) {
    return `${baseText} (${formatNumber(min / weightKg, 3)} - ${formatNumber(max / weightKg, 3)} mcg/kg/min)`;
  }

  return baseText;
}

function formatEditableDoseValue(value) {
  return Number(Number(value).toFixed(3)).toString();
}

function formatEditableDoseList(values) {
  return values.map(function (value) {
    return formatEditableDoseValue(value);
  }).join(", ");
}

function calculatePediatricAirwayEstimates(ageYears) {
  const uncuffedSize = roundToNearestHalf((ageYears / 4) + 4);
  const cuffedSize = roundToNearestHalf((ageYears / 4) + 3.5);
  const oralDepth = ageYears < 2
    ? 10 + ageYears
    : (ageYears / 2) + 12;

  return {
    uncuffedSize: uncuffedSize,
    cuffedSize: cuffedSize,
    oralDepth: oralDepth,
    cuffedDepthBySize: cuffedSize * 3
  };
}

const SUPRAGLOTTIC_DEVICE_GUIDES = {
  "i-gel": {
    label: "i-gel",
    sourceLabel: "Intersurgical weight guide",
    sizes: [
      { size: "1", minWeight: 2, maxWeight: 5 },
      { size: "1.5", minWeight: 5, maxWeight: 12 },
      { size: "2", minWeight: 10, maxWeight: 25 },
      { size: "2.5", minWeight: 25, maxWeight: 35 },
      { size: "3", minWeight: 30, maxWeight: 60 }
    ]
  },
  "lma-supreme": {
    label: "LMA Supreme",
    sourceLabel: "Teleflex weight guide",
    sizes: [
      { size: "1", minWeight: 0, maxWeight: 5 },
      { size: "1.5", minWeight: 5, maxWeight: 10 },
      { size: "2", minWeight: 10, maxWeight: 20 },
      { size: "2.5", minWeight: 20, maxWeight: 30 },
      { size: "3", minWeight: 30, maxWeight: 50 }
    ]
  }
};

const ORAL_AIRWAY_GUIDE = [
  { minWeight: 0, maxWeight: 5, minAge: 0, maxAge: 0.5, size: "000", length: "40 mm", label: "Neonate / small infant" },
  { minWeight: 5, maxWeight: 10, minAge: 0.5, maxAge: 1.5, size: "0", length: "50 mm", label: "Infant" },
  { minWeight: 10, maxWeight: 20, minAge: 1.5, maxAge: 5, size: "1", length: "60 mm", label: "Toddler / preschool" },
  { minWeight: 20, maxWeight: 35, minAge: 5, maxAge: 9, size: "2", length: "70 mm", label: "School-age child" },
  { minWeight: 35, maxWeight: 50, minAge: 9, maxAge: 13, size: "3", length: "80 mm", label: "Older child" },
  { minWeight: 50, maxWeight: 999, minAge: 13, maxAge: 99, size: "4", length: "90 mm", label: "Adolescent" }
];

const LARYNGOSCOPE_GUIDE = [
  {
    minWeight: 0,
    maxWeight: 5,
    minAge: 0,
    maxAge: 0.25,
    primaryBlade: "Miller 0",
    secondaryBlade: "Miller 1 if needed",
    label: "Neonate / small infant"
  },
  {
    minWeight: 5,
    maxWeight: 10,
    minAge: 0.25,
    maxAge: 2,
    primaryBlade: "Miller 1",
    secondaryBlade: "Miller 0-1 depending on anatomy",
    label: "Infant / toddler"
  },
  {
    minWeight: 10,
    maxWeight: 20,
    minAge: 2,
    maxAge: 6,
    primaryBlade: "Miller 2 or Macintosh 2",
    secondaryBlade: "Choose straight vs curved by anatomy and operator preference",
    label: "Young child"
  },
  {
    minWeight: 20,
    maxWeight: 40,
    minAge: 6,
    maxAge: 12,
    primaryBlade: "Macintosh 2",
    secondaryBlade: "Macintosh 3 for larger child",
    label: "School-age child"
  },
  {
    minWeight: 40,
    maxWeight: 999,
    minAge: 12,
    maxAge: 99,
    primaryBlade: "Macintosh 3",
    secondaryBlade: "Macintosh 2-3 depending on size and anatomy",
    label: "Adolescent"
  }
];

const NASAL_AIRWAY_GUIDE = [
  { minAge: 0, maxAge: 1, minWeight: 0, maxWeight: 10, insertionDepth: "7.0-8.5 cm", label: "First year of life" },
  { minAge: 1, maxAge: 2, minWeight: 8, maxWeight: 15, insertionDepth: "8.0-10.0 cm", label: "Second year of life" }
];

const FACE_MASK_GUIDE = [
  { minWeight: 0, maxWeight: 5, minAge: 0, maxAge: 0.5, size: "0-1", label: "Neonate / small infant" },
  { minWeight: 5, maxWeight: 10, minAge: 0.5, maxAge: 1.5, size: "1", label: "Infant" },
  { minWeight: 10, maxWeight: 20, minAge: 1.5, maxAge: 5, size: "2", label: "Toddler / preschool child" },
  { minWeight: 20, maxWeight: 35, minAge: 5, maxAge: 10, size: "3", label: "School-age child" },
  { minWeight: 35, maxWeight: 60, minAge: 10, maxAge: 18, size: "4", label: "Older child / adolescent" }
];

const DANTROLENE_FORMULATIONS = [
  {
    id: "standard-20mg",
    name: "Standard 20 mg vial",
    vialStrengthMg: 20,
    defaultInitialDoseMgKg: 2.5,
    cumulativeMaxMgKg: 10,
    reconstitution: "Reconstitute each 20 mg vial with 60 mL sterile water before use.",
    notes: "Traditional formulation; many vials may be required during MH treatment.",
    references: ["dantrolene_standard_dailymed", "mhaus_dantrolene"]
  },
  {
    id: "ryanodex-250mg",
    name: "RYANODEX 250 mg vial",
    vialStrengthMg: 250,
    defaultInitialDoseMgKg: 2.5,
    cumulativeMaxMgKg: 10,
    reconstitution: "Reconstitute each 250 mg vial with 5 mL sterile water before use.",
    notes: "Concentrated formulation; fewer vials may be needed for the same target dose.",
    references: ["dantrolene_ryanodex_fda", "mhaus_dantrolene"]
  }
];

const REFERENCE_REGISTRY = {
  pediatric_ett_openanesthesia: {
    title: "Pediatric direct laryngoscopy and tracheal intubation",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/pediatric-direct-laryngoscopy-and-tracheal-intubation/",
    lastReviewed: "2026-03-14"
  },
  pediatric_ett_msd_calculator: {
    title: "Endotracheal tube size for children age 1 to 8 years",
    source: "MSD Manual Professional Edition",
    url: "https://www.msdmanuals.com/professional/multimedia/clinical-calculator/endotracheal-tube-size-for-children-age-1-to-8-years",
    lastReviewed: "2026-03-14"
  },
  igel_intersurgical: {
    title: "i-gel sizing guide",
    source: "Intersurgical",
    url: "https://www.intersurgical.com/info/igel",
    lastReviewed: "2026-03-14"
  },
  lma_supreme_teleflex: {
    title: "LMA Supreme airway user guide",
    source: "Teleflex",
    url: "https://www.teleflex.com/usa/en/product-areas/emergency-medicine/airway-management/supraglottic-airways/AN_LM_Supreme-User-Guide_PC_MC-000163.pdf",
    lastReviewed: "2026-03-14"
  },
  pediatric_oral_airway_basics: {
    title: "Routine airway management",
    source: "Basics of Pediatric Anesthesia",
    url: "https://basicsofpediatricanesthesia.com/section-iii-anesthetic-management/chapter-16-routine-airway-management/",
    lastReviewed: "2026-03-14"
  },
  pediatric_laryngoscope_blade_guide: {
    title: "Choose your blade",
    source: "The Protected Airway",
    url: "https://theprotectedairway.com/choose-your-blade/",
    lastReviewed: "2026-03-14"
  },
  pediatric_nasal_airway_pubmed: {
    title: "Insertion depth of nasal airway in children younger than 2 years",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/34600970/",
    lastReviewed: "2026-03-14"
  },
  pediatric_face_mask_ambu: {
    title: "Anatomical face masks product information",
    source: "Ambu",
    url: "https://www.ambu.com/airway-management-and-anaesthesia/face-masks/product/ambu-king-mask",
    lastReviewed: "2026-03-15"
  },
  pediatric_face_mask_intersurgical: {
    title: "EcoMask anaesthetic face masks",
    source: "Intersurgical",
    url: "https://www.intersurgical.com/info/anaesthetic-facemasks",
    lastReviewed: "2026-03-15"
  },
  pediatric_fentanyl_dailymed: {
    title: "Fentanyl citrate injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=c5d40297-b769-48cc-9f84-f98b7a333507",
    lastReviewed: "2026-03-14"
  },
  pediatric_rocuronium_dailymed: {
    title: "Rocuronium bromide injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9a622308-7bda-4ca0-9de5-d6b3b4be3384",
    lastReviewed: "2026-03-14"
  },
  pediatric_sugammadex_fda: {
    title: "BRIDION prescribing information",
    source: "FDA",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/022225s014lbl.pdf",
    lastReviewed: "2026-03-14"
  },
  pediatric_neostigmine_dailymed: {
    title: "Neostigmine methylsulfate injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=9cc2bfa1-c968-4d01-8162-2ef188974164",
    lastReviewed: "2026-03-14"
  },
  pediatric_glycopyrrolate_dailymed: {
    title: "Glycopyrrolate injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=960d2dd0-008d-4ec1-ba2e-9388b28b23e2",
    lastReviewed: "2026-03-15"
  },
  pediatric_atropine_dailymed: {
    title: "Atropine sulfate injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=4c15d3cc-7888-4c82-b3f8-a5d93c5523df",
    lastReviewed: "2026-03-14"
  },
  pediatric_propofol_dailymed: {
    title: "Propofol injectable emulsion prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=5ec25932-6c21-4cd5-8f60-80761f2e20a6",
    lastReviewed: "2026-03-14"
  },
  pediatric_ketamine_dailymed: {
    title: "Ketamine hydrochloride injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=f8b01c77-620d-4734-a771-b8524b65bcca",
    lastReviewed: "2026-03-14"
  },
  pediatric_ondansetron_dailymed: {
    title: "Ondansetron injection prescribing information",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=97713356-f42b-4a67-95f6-561afa68c0c2",
    lastReviewed: "2026-03-14"
  },
  infusion_norepinephrine_dailymed: {
    title: "Norepinephrine label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=a27fb6e0-8f7a-11db-9739-0050c2490048",
    linkLabel: "Open full label",
    usageNote: "Label dosing: initial 8-12 mcg/min by IV infusion, then adjust to hemodynamic effect. Typical maintenance is 2-4 mcg/min.",
    lastReviewed: "2026-03-15"
  },
  infusion_norepinephrine_openanesthesia: {
    title: "Norepinephrine anesthesia clinical dosing",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/epinephrine-and-norepinephrine/",
    linkLabel: "Open article",
    usageNote: "Anesthesia reference: adult infusion commonly starts around 0.02-0.15 mcg/kg/min and is titrated to target MAP. Use as a perioperative weight-based reference, not as a product label dose.",
    lastReviewed: "2026-03-15"
  },
  infusion_norepinephrine_periop_study: {
    title: "Norepinephrine perioperative induction study",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/40744797/",
    linkLabel: "Open abstract",
    usageNote: "Study-specific perioperative evidence: high-risk noncardiac surgery induction data support continuous norepinephrine infusion as a blood pressure stabilization strategy. Treat this as context evidence rather than a universal standard dose range.",
    lastReviewed: "2026-03-15"
  },
  infusion_epinephrine_dailymed: {
    title: "Epinephrine label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=3b1ac82f-6920-4e40-a77e-598398679f2d",
    linkLabel: "Open full label",
    usageNote: "Adult continuous infusion labeling commonly falls in the 0.05-2 mcg/kg/min range, titrated to hemodynamic effect.",
    lastReviewed: "2026-03-15"
  },
  infusion_epinephrine_openanesthesia: {
    title: "Epinephrine anesthesia clinical context",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/epinephrine-and-norepinephrine/",
    linkLabel: "Open article",
    usageNote: "Perioperative context: epinephrine provides mixed alpha and beta support, with stronger beta effects at lower doses and increasing alpha vasoconstriction as dose rises.",
    lastReviewed: "2026-03-15"
  },
  infusion_phenylephrine_dailymed: {
    title: "Phenylephrine label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=1e77b9c8-fa17-4aa4-adc8-ff716ab2e5d7",
    linkLabel: "Open full label",
    usageNote: "For anesthesia-induced hypotension, labeling supports infusion around 0.5-1.4 mcg/kg/min with titration to blood pressure response.",
    lastReviewed: "2026-03-15"
  },
  infusion_phenylephrine_periop_study: {
    title: "Phenylephrine perioperative infusion study",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/39544834/",
    linkLabel: "Open abstract",
    usageNote: "Operating-room context: anesthesia safety initiative describing peripheral phenylephrine infusions during anesthesia and highlighting concentration standardization and infusion safety.",
    lastReviewed: "2026-03-15"
  },
  infusion_vasopressin_dailymed: {
    title: "Vasopressin label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/getFile.cfm?setid=b1147beb-743e-4c62-8927-91192447f8b8&type=pdf",
    linkLabel: "Open full label",
    usageNote: "Shock: 0.01 – 0.04 units/min. Not weight-based. Typically added to norepinephrine.",
    lastReviewed: "2026-03-15"
  },
  infusion_vasopressin_openanesthesia: {
    title: "Vasopressin anesthesia clinical dosing",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/aba_arginine_vasopressin/",
    linkLabel: "Open article",
    usageNote: "Perioperative refractory hypotension reference: low-dose infusion or boluses of 0.01-0.04 U/min or 0.5-1 U bolus can be used during general anesthesia.",
    lastReviewed: "2026-03-15"
  },
  infusion_nitroglycerin_dailymed: {
    title: "Nitroglycerin label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=b8af0974-33ea-4dd5-9ff7-3b61272aeb25",
    linkLabel: "Open full label",
    usageNote: "Label dosing starts at 5 mcg/min IV infusion with stepwise upward titration; non-PVC tubing and glass bottles are commonly recommended.",
    lastReviewed: "2026-03-15"
  },
  infusion_nitroglycerin_openanesthesia: {
    title: "Nitroglycerin anesthesia clinical dosing",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/nitroglycerin/",
    linkLabel: "Open article",
    usageNote: "Operating-room reference: continuous IV nitroglycerin is commonly started at 5 mcg/min and titrated every 3-5 minutes. Common OR uses include hypertensive urgency and myocardial ischemia.",
    lastReviewed: "2026-03-15"
  },
  infusion_dopamine_dailymed: {
    title: "Dopamine label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=0e499952-46c7-4172-8c70-186312e240a3",
    linkLabel: "Open full label",
    usageNote: "Label dosing spans about 2-50 mcg/kg/min IV infusion. Hemodynamic effects shift across lower, intermediate, and higher dose bands.",
    lastReviewed: "2026-03-15"
  },
  infusion_dopamine_periop_study: {
    title: "Dopamine perioperative hemodynamic study",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/117821/",
    linkLabel: "Open abstract",
    usageNote: "Cardiac-surgery context: anesthesia study describing dopamine 8 mcg/kg/min before bypass, with improved cardiac index but higher filling pressures unless balanced with nitroglycerin.",
    lastReviewed: "2026-03-15"
  },
  infusion_dobutamine_dailymed: {
    title: "Dobutamine label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=9794e9d0-c8b7-4d18-8cd1-15cc4f2a9a55",
    linkLabel: "Open full label",
    usageNote: "Adult infusion labeling commonly uses 2.5-20 mcg/kg/min, titrated to cardiac output and perfusion goals.",
    lastReviewed: "2026-03-15"
  },
  infusion_milrinone_dailymed: {
    title: "Milrinone label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=fde1e354-4f15-4ade-9ae3-db2ba67e0431",
    linkLabel: "Open full label",
    usageNote: "Maintenance infusion is typically 0.375-0.75 mcg/kg/min after any loading dose. Adjust carefully for renal impairment.",
    lastReviewed: "2026-03-15"
  },
  infusion_milrinone_openanesthesia: {
    title: "Milrinone perioperative dosing",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/milrinone_pharmacology/",
    linkLabel: "Open article",
    usageNote: "Cardiac anesthesia reference: 50 mcg/kg IV over 10 minutes followed by 0.375-0.75 mcg/kg/min infusion, commonly used for perioperative low-output states and RV dysfunction.",
    lastReviewed: "2026-03-15"
  },
  infusion_isoproterenol_dailymed: {
    title: "Isoproterenol label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=d2a9b767-0274-49bf-83cd-2fcce9bedc78",
    linkLabel: "Open full label",
    usageNote: "Adult infusion labeling commonly starts at 0.5 mcg/min with titration; usual effective rates are often 0.5-5 mcg/min.",
    lastReviewed: "2026-03-15"
  },
  infusion_isoproterenol_tiva_study: {
    title: "Isoproterenol during TIVA study",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/22366997/",
    linkLabel: "Open abstract",
    usageNote: "Electrophysiology/TIVA context: isoproterenol infusion increased BIS and consciousness level during atrial fibrillation ablation, so anesthetic depth may need adjustment when it is used intraoperatively.",
    lastReviewed: "2026-03-15"
  },
  dantrolene_standard_dailymed: {
    title: "Dantrolene sodium for injection",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?audience=consumer&setid=ab0efc75-0598-4f4e-91ad-6195bb2661fe",
    lastReviewed: "2026-03-15"
  },
  dantrolene_ryanodex_fda: {
    title: "RYANODEX prescribing information",
    source: "FDA",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2024/205579s011lbl.pdf",
    lastReviewed: "2026-03-15"
  },
  mhaus_dantrolene: {
    title: "How much dantrolene should be kept on hand?",
    source: "MHAUS",
    url: "https://www.mhaus.org/faqs/how-much-dantrolene-should-be-kept-on-hand/",
    lastReviewed: "2026-03-15"
  },
  infusion_remifentanil_dailymed: {
    title: "Remifentanil label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=8b4c8696-e23e-4c51-a4d2-babab5bd945a",
    linkLabel: "Open full label",
    usageNote: "Maintenance infusion for general anesthesia commonly ranges from about 0.05-2 mcg/kg/min depending on the anesthetic technique.",
    lastReviewed: "2026-03-15"
  },
  infusion_remifentanil_periop_study: {
    title: "Remifentanil general anesthesia study",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/41142244/",
    linkLabel: "Open abstract",
    usageNote: "General anesthesia context: remifentanil-based induction was associated with more stable early hemodynamics than fentanyl in thoracoscopic esophagectomy, while bradycardia remained a relevant adverse effect.",
    lastReviewed: "2026-03-15"
  },
  infusion_propofol_dailymed: {
    title: "Propofol label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=800646b8-83a8-01d9-3dc8-bb2ddcb8570c",
    linkLabel: "Open full label",
    usageNote: "For maintenance of general anesthesia in healthy adults under 55 years, labeling commonly cites 100-200 mcg/kg/min, with lower rates often needed in older or sicker patients.",
    lastReviewed: "2026-03-15"
  },
  infusion_propofol_openanesthesia: {
    title: "Propofol anesthesia clinical context",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/propofol/",
    linkLabel: "Open article",
    usageNote: "General anesthesia reference: propofol remains the most common IV induction and maintenance agent, and continuous infusion is standard for precise TIVA depth control.",
    lastReviewed: "2026-03-15"
  },
  infusion_esmolol_dailymed: {
    title: "Esmolol label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=4cfdfa50-579b-43e7-bc0a-e831d3099bfd",
    linkLabel: "Open full label",
    usageNote: "Initial dose: 50 – 300 mcg/kg/min. Ultra-short acting beta blocker.",
    lastReviewed: "2026-03-15"
  },
  infusion_esmolol_meta_analysis: {
    title: "Esmolol anesthesia meta-analysis",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/41134986/",
    linkLabel: "Open abstract",
    usageNote: "General anesthesia adjunct evidence: perioperative esmolol infusions across randomized trials ranged from about 0.3-6 mg/kg/h and were associated with reduced intraoperative and postoperative opioid use.",
    lastReviewed: "2026-03-15"
  },
  infusion_dexmedetomidine_dailymed: {
    title: "Dexmedetomidine label dose",
    source: "DailyMed",
    url: "https://dailymed.nlm.nih.gov/dailymed/lookup.cfm?setid=4fe788bc-4ad1-4b32-83d3-dcbfcd8429aa",
    linkLabel: "Open full label",
    usageNote: "Official dosing guidance includes maintenance infusions around 0.2-1 mcg/kg/hr in monitored sedation contexts, while ICU or selected settings may extend higher depending on the product label.",
    lastReviewed: "2026-03-15"
  },
  infusion_dexmedetomidine_openanesthesia: {
    title: "Dexmedetomidine anesthesia clinical dosing",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/dexmedetomidine/",
    linkLabel: "Open article",
    usageNote: "General anesthesia adjunct reference: dexmedetomidine shows linear pharmacokinetics in the 0.2-0.7 mcg/kg/h range and can reduce sevoflurane, propofol, and opioid requirements.",
    lastReviewed: "2026-03-15"
  },
  infusion_remimazolam_dailymed: {
    title: "Remimazolam procedural sedation label",
    source: "FDA",
    url: "https://www.accessdata.fda.gov/drugsatfda_docs/label/2023/212295s003lbl.pdf",
    linkLabel: "Open full label",
    usageNote: "BYFAVO label: initial 5 mg IV over 1 minute for procedural sedation, then supplemental 2.5 mg doses over 15 seconds no sooner than 2 minutes apart. This is a bolus/top-up regimen, not a continuous infusion default.",
    lastReviewed: "2026-03-15"
  },
  infusion_remimazolam_openanesthesia: {
    title: "Remimazolam anesthesia clinical dosing",
    source: "OpenAnesthesia",
    url: "https://www.openanesthesia.org/keywords/remimazolam/",
    linkLabel: "Open article",
    usageNote: "Anesthesia reference: induction infusion has been described around 6-12 mg/kg/hr until loss of consciousness, with maintenance around 1-2 mg/kg/hr depending on anesthetic context.",
    lastReviewed: "2026-03-15"
  },
  infusion_remimazolam_study: {
    title: "Remimazolam general anesthesia trial",
    source: "PubMed",
    url: "https://pubmed.ncbi.nlm.nih.gov/32417976/",
    linkLabel: "Open abstract",
    usageNote: "Phase IIb/III trial context: induction infusion arms of 6 or 12 mg/kg/hr were evaluated, followed by maintenance infusion around 1 mg/kg/hr with adjustment as needed.",
    lastReviewed: "2026-03-15"
  }
};

function getSupraglotticDeviceRecommendation(deviceId, weightKg) {
  const guide = SUPRAGLOTTIC_DEVICE_GUIDES[deviceId];

  if (!guide || !isPositiveNumber(weightKg)) {
    return null;
  }

  const matchingSize = guide.sizes.find(function (sizeItem) {
    return weightKg >= sizeItem.minWeight && weightKg <= sizeItem.maxWeight;
  });

  return matchingSize
    ? {
      deviceLabel: guide.label,
      sourceLabel: guide.sourceLabel,
      size: matchingSize.size,
      weightRange: `${matchingSize.minWeight}-${matchingSize.maxWeight} kg`
    }
    : {
      deviceLabel: guide.label,
      sourceLabel: guide.sourceLabel,
      size: "Out of listed range",
      weightRange: "Verify manufacturer guidance"
    };
}

function getReferenceItems(referenceIds) {
  return referenceIds.map(function (referenceId) {
    return REFERENCE_REGISTRY[referenceId];
  }).filter(Boolean);
}

function getReferenceType(item) {
  if (!item) {
    return "";
  }

  if (item.referenceType) {
    return item.referenceType;
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

function getReferenceTypeBadge(type) {
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

function getUseCaseBadge(useCase) {
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

function getRangeSourceType(drug) {
  return drug && drug.rangeSourceType ? drug.rangeSourceType : "";
}

function renderRangeSourceBadge(container, drug) {
  if (!container) {
    return;
  }

  container.innerHTML = getReferenceTypeBadge(getRangeSourceType(drug));
}

function applyRangeSourceTheme(element, drug) {
  if (!element) {
    return;
  }

  element.classList.remove("has-range-label", "has-range-clinical", "has-range-study");

  const type = getRangeSourceType(drug);
  if (type) {
    element.classList.add(`has-range-${type}`);
  }
}

function getDrugUseCaseSummary(drug) {
  if (!drug || !drug.useCaseLabel) {
    return "Not specified";
  }

  return drug.useCaseLabel;
}

function getDisplaySourceLabel(rawSource) {
  const source = (rawSource || "").trim();

  if (!source) {
    return "-";
  }

  if (source === "Editable local preset") {
    return currentLanguage === "en" ? "Locally curated reference preset" : "로컬 큐레이션 reference preset";
  }

  return source;
}

function renderUseCaseBadge(container, drug) {
  if (!container) {
    return;
  }

  container.innerHTML = getUseCaseBadge(drug && drug.useCase ? drug.useCase : "");
}

function getRangeSourceSummary(drug) {
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

function getRangeRationale(drug) {
  return drug && drug.rangeRationale
    ? drug.rangeRationale
    : "Verify against the original source, local protocol, and patient-specific context before use.";
}

function renderReferenceList(container, referenceIds) {
  if (!container) {
    return;
  }

  const referenceItems = getReferenceItems(referenceIds);

  if (!referenceItems.length) {
    container.innerHTML = '<li>No references attached yet.</li>';
    return;
  }

  container.innerHTML = referenceItems.map(function (item) {
    const reviewedStr = `<span class="reference-reviewed">(Reviewed: ${item.lastReviewed})</span>`;
    const badgeStr = getReferenceTypeBadge(getReferenceType(item));

    if (item.usageNote) {
      return `<li class="reference-item">
                <details class="reference-details">
                  <summary class="reference-summary">
                    <span class="reference-summary-title-row">
                      <span class="reference-summary-title">${item.title}</span>
                      ${badgeStr}
                    </span>
                    <span class="reference-summary-meta">${item.source} ${reviewedStr}</span>
                  </summary>
                  <div class="reference-detail-body">
                    <p class="reference-usage-note"><strong>Usage note:</strong> ${item.usageNote}</p>
                    <p class="reference-disclaimer">Clinical and study-based references describe common practice patterns or selected study settings. They should not be treated as universal dosing standards without protocol review.</p>
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
              <span class="reference-summary-meta">${item.source} ${reviewedStr}</span>
              <a class="reference-external-link" href="${item.url}" target="_blank" rel="noreferrer">${item.linkLabel || "Open reference"}</a>
            </li>`;
  }).join("");
}

function getPediatricAirwayReferenceIds(values) {
  if (values.deviceCategory === "ett") {
    return ["pediatric_ett_openanesthesia", "pediatric_ett_msd_calculator"];
  }

  if (values.deviceCategory === "oral-airway") {
    return ["pediatric_oral_airway_basics"];
  }

  if (values.deviceCategory === "nasal-airway") {
    return ["pediatric_nasal_airway_pubmed", "pediatric_oral_airway_basics"];
  }

  if (values.deviceCategory === "laryngoscope") {
    return ["pediatric_oral_airway_basics", "pediatric_laryngoscope_blade_guide"];
  }

  if (values.deviceCategory === "face-mask") {
    return ["pediatric_face_mask_ambu", "pediatric_face_mask_intersurgical"];
  }

  if (values.deviceCategory !== "supraglottic") {
    return [];
  }

  if (values.deviceModel === "i-gel") {
    return ["igel_intersurgical"];
  }

  if (values.deviceModel === "lma-supreme") {
    return ["lma_supreme_teleflex"];
  }

  return [];
}

function findGuideItemByWeightOrAge(guideItems, weightKg, ageYears) {
  if (isPositiveNumber(weightKg)) {
    const weightMatch = guideItems.find(function (item) {
      return weightKg >= item.minWeight && weightKg <= item.maxWeight;
    });

    if (weightMatch) {
      return weightMatch;
    }
  }

  if (isPositiveNumber(ageYears)) {
    return guideItems.find(function (item) {
      return ageYears >= item.minAge && ageYears < item.maxAge;
    }) || null;
  }

  return null;
}

function getOralAirwayRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(ORAL_AIRWAY_GUIDE, weightKg, ageYears);
}

function getLaryngoscopeRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(LARYNGOSCOPE_GUIDE, weightKg, ageYears);
}

function getNasalAirwayRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(NASAL_AIRWAY_GUIDE, weightKg, ageYears);
}

function getFaceMaskRecommendation(weightKg, ageYears) {
  return findGuideItemByWeightOrAge(FACE_MASK_GUIDE, weightKg, ageYears);
}

function getPediatricAirwayWarningText(deviceCategory) {
  if (deviceCategory === "ett") {
    return t("airway_warning_ett_infant");
  }

  if (deviceCategory === "supraglottic") {
    return currentLanguage === "en"
      ? "Supraglottic size guidance is weight-based. Confirm device availability, seal, and manufacturer instructions."
      : "Supraglottic size guide는 weight-based입니다. device availability, seal, manufacturer instruction을 함께 확인하세요.";
  }

  if (deviceCategory === "oral-airway") {
    return t("airway_warning_oral");
  }

  if (deviceCategory === "nasal-airway") {
    return currentLanguage === "en"
      ? "Nasal airway length is best estimated by external measurement. Age and weight are weak proxies, especially outside infancy."
      : "Nasal airway length는 외부 길이 측정이 가장 중요합니다. 특히 infancy를 벗어나면 age와 weight는 약한 proxy에 가깝습니다.";
  }

  if (deviceCategory === "laryngoscope") {
    return t("airway_warning_laryngoscope");
  }

  if (deviceCategory === "face-mask") {
    return currentLanguage === "en"
      ? "Face mask numbering varies by manufacturer. Use this as a broad starting guide and confirm actual facial fit clinically."
      : "Face mask numbering은 manufacturer마다 다릅니다. broad starting guide로만 보고 실제 facial fit을 임상적으로 확인하세요.";
  }

  return t("airway_device_select_note");
}

function getPediatricDoseReferenceIds(values) {
  if (!values || !values.profile || !Array.isArray(values.profile.references)) {
    return [];
  }

  return values.profile.references;
}

function getInfusionReferenceIds(values) {
  if (!values || !values.drug || !Array.isArray(values.drug.references)) {
    return [];
  }

  return values.drug.references;
}

function getPediatricVerificationConfig(status) {
  if (status === "supported") {
    return {
      summary: "Supported - attached reference reviewed.",
      warning: ""
    };
  }

  if (status === "off-label") {
    return {
      summary: "Off-label / Reference only - verify institutional protocol and indication.",
      warning: "This preset may reflect off-label or institution-specific pediatric use."
    };
  }

  return {
    summary: "Unverified - do not rely on this preset without manual source confirmation.",
    warning: "This preset is not yet fully verified against a current pediatric source."
  };
}

function getPediatricVerificationRank(status) {
  if (status === "supported") {
    return 0;
  }

  if (status === "off-label") {
    return 1;
  }

  return 2;
}

function formatPediatricDrugOptionLabel(preset) {
  const profile = preset.profiles.pediatricBolus;

  if (profile.verificationStatus === "off-label") {
    return `${preset.name} [Off-label]`;
  }

  if (profile.verificationStatus === "unverified") {
    return `${preset.name} [Unverified]`;
  }

  return preset.name;
}

function applyPediatricDoseLimits(doseRange, profile) {
  const doseLimits = profile.doseLimits;

  if (!doseLimits) {
    return {
      minDose: doseRange.minDose,
      maxDose: doseRange.maxDose,
      wasAdjusted: false,
      messages: []
    };
  }

  let minDose = doseRange.minDose;
  let maxDose = doseRange.maxDose;
  const messages = [];

  if (isPositiveNumber(doseLimits.maxTotalDose)) {
    if (minDose > doseLimits.maxTotalDose || maxDose > doseLimits.maxTotalDose) {
      messages.push(`Maximum single dose applied: ${formatNumber(doseLimits.maxTotalDose, 2)} ${profile.doseAmountUnit}.`);
    }

    minDose = Math.min(minDose, doseLimits.maxTotalDose);
    maxDose = Math.min(maxDose, doseLimits.maxTotalDose);
  }

  if (isPositiveNumber(doseLimits.minTotalDose)) {
    if (minDose < doseLimits.minTotalDose || maxDose < doseLimits.minTotalDose) {
      messages.push(`Minimum single dose applied: ${formatNumber(doseLimits.minTotalDose, 2)} ${profile.doseAmountUnit}.`);
    }

    minDose = Math.max(minDose, doseLimits.minTotalDose);
    maxDose = Math.max(maxDose, doseLimits.minTotalDose);
  }

  return {
    minDose: minDose,
    maxDose: Math.max(minDose, maxDose),
    wasAdjusted: messages.length > 0,
    messages: messages
  };
}

// -----------------------------
// Formatting helpers
// -----------------------------

function formatNumber(value, digits) {
  return Number(value).toFixed(digits === undefined ? 2 : digits);
}

function formatList(values) {
  return values.map(function (value) {
    return String(value);
  }).join(", ");
}

function parseDoseList(rawValue) {
  if (typeof rawValue !== "string" || rawValue.trim() === "") {
    return null;
  }

  const values = rawValue
    .split(",")
    .map(function (item) {
      return Number(item.trim());
    })
    .filter(function (value) {
      return Number.isFinite(value) && value > 0;
    });

  return values.length ? values : null;
}

function isPositiveNumber(value) {
  return Number.isFinite(value) && value > 0;
}

function getUnitBase(unitValue) {
  return typeof unitValue === "string" ? unitValue.split("/")[0] : "";
}

function createClientId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// -----------------------------
// Drug config layer
// -----------------------------

const DEFAULT_CUSTOM_DRUG = {
  id: "custom",
  name: "",
  concentration: 100,
  concentrationUnit: "mcg/mL",
  referenceDoses: [0.02, 0.05, 0.1, 0.2, 0.3],
  referenceRange: {
    min: 0.02,
    max: 0.3,
    unit: "mcg/kg/min"
  },
  notes: "",
  dilutionPresets: [],
  metadata: {
    source: "User defined",
    lastReviewed: "Not set"
  }
};

const DEFAULT_CUSTOM_PEDIATRIC_DRUG = {
  id: "custom",
  name: "Custom drug",
  category: "custom",
  profiles: {
    pediatricBolus: {
      dosePerKgUnit: "mg/kg",
      doseAmountUnit: "mg",
      recommendedRange: {
        min: 0.01,
        max: 0.02
      },
      concentration: {
        value: 1,
        unit: "mg/mL"
      },
      doseLimits: null,
      notes: "User-defined pediatric bolus reference.",
      ageGuidance: {
        default: {
          note: "Custom weight-based bolus estimate.",
          warning: "Custom pediatric dose - verify with institutional protocols and current references."
        }
      },
      verificationStatus: "unverified",
      metadata: {
        source: "User defined",
        lastReviewed: "Current session"
      }
    }
  }
};

const DRUG_PRESETS = [
  {
    id: "norepinephrine",
    name: "Norepinephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.01, 0.02, 0.05, 0.1, 0.2, 0.3],
    referenceRange: {
      min: 0.01,
      max: 0.3,
      unit: "mcg/kg/min"
    },
    useCase: "vasopressor-support",
    useCaseLabel: "General anesthesia / perioperative vasopressor support",
    rangeSourceType: "clinical",
    rangeSourceNote: "Institutional / perioperative practice range shown as a weight-based clinical preset; DailyMed label dosing remains linked separately as an absolute mcg/min reference.",
    rangeRationale: "Expanded to reflect common OR and institutional norepinephrine practice while keeping the product label visible as a separate reference context.",
    notes: "Clinical perioperative and institutional practice preset. Weight-based display is used for infusion planning, while the linked DailyMed label still presents absolute mcg/min dosing.",
    dilutionPresets: [
      {
        id: "ne-4mg-50ml",
        label: "4 mg / 50 mL",
        drugAmount: 4,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 80,
        finalConcentrationUnit: "mcg/mL",
        note: "Common syringe pump example"
      }
    ],
    references: [
      "infusion_norepinephrine_dailymed",
      "infusion_norepinephrine_openanesthesia",
      "infusion_norepinephrine_periop_study"
    ],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "epinephrine",
    name: "Epinephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.05, 0.1, 0.2, 0.5, 1, 2],
    referenceRange: {
      min: 0.05,
      max: 2,
      unit: "mcg/kg/min"
    },
    useCase: "vasopressor-support",
    useCaseLabel: "General anesthesia / perioperative hemodynamic support",
    rangeSourceType: "label",
    rangeSourceNote: "Broad label-oriented continuous infusion range based on product prescribing information; perioperative low-dose inotrope practice may use a narrower lower band depending on context.",
    rangeRationale: "Kept broad so the default does not falsely imply that moderate or higher vasopressor/inotrope doses are out of reference, while lower-dose anesthesia use remains visible through the linked clinical context.",
    notes: "Default preset mirrors the broad DailyMed adult infusion range. In OR practice, some users may center lower when epinephrine is being used mainly for low-dose beta support rather than full vasopressor escalation.",
    dilutionPresets: [
      {
        id: "epi-5mg-50ml",
        label: "5 mg / 50 mL",
        drugAmount: 5,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 100,
        finalConcentrationUnit: "mcg/mL",
        note: "Example infusion syringe"
      }
    ],
    references: ["infusion_epinephrine_dailymed", "infusion_epinephrine_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "phenylephrine",
    name: "Phenylephrine",
    concentration: 100,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.5, 0.75, 1, 1.2, 1.4],
    referenceRange: {
      min: 0.5,
      max: 1.4,
      unit: "mcg/kg/min"
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Anesthesia-associated hypotension support",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based OR hypotension infusion range. A broader vasodilatory-shock label range exists separately, but the default here stays focused on anesthesia-associated hypotension support.",
    rangeRationale: "Kept at the narrower perioperative hypotension band so the default does not automatically imply vasodilatory-shock or ICU-style titration ceilings during routine OR use.",
    notes: "Default preset mirrors the DailyMed anesthesia-associated hypotension infusion range; broader vasodilatory-shock labeling should be interpreted separately if that context is relevant.",
    dilutionPresets: [
      {
        id: "phe-10mg-100ml",
        label: "10 mg / 100 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 100,
        finalVolumeUnit: "mL",
        finalConcentration: 100,
        finalConcentrationUnit: "mcg/mL",
        note: "Common vasopressor dilution example"
      }
    ],
    references: ["infusion_phenylephrine_dailymed", "infusion_phenylephrine_periop_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "vasopressin",
    name: "Vasopressin",
    concentration: 1,
    concentrationUnit: "unit/mL",
    referenceDoses: [0.01, 0.02, 0.03, 0.04],
    referenceRange: {
      min: 0.01,
      max: 0.04,
      unit: "unit/min",
      weightBased: false
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Refractory perioperative hypotension support",
    rangeSourceType: "clinical",
    rangeSourceNote: "Clinical perioperative low-dose vasopressin range from anesthesia references.",
    rangeRationale: "Switched to absolute units/min because perioperative vasopressin is usually prescribed that way; weight-based display was misleading.",
    notes: "Absolute-dose infusion aligned to perioperative low-dose vasopressin use; weight input is not used for this drug.",
    dilutionPresets: [
      {
        id: "vaso-20u-20ml",
        label: "20 units / 20 mL",
        drugAmount: 20,
        drugAmountUnit: "units",
        finalVolume: 20,
        finalVolumeUnit: "mL",
        finalConcentration: 1,
        finalConcentrationUnit: "unit/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_vasopressin_dailymed", "infusion_vasopressin_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "nitroglycerin",
    name: "Nitroglycerin",
    concentration: 200,
    concentrationUnit: "mcg/mL",
    referenceDoses: [5, 10, 20, 40, 80, 160],
    referenceRange: {
      min: 5,
      max: 200,
      unit: "mcg/min",
      weightBased: false
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Perioperative vasodilator titration",
    rangeSourceType: "label",
    rangeSourceNote: "Label-oriented nitroglycerin infusion range using absolute mcg/min titration.",
    rangeRationale: "Changed to absolute mcg/min because both label and anesthesia references describe OR titration that way rather than mcg/kg/min defaults.",
    notes: "Absolute-dose infusion aligned to DailyMed and OpenAnesthesia titration guidance; optional mcg/kg/min view is shown for weight-based clinical convenience.",
    dilutionPresets: [
      {
        id: "ntg-10mg-50ml",
        label: "10 mg / 50 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 200,
        finalConcentrationUnit: "mcg/mL",
        note: "Common NTG syringe example"
      }
    ],
    references: ["infusion_nitroglycerin_dailymed", "infusion_nitroglycerin_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "dopamine",
    name: "Dopamine",
    concentration: 4000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [2, 5, 10, 20, 40, 50],
    referenceRange: {
      min: 2,
      max: 50,
      unit: "mcg/kg/min"
    },
    useCase: "vasopressor-support",
    useCaseLabel: "Hemodynamic support / inopressor use",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based adult dopamine infusion range spanning lower to higher hemodynamic effect bands.",
    rangeRationale: "Expanded to the labeled upper range so the calculator does not falsely imply that doses above 20 mcg/kg/min are automatically out of reference.",
    notes: "Reference range aligned to DailyMed adult infusion labeling; physiologic effects vary by dose band.",
    dilutionPresets: [
      {
        id: "dopamine-200mg-50ml",
        label: "200 mg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4000,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_dopamine_dailymed", "infusion_dopamine_periop_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "dobutamine",
    name: "Dobutamine",
    concentration: 5000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [2.5, 5, 7.5, 10, 15, 20],
    referenceRange: {
      min: 2.5,
      max: 20,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "Perioperative inotrope support",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based adult dobutamine infusion range.",
    rangeRationale: "Extended to 20 mcg/kg/min to match labeling and common inotrope titration practice.",
    notes: "Reference range aligned to common DailyMed adult infusion dosing; rare higher doses should be protocol-specific.",
    dilutionPresets: [
      {
        id: "dobutamine-250mg-50ml",
        label: "250 mg / 50 mL",
        drugAmount: 250,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 5000,
        finalConcentrationUnit: "mcg/mL",
        note: "Common inotrope syringe example"
      }
    ],
    references: ["infusion_dobutamine_dailymed"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "milrinone",
    name: "Milrinone",
    concentration: 200,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.375, 0.5, 0.6, 0.7, 0.75],
    referenceRange: {
      min: 0.375,
      max: 0.75,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "Cardiac anesthesia maintenance support",
    rangeSourceType: "clinical",
    rangeSourceNote: "Clinical cardiac anesthesia maintenance range aligned with OpenAnesthesia and label maintenance dosing.",
    rangeRationale: "The displayed range focuses on maintenance infusion and excludes loading-dose logic so the table stays interpretable during pump setup.",
    notes: "Maintenance infusion range aligned to DailyMed and OpenAnesthesia; loading dose should be considered separately.",
    dilutionPresets: [
      {
        id: "milrinone-10mg-50ml",
        label: "10 mg / 50 mL",
        drugAmount: 10,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 200,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_milrinone_dailymed", "infusion_milrinone_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "isoproterenol",
    name: "Isoproterenol",
    concentration: 4,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.5, 1, 2, 3, 5],
    referenceRange: {
      min: 0.5,
      max: 5,
      unit: "mcg/min",
      weightBased: false
    },
    useCase: "ga-maintenance",
    useCaseLabel: "Electrophysiology / perioperative chronotrope support",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based isoproterenol infusion range using absolute mcg/min dosing.",
    rangeRationale: "Converted to absolute mcg/min because the labeled effective range is commonly expressed that way and better matches electrophysiology practice.",
    notes: "Absolute-dose infusion aligned to DailyMed adult infusion dosing; weight input is not used for this drug.",
    dilutionPresets: [
      {
        id: "isoproterenol-200mcg-50ml",
        label: "200 mcg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mcg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4,
        finalConcentrationUnit: "mcg/mL",
        note: "Example only"
      }
    ],
    references: ["infusion_isoproterenol_dailymed", "infusion_isoproterenol_tiva_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-14"
    }
  },
  {
    id: "remifentanil",
    name: "Remifentanil",
    concentration: 50,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.05, 0.1, 0.2, 0.5, 1, 2],
    referenceRange: {
      min: 0.05,
      max: 2,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "General anesthesia maintenance analgesia",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based remifentanil maintenance infusion range for general anesthesia; lower-centered anesthetic supplementation often sits within the same band rather than needing a separate default.",
    rangeRationale: "Kept broad because remifentanil use in the OR commonly spans lighter supplementation through deeper TIVA-style opioid maintenance, and the label range already maps that reasonably well.",
    notes: "Default preset mirrors remifentanil labeling for general anesthesia. In practice, many cases cluster in the lower-middle part of this band even when the full labeled range remains appropriate.",
    dilutionPresets: [
      {
        id: "remi-2mg-40ml",
        label: "2 mg / 40 mL",
        drugAmount: 2,
        drugAmountUnit: "mg",
        finalVolume: 40,
        finalVolumeUnit: "mL",
        finalConcentration: 50,
        finalConcentrationUnit: "mcg/mL",
        note: "Common remifentanil dilution"
      }
    ],
    references: ["infusion_remifentanil_dailymed", "infusion_remifentanil_periop_study"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "propofol",
    name: "Propofol (TIVA)",
    concentration: 10000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [100, 125, 150, 175, 200],
    referenceRange: {
      min: 100,
      max: 200,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "General anesthesia maintenance (TIVA)",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based maintenance infusion range for general anesthesia in healthier adults; lower maintenance rates may be appropriate in older, frailer, or more hemodynamically limited patients.",
    rangeRationale: "Kept centered on the classic healthy-adult TIVA maintenance band so the default stays simple, while the notes make clear that some common OR populations will run lower.",
    notes: "Default preset mirrors the familiar healthy-adult TIVA maintenance band. Elderly, cardiac, or otherwise vulnerable patients may require lower maintenance rates than this default center.",
    dilutionPresets: [
      {
        id: "propofol-10mg-ml",
        label: "1% (10 mg/mL) neat",
        drugAmount: 500,
        drugAmountUnit: "mg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 10000,
        finalConcentrationUnit: "mcg/mL",
        note: "Neat 1% emulsion"
      }
    ],
    references: ["infusion_propofol_dailymed", "infusion_propofol_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "esmolol",
    name: "Esmolol",
    concentration: 10000,
    concentrationUnit: "mcg/mL",
    referenceDoses: [50, 100, 150, 200, 300],
    referenceRange: {
      min: 50,
      max: 300,
      unit: "mcg/kg/min"
    },
    useCase: "ga-maintenance",
    useCaseLabel: "Perioperative rate / pressure control",
    rangeSourceType: "label",
    rangeSourceNote: "Label-based esmolol infusion range used perioperatively for rate and pressure control.",
    rangeRationale: "Maintains the broad labeled titration band because esmolol response varies widely with indication and bolus use.",
    notes: "Reference range aligned to DailyMed perioperative infusion dosing; most patients respond within 50-200 mcg/kg/min.",
    dilutionPresets: [
      {
        id: "esmolol-2500mg-250ml",
        label: "2500 mg / 250 mL",
        drugAmount: 2500,
        drugAmountUnit: "mg",
        finalVolume: 250,
        finalVolumeUnit: "mL",
        finalConcentration: 10000,
        finalConcentrationUnit: "mcg/mL",
        note: "Pre-mixed bag standard"
      }
    ],
    references: ["infusion_esmolol_dailymed", "infusion_esmolol_meta_analysis"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "dexmedetomidine",
    name: "Dexmedetomidine",
    concentration: 4,
    concentrationUnit: "mcg/mL",
    referenceDoses: [0.2, 0.3, 0.4, 0.5, 0.7, 1.0],
    referenceRange: {
      min: 0.2,
      max: 1,
      unit: "mcg/kg/hr",
      timeUnit: "hr",
      weightBased: true
    },
    useCase: "ga-maintenance",
    useCaseLabel: "General anesthesia adjunct / maintenance sedation",
    rangeSourceType: "label",
    rangeSourceNote: "Label-informed perioperative sedation and anesthesia-adjunct maintenance range, broadened beyond the narrower OpenAnesthesia-only band.",
    rangeRationale: "Expanded to 0.2-1 mcg/kg/hr so the default better reflects official dosing guidance and common perioperative practice, without automatically adopting broader ICU-only ceilings.",
    notes: "Default preset now reflects a label-informed perioperative range. OpenAnesthesia remains linked for the more conservative 0.2-0.7 mcg/kg/hr anesthesia-adjunct context.",
    dilutionPresets: [
      {
        id: "dex-200mcg-50ml",
        label: "200 mcg / 50 mL",
        drugAmount: 200,
        drugAmountUnit: "mcg",
        finalVolume: 50,
        finalVolumeUnit: "mL",
        finalConcentration: 4,
        finalConcentrationUnit: "mcg/mL",
        note: "Standard 4 mcg/mL infusion"
      }
    ],
    references: ["infusion_dexmedetomidine_dailymed", "infusion_dexmedetomidine_openanesthesia"],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "remimazolam-induction",
    name: "Remimazolam (GA induction)",
    concentration: 2500,
    concentrationUnit: "mcg/mL",
    referenceDoses: [6000, 9000, 12000],
    referenceRange: {
      min: 6000,
      max: 12000,
      unit: "mcg/kg/hr",
      timeUnit: "hr",
      weightBased: true
    },
    useCase: "ga-induction",
    useCaseLabel: "General anesthesia induction infusion",
    rangeSourceType: "clinical",
    rangeSourceNote: "Clinical induction range based on general-anesthesia trial and OpenAnesthesia summary.",
    rangeRationale: "Converted to hourly units because the attached anesthesia references describe induction infusion as 6-12 mg/kg/hr rather than a default minute-based pump expression.",
    alternateUseCase: "Procedural sedation label uses bolus/top-up dosing: initial 5 mg IV over 1 minute, then 2.5 mg supplements over 15 seconds no sooner than 2 minutes apart.",
    notes: "Use as an induction infusion reference only. Displayed as 6000-12000 mcg/kg/hr to mirror the commonly cited 6-12 mg/kg/hr anesthesia references.",
    dilutionPresets: [
      {
        id: "remimazolam-20mg-8ml",
        label: "20 mg / 8 mL",
        drugAmount: 20,
        drugAmountUnit: "mg",
        finalVolume: 8,
        finalVolumeUnit: "mL",
        finalConcentration: 2500,
        finalConcentrationUnit: "mcg/mL",
        note: "Reconstituted BYFAVO vial concentration"
      }
    ],
    references: [
      "infusion_remimazolam_dailymed",
      "infusion_remimazolam_openanesthesia",
      "infusion_remimazolam_study"
    ],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  },
  {
    id: "remimazolam-maintenance",
    name: "Remimazolam (GA maintenance)",
    concentration: 2500,
    concentrationUnit: "mcg/mL",
    referenceDoses: [1000, 1200, 1500, 1800, 2000],
    referenceRange: {
      min: 1000,
      max: 2000,
      unit: "mcg/kg/hr",
      timeUnit: "hr",
      weightBased: true
    },
    useCase: "ga-maintenance",
    useCaseLabel: "General anesthesia maintenance infusion",
    rangeSourceType: "clinical",
    rangeSourceNote: "Clinical maintenance range based on OpenAnesthesia and general-anesthesia study dosing.",
    rangeRationale: "Converted to hourly units because the attached anesthesia references describe maintenance infusion around 1-2 mg/kg/hr rather than a label-style minute-based default.",
    alternateUseCase: "Procedural sedation label is separate and bolus-based rather than infusion-based: initial 5 mg IV over 1 minute, then 2.5 mg top-up doses as needed.",
    notes: "Maintenance infusion use for general anesthesia is practice-based and should be checked against institutional protocol. Displayed as 1000-2000 mcg/kg/hr to mirror the commonly cited 1-2 mg/kg/hr anesthesia references.",
    dilutionPresets: [
      {
        id: "remimazolam-20mg-8ml",
        label: "20 mg / 8 mL",
        drugAmount: 20,
        drugAmountUnit: "mg",
        finalVolume: 8,
        finalVolumeUnit: "mL",
        finalConcentration: 2500,
        finalConcentrationUnit: "mcg/mL",
        note: "Reconstituted BYFAVO vial concentration"
      }
    ],
    references: [
      "infusion_remimazolam_dailymed",
      "infusion_remimazolam_openanesthesia",
      "infusion_remimazolam_study"
    ],
    metadata: {
      source: "Editable local preset",
      lastReviewed: "2026-03-15"
    }
  }
];

const PEDIATRIC_DRUG_PRESETS = [
  {
    id: "fentanyl",
    name: "Fentanyl",
    category: "opioid",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mcg/kg",
        doseAmountUnit: "mcg",
        recommendedRange: {
          min: 1,
          max: 2
        },
        concentration: {
          value: 50,
          unit: "mcg/mL"
        },
        notes: "Example bolus preset for procedural or intraoperative use. Titrate to context.",
        ageGuidance: {
          default: {
            note: "Weight-based bolus estimate for general pediatric use.",
            warning: "Opioids may require additional caution in younger patients."
          },
          neonate: {
            note: "Neonates may have greater sensitivity and slower clearance.",
            warning: "Use age-specific adjustment and close monitoring."
          },
          infant: {
            note: "Infants may require cautious titration based on response.",
            warning: "Verify local pediatric opioid protocol."
          }
        },
        references: ["pediatric_fentanyl_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "glycopyrrolate-preanesthetic",
    name: "Glycopyrrolate (Preanesthetic)",
    category: "anticholinergic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.004,
          max: 0.004
        },
        concentration: {
          value: 0.2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.1,
          note: "Example IV/IM single-dose cap from labeling context."
        },
        notes: "Preanesthetic pediatric reference preset only. Reversal pairing with neostigmine/pyridostigmine follows a different use-case and should not be inferred from this weight-based preset.",
        ageGuidance: {
          default: {
            note: "Labeling includes 0.004 mg/kg IM preanesthetic dosing and 0.004 mg/kg IV intraoperative dosing in pediatric patients.",
            warning: "Use-case matters. Preanesthetic, intraoperative bradycardia, and reversal workflows are not interchangeable."
          },
          infant: {
            note: "Labeling notes that infants 1 month to 2 years may require up to 0.009 mg/kg in selected preanesthetic contexts.",
            warning: "If using an infant-specific dose outside 0.004 mg/kg, verify the exact labeled context and institutional protocol."
          },
          neonate: {
            note: "Neonatal handling may differ from older infants and children.",
            warning: "Use neonatal-specific judgment and institutional guidance."
          }
        },
        references: ["pediatric_glycopyrrolate_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-15"
        }
      }
    }
  },
  {
    id: "glycopyrrolate-reversal",
    name: "Glycopyrrolate (Reversal pairing)",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.005,
          max: 0.01
        },
        concentration: {
          value: 0.2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.2,
          note: "Quick-reference cap only; reversal pairing should be checked directly."
        },
        notes: "Reference-only placeholder for reversal workflows. Glycopyrrolate reversal dosing should be paired directly with neostigmine or pyridostigmine rather than inferred from a standalone weight-based estimate.",
        ageGuidance: {
          default: {
            note: "Typical pairing references are ratio-based, such as glycopyrrolate 0.2 mg per 1 mg neostigmine or per 5 mg pyridostigmine.",
            warning: "Do not rely on this preset alone for reversal. Verify the actual paired reversal agent dose and local protocol."
          },
          infant: {
            note: "Infants may require extra caution with reversal timing and monitoring.",
            warning: "Verify reversal pairing and pediatric monitoring guidance before use."
          },
          neonate: {
            note: "Routine neonatal reversal workflows may differ from older pediatric practice.",
            warning: "Use neonatal-specific judgment and monitoring."
          }
        },
        references: ["pediatric_glycopyrrolate_dailymed", "pediatric_neostigmine_dailymed"],
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-15"
        }
      }
    }
  },
  {
    id: "rocuronium",
    name: "Rocuronium",
    category: "neuromuscular-blocker",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.6,
          max: 1.2
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example intubating dose range. Verify indication and protocol.",
        ageGuidance: {
          default: {
            note: "Weight-based bolus estimate for pediatric neuromuscular blockade.",
            warning: ""
          },
          neonate: {
            note: "Neonatal pharmacodynamics may differ from older children.",
            warning: "Use age-specific clinical judgment and neuromuscular monitoring."
          }
        },
        references: ["pediatric_rocuronium_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "sugammadex",
    name: "Sugammadex",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 2,
          max: 4
        },
        concentration: {
          value: 100,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Actual dose depends on depth of block and monitoring.",
        ageGuidance: {
          default: {
            note: "Interpret dose in the context of neuromuscular monitoring and reversal goal.",
            warning: "Depth-of-block specific dosing may differ from this quick estimate."
          },
          infant: {
            note: "Infants may require extra caution with monitoring and confirmation of recovery.",
            warning: "Verify institutional pediatric reversal protocol."
          },
          neonate: {
            note: "Routine neonatal use may not follow the same assumptions as older children.",
            warning: "Use neonatal-specific guidance and monitoring."
          }
        },
        references: ["pediatric_sugammadex_fda"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "neostigmine",
    name: "Neostigmine",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.04,
          max: 0.07
        },
        concentration: {
          value: 1,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Pairing with an anticholinergic and monitoring remain essential.",
        ageGuidance: {
          default: {
            note: "Use as a reference estimate alongside neuromuscular monitoring.",
            warning: "Verify pairing agent, timing, and institutional practice."
          },
          neonate: {
            note: "Neonates may not follow routine pediatric reversal assumptions.",
            warning: "Use neonatal-specific judgment and monitoring."
          }
        },
        references: ["pediatric_neostigmine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "pyridostigmine",
    name: "Pyridostigmine",
    category: "reversal-agent",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.25
        },
        concentration: {
          value: 5,
          unit: "mg/mL"
        },
        notes: "Example reversal range only. Confirm local practice and monitoring before use.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate for pediatric reversal workflows.",
            warning: "Verify timing, anticholinergic pairing, and recovery monitoring."
          },
          infant: {
            note: "Infants may require more cautious interpretation of reversal timing.",
            warning: "Check institutional pediatric reversal guidance."
          }
        },
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "atropine",
    name: "Atropine",
    category: "anticholinergic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.01,
          max: 0.02
        },
        concentration: {
          value: 0.1,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 0.5,
          note: "Example maximum single dose cap."
        },
        notes: "Use current institutional standards, including any minimum dose rules if applicable.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate only; minimum dose policies may exist locally.",
            warning: "Check institutional guidance for minimum dose handling."
          },
          neonate: {
            note: "Neonates may require extra attention to dilution and minimum dose handling.",
            warning: "Verify neonatal protocol before administration."
          },
          infant: {
            note: "Infants may still be affected by local minimum dose conventions.",
            warning: "Check institutional reference before use."
          }
        },
        references: ["pediatric_atropine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "propofol",
    name: "Propofol",
    category: "hypnotic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 1,
          max: 3
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example bolus range only. Sedation and induction workflows may use different targets.",
        ageGuidance: {
          default: {
            note: "Use clinical context to distinguish sedation from induction dosing.",
            warning: "Hemodynamic response and airway risk should be considered."
          },
          infant: {
            note: "Infants may have different sensitivity and airway considerations.",
            warning: "Use cautious titration and verify local protocol."
          },
          neonate: {
            note: "Neonatal practice may differ substantially from older children.",
            warning: "Use neonatal-specific guidance."
          }
        },
        references: ["pediatric_propofol_dailymed"],
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-15"
        }
      }
    }
  },
  {
    id: "ketamine",
    name: "Ketamine",
    category: "dissociative",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 1,
          max: 2
        },
        concentration: {
          value: 10,
          unit: "mg/mL"
        },
        notes: "Example IV bolus range only. Sedation, analgesia, and induction goals may differ.",
        ageGuidance: {
          default: {
            note: "Interpret in the context of intended depth and adjunct medications.",
            warning: "Verify sedation pathway and local pediatric guidance."
          },
          infant: {
            note: "Younger infants may require more cautious airway and recovery planning.",
            warning: "Use age-specific clinical judgment."
          }
        },
        references: ["pediatric_ketamine_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "thiopental",
    name: "Thiopental",
    category: "hypnotic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 3,
          max: 5
        },
        concentration: {
          value: 25,
          unit: "mg/mL"
        },
        notes: "Example induction range only. Availability and local workflow may vary.",
        ageGuidance: {
          default: {
            note: "Use as a quick reference only and confirm institutional familiarity.",
            warning: "Check formulation strength and local protocol."
          },
          neonate: {
            note: "Neonatal handling may differ from standard pediatric assumptions.",
            warning: "Use neonatal-specific guidance."
          }
        },
        verificationStatus: "unverified",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    category: "antiemetic",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.15
        },
        concentration: {
          value: 2,
          unit: "mg/mL"
        },
        doseLimits: {
          maxTotalDose: 4,
          note: "Example maximum single dose cap."
        },
        notes: "Example antiemetic dose range only. Verify age- and indication-specific guidance.",
        ageGuidance: {
          default: {
            note: "Weight-based estimate for common pediatric antiemetic use.",
            warning: ""
          },
          neonate: {
            note: "Neonatal use may not follow the same routine assumptions as older children.",
            warning: "Verify neonatal appropriateness and protocol."
          }
        },
        references: ["pediatric_ondansetron_dailymed"],
        verificationStatus: "supported",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  },
  {
    id: "dexamethasone",
    name: "Dexamethasone",
    category: "steroid",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: "mg/kg",
        doseAmountUnit: "mg",
        recommendedRange: {
          min: 0.1,
          max: 0.15
        },
        concentration: {
          value: 4,
          unit: "mg/mL"
        },
        notes: "Example perioperative antiemetic or airway edema reference range only.",
        ageGuidance: {
          default: {
            note: "Indication-specific practice may differ between antiemetic and airway use.",
            warning: "Verify indication-specific institutional guidance."
          },
          infant: {
            note: "Infants may require more careful indication-based interpretation.",
            warning: "Check local pediatric anesthesia protocol."
          },
          neonate: {
            note: "Routine neonatal use may not follow standard pediatric assumptions.",
            warning: "Verify neonatal appropriateness before use."
          }
        },
        verificationStatus: "off-label",
        metadata: {
          source: "Editable local preset",
          lastReviewed: "2026-03-14"
        }
      }
    }
  }
];

function getDefaultDrugPreset() {
  return DRUG_PRESETS[0];
}

function getDrugPresetById(drugId) {
  return DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || getDefaultDrugPreset();
}

function buildCustomDrugFromInputs() {
  const referenceDoses = parseDoseList(inputs.referenceDoseList.value) || DEFAULT_CUSTOM_DRUG.referenceDoses;

  return {
    id: "custom",
    name: inputs.customDrugName.value.trim() || "Custom drug",
    concentration: Number(inputs.concentration.value) || DEFAULT_CUSTOM_DRUG.concentration,
    concentrationUnit: DEFAULT_CUSTOM_DRUG.concentrationUnit,
    referenceDoses: referenceDoses,
    referenceRange: {
      min: 0,
      max: 0,
      unit: DEFAULT_CUSTOM_DRUG.referenceRange.unit
    },
    notes: inputs.customDrugNotes.value.trim() || "User-defined custom drug.",
    metadata: {
      source: "User defined",
      lastReviewed: "Current session"
    }
  };
}

function getSelectedDrugDefinition() {
  if (drugSelect.value === "custom") {
    return buildCustomDrugFromInputs();
  }

  return getDrugPresetById(drugSelect.value);
}

function formatDilutionPreset(dilutionPreset) {
  if (!dilutionPreset) {
    return "Custom / not set";
  }

  return `${dilutionPreset.label} (${formatNumber(dilutionPreset.finalConcentration, 0)} ${dilutionPreset.finalConcentrationUnit})`;
}

function isWithinReferenceRange(value, referenceRange) {
  if (!referenceRange) {
    return true;
  }

  if (!isPositiveNumber(referenceRange.min) || !isPositiveNumber(referenceRange.max)) {
    return true;
  }

  return value >= referenceRange.min && value <= referenceRange.max;
}

function createDefaultDrugSettings() {
  const settings = {};

  DRUG_PRESETS.forEach(function (preset) {
    settings[preset.id] = {
      concentration: String(preset.concentration),
      referenceDoseList: formatList(preset.referenceDoses),
      customDrugName: "",
      customDrugNotes: ""
    };
  });

  settings.custom = {
    concentration: String(DEFAULT_CUSTOM_DRUG.concentration),
    referenceDoseList: formatList(DEFAULT_CUSTOM_DRUG.referenceDoses),
    customDrugName: "",
    customDrugNotes: ""
  };

  return settings;
}

function getDefaultPediatricDrugPreset() {
  return PEDIATRIC_DRUG_PRESETS[0];
}

function getPediatricDrugPresetById(drugId) {
  if (drugId === "custom") {
    return DEFAULT_CUSTOM_PEDIATRIC_DRUG;
  }

  return PEDIATRIC_DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || getDefaultPediatricDrugPreset();
}

function createDefaultPediatricDrugSettings() {
  const settings = {};

  PEDIATRIC_DRUG_PRESETS.forEach(function (preset) {
    settings[preset.id] = {
      concentration: String(preset.profiles.pediatricBolus.concentration.value),
      customDrugName: "",
      customDrugNotes: "",
      minDosePerKg: "",
      maxDosePerKg: "",
      doseUnit: "mg/kg",
      concentrationUnit: preset.profiles.pediatricBolus.concentration.unit,
      maxTotalDose: ""
    };
  });

  settings.custom = {
    concentration: String(DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.concentration.value),
    customDrugName: "",
    customDrugNotes: "",
    minDosePerKg: String(DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.recommendedRange.min),
    maxDosePerKg: String(DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.recommendedRange.max),
    doseUnit: DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.dosePerKgUnit,
    concentrationUnit: DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.concentration.unit,
    maxTotalDose: ""
  };

  return settings;
}

// -----------------------------
// Persistence layer
// -----------------------------

const STORAGE_KEY = "anestha.infusionPump.v1";

function createDefaultSingleDrugState() {
  return {
    selectedDrugId: getDefaultDrugPreset().id,
    activeMode: "dose-to-rate",
    nitroglycerinDoseUnitView: "mcg/min",
    favoriteDrugIds: [],
    recentDrugIds: [],
    inputs: {
      weight: "",
      targetDose: "",
      pumpRate: ""
    },
    drugSettings: createDefaultDrugSettings()
  };
}

function createDefaultInfusionCardState() {
  return {
    cardId: "single-drug-card",
    calculatorType: "infusion-pump",
    patientScope: "independent",
    singleDrug: createDefaultSingleDrugState()
  };
}

function normalizeInfusionCardState(rawState) {
  const source = rawState && typeof rawState === "object" ? rawState : {};

  return {
    cardId: sanitizeString(source.cardId, "single-drug-card"),
    calculatorType: "infusion-pump",
    patientScope: "independent",
    singleDrug: normalizeSingleDrugState(source.singleDrug)
  };
}

function sanitizeString(value, fallback) {
  return typeof value === "string" ? value : fallback;
}

function sanitizeSelectedDrugId(value) {
  if (value === "custom") {
    return "custom";
  }

  return DRUG_PRESETS.some(function (preset) {
    return preset.id === value;
  }) ? value : getDefaultDrugPreset().id;
}

function sanitizeActiveMode(value) {
  const allowedModes = ["dose-to-rate", "rate-to-dose", "reference-table"];
  return allowedModes.includes(value) ? value : "dose-to-rate";
}

function sanitizeNitroglycerinDoseUnitView(value) {
  return ["mcg/min", "mcg/kg/min"].includes(value) ? value : "mcg/min";
}

function normalizeDrugSetting(rawSetting, defaultSetting) {
  const source = rawSetting && typeof rawSetting === "object" ? rawSetting : {};

  return {
    concentration: sanitizeString(source.concentration, defaultSetting.concentration),
    referenceDoseList: sanitizeString(source.referenceDoseList, defaultSetting.referenceDoseList),
    customDrugName: sanitizeString(source.customDrugName, defaultSetting.customDrugName),
    customDrugNotes: sanitizeString(source.customDrugNotes, defaultSetting.customDrugNotes)
  };
}

function shouldMigrateLegacyRemimazolamValues(drugId) {
  return drugId === "remimazolam-induction" || drugId === "remimazolam-maintenance";
}

function getCanonicalDrugPreset(drugId) {
  return DRUG_PRESETS.find(function (preset) {
    return preset.id === drugId;
  }) || null;
}

function isCloseToCanonicalDoseList(parsedList, canonicalDoseList) {
  if (!Array.isArray(parsedList) || !Array.isArray(canonicalDoseList) || parsedList.length !== canonicalDoseList.length) {
    return false;
  }

  return parsedList.every(function (dose, index) {
    return Math.abs(dose - canonicalDoseList[index]) <= 5;
  });
}

function migrateLegacyRemimazolamReferenceDoseList(drugId, referenceDoseList, fallbackList) {
  if (!shouldMigrateLegacyRemimazolamValues(drugId)) {
    return referenceDoseList;
  }

  const parsedList = parseDoseList(referenceDoseList);
  const preset = getCanonicalDrugPreset(drugId);
  const canonicalDoseList = preset ? preset.referenceDoses : [];

  if (!parsedList || !parsedList.length) {
    return fallbackList;
  }

  if (isCloseToCanonicalDoseList(parsedList, canonicalDoseList)) {
    return fallbackList;
  }

  const maxDose = Math.max.apply(null, parsedList);

  if (maxDose >= 500) {
    return referenceDoseList;
  }

  return fallbackList;
}

function migrateLegacyRemimazolamTargetDose(drugId, targetDose) {
  if (!shouldMigrateLegacyRemimazolamValues(drugId)) {
    return targetDose;
  }

  const numericDose = Number(targetDose);
  const preset = getCanonicalDrugPreset(drugId);
  const canonicalDoseList = preset ? preset.referenceDoses : [];

  if (!isPositiveNumber(numericDose)) {
    return targetDose;
  }

  if (!canonicalDoseList.length) {
    return targetDose;
  }

  if (canonicalDoseList.some(function (dose) {
    return Math.abs(dose - numericDose) <= 5;
  })) {
    const nearestCanonicalExistingDose = canonicalDoseList.reduce(function (closest, currentDose) {
      if (Math.abs(currentDose - numericDose) < Math.abs(closest - numericDose)) {
        return currentDose;
      }

      return closest;
    }, canonicalDoseList[0]);

    return String(nearestCanonicalExistingDose);
  }

  if (numericDose >= 500) {
    return targetDose;
  }

  const migratedDose = numericDose * 60;
  const nearestCanonicalDose = canonicalDoseList.reduce(function (closest, currentDose) {
    if (Math.abs(currentDose - migratedDose) < Math.abs(closest - migratedDose)) {
      return currentDose;
    }

    return closest;
  }, canonicalDoseList[0]);

  return String(nearestCanonicalDose);
}

function normalizeSingleDrugState(rawState) {
  const fallback = createDefaultSingleDrugState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawInputs = source.inputs && typeof source.inputs === "object" ? source.inputs : {};
  const rawDrugSettings = source.drugSettings && typeof source.drugSettings === "object" ? source.drugSettings : {};
  const selectedDrugId = sanitizeSelectedDrugId(source.selectedDrugId);

  const normalizedDrugSettings = {};

  Object.keys(fallback.drugSettings).forEach(function (drugId) {
    const normalizedSetting = normalizeDrugSetting(rawDrugSettings[drugId], fallback.drugSettings[drugId]);

    normalizedDrugSettings[drugId] = {
      ...normalizedSetting,
      referenceDoseList: migrateLegacyRemimazolamReferenceDoseList(
        drugId,
        normalizedSetting.referenceDoseList,
        fallback.drugSettings[drugId].referenceDoseList
      )
    };
  });

  return {
    selectedDrugId: selectedDrugId,
    activeMode: sanitizeActiveMode(source.activeMode),
    nitroglycerinDoseUnitView: sanitizeNitroglycerinDoseUnitView(source.nitroglycerinDoseUnitView),
    favoriteDrugIds: normalizeQuickDrugIds(source.favoriteDrugIds),
    recentDrugIds: normalizeQuickDrugIds(source.recentDrugIds),
    inputs: {
      weight: sanitizeString(rawInputs.weight, fallback.inputs.weight),
      targetDose: migrateLegacyRemimazolamTargetDose(
        selectedDrugId,
        sanitizeString(rawInputs.targetDose, fallback.inputs.targetDose)
      ),
      pumpRate: sanitizeString(rawInputs.pumpRate, fallback.inputs.pumpRate)
    },
    drugSettings: normalizedDrugSettings
  };
}

function normalizeQuickDrugIds(rawIds) {
  if (!Array.isArray(rawIds)) {
    return [];
  }

  return rawIds.filter(function (drugId, index) {
    return drugId !== "custom"
      && DRUG_PRESETS.some(function (preset) {
        return preset.id === drugId;
      })
      && rawIds.indexOf(drugId) === index;
  }).slice(0, 5);
}

function createDefaultPersistedState() {
  return {
    singleDrug: createDefaultSingleDrugState(),
    pediatricDose: createDefaultPediatricDoseState(),
    dantroleneQuick: createDefaultDantroleneQuickState(),
    infusionWorkspace: createDefaultInfusionWorkspaceState(),
    infusionTemplates: []
  };
}

function createDefaultPediatricDoseState() {
  return {
    selectedDrugId: getDefaultPediatricDrugPreset().id,
    activeSavedCustomDrugId: "",
    activeMode: "dosing",
    showUnverifiedPresets: false,
    inputs: {
      weight: "",
      ageGroup: "child",
      airwayAgeYears: "",
      airwayWeight: "",
      airwayDeviceCategory: "ett",
      airwayDeviceModel: "i-gel"
    },
    drugSettings: createDefaultPediatricDrugSettings(),
    savedCustomDrugs: []
  };
}

function createDefaultDantroleneQuickState() {
  return {
    inputs: {
      weight: "",
      formulationId: DANTROLENE_FORMULATIONS[0].id,
      initialDoseMgKg: String(DANTROLENE_FORMULATIONS[0].defaultInitialDoseMgKg)
    }
  };
}

function createDefaultInfusionWorkspaceCardState(drugId) {
  const preset = getDrugPresetById(drugId || getDefaultDrugPreset().id);
  const defaultTargetDose = preset.referenceDoses[2] || preset.referenceDoses[0] || 0.1;

  return {
    cardId: createClientId("workspace-card"),
    selectedDrugId: preset.id,
    concentration: String(preset.concentration),
    targetDose: String(defaultTargetDose),
    nitroglycerinDoseUnitView: "mcg/min"
  };
}

function createDefaultInfusionWorkspaceState() {
  return {
    activeView: "single-drug",
    sharedWeight: "",
    selectedTemplateId: "",
    cards: [createDefaultInfusionWorkspaceCardState()]
  };
}

function createInfusionTemplateState(name, note, cards, existingTemplateId) {
  const timestamp = new Date().toISOString();

  return {
    id: existingTemplateId || createClientId("template"),
    name: name.trim(),
    note: (note || "").trim(),
    createdAt: timestamp,
    updatedAt: timestamp,
    cards: cards.map(function (card) {
      return normalizeInfusionWorkspaceCardState(card);
    })
  };
}

function normalizePersistedState(rawState) {
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const legacySingleDrugState = source.singleDrug && typeof source.singleDrug === "object"
    ? source.singleDrug
    : source;

  return {
    singleDrug: normalizeSingleDrugState(legacySingleDrugState),
    pediatricDose: normalizePediatricDoseState(source.pediatricDose),
    dantroleneQuick: normalizeDantroleneQuickState(source.dantroleneQuick),
    infusionWorkspace: normalizeInfusionWorkspaceState(source.infusionWorkspace),
    infusionTemplates: normalizeInfusionTemplates(source.infusionTemplates)
  };
}

function normalizeInfusionWorkspaceCardState(rawCard) {
  const fallback = createDefaultInfusionWorkspaceCardState();
  const source = rawCard && typeof rawCard === "object" ? rawCard : {};
  const selectedDrugId = sanitizeSelectedDrugId(source.selectedDrugId);

  return {
    cardId: sanitizeString(source.cardId, fallback.cardId),
    selectedDrugId: selectedDrugId,
    concentration: sanitizeString(source.concentration, fallback.concentration),
    targetDose: migrateLegacyRemimazolamTargetDose(
      selectedDrugId,
      sanitizeString(source.targetDose, fallback.targetDose)
    ),
    nitroglycerinDoseUnitView: sanitizeNitroglycerinDoseUnitView(source.nitroglycerinDoseUnitView)
  };
}

function normalizeInfusionWorkspaceState(rawState) {
  const fallback = createDefaultInfusionWorkspaceState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawCards = Array.isArray(source.cards) ? source.cards : fallback.cards;
  const normalizedCards = rawCards
    .map(normalizeInfusionWorkspaceCardState)
    .slice(0, 6);

  return {
    activeView: ["single-drug", "workspace"].includes(source.activeView)
      ? source.activeView
      : fallback.activeView,
    sharedWeight: sanitizeString(source.sharedWeight, fallback.sharedWeight),
    selectedTemplateId: sanitizeString(source.selectedTemplateId, fallback.selectedTemplateId),
    cards: normalizedCards.length ? normalizedCards : fallback.cards
  };
}

function normalizeInfusionTemplate(rawTemplate) {
  const source = rawTemplate && typeof rawTemplate === "object" ? rawTemplate : {};
  const rawCards = Array.isArray(source.cards) ? source.cards : [];
  const normalizedCards = rawCards
    .map(normalizeInfusionWorkspaceCardState)
    .slice(0, 6);

  return {
    id: sanitizeString(source.id, createClientId("template")),
    name: sanitizeString(source.name, "Untitled template").trim() || "Untitled template",
    note: sanitizeString(source.note, "").trim(),
    createdAt: sanitizeString(source.createdAt, ""),
    updatedAt: sanitizeString(source.updatedAt, ""),
    cards: normalizedCards.length ? normalizedCards : [createDefaultInfusionWorkspaceCardState()]
  };
}

function normalizeInfusionTemplates(rawTemplates) {
  if (!Array.isArray(rawTemplates)) {
    return [];
  }

  return rawTemplates
    .map(normalizeInfusionTemplate)
    .filter(function (template, index, array) {
      return array.findIndex(function (item) {
        return item.id === template.id;
      }) === index;
    })
    .slice(-10);
}

function normalizeDantroleneQuickState(rawState) {
  const fallback = createDefaultDantroleneQuickState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawInputs = source.inputs && typeof source.inputs === "object" ? source.inputs : {};

  return {
    inputs: {
      weight: sanitizeString(rawInputs.weight, fallback.inputs.weight),
      formulationId: DANTROLENE_FORMULATIONS.some(function (item) {
        return item.id === rawInputs.formulationId;
      }) ? rawInputs.formulationId : fallback.inputs.formulationId,
      initialDoseMgKg: sanitizeString(rawInputs.initialDoseMgKg, fallback.inputs.initialDoseMgKg)
    }
  };
}

function sanitizePediatricSelectedDrugId(value) {
  if (value === "custom") {
    return "custom";
  }

  return PEDIATRIC_DRUG_PRESETS.some(function (preset) {
    return preset.id === value;
  }) ? value : getDefaultPediatricDrugPreset().id;
}

function sanitizePediatricActiveMode(value) {
  return ["dosing", "airway"].includes(value) ? value : "dosing";
}

function normalizePediatricDrugSetting(rawSetting, defaultSetting) {
  const source = rawSetting && typeof rawSetting === "object" ? rawSetting : {};

  return {
    concentration: sanitizeString(source.concentration, defaultSetting.concentration),
    customDrugName: sanitizeString(source.customDrugName, defaultSetting.customDrugName),
    customDrugNotes: sanitizeString(source.customDrugNotes, defaultSetting.customDrugNotes),
    minDosePerKg: sanitizeString(source.minDosePerKg, defaultSetting.minDosePerKg),
    maxDosePerKg: sanitizeString(source.maxDosePerKg, defaultSetting.maxDosePerKg),
    doseUnit: sanitizeString(source.doseUnit, defaultSetting.doseUnit),
    concentrationUnit: sanitizeString(source.concentrationUnit, defaultSetting.concentrationUnit),
    maxTotalDose: sanitizeString(source.maxTotalDose, defaultSetting.maxTotalDose)
  };
}

function normalizePediatricDoseState(rawState) {
  const fallback = createDefaultPediatricDoseState();
  const source = rawState && typeof rawState === "object" ? rawState : {};
  const rawInputs = source.inputs && typeof source.inputs === "object" ? source.inputs : {};
  const rawDrugSettings = source.drugSettings && typeof source.drugSettings === "object" ? source.drugSettings : {};
  const normalizedDrugSettings = {};

  Object.keys(fallback.drugSettings).forEach(function (drugId) {
    normalizedDrugSettings[drugId] = normalizePediatricDrugSetting(rawDrugSettings[drugId], fallback.drugSettings[drugId]);
  });

  return {
    selectedDrugId: sanitizePediatricSelectedDrugId(source.selectedDrugId),
    activeSavedCustomDrugId: sanitizeString(source.activeSavedCustomDrugId, fallback.activeSavedCustomDrugId),
    activeMode: sanitizePediatricActiveMode(source.activeMode),
    showUnverifiedPresets: Boolean(source.showUnverifiedPresets),
    inputs: {
      weight: sanitizeString(rawInputs.weight, fallback.inputs.weight),
      airwayAgeYears: sanitizeString(rawInputs.airwayAgeYears, fallback.inputs.airwayAgeYears),
      airwayWeight: sanitizeString(rawInputs.airwayWeight, fallback.inputs.airwayWeight),
      airwayDeviceCategory: ["ett", "supraglottic", "oral-airway", "nasal-airway", "laryngoscope", "face-mask"].includes(rawInputs.airwayDeviceCategory)
        ? rawInputs.airwayDeviceCategory
        : fallback.inputs.airwayDeviceCategory,
      airwayDeviceModel: ["i-gel", "lma-supreme"].includes(rawInputs.airwayDeviceModel)
        ? rawInputs.airwayDeviceModel
        : fallback.inputs.airwayDeviceModel,
      ageGroup: ["neonate", "infant", "child", "adolescent"].includes(rawInputs.ageGroup)
        ? rawInputs.ageGroup
        : fallback.inputs.ageGroup
    },
    drugSettings: normalizedDrugSettings,
    savedCustomDrugs: normalizeSavedCustomPediatricDrugs(source.savedCustomDrugs)
  };
}

function normalizeSavedCustomPediatricDrug(rawDrug) {
  const source = rawDrug && typeof rawDrug === "object" ? rawDrug : {};
  const fallback = createDefaultPediatricDrugSettings().custom;

  return {
    id: sanitizeString(source.id, `custom-${Date.now()}`),
    customDrugName: sanitizeString(source.customDrugName, fallback.customDrugName),
    customDrugNotes: sanitizeString(source.customDrugNotes, fallback.customDrugNotes),
    minDosePerKg: sanitizeString(source.minDosePerKg, fallback.minDosePerKg),
    maxDosePerKg: sanitizeString(source.maxDosePerKg, fallback.maxDosePerKg),
    doseUnit: sanitizeString(source.doseUnit, fallback.doseUnit),
    concentration: sanitizeString(source.concentration, fallback.concentration),
    concentrationUnit: sanitizeString(source.concentrationUnit, fallback.concentrationUnit),
    maxTotalDose: sanitizeString(source.maxTotalDose, fallback.maxTotalDose)
  };
}

function normalizeSavedCustomPediatricDrugs(rawDrugs) {
  if (!Array.isArray(rawDrugs)) {
    return [];
  }

  return rawDrugs
    .map(normalizeSavedCustomPediatricDrug)
    .filter(function (drug, index, array) {
      return drug.customDrugName.trim() !== ""
        && array.findIndex(function (item) {
          return item.id === drug.id;
        }) === index;
    })
    .slice(0, 12);
}

function loadPersistedState() {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);

    if (!rawValue) {
      return createDefaultPersistedState();
    }

    return normalizePersistedState(JSON.parse(rawValue));
  } catch (error) {
    return createDefaultPersistedState();
  }
}

function savePersistedState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizePersistedState(state)));
  } catch (error) {
    // Keep the app usable if storage is unavailable.
  }
}

// -----------------------------
// View state layer
// -----------------------------

let persistedState = loadPersistedState();

function getSingleDrugState() {
  return persistedState.singleDrug;
}

function getPediatricDoseState() {
  return persistedState.pediatricDose;
}

function getDantroleneQuickState() {
  return persistedState.dantroleneQuick;
}

function getInfusionWorkspaceState() {
  return persistedState.infusionWorkspace;
}

function getInfusionTemplates() {
  return persistedState.infusionTemplates || [];
}

function getSavedCustomPediatricDrugs() {
  return getPediatricDoseState().savedCustomDrugs || [];
}

function getActiveSavedCustomPediatricDrugId() {
  return getPediatricDoseState().activeSavedCustomDrugId || "";
}

function getSavedCustomOptionValue(savedDrugId) {
  return `saved:${savedDrugId}`;
}

function getSavedCustomDrugIdFromOptionValue(optionValue) {
  return typeof optionValue === "string" && optionValue.startsWith("saved:")
    ? optionValue.slice(6)
    : "";
}

function isCustomPediatricSelection(optionValue) {
  return optionValue === "custom" || getSavedCustomDrugIdFromOptionValue(optionValue) !== "";
}

function renderPediatricDrugSelectOptions() {
  const savedCustomDrugs = getSavedCustomPediatricDrugs();
  const pediatricDoseState = getPediatricDoseState();
  const showUnverifiedPresets = Boolean(pediatricDoseState.showUnverifiedPresets);
  const selectedDrugId = pediatricDoseState.selectedDrugId;
  const sortedPresets = PEDIATRIC_DRUG_PRESETS.slice().sort(function (leftPreset, rightPreset) {
    const leftRank = getPediatricVerificationRank(leftPreset.profiles.pediatricBolus.verificationStatus);
    const rightRank = getPediatricVerificationRank(rightPreset.profiles.pediatricBolus.verificationStatus);

    if (leftRank !== rightRank) {
      return leftRank - rightRank;
    }

    return leftPreset.name.localeCompare(rightPreset.name);
  });
  const visiblePresets = sortedPresets.filter(function (preset) {
    const isUnverified = preset.profiles.pediatricBolus.verificationStatus === "unverified";
    return !isUnverified || showUnverifiedPresets || preset.id === selectedDrugId;
  });
  const presetOptions = visiblePresets.map(function (preset) {
    return `<option value="${preset.id}">${formatPediatricDrugOptionLabel(preset)}</option>`;
  }).join("");
  const savedCustomOptions = savedCustomDrugs.length
    ? `<optgroup label="Saved Custom Drugs">${savedCustomDrugs.map(function (savedDrug) {
      return `<option value="${getSavedCustomOptionValue(savedDrug.id)}">${savedDrug.customDrugName}</option>`;
    }).join("")}</optgroup>`
    : "";

  pediatricDrugSelect.innerHTML = `${presetOptions}${savedCustomOptions}<option value="custom">Custom drug</option>`;
}

function getPediatricSelectValueFromState(pediatricDoseState) {
  const normalizedState = normalizePediatricDoseState(pediatricDoseState);
  return normalizedState.selectedDrugId === "custom" && normalizedState.activeSavedCustomDrugId
    ? getSavedCustomOptionValue(normalizedState.activeSavedCustomDrugId)
    : normalizedState.selectedDrugId;
}

function getActivePediatricMode() {
  const selectedTab = document.querySelector("[data-pediatric-mode-tab].is-active");
  return selectedTab ? selectedTab.dataset.pediatricModeTab : "dosing";
}

function updateSingleDrugState(patch) {
  persistedState.singleDrug = normalizeSingleDrugState({
    ...getSingleDrugState(),
    ...patch
  });
  savePersistedState(persistedState);
}

function updatePediatricDoseState(patch) {
  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    ...patch
  });
  savePersistedState(persistedState);
}

function updateDantroleneQuickState(patch) {
  persistedState.dantroleneQuick = normalizeDantroleneQuickState({
    ...getDantroleneQuickState(),
    ...patch
  });
  savePersistedState(persistedState);
}

function updateInfusionWorkspaceState(patch) {
  persistedState.infusionWorkspace = normalizeInfusionWorkspaceState({
    ...getInfusionWorkspaceState(),
    ...patch
  });
  savePersistedState(persistedState);
}

function updateInfusionTemplates(templates) {
  persistedState.infusionTemplates = normalizeInfusionTemplates(templates);
  savePersistedState(persistedState);
}

function getActiveInfusionMode() {
  const selectedTab = document.querySelector("[data-infusion-mode-tab].is-active");
  return selectedTab ? selectedTab.dataset.infusionModeTab : "dose-to-rate";
}

function getCurrentDrugSettings() {
  return getSingleDrugState().drugSettings[drugSelect.value] || createDefaultDrugSettings()[drugSelect.value];
}

function getFavoriteDrugIds() {
  return getSingleDrugState().favoriteDrugIds || [];
}

function getRecentDrugIds() {
  return getSingleDrugState().recentDrugIds || [];
}

function getCurrentPediatricDrugSettings() {
  const selectedOptionValue = pediatricDrugSelect.value;
  const drugSettingsKey = isCustomPediatricSelection(selectedOptionValue)
    ? "custom"
    : selectedOptionValue;

  return getPediatricDoseState().drugSettings[drugSettingsKey] || createDefaultPediatricDrugSettings()[drugSettingsKey];
}

function buildCustomPediatricDrugFromInputs() {
  const currentSettings = getCurrentPediatricDrugSettings();
  const minDosePerKg = Number(currentSettings.minDosePerKg) || DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.recommendedRange.min;
  const maxDosePerKg = Number(currentSettings.maxDosePerKg) || DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.recommendedRange.max;
  const maxTotalDose = Number(currentSettings.maxTotalDose);
  const amountUnit = getUnitBase(currentSettings.doseUnit) || DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.doseAmountUnit;

  return {
    id: "custom",
    name: currentSettings.customDrugName.trim() || "Custom drug",
    category: "custom",
    profiles: {
      pediatricBolus: {
        dosePerKgUnit: currentSettings.doseUnit,
        doseAmountUnit: amountUnit,
        recommendedRange: {
          min: Math.min(minDosePerKg, maxDosePerKg),
          max: Math.max(minDosePerKg, maxDosePerKg)
        },
        concentration: {
          value: Number(currentSettings.concentration) || DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.concentration.value,
          unit: currentSettings.concentrationUnit
        },
        doseLimits: isPositiveNumber(maxTotalDose)
          ? {
            maxTotalDose: maxTotalDose,
            note: "Custom maximum single dose cap."
          }
          : null,
        notes: currentSettings.customDrugNotes.trim() || "User-defined pediatric bolus reference.",
        ageGuidance: DEFAULT_CUSTOM_PEDIATRIC_DRUG.profiles.pediatricBolus.ageGuidance,
        metadata: {
          source: "User defined",
          lastReviewed: "Current session"
        }
      }
    }
  };
}

function createSavedCustomPediatricDrugFromView(savedDrugId) {
  const currentSettings = getCurrentPediatricDrugSettings();
  const customDrugName = currentSettings.customDrugName.trim();

  return {
    id: savedDrugId || customDrugName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `custom-${Date.now()}`,
    customDrugName: customDrugName,
    customDrugNotes: currentSettings.customDrugNotes,
    minDosePerKg: currentSettings.minDosePerKg,
    maxDosePerKg: currentSettings.maxDosePerKg,
    doseUnit: currentSettings.doseUnit,
    concentration: currentSettings.concentration,
    concentrationUnit: currentSettings.concentrationUnit,
    maxTotalDose: currentSettings.maxTotalDose
  };
}

function applySavedCustomPediatricDrug(savedDrug) {
  const normalizedSavedDrug = normalizeSavedCustomPediatricDrug(savedDrug);

  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    selectedDrugId: "custom",
    activeSavedCustomDrugId: normalizedSavedDrug.id,
    drugSettings: {
      ...getPediatricDoseState().drugSettings,
      custom: {
        ...getPediatricDoseState().drugSettings.custom,
        ...normalizedSavedDrug
      }
    }
  });
  savePersistedState(persistedState);
}

function getSelectedDrugDilutionPreset() {
  const selectedDrug = getSelectedDrugDefinition();
  return selectedDrug.dilutionPresets && selectedDrug.dilutionPresets.length
    ? selectedDrug.dilutionPresets[0]
    : null;
}

function readSingleDrugSelectionFromView() {
  return {
    selectedDrugId: sanitizeSelectedDrugId(drugSelect.value),
    activeMode: sanitizeActiveMode(getActiveInfusionMode()),
    nitroglycerinDoseUnitView: getSelectedNitroglycerinDoseView()
  };
}

function readSingleDrugInputsFromView(selectedDrugId, nitroglycerinDoseUnitView) {
  const selectedDrug = getDrugPresetById(selectedDrugId);
  const weightValue = Number(inputs.weight.value);
  const rawTargetDose = inputs.targetDose.value;
  const numericTargetDose = Number(rawTargetDose);

  return {
    weight: inputs.weight.value,
    targetDose: isPositiveNumber(numericTargetDose)
      ? formatEditableDoseValue(
        convertDoseValueToReferenceUnit(
          numericTargetDose,
          selectedDrug,
          weightValue,
          getDisplayDoseUnit(selectedDrug, weightValue, nitroglycerinDoseUnitView)
        )
      )
      : rawTargetDose,
    pumpRate: inputs.pumpRate.value
  };
}

function readDrugSettingsFromView(drugId, nitroglycerinDoseUnitView) {
  const selectedDrug = getDrugPresetById(drugId);
  const weightValue = Number(inputs.weight.value);
  const parsedReferenceDoseList = parseDoseList(inputs.referenceDoseList.value);
  const displayDoseUnit = getDisplayDoseUnit(selectedDrug, weightValue, nitroglycerinDoseUnitView);

  return {
    concentration: inputs.concentration.value,
    referenceDoseList: parsedReferenceDoseList
      ? formatEditableDoseList(
        convertDoseListToReferenceUnit(parsedReferenceDoseList, selectedDrug, weightValue, displayDoseUnit)
      )
      : inputs.referenceDoseList.value,
    customDrugName: inputs.customDrugName.value,
    customDrugNotes: inputs.customDrugNotes.value
  };
}

function createSingleDrugStateFromView(baseState) {
  const source = normalizeSingleDrugState(baseState);
  const selection = readSingleDrugSelectionFromView();
  const viewInputs = readSingleDrugInputsFromView(selection.selectedDrugId, selection.nitroglycerinDoseUnitView);

  return {
    selectedDrugId: selection.selectedDrugId,
    activeMode: selection.activeMode,
    nitroglycerinDoseUnitView: selection.nitroglycerinDoseUnitView,
    favoriteDrugIds: source.favoriteDrugIds,
    recentDrugIds: source.recentDrugIds,
    inputs: viewInputs,
    drugSettings: {
      ...source.drugSettings,
      [selection.selectedDrugId]: readDrugSettingsFromView(selection.selectedDrugId, selection.nitroglycerinDoseUnitView)
    }
  };
}

function createInfusionCardStateFromView(baseCardState) {
  const source = normalizeInfusionCardState(baseCardState || createDefaultInfusionCardState());

  return {
    ...source,
    singleDrug: createSingleDrugStateFromView(source.singleDrug)
  };
}

function commitSingleDrugStateFromView() {
  persistedState.singleDrug = createSingleDrugStateFromView(getSingleDrugState());
  savePersistedState(persistedState);
}

function getCurrentInfusionCardState() {
  return createInfusionCardStateFromView({
    cardId: "single-drug-card",
    singleDrug: getSingleDrugState()
  });
}

function applySingleDrugStateToView(singleDrugState) {
  const normalizedState = normalizeSingleDrugState(singleDrugState);
  const currentDrugSettings = normalizedState.drugSettings[normalizedState.selectedDrugId];
  const selectedDrug = getDrugPresetById(normalizedState.selectedDrugId);
  const weightValue = Number(normalizedState.inputs.weight);
  const displayDoseUnit = getDisplayDoseUnit(
    selectedDrug,
    weightValue,
    normalizedState.nitroglycerinDoseUnitView
  );
  const parsedReferenceDoseList = parseDoseList(currentDrugSettings.referenceDoseList);

  drugSelect.value = normalizedState.selectedDrugId;
  inputs.weight.value = normalizedState.inputs.weight;
  inputs.targetDose.value = isPositiveNumber(Number(normalizedState.inputs.targetDose))
    ? formatEditableDoseValue(
      convertDoseValueForDisplay(
        Number(normalizedState.inputs.targetDose),
        selectedDrug,
        weightValue,
        displayDoseUnit
      )
    )
    : normalizedState.inputs.targetDose;
  inputs.pumpRate.value = normalizedState.inputs.pumpRate;
  inputs.concentration.value = currentDrugSettings.concentration;
  inputs.referenceDoseList.value = parsedReferenceDoseList
    ? formatEditableDoseList(
      convertDoseListForDisplay(parsedReferenceDoseList, selectedDrug, weightValue, displayDoseUnit)
    )
    : currentDrugSettings.referenceDoseList;
  inputs.customDrugName.value = currentDrugSettings.customDrugName;
  inputs.customDrugNotes.value = currentDrugSettings.customDrugNotes;
  if (nitroglycerinDoseViewSelect) {
    nitroglycerinDoseViewSelect.value = normalizedState.nitroglycerinDoseUnitView;
  }
}

function recordRecentDrug(drugId) {
  if (drugId === "custom") {
    return;
  }

  const updatedRecentDrugIds = [drugId].concat(
    getRecentDrugIds().filter(function (item) {
      return item !== drugId;
    })
  ).slice(0, 5);

  updateSingleDrugState({
    recentDrugIds: updatedRecentDrugIds
  });
}

function toggleFavoriteDrug(drugId) {
  if (drugId === "custom") {
    return;
  }

  const currentFavoriteDrugIds = getFavoriteDrugIds();
  const isFavorite = currentFavoriteDrugIds.includes(drugId);
  const updatedFavoriteDrugIds = isFavorite
    ? currentFavoriteDrugIds.filter(function (item) {
      return item !== drugId;
    })
    : currentFavoriteDrugIds.concat(drugId).slice(0, 5);

  updateSingleDrugState({
    favoriteDrugIds: updatedFavoriteDrugIds
  });
}

function removeRecentDrug(drugId) {
  updateSingleDrugState({
    recentDrugIds: getRecentDrugIds().filter(function (item) {
      return item !== drugId;
    })
  });
}

function renderQuickDrugButtons(container, drugIds) {
  if (!container) {
    return;
  }

  if (!drugIds.length) {
    container.innerHTML = `<span class="helper-text">${t("no_drugs_yet")}</span>`;
    return;
  }

  container.innerHTML = drugIds.map(function (drugId) {
    const preset = getDrugPresetById(drugId);
    if (container === recentDrugsContainer) {
      return `<span class="quick-drug-chip"><button type="button" class="chip-button" data-quick-drug-id="${drugId}">${preset.name}</button><button type="button" class="quick-drug-remove" data-remove-quick-drug-id="${drugId}" aria-label="${t("remove_favorite")} ${preset.name}">x</button></span>`;
    }

    return `<button type="button" class="chip-button" data-quick-drug-id="${drugId}">${preset.name}</button>`;
  }).join("");
}

function updateQuickDrugUI() {
  const selectedDrugId = drugSelect.value;
  const isFavorite = getFavoriteDrugIds().includes(selectedDrugId);

  favoriteDrugButton.textContent = isFavorite ? t("remove_favorite") : t("add_to_favorites");
  favoriteDrugButton.classList.toggle("is-active", isFavorite);
  favoriteDrugButton.disabled = selectedDrugId === "custom";
  renderQuickDrugButtons(favoriteDrugsContainer, getFavoriteDrugIds());
  renderQuickDrugButtons(recentDrugsContainer, getRecentDrugIds());
}

function syncPediatricCustomUnits(sourceField) {
  if (!isCustomPediatricSelection(pediatricDrugSelect.value)) {
    return;
  }

  let baseUnit = "";

  if (sourceField === "dose") {
    baseUnit = getUnitBase(pediatricInputs.doseUnit.value);
  } else if (sourceField === "concentration") {
    baseUnit = getUnitBase(pediatricInputs.concentrationUnit.value);
  }

  if (!baseUnit) {
    return;
  }

  pediatricInputs.doseUnit.value = `${baseUnit}/kg`;
  pediatricInputs.concentrationUnit.value = `${baseUnit}/mL`;
}

function applyPediatricDoseStateToView(pediatricDoseState) {
  const normalizedState = normalizePediatricDoseState(pediatricDoseState);
  const currentDrugSettings = normalizedState.drugSettings[normalizedState.selectedDrugId];

  renderPediatricDrugSelectOptions();
  pediatricToggleUnverifiedButton.textContent = normalizedState.showUnverifiedPresets
    ? t("hide_unverified_presets")
    : t("show_unverified_presets");
  pediatricDrugSelect.value = getPediatricSelectValueFromState(normalizedState);
  pediatricInputs.weight.value = normalizedState.inputs.weight;
  pediatricInputs.ageGroup.value = normalizedState.inputs.ageGroup;
  pediatricInputs.airwayAgeYears.value = normalizedState.inputs.airwayAgeYears;
  pediatricInputs.airwayWeight.value = normalizedState.inputs.airwayWeight;
  pediatricInputs.airwayDeviceCategory.value = normalizedState.inputs.airwayDeviceCategory;
  pediatricInputs.airwayDeviceModel.value = normalizedState.inputs.airwayDeviceModel;
  pediatricInputs.concentration.value = currentDrugSettings.concentration;
  pediatricInputs.customDrugName.value = currentDrugSettings.customDrugName;
  pediatricInputs.customDrugNotes.value = currentDrugSettings.customDrugNotes;
  pediatricInputs.minDosePerKg.value = currentDrugSettings.minDosePerKg;
  pediatricInputs.maxDosePerKg.value = currentDrugSettings.maxDosePerKg;
  pediatricInputs.doseUnit.value = currentDrugSettings.doseUnit;
  pediatricInputs.concentrationUnit.value = currentDrugSettings.concentrationUnit;
  pediatricInputs.maxTotalDose.value = currentDrugSettings.maxTotalDose;
  pediatricAirwayDeviceModelField.classList.toggle("hidden", normalizedState.inputs.airwayDeviceCategory !== "supraglottic");
  pediatricAirwayWarning.textContent = getPediatricAirwayWarningText(normalizedState.inputs.airwayDeviceCategory);
  activatePediatricMode(normalizedState.activeMode);
}

function applyDantroleneQuickStateToView(dantroleneQuickState) {
  const normalizedState = normalizeDantroleneQuickState(dantroleneQuickState);

  dantroleneInputs.weight.value = normalizedState.inputs.weight;
  dantroleneInputs.formulation.value = normalizedState.inputs.formulationId;
  dantroleneInputs.initialDose.value = normalizedState.inputs.initialDoseMgKg;
}

function activateCalculator(calculatorId) {
  calculatorTabs.forEach(function (tab) {
    const isActive = tab.dataset.calculatorTab === calculatorId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  calculatorViews.forEach(function (view) {
    const isActive = view.dataset.calculatorView === calculatorId;
    view.classList.toggle("hidden", !isActive);
  });
}

function activateInfusionMode(modeId) {
  infusionModeTabs.forEach(function (tab) {
    const isActive = tab.dataset.infusionModeTab === modeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  infusionModePanels.forEach(function (panel) {
    const isActive = panel.dataset.infusionModePanel === modeId;
    panel.classList.toggle("hidden", !isActive);
  });

  updateSingleDrugState({
    activeMode: sanitizeActiveMode(modeId)
  });
  clearResult();
  errorMessage.textContent = "";
}

function activateInfusionView(viewId) {
  const normalizedViewId = ["single-drug", "workspace"].includes(viewId) ? viewId : "single-drug";

  infusionViewTabs.forEach(function (tab) {
    const isActive = tab.dataset.infusionViewTab === normalizedViewId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  infusionViewPanels.forEach(function (panel) {
    const isActive = panel.dataset.infusionViewPanel === normalizedViewId;
    panel.classList.toggle("hidden", !isActive);
  });

  updateInfusionWorkspaceState({
    activeView: normalizedViewId
  });
}

function activateDilutionMode(modeId) {
  dilutionInputs.modeTabs.forEach(function (tab) {
    const isActive = tab.dataset.dilutionModeTab === modeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  dilutionInputs.modePanels.forEach(function (panel) {
    const isActive = panel.dataset.dilutionModePanel === modeId;
    panel.classList.toggle("hidden", !isActive);
  });
  
  dilutionInputs.errorMessage.textContent = "";
  dilutionInputs.resultCard.classList.add("hidden");
}

function activatePediatricMode(modeId) {
  pediatricModeTabs.forEach(function (tab) {
    const isActive = tab.dataset.pediatricModeTab === modeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  pediatricModePanels.forEach(function (panel) {
    const isActive = panel.dataset.pediatricModePanel === modeId;
    panel.classList.toggle("hidden", !isActive);
  });

  updatePediatricDoseState({
    activeMode: sanitizePediatricActiveMode(modeId)
  });
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

function updateDrugUI() {
  const selectedDrug = getSelectedDrugDefinition();
  const currentSettings = getCurrentDrugSettings();
  const isCustomDrug = drugSelect.value === "custom";
  const savedDoseList = parseDoseList(currentSettings.referenceDoseList);
  const dilutionPreset = getSelectedDrugDilutionPreset();
  const weightValue = Number(inputs.weight.value);
  const displayDoseUnit = getDisplayDoseUnit(
    selectedDrug,
    weightValue,
    getPreferredNitroglycerinDoseView()
  );
  const displayDoseList = savedDoseList
    ? convertDoseListForDisplay(savedDoseList, selectedDrug, weightValue, displayDoseUnit)
    : null;

  customDrugFields.classList.toggle("hidden", !isCustomDrug);
  presetSummary.classList.remove("hidden");

  inputs.concentration.value = currentSettings.concentration || String(selectedDrug.concentration);
  inputs.referenceDoseList.value = displayDoseList
    ? formatEditableDoseList(displayDoseList)
    : (currentSettings.referenceDoseList || formatList(selectedDrug.referenceDoses));
  inputs.customDrugName.value = isCustomDrug ? currentSettings.customDrugName : "";
  inputs.customDrugNotes.value = isCustomDrug ? currentSettings.customDrugNotes : "";

  concentrationUnitLabel.textContent = selectedDrug.concentrationUnit || "mcg/mL";
  doseUnitLabel.textContent = displayDoseUnit;

  if (nitroglycerinDoseViewSelect && nitroglycerinDoseViewHelp && doseUnitLabel) {
    const shouldShowNitroglycerinUnitView = !isCustomDrug && isNitroglycerinDrug(selectedDrug);
    doseUnitLabel.classList.toggle("hidden", shouldShowNitroglycerinUnitView);
    nitroglycerinDoseViewSelect.classList.toggle("hidden", !shouldShowNitroglycerinUnitView);
    nitroglycerinDoseViewHelp.classList.toggle("hidden", !shouldShowNitroglycerinUnitView);
    nitroglycerinDoseViewSelect.value = displayDoseUnit;
    nitroglycerinDoseViewHelp.textContent = isPositiveNumber(weightValue)
      ? t("nitroglycerin_unit_help")
      : t("nitroglycerin_unit_help_weight_needed");
  }

  if (displayDoseList) {
    referenceRangeText.textContent = formatInfusionRangeDisplay(
      Math.min.apply(null, displayDoseList),
      Math.max.apply(null, displayDoseList),
      displayDoseUnit,
      selectedDrug,
      weightValue
    );
  } else if (isNitroglycerinDrug(selectedDrug) && displayDoseUnit === "mcg/kg/min" && !isPositiveNumber(weightValue)) {
    referenceRangeText.textContent = formatInfusionRangeDisplay(
      selectedDrug.referenceRange.min,
      selectedDrug.referenceRange.max,
      selectedDrug.referenceRange.unit,
      selectedDrug,
      weightValue
    );
  } else if (selectedDrug.referenceRange.min > 0 || selectedDrug.referenceRange.max > 0) {
    referenceRangeText.textContent = formatInfusionRangeDisplay(
      convertDoseValueForDisplay(selectedDrug.referenceRange.min, selectedDrug, weightValue, displayDoseUnit),
      convertDoseValueForDisplay(selectedDrug.referenceRange.max, selectedDrug, weightValue, displayDoseUnit),
      displayDoseUnit,
      selectedDrug,
      weightValue
    );
  } else {
    referenceRangeText.textContent = "Custom reference values";
  }
  renderRangeSourceBadge(referenceRangeBadge, selectedDrug);
  renderUseCaseBadge(referenceUseCaseBadge, selectedDrug);
  referenceUseCaseText.textContent = isCustomDrug
    ? "Custom use case."
    : getDrugUseCaseSummary(selectedDrug);
  referenceRangeSourceText.textContent = isCustomDrug
    ? "User-defined range."
    : getRangeSourceSummary(selectedDrug);
  referenceRangeRationaleText.textContent = isCustomDrug
    ? "Custom values should be checked against your own source before clinical use."
    : getRangeRationale(selectedDrug);
  if (alternateUseCaseRow && alternateUseCaseText) {
    const alternateUseText = !isCustomDrug && selectedDrug.alternateUseCase
      ? selectedDrug.alternateUseCase
      : "";
    alternateUseCaseRow.classList.toggle("hidden", !alternateUseText);
    alternateUseCaseText.textContent = alternateUseText || "-";
  }
  applyRangeSourceTheme(presetSummary, selectedDrug);

  drugNotesText.textContent = isCustomDrug
    ? inputs.customDrugNotes.value.trim() || "User-defined custom drug."
    : selectedDrug.notes || "-";
  drugDilutionText.textContent = isCustomDrug
    ? "Custom / not set"
    : formatDilutionPreset(dilutionPreset);
  drugDilutionButton.disabled = !dilutionPreset || isCustomDrug;
  drugDilutionButton.title = dilutionPreset
    ? "Apply this concentration"
    : "No standard dilution preset available";
  drugSourceText.textContent = getDisplaySourceLabel(selectedDrug.metadata.source);
  drugLastReviewedText.textContent = selectedDrug.metadata.lastReviewed || "-";
  drugHelp.textContent = isCustomDrug
    ? t("drug_help_custom")
    : t("drug_help_selected", { drug: selectedDrug.name });
  updateQuickDrugUI();
}

function updatePediatricDrugUI() {
  const selectedOptionValue = getPediatricSelectValueFromState(getPediatricDoseState());
  renderPediatricDrugSelectOptions();
  pediatricDrugSelect.value = selectedOptionValue;
  const selectedSavedCustomDrugId = getSavedCustomDrugIdFromOptionValue(selectedOptionValue);
  const isCustomDrug = selectedOptionValue === "custom" || selectedSavedCustomDrugId !== "";
  const selectedDrug = isCustomDrug
    ? buildCustomPediatricDrugFromInputs()
    : getPediatricDrugPresetById(selectedOptionValue);
  const pediatricProfile = selectedDrug.profiles.pediatricBolus;
  const currentDrugSettings = getCurrentPediatricDrugSettings();
  const ageGroup = pediatricInputs.ageGroup.value || "child";
  const ageGuidance = pediatricProfile.ageGuidance && (pediatricProfile.ageGuidance[ageGroup] || pediatricProfile.ageGuidance.default);
  const doseLimitNote = pediatricProfile.doseLimits && pediatricProfile.doseLimits.note
    ? ` / ${pediatricProfile.doseLimits.note}`
    : "";
  const activeSavedCustomDrugId = getActiveSavedCustomPediatricDrugId();
  const verificationConfig = getPediatricVerificationConfig(pediatricProfile.verificationStatus);

  pediatricCustomFields.classList.toggle("hidden", !isCustomDrug);
  pediatricInputs.concentration.value = currentDrugSettings.concentration || String(pediatricProfile.concentration.value);
  pediatricRangeText.textContent = `${pediatricProfile.recommendedRange.min} - ${pediatricProfile.recommendedRange.max} ${pediatricProfile.dosePerKgUnit}`;
  pediatricAgeNoteText.textContent = ageGuidance ? ageGuidance.note : (currentLanguage === "en" ? "No specific age-group note provided." : "특정 age group note가 없습니다.");
  pediatricConcentrationText.textContent = `${pediatricInputs.concentration.value} ${pediatricProfile.concentration.unit}`;
  pediatricVerificationText.textContent = verificationConfig.summary;
  pediatricNotesText.textContent = `${pediatricProfile.notes}${doseLimitNote} / ${getDisplaySourceLabel(pediatricProfile.metadata.source)}`;
  pediatricConcentrationUnitLabel.textContent = pediatricProfile.concentration.unit;
  pediatricSaveCustomButton.classList.toggle("hidden", !isCustomDrug);
  pediatricDeleteCustomButton.classList.toggle("hidden", !activeSavedCustomDrugId);
  pediatricSaveCustomButton.textContent = activeSavedCustomDrugId
    ? (currentLanguage === "en" ? "Update saved drug" : "저장된 custom drug 업데이트")
    : t("save_custom_drug");
  pediatricCustomSaveHelp.classList.toggle("hidden", !isCustomDrug);
  pediatricCustomSaveHelp.textContent = activeSavedCustomDrugId
    ? (currentLanguage === "en"
      ? "You are editing a saved custom drug. Renaming it still updates the same saved item."
      : "현재 저장된 custom drug를 편집 중입니다. 이름을 바꿔도 같은 저장 항목이 업데이트됩니다.")
    : (currentLanguage === "en"
      ? "Click Save custom drug to store the current values locally."
      : "Save custom drug를 누르면 현재 입력값이 로컬에 저장됩니다.");
  pediatricAgeWarning.textContent = ageGuidance && ageGuidance.warning
    ? ageGuidance.warning
    : (currentLanguage === "en"
      ? "Weight-based estimate only. Neonates, infants, and selected drugs may require age-specific adjustment."
      : "Weight-based estimate only입니다. Neonate, infant, 일부 약물은 age-specific adjustment가 필요할 수 있습니다.");
  pediatricDrugHelp.textContent = isCustomDrug
    ? t("pediatric_drug_help_custom")
    : (currentLanguage === "en"
      ? `${selectedDrug.name} default values are shown. Adjust weight and concentration if needed.`
      : `${selectedDrug.name} 기본값이 표시됩니다. 필요하면 체중과 농도를 조정해 사용하세요.`);
}

function cloneWorkspaceCards(cards) {
  return cards.map(function (card) {
    return normalizeInfusionWorkspaceCardState({
      ...card,
      cardId: createClientId("workspace-card")
    });
  });
}

function getInfusionDrugCategory(drugId) {
  if (["norepinephrine", "epinephrine", "phenylephrine", "vasopressin", "dopamine"].includes(drugId)) {
    return {
      key: "vasopressor",
      label: "Vasopressor"
    };
  }

  if (["dobutamine", "milrinone", "isoproterenol"].includes(drugId)) {
    return {
      key: "inotrope",
      label: "Inotrope"
    };
  }

  if (["nitroglycerin"].includes(drugId)) {
    return {
      key: "vasodilator",
      label: "Vasodilator"
    };
  }

  return {
    key: "other",
    label: "Infusion"
  };
}

function renderInfusionWorkspace() {
  const workspaceState = normalizeInfusionWorkspaceState(getInfusionWorkspaceState());
  const templates = getInfusionTemplates();
  const sharedWeight = Number(workspaceState.sharedWeight);
  const hasReachedWorkspaceCardLimit = workspaceState.cards.length >= 6;

  workspaceSharedWeightInput.value = workspaceState.sharedWeight;
  workspaceTemplateNameInput.value = "";
  workspaceTemplateNoteInput.value = "";
  workspaceTemplateSelect.innerHTML = templates.length
    ? `<option value="">${t("workspace_select_template")}</option>${templates.map(function (template) {
      return `<option value="${template.id}" ${template.id === workspaceState.selectedTemplateId ? "selected" : ""}>${template.name}</option>`;
    }).join("")}`
    : `<option value="">${t("no_saved_templates")}</option>`;
  workspaceLoadTemplateButton.disabled = !templates.length || !workspaceState.selectedTemplateId;
  workspaceDeleteTemplateButton.disabled = !templates.length || !workspaceState.selectedTemplateId;
  workspaceAddCardButton.disabled = hasReachedWorkspaceCardLimit;
  workspaceAddCardButton.title = hasReachedWorkspaceCardLimit
    ? t("workspace_limit_title")
    : t("workspace_add_card_title");
  workspaceHelp.textContent = isPositiveNumber(sharedWeight)
    ? t("workspace_current_shared_weight", {
      weight: formatNumber(sharedWeight, 1)
    })
    : t("workspace_help");

  if (workspaceState.selectedTemplateId) {
    const selectedTemplate = templates.find(function (template) {
      return template.id === workspaceState.selectedTemplateId;
    });

    if (selectedTemplate) {
      workspaceTemplateNameInput.value = selectedTemplate.name;
      workspaceTemplateNoteInput.value = selectedTemplate.note;
      
      let helpText = t("workspace_loaded_template", {
        name: selectedTemplate.name
      });
      if (selectedTemplate.note) {
        helpText += t("workspace_loaded_template_note", {
          note: selectedTemplate.note
        });
      }
      workspaceHelp.textContent = `${workspaceHelp.textContent} ${helpText}`;
    }
  }

  if (hasReachedWorkspaceCardLimit) {
    workspaceHelp.textContent = `${workspaceHelp.textContent} ${t("workspace_limit_help")}`;
  }

  workspaceCardList.innerHTML = workspaceState.cards.map(function (card, index) {
    const preset = getDrugPresetById(card.selectedDrugId);
    const drugCategory = getInfusionDrugCategory(card.selectedDrugId);
    const rangeBadge = getReferenceTypeBadge(getRangeSourceType(preset));
    const useCaseBadge = getUseCaseBadge(preset.useCase);
    const concentration = Number(card.concentration);
    const targetDose = Number(card.targetDose);
    const displayDoseUnit = getDisplayDoseUnit(
      preset,
      sharedWeight,
      getWorkspaceNitroglycerinDoseView(card, sharedWeight)
    );
    const displayTargetDose = convertDoseValueForDisplay(targetDose, preset, sharedWeight, displayDoseUnit);
    const displayRangeMin = convertDoseValueForDisplay(preset.referenceRange.min, preset, sharedWeight, displayDoseUnit);
    const displayRangeMax = convertDoseValueForDisplay(preset.referenceRange.max, preset, sharedWeight, displayDoseUnit);
    const targetDoseInputValue = card.targetDose === ""
      ? ""
      : (Number.isFinite(targetDose) ? formatEditableDoseValue(displayTargetDose) : card.targetDose);
    const usesWeight = isWeightBasedReferenceRange(preset.referenceRange);
    const hasReadyCalculation = (usesWeight ? isPositiveNumber(sharedWeight) : true) && isPositiveNumber(concentration) && isPositiveNumber(targetDose);
    const targetRate = hasReadyCalculation ? doseToRate(sharedWeight, concentration, targetDose, preset.referenceRange) : null;
    const isOutOfRange = hasReadyCalculation && !isWithinReferenceRange(targetDose, preset.referenceRange);
    const dilutionPreset = preset.dilutionPresets[0] || null;
    const showNitroglycerinUnitView = isNitroglycerinDrug(preset);
    const optionMarkup = DRUG_PRESETS.map(function (drugPreset) {
      return `<option value="${drugPreset.id}" ${drugPreset.id === card.selectedDrugId ? "selected" : ""}>${drugPreset.name}</option>`;
    }).join("");

    return `
      <article class="workspace-card is-${drugCategory.key}" data-workspace-card-id="${card.cardId}">
        <div class="workspace-card-header">
          <div>
            <h3 class="workspace-card-title">${index + 1}. ${preset.name}</h3>
            <p class="workspace-card-meta">${formatNumber(concentration, 1)} ${preset.concentrationUnit} / ${getDisplaySourceLabel(preset.metadata.source)} / Last reviewed ${preset.metadata.lastReviewed}</p>
            <div class="workspace-card-tag-row">
              <span class="workspace-card-tag is-${drugCategory.key}">${drugCategory.label}</span>
              ${useCaseBadge}
              ${rangeBadge}
            </div>
          </div>
          <div class="quick-drug-list">
            <button
              type="button"
              class="chip-button chip-button-secondary"
              data-move-workspace-card-up="${card.cardId}"
              ${index === 0 ? "disabled" : ""}
            >
              ${t("move_up")}
            </button>
            <button
              type="button"
              class="chip-button chip-button-secondary"
              data-move-workspace-card-down="${card.cardId}"
              ${index === workspaceState.cards.length - 1 ? "disabled" : ""}
            >
              ${t("move_down")}
            </button>
            <button
              type="button"
              class="chip-button chip-button-secondary"
              data-remove-workspace-card-id="${card.cardId}"
              ${workspaceState.cards.length === 1 ? "disabled" : ""}
            >
              ${t("remove")}
            </button>
          </div>
        </div>

        <div class="form-grid">
          <label class="field">
            <span class="field-label">${t("workspace_drug")}</span>
            <div class="select-row">
              <select data-workspace-field="selectedDrugId" data-workspace-card-id="${card.cardId}">
                ${optionMarkup}
              </select>
            </div>
          </label>

          <label class="field">
            <span class="field-label">${t("workspace_concentration")}</span>
            <div class="input-row">
              <input data-workspace-field="concentration" data-workspace-card-id="${card.cardId}" type="number" inputmode="decimal" step="any" value="${card.concentration}">
              <span class="unit">${preset.concentrationUnit}</span>
            </div>
          </label>

          <label class="field">
            <span class="field-label">${t("workspace_target_dose")}</span>
            <div class="input-row">
              <input data-workspace-field="targetDose" data-workspace-card-id="${card.cardId}" data-workspace-dose-display-unit="${displayDoseUnit}" type="number" inputmode="decimal" step="any" value="${targetDoseInputValue}">
              ${showNitroglycerinUnitView
                ? `<select class="unit-select" data-workspace-field="nitroglycerinDoseUnitView" data-workspace-card-id="${card.cardId}">
                    <option value="mcg/min" ${displayDoseUnit === "mcg/min" ? "selected" : ""}>mcg/min</option>
                    <option value="mcg/kg/min" ${displayDoseUnit === "mcg/kg/min" ? "selected" : ""}>mcg/kg/min</option>
                  </select>`
                : `<span class="unit">${displayDoseUnit}</span>`}
            </div>
          </label>
        </div>

        <div class="workspace-card-result ${isOutOfRange ? "is-warning" : ""}">
          <p class="workspace-card-rate ${isOutOfRange ? "is-warning is-out-of-range" : ""}">
            ${hasReadyCalculation ? `${formatNumber(targetRate, 2)} mL/hr` : (usesWeight ? t("workspace_enter_shared_weight") : t("workspace_enter_valid_values"))}
          </p>
          <p class="workspace-card-context">
            ${hasReadyCalculation
              ? t("workspace_target_at_concentration", {
                dose: `<span class="${isOutOfRange ? "is-out-of-range" : ""}">${formatNumber(displayTargetDose, 3)}</span>`,
                unit: displayDoseUnit,
                concentration: formatNumber(concentration, 1),
                concentrationUnit: preset.concentrationUnit
              })
              : t("workspace_reference_range_note", {
                min: formatNumber(displayRangeMin, 3),
                max: formatNumber(displayRangeMax, 3),
                unit: displayDoseUnit,
                sharedWeightNote: ""
              })}
          </p>
          ${isOutOfRange ? `<p class="workspace-card-warning">${t("workspace_out_of_range")}</p>` : ""}
        </div>

        <p class="workspace-card-reference-note">
          ${t("workspace_reference_range_note", {
            min: formatNumber(displayRangeMin, 3),
            max: formatNumber(displayRangeMax, 3),
            unit: displayDoseUnit,
            sharedWeightNote: usesWeight ? "" : t("workspace_shared_weight_not_used")
          })}<br>
          ${t("workspace_use_case_note", { useCase: getDrugUseCaseSummary(preset) })}<br>
          ${t("workspace_range_basis_note", { basis: getRangeSourceSummary(preset) })}<br>
          ${t("workspace_rationale_note", { rationale: getRangeRationale(preset) })}<br>
          ${t("workspace_standard_dilution_note", { dilution: formatDilutionPreset(preset.dilutionPresets[0] || null) })}
        </p>

        <div class="quick-drug-actions">
          <button
            type="button"
            class="chip-button chip-button-secondary"
            data-apply-workspace-dilution="${card.cardId}"
            ${dilutionPreset ? "" : "disabled"}
            title="${dilutionPreset ? t("workspace_apply_standard_dilution_title") : t("workspace_no_standard_dilution_title")}"
          >
            ${t("workspace_apply_standard_dilution")}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

// -----------------------------
// Validation and input reading
// -----------------------------

function readInfusionFormValues() {
  const weight = Number(inputs.weight.value);
  const drug = getSelectedDrugDefinition();
  const displayDoseUnit = getDisplayDoseUnit(drug, weight, getSelectedNitroglycerinDoseView());
  const parsedReferenceDoseList = parseDoseList(inputs.referenceDoseList.value);

  return {
    mode: getActiveInfusionMode(),
    weight: weight,
    concentration: Number(inputs.concentration.value),
    targetDose: convertDoseValueToReferenceUnit(
      Number(inputs.targetDose.value),
      drug,
      weight,
      displayDoseUnit
    ),
    pumpRate: Number(inputs.pumpRate.value),
    referenceDoseList: parsedReferenceDoseList
      ? convertDoseListToReferenceUnit(parsedReferenceDoseList, drug, weight, displayDoseUnit)
      : null,
    displayDoseUnit: displayDoseUnit,
    drug: drug
  };
}

function validateInfusionValues(values) {
  if (isNitroglycerinDrug(values.drug) && values.displayDoseUnit === "mcg/kg/min" && !isPositiveNumber(values.weight)) {
    return t("validation_ntg_weight_for_kg_unit");
  }

  if (isWeightBasedReferenceRange(values.drug.referenceRange) && !isPositiveNumber(values.weight)) {
    return t("validation_patient_weight");
  }

  if (!isPositiveNumber(values.concentration)) {
    return t("validation_drug_concentration");
  }

  if (drugSelect.value === "custom" && inputs.customDrugName.value.trim() === "") {
    return t("validation_custom_drug_name");
  }

  if (values.mode === "dose-to-rate" && !isPositiveNumber(values.targetDose)) {
    return t("validation_target_dose");
  }

  if (values.mode === "rate-to-dose" && !isPositiveNumber(values.pumpRate)) {
    return t("validation_pump_rate");
  }

  if (values.mode === "reference-table" && !values.referenceDoseList) {
    return t("validation_reference_dose_list");
  }

  return "";
}

function readPediatricFormValues() {
  if (getActivePediatricMode() === "airway") {
    return {
      mode: "airway",
      ageYears: Number(pediatricInputs.airwayAgeYears.value),
      weight: Number(pediatricInputs.airwayWeight.value),
      deviceCategory: pediatricInputs.airwayDeviceCategory.value,
      deviceModel: pediatricInputs.airwayDeviceModel.value
    };
  }

  const drug = isCustomPediatricSelection(pediatricDrugSelect.value)
    ? buildCustomPediatricDrugFromInputs()
    : getPediatricDrugPresetById(pediatricDrugSelect.value);
  const profile = drug.profiles.pediatricBolus;
  const ageGroup = pediatricInputs.ageGroup.value || "child";
  const ageGuidance = profile.ageGuidance && (profile.ageGuidance[ageGroup] || profile.ageGuidance.default);

  return {
    mode: "dosing",
    weight: Number(pediatricInputs.weight.value),
    ageGroup: ageGroup,
    concentration: Number(pediatricInputs.concentration.value),
    drug: drug,
    profile: profile,
    ageGuidance: ageGuidance || null
  };
}

function validatePediatricValues(values) {
  if (values.mode === "airway") {
    if (values.deviceCategory === "ett" && !isPositiveNumber(values.ageYears)) {
      return t("validation_ett_age");
    }

    if (values.deviceCategory === "supraglottic" && !isPositiveNumber(values.weight)) {
      return t("validation_supraglottic_weight");
    }

    if (["oral-airway", "nasal-airway", "laryngoscope", "face-mask"].includes(values.deviceCategory)
      && !isPositiveNumber(values.ageYears)
      && !isPositiveNumber(values.weight)) {
      return t("validation_airway_age_or_weight");
    }

    return "";
  }

  if (!isPositiveNumber(values.weight)) {
    return t("validation_patient_weight");
  }

  if (!isPositiveNumber(values.concentration)) {
    return t("validation_drug_concentration");
  }

  if (isCustomPediatricSelection(pediatricDrugSelect.value)) {
    if (pediatricInputs.customDrugName.value.trim() === "") {
      return t("validation_custom_name_required");
    }

    if (!isPositiveNumber(Number(pediatricInputs.minDosePerKg.value)) || !isPositiveNumber(Number(pediatricInputs.maxDosePerKg.value))) {
      return t("validation_custom_range_positive");
    }

    if (Number(pediatricInputs.maxDosePerKg.value) < Number(pediatricInputs.minDosePerKg.value)) {
      return t("validation_custom_max_gte_min");
    }

    if (getUnitBase(pediatricInputs.concentrationUnit.value) !== getUnitBase(pediatricInputs.doseUnit.value)) {
      return t("validation_unit_base_match");
    }
  }

  return "";
}

function readDantroleneFormValues() {
  const formulation = DANTROLENE_FORMULATIONS.find(function (item) {
    return item.id === dantroleneInputs.formulation.value;
  }) || DANTROLENE_FORMULATIONS[0];

  return {
    weight: Number(dantroleneInputs.weight.value),
    formulation: formulation,
    initialDoseMgKg: Number(dantroleneInputs.initialDose.value)
  };
}

function validateDantroleneValues(values) {
  if (!isPositiveNumber(values.weight)) {
    return t("validation_patient_weight");
  }

  if (!isPositiveNumber(values.initialDoseMgKg)) {
    return t("validation_initial_dose_target");
  }

  return "";
}

// -----------------------------
// Rendering layer
// -----------------------------

function clearResult() {
  resultCard.classList.add("hidden");
  resultCard.classList.remove("is-warning");
  referenceTableCard.classList.add("hidden");
  resultLabel.textContent = t("result_label_calc");
  primaryResult.textContent = "0.00 mL/hr";
  primaryResult.classList.remove("is-warning");
  secondaryResultLabel.textContent = t("supporting_information");
  secondaryResult.textContent = "-";
  secondaryResult.classList.remove("is-warning");
  concentrationResult.textContent = "";
  concentrationExplanation.textContent = "";
  rateExplanation.textContent = "";
  infusionReferenceList.innerHTML = "";
  referenceTableCaption.textContent = "-";
  referenceTableBody.innerHTML = "";
  resultWarning.textContent = t("result_warning_default");
  if (resultRangeBadge) {
    resultRangeBadge.innerHTML = "";
  }
  if (resultUseCaseBadge) {
    resultUseCaseBadge.innerHTML = "";
  }
  if (resultUseCaseText) {
    resultUseCaseText.textContent = "-";
  }
  applyRangeSourceTheme(resultCard, null);
}

function clearPediatricResult() {
  pediatricResultCard.classList.add("hidden");
  pediatricResultLabel.textContent = t("pediatric_dosing_result");
  pediatricPrimaryResult.textContent = "0.00 - 0.00";
  pediatricSecondaryResultLabel.textContent = t("calculated_dose_range");
  pediatricSecondaryResult.textContent = "-";
  pediatricConcentrationResult.textContent = "";
  pediatricDoseExplanation.textContent = "";
  pediatricVolumeExplanation.textContent = "";
  pediatricVerificationText.textContent = "-";
  pediatricDoseReferenceList.innerHTML = "";
  pediatricResultWarning.textContent = t("pediatric_result_warning_default");
  pediatricAirwayResultCard.classList.add("hidden");
  pediatricAirwayPrimaryResult.textContent = "-";
  pediatricAirwaySecondaryLabel.textContent = t("estimated_oral_depth");
  pediatricAirwaySecondaryResult.textContent = "-";
  pediatricAirwayContext.textContent = "";
  pediatricAirwayDeviceResult.textContent = "";
  pediatricAirwaySizeExplanation.textContent = "";
  pediatricAirwayDepthExplanation.textContent = "";
  pediatricAirwayReferenceList.innerHTML = "";
  pediatricAirwayResultWarning.textContent = t("pediatric_airway_warning_default");
  pediatricAirwayWarning.textContent = getPediatricAirwayWarningText(pediatricInputs.airwayDeviceCategory.value);
}

function clearDantroleneResult() {
  dantroleneResultCard.classList.add("hidden");
  dantrolenePrimaryResult.textContent = "0 mg";
  dantroleneSecondaryResult.textContent = "-";
  dantroleneContext.textContent = "";
  dantroleneInitialVials.textContent = "-";
  dantroleneMaxVials.textContent = "-";
  dantroleneVialExplanation.textContent = "";
  dantroleneReconstitutionExplanation.textContent = "";
  dantroleneInitialGuide.textContent = "";
  dantroleneRepeatGuide.textContent = "";
  dantroleneMaintenanceGuide.textContent = "";
  dantroleneReferenceList.innerHTML = "";
  dantroleneResultWarning.textContent = t("dantrolene_result_warning_default");
}

function renderReferenceRows(rows, doseUnit, drug, weightKg) {
  referenceTableBody.innerHTML = rows.map(function (row) {
    return `
      <tr class="${row.isOutOfRange ? "is-warning" : ""}">
        <td>${formatInfusionDoseDisplay(row.dose, doseUnit, drug, weightKg)}</td>
        <td>${formatNumber(row.rate, 2)} mL/hr</td>
      </tr>
    `;
  }).join("");
}

function showDoseToRateResult(values) {
  const referenceRange = values.drug.referenceRange || null;
  const usesWeight = isWeightBasedReferenceRange(referenceRange);
  const rate = doseToRate(values.weight, values.concentration, values.targetDose, referenceRange);
  const doseUnit = values.displayDoseUnit || values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const isOutOfRange = !isWithinReferenceRange(values.targetDose, values.drug.referenceRange);
  const referenceIds = getInfusionReferenceIds(values);
  const displayedTargetDose = convertDoseValueForDisplay(values.targetDose, values.drug, values.weight, doseUnit);

  resultLabel.textContent = t("dose_to_rate");
  renderRangeSourceBadge(resultRangeBadge, values.drug);
  renderUseCaseBadge(resultUseCaseBadge, values.drug);
  resultUseCaseText.textContent = getDrugUseCaseSummary(values.drug);
  applyRangeSourceTheme(resultCard, values.drug);
  primaryResult.textContent = `${formatNumber(rate, 2)} mL/hr`;
  secondaryResultLabel.textContent = t("target_dose");
  secondaryResult.textContent = formatInfusionDoseDisplay(displayedTargetDose, doseUnit, values.drug, values.weight);
  concentrationResult.textContent = usesWeight
    ? `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${formatNumber(values.weight, 1)} kg`
    : `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${t("absolute_dose_mode")}`;
  concentrationExplanation.textContent = t("infusion_dose_calculation", {
    concentration: formatNumber(values.concentration, 2),
    unit: concentrationUnit
  });
  rateExplanation.textContent = usesWeight
    ? t("infusion_rate_formula_weight", {
      dose: formatNumber(values.targetDose, 3),
      weight: formatNumber(values.weight, 1),
      factor: getReferenceTimeFactor(referenceRange),
      concentration: formatNumber(values.concentration, 2),
      rate: formatNumber(rate, 2)
    })
    : t("infusion_rate_formula_absolute", {
      dose: formatNumber(values.targetDose, 3),
      factor: getReferenceTimeFactor(referenceRange),
      concentration: formatNumber(values.concentration, 2),
      rate: formatNumber(rate, 2)
    });
  renderReferenceList(infusionReferenceList, referenceIds);
  resultCard.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  secondaryResult.classList.toggle("is-warning", isOutOfRange);
  secondaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  resultWarning.textContent = isOutOfRange
    ? t("infusion_result_out_of_range")
    : t("infusion_result_reference_only");
  resultCard.classList.remove("hidden");
}

function showRateToDoseResult(values) {
  const referenceRange = values.drug.referenceRange || null;
  const usesWeight = isWeightBasedReferenceRange(referenceRange);
  const dose = rateToDose(values.weight, values.concentration, values.pumpRate, referenceRange);
  const doseUnit = values.displayDoseUnit || values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const isOutOfRange = !isWithinReferenceRange(dose, values.drug.referenceRange);
  const referenceIds = getInfusionReferenceIds(values);
  const displayedDose = convertDoseValueForDisplay(dose, values.drug, values.weight, doseUnit);

  resultLabel.textContent = t("rate_to_dose");
  renderRangeSourceBadge(resultRangeBadge, values.drug);
  renderUseCaseBadge(resultUseCaseBadge, values.drug);
  resultUseCaseText.textContent = getDrugUseCaseSummary(values.drug);
  applyRangeSourceTheme(resultCard, values.drug);
  primaryResult.textContent = formatInfusionDoseDisplay(displayedDose, doseUnit, values.drug, values.weight);
  secondaryResultLabel.textContent = t("pump_rate");
  secondaryResult.textContent = `${formatNumber(values.pumpRate, 2)} mL/hr`;
  concentrationResult.textContent = usesWeight
    ? `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${formatNumber(values.weight, 1)} kg`
    : `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${t("absolute_dose_mode")}`;
  concentrationExplanation.textContent = t("infusion_dose_calculation", {
    concentration: formatNumber(values.concentration, 2),
    unit: concentrationUnit
  });
  rateExplanation.textContent = usesWeight
    ? t("infusion_dose_formula_weight", {
      rate: formatNumber(values.pumpRate, 2),
      concentration: formatNumber(values.concentration, 2),
      weight: formatNumber(values.weight, 1),
      factor: getReferenceTimeFactor(referenceRange),
      dose: formatNumber(dose, 3),
      unit: doseUnit
    })
    : t("infusion_dose_formula_absolute", {
      rate: formatNumber(values.pumpRate, 2),
      concentration: formatNumber(values.concentration, 2),
      factor: getReferenceTimeFactor(referenceRange),
      dose: formatNumber(dose, 3),
      unit: (values.drug.referenceRange && values.drug.referenceRange.unit) || doseUnit
    });
  renderReferenceList(infusionReferenceList, referenceIds);
  resultCard.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-warning", isOutOfRange);
  primaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  secondaryResult.classList.toggle("is-warning", isOutOfRange);
  secondaryResult.classList.toggle("is-out-of-range", isOutOfRange);
  resultWarning.textContent = isOutOfRange
    ? t("infusion_result_out_of_range")
    : t("infusion_result_reference_only");
  resultCard.classList.remove("hidden");
}

function showReferenceTableResult(values) {
  const referenceRange = values.drug.referenceRange || null;
  const usesWeight = isWeightBasedReferenceRange(referenceRange);
  const doseList = values.referenceDoseList || values.drug.referenceDoses;
  const rows = buildReferenceTable(values.weight, values.concentration, doseList, referenceRange).map(function (row) {
    return {
      ...row,
      isOutOfRange: !isWithinReferenceRange(row.dose, values.drug.referenceRange)
    };
  });
  const doseUnit = values.displayDoseUnit || values.drug.referenceRange.unit || "mcg/kg/min";
  const concentrationUnit = values.drug.concentrationUnit || "mcg/mL";
  const hasOutOfRangeRow = rows.some(function (row) {
    return row.isOutOfRange;
  });
  const referenceIds = getInfusionReferenceIds(values);
  const displayedDoseList = convertDoseListForDisplay(doseList, values.drug, values.weight, doseUnit);

  resultLabel.textContent = t("reference_dosing_table");
  renderRangeSourceBadge(resultRangeBadge, values.drug);
  renderUseCaseBadge(resultUseCaseBadge, values.drug);
  resultUseCaseText.textContent = getDrugUseCaseSummary(values.drug);
  applyRangeSourceTheme(resultCard, values.drug);
  primaryResult.textContent = values.drug.name;
  secondaryResultLabel.textContent = t("result_setup");
  secondaryResult.textContent = usesWeight
    ? `${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${concentrationUnit}`
    : `${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${t("absolute_dose_mode")}`;
  concentrationResult.textContent = doseUnit === "mcg/kg/hr"
    ? `${t("reference_doses")}: ${displayedDoseList.map(function (dose) {
      return `${formatNumber(dose, 3)} mcg/kg/hr (${formatNumber(dose / 1000, 3)} mg/kg/hr)`;
    }).join(", ")}`
    : `${t("reference_doses")}: ${displayedDoseList.map(function (dose) {
      return formatEditableDoseValue(dose);
    }).join(", ")}`;
  concentrationExplanation.textContent = usesWeight
    ? t("reference_table_explanation_weight")
    : t("reference_table_explanation_absolute");
  rateExplanation.textContent = usesWeight
    ? t("formula_same_weight", { factor: getReferenceTimeFactor(referenceRange) })
    : t("formula_same_absolute", { factor: getReferenceTimeFactor(referenceRange) });
  renderReferenceList(infusionReferenceList, referenceIds);
  referenceTableCaption.textContent = usesWeight
    ? `${values.drug.name} / ${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${concentrationUnit}`
    : `${values.drug.name} / ${formatNumber(values.concentration, 2)} ${concentrationUnit} / ${t("absolute_dose_mode")}`;
  renderReferenceRows(rows.map(function (row) {
    return {
      ...row,
      dose: convertDoseValueForDisplay(row.dose, values.drug, values.weight, doseUnit)
    };
  }), doseUnit, values.drug, values.weight);
  resultCard.classList.toggle("is-warning", hasOutOfRangeRow);
  primaryResult.classList.remove("is-warning");
  secondaryResult.classList.toggle("is-warning", hasOutOfRangeRow);
  referenceTableCard.classList.remove("hidden");
  resultWarning.textContent = hasOutOfRangeRow
    ? t("infusion_result_out_of_range")
    : t("infusion_result_reference_only");
  resultCard.classList.remove("hidden");
}

function showPediatricDoseResult(values) {
  const rawDoseRange = calculateWeightBasedDoseRange(
    values.weight,
    values.profile.recommendedRange.min,
    values.profile.recommendedRange.max
  );
  const adjustedDoseRange = applyPediatricDoseLimits(rawDoseRange, values.profile);
  const minVolume = calculateDoseVolume(adjustedDoseRange.minDose, values.concentration);
  const maxVolume = calculateDoseVolume(adjustedDoseRange.maxDose, values.concentration);
  const limitMessage = adjustedDoseRange.messages.join(" ");
  const referenceIds = getPediatricDoseReferenceIds(values);
  const verificationConfig = getPediatricVerificationConfig(values.profile.verificationStatus);

  pediatricResultLabel.textContent = t("pediatric_weight_based_bolus");
  pediatricPrimaryResult.textContent = `${formatNumber(adjustedDoseRange.minDose, 2)} - ${formatNumber(adjustedDoseRange.maxDose, 2)} ${values.profile.doseAmountUnit}`;
  pediatricSecondaryResultLabel.textContent = t("recommended_dose_range_label");
  pediatricSecondaryResult.textContent = `${values.profile.recommendedRange.min} - ${values.profile.recommendedRange.max} ${values.profile.dosePerKgUnit} / ${values.ageGroup}`;
  pediatricConcentrationResult.textContent = `${values.drug.name} / ${formatNumber(values.weight, 1)} kg / ${formatNumber(values.concentration, 2)} ${values.profile.concentration.unit}`;
  pediatricDoseExplanation.textContent = adjustedDoseRange.wasAdjusted
    ? t("pediatric_dose_formula_adjusted", {
      weight: formatNumber(values.weight, 1),
      min: values.profile.recommendedRange.min,
      max: values.profile.recommendedRange.max,
      unitPerKg: values.profile.dosePerKgUnit,
      rawMin: formatNumber(rawDoseRange.minDose, 2),
      rawMax: formatNumber(rawDoseRange.maxDose, 2),
      amountUnit: values.profile.doseAmountUnit,
      limitMessage: limitMessage
    })
    : t("pediatric_dose_formula_plain", {
      weight: formatNumber(values.weight, 1),
      min: values.profile.recommendedRange.min,
      max: values.profile.recommendedRange.max,
      unitPerKg: values.profile.dosePerKgUnit,
      rawMin: formatNumber(rawDoseRange.minDose, 2),
      rawMax: formatNumber(rawDoseRange.maxDose, 2),
      amountUnit: values.profile.doseAmountUnit
    });
  pediatricVolumeExplanation.textContent = t("pediatric_optional_volume_formula", {
    minDose: formatNumber(adjustedDoseRange.minDose, 2),
    maxDose: formatNumber(adjustedDoseRange.maxDose, 2),
    amountUnit: values.profile.doseAmountUnit,
    concentration: formatNumber(values.concentration, 2),
    concentrationUnit: values.profile.concentration.unit,
    minVolume: formatNumber(minVolume, 2),
    maxVolume: formatNumber(maxVolume, 2)
  });
  renderReferenceList(pediatricDoseReferenceList, referenceIds);
  pediatricResultWarning.textContent = adjustedDoseRange.wasAdjusted
    ? `${limitMessage} ${verificationConfig.warning ? `${verificationConfig.warning} ` : ""}${values.ageGuidance && values.ageGuidance.warning ? `${values.ageGuidance.warning} ` : ""}${t("pediatric_warning_suffix")}`
    : values.ageGuidance && values.ageGuidance.warning
      ? `${verificationConfig.warning ? `${verificationConfig.warning} ` : ""}${values.ageGuidance.warning} ${t("pediatric_warning_suffix")}`
      : verificationConfig.warning
        ? `${verificationConfig.warning} ${t("pediatric_warning_suffix")}`
        : t("pediatric_verify_reference_only");
  pediatricResultCard.classList.remove("hidden");
}

function showPediatricAirwayResult(values) {
  const isETTMode = values.deviceCategory === "ett";
  const isSupraglotticMode = values.deviceCategory === "supraglottic";
  const isOralAirwayMode = values.deviceCategory === "oral-airway";
  const isNasalAirwayMode = values.deviceCategory === "nasal-airway";
  const isLaryngoscopeMode = values.deviceCategory === "laryngoscope";
  const isFaceMaskMode = values.deviceCategory === "face-mask";
  const estimates = isETTMode ? calculatePediatricAirwayEstimates(values.ageYears) : null;
  const supraglotticRecommendation = isSupraglotticMode
    ? getSupraglotticDeviceRecommendation(values.deviceModel, values.weight)
    : null;
  const oralAirwayRecommendation = isOralAirwayMode
    ? getOralAirwayRecommendation(values.weight, values.ageYears)
    : null;
  const nasalAirwayRecommendation = isNasalAirwayMode
    ? getNasalAirwayRecommendation(values.weight, values.ageYears)
    : null;
  const laryngoscopeRecommendation = isLaryngoscopeMode
    ? getLaryngoscopeRecommendation(values.weight, values.ageYears)
    : null;
  const faceMaskRecommendation = isFaceMaskMode
    ? getFaceMaskRecommendation(values.weight, values.ageYears)
    : null;
  const referenceIds = getPediatricAirwayReferenceIds(values);
  const ageText = isPositiveNumber(values.ageYears) ? `${formatNumber(values.ageYears, 1)} yr` : t("age_not_entered");
  const weightText = isPositiveNumber(values.weight) ? ` / ${formatNumber(values.weight, 1)} kg` : "";
  const isInfantRange = values.ageYears < 1;
  const airwayResultLabel = document.querySelector("#pediatric-airway-result-card .result-label");

  if (airwayResultLabel) {
    airwayResultLabel.textContent = isETTMode
      ? t("pediatric_ett_result")
      : isSupraglotticMode
        ? t("pediatric_supraglottic_result")
        : isOralAirwayMode
        ? t("pediatric_oral_airway_result")
        : isNasalAirwayMode
          ? t("pediatric_nasal_airway_result")
          : isFaceMaskMode
            ? t("pediatric_face_mask_result")
          : t("pediatric_laryngoscope_result");
  }

  pediatricAirwayPrimaryResult.textContent = isETTMode
    ? `Cuffed ${formatNumber(estimates.cuffedSize, 1)} / Uncuffed ${formatNumber(estimates.uncuffedSize, 1)}`
    : isSupraglotticMode
      ? `${SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label} ${supraglotticRecommendation ? `size ${supraglotticRecommendation.size}` : (currentLanguage === "en" ? "reference" : "참고값")}`
      : isOralAirwayMode
        ? (oralAirwayRecommendation ? `Oral airway size ${oralAirwayRecommendation.size} (${oralAirwayRecommendation.length})` : (currentLanguage === "en" ? "Oral airway reference" : "Oral airway 참고값"))
        : isNasalAirwayMode
          ? (currentLanguage === "en" ? "Nasal airway guide" : "Nasal airway 가이드")
          : isFaceMaskMode
            ? (faceMaskRecommendation ? `Face mask size ${faceMaskRecommendation.size}` : (currentLanguage === "en" ? "Face mask guide" : "Face mask 가이드"))
        : (laryngoscopeRecommendation ? laryngoscopeRecommendation.primaryBlade : (currentLanguage === "en" ? "Laryngoscope reference" : "Laryngoscope 참고값"));
  pediatricAirwaySecondaryLabel.textContent = isETTMode
    ? t("oral_depth_from_lip")
    : isSupraglotticMode
      ? t("reference_weight_range")
      : isOralAirwayMode
        ? t("sizing_method")
        : isNasalAirwayMode
          ? t("preferred_measurement")
          : isFaceMaskMode
            ? t("reference_band")
        : t("alternative_guide");
  pediatricAirwaySecondaryResult.textContent = isETTMode
    ? t("cm_from_lip", { depth: formatNumber(estimates.oralDepth, 1) })
    : isSupraglotticMode
      ? (supraglotticRecommendation ? `${supraglotticRecommendation.weightRange}` : t("enter_weight_size_range"))
      : isOralAirwayMode
        ? t("oral_airway_measure_method")
        : isNasalAirwayMode
          ? t("nasal_airway_measure_method")
          : isFaceMaskMode
            ? (faceMaskRecommendation ? faceMaskRecommendation.label : t("enter_age_or_weight_face_mask"))
        : (laryngoscopeRecommendation ? laryngoscopeRecommendation.secondaryBlade : t("enter_age_or_weight_blade"));
  pediatricAirwayContext.textContent = t("airway_age_context", { ageText: ageText, weightText: weightText });
  pediatricAirwayDeviceResult.textContent = isETTMode
    ? t("device_category_ett")
    : isSupraglotticMode
      ? (supraglotticRecommendation
        ? `${supraglotticRecommendation.deviceLabel} reference: size ${supraglotticRecommendation.size} (${supraglotticRecommendation.weightRange}, ${supraglotticRecommendation.sourceLabel})`
        : t("enter_supraglottic_reference", { deviceLabel: SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label }))
      : isOralAirwayMode
        ? (oralAirwayRecommendation
          ? t("device_reference_band", { label: oralAirwayRecommendation.label })
          : t("enter_age_or_weight_blade"))
        : isNasalAirwayMode
          ? (nasalAirwayRecommendation
            ? t("infant_depth_band", { depth: nasalAirwayRecommendation.insertionDepth, label: nasalAirwayRecommendation.label })
            : t("use_external_measurement_first"))
          : isFaceMaskMode
            ? (faceMaskRecommendation
              ? t("device_reference_band", { label: faceMaskRecommendation.label })
              : t("enter_face_mask_guide"))
        : (laryngoscopeRecommendation
          ? t("device_reference_band", { label: laryngoscopeRecommendation.label })
          : t("enter_laryngoscope_guide"));
  pediatricAirwaySizeExplanation.textContent = isETTMode
    ? `ETT size estimate: uncuffed = age/4 + 4, cuffed = age/4 + 3.5, rounded to available 0.5 mm ID sizes -> ${formatNumber(estimates.uncuffedSize, 1)} / ${formatNumber(estimates.cuffedSize, 1)} mm ID`
    : isSupraglotticMode
      ? t("suction_reference_size_only", { deviceLabel: SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label })
      : isOralAirwayMode
        ? (oralAirwayRecommendation
          ? t("oral_airway_quick_guide", { size: oralAirwayRecommendation.size, length: oralAirwayRecommendation.length, label: oralAirwayRecommendation.label.toLowerCase() })
          : t("oral_airway_reference_only"))
        : isNasalAirwayMode
          ? t("nasal_airway_external_measurement")
          : isFaceMaskMode
            ? (faceMaskRecommendation
              ? t("face_mask_quick_guide", { size: faceMaskRecommendation.size, label: faceMaskRecommendation.label.toLowerCase() })
              : t("face_mask_reference_only"))
        : (laryngoscopeRecommendation
          ? t("laryngoscope_quick_guide", { blade: laryngoscopeRecommendation.primaryBlade, label: laryngoscopeRecommendation.label.toLowerCase() })
          : t("laryngoscope_reference_only"));
  pediatricAirwayDepthExplanation.textContent = isETTMode
    ? `${values.ageYears < 2
      ? t("ett_depth_under_two")
      : t("ett_depth_age_formula", { depth: formatNumber(estimates.oralDepth, 1) })} ${t("ett_depth_crosscheck", { depth: formatNumber(estimates.cuffedDepthBySize, 1) })}`
    : isSupraglotticMode
      ? t("supraglottic_depth_note", { deviceLabel: SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label })
      : isOralAirwayMode
        ? t("oral_airway_depth_note")
        : isNasalAirwayMode
          ? (nasalAirwayRecommendation
            ? t("nasal_airway_infant_study", { depth: nasalAirwayRecommendation.insertionDepth })
            : t("nasal_airway_depth_note"))
          : isFaceMaskMode
            ? t("face_mask_depth_note")
        : t("laryngoscope_depth_note");
  pediatricAirwayResultWarning.textContent = isETTMode
    ? isInfantRange
      ? t("airway_warning_ett_infant")
      : t("airway_warning_ett")
    : isSupraglotticMode
      ? t("airway_warning_supraglottic", { deviceLabel: SUPRAGLOTTIC_DEVICE_GUIDES[values.deviceModel].label })
      : isOralAirwayMode
        ? t("airway_warning_oral")
        : isNasalAirwayMode
          ? t("airway_warning_nasal")
          : isFaceMaskMode
            ? t("airway_warning_face_mask")
        : t("airway_warning_laryngoscope");
  renderReferenceList(pediatricAirwayReferenceList, referenceIds);
  pediatricAirwayResultCard.classList.remove("hidden");
}

function showDantroleneResult(values) {
  const initialDoseMg = calculateDantroleneDose(values.weight, values.initialDoseMgKg);
  const maxDoseMg = calculateDantroleneDose(values.weight, values.formulation.cumulativeMaxMgKg);
  const initialVials = Math.ceil(initialDoseMg / values.formulation.vialStrengthMg);
  const maxVials = Math.ceil(maxDoseMg / values.formulation.vialStrengthMg);

  dantrolenePrimaryResult.textContent = `${formatNumber(initialDoseMg, 1)} mg`;
  dantroleneSecondaryResult.textContent = `${formatNumber(maxDoseMg, 1)} mg (${values.formulation.cumulativeMaxMgKg} mg/kg)`;
  dantroleneContext.textContent = `${formatNumber(values.weight, 1)} kg / ${values.formulation.name} / target ${formatNumber(values.initialDoseMgKg, 2)} mg/kg`;
  dantroleneInitialVials.textContent = `${initialVials} vial(s)`;
  dantroleneMaxVials.textContent = `${maxVials} vial(s)`;
  dantroleneVialExplanation.textContent = t("dantrolene_vial_explanation", {
    formulation: values.formulation.name,
    initialVials: initialVials,
    maxVials: maxVials
  });
  dantroleneReconstitutionExplanation.textContent = `${values.formulation.reconstitution} ${values.formulation.notes}`;
  dantroleneInitialGuide.textContent = t("dantrolene_initial_guide", {
    dose: formatNumber(values.initialDoseMgKg, 2)
  });
  dantroleneRepeatGuide.textContent = t("dantrolene_repeat_guide");
  dantroleneMaintenanceGuide.textContent = t("dantrolene_maintenance_guide");
  renderReferenceList(dantroleneReferenceList, values.formulation.references);
  dantroleneResultWarning.textContent = t("dantrolene_emergency_reference_only");
  dantroleneResultCard.classList.remove("hidden");
}

// -----------------------------
// Event handlers
// -----------------------------

function handleSubmit(event) {
  event.preventDefault();

  const values = readInfusionFormValues();
  const validationError = validateInfusionValues(values);

  if (validationError) {
    errorMessage.textContent = validationError;
    clearResult();
    return;
  }

  errorMessage.textContent = "";
  clearResult();

  if (values.mode === "dose-to-rate") {
    showDoseToRateResult(values);
    return;
  }

  if (values.mode === "rate-to-dose") {
    showRateToDoseResult(values);
    return;
  }

  showReferenceTableResult(values);
}

function resetInfusionForm() {
  persistedState = normalizePersistedState({
    ...persistedState,
    singleDrug: createDefaultSingleDrugState()
  });
  savePersistedState(persistedState);
  form.reset();
  applySingleDrugStateToView(getSingleDrugState());
  activateInfusionMode(getSingleDrugState().activeMode);
  updateDrugUI();
  clearResult();
  errorMessage.textContent = "";
}

function handleDrugChange() {
  updateSingleDrugState({
    selectedDrugId: sanitizeSelectedDrugId(drugSelect.value)
  });
  recordRecentDrug(drugSelect.value);
  updateDrugUI();
  clearResult();
  errorMessage.textContent = "";
}

function handleSessionInputChange() {
  commitSingleDrugStateFromView();
  updateDrugUI();
  clearResult();
}

function handleDrugSettingsChange() {
  commitSingleDrugStateFromView();
  updateDrugUI();
  clearResult();
}

function handleNitroglycerinDoseViewChange() {
  const selectedDrug = getSelectedDrugDefinition();
  const currentWeight = Number(inputs.weight.value);
  const previousView = getPreferredNitroglycerinDoseView();
  const nextView = getSelectedNitroglycerinDoseView();

  if (!isNitroglycerinDrug(selectedDrug)) {
    return;
  }

  if (previousView === nextView) {
    return;
  }

  if (nextView === "mcg/kg/min" && !isPositiveNumber(currentWeight)) {
    nitroglycerinDoseViewSelect.value = previousView;
    if (nitroglycerinDoseViewHelp) {
      nitroglycerinDoseViewHelp.textContent = t("nitroglycerin_unit_help_weight_needed");
    }
    errorMessage.textContent = t("validation_ntg_weight_for_kg_unit");
    return;
  }

  const currentTargetDose = Number(inputs.targetDose.value);
  const currentReferenceDoseList = parseDoseList(inputs.referenceDoseList.value);

  if (isPositiveNumber(currentTargetDose)) {
    const canonicalTargetDose = convertDoseValueToReferenceUnit(
      currentTargetDose,
      selectedDrug,
      currentWeight,
      previousView
    );
    inputs.targetDose.value = formatEditableDoseValue(
      convertDoseValueForDisplay(canonicalTargetDose, selectedDrug, currentWeight, nextView)
    );
  }

  if (currentReferenceDoseList) {
    const canonicalReferenceDoseList = convertDoseListToReferenceUnit(
      currentReferenceDoseList,
      selectedDrug,
      currentWeight,
      previousView
    );
    inputs.referenceDoseList.value = formatEditableDoseList(
      convertDoseListForDisplay(canonicalReferenceDoseList, selectedDrug, currentWeight, nextView)
    );
  }

  updateSingleDrugState({
    nitroglycerinDoseUnitView: nextView
  });
  commitSingleDrugStateFromView();
  updateDrugUI();
  clearResult();
  errorMessage.textContent = "";
}

function handleFavoriteDrugToggle() {
  toggleFavoriteDrug(drugSelect.value);
  updateDrugUI();
}

function handleQuickDrugSelect(event) {
  const removeQuickDrugButton = event.target.closest("[data-remove-quick-drug-id]");

  if (removeQuickDrugButton) {
    removeRecentDrug(removeQuickDrugButton.dataset.removeQuickDrugId);
    updateQuickDrugUI();
    return;
  }

  const quickDrugButton = event.target.closest("[data-quick-drug-id]");

  if (!quickDrugButton) {
    return;
  }

  drugSelect.value = quickDrugButton.dataset.quickDrugId;
  handleDrugChange();
}

function handleDilutionApply() {
  const dilutionPreset = getSelectedDrugDilutionPreset();

  if (!dilutionPreset) {
    return;
  }

  inputs.concentration.value = String(dilutionPreset.finalConcentration);
  commitSingleDrugStateFromView();
  updateDrugUI();
  clearResult();
  errorMessage.textContent = "";
}

function setLanguage(language) {
  currentLanguage = language === "en" ? "en" : "ko";
  saveLanguagePreference(currentLanguage);
  applyStaticTranslations();
  updateFeedbackLinks();
  updateSupportLinks();
  updateQuickDrugUI();
  updateDrugUI();
  updatePediatricDrugUI();
  renderInfusionWorkspace();
  clearResult();
  clearPediatricResult();
  clearDantroleneResult();
}

function handlePediatricSubmit(event) {
  event.preventDefault();

  const values = readPediatricFormValues();
  const validationError = validatePediatricValues(values);

  if (validationError) {
    pediatricErrorMessage.textContent = validationError;
    clearPediatricResult();
    return;
  }

  pediatricErrorMessage.textContent = "";
  clearPediatricResult();
  if (values.mode === "airway") {
    showPediatricAirwayResult(values);
    return;
  }

  showPediatricDoseResult(values);
}

function handlePediatricDrugChange() {
  const selectedOptionValue = pediatricDrugSelect.value;
  const selectedSavedCustomDrugId = getSavedCustomDrugIdFromOptionValue(selectedOptionValue);

  if (selectedSavedCustomDrugId) {
    const savedDrug = getSavedCustomPediatricDrugs().find(function (item) {
      return item.id === selectedSavedCustomDrugId;
    });

    if (savedDrug) {
      applySavedCustomPediatricDrug(savedDrug);
    }
  } else {
    updatePediatricDoseState({
      selectedDrugId: sanitizePediatricSelectedDrugId(selectedOptionValue),
      activeSavedCustomDrugId: ""
    });
  }

  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

function handlePediatricInputChange() {
  const selectedOptionValue = pediatricDrugSelect.value;
  const drugSettingsKey = isCustomPediatricSelection(selectedOptionValue) ? "custom" : selectedOptionValue;
  pediatricAirwayDeviceModelField.classList.toggle("hidden", pediatricInputs.airwayDeviceCategory.value !== "supraglottic");
  pediatricAirwayWarning.textContent = getPediatricAirwayWarningText(pediatricInputs.airwayDeviceCategory.value);

  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    selectedDrugId: sanitizePediatricSelectedDrugId(drugSettingsKey),
    activeSavedCustomDrugId: isCustomPediatricSelection(selectedOptionValue)
      ? getActiveSavedCustomPediatricDrugId()
      : "",
    inputs: {
      weight: pediatricInputs.weight.value,
      ageGroup: pediatricInputs.ageGroup.value,
      airwayAgeYears: pediatricInputs.airwayAgeYears.value,
      airwayWeight: pediatricInputs.airwayWeight.value,
      airwayDeviceCategory: pediatricInputs.airwayDeviceCategory.value,
      airwayDeviceModel: pediatricInputs.airwayDeviceModel.value
    },
    drugSettings: {
      ...getPediatricDoseState().drugSettings,
      [drugSettingsKey]: {
        concentration: pediatricInputs.concentration.value,
        customDrugName: pediatricInputs.customDrugName.value,
        customDrugNotes: pediatricInputs.customDrugNotes.value,
        minDosePerKg: pediatricInputs.minDosePerKg.value,
        maxDosePerKg: pediatricInputs.maxDosePerKg.value,
        doseUnit: pediatricInputs.doseUnit.value,
        concentrationUnit: pediatricInputs.concentrationUnit.value,
        maxTotalDose: pediatricInputs.maxTotalDose.value
      }
    }
  });
  savePersistedState(persistedState);
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

function handlePediatricCustomUnitChange(sourceField) {
  syncPediatricCustomUnits(sourceField);
  handlePediatricInputChange();
}

function handlePediatricSaveCustomDrug() {
  if (!isCustomPediatricSelection(pediatricDrugSelect.value)) {
    return;
  }

  const values = readPediatricFormValues();
  const validationError = validatePediatricValues(values);

  if (validationError) {
    pediatricErrorMessage.textContent = validationError;
    return;
  }

  const activeSavedCustomDrugId = getActiveSavedCustomPediatricDrugId();
  const savedDrug = createSavedCustomPediatricDrugFromView(activeSavedCustomDrugId);
  const updatedSavedCustomDrugs = getSavedCustomPediatricDrugs()
    .filter(function (item) {
      return item.id !== savedDrug.id;
    })
    .concat(savedDrug)
    .slice(-12);

  updatePediatricDoseState({
    savedCustomDrugs: updatedSavedCustomDrugs,
    activeSavedCustomDrugId: savedDrug.id
  });
  pediatricErrorMessage.textContent = activeSavedCustomDrugId
    ? (currentLanguage === "en" ? "Saved custom drug updated locally." : "저장된 custom drug가 로컬에서 업데이트되었습니다.")
    : (currentLanguage === "en" ? "Custom drug saved locally." : "Custom drug가 로컬에 저장되었습니다.");
  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
}

function handlePediatricDeleteSavedDrug() {
  const activeSavedCustomDrugId = getActiveSavedCustomPediatricDrugId();

  if (!activeSavedCustomDrugId) {
    return;
  }

  persistedState.pediatricDose = normalizePediatricDoseState({
    ...getPediatricDoseState(),
    selectedDrugId: "custom",
    activeSavedCustomDrugId: "",
    drugSettings: {
      ...getPediatricDoseState().drugSettings,
      custom: {
        ...createDefaultPediatricDrugSettings().custom
      }
    },
    savedCustomDrugs: getSavedCustomPediatricDrugs().filter(function (item) {
      return item.id !== activeSavedCustomDrugId;
    })
  });
  savePersistedState(persistedState);
  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = currentLanguage === "en"
    ? "Saved custom drug removed."
    : "저장된 custom drug가 삭제되었습니다.";
}

function handlePediatricToggleUnverified() {
  updatePediatricDoseState({
    showUnverifiedPresets: !getPediatricDoseState().showUnverifiedPresets
  });
  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

function handleDantroleneSubmit(event) {
  event.preventDefault();

  const values = readDantroleneFormValues();
  const validationError = validateDantroleneValues(values);

  if (validationError) {
    dantroleneErrorMessage.textContent = validationError;
    clearDantroleneResult();
    return;
  }

  dantroleneErrorMessage.textContent = "";
  clearDantroleneResult();
  showDantroleneResult(values);
}

function handleDantroleneInputChange() {
  updateDantroleneQuickState({
    inputs: {
      weight: dantroleneInputs.weight.value,
      formulationId: dantroleneInputs.formulation.value,
      initialDoseMgKg: dantroleneInputs.initialDose.value
    }
  });
  clearDantroleneResult();
  dantroleneErrorMessage.textContent = "";
}

function handleWorkspaceSharedWeightChange() {
  updateInfusionWorkspaceState({
    sharedWeight: workspaceSharedWeightInput.value
  });
  renderInfusionWorkspace();
}

function handleWorkspaceAddCard() {
  const workspaceState = getInfusionWorkspaceState();

  if ((workspaceState.cards || []).length >= 6) {
    workspaceHelp.textContent = t("workspace_limit_help");
    return;
  }

  updateInfusionWorkspaceState({
    cards: workspaceState.cards.concat(createDefaultInfusionWorkspaceCardState())
  });
  renderInfusionWorkspace();
}

function updateWorkspaceCardState(cardId, field, value, options) {
  const workspaceState = getInfusionWorkspaceState();
  const sharedWeight = Number(workspaceState.sharedWeight);
  const updatedCards = workspaceState.cards.map(function (card) {
    if (card.cardId !== cardId) {
      return card;
    }

    const preset = getDrugPresetById(card.selectedDrugId);

    if (field === "selectedDrugId") {
      const nextPreset = getDrugPresetById(value);
      return normalizeInfusionWorkspaceCardState({
        ...card,
        selectedDrugId: nextPreset.id,
        concentration: String(nextPreset.concentration),
        targetDose: String(nextPreset.referenceDoses[2] || nextPreset.referenceDoses[0] || card.targetDose),
        nitroglycerinDoseUnitView: isNitroglycerinDrug(nextPreset)
          ? sanitizeNitroglycerinDoseUnitView(card.nitroglycerinDoseUnitView)
          : "mcg/min"
      });
    }

    if (field === "nitroglycerinDoseUnitView") {
      if (!isNitroglycerinDrug(preset)) {
        return card;
      }

      const nextView = sanitizeNitroglycerinDoseUnitView(value);
      if (nextView === "mcg/kg/min" && !isPositiveNumber(sharedWeight)) {
        workspaceHelp.textContent = t("validation_ntg_weight_for_kg_unit");
        return card;
      }

      return normalizeInfusionWorkspaceCardState({
        ...card,
        nitroglycerinDoseUnitView: nextView
      });
    }

    if (field === "targetDose") {
      if (!isNitroglycerinDrug(preset) || value === "") {
        return normalizeInfusionWorkspaceCardState({
          ...card,
          targetDose: value
        });
      }

      const parsedTargetDose = Number(value);
      if (!Number.isFinite(parsedTargetDose)) {
        return normalizeInfusionWorkspaceCardState({
          ...card,
          targetDose: value
        });
      }

      const displayDoseUnit = sanitizeNitroglycerinDoseUnitView(
        (options && options.displayDoseUnit) || getWorkspaceNitroglycerinDoseView(card, sharedWeight)
      );
      const canonicalTargetDose = convertDoseValueToReferenceUnit(
        parsedTargetDose,
        preset,
        sharedWeight,
        displayDoseUnit
      );

      return normalizeInfusionWorkspaceCardState({
        ...card,
        targetDose: String(canonicalTargetDose)
      });
    }

    return normalizeInfusionWorkspaceCardState({
      ...card,
      [field]: value
    });
  });

  updateInfusionWorkspaceState({
    cards: updatedCards
  });
}

function handleWorkspaceCardClick(event) {
  const moveUpButton = event.target.closest("[data-move-workspace-card-up]");

  if (moveUpButton) {
    const cardId = moveUpButton.dataset.moveWorkspaceCardUp;
    const workspaceState = getInfusionWorkspaceState();
    const cardIndex = workspaceState.cards.findIndex(function (card) {
      return card.cardId === cardId;
    });

    if (cardIndex > 0) {
      const updatedCards = workspaceState.cards.slice();
      const currentCard = updatedCards[cardIndex];
      updatedCards[cardIndex] = updatedCards[cardIndex - 1];
      updatedCards[cardIndex - 1] = currentCard;
      updateInfusionWorkspaceState({ cards: updatedCards });
      renderInfusionWorkspace();
    }
    return;
  }

  const moveDownButton = event.target.closest("[data-move-workspace-card-down]");

  if (moveDownButton) {
    const cardId = moveDownButton.dataset.moveWorkspaceCardDown;
    const workspaceState = getInfusionWorkspaceState();
    const cardIndex = workspaceState.cards.findIndex(function (card) {
      return card.cardId === cardId;
    });

    if (cardIndex > -1 && cardIndex < workspaceState.cards.length - 1) {
      const updatedCards = workspaceState.cards.slice();
      const currentCard = updatedCards[cardIndex];
      updatedCards[cardIndex] = updatedCards[cardIndex + 1];
      updatedCards[cardIndex + 1] = currentCard;
      updateInfusionWorkspaceState({ cards: updatedCards });
      renderInfusionWorkspace();
    }
    return;
  }

  const applyDilutionButton = event.target.closest("[data-apply-workspace-dilution]");

  if (applyDilutionButton) {
    const cardId = applyDilutionButton.dataset.applyWorkspaceDilution;
    const workspaceState = getInfusionWorkspaceState();
    const targetCard = workspaceState.cards.find(function (card) {
      return card.cardId === cardId;
    });

    if (!targetCard) {
      return;
    }

    const preset = getDrugPresetById(targetCard.selectedDrugId);
    const dilutionPreset = preset.dilutionPresets[0];

    if (!dilutionPreset) {
      return;
    }

    updateWorkspaceCardState(cardId, "concentration", String(dilutionPreset.finalConcentration));
    workspaceHelp.textContent = `${preset.name} ${t("workspace_standard_dilution_note", { dilution: formatDilutionPreset(dilutionPreset) })}`;
    renderInfusionWorkspace();
    return;
  }

  const removeButton = event.target.closest("[data-remove-workspace-card-id]");

  if (removeButton) {
    const cardId = removeButton.dataset.removeWorkspaceCardId;
    const workspaceState = getInfusionWorkspaceState();
    const remainingCards = workspaceState.cards.filter(function (card) {
      return card.cardId !== cardId;
    });

    updateInfusionWorkspaceState({
      cards: remainingCards.length ? remainingCards : [createDefaultInfusionWorkspaceCardState()]
    });
    renderInfusionWorkspace();
    return;
  }
}

function handleWorkspaceCardInput(event) {
  const input = event.target.closest("[data-workspace-field]");

  if (!input) {
    return;
  }

  updateWorkspaceCardState(
    input.dataset.workspaceCardId,
    input.dataset.workspaceField,
    input.value,
    {
      displayDoseUnit: input.dataset.workspaceDoseDisplayUnit
    }
  );
}

function handleWorkspaceCardChange(event) {
  const input = event.target.closest("[data-workspace-field]");

  if (!input) {
    return;
  }

  updateWorkspaceCardState(
    input.dataset.workspaceCardId,
    input.dataset.workspaceField,
    input.value,
    {
      displayDoseUnit: input.dataset.workspaceDoseDisplayUnit
    }
  );
  renderInfusionWorkspace();
}

function handleWorkspaceTemplateSelectChange() {
  updateInfusionWorkspaceState({
    selectedTemplateId: workspaceTemplateSelect.value
  });
  renderInfusionWorkspace();
}

function handleWorkspaceSaveTemplate() {
  const templateName = workspaceTemplateNameInput.value.trim();
  const templateNote = workspaceTemplateNoteInput.value.trim();

  if (!templateName) {
    workspaceHelp.textContent = currentLanguage === "en" ? "Enter a template name before saving." : "저장하기 전에 template name을 입력해 주세요.";
    return;
  }

  const workspaceState = getInfusionWorkspaceState();
  const templates = getInfusionTemplates();
  const existingTemplate = templates.find(function (template) {
    return template.id === workspaceState.selectedTemplateId || template.name.toLowerCase() === templateName.toLowerCase();
  });
  const savedTemplate = createInfusionTemplateState(templateName, templateNote, workspaceState.cards, existingTemplate && existingTemplate.id);

  if (existingTemplate && existingTemplate.createdAt) {
    savedTemplate.createdAt = existingTemplate.createdAt;
  }

  const updatedTemplates = templates
    .filter(function (template) {
      return template.id !== savedTemplate.id;
    })
    .concat(savedTemplate)
    .slice(-10);

  updateInfusionTemplates(updatedTemplates);
  updateInfusionWorkspaceState({
    selectedTemplateId: savedTemplate.id
  });
  workspaceHelp.textContent = currentLanguage === "en"
    ? `Template saved: ${savedTemplate.name}. Saved setups load drug cards only and do not assess interactions.`
    : `Template 저장 완료: ${savedTemplate.name}. 저장된 setup은 drug card만 불러오며 interaction은 평가하지 않습니다.`;
  renderInfusionWorkspace();
}

function handleWorkspaceLoadTemplate() {
  const selectedTemplateId = workspaceTemplateSelect.value;
  const selectedTemplate = getInfusionTemplates().find(function (template) {
    return template.id === selectedTemplateId;
  });

  if (!selectedTemplate) {
    workspaceHelp.textContent = currentLanguage === "en" ? "Select a template to load first." : "불러올 template를 먼저 선택해 주세요.";
    return;
  }

  updateInfusionWorkspaceState({
    selectedTemplateId: selectedTemplate.id,
    cards: cloneWorkspaceCards(selectedTemplate.cards)
  });
  workspaceHelp.textContent = currentLanguage === "en"
    ? `Loaded template: ${selectedTemplate.name}. Shared weight remains based on the current patient.`
    : `불러온 template: ${selectedTemplate.name}. Shared weight는 현재 환자 기준으로 유지됩니다.`;
  renderInfusionWorkspace();
}

function handleWorkspaceDeleteTemplate() {
  const selectedTemplateId = workspaceTemplateSelect.value;

  if (!selectedTemplateId) {
    workspaceHelp.textContent = currentLanguage === "en" ? "Select a template to delete first." : "삭제할 template를 먼저 선택해 주세요.";
    return;
  }

  const selectedTemplate = getInfusionTemplates().find(function (template) {
    return template.id === selectedTemplateId;
  });

  updateInfusionTemplates(getInfusionTemplates().filter(function (template) {
    return template.id !== selectedTemplateId;
  }));
  updateInfusionWorkspaceState({
    selectedTemplateId: ""
  });
  workspaceTemplateNameInput.value = "";
  workspaceHelp.textContent = selectedTemplate
    ? (currentLanguage === "en" ? `Deleted template: ${selectedTemplate.name}.` : `삭제한 template: ${selectedTemplate.name}.`)
    : (currentLanguage === "en" ? "Template deleted." : "Template를 삭제했습니다.");
  renderInfusionWorkspace();
}

function resetDantroleneForm() {
  persistedState.dantroleneQuick = createDefaultDantroleneQuickState();
  savePersistedState(persistedState);
  dantroleneForm.reset();
  applyDantroleneQuickStateToView(getDantroleneQuickState());
  clearDantroleneResult();
  dantroleneErrorMessage.textContent = "";
}

function resetPediatricForm() {
  persistedState.pediatricDose = normalizePediatricDoseState({
    ...createDefaultPediatricDoseState(),
    savedCustomDrugs: getSavedCustomPediatricDrugs(),
    activeSavedCustomDrugId: ""
  });
  savePersistedState(persistedState);
  pediatricForm.reset();
  applyPediatricDoseStateToView(getPediatricDoseState());
  updatePediatricDrugUI();
  clearPediatricResult();
  pediatricErrorMessage.textContent = "";
}

// -----------------------------
// Wiring
// -----------------------------

infusionModeTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateInfusionMode(tab.dataset.infusionModeTab);
  });
});

infusionViewTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateInfusionView(tab.dataset.infusionViewTab);
  });
});

calculatorTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activateCalculator(tab.dataset.calculatorTab);
  });
});

pediatricModeTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    activatePediatricMode(tab.dataset.pediatricModeTab);
  });
});

drugSelect.addEventListener("change", handleDrugChange);
favoriteDrugButton.addEventListener("click", handleFavoriteDrugToggle);
favoriteDrugsContainer.addEventListener("click", handleQuickDrugSelect);
recentDrugsContainer.addEventListener("click", handleQuickDrugSelect);
drugDilutionButton.addEventListener("click", handleDilutionApply);
if (nitroglycerinDoseViewSelect) {
  nitroglycerinDoseViewSelect.addEventListener("change", handleNitroglycerinDoseViewChange);
}
form.addEventListener("submit", handleSubmit);
resetButton.addEventListener("click", resetInfusionForm);
pediatricDrugSelect.addEventListener("change", handlePediatricDrugChange);
pediatricInputs.ageGroup.addEventListener("change", handlePediatricInputChange);
pediatricForm.addEventListener("submit", handlePediatricSubmit);
pediatricResetButton.addEventListener("click", resetPediatricForm);
dantroleneForm.addEventListener("submit", handleDantroleneSubmit);
dantroleneResetButton.addEventListener("click", resetDantroleneForm);
workspaceSharedWeightInput.addEventListener("input", handleWorkspaceSharedWeightChange);
workspaceAddCardButton.addEventListener("click", handleWorkspaceAddCard);
workspaceTemplateSelect.addEventListener("change", handleWorkspaceTemplateSelectChange);
workspaceLoadTemplateButton.addEventListener("click", handleWorkspaceLoadTemplate);
workspaceSaveTemplateButton.addEventListener("click", handleWorkspaceSaveTemplate);
workspaceDeleteTemplateButton.addEventListener("click", handleWorkspaceDeleteTemplate);
workspaceCardList.addEventListener("input", handleWorkspaceCardInput);
workspaceCardList.addEventListener("change", handleWorkspaceCardChange);
workspaceCardList.addEventListener("click", handleWorkspaceCardClick);
pediatricSaveCustomButton.addEventListener("click", handlePediatricSaveCustomDrug);
pediatricDeleteCustomButton.addEventListener("click", handlePediatricDeleteSavedDrug);
pediatricToggleUnverifiedButton.addEventListener("click", handlePediatricToggleUnverified);
pediatricInputs.doseUnit.addEventListener("change", function () {
  handlePediatricCustomUnitChange("dose");
});
pediatricInputs.concentrationUnit.addEventListener("change", function () {
  handlePediatricCustomUnitChange("concentration");
});

[
  inputs.weight,
  inputs.targetDose,
  inputs.pumpRate
].forEach(function (input) {
  input.addEventListener("input", handleSessionInputChange);
});

[
  inputs.concentration,
  inputs.referenceDoseList,
  inputs.customDrugName,
  inputs.customDrugNotes
].forEach(function (input) {
  input.addEventListener("input", handleDrugSettingsChange);
});

[
  pediatricInputs.weight,
  pediatricInputs.ageGroup,
  pediatricInputs.concentration,
  pediatricInputs.airwayAgeYears,
  pediatricInputs.airwayWeight,
  pediatricInputs.airwayDeviceCategory,
  pediatricInputs.airwayDeviceModel,
  pediatricInputs.customDrugName,
  pediatricInputs.customDrugNotes,
  pediatricInputs.minDosePerKg,
  pediatricInputs.maxDosePerKg,
  pediatricInputs.maxTotalDose
].forEach(function (input) {
  input.addEventListener("input", handlePediatricInputChange);
  if (input.tagName === "SELECT") {
    input.addEventListener("change", handlePediatricInputChange);
  }
});

[
  dantroleneInputs.weight,
  dantroleneInputs.formulation,
  dantroleneInputs.initialDose
].forEach(function (input) {
  input.addEventListener("input", handleDantroleneInputChange);
  if (input.tagName === "SELECT") {
    input.addEventListener("change", handleDantroleneInputChange);
  }
});

// -----------------------------
// Dilution Calculator Event Listeners
// -----------------------------

dilutionInputs.modeTabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    const modeId = tab.dataset.dilutionModeTab;
    activateDilutionMode(modeId);
  });
});

dilutionInputs.form.addEventListener("submit", function (e) {
  e.preventDefault();
  dilutionInputs.errorMessage.textContent = "";

  const activeModeTab = document.querySelector("[data-dilution-mode-tab].is-active");
  const modeId = activeModeTab ? activeModeTab.dataset.dilutionModeTab : "target-to-mix";

  try {
    if (modeId === "target-to-mix") {
      const targetConc = Number(dilutionInputs.targetConcentration.value);
      const targetUnit = dilutionInputs.targetUnit.value; // "mcg" or "mg"
      const finalVolume = Number(dilutionInputs.finalVolume.value);
      const stockConc = Number(dilutionInputs.stockConcentration.value);
      const stockUnit = dilutionInputs.stockUnit.value; // "mcg" or "mg"

      if (!isPositiveNumber(targetConc)) throw new Error(t("dilution_error_target_concentration"));
      if (!isPositiveNumber(finalVolume)) throw new Error(t("dilution_error_final_volume"));
      if (!isPositiveNumber(stockConc)) throw new Error(t("dilution_error_stock_concentration"));

      // Convert target back to mg/mL for calculation base
      const targetConcMg = targetUnit === "mcg" ? targetConc / 1000 : targetConc;
      const totalDrugMgNeeded = targetConcMg * finalVolume;
      
      const stockConcMg = stockUnit === "mcg" ? stockConc / 1000 : stockConc;
      const drawVolume = totalDrugMgNeeded / stockConcMg;

      if (drawVolume > finalVolume) {
        throw new Error(t("dilution_error_dilution_impossible"));
      }

      const diluentVolume = finalVolume - drawVolume;

      const formattedDrawVol = Number(drawVolume.toFixed(2));
      const formattedDiluentVol = Number(diluentVolume.toFixed(2));
      const totalDrugDisplay = targetUnit === "mcg" ? (totalDrugMgNeeded * 1000).toFixed(1) + " mcg" : totalDrugMgNeeded.toFixed(2) + " mg";

      dilutionInputs.resultLabel.textContent = t("dilution_result_mix");
      dilutionInputs.resultBox2.classList.remove("hidden");
      dilutionInputs.resultTitle1.textContent = t("dilution_result_draw_volume");
      dilutionInputs.resultValue1.textContent = `${formattedDrawVol} mL`;
      dilutionInputs.resultTitle2.textContent = t("dilution_result_add_diluent");
      dilutionInputs.resultValue2.textContent = `${formattedDiluentVol} mL`;
      dilutionInputs.summaryHeading.textContent = t("dilution_result_summary");
      dilutionInputs.summaryText.innerHTML = currentLanguage === "en"
        ? `To achieve <strong>${targetConc} ${targetUnit}/mL</strong> in <strong>${finalVolume} mL</strong> (Total drug: ${totalDrugDisplay}):<br>Draw <strong>${formattedDrawVol} mL</strong> of stock drug and mix with <strong>${formattedDiluentVol} mL</strong> of diluent.`
        : `<strong>${targetConc} ${targetUnit}/mL</strong> 농도를 <strong>${finalVolume} mL</strong>로 만들려면 (총 약물량: ${totalDrugDisplay}):<br>원액 약물 <strong>${formattedDrawVol} mL</strong>를 뽑고 diluent <strong>${formattedDiluentVol} mL</strong>를 추가하세요.`;

    } else if (modeId === "mix-to-conc") {
      const drugAmount = Number(dilutionInputs.reverseDrugAmount.value);
      const drugUnit = dilutionInputs.reverseDrugUnit.value; // "mcg" or "mg"
      const finalVolume = Number(dilutionInputs.reverseFinalVolume.value);

      if (!isPositiveNumber(drugAmount)) throw new Error(t("dilution_error_drug_amount"));
      if (!isPositiveNumber(finalVolume)) throw new Error(t("dilution_error_final_volume"));

      const drugAmountMg = drugUnit === "mcg" ? drugAmount / 1000 : drugAmount;
      const finalConcMg = drugAmountMg / finalVolume;
      const finalConcMcg = finalConcMg * 1000;

      const formattedMg = Number(finalConcMg.toFixed(2));
      const formattedMcg = Number(finalConcMcg.toFixed(1));

      dilutionInputs.resultLabel.textContent = t("dilution_result_final_concentration");
      dilutionInputs.resultBox2.classList.add("hidden");
      dilutionInputs.resultTitle1.textContent = t("dilution_result_target_conc");
      
      if (formattedMg >= 1) {
        dilutionInputs.resultValue1.textContent = `${formattedMg} mg/mL`;
      } else {
        dilutionInputs.resultValue1.textContent = `${formattedMcg} mcg/mL`;
      }

      dilutionInputs.summaryHeading.textContent = t("dilution_result_calculated");
      dilutionInputs.summaryText.innerHTML = currentLanguage === "en"
        ? `Mixing <strong>${drugAmount} ${drugUnit}</strong> in a total volume of <strong>${finalVolume} mL</strong> yields a final concentration of:<br><strong style="font-size: 1.1em; color: var(--primary);">${formattedMg} mg/mL</strong> (or ${formattedMcg} mcg/mL).`
        : `총 <strong>${finalVolume} mL</strong>에 <strong>${drugAmount} ${drugUnit}</strong>를 섞으면 최종 농도는 다음과 같습니다:<br><strong style="font-size: 1.1em; color: var(--primary);">${formattedMg} mg/mL</strong> (또는 ${formattedMcg} mcg/mL).`;
    }

    dilutionInputs.resultCard.classList.remove("hidden");
    
  } catch (error) {
    dilutionInputs.errorMessage.textContent = error.message;
    dilutionInputs.resultCard.classList.add("hidden");
  }
});

dilutionInputs.resetButton.addEventListener("click", function () {
  dilutionInputs.form.reset();
  dilutionInputs.resultCard.classList.add("hidden");
  dilutionInputs.errorMessage.textContent = "";
});

if (languageSelect) {
  languageSelect.addEventListener("change", function () {
    setLanguage(languageSelect.value);
  });
}

// -----------------------------
// Initial restore
// -----------------------------

currentLanguage = loadLanguagePreference();
applyStaticTranslations();
updateFeedbackLinks();
updateSupportLinks();
applySingleDrugStateToView(getSingleDrugState());
applyPediatricDoseStateToView(getPediatricDoseState());
applyDantroleneQuickStateToView(getDantroleneQuickState());
activateCalculator("infusion");
activateInfusionView(getInfusionWorkspaceState().activeView);
activateInfusionMode(getSingleDrugState().activeMode);
updateDrugUI();
updatePediatricDrugUI();
renderInfusionWorkspace();
clearResult();
clearPediatricResult();
clearDantroleneResult();
