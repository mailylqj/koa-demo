import { RouteComponentProps } from 'react-router-dom';

declare global {
    export interface IProps extends RouteComponentProps {
        [key: string]: any
    }

    export interface IState {
        [key: string]: any
    }
}