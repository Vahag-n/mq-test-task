import { forwardRef } from 'react';

import classNames from 'classnames';
import { Container } from 'react-bootstrap';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import { MQContainerProps } from './types';
import './style.scss';

const MQContainer: BsPrefixRefForwardingComponent<'div', MQContainerProps> = forwardRef(
  ({ className, ...props }, ref) => (
    <Container data-testid="mq-container" ref={ref} className={classNames(['mq-container', className])} {...props} />
  ),
);

MQContainer.displayName = 'MQContainer';

export default MQContainer;
