import { FC } from 'react';

import { InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

import { MQInputGroupProps } from '../../../../types';

const MQInputGroupAppend: FC<MQInputGroupProps> = ({ className = '', ...props }) => (
  <InputGroup.Append className={classNames(['mq-input-group', className])} {...props} />
);

MQInputGroupAppend.displayName = 'MQInputGroupAppend';

export default MQInputGroupAppend;
