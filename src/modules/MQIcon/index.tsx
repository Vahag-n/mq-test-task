import MQFontAwesomeIcon from './components/MQFontAwesomeIcon';
import MQCustomIcon from './components/MQCustomIcon';
import { loadMQIcons } from './helpers';

loadMQIcons();

const MQIcon = {
  FontAwesome: MQFontAwesomeIcon,
  Custom: MQCustomIcon,
};

export default MQIcon;
