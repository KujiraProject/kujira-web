import Mirage from 'ember-cli-mirage';

export default function() {
  this.namespace = '/kujira/api/v1';
  
  /*
    Extension for users

  */
  this.get('/users', function(db, request){
    if(request.requestHeaders.Authorization === "Bearer PA$$WORD") {
      return { "data":{"id":"1","type":"users","attributes":{"group":"users"}} };
    }
    if(request.requestHeaders.Authorization === "Bearer APA$$WORD") {
      return { "data":{"id":"1","type":"users","attributes":{"group":"admins"}} };
    }
    if(request.requestHeaders.Authorization === "Bearer SUPA$$WORD") {
      return { "data":{"id":"1","type":"users","attributes":{"group":"susers"}} };
    }
    else{
      return new Mirage.Response(401, {}, {});
    }
  });

  /*
    This is an example of users DV.

    Usage login/password:
      user/user;
      suser/suser.
  */
  this.post('/token', function(db, request){
    var params = JSON.parse(request.requestBody);
    const username= params['username'];
    const password= params['password'];

    if(username === "user" && password === "user") {
      return {
        "access_token":"PA$$WORD",
        "token_type":"bearer"
      };
    }
    if(username === "admin" && password === "admin") {
      return {
        "access_token":"APA$$WORD",
        "token_type":"bearer"
      };
    }
    if(username === "suser" && password === "suser") {
      return {
        "access_token":"SUPA$$WORD",
        "token_type":"bearer"
      };
    }

    var body = { errors: 'Email or password is invalid for '+ username  };
    return new Mirage.Response(401, {}, body);
  });
}
