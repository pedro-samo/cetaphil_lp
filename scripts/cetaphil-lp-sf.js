window.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const nomeInput = document.getElementById("nome");
  const sobrenomeInput = document.getElementById("sobrenome");
  const dataNascimentoInput = document.getElementById("dataNascimento");
  const emailInput = document.getElementById("email");
  const linkVideoInput = document.getElementById("linkVideo");
  const telefoneInput = document.getElementById("telefone");
  const termosCheckbox1Input = document.getElementById("termosCheckbox1");
  const termosCheckbox2Input = document.getElementById("termosCheckbox2");
  const newsletterCheckboxInput = document.getElementById("newsletterCheckbox");
  const contactFormSection = document.querySelector(".x-cetaphil__container__cadastro-form__section.section2");
  const successInterface = document.querySelector(".x-cetaphil__container__cadastro-form__section.section3");
  const enjoyButton = document.querySelector(
    ".x-cetaphil__container__cadastro-form__section__button-wrapper.enjoy button"
  );
  const sendButton = document.querySelector(
    ".x-cetaphil__container__cadastro-form__section__button-wrapper.send button"
  );

  const successInterfaceHeading = document.querySelector(
    ".x-cetaphil__container__cadastro-form__section.section1 > h2"
  );

  const maskPhoneInput = () => {
    if (telefoneInput) {
      IMask(telefoneInput, {
        mask: "(00) 00000-0000"
      });
    }
  };

  const maskNameInput = () => {
    if (nomeInput) {
      IMask(nomeInput, {
        mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/
      });
    }
  };

  const maskSurnameInput = () => {
    if (sobrenomeInput) {
      IMask(sobrenomeInput, {
        mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/
      });
    }
  };

  const maskBirthdate = () => {
    if (dataNascimentoInput) {
      IMask(dataNascimentoInput, {
        mask: "00/00/0000"
      });
    }
  };

  maskPhoneInput();
  maskNameInput();
  maskSurnameInput();
  maskBirthdate();

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = nomeInput.value;
    const sobrenome = sobrenomeInput.value;
    const dataNascimento = dataNascimentoInput.value;
    const email = emailInput.value;
    const linkVideo = linkVideoInput.value;
    const telefone = telefoneInput.value;
    const termosCheckbox1 = termosCheckbox1Input.checked;
    const termosCheckbox2 = termosCheckbox2Input.checked;
    const newsletterCheckbox = newsletterCheckboxInput.checked;

    if (
      !nome ||
      !sobrenome ||
      !dataNascimento ||
      !email ||
      !linkVideo ||
      !telefone ||
      !termosCheckbox1 ||
      !termosCheckbox2
    ) {
      return;
    }

    const data = {
      nome,
      sobrenome,
      dataNascimento,
      email,
      linkVideo,
      telefone: "55" + telefone.replace(/\D/g, ""),
      optinEmail: newsletterCheckbox ? "true" : "false"
    };

    let formData = new FormData();

    Object.entries(data).forEach((position) => {
      const key = position[0];
      const value = position[1];
      formData.append(key, value);
    });

    sendButton.innerText = "Enviando...";
    sendButton.disabled = true;
    sendButton.style.pointerEvents = "none";

    try {
      const response = await fetch("/integracao-cetaphil-sf", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Erro no envio dos dados");
      }

      const responseData = await response.json();

      if (responseData.statusCode === 400) {
        Swal.fire("Ops!", "E-mail já cadastrado!", "error");
      } else if (responseData.statusCode === 500) {
        Swal.fire("Ops!", "Revise seus dados e tente novamente!", "error");
      } else {
        contactFormSection.style.display = "none";
        successInterfaceHeading.innerText = "CADASTRO REALIZADO COM SUCESSO!";
        if (window.innerWidth <= 768) {
          successInterfaceHeading.style.textAlign = "left";
          successInterfaceHeading.style.maxWidth = "278px";
        }
        successInterface.style.display = "flex";
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Ops!", "Ocorreu um erro. Tente novamente mais tarde!", "error");
    } finally {
      sendButton.innerText = "Enviar";
      sendButton.disabled = false;
      sendButton.style.pointerEvents = "auto";
    }
  });

  enjoyButton.addEventListener("click", () => window.open("https://www.belezanaweb.com.br/cetaphil", "_blank"));
});
