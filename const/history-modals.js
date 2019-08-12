export const HISTORY_MODALS = {
  client_status_hist: {
    header: 'Client status history',
    colNames: ['Person', 'Status', 'Last updated'],
    colKeys: ['updated_by_id', 'client_status', 'updated']
  },
  operations_status_hist: {
    header: 'Operations status history',
    colNames: ['ID', 'Operations status', 'Updated'],
    colKeys: ['updated_by_id', 'operations_status', 'updated']
  },
  qa_status_hist: {
    header: 'QA status history',
    colNames: ['Updated', 'QA status', 'Last updated'],
    colKeys: ['updated', 'qa_status', 'updated']
  },
  production_status_hist: {
    header: 'Production status history',
    colNames: ['Updated', 'Production status', 'Updated by ID'],
    colKeys: ['updated', 'production_status', 'updated_by_id']
  },
  internal_notes_hist: {
    header: 'Internal notes history',
    colNames: ['Updated', 'Internal notes', 'Updated by ID'],
    colKeys: ['updated', 'internal_notes', 'updated_by_id']
  },
  producer_notes_hist: {
    header: 'Producer notes history',
    colNames: ['Updated', 'Producer notes', 'Updated by ID'],
    colKeys: ['updated', 'producer_notes', 'updated_by_id']
  },
  external_notes_hist: {
    header: 'External Notes history',
    colNames: ['Updated', 'External Notes', 'Updated by ID'],
    colKeys: ['updated', 'external_notes', 'updated_by_id']
  }
};
