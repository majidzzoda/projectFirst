import React from 'react';
import { Switch } from 'antd';

const Switcher = ({ toggleTheme }) => <Switch defaultChecked onChange={toggleTheme} />;
export default Switcher;