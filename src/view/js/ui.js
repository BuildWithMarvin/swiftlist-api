alert("UI loaded successfully");
// const heading = document.createElement("form");
// const input = document.createElement("input");
// const formContainer = document.querySelector(".form-container");

async function getData() {
  const url = "http://localhost:3000/todos";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }



    
    const result = await response.json();
    result.forEach((element) => {
      const loginForm = document.querySelector("#form-container");
      const form = document.createElement("form");
      form.method = "POST";

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "aufgabe_id";
      input.value = element.id; // ✅ element statt result[dsd]

      const buttonDone = document.createElement("button");
      buttonDone.type = "submit";
      buttonDone.formAction = "/delete"; // ✅ = hinzugefügt
      buttonDone.innerHTML = "✓";

      const buttonEdit = document.createElement("button");
      buttonEdit.type = "submit";
      buttonEdit.formAction = "/delete"; // ✅ = hinzugefügt
      buttonEdit.innerHTML = "✏️";

      const buttonDelete = document.createElement("button");
      buttonDelete.type = "submit";
      buttonDelete.formAaction = "/delete"; // ✅ = hinzugefügt
      buttonDelete.innerHTML = "🗑️";

      const span = document.createElement("span");
      span.innerText = element.title; // ✅ element statt result[dsd]

      // Reihenfolge: input → span → Buttons
      form.appendChild(input);
      form.appendChild(span);
      form.appendChild(buttonDone);
      form.appendChild(buttonEdit);
      form.appendChild(buttonDelete);
      loginForm.appendChild(form);
    });
  } catch (error) {
    console.error(error.message);
  }
}

getData();
