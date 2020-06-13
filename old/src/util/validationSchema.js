import * as Yup from 'yup';

export const extractionStepValidation = Yup.object().shape({
    startDate: Yup.date()
      .typeError('Wrong start date format, please set date again.')
      .required('Start date is required!'),
    dateExtractor: Yup.date()
      .when('startDate', (sd, schema) => {
        return Yup.date().min(sd, 'Extractor End Date cannot be before Start Date.');
      })
      .typeError('Wrong extractor date format, please set date again.')
      .required('Extractor date is required!'),
    dateConflicts: Yup.date()
      .when('dateExtractor', (de, schema) => {
        return Yup.date().min(de, 'Conflicts End Date cannot be before End Date for Extractors.');
      })
      .typeError('Wrong conflicts date format, please set date again.')
      .required('Conflicts date is required!'),
    endDate: Yup.date()
      .when('dateConflicts', (dc, schema) => {
        return Yup.date().min(dc, 'Extractor End Date cannot be before End Date for Conflicts.');
      })
      .typeError('Wrong end date format, please set date again.')
      .required('End date is required!'),
    decisors: Yup.array()
      .of(Yup.string())
      .required('Please choose at least one decisor.'),
    extractors: Yup.array()
      .of(Yup.string())
      .required('Please choose at least one extractor.'),
    method: Yup.string().required('Please choose a method of extraction.'),
    numExtractorStudy: Yup.number()
      .required('Please set the number of extractor for study.')
      .integer('Please set an integer value.')
      .max(Yup.ref('extractors.length'), 'Check it out the numbers of Extractors selected.'),
    scoreBoard: Yup.number()
      .required('Please set the number of extractor for study.')
      .integer('Please set an integer value.')
      .max(Yup.ref('numExtractorStudy'), 'Check it out the numbers of extractor for study.')
  });

export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .email('This email address is not valid').required(),
  password: Yup.string()
    .min(6, 'The password must have at least 6 digits').required()
 });

export const singupValidation = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  name: Yup.string().required(),
  password: Yup.string()
    .min(6, 'The password must have at least 6 digits')
    .required(),
  passwordVerification: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const createProject = Yup.object().shape({
  title: Yup.string().required()
});

export const changeName = Yup.object().shape({
  name: Yup.string().required().matches(/^[a-zA-Zà-ú\s]+$/, {message: 'the Name can only letters contain'})
});

export const changeEmail = Yup.object().shape({
  email: Yup.string()
    .email()
    .required()
});

export const changePassword = Yup.object().shape({
  password: Yup.string()
  .min(6, 'The password must have at least 6 digits')
  .required(),
  passwordVerification: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});
