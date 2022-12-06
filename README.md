# :watch: React Interval Hook

> React hook for using **self-correcting** `setInterval`, augmented by management methods (start, stop, isActive)

[![Build Status](https://travis-ci.org/minwork/react-interval-hook.svg?branch=master)](https://travis-ci.org/minwork/react-interval-hook)
[![codecov](https://codecov.io/gh/minwork/react-interval-hook/branch/master/graph/badge.svg)](https://codecov.io/gh/minwork/react-interval-hook)
![npm type definitions](https://img.shields.io/npm/types/react-interval-hook)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-interval-hook)](https://bundlephobia.com/result?p=react-interval-hook)
[![npm](https://img.shields.io/npm/v/react-interval-hook)](https://www.npmjs.com/package/react-interval-hook)
[![GitHub](https://img.shields.io/github/license/minwork/react-interval-hook)](https://github.com/minwork/react-interval-hook/blob/master/LICENSE)

-   Self-correcting ([explanation](https://stackoverflow.com/a/29972322/10322539))
-   Manageable (start, stop, isActive)
-   Thoroughly tested

## Install

```bash
yarn add @zaki1001/react-interval
```

or

```bash
npm install --save @zaki1001/react-interval
```

## Basic Usage

```typescript jsx
import React from 'react';
import { useInterval } from 'react-interval-hook';

const Example = () => {
    useInterval(() => {
        console.log('I am called every second');
    });
};
```

## Advanced usage

Hook can accept various config option as well as return methods that allow you to control it behaviour.

### Definition

```
useInterval(callback [, intervalMs] [, options]): { start, stop, isActive }
```

### Example

[![Edit react-interval-hook](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-interval-hook-bi0kx?fontsize=14&hidenavigation=1&theme=dark)

```typescript jsx
import React, { useState } from 'react';
import { useInterval } from 'react-interval-hook';

const AdvancedExample = () => {
    const { start, stop, isActive } = useInterval(
        () => {
            console.log('Callback every 500 ms');
        },
        500,
        {
            autoStart: false,
            immediate: false,
            selfCorrecting: false,
            onFinish: () => {
                console.log('Callback when timer is stopped');
            },
        }
    );
    const [active, setActive] = useState(isActive());
    const [triggerFinishCallback, setTriggerFinishCallback] = useState(true);

    return (
        <div>
            <button type="button" onClick={start} id="start">
                Start
            </button>
            <button type="button" onClick={() => stop(triggerFinishCallback)} id="stop">
                Stop
            </button>
            <button type="button" onClick={() => setActive(isActive())} id="checkActive">
                Check active
            </button>
            <div id="active">Active: {active ? 1 : 0}</div>
            <div>
                <label htmlFor="trigger-finish-callback">
                    <input
                        id="trigger-finish-callback"
                        type="checkbox"
                        defaultChecked={triggerFinishCallback}
                        onChange={() => setTriggerFinishCallback(current => !current)}
                    />
                    Trigger finish callback
                </label>
            </div>
        </div>
    );
};
```

## Usage For React Class Based Components

### Quickstart
Start counting on render

```js
import { ReactInterval } from 'react-interval';

const App = React.createClass({
  getInitialState() {
    return {count: 0};
  },

  render() {
    const {count} = this.state;

    return (
      <div>
        {count}
        <ReactInterval timeout={1000} enabled={true}
          callback={() => this.setState({count: this.state.count + 1})} />
      </div>
    );
  }
});
```

### Full example
Change timeout on the fly, start and stop counting

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { ReactInterval } from 'react-interval';

const App = React.createClass({
  getInitialState() {
    return {
      enabled: false,
      timeout: 1000,
      count: 0
    };
  },

  render() {
    const {timeout, enabled, count} = this.state;

    return (
      <div>
        <ReactInterval {...{timeout, enabled}}
          callback={() => this.setState({count: this.state.count + 1})} />

        <input type="number" step="200" min="200" max="5000" value={this.state.timeout}
          onChange={({target: {value}}) => this.setState({timeout: parseInt(value, 10)})} />&nbsp;

        <button disabled={enabled} onClick={() => this.setState({enabled: true})}>
          Start</button>&nbsp;

        <button disabled={!enabled} onClick={() => this.setState({enabled: false})}>
          Stop</button>&nbsp;

        {count}
      </div>
    );
  }
});

const appRoot = document.createElement('div');
document.body.appendChild(appRoot);
ReactDOM.render(<App />, appRoot);
```

## Options


#### `callback`: PropTypes.func.isRequired

Function repeatedly called after timeout


#### `enabled`: PropTypes.bool (default: false)

Should start timer?


#### `timeout`: PropTypes.number (default: 1000)

Timeout before each `callback` call


### Options

| Name        |   Type   | Default  | Description                                                                                                                                                           |
| ----------- | :------: | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| autoStart   | boolean  |   true   | Start interval timer right after component is mounted                                                                                                                 |
| immediate   | boolean  |  false   | Trigger _callback_ immediately after timer is started                                                                                                                 |
| selfCorrecting | boolean  |   true   | Self correct time intervals between subsequent _callback_ invocations to reflect actual time elapsed (setInterval and setTimeout are not accurate and tend to drift). |
| onFinish    | Function | () => {} | Called after timer is stopped (by _stop_ method or component unmount)                                                                                                 |

### Management methods

`useInterval` hook return object with various management methods

| Name     | Arguments                                                                     | Return  | Description                                                                                        |
| -------- | ----------------------------------------------------------------------------- | :-----: | -------------------------------------------------------------------------------------------------- |
| start    | None                                                                          |  void   | Starts timer when _autoStart_ is set to `false` or after timer was stopped using _stop_ method     |
| stop     | [optional]&nbsp;triggerFinishCallback<br/>- Type: boolean<br/>- Default: true |  void   | Stops timer (**not pause**) after it was started using either _autoStart_ option or _start_ method |
| isActive | None                                                                          | boolean | Return current timer status - is it running or not                                                 |

## License

MIT © [minwork](https://github.com/zaki-vempower)
