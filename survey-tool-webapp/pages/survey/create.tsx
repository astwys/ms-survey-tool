import { useMemo } from 'react'
import { SurveyWithoutId } from '../../types/Survey'
import CreateUpdateSurvey from '../../components/organisms/createUpdateSurvey'

const CreateSurvey = () => {
  const survey = useMemo<SurveyWithoutId>(() => ({ name: '', questions: [] }), [])

  return <CreateUpdateSurvey type="create" survey={survey} />
}

export default CreateSurvey
