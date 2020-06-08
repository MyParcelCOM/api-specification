(function () {
  document.addEventListener('DOMContentLoaded', function () {
    // Wait for the swagger.json to be processed.
    var swaggerInterval = setInterval(function () {
      var ready = document.getElementsByClassName('api-content')[0]
      if (typeof ready !== 'undefined') {
        clearInterval(swaggerInterval)

        // Open external information links in a new tab.
        var links = document.querySelectorAll('.api-info a');

        for (var i = 0, linksLength = links.length; i < linksLength; i++) {
          if (links[i].href.substr(0, 4) === 'http' && links[i].hostname !== window.location.hostname) {
            links[i].target = '_blank';
          }
        }
      }
    }, 137)
  })
})()
