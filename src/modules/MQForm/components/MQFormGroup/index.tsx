import { forwardRef } from 'react';

import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';
import { Form } from 'react-bootstrap';
import classNames from 'classnames';

import { MQFormGroupProps } from '../../types';

import './style.scss';

const MQFormGroup: BsPrefixRefForwardingComponent<'div', MQFormGroupProps> = forwardRef(
  ({ className = '', ...props }, ref) => (
    <Form.Group
      data-testid="mq-form-group"
      ref={ref}
      className={classNames(['mq-form__group', className])}
      {...props}
    />
  ),
);

MQFormGroup.displayName = 'MQFormGroup';

export default MQFormGroup;
