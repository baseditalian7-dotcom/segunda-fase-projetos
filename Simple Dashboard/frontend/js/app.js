const menuLinks = document.querySelectorAll("[data-menu-link]");
const sections = document.querySelectorAll(".page-section");
const kpiGrid = document.querySelector("#kpis");
const barChart = document.querySelector("#barChart");
const totalRevenueText = document.querySelector("#totalRevenueText");
const summaryTitle = document.querySelector("#summaryTitle");
const summaryText = document.querySelector("#summaryText");
const miniSummary = document.querySelector("#miniSummary");
const departmentGrid = document.querySelector("#departmentGrid");

const dashboardData = {
    kpis: [
        { label: "Receita", value: "R$ 42.800", change: "+14% vs. mês anterior" },
        { label: "Pedidos", value: "318", change: "+32 novos pedidos" },
        { label: "Clientes", value: "96", change: "+11 clientes ativos" },
        { label: "Satisfação", value: "94%", change: "média das avaliações" }
    ],
    weeklyRevenue: [
        { label: "Sem. 1", value: 8200 },
        { label: "Sem. 2", value: 9600 },
        { label: "Sem. 3", value: 11300 },
        { label: "Sem. 4", value: 13700 }
    ],
    summary: {
        title: "Crescimento consistente",
        text: "Os dados simulados mostram melhora nas vendas, boa retenção de clientes e operação estável.",
        items: [
            { label: "Meta mensal", value: "82%" },
            { label: "Ticket médio", value: "R$ 134" },
            { label: "Novos leads", value: "148" },
            { label: "Recompra", value: "37%" }
        ]
    },
    departments: [
        { name: "Vendas", revenue: "R$ 18.900", result: "alto desempenho" },
        { name: "Marketing", revenue: "R$ 12.400", result: "bom alcance" },
        { name: "Suporte", revenue: "94%", result: "satisfação" }
    ]
};

function setActiveMenu(sectionId) {
    menuLinks.forEach(function (link) {
        link.classList.toggle("active", link.dataset.menuLink === sectionId);
    });
}

function renderKpis() {
    kpiGrid.innerHTML = "";

    dashboardData.kpis.forEach(function (kpi) {
        const card = document.createElement("article");
        card.className = "kpi-card";
        card.innerHTML = `
            <small>${kpi.label}</small>
            <strong>${kpi.value}</strong>
            <span>${kpi.change}</span>
        `;
        kpiGrid.appendChild(card);
    });
}

function renderChart() {
    const totalRevenue = dashboardData.weeklyRevenue.reduce(function (total, week) {
        return total + week.value;
    }, 0);

    const biggestValue = Math.max(...dashboardData.weeklyRevenue.map(function (week) {
        return week.value;
    }));

    totalRevenueText.textContent = totalRevenue.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    });

    barChart.innerHTML = "";

    dashboardData.weeklyRevenue.forEach(function (week) {
        const height = Math.max(18, (week.value / biggestValue) * 100);
        const item = document.createElement("div");

        item.className = "bar-item";
        item.innerHTML = `
            <div class="bar" style="height: ${height}%"></div>
            <span class="bar-label">${week.label}</span>
        `;
        barChart.appendChild(item);
    });
}

function renderSummary() {
    summaryTitle.textContent = dashboardData.summary.title;
    summaryText.textContent = dashboardData.summary.text;
    miniSummary.innerHTML = "";

    dashboardData.summary.items.forEach(function (item) {
        const miniItem = document.createElement("div");
        miniItem.className = "mini-item";
        miniItem.innerHTML = `
            <small>${item.label}</small>
            <strong>${item.value}</strong>
        `;
        miniSummary.appendChild(miniItem);
    });
}

function renderDepartments() {
    departmentGrid.innerHTML = "";

    dashboardData.departments.forEach(function (department) {
        const card = document.createElement("article");
        card.className = "department-card";
        card.innerHTML = `
            <span>${department.name}</span>
            <strong>${department.revenue}</strong>
            <div class="tag">${department.result}</div>
        `;
        departmentGrid.appendChild(card);
    });
}

menuLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const sectionId = link.dataset.menuLink;
        const section = document.querySelector(`#${sectionId}`);

        event.preventDefault();
        setActiveMenu(sectionId);
        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});

window.addEventListener("scroll", function () {
    sections.forEach(function (section) {
        const distance = Math.abs(section.getBoundingClientRect().top - 120);

        if (distance < 160) {
            setActiveMenu(section.id);
        }
    });
});

renderKpis();
renderChart();
renderSummary();
renderDepartments();
