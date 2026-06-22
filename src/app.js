const http = require('http');
const url = require('url');
const router = require('./routers/router');
const { performance, PerformanceObserver } = require('perf_hooks');


const app = http.createServer(async (req, res) => {
    const start = performance.now();
    const parsedUrl = url.parse(req.url, true);

    res.on('finish', ()=>{
         const end = performance.now();  
         const time = end-start;  
        console.log(`time for ${parsedUrl.pathname} reguest: ${time}`);
    })
    try {
      
        await router.routeRequest(req, res, parsedUrl);
    } catch (err) {
        console.error(err)
        res.statusCode = 500;
        res.end('Internal Server Error');
    }

});

// WICHTIG: Wir exportieren die App nur, wir starten sie hier NICHT!
module.exports = app;
