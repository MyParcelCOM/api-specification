(function () {
  function cancelEvent (e) {
    e.stopPropagation()
    return false
  }

  // prevent swagger.json injection
  if (window.location.search.indexOf('url=') !== -1) {
    window.location.search = ''
  }

  document.addEventListener('DOMContentLoaded', function () {
    // wait for the swagger.json to be processed
    const swaggerInterval = setInterval(function () {
      const ready = document.getElementsByClassName('title')[0]
      if ('undefined' !== typeof ready) {
        clearInterval(swaggerInterval)

        // remove empty paragraph from info text
        const info = document.getElementsByClassName('info')[0]
        info.innerHTML = info.innerHTML.replace('<p></p>', '')

        // inject logo
        const title = document.getElementsByClassName('title')[0]
        title.innerHTML = title.innerHTML.replace('MyParcel.com', '<img src="https://cdn.myparcel.com/images/myparcelcom-white.svg" alt="MyParcel.com">')

        // version link
        const versions = document.querySelectorAll('.version')

        const version = versions[0]
        version.innerHTML = 'Version ' + version.innerText.trim()
        const versionLink = document.createElement('a')
        versionLink.href = 'https://github.com/MyParcelCOM/api-specification/releases'
        versionLink.target = '_blank'
        version.parentNode.insertBefore(versionLink, version)
        versionLink.appendChild(version)

        const openapi = versions[1]
        openapi.innerHTML = 'OpenAPI 3.0'
        const openapiLink = document.createElement('a')
        openapiLink.href = 'https://github.com/OAI/OpenAPI-Specification'
        openapiLink.target = '_blank'
        openapi.parentNode.insertBefore(openapiLink, openapi)
        openapiLink.appendChild(openapi)

        // disable main endpoint accordeons
        const accordeons = document.querySelectorAll('.opblock-tag')
        for (let i = 0; i < accordeons.length; i++) {
          accordeons[i].addEventListener('click', cancelEvent)
        }
      }
    }, 137)
  })

  document.addEventListener('click', function () {
    // change 'stringnull' to 'string null'
    window.requestAnimationFrame(function () {
      const properties = document.getElementsByClassName('prop-type')
      for (let i = 0; i < properties.length; i++) {
        const text = properties[i].innerText
        if (text.indexOf('null') !== -1) {
          properties[i].innerText = text.split('null').join(' null ').trim()
        }
      }
    })
  })
})()
