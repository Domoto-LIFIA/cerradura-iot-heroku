<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>{{ title }}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">

  <link id="favicon" rel="shortcut icon" href="/img/favicon.png" type="image/png" />
  <link rel="apple-touch-icon" sizes="128x128" href="/img/favicon.png" type="image/png" />

  <!-- build:css /css/style.css -->
  <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link type="text/css" rel="stylesheet" href="/components/Materialize/dist/css/materialize.min.css"  media="screen,projection"/>
  <link type="text/css" rel="stylesheet" href="/css/style.css"  media="screen,projection"/>
  <!-- endbuild -->
</head>
<body>
  <nav class="blue darken-2" role="navigation">
    <div class="nav-wrapper container">
      <a href="#" class="brand-logo center">Domoto Estufa</a>
      <ul class="right">
        <li><a href="https://gitlab.com/jloboprs/domoto-estufa" class="valign-wrapper">
            <img src="/img/git.png" title="Codigo fuente" alt="Codigo fuente" class="valign">
        </li></a>
      </ul>
    </div>
  </nav>

  {% block content %}{% endblock %}

  <footer class="page-footer white">
    <div class="footer-copyright">
      <div class="container black-text">
      Echo por <a class="teal-text " href="https://gitlab.com/u/jloboprs"><b>Joselo</b></a>
      </div>
    </div>
  </footer>
  
  {% if ENV_DEVELOPMENT %}
    <script src="http://localhost:35729/livereload.js"></script>
  {% endif %}
  
  <!-- build:js /js/lib.js -->
  <script type="text/javascript" src="/components/jquery/dist/jquery.min.js"></script>
  <script type="text/javascript" src="/components/Materialize/dist/js/materialize.min.js"></script>
  <!-- endbuild -->
  {% block js %}{% endblock %}  
</body>
</html>