function showSpinner() {
    const spinnerBox = document.getElementById('mySpinner');
    spinnerBox.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"> </span>';
}

function hideSpinner() {
    const spinnerBox = document.getElementById('mySpinner');
    spinnerBox.innerHTML = '';
}

function setGender(gender) {
    document.getElementById("genderResult").value = gender;
}

function setEditGenderResult(gender) {
    document.getElementById("editGenderResult").value = gender;
}

function createPrescriptionsJsonList(prescriptionId, issueDate, patientReferralDate) {
    return {
        prescriptionId,
        issueDate,
        patientReferralDate
    };
}


function savePatient() {
    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8081/patient/save";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const x = document.getElementById("alert");
            if (window.getComputedStyle(x).visibility === "hidden") {
                x.innerHTML = "Patient was added !";
                x.style.visibility = "visible";
            }

            $("#addModal").modal('hide');
            $("#addFirstName").val("");
            $("#addLastName").val("");
            $("#prescription-table div").remove();
            inputId = 0;
            inputIssueDate = 0;
            inputReferralDate = 0;
        }
    };
    let prescriptions = [];
    for (let i = 0; i < inputId; i++) {
        const prescriptionId = $("#prescriptionId" + i.toString()).val();
        const issueDate = new Date($('#issueDate' + i.toString()).val());
        const issueDay = issueDate.getDate();
        const issueMonth = issueDate.getMonth() + 1;
        const issueYear = issueDate.getFullYear();

        const issueDateString = [issueYear, issueMonth, issueDay].join('/');

        const referralDate = new Date($('#referralDate' + i.toString()).val());
        const referralDay = referralDate.getDate();
        const referralMonth = referralDate.getMonth() + 1;
        const referralYear = referralDate.getFullYear();

        const referralDateString = [referralYear, referralMonth, referralDay].join('/');
        prescriptions[i] = createPrescriptionsJsonList(prescriptionId, issueDateString, referralDateString);
    }


    const data = JSON.stringify({
        firstName: $("#addFirstName").val(),
        lastName: $("#addLastName").val(),
        gender: $("#genderResult").val(),
        prescriptions: prescriptions
    });

    xhr.send(data);
}

function loadPatientsAjax() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = '';

    showSpinner();
    const http = new XMLHttpRequest();
    const url = 'http://localhost:8081/patient/all';
    http.onreadystatechange = function () {

        if (this.readyState === 4 && this.status === 200) {
            const patientList = JSON.parse(this.responseText);
            let rows = '';
            for (let i = 0; i < patientList.length; i++) {
                rows += createRow(
                    patientList[i].id,
                    patientList[i].firstName,
                    patientList[i].lastName,
                    patientList[i].gender,
                    patientList[i].prescriptions
                );
            }
            tableBody.innerHTML = rows;
            setTimeout(hideSpinner, 1000);
        }
    };

    http.open('GET', url, true);
    http.send();
}


function createRow(id, firstName, lastName, gender, prescriptions) {
    let start = '        <tr>\n' +
        '                <th scope="row">' + id + '</th>\n' +
        '                <td id="firstName' + id + '">' + firstName + '</td>\n' +
        '                <td id="lastName' + id + '">' + lastName + '</td>\n' +
        '                <td id="gender' + id + '">' + gender + '</td>\n' + '<td>' +
        '<button class="btn btn-warning" onclick="showEditModal(' + id + ')">edit</button>' +
        '<span>  </span>' +
        '<button class="btn btn-danger" onclick="showDeleteModal(' + id + ')">delete</button>' +
        '</td>\n' + '</tr>';
    let end = '';
    let i;
    for (i = 0; i < prescriptions.length; i++) {
        end += '<tr hidden id="prescription' + id + i + '">' +
            '<td hidden id="prescriptionId' + id + i + '">' + prescriptions[i].id + '</td>' +
            '<td hidden id="prescriptionIssueDate' + id + i + '">' + prescriptions[i].issueDate + '</td>' +
            '<td hidden id="prescriptionReferralDate' + id + i + '">' + prescriptions[i].patientReferralDate + '</td>' +
            '<td hidden id="prescriptionCode' + id + i + '">' + prescriptions[i].prescriptionId + '</td>' +
            '</tr>'

    }

    return start + end + '<input  hidden type="text" id="count' + id + '" value=' + i + '>';
}


