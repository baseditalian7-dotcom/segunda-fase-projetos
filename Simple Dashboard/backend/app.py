from dashboard_service import (
    build_dashboard_summary,
    build_kpi_report,
    show_alerts,
    show_departments,
)


def show_menu():
    print("\n=== SIMPLE DASHBOARD ===")
    print("1 - Ver KPIs")
    print("2 - Ver resumo")
    print("3 - Ver setores")
    print("4 - Ver alertas")
    print("5 - Sair")


def show_kpis():
    print("\nKPIs do painel:")

    for item in build_kpi_report():
        print(f"- {item}")


def show_summary():
    summary = build_dashboard_summary()

    print("\nResumo do dashboard:")
    print(f"Empresa: {summary['company']}")
    print(f"Receita total: {summary['total_revenue']}")
    print(f"Melhor semana: {summary['best_week']}")
    print(f"Melhor setor: {summary['best_department']} ({summary['department_score']} pontos)")


def main():
    while True:
        show_menu()
        option = input("Escolha uma opcao: ")

        if option == "1":
            show_kpis()
        elif option == "2":
            show_summary()
        elif option == "3":
            print("\nSetores:")
            show_departments()
        elif option == "4":
            print("\nAlertas:")
            show_alerts()
        elif option == "5":
            print("Saindo do dashboard...")
            break
        else:
            print("Opcao invalida. Tente novamente.")


if __name__ == "__main__":
    main()
