'use strict';

var routes = require('next-routes')();

routes.add('/campaigns/new', 'campaigns/new').add('/campaigns/:address', '/campaigns/show').add('/campaigns/:address/requests', '/campaigns/requests/index').add('/campaigns/:address/requests/new', '/campaigns/requests/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVMsQUFBZjs7QUFFQSxPQUNDLEFBREQsSUFDSyxBQURMLGtCQUN1QixBQUR2QixpQkFFQyxBQUZELElBRUssQUFGTCx1QkFFNEIsQUFGNUIsbUJBR0MsQUFIRCxJQUdLLEFBSEwsZ0NBR3FDLEFBSHJDLDZCQUlDLEFBSkQsSUFJSyxBQUpMLG9DQUl5QyxBQUp6Qzs7QUFNQSxPQUFPLEFBQVAsVUFBaUIsQUFBakIiLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9qYXNvbmxlZS9Tb2xpZGl0eS1FdGhlcmV1bS1UdXRvcmlhbHMva2lja3N0YXJ0ZXJjbG9uZSJ9