document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("calendar-form");
    const tableBody = document.getElementById("table-body");
    const STORAGE_KEY = "bigproblemCal";

    function load() {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        data.forEach(item => addRow(item));
    };

    function save() {
        const rows = Array.from(tableBody.querySelectorAll("tr")).map((row) => {
            return {
                contestName: row.cells[0].textContent,
                dateStart: row.cells[1].textContent,
                dateEnd: row.cells[2].textContent,
            };
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    };

    function addRow({ contestName, dateStart, dateEnd }) {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = contestName;

        const startCell = document.createElement("td");
        startCell.textContent = dateStart;

        const endCell = document.createElement("td");
        endCell.textContent = dateEnd;

        const buttonCell = document.createElement("td");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.classList.add("button");
        deleteButton.addEventListener("click", () => {
            row.remove();
            save();
        });

        buttonCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(startCell);
        row.appendChild(endCell);
        row.appendChild(buttonCell);

        tableBody.appendChild(row);
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const contestName = document.getElementById("contest-name").value;
        const dateStart = document.getElementById("date-start").value;
        const dateEnd = document.getElementById("date-end").value;

        vex.dialog.alert("Контест успешно добавлен");

        const newData = { contestName, dateStart, dateEnd };
        addRow(newData);

        save();

        form.reset();
    });

    load();
});