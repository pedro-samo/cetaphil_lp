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

  const maskPhoneInput = () => {
    IMask(telefoneInput, {
      mask: "(00) 00000-0000"
    });
  };

  const maskNameInput = () => {
    IMask(nomeInput, {
      mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/
    });
  };

  const maskSurnameInput = () => {
    IMask(document.getElementById("sobrenome"), {
      mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/
    });
  };

  maskPhoneInput();
  maskNameInput();
  maskSurnameInput();

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
      Telefone: "55" + telefone.replace(/\D/g, ""),
      optinEmail: newsletterCheckbox ? "true" : "false"
    };

    console.log(data);

    let formData = new FormData();
    formData.append("nome", nome);
    formData.append("sobrenome", sobrenome);
    formData.append("dataNascimento", dataNascimento);
    formData.append("email", email);
    formData.append("linkVideo", linkVideo);
    formData.append("Telefone", "55" + telefone.replace(/\D/g, ""));
    formData.append("optinEmail", newsletterCheckbox ? "true" : "false");
    console.log(formData);

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
        Swal.fire("Sucesso!", "Cadastro realizado com sucesso!", "success");
      }
    } catch (error) {
      console.error(error);
      console.log(formData);
      Swal.fire("Ops!", "Ocorreu um erro. Tente novamente mais tarde!", "error");
    }
  });
});
