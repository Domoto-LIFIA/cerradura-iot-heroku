{% extends 'layout.swig' %}

{% block content %}
<header class="container">
  <h5 class="header light">Desde esta pagina se controla el funcionamiento de la cerradura</h5>
</header>
 
<div class="container">
  <form action="#" id="form">
    <div class="row">
      <div class="col m6 s12">
        <div class="card">
          <div class="card-content teal white-text">
            <span class="card-title">Estado</span>
          </div>
          <div class="card-content">
            <div class="center">
              <p>Estado: <span id="textEstado">Desconectado</span></p>
            </div>    
          </div>
        </div>        
      </div>
      <div class="col m6 s12">
        <div class="card">
          <div class="card-content teal white-text">
            <span class="card-title">Control</span>
          </div>
          
          <div class="card-action">
            <div class="switch">
              <label>Cerrar <input type="checkbox" id="abrir"><span class="lever"></span>Abrir</label>
            </div>
          </div>
        </div>        
      </div>
    </div>
  </form>
</div>
{% endblock %}

{% block js %}
<!-- build:js /js/app.js -->
<script type="text/javascript" src="/components/socket.io-client/socket.io.js"></script>
<script type="text/javascript" src="/js/LockClient.js"></script>
<script type="text/javascript" src="/js/Index.js"></script>
<!-- endbuild -->

<script>
  new Index();
</script>
{% endblock %}
