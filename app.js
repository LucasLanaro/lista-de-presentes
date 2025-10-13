document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================================================
    // CONFIGURAÇÃO E DADOS (PLACEHOLDERS)
    // ==========================================================================
    
    // TODO: Substitua pela URL do seu endpoint do Google Apps Script
    const GAS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbznyEyoJMLyqPfSNm3Gf2o-kTi_6OO3PcZW2I70sGRnCCsxPQDCZHK6dzTlpwP0KPrsZQ/exec';

    // TODO: Preencha com suas credenciais do Firebase
    const FIREBASE_CONFIG = {
        apiKey: "AIzaSyC2VVJMWJ9RoCKMGzJeiOLx-v07R_tF1O0",
        authDomain: "lista-cha-casa.firebaseapp.com",
        projectId: "lista-cha-casa",
        storageBucket: "lista-cha-casa.firebasestorage.app",
        messagingSenderId: "188253353925",
        appId: "1:188253353925:web:2514dbf33404c2b838bdac"
        };
    
    // Array de produtos para o catálogo (fácil de editar)
    const PRODUCTS = [
        {
            id: 'escorredor-louca',
            name: 'Escorredor De Louça Cromado Black Para Copos Pratos Cor Preto',
            description: '---',
            image: 'img/Escorredor De Louça Cromado Black Para Copos Pratos Cor Preto.webp',
            buyUrl: 'https://www.mercadolivre.com.br/escorredor-de-louca-cromado-black-para-copos-pratos-cor-preto/p/MLB35623127?pdp_filters=item_id%3AMLB3986742225#origin=share&sid=share&wid=MLB3986742225&action=whatsapp'
        },
        {
            id: 'jogo-6-xicaras',
            name: 'Jogo 6 Xicara Café Chá Porcelana 170ml Colorida',
            description: '---',
            image: 'img/Jogo 6 Xicara Café Chá Porcelana 170ml Colorida.webp',
            buyUrl: 'https://produto.mercadolivre.com.br/MLB-1638270649-jogo-6-xicara-cafe-cha-porcelana-170ml-colorida-_JM?attributes=COR_DAS_X%C3%8DCARAS_vpp%3AUHJldGE%3D#origin=share&sid=share&action=whatsapp'
        },
        {
            id: 'kit-12-utensilios',
            name: 'Kit C/12 Utensílios De Cozinha Silicone Cabo Madeira',
            description: '---',
            image: 'img/Kit c.12 Utensílios De Cozinha Silicone Cabo Madeira.webp',
            buyUrl: 'https://produto.mercadolivre.com.br/MLB-3274998198-kit-c12-utensilios-de-cozinha-silicone-cabo-madeira-_JM?searchVariation=176967851166'
        },
        {
            id: 'conjunto-10-panelas',
            name: 'Conjunto Panelas Antiaderente 10 Peças Teflon Várias Cores',
            description: 'Cores: Preta ou Preta com Beje',
            image: 'img/Conjunto Panelas Antiaderente 10 Peças Teflon Várias Cores.webp',
            buyUrl: 'https://produto.mercadolivre.com.br/MLB-4107271844-conjunto-panelas-antiaderente-10-pecas-teflon-varias-cores-_JM#origin=share&sid=share&action=whatsapp&gid=1&pid=1'
        },
        {
            id: 'jogo-12-copos',
            name: 'Jogo 12 Copos Vidro Grosso Agua Vitamina 360 Ml Transparente',
            description: '---',
            image: 'img/Jogo 12 Copos Vidro Grosso Agua Vitamina 360 Ml Transparente.webp',
            buyUrl: 'https://produto.mercadolivre.com.br/MLB-5402830780-jogo-12-copos-vidro-grosso-agua-vitamina-360-ml-transparente-_JM#origin=share&sid=share&action=whatsapp'
        },
        {
            id: 'jogo-10-pratos-quadrados',
            name: 'Jogo 10 Prato Quadrado Preto Lanche Churrasco Plástico 23cm',
            description: '---',
            image: 'img/Jogo 10 Prato Quadrado Preto Lanche Churrasco Plástico 23cm.webp',
            buyUrl: 'https://www.mercadolivre.com.br/jogo-10-prato-quadrado-preto-lanche-churrasco-plastico-23cm/up/MLBU1710510341?pdp_filters=item_id%3AMLB1578170663#origin=share&sid=share&wid=MLB1578170663&action=whatsapp'
        },
        {
            id: 'kit-tabua-churrasco',
            name: 'Kit Tabua De Churrasco Tramontina - 2 pçs',
            description: '---',
            image: 'img/Kit Tabua De Churrasco Tramontina - 2 pçs.webp',
            buyUrl: 'https://www.mercadolivre.com.br/kit-tabua-de-churrasco-tramontina-2-pcs/p/MLB47530273?pdp_filters=item_id%3AMLB4126222211#origin=share&sid=share&wid=MLB4126222211&action=whatsapp'
        },
        {
            id: 'jogo-6-pratos-rasos',
            name: 'Jogo 6 Pratos Rasos Jantar Vidro Branco Decorado Geométrico Verona',
            description: '---',
            image: 'img/Jogo 6 Pratos Rasos Jantar Vidro Branco Decorado Geométrico Verona.webp',
            buyUrl: 'https://www.mercadolivre.com.br/jogo-6-pratos-rasos-jantar-vidro-branco-decorado-geometrico/up/MLBU2465438761?pdp_filters=item_id%3AMLB5133426792#origin=share&sid=share&wid=MLB5133426792&action=whatsapp'
        },
        {
            id: 'jogo-facas-tramontina',
            name: 'Jogo Facas Tramontina Kit Conjunto Faca Cozinha Churrasco 4p',
            description: '---',
            image: 'img/Jogo Facas Tramontina Kit Conjunto Faca Cozinha Churrasco 4p.webp',
            buyUrl: 'https://www.mercadolivre.com.br/jogo-facas-tramontina-kit-conjunto-faca-cozinha-churrasco-4p/p/MLB27393392?pdp_filters=item_id%3AMLB3659373389#origin=share&sid=share&wid=MLB3659373389&action=whatsapp'
        },
        {
            id: 'kit-4-potes-geladeira-1',
            name: 'Kit 4 Potes Acrílico 3,8l Organizador Geladeira Rebirth',
            description: '---',
            image: 'img/Kit 4 Potes Acrílico 3,8l Organizador Geladeira Rebirth.webp',
            buyUrl: 'https://www.mercadolivre.com.br/kit-4-potes-acrilico-38l-organizador-geladeira-rebirth/p/MLB56422271?pdp_filters=item_id%3AMLB5721467738#origin=share&sid=share&wid=MLB5721467738&action=whatsapp'
        },
        {
            id: 'kit-4-potes-geladeira-2',
            name: 'Kit 4 Potes Acrílico 3,8l Organizador Geladeira Rebirth',
            description: '---',
            image: 'img/Kit 4 Potes Acrílico 3,8l Organizador Geladeira Rebirth.webp',
            buyUrl: 'https://www.mercadolivre.com.br/kit-4-potes-acrilico-38l-organizador-geladeira-rebirth/p/MLB56422271?pdp_filters=item_id%3AMLB5721467738#origin=share&sid=share&wid=MLB5721467738&action=whatsapp'
        },
        {
            id: 'abridor-lata',
            name: 'Abridor de lata automático emborrachado pratico e eficiente Esferium',
            description: '---',
            image: 'img/Abridor de lata automático emborrachado pratico e eficiente Esferium.webp',
            buyUrl: 'https://www.mercadolivre.com.br/abridor-de-lata-automatico-emborrachado-pratico-e-eficiente-esferium/p/MLB37882628?pdp_filters=item_id%3AMLB5045588512#origin=share&sid=share&wid=MLB5045588512&action=whatsapp'
        },
        {
            id: 'jarra-twinkle',
            name: 'Jarra Twinkle 1,5 L Borossilicato Tampa Aço Inox Dynasty',
            description: '---',
            image: 'img/Jarra Twinkle 1,5 L Borossilicato Tampa Aço Inox Dynasty.webp',
            buyUrl: 'https://www.mercadolivre.com.br/jarra-twinkle-15-l-borossilicato-tampa-aco-inox-dynasty/p/MLB24507545?pdp_filters=item_id%3AMLB5643268026#origin=share&sid=share&wid=MLB5643268026&action=whatsapp'
        },
        {
            id: 'jogo-americano',
            name: 'Jogo Americano Kit 6 Peças Mesa Jantar Sala Restaurante Cor Ouro',
            description: '---',
            image: 'img/Jogo Americano Kit 6 Peças Mesa Jantar Sala Restaurante Cor Ouro.webp',
            buyUrl: 'https://www.mercadolivre.com.br/jogo-americano-kit-6-pecas-mesa-jantar-sala-restaurante-cor-ouro/p/MLB40469669?pdp_filters=item_id%3AMLB5723799240&attributes=COLOR%3AOuro_vpp#origin=share&sid=share&wid=MLB5723799240&action=whatsapp'
        },
        {
            id: 'prendedor-roupa-1',
            name: 'Prendedor De Roupa Madeira 36 Peças + Cesto',
            description: '---',
            image: 'img/Prendedor De Roupa Madeira 36 Peças + Cesto.webp',
            buyUrl: 'https://produto.mercadolivre.com.br/MLB-5301006054-prendedor-de-roupa-madeira-36-pecas-cesto-_JM#origin=share&sid=share&action=whatsapp'
        },
        {
            id: 'prendedor-roupa-2',
            name: 'Prendedor De Roupa Madeira 36 Peças + Cesto',
            description: '---',
            image: 'img/Prendedor De Roupa Madeira 36 Peças + Cesto.webp',
            buyUrl: 'https://produto.mercadolivre.com.br/MLB-5301006054-prendedor-de-roupa-madeira-36-pecas-cesto-_JM#origin=share&sid=share&action=whatsapp'
        },
        {
            id: 'kit-tabua-frios',
            name: 'Kit Tábua De Queijos E Frios Para Servir Em Bambu Com Facas',
            description: '---',
            image: 'img/Kit Tábua De Queijos E Frios Para Servir Em Bambu Com Facas.webp',
            buyUrl: 'https://www.mercadolivre.com.br/kit-tabua-de-queijos-e-frios-para-servir-em-bambu-com-facas/p/MLB53662786?pdp_filters=item_id%3AMLB5762072788#origin=share&sid=share&wid=MLB5762072788&action=whatsapp'
        },
        {
            id: 'porta-frios-hermetico',
            name: 'Jogo 2 Potes Porta Frios Herméticos 2x770 Ml - Paramount',
            description: '---',
            image: 'img/Jogo 2 Potes Porta Frios Herméticos 2x770 Ml - Paramount.webp',
            buyUrl: 'https://www.mercadolivre.com.br/jogo-2-potes-porta-frios-hermeticos-2x770-ml-paramount/p/MLB22447971?pdp_filters=item_id%3AMLB5331304602#origin=share&sid=share&wid=MLB5331304602&action=whatsapp'
        },
        {
            id: 'caneca-chop',
            name: 'Caneca De Chopp Em Vidro Kit 6 Copos Com Alça Para Cerveja Cor Branco',
            description: '---',
            image: 'img/Caneca De Chopp Em Vidro Kit 6 Copos Com Alça Para Cerveja Cor Branco.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB27599911?pdp_filters=item_id%3AMLB5508838968'
        },
        {
            id: 'jogo-6-copos-480ml',
            name: 'Jogo 6 Copos Kit Long Drink Grande 480ml Água Suco Cozinha Cor Transparente',
            description: '---',
            image: 'img/Jogo 6 Copos Kit Long Drink Grande 480ml Água Suco Cozinha Cor Transparente.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB25848313?pdp_filters=item_id%3AMLB4096102066'
        },
        {
            id: 'difusor-aromatizador-ambiente',
            name: 'Difusor Ambiente Aromatizador Umidificador Oleos Essenciais Cor Branco',
            description: '---',
            image: 'img/Difusor Ambiente Aromatizador Umidificador Oleos Essenciais Cor Branco.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB28081600?pdp_filters=item_id%3AMLB3657541531'
        },
        {
            id: 'kit-3-bacias-1-balde',
            name: 'Kit 3 Bacias E 1 Balde Grande Plástico Multiuso Extra Forte Cor Tifany',
            description: '---',
            image: 'img/Kit 3 Bacias E 1 Balde Grande Plástico Multiuso Extra Forte Cor Tifany.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB48478204?pdp_filters=item_id%3AMLB5355009544'
        },
        {
            id: 'jogo-6-tacas',
            name: 'Jogo De 6 Taças Para Vinho Agua Vidro Lira 365ml Cor Transparente',
            description: '---',
            image: 'img/Jogo De 6 Taças Para Vinho Agua Vidro Lira 365ml Cor Transparente.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB25596988?pdp_filters=item_id%3AMLB4275644054'
        },
        {
            id: 'rodo-mop',
            name: 'Mop Rodo Magico Espuma PVA - Unidade - 1',
            description: '---',
            image: 'img/Mop Rodo Magico Espuma PVA - Unidade - 1.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB28912784?pdp_filters=item_id%3AMLB3542395887'
        },
        {
            id: 'pipoqueira-manivela',
            name: 'Pipoqueira Com Manivela 20 X 15 Cm 4,5 Litros Cozillar Cor Grafite',
            description: '---',
            image: 'img/Pipoqueira Com Manivela 20 X 15 Cm 4,5 Litros Cozillar Cor Grafite.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB51170413?pdp_filters=item_id%3AMLB5431897162'
        },
        {
            id: 'kit-3-formas-bolo',
            name: 'Kit 3 Formas De Bolo Assadeiras Fundo Removível Antiaderente',
            description: '---',
            image: 'img/Kit 3 Formas De Bolo Assadeiras Fundo Removível Antiaderente.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB37035071?pdp_filters=item_id%3AMLB5114096012'
        },
        {
            id: 'jogo-assadeiras',
            name: 'Jogo De Assadeiras Formas Antiaderente Teflon Dupont Funda',
            description: '---',
            image: 'img/Jogo De Assadeiras Formas Antiaderente Teflon Dupont Funda.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB27409832?pdp_filters=item_id%3AMLB5513763324'
        },
        {
            id: 'kit-2-formas-assadeiras',
            name: 'Kit 2 Formas Antiaderente Assadeira De Pizza Redonda Teflon Cor Preto',
            description: '---',
            image: 'img/Kit 2 Formas Antiaderente Assadeira De Pizza Redonda Teflon Cor Preto.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB50587212?pdp_filters=item_id%3AMLB5476508754'
        },
        {
            id: 'liquidificador-ph900',
            name: 'Liquidificador PH900 Com 12 Velocidades 1200W Cor Preto Philco',
            description: '---',
            image: 'img/Liquidificador PH900 Com 12 Velocidades 1200W Cor Preto Philco.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB15578941?pdp_filters=item_id%3AMLB1942049788'
        },
        {
            id: 'jogo-frigideiras',
            name: 'Jogo Frigideiras Alumínio 2 Peças Turim Tramontina Cor Chumbo',
            description: '---',
            image: 'img/Jogo Frigideiras Alumínio 2 Peças Turim Tramontina Cor Chumbo.webp',
            buyUrl: 'https://www.mercadolivre.com.br/p/MLB27400699?pdp_filters=item_id%3AMLB4029450247'
        },
        {
            id: 'fita-led-5m',
            name: 'Fita Led 5050 Rgb 16cores Bluetooth Controlador App Ip65',
            description: '---',
            image: 'img/Fita Led 5050 Rgb 16cores Bluetooth Controlador App Ip65.webp',
            buyUrl: 'https://produto.mercadolivre.com.br/MLB-4059392231-fita-led-5050-rgb-16cores-bluetooth-controlador-app-ip65-_JM#polycard_client=recommendations_pdp-v2p&reco_backend=coldstart_low&reco_model=coldstart_low_exposition%2C+coldstart_high_exposition%2C+rk_online_v5_retsys_rabbit_hole&reco_client=pdp-v2p&reco_item_pos=0&reco_backend_type=low_level&reco_id=287d59bc-1e3a-4913-bb06-cfbe81d10157&wid=MLB4059392231&sid=recos'
        },
        {
            id: 'kit-5-lampadas-led',
            name: 'Kit 5 Lampadas Led Smart Inteligente Wi-fi 2.4 GHz Alexa google 10w RGB E27 110v/220v - Neo Avant',
            description: '---',
            image: 'img/Kit 5 Lampadas Led Smart Inteligente Wi-fi 2.4 GHz Alexa google 10w RGB E27 110v-220v.jpg',
            buyUrl: 'https://www.amazon.com.br/dp/B0FDLM1L2R?th=1&linkCode=sl1&tag=vtech04-20&linkId=202581a4970344ac5fd9ad113caa7627&language=pt_BR&ref_=as_li_ss_tl'
        },
    ];

    // Array de cupons/links úteis
    const COUPONS = [
        {
            title: 'TALK OFERTAS GERAIS',
            url: 'https://chat.whatsapp.com/BsLuRUkNnor2kHF5etluXJ',
            description: 'Descontos especiais em uma variedade de produtos eletrônicos e gerais.'
        },
        {
            title: 'Grupo de Ofertas - Talk PC',
            url: 'https://chat.whatsapp.com/LmuhlSfuzkTIe49YhZjkXe',
            description: 'Descontos especiais em uma variedade de produtos eletrônicos e de computadores.'
        },
    ];


    // ==========================================================================
    // Referências do DOM
    // ==========================================================================
    const views = {
        catalogo: document.getElementById('view-catalogo'),
        cupons: document.getElementById('view-cupons'),
        login: document.getElementById('view-login')
    };
    const productGrid = document.getElementById('product-grid');
    const couponList = document.getElementById('coupon-list');
    const navLinks = document.querySelectorAll('.nav-link');
    const authLinkContainer = document.getElementById('auth-link-container');
    const userInfoContainer = document.getElementById('user-info-container');
    const userEmailSpan = document.getElementById('user-email');
    const logoutButton = document.getElementById('logout-button');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const toastElement = document.getElementById('toast');

    let currentUser = null;
    let userReservations = {};
    let allReservedItems = new Set();

    // ==========================================================================
    // Roteamento (SPA)
    // ==========================================================================
    function navigateTo(hash) {
        const route = hash.replace('#/', '') || 'catalogo';
        
        Object.values(views).forEach(view => view.classList.add('hidden'));
        if (views[route]) {
            views[route].classList.remove('hidden');
        } else {
            views.catalogo.classList.remove('hidden'); // Rota padrão
        }

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.route === route);
        });

        // Re-renderiza a view atual para refletir estado de login
        if(route === 'catalogo') renderCatalog();
    }

    function initRouter() {
        window.addEventListener('hashchange', () => navigateTo(location.hash));
        navigateTo(location.hash);
    }

    // ==========================================================================
    // Renderização de Conteúdo
    // ==========================================================================
    function renderCatalog() {
        if (!productGrid) return;
        productGrid.innerHTML = '';
        
        PRODUCTS.forEach(product => {
            const isReservedByCurrentUser = userReservations[product.id];
            const isReservedByAnother = !isReservedByCurrentUser && allReservedItems.has(product.id);

            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-card__image">
                <div class="product-card__content">
                    <h3 class="product-card__title">${product.name}</h3>
                    <p class="product-card__description">${product.description}</p>
                    <div class="product-card__actions">
                        ${isReservedByCurrentUser
                            ? `<button class="btn btn-secondary btn-cancel" data-id="${product.id}">Cancelar Reserva</button>`
                        : isReservedByAnother
                            ? `<button class="btn btn-primary" data-id="${product.id}" disabled>Reservado por outra pessoa</button>`
                        : `<button class="btn btn-primary btn-reserve" data-id="${product.id}">Reservar e ver na loja</button>`
                        }
                    </div>
                </div>
            `;
            productGrid.appendChild(card);
        });
    }

    async function fetchAllReservations() {
        try {
            const response = await fetch(GAS_ENDPOINT); // Uma chamada GET simples
            if (!response.ok) {
                throw new Error('Falha ao buscar lista de reservas.');
            }
            const reservedIds = await response.json();
            allReservedItems = new Set(reservedIds); // Armazena os IDs no nosso Set
        } catch (error) {
            console.error("Não foi possível carregar os itens reservados:", error);
            // O site ainda funcionará, mas não bloqueará itens já reservados
        }
    }

    function renderCoupons() {
        if (!couponList) return;
        couponList.innerHTML = '';
        COUPONS.forEach(coupon => {
            const item = document.createElement('div');
            item.className = 'coupon-item';
            item.innerHTML = `
                <a href="${coupon.url}" target="_blank" rel="noopener noreferrer">${coupon.title}</a>
                <p>${coupon.description}</p>
            `;
            couponList.appendChild(item);
        });
    }

    // ==========================================================================
    // Lógica de Reserva
    // ==========================================================================
    async function reserveItem(event) {
        if (!event.target.matches('.btn-reserve')) return;

        if (!currentUser) {
            showToast('Você precisa entrar para reservar um item.', 'error');
            location.hash = '#/login';
            return;
        }

        const button = event.target;
        const itemId = button.dataset.id;
        const item = PRODUCTS.find(p => p.id === itemId);

        if (!item) return;

        const originalButtonText = button.innerHTML;
        setButtonLoading(button, true);

        const payload = {
            itemId: item.id,
            itemName: item.name,
            itemUrl: item.buyUrl,
            timestampISO: new Date().toISOString(),
            userUid: currentUser.uid,
            userEmail: currentUser.email,
            userName: currentUser.displayName || ''
        };

        try {
            // A chamada fetch foi ajustada para contornar o problema de CORS do Apps Script.
            // Usamos o modo 'no-cors', que envia os dados mas não lê a resposta.
            await fetch(GAS_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors', // <-- MUDANÇA CRUCIAL
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
                redirect: 'follow'
            });

            // Como não podemos ler a resposta em 'no-cors', assumimos o sucesso
            // e atualizamos a interface do usuário imediatamente.
            showToast('Presente reservado com sucesso!', 'success');
            saveUserReservation(currentUser.uid, item.id);
            userReservations[item.id] = true;
            button.textContent = 'Reservado por você';
            button.disabled = true;
            window.open(item.buyUrl, '_blank');

        } catch (error) {
            // Este bloco de 'catch' agora só pegará erros de rede (ex: sem internet).
            console.error('Erro de rede ao tentar reservar:', error);
            showToast('Erro ao registrar a reserva. Verifique sua conexão.', 'error');
        } finally {
            setButtonLoading(button, false, 'Reservado por você');
            if (button.disabled) {
                // Manter o texto e estado de sucesso
            } else {
                button.innerHTML = originalButtonText; // restaurar texto original em caso de falha de rede
            }
        }
    }

    // ==========================================================================
    // Autenticação com Firebase
    // ==========================================================================
    function initFirebase() {
        if (!firebase.apps.length) {
            firebase.initializeApp(FIREBASE_CONFIG);
        }

        firebase.auth().onAuthStateChanged(user => {
            currentUser = user;
            updateAuthUI(user);
            if(user) {
                loadUserReservations(user.uid);
            } else {
                userReservations = {};
            }
            // Re-renderiza a view ativa para refletir a mudança de estado
            navigateTo(location.hash);
        });
    }

    function updateAuthUI(user) {
        if (user) {
            authLinkContainer.classList.add('hidden');
            userInfoContainer.classList.remove('hidden');
            userEmailSpan.textContent = user.displayName || user.email;
        } else {
            authLinkContainer.classList.remove('hidden');
            userInfoContainer.classList.add('hidden');
            userEmailSpan.textContent = '';
        }
    }

    function bindAuthForms() {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = loginForm.email.value;
            const password = loginForm.password.value;
            const errorEl = document.getElementById('login-error');
            errorEl.textContent = '';
            
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
                location.hash = '#/catalogo';
            } catch (error) {
                errorEl.textContent = getFirebaseErrorMessage(error);
            }
        });

        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = registerForm.name.value.trim(); // .trim() remove espaços em branco
            const email = registerForm.email.value;
            const password = registerForm.password.value;
            const confirmPassword = registerForm['password-confirm'].value;
            const errorEl = document.getElementById('register-error');
            errorEl.textContent = '';

            if (password !== confirmPassword) {
                errorEl.textContent = 'As senhas não coincidem. Tente novamente.';
                return;
            }

            if (!name) {
                errorEl.textContent = 'Por favor, preencha o campo de nome.';
                return;
            }

            try {
                // Passo 1: Cria o usuário
                const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
                const user = userCredential.user;

                // Passo 2: Adiciona o nome E ESPERA a operação terminar
                await user.updateProfile({
                    displayName: name
                });

                // Passo 3: AGORA SIM, com o nome já salvo, navega para o catálogo
                location.hash = '#/catalogo';
                
            } catch (error) {
                errorEl.textContent = getFirebaseErrorMessage(error);
            }
        });

        document.getElementById('show-register-form').addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        });

        document.getElementById('show-login-form').addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });

        logoutButton.addEventListener('click', () => {
            firebase.auth().signOut();
            location.hash = '#/catalogo';
        });
        // Adicione este código dentro da função bindAuthForms()

        const googleSignInButton = document.getElementById('google-signin-button');

        googleSignInButton.addEventListener('click', () => {
            // Cria um "provedor" de autenticação do Google
            const provider = new firebase.auth.GoogleAuthProvider();

            // Inicia o processo de login com uma janela pop-up
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    // Se o login for bem-sucedido, o onAuthStateChanged já vai
                    // nos redirecionar, mas podemos forçar para garantir.
                    location.hash = '#/catalogo';
                }).catch((error) => {
                    // Lida com erros (ex: usuário fechou o pop-up)
                    console.error("Erro ao fazer login com Google:", error);
                    const errorEl = document.getElementById('login-error');
                    errorEl.textContent = 'Não foi possível fazer login com o Google. Tente novamente.';
                });
        });
    }
    
    function getFirebaseErrorMessage(error) {
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'Email ou senha inválidos.';
            case 'auth/email-already-in-use':
                return 'Este email já está cadastrado.';
            case 'auth/weak-password':
                return 'A senha deve ter pelo menos 6 caracteres.';
            case 'auth/invalid-email':
                return 'O formato do email é inválido.';
            default:
                return 'Ocorreu um erro. Tente novamente.';
        }
    }

    // ==========================================================================
    // Persistência Local (localStorage)
    // ==========================================================================
    function loadUserReservations(uid) {
        const stored = localStorage.getItem(`reservations:${uid}`);
        userReservations = stored ? JSON.parse(stored) : {};
    }

    function saveUserReservation(uid, itemId) {
        const reservations = JSON.parse(localStorage.getItem(`reservations:${uid}`)) || {};
        reservations[itemId] = true;
        localStorage.setItem(`reservations:${uid}`, JSON.stringify(reservations));
    }

    function removeUserReservation(uid, itemId) {
        const reservations = JSON.parse(localStorage.getItem(`reservations:${uid}`)) || {};
        delete reservations[itemId];
        localStorage.setItem(`reservations:${uid}`, JSON.stringify(reservations));
    }

    // Coloque esta função perto da função reserveItem
    async function cancelReservation(event) {
        if (!event.target.matches('.btn-cancel')) return;

        if (!confirm('Você tem certeza que deseja cancelar esta reserva?')) {
            return;
        }

        const button = event.target;
        const itemId = button.dataset.id;
        const item = PRODUCTS.find(p => p.id === itemId);

        if (!item || !currentUser) return;
        
        setButtonLoading(button, true);

        const payload = {
            action: 'cancel',
            itemId: item.id,
            userUid: currentUser.uid
        };

        try {
            await fetch(GAS_ENDPOINT, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(payload),
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            });

            showToast('Reserva cancelada!', 'success');
            removeUserReservation(currentUser.uid, item.id);
            delete userReservations[item.id]; // Remove da memória também
            
            // Atualiza o botão sem recarregar a página
            button.textContent = 'Reservar e ver na loja';
            button.classList.remove('btn-secondary', 'btn-cancel');
            button.classList.add('btn-primary', 'btn-reserve');

        } catch (error) {
            console.error('Erro ao cancelar reserva:', error);
            showToast('Não foi possível cancelar a reserva. Tente novamente.', 'error');
        } finally {
            setButtonLoading(button, false);
        }
    }

    // ==========================================================================
    // Helpers de UI
    // ==========================================================================
    function showToast(message, type = 'success') {
        toastElement.textContent = message;
        toastElement.className = 'show';
        toastElement.classList.add(type);
        setTimeout(() => {
            toastElement.className = toastElement.className.replace('show', '');
        }, 3000);
    }

    function setButtonLoading(button, isLoading, successText = '') {
        if (isLoading) {
            button.disabled = true;
            button.innerHTML = `<span class="spinner"></span> Carregando...`;
        } else {
            button.disabled = button.textContent === successText; // Mantem desabilitado se já foi reservado
            if(!button.disabled){
                 button.innerHTML = 'Reservar';
            }
        }
    }

    // ==========================================================================
    // Inicialização
    // ==========================================================================
    async function initApp() {
        await fetchAllReservations(); // <-- ESPERA a lista de reservados carregar
        initFirebase();
        initRouter();
        renderCoupons();
        bindAuthForms();
        productGrid.addEventListener('click', (event) => {
            if (event.target.matches('.btn-reserve')) {
                reserveItem(event);
            } else if (event.target.matches('.btn-cancel')) {
                cancelReservation(event);
            }
        });
    }
    
    initApp();
});