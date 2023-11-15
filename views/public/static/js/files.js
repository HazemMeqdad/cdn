
function copyLink(filename) {
    var copyText = window.location.origin + "/f/" + filename;
    console.log(copyText);
    navigator.clipboard
        .writeText(copyText)
        .then(function () {
                var toastElList = [].slice.call(document.querySelectorAll('.toast'))
                var toastList = toastElList.map(function(toastEl) {
                // Creates an array of toasts (it only initializes them)
                  return new bootstrap.Toast(toastEl) // No need for options; use the default options
                });
               toastList.forEach(toast => toast.show()); // This show them
           
                console.log(toastList); // Testing to see if it works
        })
        .catch(function (error) {
            alert("Failed to copy text: " + error);
        });
};
