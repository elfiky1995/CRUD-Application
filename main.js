var selectedRow = null;

//Show Alert
function showAlert(message, className) {
    const
        div = document.createElement("div"),
        main = document.querySelector(".main"),
        container = document.querySelector(".container");

    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
};

//Clear All Fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#rollNo").value = "";
}

//Add Data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const
        firstName = document.querySelector("#firstName").value,
        lastName = document.querySelector("#lastName").value,
        rollNo = document.querySelector("#rollNo").value;

    //Validate
    if (firstName == "" || lastName == "" || rollNo == "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow == null) {
            const
                list = document.querySelector("#student-list"),
                row = document.createElement("tr");

            row.innerHTML = `
                    <td>${firstName}</td>
                    <td>${lastName}</td>
                    <td>${rollNo}</td>
                    <td>
                        <a href="#" class="edit">Edit</a>
                        <a href="#" class="delete">Delete</a>
                    </td>
                `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Student Added", "success")
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = rollNo;
            selectedRow = null;
            showAlert("Student Info Edited", "info");
        }
        clearFields();
    }
});

//Edit Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#rollNo").value = selectedRow.children[2].textContent;
    }
});

//Delete Data
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Student Data Deleted", "danger");
    }
});