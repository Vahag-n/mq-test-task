import { ImageProps } from 'react-bootstrap';

export interface MQImageProps extends ImageProps {
  defaultImage?: string;
  circle?: boolean;
}
