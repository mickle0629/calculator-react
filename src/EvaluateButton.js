import { ACTIONS } from "./App";

export default function EvaluateButton({ dispatch }) {
  return <button className="calculator-grid__btn calculator-grid__btn--span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>
}