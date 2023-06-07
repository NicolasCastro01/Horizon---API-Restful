'use strict';

require('core-js/modules/es.parse-int.js');
var _fastify = _interopRequireDefault(require('fastify'));
var _dotenv = _interopRequireDefault(require('dotenv'));
var _surfers = require('./routes/surfers');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
_dotenv.default.config();
const server = (0, _fastify.default)();
server.register(_surfers.SurfersRoute);
const port = parseInt(process.env.PORT || '3000', 10);
server.listen({
    port
}, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Started server at '.concat(address));
});