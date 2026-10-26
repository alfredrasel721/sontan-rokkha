/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider } from './context/AppContext';
import { DualDeviceView } from './components/dual/DualDeviceView';
import { ToastContainer } from './components/common/ToastContainer';

export default function App() {
  return (
    <AppProvider>
      <DualDeviceView />
      <ToastContainer />
    </AppProvider>
  );
}
