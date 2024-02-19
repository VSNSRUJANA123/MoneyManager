// Write your code here
const TransactionItem = props => {
  const {items, deleteBtn} = props

  const {id, titleInput, amountInput, types} = items
  const displayBtn = () => {
    deleteBtn(id)
  }
  return (
    <li key={id} className="historyList">
      <span>{titleInput}</span>
      <span>{amountInput}</span>
      <span>{types}</span>
      <button data-testid="delete" onClick={displayBtn}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
