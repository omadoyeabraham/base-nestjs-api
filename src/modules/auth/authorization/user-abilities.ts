import { Ability } from '@casl/ability';

const rules = [
  {
    action: 'read',
    subject: 'Post',
  },
  {
    action: 'delete',
    subject: 'Post',
    conditions: { published: true },
    inverted: true,
  },
];

export default new Ability(rules);
