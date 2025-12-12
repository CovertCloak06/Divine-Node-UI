async function performUsernameSearch(username) {
    try {
        // List of platforms to check
        const platforms = [
            { name: 'GitHub', url: `https://github.com/${username}`, checkUrl: `https://api.github.com/users/${username}` },
            { name: 'Twitter', url: `https://twitter.com/${username}`, checkUrl: null },
            { name: 'Instagram', url: `https://instagram.com/${username}`, checkUrl: null },
            { name: 'Reddit', url: `https://reddit.com/user/${username}`, checkUrl: `https://www.reddit.com/user/${username}/about.json` },
            { name: 'YouTube', url: `https://youtube.com/@${username}`, checkUrl: null },
            { name: 'TikTok', url: `https://tiktok.com/@${username}`, checkUrl: null },
            { name: 'LinkedIn', url: `https://linkedin.com/in/${username}`, checkUrl: null },
            { name: 'Facebook', url: `https://facebook.com/${username}`, checkUrl: null },
            { name: 'Twitch', url: `https://twitch.tv/${username}`, checkUrl: null },
            { name: 'Medium', url: `https://medium.com/@${username}`, checkUrl: null },
            { name: 'Pinterest', url: `https://pinterest.com/${username}`, checkUrl: null },
            { name: 'Tumblr', url: `https://${username}.tumblr.com`, checkUrl: null },
            { name: 'Snapchat', url: `https://snapchat.com/add/${username}`, checkUrl: null },
            { name: 'Discord', url: null, checkUrl: null },
            { name: 'Telegram', url: `https://t.me/${username}`, checkUrl: null }
        ];

        const results = [];
        let foundCount = 0;

        // Check GitHub (has API)
        try {
            const githubCheck = await checkURL(`https://api.github.com/users/${username}`);
            results.push({
                name: 'GitHub',
                url: `https://github.com/${username}`,
                found: githubCheck
            });
            if (githubCheck) foundCount++;
        } catch (e) {
            results.push({ name: 'GitHub', url: `https://github.com/${username}`, found: false });
        }

        // Check Reddit (has API)
        try {
            const redditCheck = await checkURL(`https://www.reddit.com/user/${username}/about.json`);
            results.push({
                name: 'Reddit',
                url: `https://reddit.com/user/${username}`,
                found: redditCheck
            });
            if (redditCheck) foundCount++;
        } catch (e) {
            results.push({ name: 'Reddit', url: `https://reddit.com/user/${username}`, found: false });
        }

        // For other platforms, we can't easily check without APIs, so we list them as potential
        const otherPlatforms = [
            'Twitter', 'Instagram', 'YouTube', 'TikTok', 'LinkedIn', 
            'Facebook', 'Twitch', 'Medium', 'Pinterest', 'Tumblr', 
            'Snapchat', 'Telegram'
        ];

        otherPlatforms.forEach(platform => {
            const platformData = platforms.find(p => p.name === platform || p.name.includes(platform));
            results.push({
                name: platform,
                url: platformData?.url,
                found: null  // null means unknown/not checked
            });
        });

        return {
            username: username,
            platforms: results,
            foundCount: foundCount,
            totalChecked: results.filter(p => p.found !== null).length,
            totalPlatforms: results.length
        };
    } catch (error) {
        console.error('Username Search Error:', error);
        return { error: 'Failed to search username: ' + error.message };
    }
}

function checkURL(url) {
    return new Promise((resolve, reject) => {
        const protocol = url.startsWith('https') ? require('https') : require('http');
        const req = protocol.get(url, { 
            headers: { 'User-Agent': 'Divine-Node-UI/1.0' },
            timeout: 5000
        }, (res) => {
            resolve(res.statusCode === 200);
        });
        req.on('error', () => resolve(false));
        req.on('timeout', () => {
            req.destroy();
            resolve(false);
        });
    });
}

module.exports = { performUsernameSearch };
