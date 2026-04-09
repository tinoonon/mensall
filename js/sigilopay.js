// ============================================================
//  SigiloPay - Integração direta de PIX
//  Substitui a função paymentPix() original do Checkout1.js
// ============================================================

(function () {

    // Chama a função serverless do Vercel (sem CORS)
    var SIGILO_PIX_URL = '/api/pix';

    function hideSpinner() {
        $('#loading-overlay').fadeOut(200);
    }

    function gerarIdentifier() {
        return 'ck_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    function mostrarErro(msg) {
        var container = $('#dynamicErrors');
        container.html('').show();
        container.append($('<div>').text(msg));
        window.scrollTo(0, 0);
    }

    // ── Substituição da função paymentPix ─────────────────────
    window.paymentPix = function () {

        // Coleta dados do comprador
        var nome     = $('input[name="buyer-name"]').val() || '';
        var email    = $('input[name="buyer-email"]').val() || '';
        var telefone = $('input[name="TelefoneComprador2"]').val() || '(11) 98765-4321';
        var cpf      = $('input[name="customerPixDocument"]').val() || '535.796.370-37';

        // Calcula o valor total
        var totalPrice = window.getSelectedProductsTotalPrice
            ? window.getSelectedProductsTotalPrice()
            : parseFloat($('#dataContainer').data('price')) || 9.90;

        var body = {
            identifier: gerarIdentifier(),
            amount: totalPrice,
            client: {
                name:     nome,
                email:    email,
                phone:    telefone,
                document: cpf
            },
            metadata: { origem: 'checkout_web' }
        };

        // Apenas desabilita o botão — SEM mostrar a tela azul
        submitButtonProcessing();

        $.ajax({
            url: SIGILO_PIX_URL,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify(body),
            success: function (resp) {
                hideSpinner();

                if (!resp || !resp.pix || !resp.pix.code) {
                    submitButtonNormal();
                    mostrarErro('Erro ao gerar o PIX. Tente novamente.');
                    return;
                }

                var pixCode = resp.pix.code;
                var orderId = resp.transactionId || (resp.order && resp.order.id) || gerarIdentifier();

                // Número do pedido
                $('#numero-pedido').html('<span>' + orderId + '</span>');

                // ── Gera QR Code sempre pelo código (mais confiável que base64 externo)
                var qrContainer = $('#PixQrCodeImage');
                qrContainer.empty();

                if (typeof QRCode !== 'undefined') {
                    new QRCode(qrContainer[0], {
                        text: pixCode,
                        width: 180,
                        height: 180,
                        correctLevel: QRCode.CorrectLevel.M
                    });
                } else {
                    // Fallback: gera via API pública de QR (não precisa de biblioteca)
                    var qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(pixCode);
                    qrContainer.html('<img src="' + qrUrl + '" style="width:180px;height:180px;" />');
                }

                // Copia e cola
                $('#PixCopyPasteData').text(pixCode);

                // Valor no modal
                $('#TotalPricePixModal').text('R$ ' + totalPrice.toFixed(2).replace('.', ','));

                // Abre modal
                openModal();
                $('#dynamicErrors').hide();

                try {
                    fbq('track', 'InitiateCheckout', { value: totalPrice, currency: 'BRL' });
                } catch(e) {}
            },
            error: function (xhr) {
                hideSpinner();
                submitButtonNormal();

                var errMsg = 'Ocorreu um erro ao gerar o PIX. Tente novamente.';
                try {
                    var errData = JSON.parse(xhr.responseText);
                    if (errData && errData.message) errMsg = errData.message;
                } catch(e) {}

                mostrarErro(errMsg);
                console.error('[SigiloPay] Erro:', xhr.status, xhr.responseText);
            }
        });
    };

})();