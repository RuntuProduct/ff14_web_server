var fishSQL = {
  insert: 'INSERT INTO Fish(name, img)' + 'VALUES(?,?)',
  update: 'UPDATE FISH SET name = ?, img = ? WHERE id = ?',
  queryPage: 'SELECT * FROM Fish AS f WHERE f.name LIKE ? LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM Fish',
}

module.exports = fishSQL
