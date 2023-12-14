window.addEventListener("DOMContentLoaded", () => {
  var e = document.getElementById("contactForm");
  const i = document.getElementById("nome"),
    u = document.getElementById("sobrenome"),
    y = document.getElementById("dataNascimento"),
    f = document.getElementById("email"),
    v = document.getElementById("linkVideo"),
    E = document.getElementById("telefone"),
    k = document.getElementById("termosCheckbox1"),
    h = document.getElementById("termosCheckbox2"),
    I = document.getElementById("newsletterCheckbox"),
    g = document.querySelector(".x-cetaphil__container__cadastro-form__section.section2"),
    p = document.querySelector(".x-cetaphil__container__cadastro-form__section.section3");
  IMask(E, { mask: "(00) 00000-0000" }),
    IMask(i, { mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/ }),
    IMask(document.getElementById("sobrenome"), { mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/ }),
    e.addEventListener("submit", async (e) => {
      e.preventDefault();
      var e = i.value,
        t = u.value,
        a = y.value,
        n = f.value,
        r = v.value,
        s = E.value,
        d = k.checked,
        o = h.checked,
        c = I.checked;
      if (e && t && a && n && r && s && d && o) {
        d = {
          nome: e,
          sobrenome: t,
          dataNascimento: a,
          email: n,
          linkVideo: r,
          telefone: "55" + s.replace(/\D/g, ""),
          optinEmail: c ? "true" : "false"
        };
        let o = new FormData();
        Object.entries(d).forEach((e) => {
          var t = e[0],
            e = e[1];
          o.append(t, e);
        });
        try {
          var m = await fetch("/integracao-cetaphil-sf", { method: "POST", body: o });
          if (!m.ok) throw new Error("Erro no envio dos dados");
          var l = await m.json();
          400 === l.statusCode
            ? Swal.fire("Ops!", "E-mail já cadastrado!", "error")
            : 500 === l.statusCode
            ? Swal.fire("Ops!", "Revise seus dados e tente novamente!", "error")
            : Swal.fire("Sucesso!", "Cadastro realizado com sucesso!", "success"),
            m.ok && ((g.style.display = "none"), (p.style.display = "flex"));
        } catch (e) {
          console.error(e), Swal.fire("Ops!", "Ocorreu um erro. Tente novamente mais tarde!", "error");
        }
      }
    });
});
