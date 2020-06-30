import { defineAbility } from '@casl/ability';

export default function defineAbilityFor(user) {
  return defineAbility((can, cannot) => {
    can('read', 'Article');
    if (user.isLoggedIn) {
      can('create', 'Article');
      can('update', 'Article', { author_id: user.id });
      can('create', 'Comment', { user_id: user.id });
    }
  });
}
