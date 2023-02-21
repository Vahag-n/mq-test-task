import { forwardRef } from 'react';

import { Form } from 'react-bootstrap';
import classesNames from 'classnames';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQFormRadioProps } from '../../types';
import './style.scss';

const MQRadio: BsPrefixRefForwardingComponent<'input', MQFormRadioProps> = forwardRef(
  ({ className = '', value, selected, label, required = false, ...props }, ref) => (
    <Form.Check
      ref={ref}
      data-testid={`mq-radio-${props.name}-${props.id}`}
      type="radio"
      value={value}
      custom={true}
      checked={value === selected}
      className={classesNames(['mq-radio', className])}
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

MQRadio.displayName = 'MQRadio';

export default MQRadio;
