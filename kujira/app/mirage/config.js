import config from '../config/environment';

export default function() {

this.namespace = config.APP.NAMESPACE;

this.get('/clusters/:id', function(db, request){
  let id = request.params.id;

  return {
    data: {
      type: 'clusters',
      id: id,
      attributes: db.cluster.find(id)
    }
  };

});

this.get('/osds', function(db/*, request*/){
  return {
    data: db.osds.map(attrs => (
      { type: 'osds', id: attrs.id, attributes: attrs}
    ))
  };
});

this.get('/mons', function(db){
  return {
    data: db.mons.map(attrs => (
      { type: 'mons', id: attrs.id, attributes: attrs}
    ))
  };
});

this.get('/nodes', function(db){
  return {
    data: db.nodes.map(attrs => (
      { type: 'nodes', id: attrs.id, attributes: attrs}
    ))
  };
});

this.get('/pools', function(db){
  return {
    data: db.pools.map(attrs => (
      { type: 'pools', id: attrs.id, attributes: attrs}
    ))
  };
});

this.get('/servers', function(db){
  return {
    data: db.servers.map(attrs => (
      { type: 'servers', id: attrs.id, attributes: attrs}
    ))
  };
});
this.get('/charts', function(db){
  return {
    data: db.charts.map(attrs => (
      { type: 'charts', id: attrs.id, attributes: attrs}
    ))
  };
});
  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  //this.namespace = '/kujira/api/v1';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Route shorthand cheatsheet
  */
  /*
    GET shorthands

    // Collections
    this.get('/contacts');
    this.get('/contacts', 'users');
    this.get('/contacts', ['contacts', 'addresses']);

    // Single objects
    this.get('/contacts/:id');
    this.get('/contacts/:id', 'user');
    this.get('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    POST shorthands

    this.post('/contacts');
    this.post('/contacts', 'user'); // specify the type of resource to be created
  */

  /*
    PUT shorthands

    this.put('/contacts/:id');
    this.put('/contacts/:id', 'user'); // specify the type of resource to be updated
  */

  /*
    DELETE shorthands

    this.del('/contacts/:id');
    this.del('/contacts/:id', 'user'); // specify the type of resource to be deleted

    // Single object + related resources. Make sure parent resource is first.
    this.del('/contacts/:id', ['contact', 'addresses']);
  */

  /*
    Function fallback. Manipulate data in the db via

      - db.{collection}
      - db.{collection}.find(id)
      - db.{collection}.where(query)
      - db.{collection}.update(target, attrs)
      - db.{collection}.remove(target)

    // Example: return a single object with related models
    this.get('/contacts/:id', function(db, request) {
      var contactId = +request.params.id;

      return {
        contact: db.contacts.find(contactId),
        addresses: db.addresses.where({contact_id: contactId})
      };
    });

  */
}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
