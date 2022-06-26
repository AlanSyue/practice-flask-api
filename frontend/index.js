function callApi(url, method = 'GET', data = {}, header = {}) {
    const apiUrl = getApiUrl();
    console.log(apiUrl + url);
    return $.ajax({
        type: method,
        url: apiUrl + url,
        dataType: "json",
        contentType: 'application/json',
        data: JSON.stringify(data),
        headers: header,
        async: false,
        success: function (res, textStatus, xhr) {
            return res.data;
        },
        error: function (res, textStatus, errorThrown) {
            return JSON.parse(res.responseText);
        }
    });
}

function getApiUrl() {
    return 'http://localhost:5000';
}

function getTasks() {
    return callApi('/tasks');
}

const editModal = document.getElementById('edit-modal')
editModal.addEventListener('show.bs.modal', event => {
    const button = event.relatedTarget
    const id = button.getAttribute('data-bs-id')
    const description = button.getAttribute('data-bs-description')
    const modalBodyInput = editModal.querySelector('.modal-body input')
    const modalIdInput = editModal.querySelector('#task-id')

    modalIdInput.value = id
    modalBodyInput.value = description
})

$('#add-task-event').on("click", async function () {
    const description = $('#add-task-description').val()
    await callApi('/tasks', 'POST', { description: description });
    renderTable()
    $('#create-task-modal').modal('hide')
});

$('#update-task-event').on("click", async function () {
    const id = $('#task-id').val()
    const description = $('#update-task-description').val()
    await callApi(`/tasks/${id}`, 'PATCH', { description: description });
    renderTable()
    $('#edit-modal').modal('hide')
});


async function finishTask(id) {
    await callApi(`/tasks/${id}`, 'DELETE');
    renderTable()
}

async function renderTable() {
    const tasks = await getTasks();
    let renderHtml = tasks.length === 0 ? '<tr><td colspan="3">無待辦事項</td></tr>' : ''

    tasks.forEach(function (element) {
        renderHtml += `
            <tr>
                <td>
                    <input type="checkbox" class="finish-task" onclick="finishTask(${element['id']})"">
                </td>
                <td class="description-td">${element['description']}</td>
                <td>
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#edit-modal"
                        data-bs-id="${element['id']}"
                        data-bs-description="${element['description']}"
                    >
                        編輯
                    </button>
                </td>
            </tr>
        `
    });

    $('#todo-table-body').html(renderHtml)
}

$(document).ready(function () {
    renderTable()
});
