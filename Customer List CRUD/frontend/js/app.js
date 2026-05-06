const form = document.querySelector("#customerForm");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const companyInput = document.querySelector("#companyInput");
const statusInput = document.querySelector("#statusInput");
const searchInput = document.querySelector("#searchInput");
const customerList = document.querySelector("#customerList");
const formMessage = document.querySelector("#formMessage");
const submitButton = document.querySelector("#submitButton");
const cancelButton = document.querySelector("#cancelButton");
const formMode = document.querySelector("#formMode");
const formTitle = document.querySelector("#formTitle");
const totalCustomers = document.querySelector("#totalCustomers");
const activeCustomers = document.querySelector("#activeCustomers");
const inactiveCustomers = document.querySelector("#inactiveCustomers");

let customers = loadCustomers();
let editingId = null;

function loadCustomers() {
    const savedCustomers = localStorage.getItem("customerListCrud");

    if (savedCustomers) {
        return JSON.parse(savedCustomers);
    }

    return [
        {
            id: 1,
            name: "Marina Costa",
            email: "marina@email.com",
            phone: "(11) 99999-1000",
            company: "Costa Design",
            status: "Ativo"
        },
        {
            id: 2,
            name: "Rafael Lima",
            email: "rafael@email.com",
            phone: "(21) 98888-2000",
            company: "Lima Tech",
            status: "Inativo"
        }
    ];
}

function saveCustomers() {
    localStorage.setItem("customerListCrud", JSON.stringify(customers));
}

function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
}

function getNextId() {
    if (customers.length === 0) {
        return 1;
    }

    const ids = customers.map(function (customer) {
        return customer.id;
    });

    return Math.max(...ids) + 1;
}

function getFormData() {
    return {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        company: companyInput.value.trim(),
        status: statusInput.value
    };
}

function isFormValid(customer) {
    return customer.name !== "" && customer.email !== "" && customer.phone !== "" && customer.company !== "";
}

function clearForm() {
    form.reset();
    editingId = null;
    formMode.textContent = "Novo cliente";
    formTitle.textContent = "Cadastrar cliente";
    submitButton.textContent = "Adicionar cliente";
    cancelButton.classList.remove("visible");
    showMessage("Preencha os dados para cadastrar um cliente.", "");
}

function updateSummary() {
    const activeTotal = customers.filter(function (customer) {
        return customer.status === "Ativo";
    }).length;

    totalCustomers.textContent = customers.length;
    activeCustomers.textContent = activeTotal;
    inactiveCustomers.textContent = customers.length - activeTotal;
}

function getFilteredCustomers() {
    const searchText = searchInput.value.toLowerCase();

    return customers.filter(function (customer) {
        const customerText = `${customer.name} ${customer.email} ${customer.company}`.toLowerCase();
        return customerText.includes(searchText);
    });
}

function renderCustomers() {
    const filteredCustomers = getFilteredCustomers();

    customerList.innerHTML = "";
    updateSummary();

    if (filteredCustomers.length === 0) {
        customerList.innerHTML = '<p class="empty-message">Nenhum cliente encontrado.</p>';
        return;
    }

    filteredCustomers.forEach(function (customer) {
        const card = document.createElement("article");
        const statusClass = customer.status === "Ativo" ? "active" : "inactive";

        card.className = "customer-card";
        card.innerHTML = `
            <div class="customer-info">
                <strong>${customer.name}</strong>
                <span>${customer.email} | ${customer.phone}</span>
                <div class="customer-meta">
                    <span class="badge ${statusClass}">${customer.status}</span>
                    <span class="badge inactive">${customer.company}</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="edit-button" type="button" data-edit="${customer.id}">Editar</button>
                <button class="remove-button" type="button" data-remove="${customer.id}">Remover</button>
            </div>
        `;

        customerList.appendChild(card);
    });
}

function addCustomer(customer) {
    customer.id = getNextId();
    customers.push(customer);
    saveCustomers();
    renderCustomers();
    clearForm();
    showMessage("Cliente cadastrado com sucesso.", "success");
}

function updateCustomer(customer) {
    customers = customers.map(function (item) {
        if (item.id === editingId) {
            return {
                id: editingId,
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                company: customer.company,
                status: customer.status
            };
        }

        return item;
    });

    saveCustomers();
    renderCustomers();
    clearForm();
    showMessage("Cliente atualizado com sucesso.", "success");
}

function startEdit(id) {
    const customer = customers.find(function (item) {
        return item.id === id;
    });

    if (!customer) {
        return;
    }

    editingId = id;
    nameInput.value = customer.name;
    emailInput.value = customer.email;
    phoneInput.value = customer.phone;
    companyInput.value = customer.company;
    statusInput.value = customer.status;
    formMode.textContent = "Editando cliente";
    formTitle.textContent = "Atualizar cliente";
    submitButton.textContent = "Salvar alterações";
    cancelButton.classList.add("visible");
    showMessage("Edite os dados e salve as alterações.", "");
    nameInput.focus();
}

function removeCustomer(id) {
    customers = customers.filter(function (customer) {
        return customer.id !== id;
    });

    saveCustomers();
    renderCustomers();
    showMessage("Cliente removido da lista.", "success");
}

form.addEventListener("submit", function (event) {
    const customer = getFormData();

    event.preventDefault();

    if (!isFormValid(customer)) {
        showMessage("Preencha todos os campos antes de salvar.", "error");
        return;
    }

    if (editingId === null) {
        addCustomer(customer);
    } else {
        updateCustomer(customer);
    }
});

customerList.addEventListener("click", function (event) {
    const editId = Number(event.target.dataset.edit);
    const removeId = Number(event.target.dataset.remove);

    if (editId) {
        startEdit(editId);
    }

    if (removeId) {
        removeCustomer(removeId);
    }
});

searchInput.addEventListener("input", renderCustomers);
cancelButton.addEventListener("click", clearForm);

renderCustomers();
