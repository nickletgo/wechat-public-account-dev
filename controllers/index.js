const index = (req, res) => {
  const indexInfo = {
    name: 'Wechat Official Account Demo',
    version: '0.1',
  };
  res.writeHeader(200, 'application/json');
  res.write(JSON.stringify(indexInfo));
  res.end();
};

export default index;
