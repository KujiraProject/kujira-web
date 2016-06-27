import wsClient from './websockets/client';
import config from '../config/environment';
import {
    getOsdsChartData,
    getNodesChartData
} from './charts';
export default function() {
    wsClient.connect(config.port);
  wsClient.send('event notification', {"osd-id": 1, "message": "osd failure reason"});

this.namespace = config.APP.NAMESPACE;

this.get('/tasks', function(db){
  return {
    data: db.tasks.map(attrs => (
      { type: 'tasks', id: attrs.id, attributes: attrs}
    ))
  };
});

this.get('/clusters', function(db){
  return {
    data: db.clusters.map(attrs => (
      { type: 'clusters', id: attrs.id, attributes: attrs}
    ))
  };
});

this.get('/osds', function(db){
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
      { type: 'servers', id: attrs.id, attributes: attrs, relationships: attrs.relationships}
    ))
  };
});

this.get('/servers-info', function(db){
  return {
    data: db.servers.map(attrs => (
      { type: 'servers', id: attrs.id, attributes: attrs, relationships: attrs.relationships}
    ))
  };
});

this.get('/servers/:id', function(db, request){
    var id = request.params.id;
  return {
      data: {
          type: 'servers',
          id: id,
          attributes: db.servers.find(id)
      }
  };
});
this.get('/discs', function(db, request){
    // var id = request.params.id;
  return {
    data: db.discs.where({server: request.queryParams.server}).map(attrs => (
      { type: 'disc', id: attrs.id, attributes: attrs}
    ))
  };
});

this.get('/osdsChartData', function() {
    return getOsdsChartData();
});

this.get('/nodesChartData', function() {
    return getNodesChartData();
});

this.get('/servers/:id', function(db, request){
    var id = request.params.id;
  return {
      data: {
          type: 'servers',
          id: id,
          attributes: db.servers.find(id)
      }
  };
});
this.get('/disks', function(db, request){
    // var id = request.params.id;
  return {
    data: db.disks.where({server: request.queryParams.server}).map(attrs => (
      { type: 'disk', id: attrs.id, attributes: attrs}
    ))
  };
});

this.get('/osdsChartData', function() {
    return getOsdsChartData();
});

this.get('/nodesChartData', function() {
    return getNodesChartData();
});

this.get('/users', function(db){
  return {
    data: db.users.map(attrs => (
      { type: 'users', id: attrs.id, attributes: attrs}
    ))
  };
});


this.patch('/users/:id', function(db, request) {
  var id = parseInt(request.params.id);
  var attrs = JSON.parse(request.requestBody).data.attributes;

  db.users.update(id, {role: attrs.role});

  return {
    data: {
      type: 'users',
      id: id,
      attributes: db.users.find(id)
    }
  };
});

}

/*
You can optionally export a config that is only loaded during tests
export function testConfig() {

}
*/
