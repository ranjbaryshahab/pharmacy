function saveMedicine() {
    const medicineName = $("#addMedicineName").val();
    const price = $("#addPrice").val();
    const description = $("#addDescription").val();

    const url = 'http://localhost:8081/medicine/save?medicineName= ' + medicineName + '&price=' + price + '&description=' + description;

    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            $("#addMedicineName").val('');
            $("#addPrice").val('');
            $("#addDescription").val('');

            $("#addModal").modal('hide');

            loadMedicinesAjax();

            const x = document.getElementById("alert");
            if (window.getComputedStyle(x).visibility === "hidden") {
                x.style.visibility = "visible";
            }

        }
    };

    http.open('GET', url, true);
    http.send();

}


function showSpinner() {
    const spinnerBox = document.getElementById('mySpinner');
    spinnerBox.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>';
}

function hideSpinner() {
    const spinnerBox = document.getElementById('mySpinner');
    spinnerBox.innerHTML = '';
}

function loadMedicinesAjax() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = '';
    showSpinner();
    const http = new XMLHttpRequest();
    const url = 'http://localhost:8081/medicine/all';

    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            const studentList = JSON.parse(this.responseText);
            let rows = '';
            for (let i = 0; i < studentList.length; i++) {
                rows += createRow(
                    studentList[i].id,
                    studentList[i].medicineName,
                    studentList[i].price,
                    studentList[i].description
                );
            }
            tableBody.innerHTML = rows;
            setTimeout(hideSpinner, 1000);
        }
    };

    http.open('GET', url, true);
    http.send();
}

function createRow(id, medicineName, price, description) {
    return '        <tr>\n' +
        '                <th scope="row">' + id + '</th>\n' +
        '                <td id="medicineName' + id + '">' + medicineName + '</td>\n' +
        '                <td id="price' + id + '">' + price + '</td>\n' +
        '                <td id="description' + id + '">' + description + '</td>\n' +
        '                <td>' +
        '<button class="btn btn-warning" onclick="showEditModal(' + id + ')">edit</button>' +
        '<span>  </span>' +
        '<button class="btn btn-danger" onclick="showDeleteModal(' + id + ')">delete</button>' +
        '</td>\n' +
        '            </tr>';
}

function showEditModal(id) {
    const medicineNameColumn = document.getElementById('medicineName' + id);
    const priceColumn = document.getElementById('price' + id);
    const descriptionColumn = document.getElementById('description' + id);

    $("#editId").val(id);
    $("#editMedicineName").val(medicineNameColumn.innerText);
    $("#editPrice").val(priceColumn.innerText);
    $("#editDescription").val(descriptionColumn.innerText);

    $("#editModal").modal('show');

}

function editMedicine() {
    const id = $("#editId").val();
    const medicineName = $("#editMedicineName").val();
    const price = $("#editPrice").val();
    const description = $("#editDescription").val();

    const url = 'http://localhost:8081/medicine/edit?id=' + id + '&medicineName=' + medicineName + '&price=' + price + '&description=' + description;

    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            $("#editModal").modal('hide');
            loadMedicinesAjax();
        }
    };

    http.open('GET', url, true);
    http.send();
}

function showDeleteModal(id) {
    $("#deleteId").val(id);
    $("#deleteModal").modal('show');
}

function deleteMedicine() {
    const id = $("#deleteId").val();
    const url = 'http://localhost:8081/medicine/delete?id=' + id;

    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            $("#deleteModal").modal('hide');
            loadMedicinesAjax();
        }
    };

    http.open('GET', url, true);
    http.send();
}
