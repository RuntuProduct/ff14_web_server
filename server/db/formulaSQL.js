let formulaSQL = {
  insert: 'INSERT INTO FORMULA(pid, tarId, tarType, num) VALUES(?,?,?,?)',
  query: 'SELECT * FROM FORMULA AS f WHERE f.pid = ? AND f.tarId = ? AND f.tarType = ?',
}

module.exports = formulaSQL