function showEditModal(id) {
    $('#editModal').on('hidden.bs.modal', function () {
        $("#edit-prescription-table div").remove();
        editInputId = 0;
        editInputIssueDate = 0;
        editInputReferralDate = 0;
    });
    const firstName = document.getElementById('firstName' + id);
    const lastName = document.getElementById('lastName' + id);
    const gender = document.getElementById('gender' + id);
    const count = $("#count" + id).val();
    $("#editId").val(id);
    $("#editFirstName").val(firstName.innerText);
    $("#editLastName").val(lastName.innerText);
    $("#editGenderResult").val(gender.innerText);

    for (let i = 0; i < count; i++) {
        createPrescriptionRowEditTable();
        $("#editPrescriptionId" + i).val(document.getElementById('prescriptionCode' + id + i).innerHTML);
        $("#editIssueDate" + i).val(document.getElementById('prescriptionIssueDate' + id + i).innerHTML);
        $("#editReferralDate" + i).val(document.getElementById('prescriptionReferralDate' + id + i).innerHTML);
    }
    if (gender.innerText === 'male')
        document.getElementById('editMale').checked = true;
    else if (gender.innerText === 'female')
        document.getElementById('editFemale').checked = true;


    $("#editModal").modal('show');

}

function editPatient() {
    const id = $("#editId").val();
    const firstName = $("#editFirstName").val();
    const lastName = $("#editLastName").val();
    const gender = $("#editGenderResult").val();

    const xhr = new XMLHttpRequest();
    const url = "http://localhost:8081/patient/edit?id=" + id;
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const x = document.getElementById("alert");
            x.innerHTML = "Patient (" + id + ") was changed !";
            if (window.getComputedStyle(x).visibility === "hidden") {
                x.style.visibility = "visible";
            }
            $("#editModal").modal('hide');
            loadPatientsAjax();


        }
    };
    let prescriptions = [];
    for (let i = 0; i < editInputId; i++) {
        const prescriptionId = $("#editPrescriptionId" + i.toString()).val();
        const issueDate = new Date($('#editIssueDate' + i.toString()).val());
        const issueDay = issueDate.getDate();
        const issueMonth = issueDate.getMonth() + 1;
        const issueYear = issueDate.getFullYear();

        const issueDateString = [issueYear, issueMonth, issueDay].join('/');

        const referralDate = new Date($('#editReferralDate' + i.toString()).val());
        const referralDay = referralDate.getDate();
        const referralMonth = referralDate.getMonth() + 1;
        const referralYear = referralDate.getFullYear();

        const referralDateString = [referralYear, referralMonth, referralDay].join('/');
        prescriptions[i] = createPrescriptionsJsonList(prescriptionId, issueDateString, referralDateString);
    }


    const data = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        prescriptions: prescriptions
    });

    xhr.send(data);
}

function showDeleteModal(id) {
    $("#deleteId").val(id);
    $("#deleteModal").modal('show');
}

function deletePatient() {
    const id = $("#deleteId").val();
    const url = 'http://localhost:8081/patient/delete?id=' + id;

    const http = new XMLHttpRequest();

    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            $("#deleteModal").modal('hide');
            const x = document.getElementById("alert");
            if (window.getComputedStyle(x).visibility === "hidden") {
                x.innerHTML = "Patient (" + id + ") was deleted !";
                x.style.visibility = "visible";
            }
            loadPatientsAjax();
        }
    };

    http.open('GET', url, true);
    http.send();
}
