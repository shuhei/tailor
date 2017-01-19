'use strict';
const http = require('http');
const Tailor = require('.');
const path = require('path');

const templateDir = path.join(__dirname, 'templates');
const fetchTemplateFs = require('./lib/fetch-template');
const baseTemplateFn = () => 'base';
const tailor = new Tailor({
    fetchTemplate: fetchTemplateFs(templateDir, baseTemplateFn),
});
const server = http.createServer((req, res) => {
    if (req.url.startsWith('/fragment/')) {
        console.log(`[FRAGMENT] ${req.method} ${req.url}`);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`I am fragment: ${req.url.replace('/fragment/', '')}`);
    } else {
        console.log(`[TAILOR] ${req.method} ${req.url}`);
        return tailor.requestHandler(req, res);
    }
});
server.listen(process.env.PORT || 8080);
