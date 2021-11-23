# react-survey-tool

This React component can be used to add a survey to your website.

## Usage

1. Go to [https://ms-survey-tool.vercel.app](https://ms-survey-tool.vercel.app) to create a new survey.
2. Copy the provided survey URL from the survey edit page.
3. Create the survey link by appending the survey token (provided by me) to the url in the following format: `<SURVEY_URL>?token=<SURVEY_TOKEN>`

Now you can use the component inside of your project.

Relevant code snippets:

```
import SurveyTool from "react-survey-tool";
import "react-survey-tool/css/SurveyTool.css";

<SurveyTool
  surveyLink="<SURVEY_LINK>"
/>
```
