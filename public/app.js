document.addEventListener('click', (e) => {
    if (e.target.dataset.type === 'remove') {
        const id = e.target.dataset.id;
        remove(id).then(() => {
            e.target.closest('li').remove();
        });
    }
    if (e.target.dataset.type === 'edit') {
        const id = e.target.dataset.id;
        const r = prompt('Введите новое название');
        if (r !== null) {
            edit({ id, title: r }).then(() => {
                const buttonsElements = e.target.closest('div');
                const listElement = e.target.closest('li');
                listElement.innerText = r;
                listElement.appendChild(buttonsElements);
            });
        }
    }
});

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'});
}

async function edit(note) {
    await fetch(`/`, {
        method: 'PUT', body: JSON.stringify(note), headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}
