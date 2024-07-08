 document.addEventListener("DOMContentLoaded", function() {
            const form = document.getElementById('productForm');
            const packageSelect = document.getElementById('package');
            const priceSpan = document.getElementById('price');

            // Função para atualizar o preço
            packageSelect.addEventListener('change', function() {
                const selectedPackage = packageSelect.value;
                if (selectedPackage) {
                    priceSpan.textContent = `${parseFloat(selectedPackage).toLocaleString('pt-PT')}kz`;
                } else {
                    priceSpan.textContent = '0.00kz';
                }
            });

            // Função para validar e enviar o formulário via AJAX
            form.addEventListener('submit', function(event) {
                event.preventDefault();

                // Verifica se todos os campos obrigatórios estão preenchidos
                if (form.checkValidity() === false) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Por favor, preencha todos os campos obrigatórios corretamente.',
                    });
                    return;
                }

                // Verifica se um pacote foi selecionado
                if (packageSelect.value === '' || packageSelect.value === 'Selecione o Pacote') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Por favor, selecione um pacote.',
                    });
                    return;
                }

                // Enviar o formulário via AJAX
                const formData = new FormData(form);
                fetch('../php/databaseconn.php', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Resposta recebida do servidor:', data); // Adicione este log
                    if (data.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Sucesso',
                            text: 'Pedido feito com sucesso, um dos nossos técnicos entrará em contacto consigo para agendar a montagem em sua propriedade.',
                        }).then(() => {
                            window.location.reload();
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: 'Não foi possível enviar o pedido. Por favor, tente novamente.',
                        });
                    }
                })
                .catch(error => {
                    console.error('Erro na requisição AJAX:', error); // Adicione este log
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Ocorreu um erro ao enviar o pedido. Por favor, tente novamente.',
                    });
                });
            });

            // Validação adicional para campos de texto e telefone
            form.name.addEventListener('input', function() {
                const pattern = /^[A-Za-zÀ-ú]+ [A-Za-zÀ-ú\s]+$/;
                if (!pattern.test(this.value)) {
                    this.setCustomValidity('O nome deve conter nome e sobrenome, separados por espaço, e apenas letras.');
                } else {
                    this.setCustomValidity('');
                }
            });

            form.phone.addEventListener('input', function() {
                const pattern = /^\+244 \d{9}$/;
                const value = form.phone.value;

                // Remove qualquer caractere que não seja dígito, exceto o prefixo +244 e o espaço
                const sanitizedValue = value.replace(/[^0-9]/g, '').slice(3); // Remove os primeiros 3 caracteres (+244)

                if (sanitizedValue.length > 9) {
                    form.phone.value = `+244 ${sanitizedValue.slice(0, 9)}`;
                } else {
                    form.phone.value = `+244 ${sanitizedValue}`;
                }

                if (!pattern.test(form.phone.value)) {
                    form.phone.setCustomValidity('O número de telefone deve começar com +244, seguido de um espaço, e conter 9 dígitos.');
                } else {
                    form.phone.setCustomValidity('');
                }
            });

            // Preencher automaticamente o prefixo +244 no campo de telefone
            form.phone.value = '+244 ';
        });