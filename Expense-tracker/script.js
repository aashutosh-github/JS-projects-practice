document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.querySelector("#expense-form");
  const expenseName = document.querySelector("#expense-name");
  const expenseAmount = document.querySelector("#expense-amount");
  const expenseList = document.querySelector("#expense-list");
  const totalAmountDisplay = document.querySelector("#total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  renderExpenses();
  let totalAmount = calculateTotal();

  function saveToLocalStorage() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotal() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      expenseList.appendChild(li);
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
        `;
    });
  }

  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = parseFloat(expenseAmount.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        //the below format means assign the name variable to the name key
        //so it is the same as name: name, amount: amount
        name,
        amount,
      };
      expenses.push(newExpense);
      saveToLocalStorage();
      renderExpenses();
      updateTotal();

      //clear the input fields
      expenseAmount.value = "";
      expenseName.value = "";
    }
  });
});
