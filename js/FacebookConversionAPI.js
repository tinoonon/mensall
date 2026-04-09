function SendConversion(eventName, accessToken, pixelId, productIds, totalPrice) {
    totalPrice = Number(totalPrice.toFixed(2));
    const API_URL = `https://graph.facebook.com/v20.0/${pixelId}/events`;

    const currentTimestamp = Math.floor(Date.now() / 1000);

    function getClientIpAddress() {
        return fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => data.ip)
            .catch(error => {
                console.error('Error fetching client IP address:', error);
                return null;
            });
    }

    getClientIpAddress().then(clientIpAddress => {
        const contents = productIds.map(productId => ({
            id: productId,
            quantity: 1
        }));

        const data = [
            {
                "event_name": eventName,
                "event_time": currentTimestamp,
                "user_data": {
                    "client_ip_address": clientIpAddress
                },
                "custom_data": {
                    "currency": "brl",
                    "value": totalPrice,
                    "contents": contents
                },
                "event_source_url": window.location.href,
                "action_source": "website"
            }
        ];

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: data,
                access_token: accessToken
            })
        })
        .then(response => response.json())
        .catch(error => {
            console.error('Erro ao enviar o evento:', error);
        });
    });
}