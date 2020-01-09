import {library} from '@fortawesome/fontawesome-svg-core';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faCaretDown,
  faCircle,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';

export function addFontAwesomeToProject() {
  library.add(faArrowAltCircleLeft);
  library.add(faArrowAltCircleRight);
  library.add(faCaretDown);
  library.add(faCircle);
  library.add(faPlusCircle);
}
