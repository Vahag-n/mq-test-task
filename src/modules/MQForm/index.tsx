import { FC } from 'react';

import classNames from 'classnames';
import { Form } from 'react-bootstrap';

import * as Types from './types';
import MQInput from './components/MQInput';
import MQSelect from './components/MQSelect';
import MQFormGroup from './components/MQFormGroup';
import MQSwitch from './components/MQSwitch';
import MQCheck from './components/MQCheck';
import MQRadio from './components/MQRadio';
import MQLabel from './components/MQLabel';
import MQFeedback from './components/MQFeedback';
import MQFormText from './components/MQFormText';

import './style.scss';

const MQForm: FC<Types.MQFormProps> & {
  Input: typeof MQInput;
  Select: typeof MQSelect;
  Check: typeof MQCheck;
  Radio: typeof MQRadio;
  Switch: typeof MQSwitch;
  Label: typeof MQLabel;
  Group: typeof MQFormGroup;
  Feedback: typeof MQFeedback;
  Text: typeof MQFormText;
} = ({ className = '', ...props }) => <Form className={classNames(['mq-form', className])} {...props} />;

MQForm.Input = MQInput;
MQForm.Select = MQSelect;
MQForm.Check = MQCheck;
MQForm.Radio = MQRadio;
MQForm.Switch = MQSwitch;
MQForm.Label = MQLabel;
MQForm.Group = MQFormGroup;
MQForm.Feedback = MQFeedback;
MQForm.Text = MQFormText;

export default MQForm;
