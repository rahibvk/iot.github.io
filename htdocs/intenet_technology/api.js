// document.addEventListener('DOMContentLoaded', function() {
//   var form = document.querySelector('.formee'); // Assuming the form has a class of "formee"

//   form.addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevents the form from submitting and refreshing the page

//     var formData = new FormData(form);
//     var formObject = {};

//     // Convert FormData to an object
//     for (var [key, value] of formData.entries()) {
//       formObject[key] = value;
//     }

//     console.log(formObject); // Output the form data to the console
//   });
// });

// Add an event listener to the button
const button = document.getElementById("myButton");
button.addEventListener("click", handleClick);

function handleClick(event) {
  event.preventDefault()
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  console.log("Latitude: " + latitude);
  console.log("Longitude: " + longitude);

  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const address = data.display_name;
      console.log("Address: " + address);

      document.querySelector('input[name="address"]').value = address;
      document.querySelector('input[name="city"]').value = data.address.state;
      document.querySelector('input[name="zip"]').value = data.address.postcode;


      // You can use the address for further processing or display it on your website.
    })
    .catch(error => {
      console.log("Error retrieving address: " + error);
    });
}

function errorCallback(error) {
  console.log("Error getting geolocation: " + error.message);
}


document.addEventListener('DOMContentLoaded', function() {
  var form = document.querySelector('.formee');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // var name = document.querySelector('input[name="name"]').value;
    // var city = document.querySelector('input[name="city"]').value;
    // var address = document.querySelector('input[name="address"]').value;
    // var zip = document.querySelector('input[name="zip"]').value;
    // var telephone = document.querySelector('input[name="telephone"]').value;

    // var formData = {
    //   'Name': name,
    //   'city': city,
    //   'Addres': address,
    //   'Zip/Postal Code': zip,
    //   'Telephone': telephone
    // };

    
    // code for database api php
    var formData = new FormData(this);
    
    // Create an AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "api.php", true);
    
    // Set the onload function to handle the response
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText); // Display the response from the PHP file
            $('#booking-modal').modal('hide');
        } else {
            console.error("Request failed. Status: " + xhr.status);
        }
    };
    
    // Send the form data
    xhr.send(formData);
  });
});
