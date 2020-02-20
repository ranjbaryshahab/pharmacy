let editInputId = 0;
let editInputIssueDate = 0;
let editInputReferralDate = 0;

function createPrescriptionRowEditTable() {
    const table = document.getElementById("edit-prescription-table");
    const row = table.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.appendChild(prescriptionInputIdEditTable());
    cell2.appendChild(prescriptionInputIssueDateEditTable());
    cell3.appendChild(prescriptionInputReferralDateEditTable());
}

function deletePrescriptionRowEditTable() {
    document.getElementById("edit-prescription-table").deleteRow(0);
    editInputId--;
    editInputIssueDate--;
    editInputReferralDate--;
}

function prescriptionInputIdEditTable() {
    const label = document.createElement("label");
    label.setAttribute("for", "editPrescriptionId");
    label.innerHTML = "P_Id";

    const prescriptionId = document.createElement("INPUT");
    prescriptionId.setAttribute("type", "text");
    prescriptionId.setAttribute("class", "form-control");
    prescriptionId.setAttribute("placeholder", "P_Id");
    prescriptionId.setAttribute("name", "editPrescriptionId" + editInputId);
    prescriptionId.setAttribute("id", "editPrescriptionId" + editInputId);
    editInputId++;
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");
    div.appendChild(label);
    div.appendChild(prescriptionId);
    return div;
}

function prescriptionInputIssueDateEditTable() {
    const label = document.createElement("label");
    label.setAttribute("for", "editIssueDate");
    label.innerHTML = "Issue Date";

    const issueDate = document.createElement("INPUT");
    issueDate.setAttribute("type", "text");
    issueDate.setAttribute("class", "form-control");
    issueDate.setAttribute("onfocus", "(this.type='date')");
    issueDate.setAttribute("placeholder", "Issue Date");
    issueDate.setAttribute("name", "editIssueDate" + editInputIssueDate);
    issueDate.setAttribute("id", "editIssueDate" + editInputIssueDate);
    editInputIssueDate++;
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");
    div.appendChild(label);
    div.appendChild(issueDate);
    return div;
}

function prescriptionInputReferralDateEditTable() {
    const label = document.createElement("label");
    label.setAttribute("for", "editReferralDate");
    label.innerHTML = "Referral Date";

    const referralDate = document.createElement("INPUT");
    referralDate.setAttribute("type", "text");
    referralDate.setAttribute("class", "form-control");
    referralDate.setAttribute("placeholder", "Referral Date");
    referralDate.setAttribute("onfocus", "(this.type='date')");
    referralDate.setAttribute("name", "editReferralDate" + editInputReferralDate);
    referralDate.setAttribute("id", "editReferralDate" + editInputReferralDate);
    editInputReferralDate++;
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");
    div.appendChild(label);
    div.appendChild(referralDate);
    return div;
}
