const https = require('https');
const http = require('http');

async function processAIQuery(query, context = {}) {
    try {
        // Try Ollama first (local AI)
        const ollamaUrl = context.ollamaUrl || 'http://localhost:11434';
        const useOllama = await checkOllamaAvailable(ollamaUrl);

        if (useOllama) {
            return await queryOllama(query, ollamaUrl);
        }

        // Fallback to OpenAI if API key is available
        const openaiKey = context.openaiKey;
        if (openaiKey) {
            return await queryOpenAI(query, openaiKey);
        }

        // If no AI service is available, provide a helpful response
        return {
            response: `I'm an OSINT assistant. To use AI features, please configure either:
            
1. Ollama (Local AI): Install Ollama from https://ollama.ai and run 'ollama serve'
2. OpenAI API: Add your API key in Settings

In the meantime, I can help you understand OSINT tools:
- Use IP Lookup to investigate IP addresses
- Use Domain Lookup for WHOIS and DNS information
- Use Username Search to find social media profiles
- Use Email Lookup to validate email addresses

How can I assist you with OSINT?`,
            provider: 'built-in'
        };
    } catch (error) {
        console.error('AI Query Error:', error);
        return {
            response: 'Sorry, I encountered an error processing your request. Please check your AI service configuration.',
            error: error.message
        };
    }
}

async function checkOllamaAvailable(url) {
    try {
        const response = await new Promise((resolve, reject) => {
            const req = http.get(`${url}/api/tags`, { timeout: 2000 }, (res) => {
                resolve(res.statusCode === 200);
            });
            req.on('error', () => resolve(false));
            req.on('timeout', () => {
                req.destroy();
                resolve(false);
            });
        });
        return response;
    } catch (e) {
        return false;
    }
}

async function queryOllama(query, ollamaUrl) {
    try {
        const systemPrompt = `You are a helpful OSINT (Open Source Intelligence) assistant. 
Help users understand and use OSINT tools effectively. Provide clear, concise, and accurate information.
Focus on ethical OSINT practices and legal considerations.`;

        const postData = JSON.stringify({
            model: 'llama2',  // Default model, user can change
            prompt: `${systemPrompt}\n\nUser: ${query}\nAssistant:`,
            stream: false
        });

        const response = await new Promise((resolve, reject) => {
            const options = {
                hostname: ollamaUrl.replace('http://', '').split(':')[0],
                port: ollamaUrl.split(':')[2] || 11434,
                path: '/api/generate',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = http.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error('Invalid JSON response from Ollama'));
                    }
                });
            });

            req.on('error', reject);
            req.write(postData);
            req.end();
        });

        return {
            response: response.response || 'No response from Ollama',
            provider: 'ollama'
        };
    } catch (error) {
        throw new Error('Ollama request failed: ' + error.message);
    }
}

async function queryOpenAI(query, apiKey) {
    try {
        const response = await new Promise((resolve, reject) => {
            const postData = JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful OSINT assistant. Help users with open source intelligence gathering ethically and legally.'
                    },
                    {
                        role: 'user',
                        content: query
                    }
                ],
                max_tokens: 500
            });

            const options = {
                hostname: 'api.openai.com',
                path: '/v1/chat/completions',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Length': Buffer.byteLength(postData)
                }
            };

            const req = https.request(options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        reject(new Error('Invalid JSON response from OpenAI'));
                    }
                });
            });

            req.on('error', reject);
            req.write(postData);
            req.end();
        });

        if (response.choices && response.choices[0]) {
            return {
                response: response.choices[0].message.content,
                provider: 'openai'
            };
        } else {
            throw new Error('Invalid response from OpenAI');
        }
    } catch (error) {
        throw new Error('OpenAI request failed: ' + error.message);
    }
}

module.exports = { processAIQuery };
