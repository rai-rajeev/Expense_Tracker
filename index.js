document.getElementById('expForm').addEventListener('submit', addExpense);

// Initial array of expenses, reading from localStorage
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function addExpense(e) {
    e.preventDefault();

    // Get type, name, date, and amount
    const type = document.getElementById('type').value;
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (type !== 'chooseOne' && name.length > 0 && date && amount > 0) {
        const expense = {
            type,
            name,
            date,
            amount,
            id: expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1,
        };

        expenses.push(expense);
        // Save to localStorage
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    document.getElementById('expForm').reset();
    showExpenses();
}

function showExpenses() {
    const expenseTable = document.getElementById('expenseTable');
    expenseTable.innerHTML = '';

    expenses.forEach(expense => {
        expenseTable.innerHTML += `
            <tr>
                <td>${expense.type}</td>
                <td>${expense.name}</td>
                <td>${expense.date}</td>
                <td>$${expense.amount.toFixed(2)}</td>
                <td><a class="deleteButton" onclick="deleteExpense(${expense.id})">Delete</a></td>
            </tr>
        `;
    });
}

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    // Save to localStorage
    localStorage.setItem('expenses', JSON.stringify(expenses));
    showExpenses();
}

// Initial display of expenses
showExpenses();
