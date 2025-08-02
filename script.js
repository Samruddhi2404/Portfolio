document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent page reload

    // Collect values
    const name = this.querySelector('input[placeholder="Your full name"]').value.trim();
    const email = this.querySelector('input[type="email"]').value.trim();
    const subject = this.querySelector('input[placeholder*="this about"]').value.trim();
    const message = this.querySelector("textarea").value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, subject, message })
      });

      const result = await response.text();
      alert(result); // Show success or error message from server
      form.reset();
    } catch (err) {
      alert("Something went wrong. Please try again later.");
      console.error("Fetch error:", err);
    }
  });

  // Smooth scroll for footer links
  document.querySelectorAll(".footer a[href^='#']").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
