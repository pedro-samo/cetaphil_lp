window.addEventListener("DOMContentLoaded", () => {
  var e = document.getElementById("contactForm");
  const m = document.getElementById("nome"),
    u = document.getElementById("sobrenome"),
    _ = document.getElementById("dataNascimento"),
    y = document.getElementById("email"),
    p = document.getElementById("linkVideo"),
    v = document.getElementById("telefone"),
    E = document.getElementById("termosCheckbox1"),
    f = document.getElementById("termosCheckbox2"),
    h = document.getElementById("newsletterCheckbox"),
    w = document.querySelector(".x-cetaphil__container__cadastro-form__section.section2"),
    k = document.querySelector(".x-cetaphil__container__cadastro-form__section.section3");
  var t = document.querySelector(".x-cetaphil__container__cadastro-form__section__button-wrapper.enjoy button");
  const b = document.querySelector(".x-cetaphil__container__cadastro-form__section__button-wrapper.send button"),
    x = document.querySelector(".x-cetaphil__container__cadastro-form__section.section1 > h2");
  v && IMask(v, { mask: "(00) 00000-0000" }),
    m && IMask(m, { mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/ }),
    u && IMask(u, { mask: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]*$/ }),
    _ && IMask(_, { mask: "00/00/0000" }),
    e.addEventListener("submit", async (e) => {
      e.preventDefault();
      var e = m.value,
        t = u.value,
        o = _.value,
        a = y.value,
        r = p.value,
        c = v.value,
        d = E.checked,
        n = f.checked,
        s = h.checked;
      if (e && t && o && a && r && c && d && n) {
        d = {
          nome: e,
          sobrenome: t,
          dataNascimento: o,
          email: a,
          linkVideo: r,
          telefone: "55" + c.replace(/\D/g, ""),
          optinEmail: s ? "true" : "false"
        };
        let n = new FormData();
        Object.entries(d).forEach((e) => {
          var t = e[0],
            e = e[1];
          n.append(t, e);
        }),
          (b.innerText = "Enviando..."),
          (b.disabled = !0),
          (b.style.pointerEvents = "none");
        try {
          var i = await fetch("/integracao-cetaphil-sf", { method: "POST", body: n });
          if (!i.ok) throw new Error("Erro no envio dos dados");
          var l = await i.json();
          400 === l.statusCode
            ? Swal.fire("Ops!", "E-mail já cadastrado!", "error")
            : 500 === l.statusCode
            ? Swal.fire("Ops!", "Revise seus dados e tente novamente!", "error")
            : ((w.style.display = "none"),
              (x.innerText = "CADASTRO REALIZADO COM SUCESSO!"),
              window.innerWidth <= 768 && ((x.style.textAlign = "left"), (x.style.maxWidth = "278px")),
              (k.style.display = "flex"));
        } catch (e) {
          console.error(e), Swal.fire("Ops!", "Ocorreu um erro. Tente novamente mais tarde!", "error");
        } finally {
          (b.innerText = "Enviar"), (b.disabled = !1), (b.style.pointerEvents = "auto");
        }
      }
    }),
    t.addEventListener("click", () => window.open("https://www.belezanaweb.com.br/cetaphil", "_blank"));
});
