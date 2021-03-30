import React from 'react';
import Navigation from './src/navigations/Navigation';
import {LogBox} from 'react-native'

LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Navigation/>
  );
}