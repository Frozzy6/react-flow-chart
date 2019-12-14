import * as React from 'react';
import { IChart, IConfig, IFlowChartComponents } from '../';
export interface IFlowChartWithStateProps {
    initialValue: IChart;
    onChange?: (prevState: IChart, nextState: IChart) => void;
    Components?: IFlowChartComponents;
    config?: IConfig;
}
/**
 * Flow Chart With State
 */
export declare class FlowChartWithState extends React.Component<IFlowChartWithStateProps, IChart> {
    state: IChart;
    private stateActions;
    constructor(props: IFlowChartWithStateProps);
    componentWillReceiveProps(nextProps: IFlowChartWithStateProps, nextState: IChart): void;
    serialize(): IChart;
    render(): JSX.Element;
}
