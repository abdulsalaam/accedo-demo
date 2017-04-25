# accedo text from header.md

Accedo : video on demand Demo.

## <span id="api-example-for-a-submenu-entry">HowTo include</span>

In your projects "package.json" you can set "apidoc.header" with a title and a filename to include this file into your documentation.

This example attempts to integrate "header.md" and "footer.md".

    {
      "name": "videio-on-demand",
      "version": "0.3.0",
      "description": "apidoc video on demand demo.",
      "apidoc": {
        "header": {
          "title": "Accedo : video on demand demo",
          "filename": "header.md"
        },
        "footer": {
          "title": "Accedo : video on demand copyright@2017",
          "filename": "footer.md"
        }
      }
    }
