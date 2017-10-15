var JobSQL = {  
  insert: 'INSERT INTO Product(name, img, jobId, difficulty, stamina) VALUES(?,?,?,?,?)',
  update: 'UPDATE Product SET name = ?, img = ?, jobId = ?, difficulty = ?, stamina = ? WHERE id = ?',
  delete: 'DELETE FROM Product WHERE id = ?',
  queryPage: 'SELECT p.id, p.name, j.id AS jobId, j.name AS jobName, p.img, p.jobId, p.difficulty, p.stamina FROM Product AS p, Job AS j WHERE p.jobId = j.id LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM Product',
  getUserById: 'SELECT * FROM Product WHERE id = ? ',
};

module.exports = JobSQL;
