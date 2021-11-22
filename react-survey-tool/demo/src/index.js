import React, { Component } from 'react'
import { render } from 'react-dom'

import SurveyTool from '../../src'

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-survey-tool Demo</h1>
        <SurveyTool surveyLink="http://localhost:3000/survey/1" />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
