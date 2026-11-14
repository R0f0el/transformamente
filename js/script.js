/* ===========================================================
   Lu Martins Terapias — Landing Page
   Script: WhatsApp CTA + UTM tracking, FAQ e menu mobile
   =========================================================== */

(function () {
  "use strict";

  // Número de WhatsApp da Dra. Luciene (formato internacional, somente dígitos).
  // TODO: substituir pelo número real antes do deploy.
  var WHATSAPP_NUMERO = "5548999999999";

  /* -----------------------------------------------------------
     1. Captura e persistência de parâmetros UTM
     ----------------------------------------------------------- */
  var CAMPOS_UTM = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content"
  ];

  function capturarUtmsDaUrl() {
    var params = new URLSearchParams(window.location.search);
    var utms = {};
    var encontrouAlgum = false;

    CAMPOS_UTM.forEach(function (campo) {
      var valor = params.get(campo);
      if (valor) {
        utms[campo] = valor;
        encontrouAlgum = true;
      }
    });

    // Se a URL atual não trouxe UTMs, mantém os que já estavam salvos
    // (ex.: usuária navegou para outra página do site).
    if (!encontrouAlgum) {
      return obterUtmsSalvos();
    }

    try {
      localStorage.setItem("lmt_utms", JSON.stringify(utms));
    } catch (erro) {
      /* localStorage indisponível: segue sem persistir */
    }

    return utms;
  }

  function obterUtmsSalvos() {
    try {
      var salvo = localStorage.getItem("lmt_utms");
      return salvo ? JSON.parse(salvo) : {};
    } catch (erro) {
      return {};
    }
  }

  /* -----------------------------------------------------------
     2. Montagem dos links de WhatsApp (com UTMs anexados ao texto)
     ----------------------------------------------------------- */
  function montarLinkWhatsapp(mensagemBase, utms) {
    var mensagem = mensagemBase;
    var origem = utms.utm_source
      ? " (origem: " + utms.utm_source + (utms.utm_campaign ? " / " + utms.utm_campaign : "") + ")"
      : "";

    var texto = encodeURIComponent(mensagem + origem);
    return "https://wa.me/" + WHATSAPP_NUMERO + "?text=" + texto;
  }

  function atualizarLinksWhatsapp() {
    var utms = capturarUtmsDaUrl();
    var botoes = document.querySelectorAll("[data-whatsapp-cta]");

    botoes.forEach(function (botao) {
      var mensagem = botao.getAttribute("data-whatsapp-message") ||
        "Olá, Dra. Luciene! Gostaria de agendar uma sessão de psicoterapia.";

      botao.setAttribute("href", montarLinkWhatsapp(mensagem, utms));
    });
  }

  /* -----------------------------------------------------------
     3. FAQ em acordeão
     ----------------------------------------------------------- */
  function iniciarFaq() {
    var itens = document.querySelectorAll(".faq__item");

    itens.forEach(function (item) {
      var pergunta = item.querySelector(".faq__pergunta");
      var resposta = item.querySelector(".faq__resposta");

      pergunta.addEventListener("click", function () {
        var estaAberto = item.getAttribute("data-aberto") === "true";

        // Fecha os demais itens (acordeão exclusivo)
        itens.forEach(function (outroItem) {
          outroItem.setAttribute("data-aberto", "false");
          outroItem.querySelector(".faq__pergunta").setAttribute("aria-expanded", "false");
          outroItem.querySelector(".faq__resposta").style.maxHeight = null;
        });

        if (!estaAberto) {
          item.setAttribute("data-aberto", "true");
          pergunta.setAttribute("aria-expanded", "true");
          resposta.style.maxHeight = resposta.scrollHeight + "px";
        }
      });
    });
  }

  /* -----------------------------------------------------------
     4. Menu mobile
     ----------------------------------------------------------- */
  function iniciarMenuMobile() {
    var botao = document.getElementById("navToggle");
    var nav = document.getElementById("siteNav");

    if (!botao || !nav) return;

    botao.addEventListener("click", function () {
      var aberto = nav.classList.toggle("is-open");
      botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    // Fecha o menu ao clicar em qualquer link
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        botao.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* -----------------------------------------------------------
     5. Ano do rodapé
     ----------------------------------------------------------- */
  function atualizarAnoRodape() {
    var el = document.getElementById("footer-year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* -----------------------------------------------------------
     Inicialização
     ----------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    atualizarLinksWhatsapp();
    iniciarFaq();
    iniciarMenuMobile();
    atualizarAnoRodape();
  });
})();
