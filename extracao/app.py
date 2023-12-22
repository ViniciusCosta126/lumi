from utils.db_connetcion import criar_conexao
from utils.extrair_dados import extrair_dados


if __name__ == '__main__':
    try:
        criar_conexao()
        extrair_dados()
    except Exception as e:
        print(e)
