# Survey-Tool Webapp

This is a Next.js webapp used to create and edit surveys.
It can be accessed at [https://ms-survey-tool.vercel.app/](https://ms-survey-tool.vercel.app/).

An admin user can log in to manage all surveys.  
Each survey also provides an access link which, in combination with a token, can be used to access a survey and/or integrate the [react-survey-tool](https://www.npmjs.com/package/react-survey-tool) library into your own project.

Create the survey link by appending the survey token (environment variable) to the url in the following format: `<SURVEY_URL>?token=<SURVEY_TOKEN>`.

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Environment Variables

To get the project running locally please create a `.env.local` file with the following content:

```
SECRET_COOKIE_PASSWORD=
ADMIN_USER=
ADMIN_PWD=
MONGODB_URI=
SURVEY_TOKEN=
```
