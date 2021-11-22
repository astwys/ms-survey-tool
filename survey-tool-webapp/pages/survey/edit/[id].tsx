import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { Survey } from '../../../types/Survey'

import CreateUpdateSurvey from '../../../components/organisms/createUpdateSurvey'

const EditSurvey: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [survey, setSurvey] = useState<Survey>()
  const { data, error } = useSWR<Survey>(id ? `/api/survey/${id}` : null)

  useEffect(() => {
    if (data) {
      setSurvey(data)
    }
  }, [data])

  if (error) return <div>failed to load</div>
  if (!data || !survey) return <div>loading...</div>

  return <CreateUpdateSurvey type="update" survey={survey} />
}

export default EditSurvey
