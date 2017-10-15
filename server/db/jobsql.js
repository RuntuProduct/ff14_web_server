var JobSQL = {  
  insert: 'INSERT INTO User(uid,userName) VALUES(?,?)', 
  queryPage: 'SELECT * FROM Job LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM Job',
  queryValue: "SELECT * FROM Job WHERE name LIKE ? OR type In (?)",
};

module.exports = JobSQL;
