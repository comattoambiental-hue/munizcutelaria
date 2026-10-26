# Muniz Cutelaria

Site institucional estático e responsivo em português. Não requer instalação de dependências ou credenciais.

## Desenvolvimento

Na pasta do projeto, execute:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

O servidor entrega `index.html` e `style.css`. Para verificar pelo terminal:

```sh
curl --fail http://127.0.0.1:8000/
curl --fail http://127.0.0.1:8000/style.css
```

## Conteúdo a completar

- Contatos informados: Instagram @munizcutelaria e WhatsApp +55 (65) 99631-9224.
- Substituir ilustrações conceituais pelos produtos reais e incluir disponibilidade.
- Confirmar textos com a marca antes da publicação comercial.

A foto de ambientação é carregada do Unsplash; fontes são carregadas do Google Fonts. Há cores e fontes alternativas locais caso esses serviços estejam indisponíveis. O site pode ser hospedado em qualquer serviço de arquivos estáticos.

## Catálogo de tábuas

A seção `#taboas` contém 11 fotos reais recebidas no arquivo taboas de carne.zip, em `assets/`. Fotos abrem em tamanho original e cada item tem uma consulta contextual pelo WhatsApp. Medidas e preços não foram fornecidos e ficam sob consulta. As fotos das facas enviadas apenas no chat ainda aguardam arquivos para inclusão.

## Facas sob encomenda

A seção `#encomendas` contém as 33 fotos de conjuntos do ZIP facas sobe encomenda.zip, como seleções numeradas. Cada foto abre em tamanho original e tem consulta contextual pelo WhatsApp. Preços, medidas, materiais e prazos ficam sob consulta. Bainha inclusa nas facas e cutelos; suportes não inclusos. Estas fotos não representam pronta entrega.

## Pronta entrega

A seção `#colecao` contém 10 fotos recebidas no ZIP facas a pronta entrega.zip, com referências PE-01 a PE-10 e consultas individuais no WhatsApp. Disponibilidade e preços devem ser confirmados no atendimento. A campeira e a picanheira de 10 polegadas foram identificadas pelo usuário; materiais e medidas não informados ficam sem especificação. As ilustrações conceituais iniciais foram substituídas por fotos.

Segundo lote de pronta entrega: oito novos itens (PE-11 a PE-15 e PE-18 a PE-20). Duas fotos adicionais da campeira já apresentada foram omitidas para evitar repetição. Total de 18 itens à pronta entrega, 33 seleções sob encomenda e 11 fotos de tábuas/kits.

## Fotos de tábuas sem fundo

As 11 imagens `assets/taboa-XX-sem-fundo.png` são versões com remoção de fundo, usadas no catálogo, no banner e na seção decorativa. As fotos JPEG originais foram preservadas.
