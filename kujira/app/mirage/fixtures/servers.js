export default [
  {
    "id": "node1",
    "ceph-version": "0.67.8-simulator",
    "managed": true,
    "hostname": "node1",
    "fqdn": "node1",
    "frontend-addr": "192.168.200.11",
    "boot-time": "1970-01-02T10:17:36+00:00",
    "backend-addr": "192.168.200.11",
    "last-contact": "2016-04-11T10:35:35.662234+00:00",
    "backend-iface": null,
    "frontend-iface": null,
    "relationships": [
        {
          "data": {
            "attributes": {
              "running": true,
              "fsid": "bbbe0862-ceaa-4176-9f01-c8c7ef45763e"
            },
            "type": "mons",
            "id": "node1"
          }
        },
        {
          "data": {
            "attributes": {
              "running": true,
              "fsid": "bbbe0862-ceaa-4176-9f01-c8c7ef45763e"
            },
            "type": "osds",
            "id": "0"
          }
        }
    ]
  }
];
