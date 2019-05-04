import React from 'react';
import './MonthPicker.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {format} from 'date-fns';
import ReactDOM from 'react-dom';

export interface MonthPickerProps {
  year: number;
  month: number;
}

interface MonthPickerState {
  style: React.CSSProperties;
  isVisible: boolean;
}

export class MonthPicker extends React.Component<MonthPickerProps, MonthPickerState> {
  private modalRef: React.RefObject<HTMLDivElement>;

  private get pickerParent(): HTMLElement | null {
    const pickerNode = ReactDOM.findDOMNode(this);
    if (!pickerNode) {
      return null;
    }

    return pickerNode.parentElement;
  }

  constructor(props: MonthPickerProps) {
    super(props);

    this.state = {style: {}, isVisible: false};
    this.modalRef = React.createRef();
  }

  componentDidMount() {
    this.listenToParentClick();
    this.determineModalPosition();
  }

  componentDidUpdate() {
    this.determineModalPosition();
  }

  private listenToParentClick() {
    if (this.pickerParent) {
      this.pickerParent.addEventListener('click', (event: MouseEvent) => {
        if (event.target !== this.pickerParent) {
          return;
        }

        this.setState(statePreviously => {
          return {isVisible: !statePreviously.isVisible};
        });
      });
    }
  }

  private determineModalPosition() {
    // TODO: when window resizes, recalculate the position
    if (this.modalRef.current && this.pickerParent) {
      const someMargin = 10;
      const parentPosition = this.pickerParent.getBoundingClientRect();
      const pickerElement = this.modalRef.current as HTMLDivElement;

      const topToBe = parentPosition.top + this.pickerParent.clientHeight + someMargin;
      const leftToBe =
        parentPosition.left + this.pickerParent.clientWidth / 2 - pickerElement.clientWidth / 2;

      if (this.state.style.top !== topToBe || this.state.style.left !== leftToBe) {
        this.setState({
          style: {
            top: topToBe,
            left: leftToBe,
          },
        });
      }
    }
  }

  render() {
    const months = this.createMonthsToSelect();

    if (this.state.isVisible) {
      return (
        <div>
          <div className="modal-overlay" onClick={() => this.setState({isVisible: false})} />
          <div
            ref={this.modalRef}
            className="month-picker bg-light text-dark"
            style={this.state.style}
          >
            <div className="year-row d-flex justify-content-between align-items-center mx-2">
              <div className="icon">
                <FontAwesomeIcon icon="arrow-alt-circle-left" />
              </div>
              <div className="year">2019</div>
              <div className="icon">
                <FontAwesomeIcon icon="arrow-alt-circle-right" />
              </div>
            </div>

            <div className="month-container d-flex flex-wrap align-items-center justify-content-center mx-2 my-1">
              {months}
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  private createMonthsToSelect(): JSX.Element[] {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(this.props.year, i);
      const monthDisplay = format(month, 'MMM');
      const selectedClass = i === this.props.month ? 'is-selected' : '';

      months.push(
        // i can safely use i here because the months and order are static
        // https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905
        <div
          key={i}
          className={`month-picker-month m-1 d-flex align-items-center justify-content-center ${selectedClass}`}
        >
          {monthDisplay}
        </div>
      );
    }
    return months;
  }
}
