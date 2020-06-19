// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [];
  this.currentId = 0;
}

AddressBook.prototype.addContact = function (contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function (id) {
  for (let i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  }
  return false;
};

AddressBook.prototype.deleteContact = function (id) {
  for (let i = 0; i < this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  }
  return false;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, emailAddress, physicalAddress) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = emailAddress;
  this.physicalAddress = physicalAddress;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
}

function PhysicalAddress(streetAddress, zipCode, state, country, type) {
  this.streetAddress = streetAddress;
  this.zipCode = zipCode;
  this.state = state;
  this.country = country;
  this.type = type;
}

PhysicalAddress.prototype.fullAddress = function () {
  return this.streetAddress + "<br>" + this.zipCode + " " + this.state + ", " + this.country;
}

// User Interface Logic
let addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  let contactList = $("ul#contacts");
  let htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function (contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + " - " + contact.emailAddress + "<br>" + contact.physicalAddress.streetAddress + "</li>";
  })
  contactList.html(htmlForContactInfo);
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function () {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function () {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
}

function showContact(contactId) {
  const contact = addressBook.findContact(contactId)
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email-address").html(contact.emailAddress);
  $(".street-address").html(contact.physicalAddress.streetAddress);
  $(".zipcode").html(contact.physicalAddress.zipCode);
  $(".state").html(contact.physicalAddress.state);
  $(".country").html(contact.physicalAddress.country);
  $(".address-type").html(contact.physicalAddress.type);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + + contact.id + ">Delete</button>");
}

$(document).ready(function () {
  attachContactListeners();
  $("form#new-contact").submit(function (event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmailAddress = $("input#new-email-address").val();
    const inputtedStreetAddress = $("input#new-street-address").val();
    const inputtedZipcode = $("input#new-zipcode").val();
    const inputtedState = $("input#new-state").val();
    const inputtedCountry = $("input#new-country").val();
    const inputtedAddressType = $("#new-address-type option:selected").val();
    // Idea I had about collecting form input values with a function, might revisit later 6/17/20
    // const inputtedPhysicalAddress = function() {
    //   $(".form-group.physical-address .form-control").forEach
    // }
    let newPhysicalAddress = new PhysicalAddress(inputtedStreetAddress, inputtedZipcode, inputtedState, inputtedCountry, inputtedAddressType);
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmailAddress, newPhysicalAddress);

    $("input.form-control").val("");

    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
    
  })
})