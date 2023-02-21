import { FC } from 'react';

import classNames from 'classnames';

import { MQCustomIconProps } from '../../types';

const MQCustomIcon: FC<MQCustomIconProps> = ({ className, alt = '', src, ...props }) => (
  <img data-testid="mq-custom-icon" src={src} alt={alt} className={classNames([className])} {...props} />
);

export default MQCustomIcon;
