import './App.css';
import { useReducer } from 'react'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
import ClearButton from './ClearButton';
import DeleteButton from './DeleteButton';
import EvaluateButton from './EvaluateButton';

//ACTIONS object to use with useReducer() hook. Exists to avoid typos.
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose',
  EVALUATE: 'evaluate'
}

/**
 * For use in useReducer() to maintain the state of the calculator.
 * @param {Object} state The current state of the app. Contains three state variables: currentOperand, previousOperand, and operation, which determines what goes into the black output window.
 * @param {Object} param1 determines which reducing action to take. 'type' determines if the action taken is adding/deleting a digit to current operand, clearing the output window, specifying any of the four operations, or evaluating the current expression.
 * @returns the next state of the app, based on the input.
 */
function reducer(state, { type, payload }) {
  //switch statement determines what action to take, and therefore update the state accordingly
  switch(type) {
    //Adding new digit
    case ACTIONS.ADD_DIGIT:
      // if inbound digit is 0 and currentOperand is 0, then don't do anything.
      // eliminates "0000000..." as an operand
      if ((payload.digit === '0' && state.currentOperand === '0') || ((payload.digit === '.' && state.currentOperand.includes('.')))) {
        return state;
      }

      return { //reducers will always return a new state object
        ...state, //current state, but currentOperand is modified with the additional digit
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    //specifying an operation. Reducer runs this case whenever any of the four OperationButtons are clicked.
    //choosing an operation can differentiate between two cases:
      //user is just evaluating a single expression. (Ex: 12 + 24 = 36), OR
      //user is chaining multiple operations (Ex: 12 + 3 * 4 - 5 = 55). Note that calculator does not follow PEMDAS, instead evaluating sequentially.
    case ACTIONS.CHOOSE_OPERATION:
      // console.log(`DEBUG in CHOOSE_OPERATION
      //   state.currentOperand: ${typeof state.currentOperand} ${state.currentOperand}
      //   state.previousOperand: ${typeof state.previousOperand} ${state.previousOperand}
      //   state.operation: ${typeof state.operation} ${state.operation}`)

      //if both current and prev operands are empty
      if (state.currentOperand == null && state.previousOperand == null) {
        return state; //don't do anything
      }

      //if only the current operand is entered, (calculator is only evaluating one expression so far)
      if (state.previousOperand == null) {
        // console.log("Triggering this if condition")
        return {
          previousOperand: state.currentOperand,
          currentOperand: '',
          operation: payload.symbol
        }
      }
      // console.log("NOT Triggering this if condition")
      //at this point both operands are not null, therefore calculator is now sequentially chaining operations.
      return {
        currentOperand: null,
        previousOperand: evaluate(state.currentOperand, state.previousOperand, state.operation),
        operation: payload.symbol,

      }
    //resets state back to null for both operands and operation
    case ACTIONS.CLEAR:
      // console.log(`DEBUG in CLEAR
      //   state.currentOperand: ${typeof state.currentOperand} ${state.currentOperand}
      //   state.previousOperand: ${typeof state.previousOperand} ${state.previousOperand}
      //   state.operation: ${typeof state.operation} ${state.operation}`)

      return {
        currentOperand: null,
        previousOperand: null,
        operation: null,
      }
    //deletes the last added digit in current operand
    case ACTIONS.DELETE_DIGIT:
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, state.currentOperand.length - 1)
      }
    //evaluates current expression
    case ACTIONS.EVALUATE:
      // console.log(`DEBUG in EVALUATE
      //   state.currentOperand: ${typeof state.currentOperand} ${state.currentOperand}
      //   state.previousOperand: ${typeof state.previousOperand} ${state.previousOperand}
      //   state.operation: ${typeof state.operation} ${state.operation}`)
      return {
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state.currentOperand, state.previousOperand, state.operation),
      }
    default:
      return state
  }
} //reducer is a function that produces the next state. it is run when dispatch is called.

/**
 * 
 * @param {string} curr the current operand
 * @param {string} prev the previous operand
 * @param {string} op the operation to be performed (+ - * /)
 * @returns the value of the evaluated expression
 */
function evaluate(curr, prev, op) {
  if (!curr || !prev || !op) {
    throw new Error(`Missing arguments for evaluate(): curr = ${curr} | prev = ${prev} | op = ${op}`)
  }

  switch (op) {
    case '+':
      return Number(prev) + Number(curr);
    case '-':
      return Number(prev) - Number(curr);
    case '*':
      return Number(prev) * Number(curr);
    case '/':
      return Number(prev) / Number(curr);
  }

}

function App() {
  //useReducer manages the state of App
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: null, previousOperand: null, operation: null })
  return (
    <main className="calculator-grid">
      <div className="calculator-grid__output">
        <div className="output__previous-operand">{previousOperand} {operation}</div>
        <div className="output__current-operand">{currentOperand}</div>
      </div>
      <ClearButton dispatch={dispatch}/>
      <DeleteButton dispatch={dispatch} />
      <OperationButton dispatch={dispatch} symbol="/" />
      <DigitButton dispatch={dispatch} digit="1"/>
      <DigitButton dispatch={dispatch} digit="2"/>
      <DigitButton dispatch={dispatch} digit="3"/>
      <OperationButton dispatch={dispatch} symbol="*" />
      <DigitButton dispatch={dispatch} digit="4"/>
      <DigitButton dispatch={dispatch} digit="5"/>
      <DigitButton dispatch={dispatch} digit="6"/>
      <OperationButton dispatch={dispatch} symbol="+" />
      <DigitButton dispatch={dispatch} digit="7"/>
      <DigitButton dispatch={dispatch} digit="8"/>
      <DigitButton dispatch={dispatch} digit="9"/>
      <OperationButton dispatch={dispatch} symbol="-" />
      <DigitButton dispatch={dispatch} digit="."/>
      <DigitButton dispatch={dispatch} digit="0"/>
      <EvaluateButton dispatch={dispatch}/>

    </main>
  );
}

export default App;
