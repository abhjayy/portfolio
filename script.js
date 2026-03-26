const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelectorAll(".contact-input")[0].value;
    const email = document.querySelectorAll(".contact-input")[1].value;
    const message = document.querySelectorAll(".contact-input")[2].value;

    const data = { name, email, message };

    try {

        const response = await fetch("https://backend-jv34.onrender.com/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        alert(result.message);

    } catch (error) {

        console.log(error);
        alert("Server error ❌");

    }
});