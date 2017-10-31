const locationSQL = {
  insert: 'INSERT'
  + ' INTO map(name, img)'
  + ' VALUES(?,?)',
  update: 'UPDATE'
  + ' map'
  + ' SET name = ?, img = ?'
  + ' WHERE id = ?',
  getLocationById: 'SELECT'
  + ' *'
  + ' FROM location AS l'
  + ' WHERE l.mapId = ?',
  getLocationByIds: 'SELECT'
  + ' *'
  + ' FROM location AS l'
  + ' WHERE l.mapId IN (?)',
}

export default locationSQL
