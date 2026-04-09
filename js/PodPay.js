// Carrega SDK via jQuery
$.getScript("https://api.podpay.co/v1/js")
    .done(function () {
        window.global = window.global || {};
        window.global.tokenizar = async function ({ number, holderName, expMonth, expYear, cvv }) {
            await PodSub.setPublicKey("pk_iyJ8FzYKq61z2S17wq__zlcRs4sPEZhrmN1SIj5TWH4F4dtA");

            const card = {
                number,
                holderName: holderName.toUpperCase(),
                expMonth: parseInt(expMonth, 10),
                expYear: parseInt("20" + expYear, 10),
                cvv
            };

            const token = await PodSub.encrypt(card);
            return token;
        };
    })
    .fail(function () {
        console.error("Falha ao carregar SDK PodPay");
    });
