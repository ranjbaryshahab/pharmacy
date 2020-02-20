let inputId = 0;
let inputIssueDate = 0;
let inputReferralDate = 0;

function createPrescriptionRow() {
    const table = document.getElementById("prescription-table");
    const row = table.insertRow(0);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    cell1.appendChild(prescriptionInputId());
    cell2.appendChild(prescriptionInputIssueDate());
    cell3.appendChild(prescriptionInputReferralDate());
}

function deletePrescriptionRow() {
    document.getElementById("prescription-table").deleteRow(0);
    inputId--;
    inputIssueDate--;
    inputReferralDate--;
}

function prescriptionInputId() {
    const label = document.createElement("label");
    label.setAttribute("for", "prescriptionId");
    label.innerHTML = "P_Id";

    const prescriptionId = document.createElement("INPUT");
    prescriptionId.setAttribute("type", "text");
    prescriptionId.setAttribute("class", "form-control");
    prescriptionId.setAttribute("placeholder", "P_Id");
    prescriptionId.setAttribute("name", "prescriptionId" + inputId);
    prescriptionId.setAttribute("id", "prescriptionId" + inputId);
    inputId++;
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");
    div.appendChild(label);
    div.appendChild(prescriptionId);
    return div;
}

function prescriptionInputIssueDate() {
    const label = document.createElement("label");
    label.setAttribute("for", "issueDate");
    label.innerHTML = "Issue Date";

    const issueDate = document.createElement("INPUT");
    issueDate.setAttribute("type", "text");
    issueDate.setAttribute("class", "form-control");
    issueDate.setAttribute("onfocus", "(this.type='date')");
    issueDate.setAttribute("placeholder", "Issue Date");
    issueDate.setAttribute("name", "issueDate" + inputIssueDate);
    issueDate.setAttribute("id", "issueDate" + inputIssueDate);
    inputIssueDate++;
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");
    div.appendChild(label);
    div.appendChild(issueDate);
    return div;
}

function prescriptionInputReferralDate() {
    const label = document.createElement("label");
    label.setAttribute("for", "referralDate");
    label.innerHTML = "Referral Date";

    const referralDate = document.createElement("INPUT");
    referralDate.setAttribute("type", "text");
    referralDate.setAttribute("class", "form-control");
    referralDate.setAttribute("placeholder", "Referral Date");
    referralDate.setAttribute("onfocus", "(this.type='date')");
    referralDate.setAttribute("name", "referralDate" + inputReferralDate);
    referralDate.setAttribute("id", "referralDate" + inputReferralDate);
    inputReferralDate++;
    const div = document.createElement("div");
    div.setAttribute("class", "form-group");
    div.appendChild(label);
    div.appendChild(referralDate);
    return div;
}

