
//function updateOrderBumps() {
//    const orderBumpsSection = document.getElementById('orderBumpsSection');
//    const selectedCheckboxes = document.querySelectorAll('#selectedProducts:checked');
//    let hasOrderBumpSelected = false;

//    orderBumpsSection.innerHTML = '';

//    selectedCheckboxes.forEach(checkbox => {
//        hasOrderBumpSelected = true;
//        const productId = checkbox.value;
//        const productName = checkbox.dataset.name; 
//        const productPrice = checkbox.dataset.price;

//        const orderBumpItem = document.createElement('div');
//        orderBumpItem.style.cssText = "align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex;";
//        orderBumpItem.innerHTML = `
//            <div style="color: #64748B; font-size: 14px; font-family: Manrope; font-weight: 400; line-height: 19.60px; word-wrap: break-word;">
//                ${productName}
//            </div>
//            <div style="text-align: right; color: #64748B; font-size: 14px; font-family: Manrope; font-weight: 400; line-height: 19.60px; word-wrap: break-word;">
//                R$ ${parseFloat(productPrice).toFixed(2).replace('.', ',')}
//            </div>
//        `;

//        orderBumpsSection.appendChild(orderBumpItem);
//    });

//    orderBumpsSection.style.display = hasOrderBumpSelected ? 'flex' : 'none';

//    updateTotalValue();
//}
//var currentShippingValue = 0; 

//function selectShippingCard(cardId) {
//    var allCards = document.querySelectorAll('[id^="shipping-card-"]');
//    allCards.forEach(function (card) {
//        card.classList.remove('selected');
//        card.style.border = '1px #E7E7EB solid';
//        var background = card.querySelector('[id^="shipping-background-"]');
//        background.style.backgroundColor = '';
//    });

//    var selectedCard = document.getElementById('shipping-card-' + cardId);
//    selectedCard.classList.add('selected');
//    selectedCard.style.border = '2px solid #4246FF';
//    var selectedBackground = selectedCard.querySelector('[id^="shipping-background-"]');
//    selectedBackground.style.backgroundColor = '#4246FF';

//    var shippingValueElement = document.getElementById('shipping-value-' + cardId);
//    var shippingValueText = shippingValueElement.querySelector('div').textContent.trim();

//    var shippingValue = 0;

//    if (shippingValueText.toLowerCase().includes('grátis')) {
//        shippingValue = 0;
//    } else {
//        var numericValueText = shippingValueText.replace('R$', '').trim().replace('.', '').replace(',', '.');
//        shippingValue = parseFloat(numericValueText);

//        if (isNaN(shippingValue)) {
//            shippingValue = 0;
//        }
//    }
//    var shippingSection = document.getElementById('shippingSection');
//    var shippingValueDisplay = document.getElementById('shippingValue');

//    if (shippingValue > 0) {
//        shippingSection.style.display = 'inline-flex'; 
//        shippingValueDisplay.textContent = 'R$ ' + shippingValue.toFixed(2).replace('.', ',');
//    } else {
//        shippingSection.style.display = 'none'; 
//    }
//    if (shippingValue !== currentShippingValue) {
//        var totalValueElement = document.getElementById('totalValue');
//        var originalTotalText = totalValueElement.textContent.replace('Valor total: R$ ', '').trim();

//        if (!originalTotalText) {
//            return;
//        }

//        var cleanTotal = originalTotalText.replace('R$', '').trim();
//        cleanTotal = cleanTotal.replace(',', '.');

//        var originalTotal = parseFloat(cleanTotal);

//        if (isNaN(originalTotal)) {
//            return;
//        }

//        var newTotal = originalTotal - currentShippingValue + shippingValue;

//        totalValueElement.textContent = 'Valor total: R$ ' + newTotal.toFixed(2).replace('.', ',');

//        currentShippingValue = shippingValue;
//    }
//}



//function updateTotalValue() {
//    const totalValueElement = document.getElementById('totalValue');
//    const shippingValueDisplay = document.getElementById('shippingValue');

//    let shippingValue = parseFloat((shippingValueDisplay.textContent || '0').replace('R$', '').replace(',', '.')) || 0;

//    let originalTotalText = totalValueElement.textContent.replace('Valor total: R$ ', '').replace(',', '.');
//    let originalTotal = parseFloat(originalTotalText) || 0;

//    let newTotal = originalTotal + shippingValue;

//    totalValueElement.textContent = 'Valor total: R$ ' + newTotal.toFixed(2).replace('.', ',');
//}

//document.querySelectorAll('#selectedProducts').forEach(checkbox => {
//    checkbox.addEventListener('change', updateOrderBumps);
//});


//document.querySelectorAll('#selectedProducts').forEach(checkbox => {
//    checkbox.addEventListener('change', updateOrderBumps);
//});

