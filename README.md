# Weather APP

Script to run container:

    sh deploy.sh

Duas versões:

- Português: http://localhost:8080/pt-PT/
  
- Inglês: http://localhost:8080/en-US/

# Rotas

### /insert - Permite inserir novos dados

city (string):

- Campo obrigatorio
  
temperature (number):

- Campo obrigatorio
  
- em /pt-PT/ -> Valor tem que estar entre -90ºC e 60ºC (Máximos e minimos já registados)
  
- em /en-US/ -> Valor tem que estar entre -112ºF e 140ºF (Máximos e minimos já registados)

altitude (number):

- Campo obrigatorio

- em /pt-PT/ -> Valor tem que estar entre -430 metros e 8500 metros (Ponto mais baixo e pico do Everest)

- em /en-US/ -> Valor tem que estar entre -430 ft e 8500 ft (Ponto mais baixo e pico do Everest)

isRaining (boolean):

- Campo obrigatorio

Data (string):

- Campo obrigatorio

- Mostra a data atual
  
Network Power (number):

- Valor compreendido entre 1 e 5

Botão "submit" não permite carregar até todos os dados estarem validados.\
Ao carregar é feito um POST para guardar os dados.\
Se estiver em \en-US\ o temperature e o altitude são convertidos para Celsius e Metros, respetivamente.\
Se a cidade inserida for por exemplo, "aveiro" ou "AVEIRO", vai ser guardada como "Aveiro".

### /cities -> Visualizar as várias cidades disponiveis

Faz um pedido GET para obter todas as cidades diferentes que existem.\
Ao clicar em cada cidade somos redirencionados para por exemplo, /view/Aveiro, aonde vemos todos os registos já feitos para a uma determinada cidade.

### /view/city -> Visualizar todos os dados para a cidade city

Faz um pedido GET que retorna os dados que existem para a determinada cidade.\
É possível eliminar dados ao clicar no botão "Delete" que faz um DELETE e apaga o elemento com esse id.

## Serviços

Responsavel pela comunicação com a API Crudcrud.com.

addWeather(data) -> Realiza um pedido HTTP POST para inserir os dados na API crudcrud.\
getWeatherCity(cityName) -> Obtem todos os registos através de um pedido HTTP GET existentes e filtra os dados de acordo com o cityName.\
deleteWeather(id) -> Faz um pedido HTTP DELETE para apagar um registo com o id dado.\
getCities() -> Obtem todos os registos existentes através de um pedido HTTP GET e extrai os nomes únicos da cidades.

## Pipes

Responsável para garantir que os dados são monstrados de acordo com a localização, celsius e metros em portugal e fahrenheit e feet nos Estados Unidos.


## Outros

Foi utilizado NGINX para determinar qual versão da aplicação mostrar ao utilizador, servindo os ficheiros das pastas /pt-PT/ ou /en-US/ dependendo do URL acedido.