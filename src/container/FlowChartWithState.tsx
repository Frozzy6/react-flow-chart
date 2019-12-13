import * as React from 'react'
import { FlowChart, IChart, IConfig, IFlowChartComponents } from '../'
import * as actions from './actions'
import mapValues from './utils/mapValues'

const isEqual = (x: any, y: any) => {
  if (x === y) return true;
  // if both x and y are null or undefined and exactly the same

  if (!(x instanceof Object) || !(y instanceof Object)) return false;
  // if they are not strictly equal, they both need to be Objects

  if (x.constructor !== y.constructor) return false;
  // they must have the exact same prototype chain, the closest we can do is
  // test there constructor.

  for (var p in x) {
    if (!x.hasOwnProperty(p)) continue;
    // other properties were tested using x.constructor === y.constructor

    if (!y.hasOwnProperty(p)) return false;
    // allows to compare x[ p ] and y[ p ] when set to undefined

    if (x[p] === y[p]) continue;
    // if they have the same strict value or identity then they are equal

    if (typeof (x[p]) !== "object") return false;
    // Numbers, Strings, Functions, Booleans must be strictly equal

    if (!isEqual(x[p], y[p])) return false;
    // Objects and Arrays must be tested recursively
  }

  for (p in y) {
    if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
    // allows x[ p ] to be set to undefined
  }
  return true;
}

export interface IFlowChartWithStateProps {
  initialValue: IChart
  onChange?: (prevState: IChart, nextState: IChart) => void
  Components?: IFlowChartComponents
  config?: IConfig
}

/**
 * Flow Chart With State
 */
export class FlowChartWithState extends React.Component<IFlowChartWithStateProps, IChart> {
  public state: IChart
  private stateActions = mapValues(actions, (func: any) =>
      (...args: any) => this.setState(func(...args)))

  constructor (props: IFlowChartWithStateProps) {
    super(props)
    this.state = props.initialValue
  }
  
  componentWillReceiveProps(nextProps: IFlowChartWithStateProps, nextState: IChart) {
    if (!isEqual(this.state, nextState) && this.props.onChange) {
      this.props.onChange(this.state, nextState)
    }
  }

  public serialize():IChart {
    return this.state
  }

  public render () {
    const { Components, config } = this.props

    return (
      <FlowChart
        chart={this.state}
        callbacks={this.stateActions}
        Components={Components}
        config={config}
      />
    )
  }
}
