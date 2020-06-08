(function () {
  // Redoc options: https://github.com/Redocly/redoc#redoc-options-object
  Redoc.init(
    'dist/swagger.json',
    {
      expandSingleSchemaField: true,
      hideDownloadButton: true,
      jsonSampleExpandLevel: 'all',
      lazyRendering: true
    },
    document.getElementById('redoc'),
    function () {
      requestAnimationFrame(function () {
        // Scroll active menu item into view.
        if (window.location.hash) {
          var activeLabel = document.querySelector('label.active')

          if (activeLabel.parentNode.parentNode.hasAttribute('role')) {
            activeLabel.scrollIntoView()
          } else {
            activeLabel.parentNode.parentNode.parentNode.scrollIntoView()
          }
        }
        // Open external information links in a new tab.
        var links = document.querySelectorAll('.api-info a')

        for (var i = 0, linksLength = links.length; i < linksLength; i++) {
          if (links[i].href.substr(0, 4) === 'http' && links[i].hostname !== window.location.hostname) {
            links[i].target = '_blank'
          }
        }
      })
    }
  )
})()
