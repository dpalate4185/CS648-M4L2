// CREATE AN ARRAY OF EMPLOYEES
let employees = [
    [12345678, "Steve Smith", 1234, "steve@email.com", "Engineering"],
    [23456789, "Sarah Lee", 2345, "sarah@email.com", "Marketing"],
    [34567890, "David Kim", 3456, "david@email.com", "Executive"],
    [45678901, "Mario Lopez", 4567, "mario@email.com", "Sales"],
    [56789012, "James King", 5678, "james@email.com", "QA"]
];

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
if (localStorage.getItem("employees")) {
    employees = JSON.parse(localStorage.getItem("employees"));
}

// GET DOM ELEMENTS
const form = document.getElementById("addForm");
const empTable = document.getElementById("empTable");
const tbody = empTable.querySelector("tbody");
const empCount = document.getElementById("empCount");
const empIdField = document.getElementById("id");

// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid();

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {

    e.preventDefault();

    // GET VALUES
    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const extension = document.getElementById("extension").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;

    // CREATE NEW EMPLOYEE ARRAY
    let newEmployee = [id, name, extension, email, department];

    // PUSH INTO MAIN ARRAY
    employees.push(newEmployee);

    // REBUILD GRID
    buildGrid();

    // RESET FORM
    form.reset();
    empIdField.focus();
});

// DELETE EMPLOYEE (Event Delegation)
empTable.addEventListener('click', (e) => {

    if (e.target.tagName === "BUTTON") {

        if (confirm("Are you sure you want to delete this employee?")) {

            let rowIndex = e.target.parentNode.parentNode.rowIndex - 1;

            // REMOVE FROM ARRAY
            employees.splice(rowIndex, 1);

            // REBUILD GRID
            buildGrid();
        }
    }
});

// BUILD THE EMPLOYEES GRID
function buildGrid() {

    // CLEAR TBODY
    tbody.innerHTML = "";

    // LOOP THROUGH ARRAY
    for (let employee of employees) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td>${employee[3]}</td>
            <td>${employee[4]}</td>
            <td><button class="btn btn-danger btn-sm">X</button></td>
        `;

        tbody.appendChild(row);
    }

    // UPDATE COUNT
    empCount.textContent = `(${employees.length})`;

    // STORE IN LOCAL STORAGE
    localStorage.setItem("employees", JSON.stringify(employees));
}
