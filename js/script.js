
// CONTACT FORM - CLIENT-SIDE VALIDATION

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {

    const fields = contactForm.querySelectorAll(
        "input[required], select[required], textarea[required]"
    );

    function validateField(field) {
        const feedback = field.parentElement.querySelector(".invalid-feedback");

        if (!field.checkValidity()) {
            field.classList.add("is-invalid");
            field.classList.remove("is-valid");

            if (feedback) {
                if (field.validity.valueMissing) {
                    feedback.textContent = "This field is required.";
                } else if (field.validity.typeMismatch) {
                    feedback.textContent = "Please enter a valid email address.";
                } else {
                    feedback.textContent = "Please check this field.";
                }
            }

            return false;
        }

        field.classList.remove("is-invalid");
        field.classList.add("is-valid");

        return true;
    }

    fields.forEach(function(field) {

        field.addEventListener("blur", function() {
            field.dataset.touched = "true";
            validateField(field);
        });

        field.addEventListener("input", function() {
            if (field.dataset.touched === "true") {
                validateField(field);
            }
        });

        field.addEventListener("change", function() {
            if (field.dataset.touched === "true") {
                validateField(field);
            }
        });

    });

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let formIsValid = true;

        fields.forEach(function(field) {
            field.dataset.touched = "true";

            if (!validateField(field)) {
                formIsValid = false;
            }
        });

        if (!formIsValid) {
            formMessage.textContent = "Please correct the highlighted fields.";
            formMessage.style.color = "#dc3545";

            const firstInvalidField = contactForm.querySelector(".is-invalid");
            if (firstInvalidField) {
                firstInvalidField.focus();
            }

            return;
        }

        formMessage.textContent =
            "Thank you! Your message has been prepared successfully. This demo form does not send emails yet.";

        formMessage.style.color = "#4ca626";

        contactForm.reset();

        fields.forEach(function(field) {
            field.classList.remove("is-valid", "is-invalid");
            delete field.dataset.touched;
        });
    });
}
