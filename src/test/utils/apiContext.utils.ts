let lastSpec: any;

export const setLastSpec = (spec: any) => {
  lastSpec = spec;
};

export const getLastSpec = () => {
  if (!lastSpec) {
    throw new Error('No API request executed before validation');
  }
  return lastSpec;
};

export const clearLastSpec = () => {
  lastSpec = undefined;
};
