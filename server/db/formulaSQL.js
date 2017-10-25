let formulaSQL = {
  insert: 'INSERT INTO FORMULA(pid, tarId, tarType, num) VALUES(?,?,?,?)',
  compare: 'SELECT * FROM FORMULA AS f WHERE f.pid = ? AND f.tarId = ? AND f.tarType = ?',  // 比较
  query: 'SELECT j.id AS jobId, j.name AS jobName,'
  + 'p.id AS proId, p.name AS proName, p.type AS proType,'
  + 'f.tarId AS forTarId, f.tarType AS forTarId, f.num AS forNum,'
  + 'FROM JOB AS j, PRODUCT AS p, FORMULA AS f '
  + 'WHERE f.pid LIKE ?',
}

module.exports = formulaSQL
