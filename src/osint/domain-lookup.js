const dns = require('dns').promises;

async function performDomainLookup(domain) {
    try {
        // Clean domain input
        domain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        
        const result = {
            domain: domain,
            dns: {},
            registrar: 'WHOIS lookup requires API key',
            created: 'N/A',
            expires: 'N/A',
            updated: 'N/A',
            status: 'Active (DNS Resolved)'
        };

        // DNS lookups
        try {
            const aRecords = await dns.resolve4(domain);
            result.dns.A = aRecords;
        } catch (e) {
            result.dns.A = [];
        }

        try {
            const mxRecords = await dns.resolveMx(domain);
            result.dns.MX = mxRecords.map(r => `${r.exchange} (priority: ${r.priority})`);
        } catch (e) {
            result.dns.MX = [];
        }

        try {
            const nsRecords = await dns.resolveNs(domain);
            result.dns.NS = nsRecords;
        } catch (e) {
            result.dns.NS = [];
        }

        try {
            const txtRecords = await dns.resolveTxt(domain);
            result.dns.TXT = txtRecords.map(r => r.join(' '));
        } catch (e) {
            result.dns.TXT = [];
        }

        // Check if domain has any DNS records
        if (!result.dns.A || result.dns.A.length === 0) {
            result.status = 'No DNS records found';
            return { error: 'Domain has no DNS A records. It may not exist or be improperly configured.' };
        }

        return result;
    } catch (error) {
        console.error('Domain Lookup Error:', error);
        return { error: 'Failed to lookup domain: ' + error.message };
    }
}

module.exports = { performDomainLookup };
