(function () {
  // Redoc options: https://github.com/Redocly/redoc#redoc-options-object
  Redoc.init(
    'dist/swagger.json',
    {
      expandSingleSchemaField: true,
      hideDownloadButton: true,
      hideSingleRequestSampleTab: true,
      jsonSampleExpandLevel: 'all',
      lazyRendering: true,
      nativeScrollbars: true
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

        // Fix ReDoc bug https://github.com/Redocly/redoc/issues/1238
        // 1. Find all POST examples
        document.querySelectorAll('[id$="post"] h3').forEach(function (element) {
          // 2. Filter on Request examples
          if (element.innerText.includes('Request samples')) {
            // 3. Find all properties
            element.nextSibling.querySelectorAll('.property.token.string').forEach(function (element) {
              // 4. Find the "attributes" property
              if (element.innerText.includes('"attributes"')) {
                // 5. Find the preceding "id" property
                var id = element.parentNode.parentNode.previousSibling
                if (id.innerText.includes('"id"')) {
                  // 6. Hide it, this filter makes sure we do not hide "id" properties of RPC endpoints or relationships
                  id.style.display = 'none'
                }
              }
            })
            // 7. Hide the copy button, because this still copies a POST example including the "id".
            element.nextSibling.querySelector('button').style.display = 'none'
          }
        })
      })
    }
  )
})()
