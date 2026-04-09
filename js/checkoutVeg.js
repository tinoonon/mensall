      function preencherAnos() {
            const selectAno = document.getElementById('ano');
            const anoAtual = new Date().getFullYear(); 
            const anoLimite = 2050;

          for (let i = anoAtual; i <= anoLimite; i++) {

                const option = document.createElement('option');
                option.value = i - 2000;
                option.textContent = i;
                selectAno.appendChild(option);
            }
        }
     preencherAnos()
