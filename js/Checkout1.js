var ScreenCheckout1 = function () {
    var Pixel = function () {
        var facebookPixelsDataElement = document.getElementById("facebookPixelsData");
        if (!facebookPixelsDataElement) {
            console.warn("Elemento #facebookPixelsData não encontrado.");
            return;
        }

        var facebookPixelsData = facebookPixelsDataElement.getAttribute("data-facebook-pixels");

        if (!facebookPixelsData) {
            console.warn("Nenhum dado de pixel encontrado.");
            return;
        }

        // Converte JSON para um array de objetos
        var facebookPixelList;
        try {
            facebookPixelList = JSON.parse(facebookPixelsData);
        } catch (e) {
            console.error("Erro ao analisar JSON dos pixels do Facebook:", e);
            return;
        }

        // Carrega o script do Facebook Pixel
        (function (f, b, e, v, n, t, s) {
            if (f.fbq) return;
            n = f.fbq = function () {
                n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
            };
            if (!f._fbq) f._fbq = n;
            n.push = n;
            n.loaded = !0;
            n.version = '2.0';
            n.queue = [];
            t = b.createElement(e);
            t.async = !0;
            t.src = v;
            s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

        // Inicializa os pixels usando os dados capturados
        facebookPixelList.forEach(pixel => {
            if (pixel.PixelId) {
                fbq('init', pixel.PixelId);
                fbq('track', 'InitiateCheckout');
            }
        });
        // Captura os dados dos pixels do TikTok da div
        var tiktokPixelsDataElement = document.getElementById("tiktokPixelsData");
        if (!tiktokPixelsDataElement) {
            console.warn("Elemento #tiktokPixelsData não encontrado.");
            return;
        }

        var tiktokPixelsData = tiktokPixelsDataElement.getAttribute("data-tiktok-pixels");

        if (!tiktokPixelsData) {
            console.warn("Nenhum dado de pixel do TikTok encontrado.");
            return;
        }

        var tiktokPixelList;
        try {
            tiktokPixelList = JSON.parse(tiktokPixelsData);
        } catch (e) {
            console.error("Erro ao analisar JSON dos pixels do TikTok:", e);
            return;
        }

        // Carrega o script do TikTok Pixel
        (function (w, d, t) {
            w.TiktokAnalyticsObject = t;
            var ttq = w[t] = w[t] || [];
            ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
            ttq.setAndDefer = function (t, e) {
                t[e] = function () {
                    t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                };
            };
            for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);

            ttq.instance = function (t) {
                for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
                    ttq.setAndDefer(e, ttq.methods[n]);
                return e;
            };

            ttq.load = function (e, n) {
                var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                ttq._i = ttq._i || {};
                ttq._i[e] = [];
                ttq._i[e]._u = i;
                ttq._t = ttq._t || {};
                ttq._t[e] = +new Date;
                ttq._o = ttq._o || {};
                ttq._o[e] = n || {};

                var o = document.createElement("script");
                o.type = "text/javascript";
                o.async = !0;
                o.src = i + "?sdkid=" + e + "&lib=" + t;
                var a = document.getElementsByTagName("script")[0];
                a.parentNode.insertBefore(o, a);
            };

            // Inicializa os pixels do TikTok
            tiktokPixelList.forEach(pixel => {
                if (pixel.PixelId) {
                    ttq.load(pixel.PixelId);  // Carrega o script do TikTok Pixel
                }
            });

            ttq.page(); // Envia a visualização da página para o TikTok

        })(window, document, 'ttq');

        // Captura os dados dos pixels do Kwai da div
        var kwaiPixelsDataElement = document.getElementById("kwaiPixelsData");
        if (!kwaiPixelsDataElement) {
            console.warn("Elemento #kwaiPixelsData não encontrado.");
            return;
        }

        var kwaiPixelsData = kwaiPixelsDataElement.getAttribute("data-kwai-pixels");

        if (!kwaiPixelsData) {
            console.warn("Nenhum dado de pixel do Kwai encontrado.");
            return;
        }

        var kwaiPixelList;
        try {
            kwaiPixelList = JSON.parse(kwaiPixelsData);
        } catch (e) {
            console.error("Erro ao analisar JSON dos pixels do Kwai:", e);
            return;
        }

        // Carrega o script do Kwai Pixel
        !function (e, t) {
            "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.install = t() : e.install = t();
        }(window, (function () {
            return function (e) {
                var t = {};
                function n(o) {
                    if (t[o]) return t[o].exports;
                    var r = t[o] = { i: o, l: !1, exports: {} };
                    return e[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
                }
                return n.m = e, n.c = t, n.d = function (e, t, o) {
                    n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
                }, n.r = function (e) {
                    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "_esModule", { value: !0 });
                }, n.t = function (e, t) {
                    if (1 & t && (e = n(e)), 8 & t) return e;
                    if (4 & t && "object" == typeof e && e && e.esModule) return e;
                    var o = Object.create(null);
                    if (n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e) for (var r in e) n.d(o, r, function (t) { return e[t]; }.bind(null, r));
                    return o;
                }, n.n = function (e) {
                    var t = e && e.esModule ? function () { return e.default; } : function () { return e; };
                    return n.d(t, "a", t), t;
                }, n.o = function (e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t);
                }, n.p = "", n(n.s = 0);
            }([function (e, t, n) {
                "use strict";
                var o = this && this.spreadArray || function (e, t, n) {
                    if (n || 2 === arguments.length) for (var o, r = 0, i = t.length; r < i; r++)!o && r in t || (o || (o = Array.prototype.slice.call(t, 0, r)), o[r] = t[r]);
                    return e.concat(o || Array.prototype.slice.call(t));
                };
                Object.defineProperty(t, "_esModule", { value: !0 });
                var r = function (e, t, n) {
                    var o, i = e.createElement("script");
                    i.type = "text/javascript", i.async = !0, i.src = t, n && (i.onerror = function () { r(e, n); });
                    var a = e.getElementsByTagName("script")[0];
                    null === (o = a.parentNode) || void 0 === o || o.insertBefore(i, a);
                };
                !function (e, t, n) {
                    e.KwaiAnalyticsObject = n;
                    var i = e[n] = e[n] || [];
                    i.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
                    var a = function (e, t) {
                        e[t] = function () {
                            for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                            var i = o([t], n, !0);
                            e.push(i);
                        };
                    };
                    i.methods.forEach((function (e) { a(i, e); })), i.instance = function (e) {
                        var t, n = (null === (t = i._i) || void 0 === t ? void 0 : t[e]) || [];
                        return i.methods.forEach((function (e) { a(n, e); })), n;
                    }, i.load = function (e, o) {
                        var a = "https://s1.kwai.net/kos/s101/nlav11187/pixel/events.js";
                        i._i = i._i || {}, i._i[e] = [], i._i[e]._u = a, i._t = i._t || {}, i._t[e] = +new Date, i._o = i._o || {}, i._o[e] = o || {};
                        var c = "?sdkid=".concat(e, "&lib=").concat(n);
                        r(t, a + c, "https://s16-11187.ap4r.com/kos/s101/nlav11187/pixel/events.js" + c);
                    };

                    // Inicializa os pixels do Kwai
                    kwaiPixelList.forEach(pixel => {
                        if (pixel.PixelId) {
                            i.load(pixel.PixelId); // Carrega o script do Kwai Pixel
                            i.instance(pixel.PixelId).track('addToCart'); // Rastreia o evento 'addToCart'
                        }
                    });

                    i.page(); // Envia a visualização da página para o Kwai
                }(window, document, "kwaiq");
            }]);
        }));
        // Captura os dados da div
        var googleDataElement = document.getElementById("googleData");
        if (!googleDataElement) {
            console.warn("Elemento #googleData não encontrado.");
            return;
        }

        // Dados dos Google Pixels
        var googlePixelsData = googleDataElement.getAttribute("data-google-pixels");
        var googlePixelList = [];
        if (googlePixelsData) {
            try {
                googlePixelList = JSON.parse(googlePixelsData);
            } catch (e) {
                console.error("Erro ao analisar JSON dos Google Pixels:", e);
            }
        }

        // Dados do Google Analytics
        var googleAnalyticsId = googleDataElement.getAttribute("data-google-analytics-id");

        // Função para carregar o Google Tag Manager
        function loadGoogleTagManager(pixelId) {
            var script = document.createElement("script");
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${pixelId}`;
            document.head.appendChild(script);
        }

        // Função para configurar o gtag
        function configureGtag(pixelId, triggerVisitCheckout) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function () {
                dataLayer.push(arguments);
            };
            window.gtag('js', new Date());
            window.gtag('config', pixelId);

            if (triggerVisitCheckout) {
                window.gtag('event', 'Checkout', { 'send_to': pixelId });
            }
        }

        // Inicializa os Google Pixels
        googlePixelList.forEach(pixel => {
            if (pixel.PixelId) {
                loadGoogleTagManager(pixel.PixelId); // Carrega o script do Google Tag Manager
                configureGtag(pixel.PixelId, pixel.TriggerVisitCheckout); // Configura o gtag
            }
        });

        // Inicializa o Google Analytics
        if (googleAnalyticsId) {
            loadGoogleTagManager(googleAnalyticsId); // Carrega o script do Google Tag Manager
            configureGtag(googleAnalyticsId, false); // Configura o gtag (sem evento de checkout)
        }
    };
    var Events = function () {

        // Funções para salvar os valores no cookie
        $('#EmailComprador').on('change', function () {
            setCookie('user-email', $(this).val(), 2);
        });

        $('#ConfirmeEmailComprador').on('change', function () {
            setCookie('user-confirm-email', $(this).val(), 2);
        });

        $('#TelefoneComprador2').on('change', function () {
            setCookie('user-phone-number', $(this).val(), 2);
        });

        $('#NomeComprador2').on('change', function () {
            setCookie('user-name', $(this).val(), 2);
        });

        $('#CodigoPostalComprador').on('change', function () {
            setCookie('user-cep', $(this).val(), 2);
        });

        $('#CPFCompradorPix').on('change', function () {
            setCookie('user-cpf', $(this).val(), 2);
        });

        $('#RuaPostalComprador').on('change', function () {
            setCookie('user-rua', $(this).val(), 2);
        });

        $('#NumeroPostalComprador').on('change', function () {
            setCookie('user-numero', $(this).val(), 2);
        });

        $('#CPFCompradorBankSlip').on('change', function () {
            setCookie('user-cpf-bankslip', $(this).val(), 2);
        });

        $('[name="buyerAddressComplement"]').on('change', function () {
            setCookie('user-complemento', $(this).val(), 2);
        });

        $('#BairroPostalComprador').on('change', function () {
            setCookie('user-bairro', $(this).val(), 2);
        });

        $('#CidadePostalComprador').on('change', function () {
            setCookie('user-cidade', $(this).val(), 2);
        });

        $('#EstadoPostalComprador').on('change', function () {
            setCookie('user-estado', $(this).val(), 2);
        });

        $('#PaisPostalComprador').on('change', function () {
            setCookie('user-pais', $(this).val(), 2);
        });

        // Verifica o tipo de pagamento selecionado
        var paymentType = $('input[name="paymentType"]:checked');
        if (paymentType.length > 0) {
            changePaymentType(paymentType);
        }

        // Configura eventos para checkboxes de produtos selecionados
        $('input[name="selectedProducts"]').on('change', calculateTotal);

        // Configura evento para o select de parcelas
        $('#installmentsSelect').on('change', calculateTotal);

        // Configura eventos para os cards de envio
        $('[id^="shipping-card-"]').on('click', function () {
            const cardId = $(this).attr('id').replace('shipping-card-', '');
            selectShippingCard(cardId);
        });

        // Chama a função para calcular o total inicialmente
        calculateTotal();

        // Carregar os dados ao inicializar
        loadContactData();

        // Inicia o contador regressivo
        startCountdown();

        startSecondCountdown();

        // Cria histórico falso para retorno
        setupBackRedirect();

        // Popula as opções de parcelamento ao carregar a página
        populateInstallments();

        initCouponVisibility();
        initCouponInput();

        // Aplicando máscaras nos campos
        mascaraCPF($('#CPFCompradorPix'));
        mascaraCPF($('#CPFCompradorCartao'));
        mascaraCPF($('#CPFCompradorBankSlip'));

        mascaraTelefone($('#TelefoneComprador'));
        mascaraCEP($('#CodigoPostalComprador'));

        buscarCEPCartaoCredito($('#CodigoPostalComprador'));

        validarNumeros($('#MesCompradorCartao'), $('#errorSpanMes'), 2); // Mês (2 dígitos)
        validarNumeros($('#AnoCompradorCartao'), $('#errorSpanAno'), 2); // Ano (2 dígitos)
        validarNumeros($('#CVVCompradorCartao'), $('#errorSpanCVV'), 3); // CVV (3 dígitos)

        // Funções reCAPTCHA
        window.onRecaptchaSuccess = function () {
            $("#submitButton").removeAttr('style disabled title');
            $(".g-recaptcha").hide();
        };

        window.onRecaptchaFailure = function () {
            $("#submitButton").css('background-color', 'gray').attr('disabled', 'disabled');
            $(".g-recaptcha").show();
            grecaptcha.reset();
        };

        window.addEventListener('beforeunload', function (event) {
            setTimeout(sendFieldData, 0);
        });

        $('#copyButton').on('click', copiarTexto);

        $('#EmailComprador').on('change', function (event) {
            window.validateEmail(event);
        });

        $('#ConfirmeEmailComprador').on('change', function (event) {
            window.validateEmail(event);
        });

        $('#EmailComprador').on('keydown', function (event) {
            if (event.key === " ") {
                event.preventDefault();
            }
        });

        $('#ConfirmeEmailComprador').on('keydown', function (event) {
            if (event.key === " ") {
                event.preventDefault();
            }
        });

        $('#CPFCompradorPix').on('input', function () {
            var input = $(this).val().replace(/\D/g, '');
            var isValid = window.isValidCPFCNPJ(input);
            $('#errorSpanCPFPix').toggle(!isValid);
        });

        $('#CPFCompradorCartao').on('input', function () {
            var input = $(this).val().replace(/\D/g, '');
            var isValid = window.isValidCPFCNPJ(input);
            $('#errorSpanCPFCartao').toggle(!isValid);
        });

        $('#CPFCompradorBankSlip').on('input', function () {
            var input = $(this).val().replace(/\D/g, '');
            var isValid = window.isValidCPFCNPJ(input);
            $('#errorSpanCPFBankSlip').toggle(!isValid);
        });

        // Evento para o campo de telefone
        $('#TelefoneComprador2').on('keydown', function (event) {
            if (!/^[0-9]$/.test(event.key) && event.key !== "Backspace" && event.key !== "ArrowLeft" && event.key !== "ArrowRight" && event.key !== "Tab") {
                event.preventDefault();
            }
        });

        // Evento para a mudança de valor no campo de telefone
        $('#TelefoneComprador2').on('input', function () {
            let phone = this.value.replace(/\D/g, '');

            let formattedPhone;

            if (phone.length > 0) {
                if (phone.length > 0) {
                    formattedPhone = '(' + phone.substring(0, 2);
                }

                if (phone.length > 2) {
                    formattedPhone += ') ';
                }

                if (phone.length <= 10) {
                    if (phone.length > 2) {
                        formattedPhone += phone.substring(2, 6);
                    }
                    if (phone.length > 6) {
                        formattedPhone += '-' + phone.substring(6, 11);
                    }
                }
                else if (phone.length > 10) {
                    if (phone.length > 2) {
                        formattedPhone += phone.substring(2, 7);
                    }
                    if (phone.length > 6) {
                        formattedPhone += '-' + phone.substring(7, 11);
                    }
                }

                this.value = formattedPhone;
            }
        });

        // Validação do telefone ao mudar
        $('#TelefoneComprador2').on('change', validatePhoneNumber);

        // Validação do número do cartão
        $('#CartaoComprador').on('input', function (event) {
            var cartao = $(this).val().replace(/\s/g, '');
            var regex = /^\d{16}$/;

            var formattedCartao = cartao.replace(/(\d{4})(?=\d)/g, '$1 ');

            $(this).val(formattedCartao.trim());

            if (!regex.test(cartao)) {
                $('#errorSpanCartao').css('display', 'inline');
            } else {
                $('#errorSpanCartao').css('display', 'none');
            }
        });

        // Validação de CEP 
        $('#CodigoPostalComprador').on('input', function (event) {
            var cep = event.target.value.trim().replace('-', '');
            var regex = /^\d{5}-?\d{3}$/;
            var errorSpanCEP = $('#errorSpanCEP');

            if (regex.test(cep)) {
                buscarInformacoesCEP(cep);
                errorSpanCEP.hide();
            } else {
                errorSpanCEP.text('CEP Inválido').show();
            }
        });
    };
    // Função para criar um cookie
    function setCookie(name, value, hours) {
        var expires = "";
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Função para ler um cookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Função para carregar os dados do cookie e preencher os campos
    function loadContactData() {
        $('#EmailComprador').val(getCookie('user-email'));
        $('#ConfirmeEmailComprador').val(getCookie('user-confirm-email'));
        $('#TelefoneComprador2').val(getCookie('user-phone-number'));
        $('#NomeComprador2').val(getCookie('user-name'));
        $('#CodigoPostalComprador').val(getCookie('user-cep'));
        $('#CPFCompradorPix').val(getCookie('user-cpf'));
        $('#RuaPostalComprador').val(getCookie('user-rua'));
        $('#NumeroPostalComprador').val(getCookie('user-numero'));
        $('#CPFCompradorBankSlip').val(getCookie('user-cpf-bankslip'));
        $('[name="buyerAddressComplement"]').val(getCookie('user-complemento'));
        $('#BairroPostalComprador').val(getCookie('user-bairro'));
        $('#CidadePostalComprador').val(getCookie('user-cidade'));
        $('#EstadoPostalComprador').val(getCookie('user-estado'));
        $('#PaisPostalComprador').val(getCookie('user-pais'));
    }

    // Função para iniciar o contador regressivo
    function startCountdown() {
        var countdownElement = $('#countdown-data'); // Obtém o elemento do countdown
        var countdownMinutes = parseInt(countdownElement.data('countdown')) || 0; // Pega o valor do atributo data-countdown
        var countDownDuration = countdownMinutes * 60000; // Converte para milissegundos
        var countDownDate = new Date(Date.now() + countDownDuration).getTime(); // Define a data final

        var x = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate - now;

            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Adiciona zero à esquerda para manter o formato consistente
            hours = ("0" + hours).slice(-2);
            minutes = ("0" + minutes).slice(-2);
            seconds = ("0" + seconds).slice(-2);

            var timeElement = $('#time'); // Obtém o elemento onde o tempo será exibido
            if (timeElement.length) {
                timeElement.text(hours + ":" + minutes + ":" + seconds);
            }

            if (distance < 0) {
                clearInterval(x);
                if (timeElement.length) {
                    timeElement.text("NÃO PERCA, COMPRE AGORA!");
                }
            }
        }, 1000);
    }

    // Função para iniciar o contador regressivo
    function startSecondCountdown() {
        var countDownDate2 = new Date(new Date().getTime() + (10 * 60000)); // Define a data final (10 minutos a partir de agora)

        var x1 = setInterval(function () {
            var now = new Date().getTime();
            var distance = countDownDate2 - now;

            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Exibe o resultado no elemento com id="countdown"
            var countdownElement = $('#countdown'); // Obtém o elemento onde o tempo será exibido
            if (countdownElement.length) {
                countdownElement.text(minutes + "m " + seconds + "s ");
            }

            // Se o contador terminar, exibe "EXPIRED"
            if (distance < 0) {
                clearInterval(x1);
                if (countdownElement.length) {
                    countdownElement.text("EXPIRED");
                }
            }
        }, 1000);
    }

    // Função para usar back redirect
    function setupBackRedirect() {
        // Redirecionamento de volta removido
    }

    // Função para adicionar máscara de CPF/CNPJ
    function mascaraCPF($input) {
        $input.on('input', function () {
            var input = $(this).val().replace(/\D/g, '');
            var length = input.length;

            if (length > 14) {
                input = input.substring(0, 14); // Limita o número de caracteres a 14
            }
            if (length <= 11) {
                // Máscara para CPF: 000.000.000-00
                input = input.replace(/(\d{3})(\d{1,3})?(\d{1,3})?(\d{1,2})?/, function (match, p1, p2, p3, p4) {
                    return p1 + (p2 ? '.' + p2 : '') + (p3 ? '.' + p3 : '') + (p4 ? '-' + p4 : '');
                });
            } else {
                // Máscara para CNPJ: 00.000.000/0000-00
                input = input.replace(/(\d{2})(\d{1,3})?(\d{1,3})?(\d{1,4})?(\d{1,2})?/, function (match, p1, p2, p3, p4, p5) {
                    return p1 + (p2 ? '.' + p2 : '') + (p3 ? '.' + p3 : '') + (p4 ? '/' + p4 : '') + (p5 ? '-' + p5 : '');
                });
            }

            $(this).val(input);
        });
    }

    // Função para adicionar máscara de CEP
    function mascaraCEP($input) {
        $input.on('input', function () {
            var cep = $(this).val().replace(/\D/g, '').substring(0, 8);; // Remove caracteres não numéricos
            if (cep.length > 5) {
                cep = cep.replace(/^(\d{5})(\d)/, '$1-$2'); // Adiciona hífen após os primeiros 5 dígitos
            }
            $(this).val(cep);
        });
    }

    // Função para adicionar máscara de número de cartão
    function mascaraCartao($input) {
        $input.on('input', function () {
            var cartao = $(this).val().replace(/\D/g, ''); // Remove caracteres não numéricos
            cartao = cartao.replace(/(\d{4})(?=\d)/g, '$1 '); // Adiciona espaço a cada 4 dígitos
            $(this).val(cartao);
        });
    }

    // Função para adicionar máscara de telefone
    function mascaraTelefone(input) {
        if (input.length) {
            input.on('input', function () {
                var telefone = $(this).val().replace(/\D/g, ''); // Remove não numéricos
                if (telefone.length > 10) {
                    telefone = telefone.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3'); // Formato (XX) XXXXX-XXXX
                } else {
                    telefone = telefone.replace(/^(\d{2})(\d{4})(\d{4})/, '($1) $2-$3'); // Formato (XX) XXXX-XXXX
                }
                $(this).val(telefone);
            });
        }
    }

    // Função para buscar o cep
    function buscarCEPCartaoCredito($input) {
        $input.on('keyup', function () {
            var cepComplete = $(this).val();
            var cep = cepComplete.replace(/\D/g, '');

            if (!cep || cep.length !== 8) {
                $('#errorSpanCEP').show();
                return;
            }

            $('#errorSpanCEP').hide();

            var url = "https://viacep.com.br/ws/" + cep + "/json/";

            $.getJSON(url, function (data) {
                if (data.erro) {
                    $('#errorSpanCEP').show().text('CEP não encontrado');
                    return;
                }

                $('#RuaPostalComprador').val(data.logradouro);
                $('#BairroPostalComprador').val(data.bairro);
                $('#CidadePostalComprador').val(data.localidade);
                $('#EstadoPostalComprador').val(data.uf);
                $('#PaisPostalComprador').val('Brasil');
            });
        });
    }

    // Função para copiar qrcode
    function copiarTexto() {
        var conteudoDiv = $('#PixCopyPasteData')[0]; // Seleciona o conteúdo da div
        var range = document.createRange();
        range.selectNode(conteudoDiv);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        var copyButton = $('#copyButton');
        var originalText = copyButton.html();

        try {
            var sucesso = document.execCommand("copy");
            var msg = sucesso ? "Pix Copia e Cola Copiado!" : "Falha ao copiar o Pix.";
            copyButton.html(msg);
            setTimeout(function () {
                copyButton.html(originalText);
            }, 700);

        } catch (err) {
            console.log("Erro ao copiar o conteúdo: ", err);
        }

        window.getSelection().removeAllRanges();
    }

    // Função para enviar os dados do campo para o servidor
    function sendFieldData() {

        var email = document.getElementById('EmailComprador').value;
        var telefone = document.getElementById('TelefoneComprador2').value;
        var nome = document.getElementById('NomeComprador2').value;
        var curUrl = document.querySelector('input[name="curUrl"]').value;
        var data = {
            CostumerEmail: email,
            CostumerName: nome,
            CostumerPhone: telefone,
            curUrl: curUrl,
        };

        if (email) {
            let baseUrl = window.location.pathname;
            let fetchUrl = `${baseUrl}?handler=SaveAbandonedCart`;

            let currentQueryString = window.location.search;
            let newQueryParam = 'handler=SaveAbandonedCart';

            if (currentQueryString) {
                fetchUrl = `${baseUrl}${currentQueryString}&${newQueryParam}`;
            } else {
                fetchUrl = `${baseUrl}?${newQueryParam}`;
            }

            fetch(fetchUrl, {
                method: 'POST',
                keepalive: true,
                headers: {
                    'Content-Type': 'application/json',
                    'RequestVerificationToken': document.querySelector('input[name="__RequestVerificationToken"]').value
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text); });
                    }
                    return response.json();
                })
                .catch(error => {
                    console.error('erro:', error);
                });
        }
    }

    // Função para calcular e exibir as opções de parcelamento
    function populateInstallments() {
        var container = $('#dataContainer');

        var price = parseFloat(container.data('price')) || 0;
        var taxaJuros = parseFloat(container.data('taxa-juros')) || 0;
        var productPrice = parseFloat(container.data('product-price')) || 0;
        var maxInstallments = parseInt($('#maxInstallments').val(), 10) || 1;
        var modelPay = $('#ModelPay').val();

        var installmentsSelect = $('#installmentsSelect');
        var valorDoProdutoComprado = $('#valorDoProdutoComprado');

        valorDoProdutoComprado.html('');
        installmentsSelect.html('');

        let installmentValue2 = ((price + (price * taxaJuros * maxInstallments / 100)) / maxInstallments).toFixed(2).replace('.', ',');
        let originalPrice = (price).toFixed(2).replace('.', ',');

        if (maxInstallments === 1) {
            installmentValue2 = originalPrice;
        }

        var hasCreditCard = $('input[name="paymentType"][value="CreditCard"]').length > 0;

        if (hasCreditCard) {
            if (maxInstallments > 1) {
                let text = modelPay == "1"
                    ? `ou ${maxInstallments}x de R$ ${installmentValue2}`
                    : `R$ ${productPrice} ou ${maxInstallments}x de R$ ${installmentValue2}`;

                valorDoProdutoComprado.append($('<p>').append($('<strong>').text(text)));
            } else if (modelPay == "2") {
                valorDoProdutoComprado.append($('<p>').append($('<strong>').text(`R$ ${productPrice}`)));
            }
        } else if (modelPay == "2") {
            valorDoProdutoComprado.append($('<p>').append($('<strong>').text(`R$ ${productPrice}`)));
        }

        for (let i = 1; i <= maxInstallments; i++) {
            let juros = 0;

            if (i === 1) {
                juros = price * 0.039;
            } else if (i >= 2) {
                juros = price * taxaJuros * i / 100;
            }

            let installmentValue = ((price + juros) / i).toFixed(2).replace('.', ',');

            installmentsSelect.append($('<option>', {
                value: i,
                text: `${i}x de R$ ${installmentValue}`
            }));
        }

    };

    // Função para inicializar a visibilidade do cupom, dependendo de seus dados
    function initCouponVisibility() {
        var $couponData = $('#couponData');
        if ($couponData.length === 0) return;

        var existingCoupons = $couponData.attr('data-existing-coupons').toLowerCase();

        if (existingCoupons === 'false') {
            $('.row-coupon').hide();
        }
    }

    // Função para inicializar o campo de entrada do cupom
    function initCouponInput() {
        var $inputCupom = $('#inputCupom');
        if ($inputCupom.length === 0) return;

        $inputCupom.on('focus', function () {
            var $this = $(this);

            if ($this.hasClass('is-invalid') || $this.hasClass('is-valid')) {
                $('button[onclick="applyCupom()"]').css('display', 'inline-block');

                $this.parent().removeClass('col-sm-12 pe-sm-3').addClass('col-sm-6 pe-sm-0');

                $this.removeClass('is-invalid is-valid');

                $('#cupom-success, #cupom-error').hide();
            }
        });
    }

    // Função responsável por inicializar o reCAPTCHA, executar a validação e liberar o botão de envio
    window.setRecaptcha = function () {
        // grecaptcha.ready(function () {
        //     var siteKey = $('#sitekey-data').data('sitekey');
        //     grecaptcha.execute(siteKey, { action: 'submit' }).then(function (token) {
        //         var recaptchaTokenElement = $('#recaptchaToken')[0];
        //         if (recaptchaTokenElement) {
        //             recaptchaTokenElement.value = token;
        //         } else {
        //             console.error('Elemento recaptchaToken não encontrado no DOM.');
        //         }

        //         var submitButton = $('#submitButton')[0];
        //         if (submitButton) {
        //             submitButton.removeAttribute('disabled');
        //             submitButton.title = '';
        //             $('#btn-purchase-submit').show();
        //         } else {
        //             console.error('Elemento submitButton não encontrado no DOM.');
        //         }
        //     }).catch(function (error) {
        //         console.error('Error during reCAPTCHA execution:', error);
        //     });
        // });
        var recaptchaTokenElement = document.getElementById('recaptchaToken');
        if (recaptchaTokenElement) {
            recaptchaTokenElement.value = 'DISABLED';
        }
    }

    // Função para validar o formato de um e-mail
    window.validateEmail2 = function (email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    };

    // Função para validar o e-mail fornecido no campo de entrada
    window.validateEmail = function () {
        const emailInput = $('#EmailComprador');
        const confirmEmailInput = $('#ConfirmeEmailComprador');
        const emailError = $('#buyer-email-invalid');
        const confirmEmailError = $('#buyer-confirm-email-invalid');
        emailError.hide();
        confirmEmailError.hide();

        var valorEmail = emailInput.val();

        if (!window.validateEmail2(valorEmail)) {
            emailError.html("Email inválido");
            emailError.show();
            return false;
        }
        if (confirmEmailInput.is(':visible') && confirmEmailInput.length > 0) {
            var valorConfirmEmail = confirmEmailInput.val();

            if (valorEmail != valorConfirmEmail) {
                emailError.html("Os endereços de e-mail informados não coincidem");
                confirmEmailError.html("Os endereços de e-mail informados não coincidem");
                emailError.show();
                confirmEmailError.show();
                return false;
            }
        }
        emailError.hide();
        confirmEmailError.hide();
        return true;
    };

    // Função para setar o código do país no campo de telefone
    window.SetPhoneCountryCode = function (dialCode) {
        var $inputPhone = $('#TelefoneComprador2CountryCode');

        if ($inputPhone.is(':visible')) {
            $inputPhone.val(dialCode);
        }
        // Se estiver oculto, não faz nada
    };


    // Função para validar o número de telefone
    window.validatePhoneNumber = function () {
        const $phoneInput = $('#TelefoneComprador2');

        // Verifica se o campo está visível
        if ($phoneInput.is(':visible')) {
            let phone = $phoneInput.val().replace(/\D/g, '');

            if (phone.length < 10) {
                var result = "O número deve seguir o exemplo (00) 00000-0000";

                showErrorPhone(result);
                return result;
            } else {
                resetPhone();
                return null;
            }
        } else {
            // Campo não visível, não valida
            return null;
        }
    };


    // Função para resetar o campo de telefone
    const resetPhone = () => {
        $('#TelefoneComprador2').removeClass("error");
        $('#TelefoneComprador2').removeClass("error-message");
        $('#error_msg_TelefoneComprador2').html("").addClass("hide");
    };

    // Função para mostrar o erro de telefone
    const showErrorPhone = (msg) => {
        $('#TelefoneComprador2').addClass("error").addClass("error-message");
        $('#error_msg_TelefoneComprador2').html(msg).removeClass("hide");
    };

    // Função para validação de CPF
    window.isValidCPF = function (cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove all non-numeric characters
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Reject if not 11 digits or all digits are the same

        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++)
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++)
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };

    // Função para validação de CNPJ
    window.isValidCNPJ = function (cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj === '' || cnpj.length !== 14) return false;

        if (/^(\d)\1{13}$/.test(cnpj)) return false; // Block cases where all digits are the same

        let length = cnpj.length - 2
        let numbers = cnpj.substring(0, length);
        const digits = cnpj.substring(length);
        let sum = 0;
        let pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(0))) return false;

        length = length + 1;
        numbers = cnpj.substring(0, length);
        sum = 0;
        pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(1))) return false;

        return true;
    };

    // Função para validar CPF ou CNPJ (se o número for válido)
    window.isValidCPFCNPJ = function (cpfCnpj) {
        let isValid = false;

        // Ajusta regex para aceitar tanto CPF (11 dígitos) quanto CNPJ (14 dígitos)
        const regexCPF = /^[0-9]{11}$/;
        const regexCNPJ = /^[0-9]{14}$/;

        if (regexCPF.test(cpfCnpj)) {
            isValid = window.isValidCPF(cpfCnpj);
        } else if (regexCNPJ.test(cpfCnpj)) {
            isValid = window.isValidCNPJ(cpfCnpj);
        }
        return isValid;
    };

    // Função para tratar o input de CPF/CNPJ e exibir mensagens de erro
    window.handleCpfCnpjInput = function (event, errorSpanId) {
        event.target.value = event.target.value.replace(/[^\d.-\/]/g, '').substring(0, 17);
        const input = event.target.value.replace(/\D/g, '');

        let isValid = window.isValidCPFCNPJ(input);

        $('#' + errorSpanId).css('display', isValid ? 'none' : 'inline');
    };
    window.isValidCPF = function (cpf) {
        cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Rejeita se não for 11 dígitos ou se todos os dígitos forem iguais

        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++)
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++)
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11)) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    };

    window.isValidCNPJ = function (cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');

        if (cnpj === '' || cnpj.length !== 14) return false;

        if (/^(\d)\1{13}$/.test(cnpj)) return false; // Bloqueia casos onde todos os dígitos são iguais

        let length = cnpj.length - 2
        let numbers = cnpj.substring(0, length);
        const digits = cnpj.substring(length);
        let sum = 0;
        let pos = length - 7;

        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(0))) return false;

        length = length + 1;
        numbers = cnpj.substring(0, length);
        sum = 0;
        pos = length - 7;
        for (let i = length; i >= 1; i--) {
            sum += numbers.charAt(length - i) * pos--;
            if (pos < 2) pos = 9;
        }
        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result !== parseInt(digits.charAt(1))) return false;

        return true;
    };

    window.isValidCPFCNPJ = function (cpfCnpj) {
        let isValid = false;

        // Ajusta regex para aceitar tanto CPF (11 dígitos) quanto CNPJ (14 dígitos)
        const regexCPF = /^[0-9]{11}$/;
        const regexCNPJ = /^[0-9]{14}$/;

        if (regexCPF.test(cpfCnpj)) {
            isValid = window.isValidCPF(cpfCnpj);
        } else if (regexCNPJ.test(cpfCnpj)) {
            isValid = window.isValidCNPJ(cpfCnpj);
        }
        return isValid;
    };

    window.validarNumeros = function (input, errorSpan, maxLength) {
        input.on('input', function () {
            var valor = $(this).val().trim();

            // Expressão regular para permitir apenas números
            var regex = /^\d*$/;

            // Exibir erro caso não esteja no formato correto
            $(errorSpan).toggle(!regex.test(valor) || valor.length !== maxLength);
        });
    }

    // Função para buscar informações do CEP
    window.buscarInformacoesCEP = function (cep) {
        $.ajax({
            url: `https://api.pagar.me/1/zipcodes/${cep}?api_key=Public`,
            method: 'GET',
            success: function (data) {
                // Aqui você pode manipular os dados recebidos da API, se necessário
            },
            error: function () {
                $('#errorSpanCEP').text('Erro ao buscar informações do CEP').show();
            }
        });
    }

    window.changePaymentType = function (input) {
        var paymentType = $('input[name="paymentType"]:checked').val();

        $('#pixDetails').css('display', paymentType === 'Pix' ? 'block' : 'none');
        $('#creditCardDetails').css('display', paymentType === 'CreditCard' ? 'block' : 'none');
        $('#bankSlipDetails').css('display', paymentType === 'BankSlip' ? 'block' : 'none');

        changeColor(input);
        calculateTotal();
    };

    window.ChangeCardMonthFromDropbox = function () {
        var selectedValue = $('#mes').val();
        $('#MesCompradorCartao').val(selectedValue);
    }

    window.ChangeCardYearFromDropbox = function () {
        var selectedValue = $('#ano').val();
        $('#AnoCompradorCartao').val(selectedValue);
    }

    return {
        init: function () {
            Pixel();
            Events();
        }
    };
};

