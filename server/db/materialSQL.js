var materialSQL = {  
  insert: 'INSERT INTO material(name, img, jobId, getType)' + 'VALUES(?,?,?,?)',
  update: 'UPDATE material SET name = ?, img = ?, jobId = ?, getType = ? WHERE id = ?',
  delete: 'DELETE FROM material WHERE id = ?',
  queryPage: 'SELECT m.id, m.name, m.getType, m.img, m.jobId,'
  + 'j.id AS jobId, j.name AS jobName '
  + 'FROM material AS m, job AS j ' 
  + 'WHERE m.name LIKE ? AND m.getType In (?) AND m.jobId = j.id LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM material',
  getUserById: 'SELECT * FROM material WHERE id = ? ',
};

module.exports = materialSQL;
