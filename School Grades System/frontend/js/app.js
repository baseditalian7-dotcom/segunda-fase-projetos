const form = document.querySelector("#gradeForm");
const studentNameInput = document.querySelector("#studentName");
const gradeInputs = document.querySelectorAll(".grade-input");
const averageValue = document.querySelector("#averageValue");
const progressBar = document.querySelector("#progressBar");
const resultPanel = document.querySelector("#result");
const statusText = document.querySelector("#statusText");
const feedbackText = document.querySelector("#feedbackText");
const clearButton = document.querySelector("#clearButton");
const reportList = document.querySelector("#reportList");

let reports = [];

function getGrades() {
    const grades = [];

    gradeInputs.forEach(function (input) {
        const grade = Number(input.value);

        if (input.value !== "" && grade >= 0 && grade <= 10) {
            grades.push(grade);
        }
    });

    return grades;
}

function calculateAverage(grades) {
    if (grades.length === 0) {
        return 0;
    }

    let total = 0;

    grades.forEach(function (grade) {
        total = total + grade;
    });

    return total / grades.length;
}

function updateResult() {
    const grades = getGrades();
    const average = calculateAverage(grades);
    const percentage = average * 10;

    averageValue.textContent = average.toFixed(1);
    progressBar.style.width = `${percentage}%`;

    resultPanel.classList.remove("approved", "failed", "waiting");

    if (grades.length < gradeInputs.length) {
        resultPanel.classList.add("waiting");
        statusText.textContent = "Aguardando notas";
        feedbackText.textContent = "Preencha todas as notas para liberar o resultado final.";
        return;
    }

    if (average >= 7) {
        resultPanel.classList.add("approved");
        statusText.textContent = "Aprovado";
        feedbackText.textContent = "Bom resultado. O aluno atingiu a média mínima.";
    } else {
        resultPanel.classList.add("failed");
        statusText.textContent = "Reprovado";
        feedbackText.textContent = "A média ficou abaixo de 7. O aluno precisa melhorar.";
    }
}

function renderReports() {
    reportList.innerHTML = "";

    if (reports.length === 0) {
        reportList.innerHTML = '<p class="empty-message">Nenhum boletim adicionado ainda.</p>';
        return;
    }

    reports.forEach(function (report) {
        const card = document.createElement("article");
        const statusClass = report.status === "Aprovado" ? "approved-label" : "failed-label";

        card.className = "report-card";
        card.innerHTML = `
            <div>
                <strong>${report.name}</strong>
                <span>Média: ${report.average.toFixed(1)} | Notas: ${report.grades.join(", ")}</span>
            </div>
            <div class="report-status ${statusClass}">${report.status}</div>
        `;

        reportList.appendChild(card);
    });
}

function clearForm() {
    studentNameInput.value = "";

    gradeInputs.forEach(function (input) {
        input.value = "";
    });

    updateResult();
}

gradeInputs.forEach(function (input) {
    input.addEventListener("input", updateResult);
});

form.addEventListener("submit", function (event) {
    const grades = getGrades();
    const average = calculateAverage(grades);
    const name = studentNameInput.value.trim() || "Aluno sem nome";

    event.preventDefault();

    if (grades.length < gradeInputs.length) {
        feedbackText.textContent = "Preencha as quatro notas antes de adicionar o boletim.";
        return;
    }

    reports.unshift({
        name: name,
        grades: grades,
        average: average,
        status: average >= 7 ? "Aprovado" : "Reprovado"
    });

    renderReports();
    clearForm();
});

clearButton.addEventListener("click", clearForm);

updateResult();
renderReports();
