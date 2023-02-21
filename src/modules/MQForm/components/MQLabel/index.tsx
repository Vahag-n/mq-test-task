import { forwardRef } from 'react';

import { FormLabel, FormText } from 'react-bootstrap';
import classNames from 'classnames';
import { BsPrefixRefForwardingComponent } from 'react-bootstrap/helpers';

import MQIcon from 'modules/MQIcon';
import MQTooltip from 'modules/MQTooltip';

import { MQLabelProps } from '../../types';

import './style.scss';

const MQLabel: BsPrefixRefForwardingComponent<'label', MQLabelProps> = forwardRef(
  ({ children, nowrap = false, className = '', placement = 'top', helpText, required, description, ...props }, ref) => (
    <FormLabel ref={ref} className={classNames(['mq-label', className, { nowrap }])} {...props}>
      <FormText className="mq-label__title">
        {children} {required && <span className="mq-label__required-icon">*</span>}
        {helpText && (
          <MQTooltip placement={placement} overlay={<span>{helpText}</span>}>
            <MQIcon.FontAwesome className="mq-label__help-icon" icon={['fas', 'info-circle']} />
          </MQTooltip>
        )}
      </FormText>

      {description && <FormText className="mq-label__description">{description}</FormText>}
    </FormLabel>
  ),
);

MQLabel.displayName = 'MQLabel';

export default MQLabel;
