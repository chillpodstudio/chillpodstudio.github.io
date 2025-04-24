document.addEventListener('DOMContentLoaded', function () {
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  const popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
});

function copyEmail() {
  const email = "hello@chillpod.studio";
  navigator.clipboard.writeText(email).then(() => {
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 2000); // Show for 2 seconds
  }).catch(err => {
    console.error("Failed to copy email: ", err);
  });
}