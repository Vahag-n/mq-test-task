import { forwardRef } from 'react';

import classNames from 'classnames';
import { FormText } from 'react-bootstrap';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQFormTextProps } from '../../types';

const MQFormText: BsPrefixRefForwardingComponent<'small', MQFormTextProps> = forwardRef(
  ({ className = '', muted = false, ...props }, ref) => (
    <FormText
      data-testid="mq-form-text"
      className={classNames(['mq-form__text', { muted }, className])}
      ref={ref}
      {...props}
      {...props}
    />
  ),
);

MQFormText.displayName = 'MQFormText';

export default MQFormText;
