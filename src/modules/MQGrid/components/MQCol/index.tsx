import { forwardRef } from 'react';

import classNames from 'classnames';
import { Col } from 'react-bootstrap';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQColProps } from '../../types';
import './style.scss';

const MQCol: BsPrefixRefForwardingComponent<'div', MQColProps> = forwardRef(({ className, ...props }, ref) => (
  <Col data-testid="mq-grid-col" ref={ref} className={classNames(['mq-grid-col', 'mq-col', className])} {...props} />
));

MQCol.displayName = 'MQCol';

export default MQCol;
