$(document).ready(function() {
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

getContacts();

function addContactToDOM(index, contact) {
  var tr = $("<tr>").appendTo("#displayContacts");
  // $("<td>").attr("class", "hiddenId").hide().text(contact.id).appendTo(tr);
  $("<td>").text(contact.firstname).appendTo(tr);
  $("<td>").text(contact.email).appendTo(tr);
  $("<td>").text(contact.phone).appendTo(tr);

  var td = $("<td>");
  var deleteButton = $('<button type="button" class="btn btn-default btn-xs" id="deleteContactButton"><span class="glyphicon glyphicon-remove"></span></button>');
  var editButton = $('<button type="button" class="btn btn-default btn-xs" data-toggle="modal" data-target="#editContactModal"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>');
  editButton.appendTo(td);
  deleteButton.appendTo(td);
  td.appendTo(tr);
  // editButton.on('click', editContact.bind(this, contact.id));
  deleteButton.on('click', deleteContact.bind(this, contact.id));
  editButton.on('click', function() {
    prepopulateEditForm(contact);
  });
};

function prepopulateEditForm(contact) {
  $("#firstnameE").val(contact.firstname);
  $("#lastnameE").val(contact.lastname);
  $("#emailE").val(contact.email);
  $("#phoneE").val(contact.phone);
  $("#hiddenId").attr("value", contact.id);
} 

function receiveContacts(contacts) {
  $.each(contacts, addContactToDOM);
}

function getContacts() {
  $("#displayContacts").empty();
  $.getJSON("/contacts", receiveContacts); 
  // making a http get request request
};

$("#saveChangesToContactButton").on('click', function() {
  var first = $("#firstnameE").val();
  var last = $("#lastnameE").val();
  var email_address = $("#emailE").val();
  var num = $("#phoneE").val();
  var id = $("#hiddenId").val();
  var contact = {id: id, firstname: first, lastname: last, email: email_address, phone: num};
  console.log(contact);
  $.ajax({
    url: '/contacts/' + contact.id,
    data: contact,
    type: 'PUT',
    success: function(data) {
      getContacts();
    }
  });


});

$("#createContactButton").on('click', function() { 
  var first = $("#firstname").val();
  var last = $("#lastname").val();
  var email_address = $("#email").val();
  var num = $("#phone").val();
  var contact = {firstname: first, lastname: last, email: email_address, phone: num};
    $.post("/contacts", contact, function(data) {
      if (data.contact) {
        contact.id = data.contact.id;
        addContactToDOM(contact.id, contact);
      } else {
        alert("Unable to create contact.");
      }
    }, 'json');
});

function deleteContact(id) {
  $.ajax({
    url: '/contacts/' + id,
    type: 'DELETE',
    success: function(data) {
      getContacts();
    }
  });
};

// function editContact(contact) {
//   $.ajax({
//     url: '/contacts/' + contact.id,
//     type: 'PUT',
//     success: function(data) {
//       getContacts();
//     }
//   });
// };


// $("#displayContacts tr").on('click', function() {
//   alert('values: ' + $(this).find(".displayContacts").text() );

// });



});




// $.get()
// $.post()
// $.getJSON()
// $.ajax()
  /*
  1. Get data from form.
  2. Create Object from data.
      c = {name: dfsfd, number: 38940 };
      $ajaxpost('/contacts', c);

  [ 
    {name:fsdf, number: fdsfds},
    {name:fsdf, number: fdsfds},
    ...
  ]
  
  Iterating through the above list of json objects and adding a <tr> for each to the dom.
  */


