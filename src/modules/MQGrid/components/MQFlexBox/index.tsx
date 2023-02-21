import { FC } from 'react';

import classNames from 'classnames';

import { MQFlexBoxProps } from '../../types';
import './style.scss';

const MQFlexBox: FC<MQFlexBoxProps> = ({
  children,
  className = '',
  wrap = 'wrap',
  direction = 'row',
  justify = 'auto',
  align = 'auto',
  ...props
}) => (
  <div
    data-testid="mq-grid-flex-box"
    className={classNames([
      'mq-grid-flex-box',
      className,
      `direction-${direction}`,
      `justify-${justify}`,
      `align-${align}`,
      `flex-${wrap}`,
    ])}
    {...props}
  >
    {children}
  </div>
);

export default MQFlexBox;