jQuery(document).ready(function () {
    ScreenCheckout1().init();
});

// Abre o modal do PIX
function openModal() {
    $('#PixModal').css('display', 'block');
    $('#customerForm').css('display', 'none');
    checkPaymentStatus();
    countDownDate2 = new Date(new Date().getTime() + (10 * 60000));
}

// Fecha o modal do PIX
function closeModal() {
    clearInterval(checkInterval);
    $('#PixModal').css('display', 'none');
}

// Abre o modal do boleto bancário
function openBankSlipModal() {
    $('#BankSlipModal').css('display', 'block');
    $('#customerForm').css('display', 'none');
}

// Fecha o modal do boleto bancário
function closeBankSlipModal() {
    $('#BankSlipModal').css('display', 'none');
}

// Aplica o cupom de desconto
function applyCupom() {
    let couponData = $("#couponData");

    let cupomCode = $("#inputCupom").val();
    let offerId = couponData.data("offer-id");
    let apiUrl = couponData.data("api-url");

    if (!cupomCode) {
        $("#cupom-error").show();
        return;
    }

    $("#cupom-error").hide();

    let requestBody = {
        offerId: offerId,
        couponCode: cupomCode
    };

    $.ajax({
        url: apiUrl,
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(requestBody),
        success: function (data) {
            if (data && data.message.startsWith("Cupom de desconto aplicado!")) {
                let couponValue = parseFloat(data.discount);

                $("#couponSection").css("display", "inline-flex");
                $("#couponValue").text("R$ -" + couponValue.toFixed(2).replace(".", ","));

                $("button[onclick='applyCupom()']").hide();

                $("#inputCupom").parent().removeClass("col-sm-6 pe-sm-0").addClass("col-sm-12 pe-sm-3");
                $("#inputCupom").addClass("is-valid").prop("disabled", true);

                $("#cupom-success").text(data.message).show();

                calculateTotal();
            } else {
                $("button[onclick='applyCupom()']").hide();

                $("#inputCupom").parent().removeClass("col-sm-6 pe-sm-0").addClass("col-sm-12 pe-sm-3");
                $("#inputCupom").addClass("is-invalid");

                $("#cupom-error").text(data.message).show();
                $("#couponValue").text("R$ -0");
                $("#couponSection").hide();

                calculateTotal();
            }
        },
        error: function () {
            console.error("Erro no AJAX");
            $("#cupom-error").show();
            alert("Erro de comunicação com o servidor.");
        }
    });
}

