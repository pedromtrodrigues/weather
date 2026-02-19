#!/bin/bash

docker compose down
docker compose up --build -d

echo "------------------------------------------"
echo "  Deploy concluído com sucesso!           "
echo "  Português: http://localhost:8080/pt-PT/ "
echo "  Inglês:    http://localhost:8080/en-US/ "
echo "------------------------------------------"