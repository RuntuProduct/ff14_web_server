const fishSQL = {
  insert: 'INSERT INTO fish(name, img)' + 'VALUES(?,?)',
  update: 'UPDATE fish SET name = ?, img = ? WHERE id = ?',
  queryPage: 'SELECT * FROM fish AS f WHERE f.name LIKE ? LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM fish',
}

export default fishSQL
