import React from 'react';
import PropTypes from 'prop-types';


interface Props  {
    enabled: boolean;
    timeout: number;
}

type Prpss = {
    enabled: boolean,
    timeout: number
    callback?: Function
}



export class ReactInterval extends React.Component<Props> {
  timer: null | ReturnType<typeof setTimeout>;
  static defaultProps = {
    enabled: false,
    timeout: 1000
  };

  static propTypes = {
    callback: PropTypes.func.isRequired,
    enabled: PropTypes.bool,
    timeout: PropTypes.number
  };


  constructor(props: Props){
    super(props)
    this.timer = null
  }

  componentDidMount() {
    const {enabled} = this.props;
    if (enabled) {
      this.start();
    }
  }

  shouldComponentUpdate({timeout, callback, enabled}: Prpss) {
    const {timeout: timeout1, callback: callback1, enabled: enabled1}: Prpss  = this.props;
    return (
      timeout1 !== timeout
      || callback1 !== callback
      || enabled1 !== enabled
    );
  }

  componentDidUpdate({enabled, timeout}: Prpss ) {
    const {timeout: timeout1, enabled: enabled1} = this.props;
    if (enabled1 !== enabled || timeout1 !== timeout) {
      if (enabled1) {
        this.start();
      } else {
        this.stop();
      }
    }
  }

  componentWillUnmount() {
    this.stop();
  }

  callback = () => {
    if (this.timer) {
      const {callback}: Prpss = this.props;
      typeof callback === 'function'  && callback();
      this.start();
    }
  };

  start = () => {
    this.stop();
    const {timeout} = this.props;
    this.timer = setTimeout(this.callback, timeout);
  };

  stop = () => {
    this.timer && clearTimeout(this.timer);
    this.timer = null;
  };

  render = () => false;
}
