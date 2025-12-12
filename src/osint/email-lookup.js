async function performEmailLookup(email) {
    try {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(email);

        if (!isValid) {
            return { error: 'Invalid email format' };
        }

        // Extract domain
        const domain = email.split('@')[1];

        // Common email providers
        const providers = {
            'gmail.com': 'Google Gmail',
            'yahoo.com': 'Yahoo Mail',
            'outlook.com': 'Microsoft Outlook',
            'hotmail.com': 'Microsoft Hotmail',
            'icloud.com': 'Apple iCloud',
            'protonmail.com': 'ProtonMail',
            'aol.com': 'AOL Mail',
            'mail.com': 'Mail.com',
            'zoho.com': 'Zoho Mail',
            'yandex.com': 'Yandex Mail'
        };

        // Disposable email domains (common ones)
        const disposableDomains = [
            'tempmail.com', 'guerrillamail.com', '10minutemail.com',
            'throwaway.email', 'mailinator.com', 'fakeinbox.com',
            'temp-mail.org', 'getnada.com', 'maildrop.cc'
        ];

        const provider = providers[domain] || 'Custom/Unknown Provider';
        const isDisposable = disposableDomains.includes(domain);

        // Try to verify MX records exist
        let mxRecordsExist = false;
        try {
            const dns = require('dns').promises;
            const mxRecords = await dns.resolveMx(domain);
            mxRecordsExist = mxRecords && mxRecords.length > 0;
        } catch (e) {
            mxRecordsExist = false;
        }

        return {
            email: email,
            valid: isValid && mxRecordsExist,
            domain: domain,
            provider: provider,
            disposable: isDisposable,
            mxRecords: mxRecordsExist,
            note: mxRecordsExist ? 'Domain has valid MX records' : 'No MX records found - email may not exist'
        };
    } catch (error) {
        console.error('Email Lookup Error:', error);
        return { error: 'Failed to lookup email: ' + error.message };
    }
}

module.exports = { performEmailLookup };
