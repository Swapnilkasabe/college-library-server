// Helper function to check if an array is not empty
export const isNotEmptyArray = (array) => {
  return Array.isArray(array) && array.length > 0;
};

// Helper function to set set date format
export const setDueDate = (minutes) => {
  const dueDate = new Date();
  dueDate.setMinutes(dueDate.getMinutes() + minutes);
  return dueDate;
};
