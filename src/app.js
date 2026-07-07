import http from 'http';
import url from 'url';
import { performance, PerformanceObserver } from 'perf_hooks';
import routeRequest from './routers/router.js';


const app = http.createServer(async (req, res) => {
    const start = performance.now();
    const parsedUrl = url.parse(req.url, true);
    

    res.on('finish', ()=>{
         const end = performance.now();  
         const time = end-start;  
        console.log(`time for ${parsedUrl.pathname} reguest: ${time}`);
    })
    try {
      
        await routeRequest(req, res, parsedUrl);
    } catch (err) {
        console.error(err)
        res.statusCode = 500;
        res.end('Internal Server Error');
    }

});

export default app
