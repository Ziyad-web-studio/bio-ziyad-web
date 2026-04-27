lucide.createIcons();

const ABSOLUTE_PROMPT = "Kamu adalah Aiminizer. Dibuat oleh Ziyad (ziyad_studio), seorang individu muda dengan ambisi ekstrem dan pemikiran strategis. Gunakan nada yang serius dan cerdas.";

let settings = JSON.parse(localStorage.getItem('aiminizer_mobile')) || {
    apiKey: '',
    baseUrl: 'https://api.chatanywhere.tech/v1',
    systemPrompt: 'Kamu adalah asisten efisien.',
    darkMode: true
};

function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    const content = document.getElementById('settingsContent');
    const overlay = document.getElementById('overlay');
    
    if (panel.classList.contains('invisible')) {
        panel.classList.remove('invisible');
        setTimeout(() => {
            content.classList.remove('-translate-x-full');
            overlay.classList.add('opacity-100');
        }, 10);
    } else {
        content.classList.add('-translate-x-full');
        overlay.classList.remove('opacity-100');
        setTimeout(() => panel.classList.add('invisible'), 300);
    }
}

function saveSettings() {
    settings.apiKey = document.getElementById('apiKey').value;
    settings.systemPrompt = document.getElementById('systemPrompt').value;
    localStorage.setItem('aiminizer_mobile', JSON.stringify(settings));
    toggleSettings();
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    settings.darkMode = document.documentElement.classList.contains('dark');
    localStorage.setItem('aiminizer_mobile', JSON.stringify(settings));
}

function appendMessage(role, content) {
    const container = document.getElementById('chatContainer');
    const div = document.createElement('div');
    div.className = `max-w-[90%] p-4 rounded-[22px] text-[14px] leading-relaxed shadow-sm transition-all ${
        role === 'user' ? 'bg-[var(--accent)] text-white self-end rounded-tr-none' : 'bg-[var(--ai-msg)] self-start rounded-tl-none border border-[var(--border)]'
    }`;
    
    if (role === 'ai') {
        const inner = document.createElement('div');
        div.appendChild(inner);
        container.appendChild(div);
        typeWriter(inner, content);
    } else {
        div.innerText = content;
        container.appendChild(div);
    }
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

function typeWriter(element, text) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML = marked.parse(text.substring(0, i + 1));
            i++;
            document.getElementById('chatContainer').scrollTop = document.getElementById('chatContainer').scrollHeight;
        } else {
            clearInterval(interval);
            lucide.createIcons();
        }
    }, 5);
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const text = input.value.trim();
    if (!text || !settings.apiKey) return;

    input.value = '';
    input.style.height = 'auto';
    appendMessage('user', text);

    try {
        const res = await fetch(`${settings.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${settings.apiKey}` },
            body: JSON.stringify({
                model: document.getElementById('modelSelect').value,
                messages: [
                    { role: 'system', content: `${ABSOLUTE_PROMPT}\n${settings.systemPrompt}` },
                    { role: 'user', content: text }
                ]
            })
        });
        const data = await res.json();
        appendMessage('ai', data.choices[0].message.content);
    } catch (e) {
        appendMessage('ai', 'Gagal memproses. Cek koneksi.');
    }
}
