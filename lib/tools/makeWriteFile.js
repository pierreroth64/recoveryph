module.exports = (creation) => {
  const { fileWriteOp } = creation;

  return async (filename, data) => {
    await fileWriteOp(filename, data);
  };
};
