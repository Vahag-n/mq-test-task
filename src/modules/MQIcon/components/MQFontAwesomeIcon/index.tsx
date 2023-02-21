import { FC } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import { MQFontAwesomeProps } from '../../types';

import './style.scss';

const MQFontAwesomeIcon: FC<MQFontAwesomeProps> = ({ className, size = '1x', ...props }) => (
  <FontAwesomeIcon data-testid="mq-font-icon" className={classNames([className])} size={size} {...props} />
);

export default MQFontAwesomeIcon;
