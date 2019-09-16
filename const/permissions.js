export const PERMISSIONS = {
  Administrator: {
    admin: ['CREATE', 'READ', 'EDIT'],
    products: ['CREATE', 'READ', 'EDIT'],
    people: ['CREATE', 'READ', 'EDIT'],
    t_events: ['CREATE', 'READ', 'EDIT']
  },
  Operations: {
    admin: ['CREATE', 'READ', 'EDIT'],
    t_events: ['CREATE', 'READ', 'EDIT']
  },
  QA: {admin: ['CREATE', 'READ', 'EDIT']},
  Producer: {admin: ['READ']},
  ExternalUser: {},
  OpsAdmin: {
    admin: ['CREATE', 'READ', 'EDIT'],
    people: ['CREATE', 'READ', 'EDIT']
  },
  AccountManagement: {
    admin: ['READ'],
    t_events: ['CREATE', 'READ', 'EDIT']
  }
};
