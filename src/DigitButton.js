import { ACTIONS } from "./App"

export default function DigitButton({ dispatch, digit }) {
  return <button className="calculator-grid__btn" onClick={() => dispatch( { type: ACTIONS.ADD_DIGIT, payload: { digit: digit } } )}>{digit}</button>
}