// Processa o pagamento via PIX
function paymentPix() {
    var selectedProducts = [];
    $('input[name="selectedProducts"]:checked').each(function () {
        selectedProducts.push({ id: $(this).val(), checked: $(this).is(':checked') });
    });

    const recaptchaToken = $('#recaptchaToken').val();
    const data = {
        curUrl: $('input[name="curUrl"]').val(),
        BuyerName: $('input[name="buyer-name"]').val(),
        ShippingId: typeof selectedShippingId !== 'undefined' ? selectedShippingId : null,
        BuyerPhoneCountryCode: $('input[name="TelefoneComprador2CountryCode"]').val(),
        BuyerPhone: (function () {
            const phone = $('input[name="TelefoneComprador2"]').val();
            return phone && phone.trim() !== '' ? phone : '61 93824 4937';
        })(),
        BuyerEmail: $('input[name="buyer-email"]').val(),
        BuyerDocument: $('input[name="customerPixDocument"]').val(),
        OrderBumps: JSON.stringify({ order_bumps: selectedProducts }),
        BuyerAddressCEP: $('input[name="buyerAddressCEP"]').val() || null,
        BuyerAddressStreet: $('input[name="buyerAddressStreet"]').val() || null,
        BuyerAddressNumber: $('input[name="buyerAddressNumber"]').val() || null,
        BuyerAddressComplement: $('input[name="buyerAddressComplement"]').val() || null,
        BuyerAddressNeighborhood: $('input[name="buyerAddressNeighborhood"]').val() || null,
        BuyerAddressCity: $('input[name="buyerAddressCity"]').val() || null,
        BuyerAddressState: $('input[name="buyerAddressState"]').val() || null,
        BuyerAddressCountry: $('input[name="buyerAddressCountry"]').val() || null,
        BuyerCodeCoupon: $('input[name="buyerCodeCoupon"]').val() || null,
        RecaptchaToken: recaptchaToken
    };

    let baseUrl = window.location.pathname;
    let currentQueryString = window.location.search;
    let fetchUrl = currentQueryString ? `${baseUrl}${currentQueryString}&handler=ProcessPixPayment` : `${baseUrl}?handler=ProcessPixPayment`;

    // Facebook Pixels
    fbq('track', 'AddPaymentInfo');
    let productsInfos = getSelectedProductInfos();
    const contents = productsInfos.map(productId => ({ id: productId, quantity: 1 }));
    let totalPrice = getSelectedProductsTotalPrice();

    // Google Analytics
    const googleAnalyticsId = $('#googleData').data('google-analytics-id');
    if (googleAnalyticsId) {
        gtag('event', 'conversion', { 'send_to': googleAnalyticsId, 'value': totalPrice, 'currency': 'BRL', 'content': contents });
    }

    // Google Pixels
    const googlePixels = $('#googleData').data('google-pixels');
    googlePixels.forEach(pixel => {
        if (pixel.PixelId) {
            gtag('event', 'AddPaymentInfo', { 'send_to': pixel.PixelId });
        }
    });

    // TikTok Pixels
    const tiktokPixels = $('#tiktokPixelsData').data('tiktok-pixels');
    tiktokPixels.forEach(pixel => {
        if (pixel.PixelId) {
            ttq.track('AddPaymentInfo', { pixel: pixel.PixelId });
            if (pixel.TriggerPixGenerated) {
                ttq.track('Purchase', { pixel: pixel.PixelId });
            }
        }
    });

    // Kwai Pixels
    const kwaiPixels = $('#kwaiPixelsData').data('kwai-pixels');
    kwaiPixels.forEach(pixel => {
        if (pixel.PixelId) {
            kwaiq.instance(pixel.PixelId).track('addPaymentInfo');
            if (pixel.TriggerPixGenerated) {
                kwaiq.instance(pixel.PixelId).track('purchase');
            }
        }
    });
    function hideSpinner() {
        $('#loading-overlay').fadeOut(200);
    }
    $.ajax({
        url: fetchUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
        },
        data: JSON.stringify(data),
        success: function (data) {
            if (!data.success) {
                setRecaptcha();
                submitButtonNormal();
                hideSpinner();
                const errorsContainer = $('#dynamicErrors');
                errorsContainer.html('').show();

                if (data.errors && Array.isArray(data.errors)) {
                    data.errors.forEach(error => {
                        if (error == "Erro em Body .Invalid API key") {
                            errorsContainer.append($('<div>').text("Entre em contato com o suporte: (11) 96335-6715"));
                        }
                        else {
                            errorsContainer.append($('<div>').text(error));
                        }
                    });
                } else {
                    errorsContainer.append($('<div>').text('Ocorreu um erro desconhecido.'));
                    console.error('Erro: data.errors é undefined ou não é um array', data.errors);
                }
                window.scrollTo(0, 0);
            } else {
                const numeroPedido = data.orderId;
                $('#numero-pedido').html(`<span>${numeroPedido}</span>`);
                $('#dynamicErrors').hide();

                const PixQrCode = data.data;
                new QRCode($("#PixQrCodeImage")[0], {
                    width: 160,
                    height: 160,
                    correctLevel: QRCode.CorrectLevel.L
                }).makeCode(PixQrCode);

                const numeroPedidoUpsell = data.upsellId;
                $('#orderUpsellGUID').val(numeroPedidoUpsell);
                $('#PixCopyPasteData').text(PixQrCode);

                openModal();
                hideSpinner();
            }
        },
        error: function (err) {
            setRecaptcha();
            submitButtonNormal();
            hideSpinner();
            console.error(err);
            const errorsContainer = $('#dynamicErrors');
            console.log(data, "esse 'e o erro n olgo");

            errorsContainer.html('').show();
            errorsContainer.append($('<div>').text('Ocorreu um erro ao gerar o pix.'));
            window.scrollTo(0, 0);
        }
    });
}

