const locationSQL = {
  insert: 'INSERT'
  + ' INTO location(name, mapId, axisX, axisY, type)'
  + ' VALUES(?,?,?,?,?)',
  update: 'UPDATE'
  + ' location'
  + ' SET name = ?, mapId = ?, axisX = ?, axisY = ?, type = ?'
  + ' WHERE id = ?',
  getLocationById: 'SELECT'
  + ' *'
  + ' FROM location AS l'
  + ' WHERE l.mapId = ?',
  getLocationByIds: 'SELECT'
  + ' *'
  + ' FROM location AS l'
  + ' WHERE l.mapId IN (?)',
  deleteById: 'DELETE FROM location WHERE id = ?',
}

export default locationSQL
