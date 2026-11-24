document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    if (!form) return; // Garante que o código só rode na Landing Page

    // 1. Captura o parâmetro 'origem' da URL (ex: ?origem=banner_artigo)
    const urlParams = new URLSearchParams(window.location.search);
    const origem = urlParams.get('origem') || 'acesso_direto';
    document.getElementById('origemLead').value = origem;

    // 2. Máscara automática para WhatsApp
    const whatsInput = document.getElementById('whatsapp');
    whatsInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        }
        if (value.length > 10) {
            value = `${value.slice(0, 10)}-${value.slice(10)}`;
        }
        e.target.value = value;
    });

    // 3. Validação e Envio do Formulário
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();

        let isValid = true;

        // Limpa erros anteriores
        document.getElementById('erroNome').textContent = '';
        document.getElementById('erroEmail').textContent = '';
        document.getElementById('erroWhats').textContent = '';

        // Valida Nome
        if (nome.length < 3) {
            document.getElementById('erroNome').textContent = 'Por favor, digite seu nome completo.';
            isValid = false;
        }

        // Valida E-mail
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById('erroEmail').textContent = 'Confira se o e-mail foi digitado corretamente.';
            isValid = false;
        }

        // Valida WhatsApp
        if (whatsapp.length < 14) {
            document.getElementById('erroWhats').textContent = 'Digite um número de WhatsApp válido com DDD.';
            isValid = false;
        }

        if (isValid) {
            const novoLead = {
                nome,
                email,
                whatsapp,
                origem,
                dataCadastro: new Date().toLocaleString('pt-BR')
            };

            const leadsSalvos = JSON.parse(localStorage.getItem('leads_capturados')) || [];
            leadsSalvos.push(novoLead);
            localStorage.setItem('leads_capturados', JSON.stringify(leadsSalvos));

            console.log('Lead capturado com sucesso:', novoLead);

            // Exibe tela de agradecimento
            form.classList.add('hidden');
            document.querySelector('.lp-form-box h2').classList.add('hidden');
            document.querySelector('.form-desc').classList.add('hidden');
            document.getElementById('userNameSuccess').textContent = nome.split(' ')[0];
            document.getElementById('successBox').classList.remove('hidden');
        }
    });
});