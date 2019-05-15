import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {format, isSameMonth} from 'date-fns';
import React from 'react';
import ReactDOM from 'react-dom';
import './MonthPickerModal.scss';
// tslint:disable-next-line: no-var-requires
const Popper = require('popper.js').default;

export interface MonthPickerProps {
  month: Date;
  onMonthSelected: (date: Date) => void;
}

interface MonthPickerState {
  style: React.CSSProperties;
  isVisible: boolean;
  yearToShow: number;
}

export class MonthPickerModal extends React.Component<MonthPickerProps, MonthPickerState> {
  private modalRef: React.RefObject<HTMLDivElement>;
  private arrowRef: React.RefObject<HTMLDivElement>;

  private get pickerParent(): HTMLElement | null {
    const pickerNode = ReactDOM.findDOMNode(this);
    if (!pickerNode) {
      return null;
    }

    return pickerNode.parentElement;
  }

  constructor(props: MonthPickerProps) {
    super(props);

    this.state = {style: {}, isVisible: false, yearToShow: props.month.getFullYear()};
    this.modalRef = React.createRef();
    this.arrowRef = React.createRef();
  }

  public componentDidMount() {
    this.listenToParentClick();
    this.determineModalPosition();
  }

  public componentDidUpdate() {
    this.determineModalPosition();
  }

  private listenToParentClick() {
    if (this.pickerParent) {
      this.pickerParent.addEventListener('click', (event: MouseEvent) => {
        if (event.target !== this.pickerParent) {
          return;
        }

        this.setState(statePreviously => {
          const isVisible = !statePreviously.isVisible;
          let yearToShow = statePreviously.yearToShow;

          if (!statePreviously.isVisible) {
            yearToShow = new Date().getFullYear();
          }

          return {isVisible, yearToShow};
        });
      });
    }
  }

  private determineModalPosition() {
    if (this.modalRef.current && this.pickerParent) {
      new Popper(this.pickerParent, this.modalRef.current, {
        modifiers: {
          arrow: {
            element: this.arrowRef.current,
          },
          offset: {
            enabled: true,
            offset: '0, 10',
          },
        },
      });
    }
  }

  public render() {
    const months = this.createMonthsToSelect();

    if (this.state.isVisible) {
      return (
        <div>
          <div className="modal-overlay" onClick={this.hideModalOverlay} />
          <div
            ref={this.modalRef}
            className="month-picker popper bg-light text-dark"
            style={this.state.style}
          >
            <div ref={this.arrowRef} className="popper__arrow text-light" x-arrow="" />
            <div className="year-row d-flex justify-content-between align-items-center mx-2">
              <div className="month-picker-icon" onClick={this.goToPreviousYear}>
                <FontAwesomeIcon icon="arrow-alt-circle-left" />
              </div>
              <div className="year">{this.state.yearToShow}</div>
              <div className="month-picker-icon" onClick={this.goToNextYear}>
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
      const month = new Date(this.state.yearToShow, i);
      const monthDisplay = format(month, 'MMM');
      const selectedClass = isSameMonth(this.props.month, month) ? 'is-selected' : '';
      let iconIndicatingSameMonth = null;

      if (isSameMonth(new Date(), month)) {
        iconIndicatingSameMonth = <FontAwesomeIcon className="is-current-month" icon="circle" />;
      }

      months.push(
        // i can safely use i here because the months and order are static
        // https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905
        <div
          key={i}
          onClick={() => this.selectMonth(month)}
          className={`month-picker-month m-1 d-flex flex-column align-items-center justify-content-center ${selectedClass}`}
        >
          <div>{monthDisplay}</div>
          {iconIndicatingSameMonth}
        </div>
      );
    }
    return months;
  }

  private hideModalOverlay = () => {
    this.setState({isVisible: false});
  };

  private goToPreviousYear = () => {
    this.setState(previousState => ({yearToShow: previousState.yearToShow - 1}));
  };

  private goToNextYear = () => {
    this.setState(previousState => ({yearToShow: previousState.yearToShow + 1}));
  };

  private selectMonth = (month: Date) => {
    this.props.onMonthSelected(month);
    this.setState({isVisible: false});
  };

}
