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

  document.title = 'API Specification | MyParcel.com'

  var link = document.createElement('link')
  link.href = 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700'
  link.rel = 'stylesheet'
  document.head.appendChild(link)

  document.addEventListener('DOMContentLoaded', function () {
    // wait for the swagger.json to be processed
    var swaggerInterval = setInterval(function () {
      var baseUrl = document.getElementsByClassName('base-url')[0]
      if ('undefined' !== typeof baseUrl) {
        clearInterval(swaggerInterval)

        // fix base url text
        baseUrl.innerHTML = '<strong>' + baseUrl.innerText.replace('[', '').replace(']', '').replace(': ', ':</strong> ').trim()

        // fix json link timestamp param
        var swaggerlink = baseUrl.nextSibling
        swaggerlink.innerHTML = swaggerlink.innerText.split('?d=')[0]

        // move description
        var description = document.getElementsByClassName('description')[0]
        description.classList.add('wrapper')
        baseUrl.parentNode.insertBefore(description, baseUrl)

        // inject logo
        var title = document.getElementsByClassName('title')[0]
        title.innerHTML = title.innerHTML.replace('MyParcel.com', '<img src="https://www.myparcel.com/images/myparcel-logo-black.png" alt="MyParcel.com">')

        // version link
        var version = document.querySelector('.version')
        version.innerHTML = 'Version ' + version.innerText.trim()
        var versionLink = document.createElement('a')
        versionLink.href = 'https://github.com/MyParcelCOM/api-specification/releases'
        versionLink.target = '_blank'
        version.parentNode.insertBefore(versionLink, version)
        versionLink.appendChild(version)

        // base url link
        baseUrl.childNodes[1].nodeValue = ' https://' + baseUrl.childNodes[1].nodeValue.trim()
        var baseUrlNode = document.createElement('a')
        baseUrlNode.href = baseUrl.childNodes[1].nodeValue.trim()
        baseUrlNode.target = '_blank'
        baseUrlNode.appendChild(baseUrl.childNodes[1])
        baseUrl.appendChild(baseUrlNode)

        // make nice
        document.getElementsByClassName('information-container')[0].classList.remove('wrapper')
        document.querySelector('.description br').style.display = 'none'

        // move info elements
        var wrapper = document.createElement('div')
        wrapper.classList.add('wrapper')
        description.parentNode.insertBefore(wrapper, description.nextSibling)
        wrapper.appendChild(baseUrl)
        var strong = document.createElement('strong')
        strong.innerHTML = 'JSON: '
        wrapper.appendChild(strong)
        wrapper.appendChild(swaggerlink)

        // disable main endpoint accordeons
        var accordeons = document.querySelectorAll('.opblock-tag, section.models h4')
        for (var i = 0; i < accordeons.length; i++) {
          var accordeon = accordeons[i]
          if (document.attachEvent) {
            accordeon.attachEvent('onclick', cancelEvent)
          } else {
            accordeon.addEventListener('click', cancelEvent)
          }
        }
      }
    }, 137)
  })
})()
