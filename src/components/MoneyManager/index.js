import {Component} from 'react'

import {v4 as uuid} from 'uuid'

import './index.css'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManger extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    titleInput: '',
    amountInput: '',
    types: transactionTypeOptions[0].optionId,
    moneyManagerList: [],
  }

  titleChange = e => {
    this.setState({titleInput: e.target.value})
  }

  amountChange = e => {
    this.setState({amountInput: e.target.value})
  }

  expensesChange = e => {
    this.setState({types: e.target.value})
  }

  getIncome = () => {
    const {moneyManagerList} = this.state
    let totalIncome = 0
    moneyManagerList.forEach(items => {
      if (items.types === 'INCOME') {
        const incomeType = parseInt(items.amountInput)
        totalIncome += incomeType
      }
    })
    return totalIncome
  }

  getExpenses = () => {
    const {moneyManagerList} = this.state
    let totalExpenses = 0
    moneyManagerList.forEach(items => {
      if (items.types === 'EXPENSES') {
        const incomeType = parseInt(items.amountInput)
        totalExpenses += incomeType
        console.log(totalExpenses)
      }
    })
    return totalExpenses
  }

  submitBtn = e => {
    e.preventDefault()
    const {titleInput, amountInput, types} = this.state
    const newData = {
      id: uuid(),
      titleInput,
      amountInput,
      types,
    }
    if (titleInput !== '' && amountInput !== '') {
      this.setState(prev => ({
        moneyManagerList: [...prev.moneyManagerList, newData],
      }))
    }

    this.setState({titleInput: '', amountInput: ''})
  }

  deleteBtn = id => {
    const {moneyManagerList} = this.state
    const filterList = moneyManagerList.filter(items => items.id !== id)
    this.setState({moneyManagerList: filterList})
  }

  render() {
    const totalIncome = this.getIncome()
    const totalExpenses = this.getExpenses()
    const {
      balance,
      titleInput,
      amountInput,
      types,
      moneyManagerList,
    } = this.state
    const totalBalance = totalIncome - totalExpenses
    return (
      <div className="moneyManger">
        <div>
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your <span> Money Manager</span>
          </p>
        </div>
        <div>
          <MoneyDetails
            balance={totalBalance}
            income={totalIncome}
            expenses={totalExpenses}
            moneyManagerList={moneyManagerList}
          />
        </div>
        <div className="addTransitionContainer">
          <div className="addTransition">
            <h1>Add Transaction</h1>
            <form className="formContainer" onSubmit={this.submitBtn}>
              <label htmlFor="TITLE">Title</label>
              <input
                placeholder="Title"
                id="TITLE"
                value={titleInput}
                onChange={this.titleChange}
              />
              <label htmlFor="amount">amount</label>
              <input
                placeholder="amount"
                id="amount"
                value={amountInput}
                onChange={this.amountChange}
              />
              <label htmlFor="Type">Type</label>
              <select onChange={this.expensesChange}>
                {transactionTypeOptions.map(items => (
                  <option value={items.optionId}>{items.displayText}</option>
                ))}
              </select>
              <button>Add</button>
            </form>
          </div>
          <div className="transactionContainer">
            <h1>History</h1>
            <div className="spanTitle">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
            </div>
            <ul>
              {moneyManagerList.map(items => (
                <TransactionItem
                  key={items.id}
                  items={items}
                  deleteBtn={this.deleteBtn}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManger
