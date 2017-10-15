let dealRes = (res, code, data) => {
  if (code) {
    return res.send({
      code: code,
      status: 'error',
      data: data,
    })
  } else {
    return res.send({
      code: 200,
      status: 'success',
      data: data,
    })
  }
}
module.exports = dealRes