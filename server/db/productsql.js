var JobSQL = {  
  insert: 'INSERT INTO Product(name, img, jobId, level, difficulty, stamina) VALUES(?,?,?,?,?)',
  update: 'UPDATE Product SET name = ?, img = ?, jobId = ?, level = ?, difficulty = ?, stamina = ? WHERE id = ?',
  delete: 'DELETE FROM Product WHERE id = ?',
  queryPage: 'SELECT p.id, p.name, p.img, p.jobId, p.level, p.difficulty, p.stamina, '
  + 'j.name AS jobName '
  + 'FROM Product AS p, Job AS j '
  + 'WHERE p.name LIKE ? AND p.jobId IN (?) AND p.jobId = j.id LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM Product',
  getUserById: 'SELECT * FROM Product WHERE id = ? ',
};

module.exports = JobSQL;