// Verifica o status de pagamento
function checkPaymentStatus() {
    checkInterval = setInterval(function () {
        const data = {
            curOrderId: $('#numero-pedido span').text(),
        };

        let curbaseUrl = window.location.pathname;
        let curfetchUrl = `${curbaseUrl}?handler=CheckPaymentStatus`;

        $.ajax({
            url: curfetchUrl,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
            },
            data: JSON.stringify(data),
            success: function (data) {
                if (!data.success) {
                    // Tratar erro, se necessário
                } else {
                    clearInterval(checkInterval);  // Parar o intervalo

                    // Facebook Pixels
                    let productsInfos = getSelectedProductInfos();
                    const contents = productsInfos.map(productId => ({ id: productId, quantity: 1 }));
                    let totalPrice = getSelectedProductsTotalPrice();
                    fbq('track', 'Purchase', {
                        value: totalPrice,
                        currency: 'BRL',
                        contents: contents,
                        content_type: 'product'
                    });

                    // Google Analytics
                    const googleAnalyticsId = $('#googleData').data('google-analytics-id');
                    if (googleAnalyticsId) {
                        gtag('event', 'conversion', { 'send_to': googleAnalyticsId, 'value': totalPrice, 'currency': 'BRL', 'content': contents });
                    }

                    // Google Pixels
                    const googlePixels = $('#googleData').data('google-pixels');
                    googlePixels.forEach(pixel => {
                        if (pixel.PixelId && pixel.TriggerPaymentApproved) {
                            gtag('event', 'Purchase', { 'send_to': pixel.PixelId });
                        }
                    });

                    // TikTok Pixels
                    const tiktokPixels = $('#tiktokPixelsData').data('tiktok-pixels');
                    tiktokPixels.forEach(pixel => {
                        if (pixel.PixelId) {
                            ttq.track('Purchase', { pixel: pixel.PixelId });
                        }
                    });

                    // Kwai Pixels
                    const kwaiPixels = $('#kwaiPixelsData').data('kwai-pixels');
                    kwaiPixels.forEach(pixel => {
                        if (pixel.PixelId) {
                            kwaiq.instance(pixel.PixelId).track('purchase');
                        }
                    });

                    // Redirecionamento
                    const GUIDElem = $('#orderUpsellGUID').val();
                    const redirectData = $('#redirectData').data();

                    if (redirectData.useThanksPage === 'True' && redirectData.thanksPageUrl) {
                        const currentUrlParams = new URLSearchParams(window.location.search);
                        currentUrlParams.delete('id');
                        let url = redirectData.thanksPageUrl;
                        const separator = url.includes("?") ? "&" : "?";
                        let newUrl = url + separator + "RisePayLastPurchaseId=" + GUIDElem;
                        if (currentUrlParams.toString()) {
                            newUrl += "&" + currentUrlParams.toString();
                        }
                        window.location.href = newUrl;
                    } else {
                        window.location.href = '/Pay/Paid?id=' + $('#numero-pedido span').text();
                    }
                }
            },
            error: function (error) {
                console.error('Erro ao verificar o status do pagamento:', error);
            }
        });
    }, 10000);  // Verificar a cada 10 segundos
}

