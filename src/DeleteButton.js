import { ACTIONS } from "./App"

export default function DeleteButton({ dispatch }) {
  return <button className="calculator-grid__btn" onClick={() => dispatch( { type: ACTIONS.DELETE_DIGIT } )}>DEL</button>
}