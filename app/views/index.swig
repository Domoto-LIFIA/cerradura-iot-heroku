{% extends 'layout.swig' %}

{% block content %}
<header class="container">
  <h5 class="header light">Desde esta pagina se controla el funcionamiento de la estufa</h5>
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
              <p>Temperatura: <span id="textTemperature"></span></p>
              <p>Duracion: <span id="textMinute"></span></p>
            </div>    
          </div>
        </div>        
      </div>
      <div class="col m6 s12">
        <div class="card">
          <div class="card-content teal white-text">
            <span class="card-title">Control</span>
          </div>
          <div class="card-content">
            <p for="medium">Temperatura</p>


            <input name="temperature" type="radio" value="high" id="high" />
            <label for="high">Alta</label>
            
            <input name="temperature" type="radio" value="medium" id="medium" checked="checked" />
            <label for="medium">Media</label>
            
            <input name="temperature" type="radio" value="low" id="low" />
            <label for="low">Baja</label>

            <p for="medium">Duracion</p>
          
            <div class="range-field">
              <input type="range" id="tiempo" min="1" max="60" name="minutes" value="15" />
            </div>
          </div>
          <div class="card-action">
            <div class="switch">
              <label>Apagar <input type="checkbox" id="encender"><span class="lever"></span>Encender</label>
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
<script type="text/javascript" src="/js/StoveClient.js"></script>
<script type="text/javascript" src="/js/Index.js"></script>
<!-- endbuild -->

<script>
  new Index();
</script>
{% endblock %}