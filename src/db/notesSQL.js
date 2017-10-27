const NotesSQL = {  
  product: 'SELECT * From product AS p '
  + 'WHERE p.jobId = ? AND p.level BETWEEN ? AND ?',
}

export default NotesSQL
