// 필요한 HTML 요소를 먼저 찾습니다.
const form = document.getElementById("dose-form");
const resetButton = document.getElementById("reset-button");
const errorMessage = document.getElementById("error-message");
const resultCard = document.getElementById("result-card");
const rateRange = document.getElementById("rate-range");
const pumpSettingRange = document.getElementById("pump-setting-range");
const concentrationResult = document.getElementById("concentration-result");
const concentrationExplanation = document.getElementById("concentration-explanation");
const rateExplanation = document.getElementById("rate-explanation");
const drugSelect = document.getElementById("drug-select");
const drugHelp = document.getElementById("drug-help");
const modeInputs = document.querySelectorAll('input[name="concentration-mode"]');
const modeFields = document.querySelectorAll(".mode-field");

// 약물별 예시 농도입니다. 사용자는 이 값을 직접 바꿀 수 있습니다.
const drugExamples = {
  propofol: 10,
  remifentanil: 0.05,
  dexmedetomidine: 0.004
};

const inputs = {
  weight: document.getElementById("weight"),
  drugAmount: document.getElementById("drug-amount"),
  totalVolume: document.getElementById("total-volume"),
  directConcentration: document.getElementById("direct-concentration"),
  doseMin: document.getElementById("dose-min"),
  doseMax: document.getElementById("dose-max")
};

// 결과 숫자를 보기 쉽게 소수 둘째 자리까지 표시합니다.
function formatNumber(value) {
  return Number(value).toFixed(2);
}

function formatPumpStep(value) {
  return Number(value).toFixed(1);
}

function roundUpToTenth(value) {
  return Math.ceil(value * 10) / 10;
}

function roundDownToTenth(value) {
  return Math.floor(value * 10) / 10;
}

function updateDrugExample() {
  const selectedDrug = drugSelect.value;
  const exampleConcentration = drugExamples[selectedDrug];

  if (!selectedDrug || exampleConcentration === undefined) {
    drugHelp.textContent = "약물을 선택하면 예시 농도(mg/mL)가 자동 입력됩니다. 필요하면 직접 수정할 수 있습니다.";
    return;
  }

  inputs.directConcentration.value = String(exampleConcentration);
  drugHelp.textContent = `${selectedDrug} 예시 농도 ${formatNumber(exampleConcentration)} mg/mL를 자동 입력했습니다. 필요하면 수정할 수 있습니다.`;
}

function getSelectedMode() {
  const selectedInput = document.querySelector('input[name="concentration-mode"]:checked');
  return selectedInput ? selectedInput.value : "mix";
}

// 입력값을 읽고 숫자로 변환합니다.
function readValues() {
  return {
    mode: getSelectedMode(),
    weight: Number(inputs.weight.value),
    drugAmount: Number(inputs.drugAmount.value),
    totalVolume: Number(inputs.totalVolume.value),
    directConcentration: Number(inputs.directConcentration.value),
    doseMin: Number(inputs.doseMin.value),
    doseMax: Number(inputs.doseMax.value)
  };
}

// 빈칸, 문자, 0 이하 값, 최소/최대 범위를 검사합니다.
function validateValues(values) {
  const commonFields = [
    { key: "weight", label: "환자 체중" },
    { key: "doseMin", label: "목표 투여량 최소값" },
    { key: "doseMax", label: "목표 투여량 최대값" }
  ];

  const modeFieldsToCheck = values.mode === "mix"
    ? [
      { key: "drugAmount", label: "약물 총량" },
      { key: "totalVolume", label: "희석 후 총 부피" }
    ]
    : [
      { key: "directConcentration", label: "약물 농도" }
    ];

  const fields = [...commonFields, ...modeFieldsToCheck];

  for (const field of fields) {
    const rawValue = inputs[field.key].value.trim();

    if (rawValue === "") {
      return `${field.label}을(를) 입력해 주세요.`;
    }

    if (!Number.isFinite(values[field.key])) {
      return `${field.label}에는 숫자만 입력할 수 있습니다.`;
    }

    if (values[field.key] <= 0) {
      return `${field.label}은(는) 0보다 커야 합니다.`;
    }
  }

  if (values.doseMin > values.doseMax) {
    return "목표 투여량 최소값은 최대값보다 클 수 없습니다.";
  }

  return "";
}

// 계산 결과를 화면에 출력합니다.
function showResult(values) {
  const concentrationMgPerMl = values.mode === "mix"
    ? values.drugAmount / values.totalVolume
    : values.directConcentration;
  const concentrationMcgPerMl = concentrationMgPerMl * 1000;

  const minRateMlPerHr = (values.doseMin * values.weight * 60) / concentrationMcgPerMl;
  const maxRateMlPerHr = (values.doseMax * values.weight * 60) / concentrationMcgPerMl;
  const recommendedMin = roundUpToTenth(minRateMlPerHr);
  const recommendedMax = roundDownToTenth(maxRateMlPerHr);
  const safeRecommendedMax = recommendedMax >= recommendedMin ? recommendedMax : recommendedMin;

  rateRange.textContent = `${formatNumber(minRateMlPerHr)} mL/hr ~ ${formatNumber(maxRateMlPerHr)} mL/hr`;
  pumpSettingRange.textContent = `${formatPumpStep(recommendedMin)} mL/hr ~ ${formatPumpStep(safeRecommendedMax)} mL/hr`;
  concentrationResult.textContent = `혼합 농도: ${formatNumber(concentrationMgPerMl)} mg/mL`;

  if (values.mode === "mix") {
    concentrationExplanation.textContent =
      `농도 계산: ${formatNumber(values.drugAmount)} mg ÷ ${formatNumber(values.totalVolume)} mL = ${formatNumber(concentrationMgPerMl)} mg/mL`;
  } else {
    concentrationExplanation.textContent =
      `농도 입력: 사용자가 ${formatNumber(values.directConcentration)} mg/mL를 직접 입력했고, 이 값을 계산에 그대로 사용했습니다.`;
  }

  rateExplanation.textContent =
    `주입 속도 계산: (목표 투여량 mcg/kg/min × 체중 kg × 60분) ÷ 농도 mcg/mL로 계산했습니다. 현재 범위는 ${formatNumber(values.doseMin)}~${formatNumber(values.doseMax)} mcg/kg/min 기준입니다.`;

  resultCard.classList.remove("hidden");
}

function updateModeFields() {
  const selectedMode = getSelectedMode();

  modeFields.forEach(function (field) {
    const shouldShow = field.dataset.mode === selectedMode;
    field.classList.toggle("hidden", !shouldShow);
  });
}

function clearResult() {
  resultCard.classList.add("hidden");
  rateRange.textContent = "0.00 mL/hr ~ 0.00 mL/hr";
  pumpSettingRange.textContent = "0.1 mL/hr ~ 0.2 mL/hr";
  concentrationResult.textContent = "";
  concentrationExplanation.textContent = "";
  rateExplanation.textContent = "";
}

modeInputs.forEach(function (input) {
  input.addEventListener("change", function () {
    errorMessage.textContent = "";
    clearResult();
    updateModeFields();
  });
});

drugSelect.addEventListener("change", function () {
  errorMessage.textContent = "";
  clearResult();
  updateDrugExample();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const values = readValues();
  const validationError = validateValues(values);

  if (validationError) {
    errorMessage.textContent = validationError;
    clearResult();
    return;
  }

  errorMessage.textContent = "";
  showResult(values);
});

resetButton.addEventListener("click", function () {
  form.reset();
  errorMessage.textContent = "";
  clearResult();
  updateModeFields();
  updateDrugExample();
});

updateModeFields();
updateDrugExample();
