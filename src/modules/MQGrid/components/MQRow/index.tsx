import { forwardRef } from 'react';

import classNames from 'classnames';
import { Row } from 'react-bootstrap';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQRowProps } from '../../types';
import './style.scss';

const MQRow: BsPrefixRefForwardingComponent<'div', MQRowProps> = forwardRef(({ className, ...props }, ref) => (
  <Row data-testid="mq-grid-row" ref={ref} className={classNames(['mq-row', className])} {...props} />
));

MQRow.displayName = 'MQRow';

export default MQRow;
