var UserSQL = {  
  insert:'INSERT INTO user(uid,userName) VALUES(?,?)', 
  queryAll:'SELECT * FROM user',  
  getUserById:'SELECT * FROM user WHERE id = ? ',
  userLogin:'SELECT * FROM user WHERE ( account = ? AND pwd = ? )',
};

module.exports = UserSQL;
