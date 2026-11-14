# TransformaMente — Desenvolvimento Humano

Landing page institucional e de captação de pacientes da **TransformaMente**, consultório de psicoterapia da Dra. Luciene Martins (CRP 12/23619), com foco em atendimento clínico para mulheres — presencial em Florianópolis/SC e online para todo o Brasil.

## Objetivo

Converter visitantes em agendamentos de sessão via WhatsApp, direcionando tráfego orgânico e de mídia paga (Meta Ads e Google Ads) e organizando as informações de abordagem terapêutica, experiência clínica e funcionamento das consultas.

## Marca

- **Nome oficial:** TransformaMente — Desenvolvimento Humano
- **Profissional responsável:** Dra. Luciene Martins, psicóloga clínica (CRP 12/23619)
- **Tom de voz:** empático, acolhedor e humanizado, porém firme, profissional e empoderador

## Estrutura da Página

| # | Seção | Conteúdo |
|---|-------|----------|
| 1 | Header | Logo TransformaMente, navegação por âncoras e CTA de agendamento |
| 2 | Hero | Proposta de valor, credenciais (+18 anos, CRP), foto profissional, CTA e WhatsApp visível |
| 3 | Para Quem É | Seis dores atendidas: ansiedade, relações tóxicas, medo da separação, feridas do passado, depressão e baixa autoestima |
| 4 | Abordagem | Gestalt-Terapia integrada ao Sagrado Feminino, com os três pilares do processo |
| 5 | Sobre | Trajetória e formação da Dra. Luciene |
| 6 | Processo Terapêutico | Sessão inicial, frequência semanal de 50 min e duração flexível (8 a 16 sessões ou contínuo) |
| 7 | Prova Social | Nota e volume de avaliações reais do Google, com link para o perfil |
| 8 | FAQ | Atendimento online, duração da sessão e primeira terapia |
| 9 | Rodapé | CTA final, contato, endereço do consultório, CRP e links legais |

## Estrutura de Arquivos

```
.
├── index.html                          # Página completa
├── css/
│   └── style.css                       # Estilos (mobile-first, responsivo)
├── js/
│   └── script.js                       # UTM, CTAs de WhatsApp, FAQ e menu mobile
└── assets/
    └── img/
        ├── TransformaMente.png
        └── Psicologa-Luciene-Martins.png
```

## Funcionalidades

- **Responsividade:** layout mobile-first, com menu em overlay abaixo de 720 px.
- **CTAs de WhatsApp:** todos os botões marcados com `data-whatsapp-cta` recebem o link montado em tempo de execução, com mensagem pré-preenchida. Para alterar o número, edite `WHATSAPP_NUMERO` em `js/script.js`.
- **Rastreamento UTM:** os parâmetros `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` e `utm_content` são capturados da URL, persistidos em `localStorage` e anexados à mensagem do WhatsApp, permitindo identificar a origem de cada lead.
- **FAQ em acordeão:** abertura exclusiva, com estados acessíveis via `aria-expanded`.
- **Conformidade:** CRP 12/23619 exibido no rodapé e links para Política de Privacidade e Termos de Uso.

## Avaliações do Google

A seção de prova social exibe a nota e o número de avaliações reais do perfil da profissional no Google, com link direto para leitura e para deixar uma nova avaliação.

Os textos dos depoimentos **não são inseridos manualmente no HTML** — os termos do Google não permitem armazenar e reexibir o conteúdo das avaliações fora da API ou dos widgets oficiais, e textos fixos ficam desatualizados. Para exibir os relatos na íntegra, instale um widget oficial (Trustindex, Elfsight ou similar) no ponto já preparado:

```html
<div id="google-reviews-widget"></div>
```

## Configuração Local

1. Clone este repositório.
2. Abra `index.html` em qualquer navegador — não há build nem dependências.
3. Antes do deploy, confira: número do WhatsApp em `js/script.js`, imagens em `assets/img/` e as tags de rastreamento (Meta Pixel / Google Tag Manager) no `<head>`.

## Pendências

- [ ] Criar as páginas `privacidade.html` e `termos.html` (já linkadas no rodapé)
- [ ] Instalar o widget de avaliações do Google
- [ ] Inserir Meta Pixel e Google Tag Manager
- [ ] Otimizar as imagens para web (a foto atual tem ~900 KB; comprimida fica em ~30 KB sem perda visível)
