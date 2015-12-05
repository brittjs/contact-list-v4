$(document).ready(function() {
  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()

getContacts();

function addContactToDOM(index, contact) {
  var tr = $("<tr>").appendTo("#displayContacts");
  // $("<td>").text(contact.id).appendTo(tr);
  $("<td>").text(contact.firstname).appendTo(tr);
  $("<td>").text(contact.email).appendTo(tr);
  $("<td>").text(contact.phone).appendTo(tr);

  var td = $("<td>");
  var button = $('<button type="button" class="btn btn-default btn-xs" id="deleteContactButton"><span class="glyphicon glyphicon-remove"></span></button>');
  button.appendTo(td);
  td.appendTo(tr);
  // button.on('click', deleteContact.bind(this, contact.id));
  console.log(contact.id);
};

function deleteContact(id) {
  console.log('deleting contact ' + id)
   $.ajax({
      url: '/contacts/' + id,
      method: 'DELETE',
      success: function() {
        getContacts();
      }
    });
};

function receiveContacts(contacts) {
  $.each(contacts, addContactToDOM);
}

function getContacts() {
  $("#displayContacts").empty();
  $.getJSON("/contacts", receiveContacts);
};

$("#createContactButton").on('click', function () {
  var first = $("#firstname").val();
  var last = $("#lastname").val();
  var email_address = $("#email").val();
  var num = $("#phone").val();
  var contact = {firstname: first, lastname: last, email: email_address, phone: num};
    $.post("/contacts", contact, function(data) {
      if (data.contact) {
        contact.id = data.contact.id;
        addContactToDOM(contact);
      } else {
        alert("Unable to create contact.");
      }
    });
    }, 'json');
  });



$("#displayContacts tr").on('click', function() {
  alert('values: ' + $(this).find(".displayContacts").text() );

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


