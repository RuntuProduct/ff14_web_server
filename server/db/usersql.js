var UserSQL = {  
  insert:'INSERT INTO User(uid,userName) VALUES(?,?)', 
  queryAll:'SELECT * FROM User',  
  getUserById:'SELECT * FROM User WHERE id = ? ',
  userLogin:'SELECT * FROM User WHERE ( account = ? AND pwd = ? )',
};

module.exports = UserSQL;
