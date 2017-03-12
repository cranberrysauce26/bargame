$(document).ready(function() {
   var data = {
       newSession: true
   };

   $.ajax({
       type: 'POST',
       url: 'php/users.php',
       data: data
   })
   .done(function(response) {
        alert(reponse);
   });
});

$(window).unload(function() {
   var data = {
       newSession: true
   };

   $.ajax({
       type: 'POST',
       url: 'php/users.php',
       data: data
   });
});