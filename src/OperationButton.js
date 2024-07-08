import { ACTIONS } from "./App";

export default function OperationButton({ dispatch, symbol }) {
  return <button className="calculator-grid__btn" onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { symbol } })}>{symbol}</button>
}