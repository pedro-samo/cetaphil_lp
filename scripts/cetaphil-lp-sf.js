// window.addEventListener("DOMContentLoaded", () => {
//   const contactForm = document.querySelector("");

//   const maskPhoneInput = () => {
//     IMask(document.getElementById("phone"), {
//       mask: "(00) 00000-0000"
//     });
//   };

//   maskPhoneInput();

//   contactForm.addEventListener("submit", (e) => {
//     const data = {
//       Nome_completo,
//       Email,
//       Telefone: "55" + Telefone.replace(/\D/g, ""),
//       Optin: Optin ? "true" : "false"
//     };

//     let formData = new FormData();

//     Object.entries(data).forEach((position) => {
//       const key = position[0];
//       const value = position[1];
//       formData.append(key, value);
//     });

//     fetch("/integracao-cetaphl-sf", { method: "POST", body: formData })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.statusCode == 400) {
//           formButton.innerText = "Enviar";
//           Swal.fire("Ops!", "E-mail já cadastrado!", "error");
//         } else if (data.statusCode == 500) {
//           formButton.innerText = "Enviando";
//           Swal.fire("Ops!", "Revise seus dados e tente novamente!", "error");
//         } else {
//           // POST REALIZADO COM SUCESSI
//         }
//       })
//       .finally(() => {
//         //
//       });
//   });
// });
