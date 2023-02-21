import { forwardRef } from 'react';

import { Form } from 'react-bootstrap';
import classesNames from 'classnames';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQCheckProps } from '../../types';

import './style.scss';

const MQCheck: BsPrefixRefForwardingComponent<'input', MQCheckProps> = forwardRef(
  ({ id, className = '', checked, required, label, ...props }, ref) => (
    <Form.Check
      ref={ref}
      data-testid={`mq-checkbox-${props.name}-${id}`}
      type="checkbox"
      custom={true}
      id={id}
      checked={checked}
      className={classesNames(['mq-check', className])}
      label={
        <>
          {label}
          {required && <span className="checkbox-require">{'*'}</span>}
        </>
      }
      {...props}
    />
  ),
);

MQCheck.displayName = 'MQCheck';

export default MQCheck;
