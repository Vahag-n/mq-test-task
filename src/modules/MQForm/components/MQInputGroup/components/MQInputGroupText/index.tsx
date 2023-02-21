import { FC } from 'react';

import { InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

import { MQInputGroupProps } from '../../../../types';

const MQInputGroupText: FC<MQInputGroupProps> = ({ className = '', ...props }) => (
  <InputGroup.Text className={classNames(['mq-input-group', className])} {...props} />
);

MQInputGroupText.displayName = 'MQInputGroupText';

export default MQInputGroupText;
