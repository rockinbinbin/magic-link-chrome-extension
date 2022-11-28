import React from 'react'
import { render } from 'react-dom'
import App from './components/App'

import './styles.css'

console.log(
  'document.getSelection().toString(): ',
  document.getSelection().toString()
)

render(
  <App highlightedText={document.getSelection().toString()} />,
  document.getElementById('root')
)