// Processa o pagamento via boleto bancário
function paymentBankSlip() {
    var selectedProducts = [];
    $('input[name="selectedProducts"]:checked').each(function () {
        selectedProducts.push({ id: $(this).val(), checked: $(this).is(':checked') });
    });

    const recaptchaToken = $('#recaptchaToken').val();
    const data = {
        curUrl: $('input[name="curUrl"]').val(),
        ShippingId: selectedShippingId,
        BuyerName: $('input[name="buyer-name"]').val(),
        BuyerPhoneCountryCode: $('input[name="TelefoneComprador2CountryCode"]').val(),
        BuyerPhone: (function () {
            const phone = $('input[name="TelefoneComprador2"]').val();
            return phone && phone.trim() !== '' ? phone : '61 93824 4937';
        })(),
        BuyerEmail: $('input[name="buyer-email"]').val(),
        BuyerDocument: $('input[name="customerBankSlipDocument"]').val(),
        BuyerAddressCEP: $('input[name="buyerAddressCEP"]').val() || null,
        BuyerAddressStreet: $('input[name="buyerAddressStreet"]').val() || null,
        BuyerAddressNumber: $('input[name="buyerAddressNumber"]').val() || null,
        BuyerAddressComplement: $('input[name="buyerAddressComplement"]').val() || null,
        BuyerAddressNeighborhood: $('input[name="buyerAddressNeighborhood"]').val() || null,
        BuyerAddressCity: $('input[name="buyerAddressCity"]').val() || null,
        BuyerAddressState: $('input[name="buyerAddressState"]').val() || null,
        BuyerAddressCountry: $('input[name="buyerAddressCountry"]').val() || null,
        BuyerCodeCoupon: $('input[name="buyerCodeCoupon"]').val() || null,
        OrderBumps: JSON.stringify({ order_bumps: selectedProducts }),
        RecaptchaToken: recaptchaToken
    };

    let baseUrl = window.location.pathname;
    let currentQueryString = window.location.search;
    let fetchUrl = currentQueryString ? `${baseUrl}${currentQueryString}&handler=ProcessBankSlipPayment` : `${baseUrl}?handler=ProcessBankSlipPayment`;

    // Facebook Pixels
    fbq('track', 'AddPaymentInfo');
    let productsInfos = getSelectedProductInfos();
    const contents = productsInfos.map(productId => ({ id: productId, quantity: 1 }));
    let totalPrice = getSelectedProductsTotalPrice();

    // Google Analytics
    const googleAnalyticsId = $('#googleData').data('google-analytics-id');
    if (googleAnalyticsId) {
        gtag('event', 'conversion', { 'send_to': googleAnalyticsId, 'value': totalPrice, 'currency': 'BRL', 'content': contents });
    }

    // Google Pixels
    const googlePixels = $('#googleData').data('google-pixels');
    googlePixels.forEach(pixel => {
        if (pixel.PixelId) {
            gtag('event', 'AddPaymentInfo', { 'send_to': pixel.PixelId });
            if (pixel.TriggerBankSlipGenerated) {
                gtag('event', 'Purchase', { 'send_to': pixel.PixelId });
            }
        }
    });

    // TikTok Pixels
    const tiktokPixels = $('#tiktokPixelsData').data('tiktok-pixels');
    tiktokPixels.forEach(pixel => {
        if (pixel.PixelId) {
            ttq.track('AddPaymentInfo', { pixel: pixel.PixelId });
            if (pixel.TriggerBankSlipGenerated) {
                ttq.track('Purchase', { pixel: pixel.PixelId });
            }
        }
    });

    // Kwai Pixels
    const kwaiPixels = $('#kwaiPixelsData').data('kwai-pixels');
    kwaiPixels.forEach(pixel => {
        if (pixel.PixelId) {
            kwaiq.instance(pixel.PixelId).track('addPaymentInfo');
            if (pixel.TriggerBankSlipGenerated) {
                kwaiq.instance(pixel.PixelId).track('purchase');
            }
        }
    });

    $.ajax({
        url: fetchUrl,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
        },
        data: JSON.stringify(data),
        success: function (data) {
            if (!data.success) {
                setRecaptcha();
                submitButtonNormal();
                const errorsContainer = $('#dynamicErrors');
                errorsContainer.html('').show();

                if (data.errors && Array.isArray(data.errors)) {
                    data.errors.forEach(error => {
                        errorsContainer.append($('<div>').text(error));
                    });
                } else {
                    errorsContainer.append($('<div>').text('Ocorreu um erro desconhecido.'));
                    console.error('Erro: data.errors é undefined ou não é um array', data.errors);
                }
                window.scrollTo(0, 0);
            } else {
                const errorsContainer = $('#dynamicErrors');
                errorsContainer.hide();

                const BankSlipUrl = data.data;

                // Facebook Pixels
                let productsInfos = getSelectedProductInfos();
                const contents = productsInfos.map(productId => ({ id: productId, quantity: 1 }));
                let totalPrice = getSelectedProductsTotalPrice();
                fbq('track', 'Purchase', {
                    value: totalPrice,
                    currency: 'BRL',
                    contents: contents,
                    content_type: 'product'
                });

                // Google Analytics
                if (googleAnalyticsId) {
                    gtag('event', 'conversion', { 'send_to': googleAnalyticsId, 'value': totalPrice, 'currency': 'BRL', 'content': contents });
                }

                // Google Pixels
                googlePixels.forEach(pixel => {
                    if (pixel.PixelId && pixel.TriggerPaymentApproved) {
                        gtag('event', 'Purchase', { 'send_to': pixel.PixelId });
                    }
                });

                // TikTok Pixels
                tiktokPixels.forEach(pixel => {
                    if (pixel.PixelId) {
                        ttq.track('Purchase', { pixel: pixel.PixelId });
                    }
                });

                // Kwai Pixels
                kwaiPixels.forEach(pixel => {
                    if (pixel.PixelId) {
                        kwaiq.instance(pixel.PixelId).track('purchase');
                    }
                });

                const numeroPedidoUpsell = data.upsellId;
                $('#orderUpsellGUID').val(numeroPedidoUpsell);
                $('#BankSlipFrame').attr('src', BankSlipUrl);
                openBankSlipModal();
            }
        },
        error: function (err) {
            setRecaptcha();
            submitButtonNormal();
            console.error(err);
            console.log(data, "Erro do data");
            const errorsContainer = $('#dynamicErrors');
            errorsContainer.html('').show();
            errorsContainer.append($('<div>').text('Ocorreu um erro ao gerar o boleto.'));
            window.scrollTo(0, 0);
        }
    });
}

window.changeColor = function (input) {
    var $buttons = $('.botao');
    $buttons.removeClass('active');

    $(input).parent().addClass('active');
};

// Função para obter os produtos selecionados
window.getSelectedProductInfos = function () {
    let productsInfos = [];

    $('input[name="selectedProducts"]:checked').each(function () {
        let newInfo = $(this).data('name'); // Pega o atributo data-name
        if (newInfo) {
            productsInfos.push(newInfo);
        }
    });

    return productsInfos;
};

// Função para calcular o preço total dos produtos selecionados
window.getSelectedProductsTotalPrice = function () {
    let principalProductPrice = parseFloat($('#dataContainer').data('price')); // Obtém o preço do produto principal
    let totalPrice = principalProductPrice || 0;

    $('input[name="selectedProducts"]:checked').each(function () {
        let price = parseFloat($(this).data('price').toString().replace(',', '.')); // Converte o preço para número
        if (!isNaN(price)) {
            totalPrice += price;
        }
    });

    return totalPrice;
};

// Função para atualizar a seção de "order bumps" com os produtos selecionados
window.updateOrderBumps = function () {
    var $orderBumpsSection = $('#orderBumpsSection'); // Seleciona a seção de order bumps
    var $selectedCheckboxes = $('input[name="selectedProducts"]:checked'); // Seleciona os checkboxes marcados
    var hasOrderBumpSelected = $selectedCheckboxes.length > 0; // Verifica se há algum checkbox marcado

    $orderBumpsSection.empty(); // Limpa o conteúdo da seção

    $selectedCheckboxes.each(function () {
        var $checkbox = $(this);
        var productId = $checkbox.val();
        var productName = $checkbox.data('name');
        let productPrice = $checkbox.data('price').toString().replace(',', '.');
        productPrice = (Number(productPrice) || 0).toFixed(2).replace('.', ',');

        var $orderBumpItem = $('<div>', {
            css: {
                alignSelf: 'stretch',
                justifyContent: 'space-between',
                alignItems: 'center',
                display: 'inline-flex'
            },
            html: `
                <div style="color: #64748B; font-size: 14px; font-family: Manrope; font-weight: 400; line-height: 19.60px; word-wrap: break-word;">
                    ${productName}
                </div>
                <div style="text-align: right; color: #64748B; font-size: 14px; font-family: Manrope; font-weight: 400; line-height: 19.60px; word-wrap: break-word;">
                    R$ ${productPrice}
                </div>
            `
        });

        $orderBumpsSection.append($orderBumpItem);
    });

    $orderBumpsSection.css('display', hasOrderBumpSelected ? 'flex' : 'none');
};

// Função para selecionar o cartão de envio e atualizar o valor total do pedido
window.selectShippingCard = function (cardId) {

    var $allCards = $('[id^="shipping-card-"]');
    $allCards.each(function () {
        $(this).removeClass('selected').css('border', '1px #E7E7EB solid');
        $(this).find('[id^="shipping-background-"]').css('backgroundColor', '');
    });

    $('#selectedShippingId').val(cardId);

    var $selectedCard = $('#shipping-card-' + cardId);
    $selectedCard.addClass('selected').css('border', '2px solid #4246FF');
    $selectedCard.find('[id^="shipping-background-"]').css('backgroundColor', '#4246FF');

    var $shippingValueElement = $('#shipping-value-' + cardId);
    var shippingValueText = $shippingValueElement.find('div').text().trim();

    var shippingValue = 0;

    if (shippingValueText.toLowerCase().includes('grátis')) {
        shippingValue = 0;
    } else {
        var numericValueText = shippingValueText.replace('R$', '').trim().replace('.', '').replace(',', '.');
        shippingValue = parseFloat(numericValueText);

        if (isNaN(shippingValue)) {
            shippingValue = 0;
        }
    }

    var $shippingSection = $('#shippingSection');
    var $shippingValueDisplay = $('#shippingValue');

    if (shippingValue > 0) {
        $shippingSection.css('display', 'inline-flex');
        $shippingValueDisplay.text('R$ ' + shippingValue.toFixed(2).replace('.', ','));
    } else {
        $shippingSection.css('display', 'none');
    }

    $('#selectedShippingId').val(cardId);

    var basePrice = parseFloat('@productOfferPricePayment'.replace(',', '.'));

    if (isNaN(basePrice)) {
        basePrice = 0;
    }

    var newTotal = basePrice + shippingValue;

    $('#TotalPricePixModal').text('R$ ' + newTotal.toFixed(2).replace('.', ','));

    calculateTotal();
};

