def get_next_id(customers):
    if len(customers) == 0:
        return 1

    biggest_id = customers[0]["id"]

    for customer in customers:
        if customer["id"] > biggest_id:
            biggest_id = customer["id"]

    return biggest_id + 1


def add_customer(customers, name, email, phone, company, status):
    customer = {
        "id": get_next_id(customers),
        "name": name,
        "email": email,
        "phone": phone,
        "company": company,
        "status": status,
    }

    customers.append(customer)
    return customer


def find_customer_index(customers, customer_id):
    for index, customer in enumerate(customers):
        if customer["id"] == customer_id:
            return index

    return -1


def edit_customer(customers, customer_id, name, email, phone, company, status):
    index = find_customer_index(customers, customer_id)

    if index == -1:
        return False

    customers[index]["name"] = name
    customers[index]["email"] = email
    customers[index]["phone"] = phone
    customers[index]["company"] = company
    customers[index]["status"] = status

    return True


def remove_customer(customers, customer_id):
    index = find_customer_index(customers, customer_id)

    if index == -1:
        return False

    customers.pop(index)
    return True


def show_customers(customers):
    if len(customers) == 0:
        print("Nenhum cliente cadastrado.")
        return

    for customer in customers:
        print(
            f"{customer['id']} - {customer['name']} | {customer['email']} | "
            f"{customer['phone']} | {customer['company']} | {customer['status']}"
        )


def count_by_status(customers, status):
    total = 0

    for customer in customers:
        if customer["status"] == status:
            total = total + 1

    return total
