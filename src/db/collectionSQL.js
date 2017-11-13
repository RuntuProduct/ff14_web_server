const locationSQL = {
  queryMatByName: 'SELECT'
  + ' *'
  + ' FROM material AS m'
  + ' WHERE m.name LIKE ?',
  queryFishByName: 'SELECT'
  + ' *'
  + ' FROM fish AS f'
  + ' WHERE f.name LIKE ?',
  insert: 'INSERT'
  + ' INTO collection(loId, tarType, tarId)'
  + ' VALUES(?,?,?)',
  deleteById: 'DELETE FROM collection WHERE id = ?',

  queryByloId: 'SELECT'
  + ' *'
  + ' FROM collection AS c'
  + ' WHERE c.loId = ?',
  queryMatByIds: 'SELECT'
  + ' *'
  + ' FROM material AS m'
  + ' WHERE m.id in (?)',
  queryFIshByIds: 'SELECT'
  + ' *'
  + ' FROM fish AS f'
  + ' WHERE f.id in (?)',
}

export default locationSQL