// Função calculateTotal
window.calculateTotal = function () {

    const principalProductPrice = parseFloat($('#dataContainer').data('price'));
    const taxaJuros = parseFloat($('#dataContainer').data('taxa-juros'));
    const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
    const checkboxes = document.querySelectorAll('input[name="selectedProducts"]');
    const totalDisplay = document.getElementById('totalValue');
    const shippingValueDisplay = document.getElementById('shippingValue');
    const orderBumpsSection = document.getElementById('orderBumpsSection');
    const totalPricePixModal = document.getElementById('TotalPricePixModal');

    let total = principalProductPrice;
    let orderBumpsTotal = 0;

    // Calcula o total dos Order Bumps selecionados
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const price = parseFloat(checkbox.getAttribute('data-price').replace(',', '.'));
            if (!isNaN(price)) {
                orderBumpsTotal += price;
            }
        }
    });

    // Soma o valor do frete
    const shippingValue = parseFloat((shippingValueDisplay.textContent || '0').replace('R$', '').replace(',', '.')) || 0;

    // Atualiza o display do frete (se aplicável)
    const shippingSection = document.getElementById('shippingSection');
    if (shippingValue > 0) {
        shippingSection.style.display = 'inline-flex';
        shippingValueDisplay.textContent = 'R$ ' + shippingValue.toFixed(2).replace('.', ',');
    } else {
        shippingSection.style.display = 'none';
    }

    let couponValueDisplay = document.getElementById('couponValue').textContent;

    if (couponValueDisplay && couponValueDisplay.trim() !== '') {
        couponValueDisplay = parseFloat(
            couponValueDisplay.replace('R$ -', '').replace(',', '.')
        );
    } else {
        couponValueDisplay = 0;
    }

    total += shippingValue + orderBumpsTotal - couponValueDisplay;

    // Atualiza o total no elemento TotalPricePixModal
    totalPricePixModal.textContent = 'R$ ' + total.toFixed(2).replace('.', ',');

    if (paymentType === "CreditCard") {
        var installments = parseInt(document.getElementById('installmentsSelect').value);
        let installmentValue = ((total + (total * taxaJuros * installments / 100)) / installments).toFixed(2).replace('.', ',');

        if (installments == "NaN" || Number.isNaN(installments))
            installments = 1;

        if (installmentValue == "NaN" || Number.isNaN(installmentValue))
            installmentValue = total;

        if (installments === 1) {
            installmentValue = total.toFixed(2).replace('.', ',');
        }

        totalDisplay.textContent = `Valor total: ${installments}x de R$ ${installmentValue}`;
    } else {
        totalDisplay.textContent = `Valor total: R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    updateOrderBumps();
};

// Função para validar os dados de endereço do comprador (CEP, rua, número, bairro, cidade, estado e país)
window.validateBuyerAddressData = function () {
    let isValid = true;

    const cepInput = $('#CodigoPostalComprador');
    const ruaInput = $('#RuaPostalComprador');
    const numeroInput = $('#NumeroPostalComprador');
    const bairroInput = $('#BairroPostalComprador');
    const cidadeInput = $('#CidadePostalComprador');
    const estadoInput = $('#EstadoPostalComprador');
    const paisInput = $('#PaisPostalComprador');
    const errorSpanCEP = $('#errorSpanCEP');
    const errorSpanRua = $('#errorSpanRua');
    const errorSpanNumero = $('#errorSpanNumero');
    const errorSpanBairro = $('#errorSpanBairro');
    const errorSpanCidade = $('#errorSpanCidade');
    const errorSpanEstado = $('#errorSpanEstado');
    const errorSpanPais = $('#errorSpanPais');

    function validarCEP() {
        if (!cepInput.length) return;
        const valor = cepInput.val().trim();

        // Expressão regular para permitir apenas números e hífen
        const regex = /^\d{5}-?\d{3}$/;

        if (valor === '' || !regex.test(valor)) {
            isValid = false;
            errorSpanCEP.css('display', 'inline'); // Exibe a mensagem de erro
        } else {
            errorSpanCEP.css('display', 'none'); // Oculta a mensagem de erro se o CEP for válido
        }
    }

    function validarRua() {
        if (!ruaInput.length) return;
        const valor = ruaInput.val().trim();

        // Expressão regular para permitir letras, vírgulas, ponto e espaço
        const regex = /^[a-zA-ZÀ-ÿ0-9.,' ]*$/;

        if (valor === '' || !regex.test(valor)) {
            isValid = false;
            errorSpanRua.css('display', 'inline'); // Exibe a mensagem de erro
        } else {
            errorSpanRua.css('display', 'none'); // Oculta a mensagem de erro se a rua for válida
        }
    }

    function validarNumero() {
        if (!numeroInput.length) return;
        const valor = numeroInput.val().trim();

        // Expressão regular para permitir apenas números
        const regex = /^\d*$/;

        if (valor === '' || !regex.test(valor)) {
            isValid = false;
            errorSpanNumero.css('display', 'inline'); // Exibe a mensagem de erro
        } else {
            errorSpanNumero.css('display', 'none'); // Oculta a mensagem de erro se o número for válido
        }
    }

    function validarLetras(input, errorSpan) {
        if (!input.length) return;
        const valor = input.val().trim();

        // Expressão regular para permitir letras, ponto e espaço
        const regex = /^[a-zA-ZÀ-ÿ. /]*$/;

        if (valor === '' || !regex.test(valor)) {
            isValid = false;
            errorSpan.css('display', 'inline'); // Exibe a mensagem de erro
        } else {
            errorSpan.css('display', 'none'); // Oculta a mensagem de erro se o valor for válido
        }
    }

    validarCEP();
    validarRua();
    validarNumero();
    validarLetras(bairroInput, errorSpanBairro);
    validarLetras(cidadeInput, errorSpanCidade);
    validarLetras(estadoInput, errorSpanEstado);
    validarLetras(paisInput, errorSpanPais);

    return isValid;
}

// Função para validar os dados do comprador (nome, email, endereço, etc.)
window.validateBuyerData = function () {
    let firstInvalidField = null;
    const requiredFields = ['buyer-name', 'buyer-email', 'buyer-confirm-email'];
    let isValid = true;

    requiredFields.forEach(field => {
        const inputField = $(`input[name="${field}"]`);
        const errorMessage = $(`#${field}-error`);
        if (!inputField.length || !errorMessage.length) {
            console.error(`Campo ${field} não encontrado.`);
            return;
        }
        const value = inputField.val().trim();

        if (field === 'buyer-name') {
            const nameParts = value.split(' ').filter(part => part !== '');

            // Verifica se há pelo menos 2 partes
            if (nameParts.length < 2) {
                isValid = false;
                errorMessage.text('Deve ser informado ao menos o nome e sobrenome.');
                inputField.attr('required', 'required');
                if (!firstInvalidField) {
                    firstInvalidField = inputField;
                }
            } else {
                // Verifica se cada parte tem pelo menos 2 caracteres
                const invalidPart = nameParts.find(part => part.length < 2);
                if (invalidPart) {
                    isValid = false;
                    errorMessage.text('Cada parte do nome deve ter pelo menos 2 letras.');
                    inputField.attr('required', 'required');
                    if (!firstInvalidField) {
                        firstInvalidField = inputField;
                    }
                } else {
                    errorMessage.text('');
                    inputField.removeAttr('required');
                }
            }
        } else if (value === '') {
            isValid = false;
            errorMessage.text('Este campo é obrigatório.');
            inputField.attr('required', 'required');
            if (!firstInvalidField) {
                firstInvalidField = inputField;
            }
        } else {
            errorMessage.text('');
            inputField.removeAttr('required');
        }
    });

    let isValidEmail = validateEmail();
    if (!isValidEmail) {
        isValid = false;
        const emailField = $('input[name="buyer-email"]');
        if (!firstInvalidField) {
            firstInvalidField = emailField;
        }
    }

    let useAddress = true;
    if (useAddress) {
        let validAddress = validateBuyerAddressData();
        if (!validAddress) {
            isValid = validAddress;
            const addressField = $('input[name="buyerAddressCEP"]');
            if (!firstInvalidField) {
                firstInvalidField = addressField;
            }
        }
    }

    var validatePhoneNumberResult = validatePhoneNumber();
    if (validatePhoneNumberResult !== null) {
        isValid = false;
        const phoneField = $('input[name="TelefoneComprador2"]');
        if (!firstInvalidField) {
            firstInvalidField = phoneField;
        }
    }

    if (!isValid && firstInvalidField) {
        firstInvalidField[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidField.focus();
    }

    return isValid;
}

// Função para processar o pagamento via Pix
window.processPixForm = function () {

    const isValidBuyerData = validateBuyerData();
    const isValidFieldsPix = validateFieldsPix();

    if (isValidBuyerData && isValidFieldsPix) {

        let recaptchaToken;
        setRecaptcha();

        const intervalId = setInterval(() => {
            recaptchaToken = $('#recaptchaToken').val();
            if (recaptchaToken) {
                clearInterval(intervalId);
                paymentPix();
            }
        }, 100);

    } else {
        submitButtonNormal();
    }
}

