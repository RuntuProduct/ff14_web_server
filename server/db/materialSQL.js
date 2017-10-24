var materialSQL = {  
  insert: 'INSERT INTO Material(name, img, jobId, getType)' + 'VALUES(?,?,?,?)',
  update: 'UPDATE Material SET name = ?, img = ?, jobId = ?, getType = ? WHERE id = ?',
  delete: 'DELETE FROM Material WHERE id = ?',
  queryPage: 'SELECT m.id, m.name, m.getType, m.img, m.jobId,'
  + 'j.id AS jobId, j.name AS jobName '
  + 'FROM Material AS m, Job AS j ' 
  + 'WHERE m.name LIKE ? AND m.getType In (?) AND m.jobId = j.id LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM Material',
  getUserById: 'SELECT * FROM Material WHERE id = ? ',
};

module.exports = materialSQL;
