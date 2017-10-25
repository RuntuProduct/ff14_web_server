var fishSQL = {
  insert: 'INSERT INTO Fish(name, img)' + 'VALUES(?,?)',
  queryPage: 'SELECT * FROM Fish AS f WHERE f.name LIKE ? LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM Fish',
}

module.exports = fishSQL
