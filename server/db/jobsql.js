var JobSQL = {  
  insert: 'INSERT INTO User(uid,userName) VALUES(?,?)', 
  queryPage: 'SELECT * FROM Job LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM Job',
  getUserById: 'SELECT * FROM Job WHERE id = ? ',
  userLogin: 'SELECT * FROM User WHERE ( account = ? AND pwd = ? )',
};

module.exports = JobSQL;
