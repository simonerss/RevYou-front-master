// export const STEP_METHOD = [
//   {
//     name: 'EMI',
//     tooltip: 'Individual',
//     disabled: false
//   },
//   {
//     name: 'EMCCA',
//     tooltip: 'Collaborative Comparing Results for All Articles',
//     disabled: false
//   },
//   {
//     name: 'EMCRA',
//     tooltip: 'Collaborative Reviewing Results for All Articles',
//     disabled: true
//   },
//   {
//     name: 'EMCRS',
//     tooltip: 'Collaborative Reviewing Results for a Sample of Articles',
//     disabled: true
//   }
// ];

export const stepMethods = {
  EMI: {
    name: 'EMI',
    tooltip: 'Individual',
    disabled: false
  },
  EMCCA: {
    name: 'EMCCA',
    tooltip: 'Collaborative Comparing Results for All Articles',
    disabled: false
  },
  EMCRA: {
    name: 'EMCRA',
    tooltip: 'Collaborative Reviewing Results for All Articles',
    disabled: true
  },
  EMCRS: {
    name: 'EMCRS',
    tooltip: 'Collaborative Reviewing Results for a Sample of Articles',
    disabled: true
  }
};
Object.freeze(stepMethods);

export const fieldTypes = { OPEN: 'open', SINGLE: 'single', MULTIPLE: 'multiple' };
Object.freeze(fieldTypes);

export const formTypes = { EXTRACTION: 'extraction', FINAL: 'final' };
Object.freeze(formTypes);

export const formStatus = { ASSIGNED: 'assigned', ON_GOING: 'on_going', FILLED: 'filled' };
Object.freeze(formStatus);

export const answerStatus = {
  PENDING: 'pending',
  FILLED: 'filled',
  IN_CONFLIC: 'in_conflict',
  FINAL: 'final'
};
Object.freeze(answerStatus);

export const stepStatus = {
  SETTING: 'setting',
  ON_GOING: 'on_going',
  SETTING_DECISORS: 'setting_decisors',
  REVIEWING: 'reviewing',
  SOLVING_CONFLICTS: 'solving _conflicts',
  FINISHED: 'finished'
};

Object.freeze(stepStatus);
