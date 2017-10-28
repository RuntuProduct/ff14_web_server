const formulaSQL = {
  insert: 'INSERT INTO formula(pid, tarId, tarType, num) VALUES(?,?,?,?)',
  compare: 'SELECT * FROM formula AS f WHERE f.pid = ? AND f.tarId = ? AND f.tarType = ?',  // 比较
  query: 'SELECT j.id AS jobId, j.name AS jobName,'
  + 'p.id AS proId, p.name AS proName, p.type AS proType,'
  + 'f.tarId AS forTarId, f.tarType AS forTarId, f.num AS forNum,'
  + 'FROM job AS j, PRODUCT AS p, formula AS f '
  + 'WHERE f.pid LIKE ?',
  // 获取product详情
  getSingleProduct: 'SELECT'
  + ' p.id, p.name, p.img, p.level, p.difficulty, p.stamina,'
  + ' j.id AS jobId, j.name AS jobName'
  + ' FROM product AS p, job AS j'
  + ' WHERE p.id = ? AND j.id = p.jobId',
  // 根据pid获取配方集合
  getFormulaByPid: 'SELECT'
  + ' *'
  + ' FROM formula AS f'
  + ' WHERE f.pid = ?',
  // 根据id集合获取材料
  getMaterialByIds: 'SELECT'
  + ' m.id, m.name, m.img,'
  + ' j.id AS jobId, j.name AS jobName'
  + ' FROM material AS m, job AS j'
  + ' WHERE m.id IN (?) AND m.jobId = j.id',
  // 根据id集合获取作物
  getProductByIds: 'SELECT'
  + ' p.id, p.name, p.img,'
  + ' j.id AS jobId, j.name AS jobName'
  + ' FROM product AS p, job AS j'
  + ' WHERE p.id IN (?) AND p.jobId = j.id',
  // 根据id集合获取鱼类
  getFishByIds: 'SELECT'
  + ' f.id, f.name, f.img,'
  + ' j.id AS jobId, j.name AS jobName'
  + ' FROM fish AS f, job AS j'
  + ' WHERE f.id IN (?) AND j.id = 1',
}

export default formulaSQL
