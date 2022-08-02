
// User Interactive
const availableBudget = document.querySelector('#income')
const expenseName = document.querySelector('#expense-name')
const expenseAmount = document.querySelector('#expense-amount')
const addExpenseBtn = document.querySelector('#add-expense-button')
const deleteExpense = document.querySelectorAll('.delete-expense')
const list = document.querySelector('.expenses-panel')

// Math output
const incomeOutput = document.querySelectorAll('.summary-amount')[0]
const expensesOutput = document.querySelectorAll('.summary-amount')[1]
const balanceOutput = document.querySelectorAll('.summary-amount')[2]



// Empty expenses array
let expenses = []

// Event listener listening to clicks, taking in 4 arguments
addExpenseBtn.onclick = (realBudget, budgetAm, expenseAm, nameExpense) => {

  // realBudget arg = Budget input
  realBudget = availableBudget.value

  // nameExpense arg = Expense name input
  nameExpense = expenseName.value

  // Expense amount = expense amount input as a number
  expenseAm = Number(expenseAmount.value)

  // Push expense amounts to expenses array each click
  expenses.push(expenseAm)

  // Reduce array method that sums the array
  let expenseSum = expenses.reduce((partialSum, a) => partialSum + a, 0);


  budgetAm = realBudget

  // Income output is the value of realBudget(budgetAm)
  incomeOutput.innerText = `$${realBudget}`


  // On click, create new DIV element
  let newExpenseTable = document.createElement('div')
  // Add class 'expense-table' to DIV
  newExpenseTable.classList.add('expense-table')

  // Store divs in 2 variables, for product name & product price
  let productNameDiv = document.createElement('div')
  let productAmountDiv = document.createElement('div')


  // Adding <p> tags to both new divs with nameExpense & expenseAmount
  productNameDiv.innerHTML = `<p>${nameExpense}</p>`
  productAmountDiv.innerHTML = `<p>${expenseAm}</p>`

  // Adding the parent div expense-table as a child of expense-panel
  list.appendChild(newExpenseTable)
  // Adding product name & product amount div as child divs to expense-table
  newExpenseTable.appendChild(productNameDiv)
  newExpenseTable.appendChild(productAmountDiv)

  // Giving each new created product div a delete button
  let newDeleteBtn = document.createElement('button')
  newDeleteBtn.classList.add('delete-expense')
  newDeleteBtn.innerHTML = `<img src="./images/trash.svg" alt="Tash" />`
  // Adding delete button to parent div of both product divs
  newExpenseTable.appendChild(newDeleteBtn)

  // Expenseoutput innertext = expenseSum
  expensesOutput.innerText = `${expenseSum}`


  const realBalOutput = balanceOutput.innerText = `${realBudget - expenseSum}`
  let removedExpensesArr = []
  newDeleteBtn.onclick = () => {
    let productWorth = Number(productAmountDiv.innerText)
    removedExpensesArr.push(productWorth)
    const removedExpenses = removedExpensesArr.reduce((partialSum, a) => partialSum + a, 0)

    expensesOutput.innerText = `$${expenseSum - removedExpenses}`

    let realExpense = expenseSum - removedExpensesArr

    // Reset expenses to 0 
    if (realExpense <= 0) {
      expenses = []
      balanceOutput.innerText = `$${realBudget}`
    }
    else {

      balanceOutput.innerText = `$${Number(realBalOutput) + Number(expenses.slice(-1))}`
      expenses.pop()


    }

    newExpenseTable.innerHTML = ''

  }

  if (balanceOutput.innerText < 0) {
    balanceOutput.style.color = 'red'
  }
  else {
    balanceOutput.style.color = 'green'
  }


}



