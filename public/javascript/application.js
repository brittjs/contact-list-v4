$(document).ready(function() {

  function addContactToDOM(index, contact) {
    var tr = $("<tr id='row'>").appendTo("#displayContacts");
    $("<td id='first'>").text(contact.firstname).appendTo(tr);
    $("<td id='email'>").text(contact.email).appendTo(tr);
    $("<td id='phone'>").text(contact.phone).appendTo(tr);

    var td = $("<td id='buttons'>");
    // var div = $("<div id='editAndDelete'>")
    var deleteButton = $('<button type="button" class="btn btn-default btn-xs" id="deleteContactButton"><span class="glyphicon glyphicon-remove"></span></button>');
    var editButton = $('<button type="button" class="btn btn-default btn-xs" id="editContactButton" data-toggle="modal" data-target="#editContactModal"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>');

    editButton.appendTo(td);
    deleteButton.appendTo(td);
    // div.appendTo(td);
    td.appendTo(tr);
    deleteButton.on('click', deleteContact.bind(this, contact.id));
    editButton.on('click', function() {
      prepopulateEditForm(contact);
    });
  }

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
  }

  function deleteContact(id) {
    $.ajax({
      url: '/contacts/' + id,
      type: 'DELETE',
      success: function(data) {
        getContacts();
      }
    });
  }

  getContacts();

  $("#saveChangesToContactButton").on('click', function() {
    var first = $("#firstnameE").val();
    var last = $("#lastnameE").val();
    var email_address = $("#emailE").val();
    var num = $("#phoneE").val();
    var id = $("#hiddenId").val();
    var contact = {id: id, firstname: first, lastname: last, email: email_address, phone: num};
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

  $("#search-field").on("keyup", function() {
    var searchInput = $(this).val().toLowerCase();
    $("#displayContacts tr").each(function() {
      var searchOutput = $(this).text().toLowerCase();
      if (searchOutput.indexOf(searchInput)!=-1) {
        $(this).show();
      }
      else {
        $(this).hide();
      }
    });
  });

});


