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
        // Open external links in a new tab.
        var links = document.querySelectorAll('.api-content a')

        for (var l = 0; l < links.length; l++) {
          if (links[l].href.substr(0, 4) === 'http' && links[l].hostname !== window.location.hostname) {
            links[l].target = '_blank'
          }
        }

        // Mark experimental endpoints.
        var experimental = [
          'HookLogs',
          'Users',
          'Webhooks'
        ]
        for (var x = 0; x < experimental.length; x++) {
          var elements = document.querySelectorAll([
            '[id^="tag/' + experimental[x] + '"]'
          ].join(','))

          for (var e = 0; e < elements.length; e++) {
            elements[e].classList.add('experimental')
          }
        }

        // Hide internal endpoints.
        var internal = [
          'Enterprises',
          'CombinedFiles',
          'Invitations',
          'Invoices',
          'PasswordResets',
          'Payments',
          'PaymentIdentities',
          'ShipmentSurcharges',
          'SystemMessages'
        ]
        for (var i = 0; i < internal.length; i++) {
          var sections = document.querySelectorAll([
            '[data-item-id="tag/' + internal[i] + '"]',
            '[id^="tag/' + internal[i] + '"]'
          ].join(','))

          for (var s = 0; s < sections.length; s++) {
            sections[s].remove()
          }
        }
      })
    }
  )
})()
