const JobSQL = {
  insert: 'INSERT INTO product(name, img, jobId, level, difficulty, stamina) VALUES(?,?,?,?,?,?)',
  update: 'UPDATE product SET name = ?, img = ?, jobId = ?, level = ?, difficulty = ?, stamina = ? WHERE id = ?',
  delete: 'DELETE FROM product WHERE id = ?',
  queryPage: 'SELECT p.id, p.name, p.img, p.jobId, p.level, p.difficulty, p.stamina, '
  + 'j.name AS jobName '
  + 'FROM product AS p, job AS j '
  + 'WHERE p.name LIKE ? AND p.jobId IN (?) AND p.jobId = j.id LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM product',
  getUserById: 'SELECT * FROM product WHERE id = ? ',
}

export default JobSQL
