document.addEventListener("DOMContentLoaded", function () {
    const rentButtons = document.querySelectorAll(".rent-button");
    const modal = document.getElementById("rental-modal");
    const closeModal = document.getElementById("close-modal");
    const rentalItem = document.getElementById("rental-item");
    const rentalDays = document.getElementById("rental-days");
    const rentalPrice = document.getElementById("rental-price");
    const confirmRental = document.getElementById("confirm-rental");
    const rentalItems = document.getElementById("rental-items");

    let selectedEquipment = null;

    if (modal) {
        modal.style.display = "none";
    }

    rentButtons.forEach(button => {
        button.addEventListener("click", function () {
            if (!modal) return;

            selectedEquipment = this.dataset;
            if (selectedEquipment.name && selectedEquipment.price) {
                rentalItem.textContent = selectedEquipment.name;
                rentalDays.value = 1;
                updatePrice();
                modal.style.display = "flex";
            }
        });
    });

    if (rentalDays) {
        rentalDays.addEventListener("input", updatePrice);
    }

    function updatePrice() {
        if (selectedEquipment && selectedEquipment.price) {
            const days = Math.max(1, parseInt(rentalDays.value) || 1);
            rentalPrice.textContent = (days * parseInt(selectedEquipment.price)) + " грн";
        }
    }

    if (closeModal) {
        closeModal.addEventListener("click", function () {
            if (modal) {
                modal.style.display = "none";
            }
            selectedEquipment = null;
        });
    }

    if (confirmRental) {
        confirmRental.addEventListener("click", function () {
            if (!selectedEquipment) return;

            const days = Math.max(1, parseInt(rentalDays.value) || 1);
            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(startDate.getDate() + days);

            const rentalInfo = {
                name: selectedEquipment.name,
                days: days,
                price: rentalPrice.textContent,
                startDate: startDate.toLocaleDateString(),
                endDate: endDate.toLocaleDateString()
            };

            let rentals = JSON.parse(localStorage.getItem("rentals")) || [];
            rentals.push(rentalInfo);
            localStorage.setItem("rentals", JSON.stringify(rentals));

            if (modal) {
                modal.style.display = "none";
            }
            selectedEquipment = null;
            window.location.href = "rentals.html";
            updateRentalList();
        });
    }

    function updateRentalList() {
        let rentals = JSON.parse(localStorage.getItem("rentals")) || [];
        let content = rentals.map((rental, index) => `
            <div class="rental-item">
                <h3>${rental.name}</h3>
                <p>Ціна: ${rental.price}</p>
                <p>Кількість днів: ${rental.days}</p>
                <p>Дата початку оренди: ${rental.startDate}</p>
                <p>Дата закінчення оренди: ${rental.endDate}</p>
                <button class="remove-btn" data-index="${index}">Видалити</button>
                <button class="pay-btn" data-index="${index}">Оплатити</button>
            </div>
        `).join("");

        rentalItems.innerHTML = content || "<p>Немає активних оренд.</p>";

        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                let rentals = JSON.parse(localStorage.getItem("rentals")) || [];
                rentals.splice(this.dataset.index, 1);
                localStorage.setItem("rentals", JSON.stringify(rentals));
                updateRentalList();
            });
        });

        document.querySelectorAll(".pay-btn").forEach(button => {
            button.addEventListener("click", function () {
                let rentals = JSON.parse(localStorage.getItem("rentals")) || [];
                const selectedRental = rentals[this.dataset.index];

                if (selectedRental) {
                    localStorage.setItem("selectedRental", JSON.stringify(selectedRental));
                    window.location.href = "payment.html";
                }
            });
        });
    }

    updateRentalList();

    const cardNumberInput = document.getElementById("card-number");
    const expiryInput = document.getElementById("expiry");
    const cvvInput = document.getElementById("cvv");

    function allowOnlyNumbers(event) {
        let char = String.fromCharCode(event.which);
        if (!/[0-9]/.test(char)) {
            event.preventDefault();
        }
    }

    if (cardNumberInput) {
        cardNumberInput.addEventListener("input", function () {
            let value = this.value.replace(/\D/g, ""); 
            value = value.replace(/(\d{4})/g, "$1-"); 
            value = value.replace(/-$/, ""); 
            this.value = value.substring(0, 19); 
        });

        cardNumberInput.addEventListener("keypress", allowOnlyNumbers);
    }

    if (expiryInput) {
        expiryInput.addEventListener("input", function () {
            let value = this.value.replace(/\D/g, ""); 
            if (value.length > 2) {
                value = value.substring(0, 2) + "/" + value.substring(2, 4);
            }
            this.value = value.substring(0, 5); 
        });

        expiryInput.addEventListener("keypress", allowOnlyNumbers);
    }

    if (cvvInput) {
        cvvInput.addEventListener("input", function () {
            this.value = this.value.replace(/\D/g, "").substring(0, 3); 
        });

        cvvInput.addEventListener("keypress", allowOnlyNumbers);
    }
});
