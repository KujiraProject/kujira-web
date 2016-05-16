import { test } from 'qunit';
import moduleForAcceptance from 'kujira/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | superuser can change users roles');

test('Superuser can change users roles', function(assert) {
  assert.expect(1);
  server.loadFixtures();
  visit('/settings/users');
  fillIn('#user0RoleSelection', 'guest');
  click('#user0Save');
  visit('/pools');
  visit('/settings/users');

  andThen(function() {
      var user = server.db.users[0];
      assert.equal(user.role, 'guest');
  });
});
