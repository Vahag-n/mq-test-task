import { FC, useRef } from 'react';

import { Image } from 'react-bootstrap';
import classNames from 'classnames';

import { MQImageProps } from './types';
import MQDefaultImage from './assets/images/defaultImage.png';

import './style.scss';

const MQImage: FC<MQImageProps> = ({
  className = '',
  src,
  defaultImage,
  width = 150,
  height = 'auto',
  thumbnail = false,
  ...props
}) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const handleOnError = () => {
    if (imageRef.current) {
      imageRef.current.src = defaultImage || MQDefaultImage;
    }
  };

  return (
    <Image
      ref={imageRef}
      data-testid="mq-image"
      className={classNames('mq-image', className, { thumbnail })}
      width={width}
      height={height}
      onError={handleOnError}
      src={src || defaultImage || MQDefaultImage}
      {...props}
    />
  );
};

MQImage.displayName = 'MQImage';

export default MQImage;
