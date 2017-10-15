let dealRes = (res, code, data) => {
  if (code) {
    return res.send({
      code: code,
      status: 'error',
      message: data,
      data: null,
    })
  } else {
    return res.send({
      code: 200,
      status: 'success',
      message: 'success',
      data: data,
    })
  }
}
module.exports = dealRes