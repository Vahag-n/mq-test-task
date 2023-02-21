import { ColProps, RowProps } from 'react-bootstrap';
import {ReactNode} from "react";

export interface MQFlexBoxProps {
  className?: string;
  wrap?: 'wrap' | 'nowrap';
  direction?: 'row' | 'column' | 'row-reverse' | 'col-reverse';
  justify?: 'center' | 'start' | 'end' | 'auto';
  align?: 'center' | 'start' | 'end' | 'auto';
  children: ReactNode;
}

export type MQColProps = ColProps;
export type MQRowProps = RowProps;
