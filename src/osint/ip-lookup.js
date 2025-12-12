const https = require('https');

async function performIPLookup(ip) {
    try {
        // Using ip-api.com for free IP geolocation
        const data = await fetchJSON(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`);
        
        if (data.status === 'fail') {
            return { error: data.message || 'Invalid IP address' };
        }

        return {
            ip: data.query,
            country: data.country,
            countryCode: data.countryCode,
            region: data.regionName,
            city: data.city,
            zip: data.zip,
            latitude: data.lat,
            longitude: data.lon,
            timezone: data.timezone,
            isp: data.isp,
            org: data.org,
            as: data.as
        };
    } catch (error) {
        console.error('IP Lookup Error:', error);
        return { error: 'Failed to lookup IP address: ' + error.message };
    }
}

function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? require('https') : require('http');
        protocol.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (e) {
                    reject(new Error('Invalid JSON response'));
                }
            });
        }).on('error', reject);
    });
}

module.exports = { performIPLookup };
