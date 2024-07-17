document.addEventListener("DOMContentLoaded", function () {
    const tasksElement = document.querySelector(".tasks");
    const clearHistoryButton = document.querySelector(".btn-clear-history");

    function createLi() {
        const li = document.createElement("li");
        li.classList.add(
          "flex",
          "justify-between",
          "items-center",
          "p-2",
          "px-4",
          "text-white",
          "text-lg",
          "bg-gray-500",
          "rounded-lg",
          "mb-2"
        );
        return li;
    }

    function historyTask(textInput, type) {
        const li = createLi();
        if (type === 'created') {
            li.innerText = 'Created: ' + textInput;
        } else if (type === 'deleted') {
            li.innerText = 'Deleted: ' + textInput;
        }
        tasksElement.appendChild(li);
    }

    function loadTasks() {
        const history = JSON.parse(localStorage.getItem("history")) || [];
        history.forEach(function (entry) {
            historyTask(entry.text, entry.type);
        });
    }

    function clearHistory() {
        localStorage.removeItem("history");
        tasksElement.innerHTML = '';
    }

    clearHistoryButton.addEventListener("click", function () {
        clearHistory();
    });

    loadTasks();
});