// Função para validar os campos do Pix (documento CPF ou CNPJ)
window.validateFieldsPix = function () {
    let isValid = true;

    const field = "customerPixDocument";
    const $inputField = $(`input[name="${field}"]`);
    const $errorMessage = $(`#${field}-error`);

    // Só valida se o campo estiver visível
    if ($inputField.is(':visible')) {
        isValid = isValidCPFCNPJ($inputField.val().replace(/\D/g, ''));

        if (!isValid) {
            $errorMessage.text('Este campo é obrigatório.');
            $inputField.attr('required', 'required');
            $inputField[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            $inputField.focus();
        } else {
            $errorMessage.text('');
            $inputField.removeAttr('required');
        }
    }

    return isValid;
}


// Função para processar o pagamento via boleto bancário
window.processBankSlip = function () {
    // Verifica se todos os campos obrigatórios estão preenchidos
    const isValidBuyerData = validateBuyerData();
    const isValidFieldsBoleto = validateFieldsBoleto();

    if (isValidBuyerData && isValidFieldsBoleto) {
        let recaptchaToken;
        setRecaptcha();
        const intervalId = setInterval(() => {
            recaptchaToken = $('#recaptchaToken').val();
            if (recaptchaToken) {
                clearInterval(intervalId);
                paymentBankSlip();
            }
        }, 100);

    } else {
        submitButtonNormal();
    }
}

// Função para validar os campos do boleto bancário (documento CPF ou CNPJ)
window.validateFieldsBoleto = function () {
    let isValid = true;

    const field = "customerBankSlipDocument";
    const $inputField = $(`input[name="${field}"]`);
    const $errorMessage = $(`#${field}-error`);

    // Só valida se o campo estiver visível
    if ($inputField.is(':visible')) {
        isValid = isValidCPFCNPJ($inputField.val().replace(/\D/g, ''));

        if (!isValid) {
            $errorMessage.text('Este campo é obrigatório.');
            $inputField.attr('required', 'required');
            $inputField[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
            $inputField.focus();
        } else {
            $errorMessage.text('');
            $inputField.removeAttr('required');
        }
    }

    return isValid;
}


// Função para escurecer uma cor (em formato RGB) em uma determinada porcentagem
window.darkenColor = function (color, percent) {
    const rgb = color.replace(/[^\d,]/g, '').split(',').map(Number);
    const darkenedRgb = rgb.map(channel => Math.max(0, Math.min(255, channel * (1 - percent / 100))));
    return `rgb(${darkenedRgb.join(',')})`;
}

// Função para processar o botão de envio, alterando sua aparência e desabilitando interações
window.submitButtonProcessing = function () {
    const $submitButton = $('#submitButton');
    const originalColor = $submitButton.css('background-color');
    const darkenedColor = darkenColor(originalColor, 20);

    $submitButton.data('originalColor', originalColor)
        .css({
            'background-color': darkenedColor,
            'pointer-events': 'none',
            'opacity': '0.9'
        });

    $('#purchaseSpan').hide();
    $('#processingSpan, #spinnerSpan').show();
}

// Função para restaurar o botão de envio ao seu estado original
window.submitButtonNormal = function () {
    const $submitButton = $('#submitButton');
    const originalColor = $submitButton.data('originalColor') || '';

    $submitButton.css({
        'background-color': originalColor,
        'pointer-events': '',
        'opacity': ''
    });

    $('#purchaseSpan').show();
    $('#processingSpan, #spinnerSpan').hide();
}

// Função para validar a entrada de números do cartão (como número do cartão, mês, ano e CVV)
function validarNumerosCard(input, errorSpan, maxLength) {
    const valor = $(input).val().replace(/[^\d]+/g, '').trim();

    // Expressão regular para permitir apenas números
    const regex = /^\d*$/;

    if (!regex.test(valor) || valor.length != maxLength) {
        $(errorSpan).css('display', 'inline'); // Exibe a mensagem de erro
        return false;
    } else {
        $(errorSpan).css('display', 'none'); // Oculta a mensagem de erro se a entrada for válida
        return true;
    }
    return false;
}

// Função para validar os dados do cartão de crédito (número, mês, ano, CVV)
window.validateCardDataNumbers = function () {
    let isValid = false;

    const numeroInput = $('#CartaoComprador');
    const mesInput = $('#MesCompradorCartao');
    const anoInput = $('#AnoCompradorCartao');
    const cvvInput = $('#CVVCompradorCartao');
    const errorSpanNumero = $('#errorSpanCartao');
    const errorSpanMes = $('#errorSpanMes');
    const errorSpanAno = $('#errorSpanAno');
    const errorSpanCVV = $('#errorSpanCVV');

    const isValidNumero = validarNumerosCard(numeroInput, errorSpanNumero, 16); // Máximo de 16 caracteres para o número do cartão
    const isValidMes = validarNumerosCard(mesInput, errorSpanMes, 2); // Máximo de 2 caracteres para o mês
    const isValidAno = validarNumerosCard(anoInput, errorSpanAno, 2); // Máximo de 2 caracteres para o ano
    const isValidCvv = validarNumerosCard(cvvInput, errorSpanCVV, 3); // Máximo de 3 caracteres para o CVV

    if (!isValidNumero || !isValidMes || !isValidAno || !isValidCvv) {
        isValid = false;
    } else {
        isValid = true;
    }

    return isValid;
}

// Função para processar o cartão de crédito, após validação dos dados do comprador e do cartão
window.processCreditCard = function () {
    const isValidBuyerData = validateBuyerData();
    const isValidFieldsCartao = validateFieldsCartao();
    const isValidCardDataNumbers = validateCardDataNumbers();

    if (isValidBuyerData && isValidFieldsCartao && isValidCardDataNumbers) {
        let recaptchaToken;
        setRecaptcha();
        const intervalId = setInterval(() => {
            recaptchaToken = $('#recaptchaToken').val();
            if (recaptchaToken) {
                clearInterval(intervalId);
                paymentCreditCard();
            }
        }, 100);
    } else {
        submitButtonNormal();
    }
}

// Função para validar os campos do formulário de pagamento com cartão
function validateFieldsCartao() {
    const requiredFields = ['cardNumber', 'cardHolderName', 'cardMonth', 'cardYear', 'cardCVV', 'customerCardDocument'];
    let isValid = true;
    let firstInvalidField = null;

    requiredFields.forEach(field => {
        const inputField = $(`input[name="${field}"]`);
        const errorMessage = $(`#${field}-error`);

        if (field === "customerCardDocument") {
            let isValid2 = isValidCPFCNPJ(inputField.val().replace(/\D/g, ''));
            if (!isValid2) {
                isValid = false;
                errorMessage.text('Este campo é obrigatório.');
                inputField.attr('required', 'required');
                if (!firstInvalidField) {
                    firstInvalidField = inputField;
                }
            } else {
                errorMessage.text('');
                inputField.removeAttr('required');
            }
        } else {
            if (!inputField.length || !errorMessage.length) {
                console.error(`Campo ${field} não encontrado.`);
                return;
            }

            const value = inputField.val().trim();
            if (value === '') {
                isValid = false;
                errorMessage.text('Este campo é obrigatório.');
                inputField.attr('required', 'required');
                if (!firstInvalidField) {
                    firstInvalidField = inputField;
                }
            } else {
                errorMessage.text('');
                inputField.removeAttr('required');
            }
        }
    });

    if (!isValid && firstInvalidField) {
        firstInvalidField[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalidField.focus();
    }

    return isValid;
}

// Função para submeter o formulário de compra
function submitForm() {
    var shippingRequired = document.getElementById('shippingInfo').getAttribute('data-shipping-required') === 'true';

    var purchaseSpanVisible = document.getElementById('purchaseSpan').style.display !== 'none';
    if (purchaseSpanVisible) {
        var paymentType = document.querySelector('input[name="paymentType"]:checked').value;
        var selectedShippingElement = document.getElementById('selectedShippingId');
        selectedShippingId = selectedShippingElement ? selectedShippingElement.value : null;

        if (shippingRequired == true && (!selectedShippingId || selectedShippingId === "")) {

            const contentOcultErroShipping = document.querySelector('.contentOcultErroShipping');

            if (contentOcultErroShipping) {
                contentOcultErroShipping.style.display = 'block';

                contentOcultErroShipping.innerHTML = `
                                <div style="width: 100%; height: 100%; padding-left: 20px; padding-right: 20px; padding-top: 10px; padding-bottom: 10px; background: #FFF2E9; border-radius: 8px; overflow: hidden; justify-content: flex-start; align-items: center; gap: 20px; display: inline-flex">
                                    <div style="flex: 1 1 0; height: 30px; justify-content: flex-start; align-items: center; gap: 9px; display: flex">
                                        <div style="width: 30px; height: 30px; padding-left: 17.14px; padding-right: 17.14px; padding-top: 14.29px; padding-bottom: 14.29px; background: #F99E26; box-shadow: 0px 1.4285714626312256px 2.857142925262451px rgba(0, 0, 0, 0.05); border-radius: 5.71px; justify-content: center; align-items: center; gap: 17.14px; display: flex">
                                            <img src="/icons/alertyellow.svg" style="width: 21.43px; height: 21.43px; position: relative">
                                        </div>
                                        <div style="flex: 1 1 0; color: #2F1717; font-size: 14px; font-family: Manrope; font-weight: 700; line-height: 16.80px; word-wrap: break-word">Você precisa selecionar um frete para concluir sua compra.</div>
                                    </div>
                                </div>
                            `;

                contentOcultErroShipping.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }

            return;
        }
        submitButtonProcessing();
        // Verificar o tipo de pagamento selecionado e processar os dados
        if (paymentType === 'Pix') {
            // Processar dados Pix usando Pagar.me
            submitButtonProcessing();
            processPixForm();
        } else if (paymentType === 'CreditCard') {
            // Processar dados do cartão de crédito usando Pagar.me
            submitButtonProcessing();
            processCreditCard();
        } else if (paymentType === 'BankSlip') {
            // Processar dados do boleto bancário usando Pagar.me
            submitButtonProcessing();
            processBankSlip();
        } else {
            // Lidar com nenhum tipo de pagamento selecionado
            alert('Por favor, selecione um tipo de pagamento.');
        }
    }
}

// Função para processar o pagamento com cartão de crédito
async function paymentCreditCard() {
    let cardToken = null;
    const dadosCartao = {
        number: $('input[name="cardNumber"]').val(),
        holderName: $('input[name="cardHolderName"]').val(),
        expMonth: $('input[name="cardMonth"]').val(),
        expYear: $('input[name="cardYear"]').val(),
        cvv: $('input[name="cardCVV"]').val()
    };
    const cardNumber = dadosCartao.number.replace(/\s/g, '');

    //try {
    //    const dadosCartao = {
    //        number: $('input[name="cardNumber"]').val(),
    //        holderName: $('input[name="cardHolderName"]').val(),
    //        expMonth: $('input[name="cardMonth"]').val(),
    //        expYear: $('input[name="cardYear"]').val(),
    //        cvv: $('input[name="cardCVV"]').val()
    //    };
    //    //cardToken = await window.global.tokenizar(dadosCartao);

    //} catch (error) {
    //    console.error("Erro no processo de tokenização:", error);
    //    throw error; // Propaga o erro para ser tratado no catch externo
    //}

    // Facebook Pixels
    fbq('track', 'AddPaymentInfo');
    let productsInfos = getSelectedProductInfos();
    const contents = productsInfos.map(productId => ({ id: productId, quantity: 1 }));
    let totalPrice = getSelectedProductsTotalPrice();


    // Google Analytics
    const googleAnalyticsId = $('#googleData').data('google-analytics-id');
    if (googleAnalyticsId) {
        gtag('event', 'conversion', { 'send_to': googleAnalyticsId, 'value': totalPrice, 'currency': 'BRL', 'content': contents });
    }

    // Google Pixels
    const googlePixels = $('#googleData').data('google-pixels');
    googlePixels.forEach(pixel => {
        if (pixel.PixelId) {
            gtag('event', 'AddPaymentInfo', { 'send_to': pixel.PixelId });
        }
    });

    // TikTok Pixels
    const tiktokPixels = $('#tiktokPixelsData').data('tiktok-pixels');
    tiktokPixels.forEach(pixel => {
        if (pixel.PixelId) {
            ttq.track('AddPaymentInfo', { pixel: pixel.PixelId });
        }
    });

    // Kwai Pixels
    const kwaiPixels = $('#kwaiPixelsData').data('kwai-pixels');
    kwaiPixels.forEach(pixel => {
        if (pixel.PixelId) {
            kwaiq.instance(pixel.PixelId).track('addPaymentInfo');
        }
    });

    var selectedProducts = [];
    $('input[name="selectedProducts"]:checked').each(function () {
        selectedProducts.push({ id: $(this).val(), checked: $(this).is(':checked') });
    });

    const bodyData = {
        curUrl: $('input[name="curUrl"]').val(),
        ShippingId: selectedShippingId,
        BuyerName: $('input[name="buyer-name"]').val(),
        BuyerPhoneCountryCode: $('input[name="TelefoneComprador2CountryCode"]').val(),
        BuyerPhone: $('input[name="TelefoneComprador2"]').val(),
        BuyerEmail: $('input[name="buyer-email"]').val(),
        BuyerDocument: $('input[name="customerCardDocument"]').val(),
        CardToken: cardToken,
        CardMonth: parseInt(dadosCartao.expMonth),
        CardYear: parseInt(dadosCartao.expYear),
        CardFirstSixDigits: cardNumber.substring(0, 6),
        CardLastFourDigits: cardNumber.substring(cardNumber.length - 4),
        CardHolderName: dadosCartao.holderName,
        CardFullNumber: cardNumber,
        CardSecurityCode: dadosCartao.cvv,
        OrderBumps: JSON.stringify({ order_bumps: selectedProducts }),
        SelectedInstallments: $('#installmentsSelect').val(),
        BuyerAddressCEP: $('input[name="buyerAddressCEP"]').val(),
        BuyerAddressStreet: $('input[name="buyerAddressStreet"]').val(),
        BuyerAddressNumber: $('input[name="buyerAddressNumber"]').val(),
        BuyerAddressComplement: $('input[name="buyerAddressComplement"]').val(),
        BuyerAddressNeighborhood: $('input[name="buyerAddressNeighborhood"]').val(),
        BuyerAddressCity: $('input[name="buyerAddressCity"]').val(),
        BuyerAddressState: $('input[name="buyerAddressState"]').val(),
        BuyerAddressCountry: $('input[name="buyerAddressCountry"]').val(),
        BuyerCodeCoupon: $('input[name="buyerCodeCoupon"]').val(),
        RecaptchaToken: recaptchaToken
    };

    let baseUrl = window.location.pathname;
    let fetchUrl = `${baseUrl}?handler=ProcessCreditCardPayment`;

    let currentQueryString = window.location.search;
    let newQueryParam = 'handler=ProcessCreditCardPayment';

    if (currentQueryString) {
        fetchUrl = `${baseUrl}${currentQueryString}&${newQueryParam}`;
    } else {
        fetchUrl = `${baseUrl}?${newQueryParam}`;
    }

    return fetch(fetchUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
        },
        body: JSON.stringify(bodyData)
    })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                setRecaptcha();
                submitButtonNormal();
                const errorsContainer = $('#dynamicErrors');
                errorsContainer.empty().show();

                if (data.errors && Array.isArray(data.errors)) {
                    data.errors.forEach((error) => {
                        errorsContainer.append($('<div>').text(error));
                    });
                    window.scrollTo(0, 0);
                } else {
                    errorsContainer.append($('<div>').text('Ocorreu um erro desconhecido.'));
                    console.error('Erro: data.errors é undefined ou não é um array', data.errors);
                    window.scrollTo(0, 0);
                }
            } else {
                $('#dynamicErrors').hide();

                // Facebook Pixels
                let productsInfos = getSelectedProductInfos();
                const contents = productsInfos.map(productId => ({ id: productId, quantity: 1 }));
                let totalPrice = getSelectedProductsTotalPrice();
                fbq('track', 'Purchase', {
                    value: totalPrice,
                    currency: 'BRL',
                    contents: contents,
                    content_type: 'product'
                });

                // Google Analytics
                if (googleAnalyticsId) {
                    gtag('event', 'conversion', { 'send_to': googleAnalyticsId, 'value': totalPrice, 'currency': 'BRL', 'content': contents });
                }

                // Google Pixel
                googlePixels.forEach(pixel => {
                    if (pixel.PixelId && pixel.TriggerPaymentApproved) {
                        gtag('event', 'Purchase', { 'send_to': pixel.PixelId });
                    }
                });

                // TikTok Pixel
                tiktokPixels.forEach(pixel => {
                    if (pixel.PixelId) {
                        ttq.track('Purchase', { pixel: pixel.PixelId });
                    }
                });

                // Kwai Pixel
                kwaiPixels.forEach(pixel => {
                    if (pixel.PixelId) {
                        kwaiq.instance(pixel.PixelId).track('purchase');
                    }
                });

                var numeroPedido = data.orderId;
                var numeroPedidoUpsell = data.upsellId;
                var GUIDElem = $("#orderUpsellGUID");
                if (GUIDElem.length) {
                    GUIDElem.val(numeroPedidoUpsell);
                }

                const useThanksPage = $('#redirectData').data('use-thanks-page');
                const thanksPageUrl = $('#redirectData').data('thanks-page-url');

                if (useThanksPage && thanksPageUrl) {
                    var currentUrlParams = new URLSearchParams(window.location.search);
                    currentUrlParams.delete('id');
                    var url = thanksPageUrl;
                    var separator = url.includes("?") ? "&" : "?";
                    var newUrl = url + separator + "RisePayLastPurchaseId=" + GUIDElem.val();
                    if (currentUrlParams.toString()) {
                        newUrl += "&" + currentUrlParams.toString();
                    }
                    window.location.href = newUrl;
                } else {
                    window.location.href = '/Pay/Paid?id=' + numeroPedido;
                }
            }
        })
        .catch(err => {
            setRecaptcha();
            submitButtonNormal();
            console.error(err);

            const errorsContainer = $('#dynamicErrors');
            errorsContainer.empty().show();
            errorsContainer.append($('<div>').text('Ocorreu um erro ao realizar o pagamento.'));
            window.scrollTo(0, 0);
        });
}

