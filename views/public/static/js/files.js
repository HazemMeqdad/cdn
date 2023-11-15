
const showToast = (message) => {
    document.getElementById("toast-body").innerHTML = message;
    var toastElList = [].slice.call(document.querySelectorAll('.toast'))
    var toastList = toastElList.map(function(toastEl) {
    // Creates an array of toasts (it only initializes them)
      return new bootstrap.Toast(toastEl) // No need for options; use the default options
    });
   toastList.forEach(toast => toast.show()); // This show them
}

const copyLink = (filename) => {
    var copyText = window.location.origin + "/f/" + filename;
    console.log(copyText);
    navigator.clipboard
        .writeText(copyText)
        .then(function () {
            showToast("Copy successfully")
        })
        .catch(function (error) {
            alert("Failed to copy text: " + error);
        });
};

const deleteFile = (filename) => {

}

const makePublic = (filename) => {
    axios({
        url: `/files/${filename}/public`,
        method: "PATCH"
    })
        .then(res => {
            showToast(res.data.message)
        })
        .catch(err => {
            console.log(err);
        })
}
