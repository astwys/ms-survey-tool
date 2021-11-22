import { Survey } from '../../types/Survey'
import SurveyModel from '../models/Survey'

export async function findAll(): Promise<Survey[]> {
  return SurveyModel.find({})
}

export async function createOne(survey: Survey): Promise<Survey | undefined> {
  try {
    return SurveyModel.create(survey)
  } catch (error) {
    console.log(error)
    return
  }
}

export async function findById(id: string): Promise<Survey | undefined> {
  return SurveyModel.findById(id)
}

export async function updateById(id: string, survey: Survey): Promise<Survey | undefined> {
  return SurveyModel.replaceOne({ _id: id }, survey)
}