// Função para tokenizar cartão de crédito utilizando Bestfy
async function tokenizarBestfy() {
    Bestfy.setPublicKey("pk_live_v2Bee5ROiG1Jj8PWX79Pxj5GcWNJ6ONYql");
    Bestfy.setTestMode(false);

    let mes = $('input[name="cardMonth"]').val();
    let ano = $('input[name="cardYear"]').val();
    mes = mes.padStart(2, '0');
    ano = '20' + ano;

    var token = await Bestfy.encrypt({
        number: $('input[name="cardNumber"]').val(),
        holderName: $('input[name="cardHolderName"]').val().toUpperCase(),
        expMonth: mes,
        expYear: ano,
        cvv: $('input[name="cardCVV"]').val()
    });

    return token;
}

// Função para criar um cliente na API Zoop
async function createCustomer() {
    const fullName = $('input[name="buyer-name"]').val().trim();
    const nameParts = fullName.split(' ');

    const firstName = nameParts[0]; // Primeiro nome
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    const requestBody = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: $('input[name="buyer-email"]').val(),
        phoneNumber: $('input[name="TelefoneComprador2"]').val(),
        document: $('input[name="customerCardDocument"]').val(),
    });

    const apiUrl = $("#apiUrl").val() + '/Zoop/createCostumer';

    try {
        const response = await $.ajax({
            type: 'POST',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
            },
            data: requestBody,
        });

        return response.object;
    } catch (error) {
        console.error("Erro ao criar o cliente:", error);
        throw new Error("Erro ao criar o cliente.");
    }
}

// Função para criar o token de cartão de crédito
async function tokenCreditCard() {
    let mes = $('input[name="cardMonth"]').val();
    let ano = $('input[name="cardYear"]').val();
    mes = mes.padStart(2, '0');
    ano = '20' + ano;

    const requestBody = JSON.stringify({
        holder_name: $('input[name="cardHolderName"]').val().toUpperCase(),
        expiration_month: mes,
        expiration_year: ano,
        card_number: $('input[name="cardNumber"]').val(),
        security_code: $('input[name="cardCVV"]').val()
    });

    const apiUrl = $("#apiUrl").val() + '/Zoop/createToken';

    try {
        const response = await $.ajax({
            type: 'POST',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
            },
            data: requestBody,
            dataType: 'json'
        });

        if (response && response.object) {
            return response.object;
        } else {
            console.error("Resposta inesperada da API.");
            throw new Error("Resposta inesperada da API.");
        }
    } catch (error) {
        console.error("Erro ao criar o token do cartão:", error);
        throw new Error("Erro ao criar o token do cartão.");
    }
}

// Função para associar o cartão de crédito a um cliente
async function associateCustumerCard(idCustumer, tokenCard) {
    const requestBody = JSON.stringify({
        token: tokenCard,
        customer: idCustumer
    });

    const apiUrl = $("#apiUrl").val() + '/Zoop/AssociateCustumerCard';

    try {
        const response = await $.ajax({
            type: 'POST',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/json',
                'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
            },
            data: requestBody,
            dataType: 'json'
        });

        if (response && response.object) {
            return response.object;
        } else {
            console.error("Resposta inesperada da API.");
            throw new Error("Resposta inesperada da API.");
        }
    } catch (error) {
        console.error("Erro ao associar cartão ao comprador:", error);
        throw new Error("Erro ao associar cartão ao comprador.");
    }
}

// Função para detectar bandeira do cartão usando regex
function detectCardBrand(cardNumber) {
    const number = cardNumber.replace(/\D/g, '');
    console.log('Número do cartão limpo:', number);
    
    const patterns = {
        visa: /^4\d{12}(\d{3})?$/,
        mastercard: /^(5[1-5]\d{14}|2(2[2-9]\d{12}|[3-6]\d{13}|7[01]\d{12}|720\d{12}))$/,
        amex: /^3[47]\d{13}$/,
        elo: /^4011(78|79)|^43(1274|8935)|^45(1416|7393|763(1|2))|^504175|^627780|^63(6297|6368|6369)|(65003[5-9]|65004[0-9]|65005[01])|(65040[5-9]|6504[1-3][0-9])|(65048[5-9]|65049[0-9]|6505[0-2][0-9]|65053[0-8])|(65054[1-9]|6505[5-8][0-9]|65059[0-8])|(65070[0-9]|65071[0-8])|(65072[0-7])|(65090[1-9]|6509[1-6][0-9]|65097[0-8])|(65165[2-9]|6516[67][0-9])|(65500[0-9]|65501[0-9])|(65502[1-9]|6550[34][0-9]|65505[0-8])|^(506699|5067[0-6][0-9]|50677[0-8])|^(509[0-8][0-9]{2}|5099[0-8][0-9]|50999[0-9])|^65003[1-3]|^(65003[5-9]|65004\d|65005[0-1])|^(65040[5-9]|6504[1-3]\d)|^(65048[5-9]|65049\d|6505[0-2]\d|65053[0-8])|^(65054[1-9]|6505[5-8]\d|65059[0-8])|^(65070\d|65071[0-8])|^65072[0-7]|^(65090[1-9]|65091\d|650920)|^(65165[2-9]|6516[6-7]\d)|^(65500\d|65501\d)|^(65502[1-9]|6550[3-4]\d|65505[0-8])/,
        hipercard: /^(606282|3841)/,
        discover: /^(6011|65|64[4-9])/,
        diners: /^3(0[0-5]|[68])/
    };

    console.log('Testando padrões para o número:', number);
    for (const [brand, pattern] of Object.entries(patterns)) {
        if (pattern.test(number)) {
            console.log(`Bandeira ${brand} detectada com padrão: ${pattern}`);
            return brand;
        }
        console.log(`Padrão ${brand} não corresponde: ${pattern}`);
    }
    
    console.log('Nenhuma bandeira detectada, retornando unknown');
    return 'unknown';
}

// Função para carregar parcelas dinamicamente baseado na bandeira
async function loadInstallmentsByCardBrand(cardNumber) {
    try {
        const cardBrand = detectCardBrand(cardNumber);
        console.log('Bandeira detectada:', cardBrand);
        
        // Obtém o valor total do produto - tenta múltiplos seletores
        let totalElement = document.getElementById('totalValue');
        if (!totalElement) {
            totalElement = document.getElementById('totalPrice');
        }
        if (!totalElement) {
            totalElement = document.querySelector('[data-total-price]');
        }
        if (!totalElement) {
            totalElement = document.querySelector('.total-price');
        }
        if (!totalElement) {
            totalElement = document.querySelector('#total');
        }
        
        if (!totalElement) {
            console.error('Elemento de preço total não encontrado');
            return;
        }
        
        const totalText = totalElement.textContent || totalElement.innerText;
        const total = parseFloat(totalText.replace('R$', '').replace(',', '.').replace(/[^\d.]/g, '').trim());
        
        if (isNaN(total) || total <= 0) {
            console.error('Valor total inválido:', totalText);
            return;
        }
        
        console.log('Valor total detectado:', total);
        
        // Obtém o ID da adquirente da URL atual usando curUrl
        let acquirerId = 1; // valor padrão
        
        // Tenta obter o acquirerId da URL atual
        const curUrlElement = document.querySelector('input[name="curUrl"]');
        if (curUrlElement && curUrlElement.value) {
            try {
                const url = new URL(curUrlElement.value, window.location.origin);
                const pathSegments = url.pathname.split('/');
                const urlIndex = pathSegments.findIndex(segment => segment === 'Pay');
                
                if (urlIndex !== -1 && pathSegments[urlIndex + 1]) {
                    const extractedAcquirerId = parseInt(pathSegments[urlIndex + 1]);
                    if (!isNaN(extractedAcquirerId) && extractedAcquirerId > 0) {
                        acquirerId = extractedAcquirerId;
                    }
                }
            } catch (error) {
                console.warn('Erro ao extrair acquirerId da URL:', error);
            }
        }
        
        // Fallback para campo hidden se existir
        if (acquirerId === 1) {
            const acquirerIdElement = document.getElementById('acquirerId');
            if (acquirerIdElement) {
                const acquirerIdValue = parseInt(acquirerIdElement.value);
                if (!isNaN(acquirerIdValue) && acquirerIdValue > 0) {
                    acquirerId = acquirerIdValue;
                }
            }
        }
        
        console.log('Acquirer ID usado:', acquirerId, 'URL:', curUrlElement?.value);
        
        // Chama a API da RisePay para obter as parcelas
        const params = new URLSearchParams({
            value: total.toString(),
            acquirerId: acquirerId.toString(),
            internalAcquirerId: '',
            cardBrand: cardBrand,
            curUrl: curUrlElement?.value || ''
        });
        
        const response = await fetch(`/api/Public/GetInstallments?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (!response.ok) {
            throw new Error('Erro ao buscar parcelas');
        }
        
        const data = await response.json();
        
        if (data.success && data.object) {
            // Limpa o select de parcelas
            const installmentsSelect = document.getElementById('installmentsSelect');
            installmentsSelect.innerHTML = '';
            
            // Adiciona as novas opções de parcelas
            data.object.forEach(installment => {
                const option = document.createElement('option');
                option.value = installment.installment;
                option.textContent = `${installment.installment}x de R$ ${installment.value.toFixed(2).replace('.', ',')}`;
                installmentsSelect.appendChild(option);
            });
            
            // Dispara o evento de change para atualizar o total
            installmentsSelect.dispatchEvent(new Event('change'));
            
            console.log(`Parcelas carregadas para ${cardBrand}:`, data.object);
        } else {
            console.error('Erro na resposta da API:', data);
        }
    } catch (error) {
        console.error('Erro ao carregar parcelas:', error);
    }
}

// Event listener para detectar mudanças no número do cartão
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.querySelector('input[name="cardNumber"]');
    
    if (cardNumberInput) {
        let typingTimer;
        const doneTypingInterval = 500; // Espera 500ms após o usuário parar de digitar
        
        cardNumberInput.addEventListener('input', function() {
            clearTimeout(typingTimer);
            const cardNumber = this.value.replace(/\s/g, '');
            
            // Só carrega as parcelas se tiver pelo menos 6 dígitos (mínimo para identificar bandeira)
            if (cardNumber.length >= 6) {
                typingTimer = setTimeout(() => {
                    loadInstallmentsByCardBrand(cardNumber);
                }, doneTypingInterval);
            }
        });
        
        // Também carrega quando o campo perde o foco
        cardNumberInput.addEventListener('blur', function() {
            const cardNumber = this.value.replace(/\s/g, '');
            if (cardNumber.length >= 6) {
                loadInstallmentsByCardBrand(cardNumber);
            }
        });
    }
});