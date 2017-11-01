const mapSQL = {
  insert: 'INSERT'
  + ' INTO map(name, img, baseX, baseY)'
  + ' VALUES(?,?)',
  update: 'UPDATE'
  + ' map'
  + ' SET name = ?, img = ?, baseX = ?, baseY = ?'
  + ' WHERE id = ?',
  queryPage: 'SELECT'
  + ' *'
  + ' FROM map AS m'
  + ' WHERE m.name LIKE ? LIMIT ?,?',
  count: 'SELECT COUNT(*) AS total FROM map',
}

export default mapSQL
