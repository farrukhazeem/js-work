let rowId = 0;

$(document).ready(function () {
    // $('#datatable').dataTable();
    $("[data-toggle=tooltip]").tooltip();
});

function clickEdit(id) {
    let row = document.getElementById(id);
    let firstName = row.cells[0].innerHTML;
    let lastName = row.cells[1].innerHTML;
    let address = row.cells[2].innerHTML;
    let age = row.cells[3].innerHTML;
    let email = row.cells[4].innerHTML;
    let phone = row.cells[5].innerHTML;

    document.getElementById('editFirstName').value = firstName;
    document.getElementById('editLastName').value = lastName;
    document.getElementById('editAddress').value = address;
    document.getElementById('editAge').value = age;
    document.getElementById('editEmail').value = email;
    document.getElementById('editPhone').value = phone;

    document.getElementById('updateRecord').setAttribute('data-record-id', id);
}

function clickAdd() {
    let firstName=document.getElementById('addFirstName').value;
    let lastName=document.getElementById('addLastName').value;
    let address=document.getElementById('addAddress').value;
    let age=document.getElementById('addAge').value;
    let email =document.getElementById('addEmail').value;
    let phone =document.getElementById('addPhone').value;

    const isValidated= validateform(firstName, lastName, address, age, email, phone);
    if(isValidated) {
        addRecord(firstName, lastName, address, age, email, phone);
    }
}

function deleteRecord() {
   let removeId= document.getElementById('removeRecord').getAttribute('data-record-id');
   let row = document.getElementById(removeId);
   row.remove();
}

function clickDelete(id) {
    document.getElementById('removeRecord').setAttribute('data-record-id', id);
}
function addRecord(fname, lname, address, age, email, phone) {
    var table = document.getElementById("tableBody");
    var rowHTML = "<tr id="+rowId+"><td>"+fname+"</td>"+"<td>"+lname+"</td>"+"<td>"+address+"</td>"
        +"<td>"+age+"</td>"+"<td>"+email+"</td>"+"<td>"+phone+"</td>"
        +"<td><p data-placement='top' title='Edit'>"
        +"<button class='btn btn-primary' onclick='clickEdit(" + rowId + ")' data-title='edit' data-toggle='modal' data-target='#edit'>Edit</button></p>"
        +"<td><p data-placement='top' data-toggle='tooltip' title='Delete'>"
        +"<button class='btn btn-danger' onclick='clickDelete(" +rowId + ")' data-title='delete' data-toggle='modal' data-target='#delete'>Delete</button></p></td>"
        +"</tr>";

    $(table).append(rowHTML);
    rowId++;
}
function validateform(firstName, lastName, address, age, email, phone) {
    if (firstName == "") {
        alert("First Name must be filled out");
        return false;
    }
    if (lastName == "") {
        alert("Last Name must be filled out");
        return false;
    }

    if (address == "") {
        alert("Address must be filled out");
        return false;
    }

    if (age == "" && isNaN(Number(age))) {
        alert("Age must be filled out and number");
        return false;
    }
    if (email == "") {
        alert("Email must be filled out");
        return false;
    }
    if (phone == "" && !isNaN(Number(phone))) {
        alert("Phone must be filled out");
        return false;
    }
    return true;
}

function updateRecord(event) {
    var currentId = event.currentTarget.getAttribute('data-record-id')
    let row = document.getElementById(currentId);

    let firstName = document.getElementById('editFirstName').value;
    let lastName = document.getElementById('editLastName').value;
    let address = document.getElementById('editAddress').value;
    let age = document.getElementById('editAge').value;
    let email = document.getElementById('editEmail').value;
    let phone = document.getElementById('editPhone').value;

     const isValidated= validateform(firstName, lastName, address, age, email, phone);
    if(isValidated) {
        row.cells[0].innerHTML = firstName;
        row.cells[1].innerHTML = lastName;
        row.cells[2].innerHTML = address;
        row.cells[3].innerHTML = age;
        row.cells[4].innerHTML = email;
        row.cells[5].innerHTML = phone;
    }
}

$('#updateRecord').on('click', updateRecord);

$.ajax({
  url: 'https://randomuser.me/api/?results=10',
  dataType: 'json',
  success: function(data) {
    const results = data.results;
    for (const result in results) {
        const user = results[result];
        let fname = user.name.first;
        let lname = user.name.last;
        let address = user.location.street + ', ' + user.location.city + ', ' + user.location.state;
        let age = Math.floor((Math.random() * 60) + 1);
        let email = user.email;
        let phone = user.phone;
        addRecord(fname, lname, address, age, email, phone);
    }
    
  }
  
});
      