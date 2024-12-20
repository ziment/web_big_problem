document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("schedule-form");
    const tableBody = document.getElementById("table-body");
    const STORAGE_KEY = "bigproblemCal";

    function loadData() {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        data.forEach(item => addRow(item));
    };

    function saveData() {
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
        row.classList.add("generated-table__row");

        const nameCell = document.createElement("td");
        nameCell.textContent = contestName;
        nameCell.classList.add("generated-table__cell");

        const startCell = document.createElement("td");
        startCell.textContent = dateStart;
        startCell.classList.add("generated-table__cell");

        const endCell = document.createElement("td");
        endCell.textContent = dateEnd;
        endCell.classList.add("generated-table__cell");

        const actionsCell = document.createElement("td");
        actionsCell.classList.add("generated-table__cell");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.classList.add("btn", "delete");
        deleteButton.addEventListener("click", () => {
            row.remove();
            saveData();
        });

        actionsCell.appendChild(deleteButton);

        row.appendChild(nameCell);
        row.appendChild(startCell);
        row.appendChild(endCell);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const contestName = document.getElementById("contest-name").value;
        const dateStart = document.getElementById("date-start").value;
        const dateEnd = document.getElementById("date-end").value;

        const newData = { contestName, dateStart, dateEnd };
        addRow(newData);

        saveData();

        form.reset();
    });

    loadData();
});