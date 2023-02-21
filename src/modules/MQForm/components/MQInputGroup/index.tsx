import { FC } from 'react';

import { InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

import { MQInputGroupProps } from '../../types';

import MQInputGroupPrepend from './components/MQInputGroupPrepend';
import MQInputGroupText from './components/MQInputGroupText';
import MQInputGroupAppend from './components/MQInputGroupAppend';

import './style.scss';

const MQInputGroup: FC<MQInputGroupProps> & {
  Prepend: typeof MQInputGroupPrepend;
  Text: typeof MQInputGroupText;
  Append: typeof MQInputGroupAppend;
} = ({ className = '', ...props }) => (
  <InputGroup data-testid="mq-form-input-group" className={classNames(['mq-input-group', className])} {...props} />
);

MQInputGroup.Prepend = MQInputGroupPrepend;
MQInputGroup.Text = MQInputGroupText;
MQInputGroup.Append = MQInputGroupAppend;

MQInputGroup.displayName = 'MQInputGroup';

export default MQInputGroup;
