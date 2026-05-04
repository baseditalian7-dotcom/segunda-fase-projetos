from data import alerts, company_name, departments, kpis, weekly_revenue


def format_money(value):
    return f"R$ {value:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")


def get_total_revenue():
    total = 0

    for week in weekly_revenue:
        total = total + week["value"]

    return total


def get_best_week():
    best_week = weekly_revenue[0]

    for week in weekly_revenue:
        if week["value"] > best_week["value"]:
            best_week = week

    return best_week


def get_best_department():
    ordered_departments = sorted(departments, key=lambda department: department["score"], reverse=True)
    return ordered_departments[0]


def build_kpi_report():
    report = []

    for kpi in kpis:
        if kpi["type"] == "money":
            value = format_money(kpi["value"])
        elif kpi["type"] == "percent":
            value = f"{kpi['value']}%"
        else:
            value = kpi["value"]

        report.append(f"{kpi['name']}: {value}")

    return report


def build_dashboard_summary():
    total_revenue = get_total_revenue()
    best_week = get_best_week()
    best_department = get_best_department()

    summary = {
        "company": company_name,
        "total_revenue": format_money(total_revenue),
        "best_week": best_week["week"],
        "best_department": best_department["name"],
        "department_score": best_department["score"],
    }

    return summary


def show_departments():
    for department in departments:
        revenue = format_money(department["revenue"])
        print(f"{department['name']} | Receita: {revenue} | Nota: {department['score']}")


def show_alerts():
    for index, alert in enumerate(alerts, start=1):
        print(f"{index}. {alert}")
