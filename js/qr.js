window.addEventListener("load", () => {
    const qrCodeDataElement = document.getElementById("qrCodeData");
    const uri = qrCodeDataElement ? qrCodeDataElement.getAttribute('data-url') : null;
    if (uri) {
        new QRCode(document.getElementById("qrCode"),
            {
                text: uri,
                width: 150,
                height: 150
            });
    } else {
        console.log("qrCodeData element not found.");
    } 
});