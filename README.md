# ConectaQR

## O que é

Uma plataforma web para exposição de produtos permitindo que cada empresa tenha sua própria página
personalizada, exibindo seus produtos e informações essenciais, como WhatsApp, Instagram e localização via Google
Maps. E também, o sistema gera um QR Code para cada loja, permitindo que clientes em lojas físicas acessem o catálogo
de produtos e verifiquem preços pelo celular.

## Principais funcionalidades:

- Página exclusiva para cada empresa com identidade visual personalizada.
- Catálogo de produtos com imagens, descrições e preços.
- Upload de imagens dos produtos diretamente pelo painel administrativo.
- Geração automática de QR Code para acesso rápido ao catálogo na loja física.
- Integração com redes sociais e contato direto via WhatsApp.
- Localização dinâmica via Google Maps.
- Painel administrativo para gerenciamento de produtos e informações empresariais.

## Como usar

Você pode usar diretamente [nesse site](https://conectaqr.tech/) ou você pode usar em um servidor local basta baixar o codigo e executa esses passo a passo

```bash
git clone https://github.com/AndreXime/ConnectQR.git

cd ConectaQR
docker compose up

# Voce pode mudar as variaveis no arquivo docker-compose

```

## Detalhes tecnicos

Essa plataforma adota Typescript no Nextjs e no Express, e usa TailwindCSS e PostgreSQL e outra biblioteca auxiliares como sharp para formartar imagens de uploads
