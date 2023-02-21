import { Placement } from 'react-bootstrap/esm/Overlay';
import {
  FormProps,
  FormCheckProps,
  FormControlProps,
  FormGroupProps,
  FormTextProps,
  InputGroupProps,
} from 'react-bootstrap';
import { FormLabelOwnProps } from 'react-bootstrap/FormLabel';
import { FeedbackProps } from 'react-bootstrap/Feedback';

type CheckValueTypes = boolean | string | number | readonly string[];

export interface MQFormControlProps extends FormControlProps {
  placeholder?: string;
  stroke?: boolean;
  name?: string;
  min?: number;
  max?: number;
  step?: number;
  rows?: number;
}

export interface MQSelectProps extends FormControlProps {
  multiple?: boolean;
  name?: string;
}

export type MQCheckProps = FormCheckProps;

export interface MQFormRadioProps extends FormCheckProps {
  selected?: CheckValueTypes;
}

export type MQFormGroupProps = FormGroupProps;
export interface MQFeedbackProps extends FeedbackProps {
  touched?: boolean;
}

export interface MQLabelProps extends FormLabelOwnProps {
  helpText?: JSX.Element | string;
  required?: boolean;
  placement?: Placement;
  description?: JSX.Element | string;
  nowrap?: boolean;
}

export interface MQFormProps extends FormProps {
  noValidate?: boolean;
}

export type MQInputGroupProps = InputGroupProps;

export interface MQFormTextProps extends FormTextProps {
  muted?: boolean;
}
