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
        height:100%;
        width:100%;
        cursor: pointer;
      }
      .listonic-button-icon{
        display:none;
      }
      .listonic-button-text{
        display:none;
      }
      .info{
        display:none;
      }
    </style>

  </head>

  <body>

<div class="info"></div>
  




    <script type="text/javascript">
     
      var itemsString ="${itemsString}";
      var listName ="${listName}";
      var alternateText ="${alternateText}";
    </script>
    <script src="https://app.listonic.com/assets/js/build.min.js"></script>
    <script src="https://app.listonic.com/widget/widget.js"></script>
  </body>
</html>

        `}

     