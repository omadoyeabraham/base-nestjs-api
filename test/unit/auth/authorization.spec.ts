import ability from '../../../src/modules/auth/authorization/defineAbility';
import defineAbilityFor from '../../../src/modules/auth/authorization/superAdminAbility';

class Entity {
  constructor(attrs) {
    Object.assign(this, attrs);
  }
}

class Article extends Entity {}

describe('Authorization Functionality', () => {
  it('runs', () => {
    const user = { id: 14, isLoggedIn: true };
    const ownArticle = new Article({ author_id: user.id });
    const otherArticle = new Article({ author_id: 12 });

    expect(ability.can('read', 'User')).toBe(true);

    const superAdminAbility = defineAbilityFor(user);

    expect(superAdminAbility.can('update', ownArticle)).toBe(true);
    expect(superAdminAbility.can('update', otherArticle)).toBe(false);
  });
});
