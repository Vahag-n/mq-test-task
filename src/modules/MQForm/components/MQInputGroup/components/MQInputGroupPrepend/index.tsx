import { FC } from 'react';

import { InputGroup } from 'react-bootstrap';
import classNames from 'classnames';

import { MQInputGroupProps } from '../../../../types';

const MQInputGroupPrepend: FC<MQInputGroupProps> = ({ className = '', ...props }) => (
  <InputGroup.Prepend className={classNames(['mq-input-group-prepend', className])} {...props} />
);

MQInputGroupPrepend.displayName = 'MQInputGroupPrepend';

export default MQInputGroupPrepend;
