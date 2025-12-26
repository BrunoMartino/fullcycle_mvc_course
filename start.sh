#!/bin/bash

# para node descomente abaixo inclua um /nome-do-seu-projeto

cd /home/node/app
# cd /home/node/app/lara-project

## USE A O CÒDIGO ABAIXO para instalar Node
# Roda npm install apenas se node_modules não existir
#!/bin/bash

cd /home/node/app

if [ ! -d "node_modules" ]; then
    echo "Rodando npm install..."
    npm install
fi

# INICIA O BACKEND
npm run dev



## USE A O CÒDIGO ABAIXO para instalar projeto Laravel

# Roda composer install apenas se a pasta vendor não existir
# if [ ! -d "vendor" ]; then
#     echo "Rodando composer install..."
#     composer install
# else
#     echo "Pasta vendor já existe, pulando composer install."
# fi

# tail -f /dev/null

