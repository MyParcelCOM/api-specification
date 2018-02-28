(function () {
  function cancelEvent (e) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }

  // prevent swagger.json injection
  if (window.location.search.indexOf('url=') !== -1) {
    window.location.search = ''
  }

  document.addEventListener('DOMContentLoaded', function () {
    // wait for the swagger.json to be processed
    var swaggerInterval = setInterval(function () {
      var info = document.getElementsByClassName('info')[0]
      if ('undefined' !== typeof info) {
        clearInterval(swaggerInterval)

        // fix info text
        info.innerHTML = info.innerHTML.replace('<p></p>', '')

        // inject logo
        var title = document.getElementsByClassName('title')[0]
        title.innerHTML = title.innerHTML.replace('MyParcel.com', '<img src="https://www.myparcel.com/images/myparcel-logo-black.png" alt="MyParcel.com">')

        // version link
        var versions = document.querySelectorAll('.version')

        var version = versions[0]
        version.innerHTML = 'Version ' + version.innerText.trim()
        var versionLink = document.createElement('a')
        versionLink.href = 'https://github.com/MyParcelCOM/api-specification/releases'
        versionLink.target = '_blank'
        version.parentNode.insertBefore(versionLink, version)
        versionLink.appendChild(version)

        var openapi = versions[1]
        openapi.innerHTML = 'OpenAPI 3.0'
        var openapiLink = document.createElement('a')
        openapiLink.href = 'https://github.com/OAI/OpenAPI-Specification'
        openapiLink.target = '_blank'
        openapi.parentNode.insertBefore(openapiLink, openapi)
        openapiLink.appendChild(openapi)

        // disable main endpoint accordeons
        var accordeons = document.querySelectorAll('.opblock-tag')
        for (var i = 0; i < accordeons.length; i++) {
          if (document.attachEvent) {
            accordeons[i].attachEvent('onclick', cancelEvent)
          } else {
            accordeons[i].addEventListener('click', cancelEvent)
          }
        }
      }
    }, 137)
  })
})()
