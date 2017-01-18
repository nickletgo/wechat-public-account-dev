import sha1 from 'sha1';

const verify = config => (
  (req, res) => {
    const { signature, nonce, timestamp, echostr } = req.query;
    const queryArr = [config.secret.token, timestamp, nonce];
    queryArr.sort();
    const calculatedSig = sha1(queryArr.join(''));

    let ret = null;
    if (calculatedSig === signature) {
      ret = echostr;
    }
    return res.send(ret);
  });

export default verify;
