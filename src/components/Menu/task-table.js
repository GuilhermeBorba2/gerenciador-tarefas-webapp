const columns = [
  { name: 'name', required: true, label: 'Nome', align: 'left', field: row => row.name, sortable: true },
  { name: 'description', required: true, label: 'Descrição', align: 'left', field: row => row.description, sortable: true },

];

export {columns};
