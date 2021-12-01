const forms = () => {
  const formsEl = document.querySelectorAll("form"),
    inputsEl = document.querySelectorAllk("input"),
    phoneInputsEl = document.querySelectorAll('input[name="user_phone"]');

  phoneInputsEl.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = item.value.replace(/\D/, "");
    });
  });

  const message = {
    loading: "Loading...",
    success: "Thanks",
    failure: "Something wrong...",
  };

  const postdata = async (url, data) => {
    document.querySelector(".status").textContent = message.loading;
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });
    return await res.text();
  };

  const clearInputs = () => {
    inputsEl.forEach((item) => {
      item.value = "";
    });
  };

  formsEl.forEach((item) => {
    item.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      item.appendChild(statusMessage);

      const formData = new FormData(item);

      postdata("assets/server.php", formData)
        .then((res) => {
          console.log(res);
          statusMessage.textContent = message.success;
        })
        .catch(() => statusMessage.textContent - message.failure)
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          });
        });
    });
  });
};

export default forms;
