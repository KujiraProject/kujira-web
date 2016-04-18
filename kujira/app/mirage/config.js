import Mirage from 'ember-cli-mirage';

export default function() {
  this.namespace = '/kujira/api/v1';
  this.get('/users', function(db, request){
    if(request.requestHeaders.Authorization === "Bearer PA$$WORD") {
      return { "data":{"id":"1","type":"users","attributes":{"email":"user@user.com"}} };
    }
    if(request.requestHeaders.Authorization === "Bearer SUPA$$WORD") {
      return { "data":{"id":"1","type":"users","attributes":{"email":"suser@suser.com"}} };
    }
    else{
      return new Mirage.Response(401, {}, {});
    }
  });

  function formEncodedToJson(encoded) {
    var result = {};
    encoded.split("&").forEach(function(part) {
      var item = part.split("=");
      result[item[0]] = decodeURIComponent(item[1]);
    });
    return result;
  }
  /*
    This is an example of users DV.

    Usage login/password: 
      user/user;
      suser/suser.
  */
  this.post('/token', function(db, request){
    var params = formEncodedToJson(request.requestBody);
    if(params.username === "user" && params.password === "user") {
      return {
        "access_token":"PA$$WORD",
        "token_type":"bearer"
      };
    }
    if(params.username === "suser" && params.password === "suser") {
      return {
        "access_token":"SUPA$$WORD",
        "token_type":"bearer"
      };
    }

    var body = { errors: 'Email or password is invalid for '+params.username  };
    return new Mirage.Response(401, {}, body);
  });
}
