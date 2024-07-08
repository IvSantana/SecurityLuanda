document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('consultaForm');
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

        // Enviar o formulário via AJAX
        const formData = new FormData(form);
        fetch('php/databasemensgconn.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: data.message,
                }).then(() => {
                    window.location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: data.message,
                });
            }
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.',
            });
        });
    });
});
