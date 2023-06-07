'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.getSurfers = getSurfers;
require('core-js/modules/es.promise.js');
async function getSurfers(request, reply) {
    return reply.send('Hello World');
}