export const html = (ingredients, title, styles) =>
{
  const items = ingredients.map(item => `${item.name} - ${item.quantity} ${item.unit}`)
const itemsString =items.join('<br>')
const listName =title
const alternateText =title
return`
<html>
  <head>
    <title>Listonic</title>
    <meta charset="utf-8" />
    <style type="text/css">
      body,
      div,
      html,
      span {
        margin: 0;
        padding: 0;
        border: 0;
        font: inherit;
        vertical-align: middle;
      }

      .listonic-button{
        height:20px
      }
    </style>

    <script
      async=""
      src="https://app.listonic.com/assets/js/build.min.js"
    ></script>
  </head>

  <body>

<div class="info"></div>
  




    <script type="text/javascript">
     
        var itemsString =
        "łopatka zowa - 500 gram<br>Naturalnie smaczne Gulasz Knorr - 1 opakowanie<br>papryka czerwona - 1 sztuka<br>papryka zielona - 1 sztuka<br>cebula - 2 sztuka<br>kasza gryczana - 400 gram<br>bulion - 1 litr<br>woda - 1,25 litr<br>Papryka słodka z Hiszpanii Knorr - 1 łyżeczka<br>Papryka ostra z Hiszpanii Knorr - 1 łyżeczka<br>Majeranek z krajów śródziemnomorskich Knorr - 1 łyżeczka<br>Liść laurowy z Turcji Knorr - 2 sztuka<br>Ziele angielskie z Meksyku Knorr - 3 ziarno<br>kwaśna śmietana - 0 unit<br>Kminek z Polski Knorr - 0 szczypta<br>olej do smażenia - 0 unit";
      var listName ="Węgierski gulasz z kaszą gry444zaną  ";
      var alternateText ="elo";
    </script>
    <script
      type="text/javascript"
      src="https://app.listonic.com/widget/widget.js"
    ></script>
  </body>
</html>

        `}

     