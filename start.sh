#!/bin/bash

# para node descomente abaixo inclua um /nome-do-seu-projeto

cd /home/node/app
# cd /home/node/app/lara-project

## USE A O CÒDIGO ABAIXO para instalar Node
# Roda npm install apenas se node_modules não existir
if [ ! -d "node_modules" ]; then
    echo "Rodando npm install..."
    npm install
else
    echo "node_modules já existe, pulando npm install."
fi

# Mantém o container rodando
tail -f /dev/null



## USE A O CÒDIGO ABAIXO para instalar projeto Laravel

# Roda composer install apenas se a pasta vendor não existir
# if [ ! -d "vendor" ]; then
#     echo "Rodando composer install..."
#     composer install
# else
#     echo "Pasta vendor já existe, pulando composer install."
# fi

# tail -f /dev/null

