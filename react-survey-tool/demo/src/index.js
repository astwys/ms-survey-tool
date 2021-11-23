import React, { Component } from 'react'
import { render } from 'react-dom'

import '../../css/SurveyTool.css'
import SurveyTool from '../../src'
import surveyToken from './.env'

export default class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-survey-tool Demo</h1>
        <SurveyTool
          surveyLink={`http://localhost:3000/survey/619c9c04583e7d8cc97c860d?token=${surveyToken}`}
        />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
