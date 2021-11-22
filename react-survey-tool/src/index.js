import React, { useState } from 'react'
import './styles/Component.css'

const Component = props => {
  const [isOpen, setIsOpen] = useState(false)

  const popupClasses = `popup ${isOpen ? '' : 'hidden'}`

  const onOpenCloseSurvey = () => setIsOpen(!isOpen)
  return (
    <div>
      <button onClick={onOpenCloseSurvey}>Open Survey</button>
      <div className={popupClasses}>
        <div>
          <span className="close-button" onClick={onOpenCloseSurvey}>
            X
          </span>
        </div>
        <iframe src={props.surveyLink}>Browser not compatible.</iframe>
      </div>
    </div>
  )
}

export default Component
