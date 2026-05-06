from customer_service import (
    add_customer,
    count_by_status,
    edit_customer,
    remove_customer,
    show_customers,
)
from data import customers


def show_menu():
    print("\n=== CUSTOMER LIST CRUD ===")
    print("1 - Listar clientes")
    print("2 - Adicionar cliente")
    print("3 - Editar cliente")
    print("4 - Remover cliente")
    print("5 - Ver resumo")
    print("6 - Sair")


def ask_customer_data():
    name = input("Nome: ")
    email = input("E-mail: ")
    phone = input("Telefone: ")
    company = input("Empresa: ")
    status = input("Status (Ativo/Inativo): ")

    if status != "Ativo" and status != "Inativo":
        status = "Ativo"

    return name, email, phone, company, status


def ask_customer_id():
    try:
        return int(input("ID do cliente: "))
    except ValueError:
        return 0


def show_summary():
    active_total = count_by_status(customers, "Ativo")
    inactive_total = count_by_status(customers, "Inativo")

    print("\nResumo:")
    print(f"Total de clientes: {len(customers)}")
    print(f"Clientes ativos: {active_total}")
    print(f"Clientes inativos: {inactive_total}")


def main():
    while True:
        show_menu()
        option = input("Escolha uma opcao: ")

        if option == "1":
            print("\nClientes:")
            show_customers(customers)
        elif option == "2":
            data = ask_customer_data()
            add_customer(customers, data[0], data[1], data[2], data[3], data[4])
            print("Cliente adicionado com sucesso.")
        elif option == "3":
            customer_id = ask_customer_id()
            data = ask_customer_data()
            edited = edit_customer(customers, customer_id, data[0], data[1], data[2], data[3], data[4])

            if edited:
                print("Cliente editado com sucesso.")
            else:
                print("Cliente nao encontrado.")
        elif option == "4":
            customer_id = ask_customer_id()
            removed = remove_customer(customers, customer_id)

            if removed:
                print("Cliente removido com sucesso.")
            else:
                print("Cliente nao encontrado.")
        elif option == "5":
            show_summary()
        elif option == "6":
            print("Saindo do sistema...")
            break
        else:
            print("Opcao invalida. Tente novamente.")


if __name__ == "__main__":
    main()
